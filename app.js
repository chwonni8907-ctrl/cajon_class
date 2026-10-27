const PL='https://www.youtube.com/playlist?list=PLj1IpoVjqSqYH16ILDFj7LZq17ZXvyGBe';
/* 페이지별 유튜브 영상 ID를 여기에 넣으면 영상이 바로 나옵니다. 예) o:'AbCdEfGhIjK' */
const VID={o:'',po:'',st:'',f1:'',f4:'',m8:'',m16:'',a1:'',a2:'',a3:'',a4:'',a5:'',a6:'',a7:'',a8:''};

const LB={4:['1','2','3','4'],8:['1','n','2','n','3','n','4','n'],16:['1','e','n','a','2','e','n','a','3','e','n','a','4','e','n','a'],3:['1','2','3'],12:['1','','','2','','','3','','','4','','']};
const R=(labels,beats,bars,tip)=>({k:'r',labels:LB[labels],beats,bars,tip});
const TREE={id:'home',t:'즐거운 카혼수업',c:[
{id:'theory',t:'이론',d:'유래, 자세, 구조',c:[
 {id:'o',t:'카혼의 유래',k:'origin'},
 {id:'po',t:'카혼 연주 자세',k:'posture'},
 {id:'st',t:'카혼의 구조',k:'structure'}]},
{id:'play',t:'연주',d:'기초, 기본, 응용',c:[
 {id:'p1',t:'기초',d:'기호와 손, 4비트',c:[
  {id:'f1',t:'1. 구조별 기호와 손 표시',k:'sym'},
  {id:'f4',t:'2. 4비트 연주',...R(4,4,[{t:'1마디',p:'BR HL BR HL'}],'오른손, 왼손을 번갈아 치며 한 박에 하나씩 연주해요.')}]},
 {id:'p2',t:'기본',d:'8비트, 16비트',c:[
  {id:'m8',t:'1. 8비트',...R(8,4,[{t:'1마디',p:'BR BL HR TL BR BL HR TL'}],'한 박을 둘로 나눈 8분음표 칸이에요. 기호의 모양과 글자(R, L)로 칠 소리와 손을 확인하세요.')},
  {id:'m16',t:'2. 16비트',...R(16,4,[{t:'1마디',p:'BR . . . HL . . . BR . BL . HL . . .'}],'한 박을 넷으로 나눈 16분음표 칸이에요. 천천히 세면서 시작하세요.')}]},
 {id:'p3',t:'응용',d:'엇박, 필인, 다양한 리듬',c:[
  {id:'a1',t:'1. 8비트 응용',...R(8,4,[{t:'1마디',p:'BR . HL BR BR . HL .'}],'기본 8비트에 베이스를 하나 더 넣은 리듬이에요.')},
  {id:'a2',t:'2. 8비트 엇박',...R(8,4,[{t:'1마디',p:'BR . . HL BR . . HL'}],'셰이프가 박의 뒤쪽(n)에 놓여 흔들리는 느낌이 나요.')},
  {id:'a3',t:'3. 8비트 필인',...R(8,4,[{t:'1마디 (기본 리듬)',p:'BR BL HR TL BR BL HR TL'},{t:'2마디 (필인)',p:'BR . HL . HR HL BR BL'}],'마디 끝에서 리듬을 바꿔 다음 마디로 이어 주는 연결 리듬이에요.')},
  {id:'a4',t:'4. 16비트 응용',...R(16,4,[{t:'1마디',p:'BR . . HR HL . . HR BR . BL . HL . HR .'}],'16비트 기본에 칸을 더 채운 리듬이에요.')},
  {id:'a5',t:'5. 16비트 엇박',...R(16,4,[{t:'1마디',p:'BR . . HR . HL . . BR . . HR . HL . .'}],'셰이프가 박 사이로 들어가는 16비트 리듬이에요.')},
  {id:'a6',t:'6. 16비트 필인',...R(16,4,[{t:'1마디 (기본 리듬)',p:'BR . . . HL . . . BR . BL . HL . . .'},{t:'2마디 (필인)',p:'HR HL HR HL BR BL BR BL HR HL HR HL BR BL BR BL'}],'빠르게 손을 번갈아 치며 마디를 마무리해요.')},
  {id:'a7',t:'7. 다양한 리듬 1',...R(3,3,[{t:'3박자 (왈츠)',p:'BR HL HL'}],'3박자 리듬이에요. 첫 박에 베이스, 나머지 두 박에 셰이프를 쳐요.')},
  {id:'a8',t:'8. 다양한 리듬 2',...R(12,4,[{t:'셔플 (한 박을 셋으로)',p:'BR . BL HL . HR BR . BL HL . HR'}],'한 박을 셋으로 나누는 셔플 느낌이에요. 길게-짧게 흔들며 쳐요.')}]}]},
{id:'make',t:'창작',d:'박자와 필인을 골라 리듬 만들기',k:'create'}]};

function find(id,n=TREE,path=[]){if(n.id===id)return[...path,n];for(const c of n.c||[]){const r=find(id,c,[...path,n]);if(r)return r}return null}
const $=s=>document.querySelector(s);
let ac,timer=null;

function cajon(){return `<svg viewBox="0 0 220 200" role="img" aria-label="카혼 앞면"><rect x="30" y="20" width="160" height="160" rx="6" fill="#d9a35f" stroke="#7a4a17" stroke-width="3"/><rect x="38" y="28" width="144" height="144" rx="3" fill="#e8bb7c" stroke="#7a4a17"/></svg>`}
function structSvg(){return `<svg viewBox="0 0 300 220" role="img" aria-label="카혼 구조"><rect x="90" y="50" width="120" height="130" rx="5" fill="#d9a35f" stroke="#7a4a17" stroke-width="3"/><rect x="98" y="62" width="104" height="110" fill="#e8bb7c" stroke="#7a4a17"/><rect x="90" y="40" width="120" height="12" rx="3" fill="#a9772e"/><rect x="96" y="180" width="14" height="8" fill="#333"/><rect x="190" y="180" width="14" height="8" fill="#333"/><g stroke="var(--mute)" fill="none"><path d="M90 46H40"/><path d="M98 110H40"/><path d="M96 184H40"/><path d="M210 110H255"/></g><g fill="var(--ink)" font-size="12"><text x="4" y="42">앉는 면</text><text x="4" y="106">타격면</text><text x="4" y="200">고무 발</text><text x="214" y="96">몸통</text><text x="214" y="126">(속: 스네어)</text></g></svg>`}
function posSvg(){return `<svg viewBox="0 0 240 190" role="img" aria-label="카혼 연주 자세"><line x1="10" y1="172" x2="230" y2="172" stroke="var(--line)" stroke-width="3"/><rect x="90" y="112" width="60" height="60" fill="#d9a35f" stroke="#7a4a17" stroke-width="3"/><g stroke="var(--ink)" stroke-width="5" stroke-linecap="round" fill="none"><path d="M120 106L112 52"/><path d="M120 106H178L178 168H196"/><path d="M114 64L152 130"/></g><circle cx="110" cy="38" r="13" fill="none" stroke="var(--ink)" stroke-width="4"/><g fill="var(--ink)" font-size="11"><text x="8" y="60">등은 곧게,</text><text x="8" y="74">살짝 뒤로</text><text x="168" y="96">무릎 약 90°</text><text x="156" y="146">손은 앞면(타격면)</text></g></svg>`}

