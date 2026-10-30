// Firebase 연결 모듈: 로그인(익명/Google)과 Firestore 저장·조회를 window.FB 로 제공해요.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInAnonymously,
  GoogleAuthProvider, signInWithPopup, signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc,
  collection, getDocs, query, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// 공개되어도 괜찮은 설정값이에요. 데이터는 Firestore 규칙이 지켜요.
const firebaseConfig = {
  apiKey: "AIzaSyBd9jzLhd6YiHVbFi6pBKwHxTz47DaEAl8",
  authDomain: "q-music-9f812.firebaseapp.com",
  projectId: "q-music-9f812",
  storageBucket: "q-music-9f812.firebasestorage.app",
  messagingSenderId: "71915777766",
  appId: "1:71915777766:web:e47967e429880a4cc6d527"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ALPHA = "abcdefghijkmnpqrstuvwxyz23456789";
const newKey = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(10)), b => ALPHA[b % ALPHA.length]).join("");

function firstUser() {
  return new Promise(res => {
    const off = onAuthStateChanged(auth, u => { off(); res(u); });
  });
}

async function ensureSignedIn() {
  let u = auth.currentUser || await firstUser();
  if (!u) u = (await signInAnonymously(auth)).user;
  return u;
}

// 문서 이름: 1마디는 예전 방식 그대로, 2·4마디는 뒤에 _m2, _m4 를 붙여요.
const idOf = (uid, { type, classCode, no, beats, measures }) => {
  const tail = measures > 1 ? `_${beats}_m${measures}` : `_${beats}`;
  return type === "group" ? `${classCode}_g${no}${tail}` : `${uid}_${classCode}_s${no}${tail}`;
};

window.FB = {
  newKey,

  // ----- 로그인 -----
  async currentUser() { return auth.currentUser || await firstUser(); },
  async teacherLogin() {
    const r = await signInWithPopup(auth, new GoogleAuthProvider());
    return r.user;
  },
  logout() { return signOut(auth); },
  async isTeacher(uid) {
    const s = await getDoc(doc(db, "teachers", uid));
    return s.exists();
  },

  // ----- 학생: 작품 저장 -----
  // 개인(solo): 같은 기기·반·번호·박자는 한 문서를 덮어써요.
  // 모둠(group): 같은 반·모둠 번호·박자는 한 문서를 모둠 친구들이 함께 덮어써요.
  async saveCreation({ type, classCode, no, joinKey, beats, measures = 1, title = "", fill, cells, bars, arr, dyn, spd, submit }) {
    const extra = arr ? { bars, arr, dyn, spd } : {};
    const u = await ensureSignedIn();
    const id = idOf(u.uid, { type, classCode, no, beats, measures });
    const ref = doc(db, "creations", id);
    const snap = await getDoc(ref);
    const sub = submit
      ? { submitted: true, submittedAt: serverTimestamp() }
      : { submitted: false, submittedAt: null };
    if (snap.exists()) {
      if (snap.data().submitted === true) {
        throw Object.assign(new Error("submitted"), { code: "submitted" });
      }
      await updateDoc(ref, { uid: u.uid, joinKey, fill, cells, title, measures, ...extra, updatedAt: serverTimestamp(), ...sub });
    } else {
      await setDoc(ref, {
        uid: u.uid, type, classCode, no, joinKey, beats, measures, title, fill, cells, ...extra,
        createdAt: serverTimestamp(), updatedAt: serverTimestamp(), ...sub
      });
    }
  },

  // ----- 비평 -----
  async saveCritique({ classCode, no, joinKey, group = 0, targetType = "group", work, target, text }) {
    const u = await ensureSignedIn();
    await setDoc(doc(collection(db, "critiques")), {
      uid: u.uid, type: "solo", classCode, no, joinKey, targetType, ...(group ? { group } : {}), work, target, text, createdAt: serverTimestamp()
    });
  },
  async listCritiques(code) {
    const s = await getDocs(query(collection(db, "critiques"), where("classCode", "==", code)));
    return s.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  deleteCritique(id) { return deleteDoc(doc(db, "critiques", id)); },

  // ----- 선생님: 반 관리 -----
  async listClasses() {
    const s = await getDocs(collection(db, "classes"));
    return s.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async createClass(code) {
    const ref = doc(db, "classes", code);
    if ((await getDoc(ref)).exists()) throw Object.assign(new Error("exists"), { code: "exists" });
    await setDoc(ref, { joinKey: newKey(), open: true, createdAt: serverTimestamp() });
  },
  setClass(code, patch) { return updateDoc(doc(db, "classes", code), patch); },

  // ----- 모둠 편성 (번호 -> 모둠 번호) -----
  async setGroups(code, { count, students, map }) {
    await setDoc(doc(db, "groups", code), { count, students, map, updatedAt: serverTimestamp() });
    await updateDoc(doc(db, "classes", code), { groupCount: count });
  },
  async getGroups(code) {
    const s = await getDoc(doc(db, "groups", code));
    return s.exists() ? s.data() : null;
  },

  // ----- 선생님: 작품 보기 -----
  async listCreations(code) {
    const s = await getDocs(query(collection(db, "creations"), where("classCode", "==", code)));
    return s.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  deleteCreation(id) { return deleteDoc(doc(db, "creations", id)); },
  setFeedback(id, feedback) { return updateDoc(doc(db, "creations", id), { feedback }); },
  async getMine({ type, classCode, no, beats, measures = 1 }) {
    const u = await ensureSignedIn();
    const id = idOf(u.uid, { type, classCode, no, beats, measures });
    const snap = await getDoc(doc(db, "creations", id));
    return snap.exists() ? snap.data() : null;
  },
  reopen(id) { return updateDoc(doc(db, "creations", id), { submitted: false, submittedAt: null }); }
};

window.dispatchEvent(new Event("fbready"));