function box(svg,cap){return `<div class="ph">${svg}<div>${cap}</div></div>`}
function padSection(){return `<h3>카혼 두드려 보기</h3><div class="card"><p class="hint" style="margin-top:0">화면의 카혼을 직접 두드려 보세요. 먼저 여기서 연습하고, 실제 카혼으로 연주해 보세요. 리듬을 ‘들어보기’ 하면 칠 자리가 깜빡여요.</p><svg class="pad" viewBox="0 0 220 200" role="group" aria-label="두드릴 수 있는 카혼"><rect x="30" y="20" width="160" height="160" rx="6" fill="#d9a35f" stroke="#7a4a17" stroke-width="3"/><rect x="38" y="28" width="144" height="144" rx="3" fill="#e8bb7c" stroke="#7a4a17"/><rect x="34" y="12" width="26" height="10" rx="2" fill="#333"/><rect x="160" y="12" width="26" height="10" rx="2" fill="#333"/><rect x="26" y="180" width="168" height="16" rx="3" fill="#a9772e" stroke="#7a4a17" stroke-width="2"/><text x="110" y="192" text-anchor="middle" style="font-size:10px;fill:#fff;pointer-events:none">앉는 면 (연주자 쪽)</text><g class="z" data-k="B" tabindex="0" role="button" aria-label="베이스"><circle class="zs" cx="110" cy="84" r="26"/><text x="110" y="88" text-anchor="middle">베이스</text></g><g class="z" data-k="H" tabindex="0" role="button" aria-label="셰이프"><rect class="zs" x="70" y="134" width="34" height="34"/><text x="87" y="155" text-anchor="middle" style="font-size:10px">셰이프</text></g><g class="z" data-k="H" tabindex="0" role="button" aria-label="셰이프"><rect class="zs" x="116" y="134" width="34" height="34"/><text x="133" y="155" text-anchor="middle" style="font-size:10px">셰이프</text></g><g class="z" data-k="T" tabindex="0" role="button" aria-label="터치"><polygon class="zs" points="54,135 70,151 54,167 38,151"/><text x="54" y="154" text-anchor="middle" style="font-size:9px">터치</text></g><g class="z" data-k="T" tabindex="0" role="button" aria-label="터치"><polygon class="zs" points="166,135 182,151 166,167 150,151"/><text x="166" y="154" text-anchor="middle" style="font-size:9px">터치</text></g></svg><p class="hint" style="margin-bottom:0">연주자가 앉아서 내려다본 방향의 그림이에요. 그림 아래쪽이 연주자 쪽(앉는 면)이에요. 빨강 원은 베이스, 파랑 네모는 셰이프(세게), 노랑 다이아몬드는 터치(약하게)예요.</p></div>`}
function hit(k,z){ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();snd(k[0]);z.classList.add('hit');setTimeout(()=>z.classList.remove('hit'),140)}
function flash(tk){document.querySelectorAll('.z[data-k="'+tk[0]+'"]').forEach(z=>{z.classList.add('hit');setTimeout(()=>z.classList.remove('hit'),140)})}
function video(id){
  const v=VID[id];
  return `<h3>수업 영상</h3>`+(v?`<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${v}" title="카혼 수업 영상" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`:`<div class="vph">이 페이지의 영상은 준비 중이에요.<br>아래 버튼으로 재생목록에서 찾아보세요.</div>`)+`<a class="btn" href="${PL}" target="_blank" rel="noopener">타이거 카혼강좌 재생목록 열기</a>`;
}
function stopPlay(){clearInterval(timer);timer=null;document.querySelectorAll('.c.on,.slot.on').forEach(e=>e.classList.remove('on'));const b=$('#pb');if(b)b.textContent='▶ 들어보기'}
function snd(k){const t=ac.currentTime;
  if(k==='B'){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(55,t+.2);g.gain.setValueAtTime(.9,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+.32)}
  else{const T=k==='T',n=Math.floor(ac.sampleRate*.08),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();f.type='highpass';f.frequency.value=1800;g.gain.value=T?.2:.6;s.buffer=b;s.connect(f).connect(g).connect(ac.destination);s.start(t)}}
async function togglePlay(n){
  if(timer){stopPlay();return}
  ac=ac||new (window.AudioContext||window.webkitAudioContext)();await ac.resume();
  const cells=[...document.querySelectorAll('.c')],toks=n.bars.flatMap(b=>b.p.split(' '));
  const bpm=+$('#bpm').value,per=n.labels.length,ms=60000/bpm*n.beats/per;let i=0;
  $('#pb').textContent='■ 멈추기';
  const step=()=>{cells.forEach(c=>c.classList.remove('on'));const c=cells[i];c.classList.add('on');const tk=toks[i];if(tk!=='.'){snd(tk[0]);flash(tk)}i=(i+1)%cells.length};
  step();timer=setInterval(step,ms);
}
function SYM(k,h){const sh=k==='B'?'<circle class="o fB" cx="20" cy="20" r="17"/>':k==='H'?'<rect class="o fH" x="3" y="3" width="34" height="34"/>':'<polygon class="o fT" points="20,2 38,20 20,38 2,20"/>';return `<svg class="sym" viewBox="0 0 40 40" role="img" aria-label="${k==='B'?'베이스':k==='H'?'셰이프':'터치'}">${sh}${h?`<text x="20" y="27.5"${k==='T'?' style="fill:#1b1b1b"':''}>${h}</text>`:''}</svg>`}
function grid(n){
  const per=n.labels.length,gap=per/n.beats;
  return n.bars.map(b=>{const tk=b.p.split(' ');
    return `<div class="bar"><div class="bt">${b.t}</div><div class="g" style="grid-template-columns:repeat(${per},minmax(0,1fr))">`+tk.map((x,i)=>`<div class="c${i%gap===0?' b':''}"><div class="l">${n.labels[i%per]}</div>`+(x==='.'?`<div class="r">·</div>`:SYM(x[0],x[1]))+`</div>`).join('')+`</div></div>`}).join('');
}
function body(n){
  let h=`<h2>${n.t}</h2>`;
  if(n.k==='create')return h+createHtml(n);
  if(n.k==='origin')h+=box(cajon(),'사진 자리 (사진을 보내 주시면 넣어 드려요)')+`<ul class="pts"><li>카혼은 남미 페루에서 시작된 상자 모양의 타악기예요. 스페인어로 ‘상자’라는 뜻이에요.</li><li>식민지 시기에 아프리카에서 끌려온 사람들이 악기를 쓰지 못하게 되자, 항구의 나무 상자와 서랍을 두드리며 음악을 이어 갔다고 전해져요.</li><li>그 전통이 페루의 아프로페루 음악으로 자리 잡았어요.</li><li>1970년대 후반 플라멩코 기타리스트 파코 데 루시아가 페루에서 카혼을 접하고 플라멩코에 쓰면서 세계로 퍼졌어요.</li><li>작고 가벼워 드럼 대신 쓰기 좋아서, 지금은 어쿠스틱 공연과 학교 수업에서도 널리 쓰여요.</li></ul>`;
  else if(n.k==='posture')h+=box(posSvg(),'사진 자리 (사진을 보내 주시면 넣어 드려요)')+`<ul class="pts"><li>카혼 윗면에 앉아요. 엉덩이가 앉는 면 가운데에 오게 해요.</li><li>등은 곧게 펴고 몸을 살짝 뒤로 기울여요.</li><li>무릎은 약 90°로 굽히고, 발은 바닥에 편하게 둬요.</li><li>두 손은 앞면(타격면) 양쪽에 자연스럽게 올려요.</li><li>어깨와 팔에 힘을 빼고 손목으로 가볍게 쳐요.</li></ul>`;
  else if(n.k==='structure')h+=box(structSvg(),'사진 자리 (사진을 보내 주시면 넣어 드려요)')+`<ul class="pts"><li><b>앉는 면</b>: 위쪽 판. 연주자가 앉는 곳이에요.</li><li><b>타격면</b>: 앞쪽 얇은 판. 손으로 쳐서 소리를 내요.</li><li><b>몸통</b>: 소리가 울리는 나무 상자예요.</li><li><b>스네어</b>: 몸통 안쪽에 있는 울림 줄이에요. 슬랩을 칠 때 ‘차르륵’ 하는 소리를 더해 줘요.</li><li><b>사운드 홀</b>: 뒷면의 구멍이에요. 소리가 이곳으로 퍼져 나와요.</li><li><b>고무 발</b>: 바닥에서 미끄러지지 않게 받쳐 줘요.</li></ul>`;
  else if(n.k==='sym')h+=`<h3>기호</h3><div class="card"><div><span class="chip">${SYM('B','R')}<b>베이스</b> (Bass): 빨간 동그라미</span></div><div><span class="chip">${SYM('H','R')}<b>셰이프</b> (Shape): 파란 네모, 세게 치기</span></div><div><span class="chip">${SYM('T','R')}<b>터치</b> (Touch): 노란 다이아몬드, 양쪽 가장자리를 약하게 치기</span></div></div><h3>손 표시</h3><ul class="pts"><li>기호 안의 글자가 손이에요. <b>R</b>은 오른손, <b>L</b>은 왼손이에요.</li><li>기호 위의 숫자와 n은 박을 세는 말이에요. n은 박과 박 사이(엇박)예요.</li></ul><h3>읽는 방법</h3><div class="card">${grid({labels:LB[8],beats:4,bars:[{t:'예시',p:'BR BL HR TL BR BL HR TL'}]})}</div><ul class="pts"><li>오른손 베이스, 왼손 베이스, 오른손 셰이프, 왼손 터치를 두 번 반복해요.</li></ul>`;
  else{h+=`<div class="card">${grid(n)}<div class="ctl"><button id="pb">▶ 들어보기</button><label>빠르기 <input id="bpm" type="range" min="50" max="140" value="80"></label></div></div><p>${n.tip}</p><p class="hint">리듬꼴은 기본 예시예요. 영상에서 알려 주는 순서와 손을 함께 확인하세요.</p>`}
  return h+((n.k==='sym'||n.k==='r')?padSection():'')+video(n.id);
}
function menuHtml(n,cur){return '<ul>'+n.c.map(c=>`<li><a href="#/${c.id}" class="${c.c?'grp':''}${c.id===cur?' cur':''}">${c.t}</a>${c.c?menuHtml(c,cur):''}</li>`).join('')+'</ul>'}
const TK=['BR','BL','HR','HL','TR','TL'],AC=window.AudioContext||window.webkitAudioContext,NM={B:'동그라미',H:'네모',T:'다이아몬드'};
const TIPS={4:'숫자 아래에 칸이 한 칸씩 있어요. 한 박에 하나씩 소리를 골라 나만의 리듬을 만들어 보세요.',8:'숫자 아래에 칸이 두 칸씩 있어요. 숫자 칸은 박, n 칸은 박과 박 사이예요.',16:'숫자 아래에 칸이 네 칸씩 있어요. 한 박을 네 칸으로 나눠 채워 보세요.'};
let cur=[],sel='',drag=null,sz=4,fl=0;
function lsGet(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function createHtml(){return `<div class="cbar"><select id="sz" aria-label="박자 고르기"><option value="4">4비트</option><option value="8">8비트</option><option value="16">16비트</option></select><select id="fi" aria-label="필인 고르기"><option value="0">필인 없음</option><option value="1">필인 있음</option></select><span></span></div><p id="tip"></p><div class="card"><div id="cg"></div><div class="ctl"><button id="pb">▶ 들어보기</button><label>빠르기 <input id="bpm" type="range" min="50" max="140" value="80"></label><button class="alt" id="clr">모두 지우기</button></div></div><h3>기호 고르기</h3><div class="card"><div id="pal" class="pal"></div><p class="hint" style="margin-bottom:0">아이콘을 빈 칸으로 끌어다 놓아 보세요. 아이콘을 누른 뒤 칸을 눌러도 돼요. 같은 아이콘을 여러 번 쓸 수 있어요. 칸의 아이콘을 누르면 지워지고, 다른 칸으로 끌면 옮길 수 있어요.</p></div><h3>작품 저장과 제출</h3><div class="card" id="sv"></div>`}
function loadCur(){const v=lsGet('cajon-c'+sz);cur=Array.isArray(v)&&v.length===sz?v:Array(sz).fill('')}
function save(){lsSet('cajon-c'+sz,cur)}
function beep(t){ac=ac||new AC();ac.resume();snd(t[0])}
function initCreate(){sel='';const s0=lsGet('cajon-size');sz=[4,8,16].includes(s0)?s0:4;fl=lsGet('cajon-fill')?1:0;
  $('#sz').value=sz;$('#fi').value=fl;
  $('#pal').innerHTML=TK.map(t=>`<div class="tk" data-t="${t}" role="button" aria-label="${NM[t[0]]} ${t[1]}">${SYM(t[0],t[1])}</div>`).join('');
  document.querySelectorAll('.tk').forEach(e=>e.onpointerdown=ev=>startDrag(ev,e.dataset.t,null));
  $('#sz').onchange=e=>{sz=+e.target.value;lsSet('cajon-size',sz);loadCur();renderCreate()};
  $('#fi').onchange=e=>{fl=+e.target.value;lsSet('cajon-fill',fl);renderCreate()};
  $('#clr').onclick=()=>{cur=Array(sz).fill('');save();renderCreate()};
  loadCur();renderCreate();renderSave()}
function renderCreate(){stopPlay();const L=LB[sz],gap=sz/4,per=Math.min(sz,8),useFill=fl&&sz>4;let h='';
  $('#fi').disabled=sz===4;
  $('#tip').textContent=TIPS[sz]+(useFill?' 마지막 박(4)은 필인 자리예요. 앞에서 기본 리듬을 만들고, 필인 칸에서 리듬을 바꿔 마무리해 보세요.':'');
  for(let r=0;r<sz;r+=per){h+=`<div class="cg" style="grid-template-columns:repeat(${per},minmax(0,1fr))">`;
    for(let i=r;i<r+per;i++){const fi=useFill&&i>=sz*3/4;h+=`<div class="cc${i%gap===0?' b':''}${fi?' fi':''}"><div class="l">${L[i]}</div><div class="slot${cur[i]?' f':''}" data-i="${i}">${cur[i]?SYM(cur[i][0],cur[i][1]):''}</div>${fi?`<div class="fb"></div>${i===sz*3/4?'<div class="ft">필인</div>':''}`:''}</div>`}
    h+='</div>'}
  $('#cg').innerHTML=h;
  document.querySelectorAll('.slot').forEach(e=>{const i=+e.dataset.i;
    e.onpointerdown=ev=>{if(cur[i])startDrag(ev,cur[i],i)};
    e.onclick=()=>{if(!cur[i]&&sel){cur[i]=sel;beep(sel);save();renderCreate()}}});
  document.querySelectorAll('.tk').forEach(e=>e.classList.toggle('sel',e.dataset.t===sel))}
function startDrag(e,tok,from){e.preventDefault();const g=document.createElement('div');g.className='ghost';g.innerHTML=SYM(tok[0],tok[1]);document.body.appendChild(g);
  drag={tok,from,g,x:e.clientX,y:e.clientY,moved:false};mv(e);addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up)}
function mv(e){const d=drag;d.g.style.left=e.clientX+'px';d.g.style.top=e.clientY+'px';if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>8)d.moved=true}
function up(e){removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);
  const d=drag;drag=null;d.g.remove();
  if(e.type==='pointercancel'){renderCreate();return}
  if(!d.moved){if(d.from==null){sel=sel===d.tok?'':d.tok;if(sel)beep(sel)}else{cur[d.from]=sel||'';if(sel)beep(sel)}save();renderCreate();return}
  const el=document.elementFromPoint(e.clientX,e.clientY),sl=el&&el.closest('.slot');
  if(d.from!=null)cur[d.from]='';
  if(sl){cur[+sl.dataset.i]=d.tok;beep(d.tok)}
  save();renderCreate()}
async function playCreate(){
  if(timer){stopPlay();return}
  ac=ac||new AC();await ac.resume();
  const cells=[...document.querySelectorAll('.slot')],toks=cur.slice(),ms=60000/(+$('#bpm').value)*4/sz;let i=0;
  $('#pb').textContent='■ 멈추기';
  const step=()=>{cells.forEach(c=>c.classList.remove('on'));cells[i].classList.add('on');const t=toks[i];if(t)snd(t[0]);i=(i+1)%cells.length};
  step();timer=setInterval(step,ms)}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fb(ms=8000){return window.FB?Promise.resolve(window.FB):new Promise((res,rej)=>{const t=setTimeout(()=>rej(Object.assign(new Error('load'),{code:'load'})),ms);addEventListener('fbready',()=>{clearTimeout(t);res(window.FB)},{once:true})})}
function errMsg(e,who){const c=(e&&e.code)||'';
  if(c==='permission-denied')return who==='t'?'권한이 없어요. 이 계정이 선생님(teachers)으로 등록되어 있는지 확인해 주세요.':'저장할 수 없어요. 우리 반이나 모둠이 닫혀 있거나 QR이 새로 바뀌었을 수 있어요. 선생님께 물어보세요.';
  if(c==='auth/operation-not-allowed')return '로그인 방법이 꺼져 있어요. Firebase의 Authentication에서 익명과 Google 로그인을 켜 주세요.';
  if(c==='auth/unauthorized-domain')return '이 주소가 Firebase의 승인된 도메인에 없어요. Authentication → 설정 → 승인된 도메인에 추가해 주세요.';
  if(c==='auth/popup-closed-by-user'||c==='auth/cancelled-popup-request')return '로그인 창이 닫혔어요. 다시 눌러 주세요.';
  if(c==='auth/popup-blocked')return '팝업이 막혀 있어요. 주소창 오른쪽에서 팝업을 허용해 주세요.';
  if(c==='auth/api-key-not-valid.-please-pass-a-valid-api-key.'||c==='auth/invalid-api-key')return 'Firebase 설정값(apiKey)이 맞지 않아요. firebase.js의 값을 확인해 주세요.';
  if(c==='exists')return '이미 있는 반이에요.';
  if(c==='submitted')return '이미 제출한 작품이에요. 고치려면 선생님께 제출을 풀어 달라고 말해요.';
  if(c==='unavailable'||c==='load'||c==='auth/network-request-failed')return '인터넷 연결을 확인하고 다시 시도해 주세요.';
  return '문제가 생겼어요: '+(c||(e&&e.message)||'알 수 없는 오류')}

/* ----- 학생: 반·번호로 작품 내기 ----- */
function renderSave(){const box=$('#sv');if(!box)return;const j=lsGet('cajon-join');
  if(!j||!j.classCode){box.innerHTML='<p class="hint" style="margin:0">선생님이 보여 주는 QR 코드로 들어오면 작품을 저장하고 제출할 수 있어요. 지금 만든 리듬은 이 기기에만 저장돼요.</p>';return}
  let ty=lsGet('cajon-type')==='group'?'group':'solo';
  const draw=()=>{const g=ty==='group',no=lsGet(g?'cajon-gno':'cajon-no')||'';
    box.innerHTML=`<div class="svrow"><b>${esc(j.classCode)}반</b><span class="seg" role="group" aria-label="내는 방법"><button class="seg-b${g?'':' on'}" data-t="solo">개인</button><button class="seg-b${g?' on':''}" data-t="group">모둠</button></span><label>${g?'모둠 번호':'번호'} <input id="no" type="number" min="1" max="${g?30:60}" inputmode="numeric" value="${esc(no)}"></label></div><div class="svrow"><button class="alt" id="sd">임시 저장</button><button id="sb">제출하기</button><button class="alt" id="sf">피드백 보기</button><button class="alt" id="sx">반 바꾸기</button></div><p class="hint" id="smsg" style="margin-bottom:0">${g?'모둠 작품은 모둠 번호마다 하나만 저장돼요. 같은 모둠 친구가 저장하면 그 작품에 덮어써지니, 저장하기 전에 모둠 친구와 확인해요. ':'지금 보이는 '+sz+'비트 리듬이에요. '}<b>제출하기</b>를 눌러야 선생님이 볼 수 있고, 제출하면 고칠 수 없어요.</p>`;
    box.querySelectorAll('.seg-b').forEach(b=>b.onclick=()=>{ty=b.dataset.t;lsSet('cajon-type',ty);draw()});
    $('#sx').onclick=()=>{try{localStorage.removeItem('cajon-join')}catch(e){}renderSave()};
    const go=async submit=>{const m=$('#smsg'),v=parseInt($('#no').value,10),mx=g?30:60;
      if(!(v>=1&&v<=mx)){m.textContent=(g?'모둠 번호를':'번호를')+' 1~'+mx+' 사이로 적어 주세요.';return}
      if(!cur.some(x=>x)){m.textContent='먼저 칸에 아이콘을 넣어 리듬을 만들어 주세요.';return}
      const who=(g?'모둠 '+v:v+'번')+', '+sz+'비트';
      if(submit&&!confirm(who+' 작품을 제출할까요? 제출하면 고칠 수 없어요.'))return;
      lsSet(g?'cajon-gno':'cajon-no',v);$('#sb').disabled=true;$('#sd').disabled=true;m.textContent=submit?'제출하는 중…':'저장하는 중…';
      try{const F=await fb();await F.saveCreation({type:ty,classCode:j.classCode,no:v,joinKey:j.key,beats:sz,fill:(fl&&sz>4)?1:0,cells:cur.slice(),submit});
        m.textContent=submit?'제출했어요! 선생님이 볼 수 있어요. ('+who+')':'임시 저장했어요. 아직 제출 전이에요. ('+who+', '+new Date().toLocaleTimeString('ko-KR')+')'}
      catch(e){m.textContent=errMsg(e)}
      const b1=$('#sb'),b2=$('#sd');if(b1)b1.disabled=false;if(b2)b2.disabled=false};
    $('#sb').onclick=()=>go(true);$('#sd').onclick=()=>go(false);
    $('#sf').onclick=async()=>{const m=$('#smsg'),v=parseInt($('#no').value,10),mx=g?30:60,sc=n=>n>0?n+'/5':'-';
      if(!(v>=1&&v<=mx)){m.textContent=(g?'모둠 번호를':'번호를')+' 1~'+mx+' 사이로 적어 주세요.';return}
      m.textContent='불러오는 중…';
      try{const F=await fb();const w=await F.getMine({type:ty,classCode:j.classCode,no:v,beats:sz});
        if(!w){m.textContent='이 번호로 저장한 '+sz+'비트 작품이 아직 없어요.';return}
        const f=w.feedback;
        if(!f){m.textContent='아직 선생님 피드백이 없어요. '+(w.submitted?'제출은 완료됐어요.':'아직 제출 전이에요.');return}
        m.innerHTML='<b>선생님 피드백</b> · 박자 이해 '+sc(f.s1)+' · 창의성 '+sc(f.s2)+' · 표현 '+sc(f.s3)+(f.comment?'<br>'+esc(f.comment):'')}
      catch(e){m.textContent=errMsg(e)}}};
  draw()}

/* ----- 선생님 화면 ----- */
let tcache={};
function shell(title,inner){return `<header><button class="hb" onclick="location.hash='#/'">← 처음으로</button><div class="t">${title}</div><button class="hb go" id="go">바로가기</button></header><main>${inner}</main>`}
function loadQR(){return window.QRCode?Promise.resolve():new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';s.onload=res;s.onerror=()=>rej(new Error('qr'));document.head.appendChild(s)})}
async function teacherInit(){
  const box=$('#tp');box.innerHTML='<p class="hint">불러오는 중…</p>';
  let F;try{F=await fb()}catch(e){box.innerHTML='<p>Firebase를 불러오지 못했어요. 인터넷 연결을 확인하고 새로고침해 주세요.</p>';return}
  let u=null;try{u=await F.currentUser()}catch(e){}
  if(!u||u.isAnonymous){box.innerHTML='<p>선생님은 Google 계정으로 로그인해요.</p><div class="ctl"><button id="tl">Google로 로그인</button></div><p class="hint" id="tm"></p>';
    $('#tl').onclick=async()=>{try{await F.teacherLogin();teacherInit()}catch(e){$('#tm').textContent=errMsg(e,'t')}};return}
  let ok=false;try{ok=await F.isTeacher(u.uid)}catch(e){}
  if(!ok){box.innerHTML=`<p>${esc(u.email||'이 계정')}은 아직 선생님으로 등록되지 않았어요.</p><ol class="pts"><li>Firebase 콘솔 → Firestore Database → 데이터로 가요.</li><li><b>teachers</b> 컬렉션을 만들고, 문서 ID에 아래 UID를 붙여넣어요.</li><li>필드를 하나 넣고(예: name) 저장한 뒤 이 페이지를 새로고침해요.</li></ol><div class="card"><code>${esc(u.uid)}</code></div><div class="ctl"><button class="alt" id="lo">로그아웃</button></div>`;
    $('#lo').onclick=async()=>{await F.logout();teacherInit()};return}
  renderClasses(F,u)}
async function renderClasses(F,u){
  const box=$('#tp');let list;
  try{list=await F.listClasses()}catch(e){box.innerHTML='<p>'+errMsg(e,'t')+'</p>';return}
  list.sort((a,b)=>a.id.localeCompare(b.id,'ko',{numeric:true}));
  tcache={};list.forEach(c=>tcache[c.id]=c);
  box.innerHTML=`<div class="ctl"><span class="hint">${esc(u.email||'')}</span><button class="alt" id="lo">로그아웃</button></div><h3>반 만들기</h3><div class="card"><div class="ctl"><input id="nc" placeholder="예: 3-2" maxlength="20" aria-label="반 코드"><button id="mk">만들기</button></div><p class="hint" id="tm" style="margin-bottom:0">영문, 숫자, - 와 _ 만 쓸 수 있어요. 한글은 안 돼요.</p></div><h3>내 반</h3>`+(list.length?list.map(c=>`<div class="card cls" data-c="${esc(c.id)}"><div class="ctl"><b>${esc(c.id)}반</b><span class="badge${c.open?' on':''}">${c.open?'열림':'닫힘'}</span></div><div class="ctl"><button data-a="qr">QR 보기</button><button class="alt" data-a="toggle">${c.open?'반 닫기':'반 열기'}</button><button class="alt" data-a="key">QR 새로 만들기</button><button class="alt" data-a="work">작품 보기</button></div><div class="ctl"><span class="hint">닫힌 모둠:</span>${(c.closedGroups||[]).slice().sort((x,y)=>x-y).map(n=>`<button class="alt" data-a="gopen" data-n="${n}" aria-label="모둠 ${n} 열기">모둠 ${n} ✕</button>`).join('')||'<span class="hint">없음</span>'}</div><div class="ctl"><input type="number" class="gn" min="1" max="30" inputmode="numeric" placeholder="모둠 번호" aria-label="닫을 모둠 번호"><button class="alt" data-a="gclose">모둠 닫기</button></div></div>`).join(''):'<p class="hint">아직 만든 반이 없어요.</p>')+'<div id="tv"></div>';
  $('#lo').onclick=async()=>{await F.logout();teacherInit()};
  $('#mk').onclick=async()=>{const c=$('#nc').value.trim();
    if(!/^[A-Za-z0-9_-]{1,20}$/.test(c)){$('#tm').textContent='반 코드는 영문, 숫자, -, _ 만 1~20자로 적어 주세요.';return}
    if(tcache[c]){$('#tm').textContent='이미 있는 반이에요.';return}
    try{await F.createClass(c);renderClasses(F,u)}catch(e){$('#tm').textContent=errMsg(e,'t')}};
  box.querySelectorAll('.cls button').forEach(b=>b.onclick=async()=>{const c=b.closest('.cls').dataset.c,a=b.dataset.a,d=tcache[c];
    try{
      if(a==='toggle'){await F.setClass(c,{open:!d.open});renderClasses(F,u)}
      else if(a==='key'){if(confirm(c+'반의 QR을 새로 만들까요? 이전 QR은 쓸 수 없게 돼요.')){await F.setClass(c,{joinKey:F.newKey()});renderClasses(F,u)}}
      else if(a==='gclose'){const n=parseInt(b.closest('.cls').querySelector('.gn').value,10);
        if(!(n>=1&&n<=30)){$('#tv').innerHTML='<p>닫을 모둠 번호를 1~30 사이로 적어 주세요.</p>';return}
        await F.setClass(c,{closedGroups:[...new Set([...(d.closedGroups||[]),n])].sort((x,y)=>x-y)});renderClasses(F,u)}
      else if(a==='gopen'){const n=+b.dataset.n;await F.setClass(c,{closedGroups:(d.closedGroups||[]).filter(x=>x!==n)});renderClasses(F,u)}
      else if(a==='qr')showQR(c,d);
      else if(a==='work')showWork(F,c,true)
    }catch(e){$('#tv').innerHTML='<p>'+errMsg(e,'t')+'</p>'}})}
async function showQR(c,d){const tv=$('#tv'),url=location.origin+location.pathname+'?class='+encodeURIComponent(c)+'&key='+encodeURIComponent(d.joinKey);
  tv.innerHTML=`<h3>${esc(c)}반 QR</h3><div class="card" style="text-align:center"><div id="qr" class="qrbox"></div><p class="hint" style="word-break:break-all">${esc(url)}</p><div class="ctl" style="justify-content:center"><button class="alt" id="cp">주소 복사</button></div>${d.open?'':'<p class="hint">이 반은 지금 닫혀 있어서 학생이 저장할 수 없어요.</p>'}</div>`;
  $('#cp').onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(url).then(()=>{$('#cp').textContent='복사했어요'})};
  tv.scrollIntoView({behavior:'smooth'});
  try{await loadQR();new QRCode($('#qr'),{text:url,width:260,height:260,correctLevel:QRCode.CorrectLevel.M})}catch(e){$('#qr').textContent='QR을 만들지 못했어요. 아래 주소를 학생에게 알려 주세요.'}}
function miniGrid(w){const L=LB[w.beats],gap=w.beats/4,per=Math.min(w.beats,8),useFill=w.fill&&w.beats>4;let h='';
  for(let r=0;r<w.beats;r+=per){h+=`<div class="cg" style="grid-template-columns:repeat(${per},minmax(0,1fr))">`;
    for(let i=r;i<r+per;i++){const t=TK.includes(w.cells[i])?w.cells[i]:'',fi=useFill&&i>=w.beats*3/4;h+=`<div class="cc${i%gap===0?' b':''}${fi?' fi':''}"><div class="l">${L[i]}</div><div class="slot${t?' f':''}">${t?SYM(t[0],t[1]):''}</div></div>`}
    h+='</div>'}
  return h}
let wf='sub';
const SCN=[['s1','박자 이해'],['s2','창의성'],['s3','표현']];
const tmS=t=>t&&t.toDate?t.toDate().toLocaleString('ko-KR'):'';
function qv(v){let t=String(v==null?'':v);if(/^[=+\-@]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'}
function dl(name,text){const b=new Blob(['﻿'+text],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function rosterN(all,d){return d.studentCount||Math.max(30,...all.filter(w=>w.type==='solo').map(w=>w.no))}
function board(all,d){
  const solo=all.filter(w=>w.type==='solo'),grp=all.filter(w=>w.type==='group'),n=rosterN(all,d),closed=d.closedGroups||[];
  const stOf=arr=>arr.some(w=>w.submitted===true)?'s':(arr.length?'d':'n'),mark={s:'✓',d:'●',n:'○'},txt={s:'제출',d:'작성 중',n:'안 냄'};
  const miss=[];let h='';
  for(let i=1;i<=n;i++){const st=stOf(solo.filter(w=>w.no===i));if(st!=='s')miss.push(i);h+=`<span class="bd ${st}" aria-label="${i}번 ${txt[st]}">${i}<small>${mark[st]}</small></span>`}
  const gn=[...new Set([...grp.map(w=>w.no),...closed])].sort((a,b)=>a-b);
  const gh=gn.map(i=>{const st=stOf(grp.filter(w=>w.no===i));return `<span class="bd g ${st}" aria-label="모둠 ${i} ${txt[st]}">모둠 ${i}<small>${mark[st]}${closed.includes(i)?' 닫힘':''}</small></span>`}).join('');
  return `<div class="card"><div class="ctl"><b>제출 현황 (개인)</b><span class="hint">제출 ${n-miss.length} / ${n}</span><label class="hint">반 인원 <input id="cn" type="number" min="1" max="60" value="${n}" style="width:5em"></label><button class="alt" id="cs">적용</button></div><div>${h}</div>${miss.length?`<p class="hint">아직 안 낸 번호: ${miss.join(', ')}</p>`:'<p class="hint">모두 제출했어요!</p>'}${gn.length?`<div class="ctl"><b>모둠</b></div><div>${gh}</div>`:''}<p class="hint" style="margin-bottom:0">✓ 제출 · ● 작성 중 · ○ 아직 안 냄 (4·8·16비트 중 하나라도 제출하면 ✓)</p></div>`}
function csvOf(all,d,c){
  const rows=[['반','구분','번호','박자','필인','상태','제출시각','마지막 저장','박자 이해','창의성','표현','코멘트','리듬']];
  [...all].sort((a,b)=>(a.type===b.type?0:a.type==='group'?-1:1)||a.no-b.no||a.beats-b.beats).forEach(w=>{const f=w.feedback||{};
    rows.push([c,w.type==='group'?'모둠':'개인',w.no,w.beats+'비트',w.fill&&w.beats>4?'있음':'없음',w.submitted===true?'제출':'작성 중',tmS(w.submittedAt),tmS(w.updatedAt),f.s1||'',f.s2||'',f.s3||'',f.comment||'',w.cells.map(x=>x||'-').join(' ')])});
  const have=new Set(all.filter(w=>w.type==='solo').map(w=>w.no)),n=rosterN(all,d);
  for(let i=1;i<=n;i++)if(!have.has(i))rows.push([c,'개인',i,'','','안 냄','','','','','','','']);
  return rows.map(r=>r.map(qv).join(',')).join('\r\n')}
async function showWork(F,c,scroll){const tv=$('#tv');tv.innerHTML='<p class="hint">불러오는 중…</p>';
  let all;try{all=await F.listCreations(c)}catch(e){tv.innerHTML='<p>'+errMsg(e,'t')+'</p>';return}
  all=all.filter(w=>['solo','group'].includes(w.type)&&[4,8,16].includes(w.beats)&&Array.isArray(w.cells)&&w.cells.length===w.beats);
  const d=tcache[c]||{},subN=all.filter(w=>w.submitted===true).length,list=wf==='sub'?all.filter(w=>w.submitted===true):all;
  const srt=(a,b)=>a.no-b.no||a.beats-b.beats,gs=list.filter(w=>w.type==='group').sort(srt),ss=list.filter(w=>w.type==='solo').sort(srt);
  const opts=v=>'<option value="0">-</option>'+[1,2,3,4,5].map(n=>`<option value="${n}"${+v===n?' selected':''}>${n}</option>`).join('');
  const card=w=>{const sb=w.submitted===true,f=w.feedback||{};return `<div class="card wk" data-id="${esc(w.id)}"><div class="ctl"><b>${w.type==='group'?'모둠 '+esc(w.no):esc(w.no)+'번'}</b><span class="badge${sb?' on':''}">${sb?'제출함':'작성 중'}</span><span class="hint">${w.beats}비트${w.fill&&w.beats>4?' · 필인':''}${sb?(tmS(w.submittedAt)?' · 제출 '+tmS(w.submittedAt):''):(tmS(w.updatedAt)?' · 저장 '+tmS(w.updatedAt):'')}</span></div>${miniGrid(w)}<div class="ctl"><button data-p="1">▶ 들어보기</button>${sb?'<button class="alt" data-r="1">제출 풀기</button>':''}<button class="alt" data-x="1">삭제</button></div><details class="fbx"${w.feedback?' open':''}><summary>점수와 코멘트${w.feedback?' (입력함)':''}</summary><div class="fbg">${SCN.map(([k,nm])=>`<label>${nm} <select data-s="${k}">${opts(f[k])}</select></label>`).join('')}<label class="cm">코멘트 <textarea data-c rows="2" maxlength="300">${esc(f.comment||'')}</textarea></label><div class="ctl"><button data-fs="1">저장</button><span class="hint" data-fst></span></div></div></details></div>`};
  tv.innerHTML=`<h3>${esc(c)}반 작품</h3>`+board(all,d)+`<div class="ctl"><button class="alt" id="csv">엑셀(CSV)로 내려받기</button></div><div class="ctl"><span class="seg" role="group" aria-label="보기 방법"><button class="seg-b${wf==='sub'?' on':''}" data-f="sub">제출한 작품 (${subN})</button><button class="seg-b${wf==='all'?' on':''}" data-f="all">작성 중 포함 전체 (${all.length})</button></span></div>`+(list.length?(gs.length?`<h4 class="sec">모둠 작품 (${gs.length}개)</h4>`+gs.map(card).join(''):'')+(ss.length?`<h4 class="sec">개인 작품 (${ss.length}개)</h4>`+ss.map(card).join(''):''):`<p class="hint">${wf==='sub'?'아직 제출한 작품이 없어요.':'아직 저장된 작품이 없어요.'}</p>`);
  $('#cs').onclick=async()=>{const v=parseInt($('#cn').value,10);if(!(v>=1&&v<=60))return;try{await F.setClass(c,{studentCount:v});if(tcache[c])tcache[c].studentCount=v;showWork(F,c)}catch(e){alert(errMsg(e,'t'))}};
  $('#csv').onclick=()=>dl(c+'반_카혼작품_'+new Date().toISOString().slice(0,10)+'.csv',csvOf(all,d,c));
  tv.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{wf=b.dataset.f;showWork(F,c)});
  tv.querySelectorAll('.wk').forEach(el=>{const w=list.find(x=>x.id===el.dataset.id),nm=w.type==='group'?'모둠 '+w.no:w.no+'번';
    el.querySelector('[data-p]').onclick=()=>playCells(el,w.cells,w.beats);
    const r=el.querySelector('[data-r]');if(r)r.onclick=async()=>{if(!confirm(nm+' 제출을 풀까요? 학생이 다시 고칠 수 있게 돼요.'))return;try{await F.reopen(w.id);showWork(F,c)}catch(e){alert(errMsg(e,'t'))}};
    el.querySelector('[data-x]').onclick=async()=>{if(!confirm(nm+' 작품을 삭제할까요?'))return;try{await F.deleteCreation(w.id);showWork(F,c)}catch(e){alert(errMsg(e,'t'))}};
    el.querySelector('[data-fs]').onclick=async()=>{const st=el.querySelector('[data-fst]'),v={comment:el.querySelector('[data-c]').value.trim().slice(0,300)};
      SCN.forEach(([k])=>{v[k]=+el.querySelector('[data-s="'+k+'"]').value||0});
      try{await F.setFeedback(w.id,v);w.feedback=v;st.textContent='저장했어요 ✓'}catch(e){st.textContent=errMsg(e,'t')}}});
  if(scroll)tv.scrollIntoView({behavior:'smooth'})}
async function playCells(card,cells,beats){
  const same=card.classList.contains('playing');
  stopPlay();document.querySelectorAll('.wk.playing').forEach(x=>x.classList.remove('playing'));
  if(same)return;
  ac=ac||new AC();await ac.resume();card.classList.add('playing');
  const els=[...card.querySelectorAll('.slot')],ms=60000/80*4/beats;let i=0;
  const step=()=>{els.forEach(c=>c.classList.remove('on'));
    if(i>=els.length){stopPlay();card.classList.remove('playing');return}
    els[i].classList.add('on');const t=cells[i];if(TK.includes(t))snd(t[0]);i++};
  step();timer=setInterval(step,ms)}

/* ----- QR로 들어온 학생: 반 정보 기억 ----- */
(function(){const p=new URLSearchParams(location.search),c=p.get('class'),k=p.get('key');
  if(c&&k&&/^[A-Za-z0-9_-]{1,20}$/.test(c)&&/^[A-Za-z0-9]{4,40}$/.test(k)){
    lsSet('cajon-join',{classCode:c,key:k});
    try{history.replaceState(null,'',location.pathname+(location.hash||'#/make'))}catch(e){}}})();

function route(){
  stopPlay();$('#menu').classList.remove('open');
  const id=(location.hash.replace('#/','')||'home');
  if(id==='teacher'){$('#app').innerHTML=shell('선생님 전용','<h2>선생님 전용</h2><div id="tp"></div>');
    $('#panel').innerHTML='<h4>메뉴</h4><ul><li><a href="#/">처음으로</a></li></ul>'+menuHtml(TREE,'')+'<ul><li><a href="#/teacher" class="cur">선생님 전용</a></li></ul>';
    $('#go').onclick=()=>$('#menu').classList.add('open');window.scrollTo(0,0);teacherInit();return}
  const path=find(id)||find('home'),n=path[path.length-1],par=path[path.length-2];
  let h='';
  if(n.id==='home'){h=`<main class="home"><button class="title" id="ttl">즐거운 카혼수업</button><p class="hint" id="hint">글자를 눌러 보세요</p><div class="btns" id="hb" style="display:none;width:min(100%,360px)">${n.c.map(c=>`<a class="big" href="#/${c.id}" style="text-decoration:none">${c.t}<small>${c.d}</small></a>`).join('')}</div><a class="tl" href="#/teacher">선생님 전용</a></main>`;
  }else{
    h=`<header><button class="hb" onclick="location.hash='#/${par.id==='home'?'':par.id}'">← 뒤로</button><div class="t">${n.t}</div><button class="hb go" id="go">바로가기</button></header><main>`;
    h+=n.c?`<h2>${n.t}</h2><div class="btns">${n.c.map(c=>`<a class="big" href="#/${c.id}" style="text-decoration:none">${c.t}${c.d?`<small>${c.d}</small>`:''}</a>`).join('')}</div>`:body(n);
    h+='</main>';
  }
  $('#app').innerHTML=h;
  $('#panel').innerHTML='<h4>메뉴</h4>'+`<ul><li><a href="#/">처음으로</a></li></ul>`+menuHtml(TREE,n.id)+'<ul><li><a href="#/teacher">선생님 전용</a></li></ul>';
  const go=$('#go');if(go)go.onclick=()=>$('#menu').classList.add('open');
  const t=$('#ttl');if(t)t.onclick=()=>{$('#hb').style.display='grid';$('#hint').style.display='none'};
  const pb=$('#pb');if(pb)pb.onclick=()=>n.k==='create'?playCreate(n):togglePlay(n);
  if(n.k==='create')initCreate(n);
  document.querySelectorAll('.z').forEach(z=>{z.onpointerdown=e=>{e.preventDefault();hit(z.dataset.k,z)};z.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();hit(z.dataset.k,z)}}});
  window.scrollTo(0,0);
}
$('#menu').onclick=e=>{if(e.target.id==='menu'||e.target.tagName==='A')$('#menu').classList.remove('open')};
addEventListener('hashchange',route);route();
