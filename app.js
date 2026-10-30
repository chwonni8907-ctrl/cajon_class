const PL='https://www.youtube.com/playlist?list=PLj1IpoVjqSqYH16ILDFj7LZq17ZXvyGBe';
/* 페이지별 영상: 유튜브 주소나 11자 ID를 붙여 넣으면 그 영상이 나와요. 비워 두면 영상 칸이 나오지 않아요. */
const VID={o:'',po:'',st:'',f1:'',f4:'V20kfzhjVw8',m8:'V20kfzhjVw8',m16:'V20kfzhjVw8',a1:'V20kfzhjVw8',a2:'V20kfzhjVw8',a3:'V20kfzhjVw8',a4:'V20kfzhjVw8',a5:'V20kfzhjVw8',a6:'V20kfzhjVw8',a7:'lnre7tFfKx4',a8:'82QbjPoHmyg',a9:'qKXMZPH6k18'};

const LB={4:['1','2','3','4'],8:['1','n','2','n','3','n','4','n'],16:['1','e','&','a','2','e','&','a','3','e','&','a','4','e','&','a'],3:['1','2','3'],12:['1','','','2','','','3','','','4','','']};
const R=(labels,beats,bars,txt,ex)=>({k:'r',labels:LB[labels],beats,bars,txt:txt||[],ex:!!ex});
const TREE={id:'home',t:'즐거운 카혼수업',c:[
{id:'theory',t:'이론',d:'유래, 자세, 구조',c:[
 {id:'o',t:'카혼의 유래',k:'origin'},
 {id:'po',t:'카혼 연주 자세',k:'posture'},
 {id:'st',t:'카혼의 구조',k:'structure'}]},
{id:'play',t:'연주',d:'기초, 기본, 응용',c:[
 {id:'p1',t:'기초',d:'기호와 손, 4비트',c:[
  {id:'f1',t:'1. 구조별 기호와 손 표시',k:'sym'},
  {id:'f4',t:'2. 4비트 연주',...R(4,4,[{t:'1마디',p:'BR TL HR TL'}],['오른손, 왼손을 번갈아 치며 한 박에 하나씩 연주해요.','‘뚜 치 따 치’를 외치면서 연주해요.'])}]},
 {id:'p2',t:'기본',d:'8비트, 16비트',c:[
  {id:'m8',t:'1. 8비트',...R(8,4,[{t:'1마디',p:'BR TL HR TL BR TL HR TL'}],['한 박을 둘로 나누는 8분음표 칸이에요. 기호의 모양과 글자(R, L)로 칠 소리와 손을 확인하세요.','기호 위의 숫자와 n은 박을 세는 말이에요. n은 박과 박 사이(엇박)예요.'])},
  {id:'m16',t:'2. 16비트',...R(16,4,[{t:'1마디',p:'BR TL TR TL HR TL TR TL BR TL TR TL HR TL TR TL'}],['한 박을 넷으로 나누는 16분음표 칸이에요. 천천히 세면서 시작하세요.','기호 위의 숫자와 n은 박을 세는 말이에요. n은 박과 박 사이(엇박)예요.'])}]},
 {id:'p3',t:'응용',d:'엇박, 필인, 다양한 리듬, 연습곡',c:[
  {id:'a1',t:'1. 8비트 응용',...R(8,4,[{t:'예시 1',p:'BR TL HR TL BR BL HR TL'},{t:'예시 2',p:'BR TL HR BL BR TL HR BL'}],[],true)},
  {id:'a2',t:'2. 8비트 엇박 리듬',...R(8,4,[{t:'예시 1',p:'BR TL HR BL TR TL HR TL'},{t:'예시 2',p:'BR TL HR TL TR BL HR TL'}],[],true)},
  {id:'a3',t:'3. 8비트 필인',...R(8,4,[{t:'',p:'BR BL BR BL HR HL HR HL'}])},
  {id:'a4',t:'4. 16비트 응용',...R(16,4,[{t:'',p:'BR TL BR TL HR TL TR TL BR TL BR TL HR TL TR TL'}])},
  {id:'a5',t:'5. 16비트 엇박',...R(16,4,[{t:'예시 1',p:'BR TL BR TL HR TL TR TL TR TL BR TL HR TL TR TL'},{t:'예시 2',p:'BR TL BR TL HR TL TR TL TR TL BR TL HR TL TR TL'}],[],true)},
  {id:'a6',t:'6. 16비트 필인',...R(16,4,[{t:'',p:'BR TL BR TL HR TL TR TL TR TL BR TL HR HL HR HL'}])},
  {id:'a7',t:'7. 다양한 리듬 1',...R(3,3,[{t:'3박자 (왈츠)',p:'BR HL HL'}],['3박자 리듬이에요. 첫 박에 베이스, 나머지 두 박에 슬랩을 쳐요.'])},
  {id:'a8',t:'8. 다양한 리듬 2',...R(12,4,[{t:'셔플 (한 박을 셋으로)',p:'BR . BL HL . HR BR . BL HL . HR'}],['한 박을 셋으로 나누는 셔플 느낌이에요. 길게-짧게 흔들며 쳐요.'])},
  {id:'a9',t:'9. 연습곡',k:'song'}]}]},
{id:'make',t:'창작',d:'기본·변형·필인으로 곡 만들기',k:'create'},
{id:'crit',t:'비평',d:'듣고 평가하는 글 쓰기',k:'critique'}]};

function find(id,n=TREE,path=[]){if(n.id===id)return[...path,n];for(const c of n.c||[]){const r=find(id,c,[...path,n]);if(r)return r}return null}
const $=s=>document.querySelector(s);
let ac,timer=null,hi=0,lastId=null,menuShown=false;try{menuShown=sessionStorage.getItem('cajon-menu')==='1'}catch(e){}
const curId=()=>location.hash.replace('#/','')||'home';
const hashOf=id=>'#/'+(id==='home'?'':id);
function parentOf(id){if(id==='home')return null;const p=find(id);return p&&p.length>1?p[p.length-2].id:'home'}
function goBack(){const id=curId(),par=parentOf(id);if(par===null)return;
  if(hi>0)history.back();else{try{history.replaceState({i:0},'',hashOf(par))}catch(e){}route()}}


function padSection(){return `<h3>카혼 두드려 보기</h3><div class="card"><p class="hint" style="margin-top:0">화면의 카혼을 직접 두드려 보세요. 먼저 여기서 연습하고, 실제 카혼으로 연주해 보세요. 리듬을 ‘들어보기’ 하면 칠 자리가 깜빡여요.</p><svg class="pad" viewBox="0 0 220 200" role="group" aria-label="두드릴 수 있는 카혼"><rect x="30" y="20" width="160" height="160" rx="6" fill="#d9a35f" stroke="#7a4a17" stroke-width="3"/><rect x="38" y="28" width="144" height="144" rx="3" fill="#e8bb7c" stroke="#7a4a17"/><rect x="34" y="12" width="26" height="10" rx="2" fill="#333"/><rect x="160" y="12" width="26" height="10" rx="2" fill="#333"/><rect x="26" y="180" width="168" height="16" rx="3" fill="#a9772e" stroke="#7a4a17" stroke-width="2"/><text x="110" y="192" text-anchor="middle" style="font-size:10px;fill:#fff;pointer-events:none">앉는 면 (연주자 쪽)</text><g class="z" data-k="B" tabindex="0" role="button" aria-label="베이스"><circle class="zs" cx="110" cy="84" r="26"/><text x="110" y="88" text-anchor="middle">베이스</text></g><g class="z" data-k="HL" tabindex="0" role="button" aria-label="슬랩 왼손"><rect class="zs" x="70" y="134" width="34" height="34"/><text x="87" y="154" text-anchor="middle" style="font-size:10px">슬랩</text><text x="87" y="164" text-anchor="middle" style="font-size:8px">L</text></g><g class="z" data-k="HR" tabindex="0" role="button" aria-label="슬랩 오른손"><rect class="zs" x="116" y="134" width="34" height="34"/><text x="133" y="154" text-anchor="middle" style="font-size:10px">슬랩</text><text x="133" y="164" text-anchor="middle" style="font-size:8px">R</text></g><g class="z" data-k="TL" tabindex="0" role="button" aria-label="핑거 왼손"><polygon class="zs" points="54,135 70,151 54,167 38,151"/><text x="54" y="151" text-anchor="middle" style="font-size:9px">핑거</text><text x="54" y="160" text-anchor="middle" style="font-size:8px">L</text></g><g class="z" data-k="TR" tabindex="0" role="button" aria-label="핑거 오른손"><polygon class="zs" points="166,135 182,151 166,167 150,151"/><text x="166" y="151" text-anchor="middle" style="font-size:9px">핑거</text><text x="166" y="160" text-anchor="middle" style="font-size:8px">R</text></g></svg><p class="hint" style="margin-bottom:0">연주자가 앉아서 내려다본 방향의 그림이에요. 그림 아래쪽이 연주자 쪽(앉는 면)이에요. 빨강 원은 베이스, 파랑 네모는 슬랩(세게), 노랑 다이아몬드는 핑거(약하게)예요.</p></div>`}
function hit(k,z){ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();snd(k[0]);z.classList.add('hit');setTimeout(()=>z.classList.remove('hit'),140)}
function flash(tk,keep){document.querySelectorAll('.z.cur').forEach(z=>z.classList.remove('cur'));
  const key=tk[0]==='B'?'B':tk.slice(0,2);document.querySelectorAll('.z[data-k="'+key+'"]').forEach(z=>z.classList.add('cur'))}
function ytId(v){v=String(v||'').trim();const m=v.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);return m?m[1]:(/^[A-Za-z0-9_-]{11}$/.test(v)?v:'')}
function video(id){
  const v=ytId(VID[id]);if(!v)return '';
  return `<h3>수업 영상</h3><div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${v}?rel=0&playsinline=1" title="수업 영상" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe></div>`;
}
function stopPlay(){clearInterval(timer);clearTimeout(timer);timer=null;playTok++;
  document.querySelectorAll('.c.on,.slot.on,.mrow.on').forEach(e=>e.classList.remove('on'));const ps=document.querySelector('#ps');if(ps)ps.textContent='▶ 곡 전체 들어보기';document.querySelectorAll('.z.cur').forEach(z=>z.classList.remove('cur'));
  document.querySelectorAll('.pbx').forEach(b=>b.textContent=b.dataset.t||'▶ 들어보기');const b=$('#pb');if(b)b.textContent='▶ 들어보기'}
function snd(k,v=1){const t=ac.currentTime;
  if(k==='B'){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(55,t+.2);g.gain.setValueAtTime(.9*v,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+.32)}
  else{const T=k==='T',n=Math.floor(ac.sampleRate*.08),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();f.type='highpass';f.frequency.value=1800;g.gain.value=(T?.2:.6)*v;s.buffer=b;s.connect(f).connect(g).connect(ac.destination);s.start(t)}}
let playTok=0,playing=null;
async function togglePlay(n,bi){
  if(timer&&playing===bi){stopPlay();playing=null;return}
  stopPlay();playing=bi;
  ac=ac||new (window.AudioContext||window.webkitAudioContext)();await ac.resume();
  const my=playTok,bars=[...document.querySelectorAll('.bar')],bpm=+($('#bpm')||{value:80}).value||80,loop=bi!=='all';
  const idx=bi==='all'?bars.map((_,i)=>i):[+bi],steps=[];
  idx.forEach(i=>{const cells=[...bars[i].querySelectorAll('.c')],toks=n.bars[i].p.split(' '),per=toks.length,ms=60000/bpm*(n.bars[i].beats||n.beats)/per;
    cells.forEach((c,j)=>steps.push({c,tk:toks[j],ms,bar:bars[i]}))});
  document.querySelectorAll('.pbx').forEach(b=>{if(b.dataset.bi===String(bi))b.textContent='■ 멈추기'});
  let i=0;
  const step=()=>{if(my!==playTok)return;
    document.querySelectorAll('.c.on').forEach(e=>e.classList.remove('on'));
    if(i>=steps.length){if(loop)i=0;else{stopPlay();playing=null;return}}
    const st=steps[i];st.c.classList.add('on');
    if(st.tk!=='.'){snd(st.tk[0]);flash(st.tk)}else document.querySelectorAll('.z.cur').forEach(z=>z.classList.remove('cur'));
    i++;timer=setTimeout(step,st.ms)};
  step()}
function SYM(k,h){const sh=k==='B'?'<circle class="o fB" cx="20" cy="20" r="17"/>':k==='H'?'<rect class="o fH" x="3" y="3" width="34" height="34"/>':'<polygon class="o fT" points="20,2 38,20 20,38 2,20"/>';return `<svg class="sym" viewBox="0 0 40 40" role="img" aria-label="${k==='B'?'베이스':k==='H'?'슬랩':'핑거'}">${sh}${h?`<text x="20" y="27.5"${k==='T'?' style="fill:#1b1b1b"':''}>${h}</text>`:''}</svg>`}
function gridOne(n,b){const tk=b.p.split(' '),per=tk.length,beats=b.beats||n.beats,gap=Math.max(1,per/beats),lab=LB[per]||tk.map(()=>'');
  return `<div class="g" style="grid-template-columns:repeat(${per},minmax(0,1fr))">`+tk.map((x,i)=>`<div class="c${i%gap===0?' b':''}"><div class="l">${lab[i]}</div>`+(x==='.'?`<div class="r">·</div>`:SYM(x[0],x[1]))+`</div>`).join('')+`</div>`}
function grid(n){return n.bars.map(b=>`<div class="bar">${b.t?`<div class="bt">${b.t}</div>`:''}${gridOne(n,b)}</div>`).join('')}
const BPMSL='<label>빠르기 <input id="bpm" type="range" min="50" max="140" value="80"></label>';
const SA='BR TL HR TL BR TL HR TL',SB='BR TL HR TL BR BL HR TL',SC='BR . TL . HR . TL . BR . TL . HR HL HR HL',SD='BR . BR . BR TL HR BL',SE='BR TL HR TL BR TL HR BL',SF='. BR BR BR BR . . .';
const SONG=[SA,SB,SA,SB,SA,SB,SA,SC,SA,SB,SA,SB,SA,SB,SA,SC,SD,SE,SA,SC,SD,SE,SE,SF];
const para=a=>a.map(t=>`<p>${t}</p>`).join('');
function body(n){
  let h=`<h2>${n.t}</h2>`;
  if(n.k==='create')return h+createHtml(n);
  if(n.k==='critique')return h+critHtml();
  if(n.k==='origin')h+=`<figure class="fig">${ART.origin()}</figure>`+para(['에스파냐어로 상자, 서랍이라는 뜻의 카혼(Cajón)은 16세기부터 19세기 말 사이에 남아메리카에 노예로 끌려간 아프리카 사람들이 주변에서 흔히 구할 수 있는 나무 상자를 악기 삼아 두드려 연주한 것이 그 기원이 된 타악기로, 외형은 보통 육면체에 사운드홀이 뚫려 있는 형태이다.','페루 리마(Lima)를 중심으로 발생한 직육면체 모양의 페루 카혼과 쿠바의 아바나(Habana)를 중심으로 발생한 다양한 형태의 쿠바 카혼이 있다.','쿠바 카혼이 여전히 쿠바 내에서 주로 사용되고 있는 반면, 페루 카혼은 플라멩코 뮤지션 파코 데 루시아의 밴드에서 페루 카혼을 사용하면서 전 세계에 널리 알려졌다.','쿠바 카혼에 비해 페루 카혼이 훨씬 대중화되어 있기 때문에 오늘날 ‘카혼’이라고 하면 일반적으로 페루 카혼을 의미한다. 페루 카혼은 라틴아메리카 음악 외에도 다양한 대중음악 장르에서 널리 사용되고 있으며, 구조가 비교적 단순해 연주자가 직접 악기를 만들어 사용하는 경우도 많다.'])+'<p class="hint">출처: 악기백과</p>';
  else if(n.k==='posture')h+=`<figure class="fig"><img class="photo" src="${IMG.posture}" alt="카혼 연주 자세(앞모습과 옆모습)" width="569" height="401"></figure>`+para(['카혼을 연주할 때는 악기 위에 앉아서 악기의 앞면을 두드려야 하기 때문에 연주 자세가 바르지 않으면 자칫 허리 통증이 발생할 수 있다. 따라서 약간 뒤쪽으로 물러나 허리를 편안하게 펴고 앉는다. 이때 앞판이 두 다리 사이에 와야 한다. 허리를 지나치게 구부리거나 너무 아래쪽까지 손을 뻗는 자세는 통증을 유발할 수 있기 때문에 허리를 많이 굽혀야 할 정도로 낮은 지점은 치지 않는다. 허리에 무리가 가지 않도록 몸을 뒤쪽으로 기울이고 카혼의 앞부분이 살짝 들리게 앉아 연주하는 방법도 있다.']);
  else if(n.k==='structure')h+=`<figure class="fig">${ART.structure()}</figure><figure class="fig fig-s">${ART.snare()}</figure><ul class="pts boxed"><li><b>앉는 면</b>: 위쪽 판. 연주자가 앉는 곳이에요.</li><li><b>타격면</b>: 앞쪽 얇은 판. 손으로 쳐서 소리를 내요.</li><li><b>몸통</b>: 소리가 울리는 나무 상자예요.</li><li><b>스네어</b>: 몸통 안쪽에 있는 울림 줄이에요. 슬랩을 칠 때 ‘차르륵’ 하는 소리를 더해 줘요.</li><li><b>사운드 홀</b>: 뒷면의 구멍이에요. 소리가 이곳으로 퍼져 나와요.</li><li><b>고무 발</b>: 바닥에서 미끄러지지 않게 받쳐 줘요.</li></ul>`;
  else if(n.k==='sym')h+=`<h3>기호와 연주법</h3><div class="card"><div><span class="chip">${SYM('B','R')}<span><b>베이스(Bass tap)</b>: 앞판 중앙에 가까운 지점을 쳐 낮고 깊은 소리를 내는 것</span></span></div><div><span class="chip">${SYM('H','R')}<span><b>슬랩(Slap tap)</b>: 카혼 특유의 날카로운 소리를 내는 것</span></span></div><div><span class="chip">${SYM('T','R')}<span><b>핑거(Finger tap)</b>: 손 끝으로 앞판의 윗부분을 두드려 소리를 내는 것. 고스트라고도 함.</span></span></div></div><figure class="fig"><img class="photo" src="${IMG.symbols}" alt="카혼 앞면과 손 모양, 고스트(치)·클랩(짝)·슬랩(따)·베이스(쿵) 연주법" width="1000" height="747" style="max-width:560px"></figure><h3>손 표시</h3><ul class="pts boxed"><li>기호 안의 글자가 손이에요. <b>R</b>은 오른손, <b>L</b>은 왼손이에요.</li><li>기호 위의 숫자와 n은 박을 세는 말이에요. n은 박과 박 사이(엇박)예요.</li></ul><h3>읽는 방법</h3><div class="card"><div class="bt">예시</div>${gridOne({beats:4},{p:'BR BL HR TL BR BL HR TL'})}</div>`;
  else if(n.k==='song'){
    const bars=SONG.map((p,i)=>({t:'마디 '+(i+1),p,beats:4}));n.bars=bars;
    h+=`<div class="songhead"><b>흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야</b><span class="hint">장범준</span></div><div id="scoreBox"></div>${video(n.id)}<h3>카혼 리듬</h3><div class="card"><div class="ctl"><button class="pbx" data-bi="all" data-t="▶ 처음부터 끝까지 들어보기">▶ 처음부터 끝까지 들어보기</button>${BPMSL}</div><div class="songgrid">`+bars.map((b,i)=>`<div class="bar"><div class="bt">${b.t}</div>${gridOne(n,b)}<div class="ctl"><button class="pbx alt" data-bi="${i}">▶ 이 마디</button></div></div>`).join('')+`</div></div>`;
    return h}
  else{
    const multi=n.ex;
    h+=`<div class="card">`+n.bars.map((b,i)=>`<div class="bar">${b.t?`<div class="bt">${b.t}</div>`:''}${gridOne(n,b)}${multi?`<div class="ctl"><button class="pbx" data-bi="${i}">▶ 들어보기</button></div>`:''}</div>`).join('')+(multi?`<div class="ctl">${BPMSL}</div>`:`<div class="ctl"><button class="pbx" data-bi="0">▶ 들어보기</button>${BPMSL}</div>`)+`</div>`+para(n.txt)}
  return h+((n.k==='sym'||n.k==='r')?padSection():'')+video(n.id);
}
function menuHtml(n,cur){return '<ul>'+n.c.map(c=>`<li><a href="#/${c.id}" class="${c.c?'grp':''}${c.id===cur?' cur':''}">${c.t}</a>${c.c?menuHtml(c,cur):''}</li>`).join('')+'</ul>'}
const TK=['BR','BL','HR','HL','TR','TL'],AC=window.AudioContext||window.webkitAudioContext,NM={B:'동그라미',H:'네모',T:'다이아몬드'};
const TIPS={4:'숫자 아래에 칸이 한 칸씩 있어요. 한 박에 하나씩 소리를 골라 나만의 리듬을 만들어 보세요.',8:'숫자 아래에 칸이 두 칸씩 있어요. 숫자 칸은 박, n 칸은 박과 박 사이예요.',16:'숫자 아래에 칸이 네 칸씩 있어요. 한 박을 네 칸으로 나눠 채워 보세요.'};
let cur=[],sel='',drag=null,sz=4,fl=0,mc=1,ttl='';
function lsGet(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
const PN={B:'기본 리듬',V:'변형 리듬',F:'필인'},PK=['B','V','F'],DYN=['여리게','보통','세게'],DV=[.5,1,1.35],SPD=['느리게','보통','빠르게'],SV=[.75,1,1.3];
let pats={B:[],V:[],F:[]},pk='B',bars=8,arr=[],dyn=[],spd=[];
function createHtml(){return `<div class="card ttl"><label>곡 제목 <input id="ct" type="text" maxlength="40" placeholder="곡 제목을 적어요" autocomplete="off"></label></div><h3>1단계 · 리듬 3개 만들기</h3><p class="hint" style="margin-top:0">곡에 어울리는 리듬을 1마디씩 만들어요. <b>기본 리듬</b>은 곡의 바탕, <b>변형 리듬</b>은 기본 리듬을 살짝 바꾼 것, <b>필인</b>은 흐름을 바꾸거나 마무리하는 리듬이에요.</p><div class="cbar"><select id="sz" aria-label="비트 고르기"><option value="4">4비트</option><option value="8">8비트</option><option value="16">16비트</option></select><span class="seg" id="pt" role="group" aria-label="만들 리듬 고르기" style="grid-column:span 2">${PK.map(k=>`<button class="seg-b" data-p="${k}">${PN[k]}</button>`).join('')}</span></div><p id="tip"></p><div class="card"><div id="cg"></div><div class="ctl"><button id="pb">▶ 이 리듬 들어보기</button><button class="alt" id="clr">이 리듬 지우기</button></div></div><h3>기호 고르기</h3><div class="card"><div id="pal" class="pal"></div><p class="hint" style="margin-bottom:0">아이콘을 빈 칸으로 끌어다 놓아 보세요. 아이콘을 누른 뒤 칸을 눌러도 돼요. 같은 아이콘을 여러 번 쓸 수 있어요. 칸의 아이콘을 누르면 지워지고, 다른 칸으로 끌면 옮길 수 있어요.</p></div><h3>2단계 · 곡 구성하기</h3><div class="card"><div class="ctl"><label>곡의 마디 수 <select id="nb" aria-label="곡의 마디 수">${Array.from({length:13},(_,i)=>`<option value="${i+4}">${i+4}마디</option>`).join('')}</select></label></div><p class="hint">마디마다 어떤 리듬을 칠지, 얼마나 세게(셈여림), 얼마나 빠르게(빠르기) 칠지 골라요.</p><div id="arr"></div><div class="ctl"><button id="ps">▶ 곡 전체 들어보기</button><label>기본 빠르기 <input id="bpm" type="range" min="50" max="140" value="80"></label></div></div><h3>작품 저장과 제출</h3><div class="card" id="sv"></div>`}
const ckey=()=>'cajon-v2-'+sz;
const barToks=(B,V,F,a,n)=>{const P=a===1?V:a===2?F:B;return a===2?P.map((t,k)=>k<n*3/4?B[k]:t):P.slice()};
function loadPats(){const v=lsGet(ckey());PK.forEach(k=>{const a=v&&v[k];pats[k]=Array.isArray(a)&&a.length===sz?a.map(x=>TK.includes(x)?x:''):Array(sz).fill('')});for(let k=0;k<sz*3/4;k++)pats.F[k]='';cur=pats[pk]}
function save(){lsSet(ckey(),pats)}
function loadArr(){const v=lsGet('cajon-v2-arr')||{};bars=(v.bars>=4&&v.bars<=16)?v.bars:8;fitArr(v.arr,v.dyn,v.spd)}
function fitArr(a,d,p){arr=[];dyn=[];spd=[];for(let i=0;i<bars;i++){arr.push([0,1,2].includes(a&&a[i])?a[i]:0);dyn.push([0,1,2].includes(d&&d[i])?d[i]:1);spd.push([0,1,2].includes(p&&p[i])?p[i]:1)}}
function saveArr(){lsSet('cajon-v2-arr',{bars,arr,dyn,spd})}
function beep(t){ac=ac||new AC();ac.resume();snd(t[0])}
function initCreate(){sel='';const s0=lsGet('cajon-size');
  sz=[4,8,16].includes(s0)?s0:4;mc=3;fl=0;ttl=lsGet('cajon-title')||'';
  $('#sz').value=sz;$('#ct').value=ttl;
  $('#pal').innerHTML=TK.map(t=>`<div class="tk" data-t="${t}" role="button" aria-label="${NM[t[0]]} ${t[1]}">${SYM(t[0],t[1])}</div>`).join('');
  document.querySelectorAll('.tk').forEach(e=>e.onpointerdown=ev=>startDrag(ev,e.dataset.t,null));
  $('#sz').onchange=e=>{sz=+e.target.value;lsSet('cajon-size',sz);loadPats();renderCreate()};
  document.querySelectorAll('#pt .seg-b').forEach(b=>b.onclick=()=>{pk=b.dataset.p;if(pk==='V'&&!pats.V.some(x=>x)&&pats.B.some(x=>x)){pats.V=pats.B.slice();save()}cur=pats[pk];sel='';renderCreate()});
  $('#ct').oninput=e=>{ttl=e.target.value;lsSet('cajon-title',ttl)};
  $('#clr').onclick=()=>{pats[pk].fill('');save();renderCreate()};
  $('#nb').value=(loadArr(),bars);$('#nb').onchange=e=>{bars=+e.target.value;fitArr(arr,dyn,spd);saveArr();renderArr();renderSave()};
  $('#ps').onclick=playSong;
  loadPats();renderCreate();renderArr();renderSave()}
function renderArr(){const sl=(f,list,v,i)=>`<select data-f="${f}" data-i="${i}" aria-label="${i+1}마디 ${f==='arr'?'리듬':f==='dyn'?'셈여림':'빠르기'}">${list.map((n,x)=>`<option value="${x}"${x===v?' selected':''}>${n}</option>`).join('')}</select>`;
  $('#arr').innerHTML=`<div class="mrow h"><span></span><span>리듬</span><span>셈여림</span><span>빠르기</span></div>`+arr.map((a,i)=>`<div class="mrow" data-m="${i}"><b>${i+1}마디</b>${sl('arr',['기본','변형','필인'],a,i)}${sl('dyn',DYN,dyn[i],i)}${sl('spd',SPD,spd[i],i)}</div>`).join('');
  document.querySelectorAll('#arr select').forEach(e=>e.onchange=()=>{const i=+e.dataset.i,f=e.dataset.f;({arr,dyn,spd})[f][i]=+e.value;saveArr()})}
function renderCreate(){stopPlay();const L=LB[sz],gap=sz/4,isF=pk==='F',ff=sz*3/4;let h='';
  $('#tip').textContent=TIPS[sz]+' 지금은 「'+PN[pk]+'」 1마디를 만들고 있어요.'+(pk==='V'?' 기본 리듬을 불러왔어요. 한두 칸만 바꿔 보세요.':isF?' 필인은 4박(마지막 박)에 만들어요. 1~3박(흐리게 보이는 칸)은 기본 리듬이 그대로 연주돼요.':'');
  document.querySelectorAll('#pt .seg-b').forEach(b=>b.classList.toggle('on',b.dataset.p===pk));
  h+=`<div class="cg one" style="grid-template-columns:repeat(${sz},minmax(0,1fr))">`;
  for(let k=0;k<sz;k++){
    if(isF&&k<ff){const t=pats.B[k];h+=`<div class="cc${k%gap===0?' b':''}"><div class="l">${L[k]}</div><div class="slot gh${t?' f':''}">${t?SYM(t[0],t[1]):''}</div></div>`}
    else h+=`<div class="cc${k%gap===0?' b':''}${isF?' fi':''}"><div class="l">${L[k]}</div><div class="slot${cur[k]?' f':''}" data-i="${k}">${cur[k]?SYM(cur[k][0],cur[k][1]):''}</div>${isF?`<div class="fb"></div>${k===ff?'<div class="ft">필인</div>':''}`:''}</div>`}
  h+='</div>';
  $('#cg').innerHTML=h;
  document.querySelectorAll('.slot[data-i]').forEach(e=>{const i=+e.dataset.i;
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
  const cells=[...document.querySelectorAll('#cg .slot')],toks=barToks(pats.B,pats.V,pats.F,PK.indexOf(pk),sz),ms=60000/(+$('#bpm').value)*4/sz;let i=0;
  $('#pb').textContent='■ 멈추기';
  const step=()=>{cells.forEach(c=>c.classList.remove('on'));cells[i].classList.add('on');const t=toks[i];if(t)snd(t[0]);i=(i+1)%cells.length};
  step();timer=setInterval(step,ms)}
async function playSong(){
  if(timer&&playing==='song'){stopPlay();playing=null;return}
  stopPlay();playing='song';ac=ac||new AC();await ac.resume();
  const my=playTok,base=+$('#bpm').value||80,steps=[];
  arr.forEach((a,m)=>{const ms=60000/(base*SV[spd[m]])*4/sz;barToks(pats.B,pats.V,pats.F,a,sz).forEach(tk=>steps.push({m,tk,ms,v:DV[dyn[m]]}))});
  $('#ps').textContent='■ 멈추기';let i=0,lm=-1;
  const step=()=>{if(my!==playTok)return;
    if(i>=steps.length){stopPlay();playing=null;return}
    const st=steps[i];
    if(st.m!==lm){lm=st.m;document.querySelectorAll('.mrow.on').forEach(e=>e.classList.remove('on'));const r=document.querySelector('.mrow[data-m="'+st.m+'"]');if(r)r.classList.add('on')}
    if(st.tk)snd(st.tk[0],st.v);
    i++;timer=setTimeout(step,st.ms)};
  step()}
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
  let ty=(j.group||lsGet('cajon-type')==='group')?'group':'solo';
  const draw=()=>{const g=ty==='group',no=j.group?j.group:(lsGet(g?'cajon-gno':'cajon-no')||''),lk=!!j.group;
    box.innerHTML=`<div class="svrow"><b>${esc(j.classCode)}반</b>${lk?`<span class="badge on">${j.group}모둠</span>`:''}<span class="seg" role="group" aria-label="내는 방법"${lk?' hidden':''}><button class="seg-b${g?'':' on'}" data-t="solo">개인</button><button class="seg-b${g?' on':''}" data-t="group">모둠</button></span>${g&&!lk?`<label>내 번호 <input id="mn" type="number" min="1" max="60" inputmode="numeric" value="${esc(lsGet('cajon-no')||'')}"></label><button class="alt" id="fg">내 모둠 찾기</button>`:''}<label${lk?' hidden':''}>${g?'모둠 번호':'번호'} <input id="no"${lk?' readonly':''} type="number" min="1" max="${g?30:60}" inputmode="numeric" value="${esc(no)}"></label></div><div class="svrow"><button class="alt" id="sd">임시 저장</button><button id="sb">제출하기</button><button class="alt" id="sf">피드백 보기</button><button class="alt" id="sx">반 바꾸기</button></div><p class="hint" id="smsg" style="margin-bottom:0">${g?'모둠 작품은 모둠 번호마다 하나만 저장돼요. 같은 모둠 친구가 저장하면 그 작품에 덮어써지니, 저장하기 전에 모둠 친구와 확인해요. ':'지금 만든 '+sz+'비트, '+bars+'마디 곡이에요. '}<b>제출하기</b>를 눌러야 선생님이 볼 수 있고, 제출하면 고칠 수 없어요.</p>`;
    box.querySelectorAll('.seg-b').forEach(b=>b.onclick=()=>{ty=b.dataset.t;lsSet('cajon-type',ty);draw()});
    $('#sx').onclick=()=>{try{localStorage.removeItem('cajon-join')}catch(e){}renderSave()};
    const go=async submit=>{const m=$('#smsg'),v=parseInt($('#no').value,10),mx=g?30:60;
      if(!(v>=1&&v<=mx)){m.textContent=(g?'모둠 번호를':'번호를')+' 1~'+mx+' 사이로 적어 주세요.';return}
      if(!PK.some(k=>pats[k].some(x=>x))){m.textContent='먼저 칸에 아이콘을 넣어 리듬을 만들어 주세요.';return}
      if(submit){const no0=PK.filter(k=>!pats[k].some(x=>x));if(no0.length){m.textContent='제출하기 전에 '+no0.map(k=>PN[k]).join(', ')+'도 만들어 주세요.';return}}
      if(submit&&!ttl.trim()){m.textContent='제출하기 전에 곡 제목을 적어 주세요.';return}
      if(g){try{const F0=await fb(),gp=await F0.getGroups(j.classCode);if(gp&&gp.count&&v>gp.count){m.textContent='이 반의 모둠은 1~'+gp.count+'모둠이에요.';return}}catch(e){}}
      const who=(g?'모둠 '+v:v+'번')+', '+sz+'비트 '+bars+'마디';
      if(submit&&!confirm(who+' 작품을 제출할까요? 제출하면 고칠 수 없어요.'))return;
      lsSet(g?'cajon-gno':'cajon-no',v);$('#sb').disabled=true;$('#sd').disabled=true;m.textContent=submit?'제출하는 중…':'저장하는 중…';
      try{const F=await fb();await F.saveCreation({type:ty,classCode:j.classCode,no:v,joinKey:j.key,beats:sz,measures:3,title:ttl.trim().slice(0,40),fill:0,cells:[...pats.B,...pats.V,...pats.F],bars,arr:arr.slice(),dyn:dyn.slice(),spd:spd.slice(),submit});
        m.textContent=submit?'제출했어요! 선생님이 볼 수 있어요. ('+who+')':'임시 저장했어요. 아직 제출 전이에요. ('+who+', '+new Date().toLocaleTimeString('ko-KR')+')'}
      catch(e){m.textContent=errMsg(e)}
      const b1=$('#sb'),b2=$('#sd');if(b1)b1.disabled=false;if(b2)b2.disabled=false};
    $('#sb').onclick=()=>go(true);$('#sd').onclick=()=>go(false);
    const fg=$('#fg');if(fg)fg.onclick=async()=>{const m=$('#smsg'),v=parseInt($('#mn').value,10);
      if(!(v>=1&&v<=60)){m.textContent='내 번호를 1~60 사이로 적어 주세요.';return}
      lsSet('cajon-no',v);m.textContent='찾는 중…';
      try{const F=await fb();const gp=await F.getGroups(j.classCode);
        if(!gp){m.textContent='선생님이 아직 모둠을 만들지 않았어요.';return}
        const k=gp.map&&gp.map[v];
        if(!k){m.textContent=v+'번은 모둠에 없어요. 선생님께 물어보세요.';return}
        $('#no').value=k;lsSet('cajon-gno',k);
        const mates=Object.keys(gp.map).filter(x=>gp.map[x]===k).map(Number).sort((a,b)=>a-b);
        m.textContent=v+'번은 '+k+'모둠이에요. 같은 모둠: '+mates.join(', ')+'번'}
      catch(e){m.textContent=errMsg(e)}};
    $('#sf').onclick=async()=>{const m=$('#smsg'),v=parseInt($('#no').value,10),mx=g?30:60,sc=n=>n>0?n+'/5':'-';
      if(!(v>=1&&v<=mx)){m.textContent=(g?'모둠 번호를':'번호를')+' 1~'+mx+' 사이로 적어 주세요.';return}
      m.textContent='불러오는 중…';
      try{const F=await fb();const w=await F.getMine({type:ty,classCode:j.classCode,no:v,beats:sz,measures:3});
        if(!w){m.textContent='이 번호로 저장한 '+sz+'비트 작품이 아직 없어요.';return}
        const f=w.feedback;
        if(!f){m.textContent='아직 선생님 피드백이 없어요. '+(w.submitted?'제출은 완료됐어요.':'아직 제출 전이에요.');return}
        m.innerHTML='<b>선생님 피드백</b> · 박자 이해 '+sc(f.s1)+' · 창의성 '+sc(f.s2)+' · 표현 '+sc(f.s3)+(f.comment?'<br>'+esc(f.comment):'')}
      catch(e){m.textContent=errMsg(e)}}};
  draw()}

/* ----- 선생님 화면 ----- */
let tcache={};
function shell(title,inner){return `<header><button class="hb" onclick="goBack()">← 뒤로</button><div class="t">${title}</div><button class="hb go" id="go">바로가기</button></header><main>${inner}</main>`}
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
  box.innerHTML=`<div class="ctl"><span class="hint">${esc(u.email||'')}</span><button class="alt" id="lo">로그아웃</button></div><h3>반 만들기</h3><div class="card"><div class="ctl"><input id="nc" placeholder="예: 3-2" maxlength="20" aria-label="반 코드"><button id="mk">만들기</button></div><p class="hint" id="tm" style="margin-bottom:0">영문, 숫자, - 와 _ 만 쓸 수 있어요. 한글은 안 돼요.</p></div><h3>내 반</h3>`+(list.length?list.map(c=>`<div class="card cls" data-c="${esc(c.id)}"><div class="ctl"><b>${esc(c.id)}반</b><span class="badge${c.open?' on':''}">${c.open?'열림':'닫힘'}</span></div><div class="ctl"><button data-a="qr">QR 보기</button><button class="alt" data-a="toggle">${c.open?'반 닫기':'반 열기'}</button><button class="alt" data-a="key">QR 새로 만들기</button><button class="alt" data-a="work">작품 보기</button><button class="alt" data-a="crit">비평 보기</button></div>${c.groupCount?`<div class="ctl"><span class="hint">모둠 수업:</span>${Array.from({length:c.groupCount},(_,i)=>i+1).map(n=>{const cl=(c.closedGroups||[]).includes(n);return `<button class="${cl?'alt':''}" data-a="gtog" data-n="${n}" aria-label="${n}모둠 ${cl?'수업 시작':'수업 마감'}">${n}모둠 ${cl?'시작':'● 진행중'}</button>`}).join('')}</div><div class="ctl"><button data-a="gqr">모둠별 QR</button><button class="alt" data-a="gall">모두 시작</button><button class="alt" data-a="gnone">모두 마감</button><span class="hint">진행중인 모둠만 저장·제출할 수 있어요.</span></div>`:'<div class="ctl"><span class="hint">모둠을 만들면 모둠별 수업 시작 버튼이 나와요.</span></div>'}<div class="ctl"><label class="hint">전체 모둠 수 <input type="number" class="gk" min="2" max="30" inputmode="numeric" placeholder="예: 6" aria-label="만들 모둠 수" style="width:5.5em"></label><button class="alt" data-a="gmake">모둠 만들기</button><button class="alt" data-a="gseq">번호순으로</button><button class="alt" data-a="gview">모둠 보기</button></div></div>`).join(''):'<p class="hint">아직 만든 반이 없어요.</p>')+'<div id="tv"></div>';
  $('#lo').onclick=async()=>{await F.logout();teacherInit()};
  $('#mk').onclick=async()=>{const c=$('#nc').value.trim();
    if(!/^[A-Za-z0-9_-]{1,20}$/.test(c)){$('#tm').textContent='반 코드는 영문, 숫자, -, _ 만 1~20자로 적어 주세요.';return}
    if(tcache[c]){$('#tm').textContent='이미 있는 반이에요.';return}
    try{await F.createClass(c);renderClasses(F,u)}catch(e){$('#tm').textContent=errMsg(e,'t')}};
  box.querySelectorAll('.cls button').forEach(b=>b.onclick=async()=>{const c=b.closest('.cls').dataset.c,a=b.dataset.a,d=tcache[c];
    try{
      if(a==='toggle'){await F.setClass(c,{open:!d.open});renderClasses(F,u)}
      else if(a==='key'){if(confirm(c+'반의 QR을 새로 만들까요? 이전 QR은 쓸 수 없게 돼요.')){await F.setClass(c,{joinKey:F.newKey()});renderClasses(F,u)}}
      else if(a==='gtog'){const n=+b.dataset.n,cl=d.closedGroups||[];
        await F.setClass(c,{closedGroups:cl.includes(n)?cl.filter(x=>x!==n):[...cl,n].sort((x,y)=>x-y)});renderClasses(F,u)}
      else if(a==='gqr')showGroupQR(c,d);
      else if(a==='gall'){await F.setClass(c,{closedGroups:[]});renderClasses(F,u)}
      else if(a==='gnone'){await F.setClass(c,{closedGroups:Array.from({length:d.groupCount||0},(_,i)=>i+1)});renderClasses(F,u)}
      else if(a==='gmake'||a==='gseq'){const k=parseInt(b.closest('.cls').querySelector('.gk').value,10),n=d.studentCount||30;
        if(!(k>=2&&k<=30&&k<=n)){$('#tv').innerHTML='<p>모둠 수를 2~'+Math.min(30,n)+' 사이로 적어 주세요. (반 인원 '+n+'명 기준이에요. 인원은 작품 보기에서 바꿔요.)</p>';return}
        if(d.groupCount&&!confirm(c+'반의 모둠을 새로 만들까요? 지금의 모둠 편성은 바뀌어요.'))return;
        const ids=Array.from({length:n},(_,i)=>i+1),map={};
        if(a==='gmake'){for(let i=ids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}ids.forEach((no,i)=>{map[no]=i%k+1})}
        else{const base=Math.floor(n/k),ex=n%k;let p=0;for(let g=1;g<=k;g++){const sz=base+(g<=ex?1:0);for(let t=0;t<sz;t++)map[ids[p++]]=g}}
        const g={count:k,students:n,map};await F.setGroups(c,g);await F.setClass(c,{closedGroups:Array.from({length:k},(_,i)=>i+1)});renderClasses(F,u);showGroups(c,g)}
      else if(a==='gview'){const g=await F.getGroups(c);if(!g){$('#tv').innerHTML='<p>아직 만든 모둠이 없어요. 모둠 수를 적고 `모둠 만들기`를 눌러 주세요.</p>';return}showGroups(c,g)}
      else if(a==='qr')showQR(c,d);
      else if(a==='work')showWork(F,c,true)
      else if(a==='crit')showCrit(F,c)
    }catch(e){$('#tv').innerHTML='<p>'+errMsg(e,'t')+'</p>'}})}
function showGroups(c,g){const tv=$('#tv'),by={};
  Object.keys(g.map||{}).forEach(no=>{(by[g.map[no]]=by[g.map[no]]||[]).push(+no)});
  const rows=[];for(let k=1;k<=g.count;k++)rows.push([k,(by[k]||[]).sort((a,b)=>a-b)]);
  tv.innerHTML=`<h3>${esc(c)}반 모둠 (${esc(g.count)}모둠${g.students?', '+esc(g.students)+'명':''})</h3><div class="card">`+rows.map(([k,m])=>`<p style="margin:4px 0"><b>${k}모둠</b> (${m.length}명): ${m.join(', ')}</p>`).join('')+`<div class="ctl"><button class="alt" id="gcp">복사</button></div><p class="hint" style="margin-bottom:0">학생은 창작 페이지에서 <b>모둠</b>을 고르고 <b>내 모둠 찾기</b>를 누르면 자기 번호의 모둠이 자동으로 채워져요.</p></div>`;
  $('#gcp').onclick=()=>{const t=rows.map(([k,m])=>k+'모둠: '+m.join(', ')).join('\n');if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>{$('#gcp').textContent='복사했어요'})};
  tv.scrollIntoView({behavior:'smooth'})}
async function showQR(c,d){const tv=$('#tv'),url=location.origin+location.pathname+'?class='+encodeURIComponent(c)+'&key='+encodeURIComponent(d.joinKey);
  tv.innerHTML=`<h3>${esc(c)}반 QR</h3><div class="card" style="text-align:center"><div id="qr" class="qrbox"></div><p class="hint" style="word-break:break-all">${esc(url)}</p><div class="ctl" style="justify-content:center"><button class="alt" id="cp">주소 복사</button></div>${d.open?'':'<p class="hint">이 반은 지금 닫혀 있어서 학생이 저장할 수 없어요.</p>'}</div>`;
  $('#cp').onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(url).then(()=>{$('#cp').textContent='복사했어요'})};
  tv.scrollIntoView({behavior:'smooth'});
  try{await loadQR();new QRCode($('#qr'),{text:url,width:260,height:260,correctLevel:QRCode.CorrectLevel.M})}catch(e){$('#qr').textContent='QR을 만들지 못했어요. 아래 주소를 학생에게 알려 주세요.'}}
async function showGroupQR(c,d){const tv=$('#tv');
  if(!d.groupCount){tv.innerHTML='<p>먼저 모둠을 만들어 주세요.</p>';return}
  const base=location.origin+location.pathname+'?class='+encodeURIComponent(c)+'&key='+encodeURIComponent(d.joinKey)+'&g=';
  tv.innerHTML=`<h3>${esc(c)}반 모둠별 QR</h3><p class="hint">모둠마다 QR이 달라요. 각 모둠에 하나씩 보여 주세요. 이 QR로 들어오면 그 모둠 번호로 고정돼요.</p><div class="qrgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px">`+Array.from({length:d.groupCount},(_,i)=>`<div class="card" style="text-align:center"><b>${i+1}모둠</b><div class="qrbox" id="gq${i+1}"></div></div>`).join('')+'</div>';
  tv.scrollIntoView({behavior:'smooth'});
  try{await loadQR();for(let i=1;i<=d.groupCount;i++)new QRCode($('#gq'+i),{text:base+i,width:150,height:150,correctLevel:QRCode.CorrectLevel.M})}catch(e){tv.insertAdjacentHTML('beforeend','<p>QR을 만들지 못했어요. 인터넷 연결을 확인해 주세요.</p>')}}
const wMc=w=>[1,2,3,4].includes(w.measures)?w.measures:1;
const isV2=w=>w.measures===3&&Array.isArray(w.arr)&&w.arr.length>=4&&w.arr.length<=16;
const c3=x=>[0,1,2].includes(x)?x:1;
const songTxt=w=>w.arr.map((a,i)=>(i+1)+'마디 '+PN[PK[[0,1,2].includes(a)?a:0]]+' '+DYN[c3((w.dyn||[])[i])]+' '+SPD[c3((w.spd||[])[i])]);
const fillTxt=f=>f===2?'3, 4박 필인':f===1?'4박 필인':'필인 없음';
function miniGrid(w){const L=LB[w.beats],gap=w.beats/4,m=wMc(w),v2=isV2(w),per=v2?w.beats:Math.min(w.beats,8),ff=w.fill===2?w.beats/2:w.fill===1?w.beats*3/4:w.beats;let h='';
  for(let q=0;q<m;q++){if(v2)h+=`<div class="mh">${PN[PK[q]]}</div>`;else if(m>1)h+=`<div class="mh">${q+1}마디</div>`;
    for(let r=0;r<w.beats;r+=per){h+=`<div class="cg" style="grid-template-columns:repeat(${per},minmax(0,1fr))">`;
      for(let k=r;k<r+per;k++){const i=q*w.beats+k,gh=v2&&q===2&&k<w.beats*3/4,t=TK.includes(gh?w.cells[k]:w.cells[i])?(gh?w.cells[k]:w.cells[i]):'',fi=v2?(q===2&&!gh):(w.fill>0&&q===m-1&&k>=ff);h+=`<div class="cc${k%gap===0?' b':''}${fi?' fi':''}"><div class="l">${L[k]}</div><div class="slot${gh?' gh':''}${t?' f':''}">${t?SYM(t[0],t[1]):''}</div></div>`}
      h+='</div>'}}
  if(v2)h+=`<div class="mh">곡 구성 (${w.arr.length}마디)</div><div class="arrv">`+songTxt(w).map(t=>`<span class="sc">${t}</span>`).join('')+'</div>';
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
  const gn=[...new Set([...grp.map(w=>w.no),...closed,...Array.from({length:d.groupCount||0},(_,i)=>i+1)])].sort((a,b)=>a-b);
  const gh=gn.map(i=>{const st=stOf(grp.filter(w=>w.no===i));return `<span class="bd g ${st}" aria-label="모둠 ${i} ${txt[st]}">모둠 ${i}<small>${mark[st]}${closed.includes(i)?' 닫힘':''}</small></span>`}).join('');
  return `<div class="card"><div class="ctl"><b>제출 현황 (개인)</b><span class="hint">제출 ${n-miss.length} / ${n}</span><label class="hint">반 인원 <input id="cn" type="number" min="1" max="60" value="${n}" style="width:5em"></label><button class="alt" id="cs">적용</button></div><div>${h}</div>${miss.length?`<p class="hint">아직 안 낸 번호: ${miss.join(', ')}</p>`:'<p class="hint">모두 제출했어요!</p>'}${gn.length?`<div class="ctl"><b>모둠</b></div><div>${gh}</div>`:''}<p class="hint" style="margin-bottom:0">✓ 제출 · ● 작성 중 · ○ 아직 안 냄 (4·8·16비트 중 하나라도 제출하면 ✓)</p></div>`}
function csvOf(all,d,c){
  const rows=[['반','구분','번호','곡 제목','박자','마디 수','필인','곡 구성(마디별)','상태','제출시각','마지막 저장','박자 이해','창의성','표현','코멘트','리듬']];
  [...all].sort((a,b)=>(a.type===b.type?0:a.type==='group'?-1:1)||a.no-b.no||a.beats-b.beats).forEach(w=>{const f=w.feedback||{};
    rows.push([c,w.type==='group'?'모둠':'개인',w.no,w.title||'',w.beats+'비트',isV2(w)?w.arr.length:wMc(w),isV2(w)?'':fillTxt(w.fill),isV2(w)?songTxt(w).join(' / '):'',w.submitted===true?'제출':'작성 중',tmS(w.submittedAt),tmS(w.updatedAt),f.s1||'',f.s2||'',f.s3||'',f.comment||'',(isV2(w)?PK.map((k,q)=>PN[k]+': '+w.cells.slice(q*w.beats,(q+1)*w.beats).map(x=>x||'-').join(' ')).join(' | '):w.cells.map(x=>x||'-').join(' '))])});
  const have=new Set(all.filter(w=>w.type==='solo').map(w=>w.no)),n=rosterN(all,d);
  for(let i=1;i<=n;i++)if(!have.has(i))rows.push([c,'개인',i,'','','','','','안 냄','','','','','','','']);
  return rows.map(r=>r.map(qv).join(',')).join('\r\n')}
async function showWork(F,c,scroll){const tv=$('#tv');tv.innerHTML='<p class="hint">불러오는 중…</p>';
  let all;try{all=await F.listCreations(c)}catch(e){tv.innerHTML='<p>'+errMsg(e,'t')+'</p>';return}
  all=all.filter(w=>['solo','group'].includes(w.type)&&[4,8,16].includes(w.beats)&&Array.isArray(w.cells)&&w.cells.length===w.beats*wMc(w));
  const d=tcache[c]||{},subN=all.filter(w=>w.submitted===true).length,list=wf==='sub'?all.filter(w=>w.submitted===true):all;
  const srt=(a,b)=>a.no-b.no||a.beats-b.beats,gs=list.filter(w=>w.type==='group').sort(srt),ss=list.filter(w=>w.type==='solo').sort(srt);
  const opts=v=>'<option value="0">-</option>'+[1,2,3,4,5].map(n=>`<option value="${n}"${+v===n?' selected':''}>${n}</option>`).join('');
  const card=w=>{const sb=w.submitted===true,f=w.feedback||{};return `<div class="card wk" data-id="${esc(w.id)}"><div class="ctl"><b>${w.type==='group'?'모둠 '+esc(w.no):esc(w.no)+'번'}</b><span class="badge${sb?' on':''}">${sb?'제출함':'작성 중'}</span><span class="hint">${w.title?esc(w.title)+' · ':''}${w.beats}비트 ${isV2(w)?w.arr.length+'마디 곡':wMc(w)+'마디'}${w.fill?' · '+fillTxt(w.fill):''}${sb?(tmS(w.submittedAt)?' · 제출 '+tmS(w.submittedAt):''):(tmS(w.updatedAt)?' · 저장 '+tmS(w.updatedAt):'')}</span></div>${miniGrid(w)}<div class="ctl"><button data-p="1">▶ 들어보기</button>${sb?'<button class="alt" data-r="1">제출 풀기</button>':''}<button class="alt" data-x="1">삭제</button></div><details class="fbx"${w.feedback?' open':''}><summary>점수와 코멘트${w.feedback?' (입력함)':''}</summary><div class="fbg">${SCN.map(([k,nm])=>`<label>${nm} <select data-s="${k}">${opts(f[k])}</select></label>`).join('')}<label class="cm">코멘트 <textarea data-c rows="2" maxlength="300">${esc(f.comment||'')}</textarea></label><div class="ctl"><button data-fs="1">저장</button><span class="hint" data-fst></span></div></div></details></div>`};
  tv.innerHTML=`<h3>${esc(c)}반 작품</h3>`+board(all,d)+`<div class="ctl"><button class="alt" id="csv">엑셀(CSV)로 내려받기</button></div><div class="ctl"><span class="seg" role="group" aria-label="보기 방법"><button class="seg-b${wf==='sub'?' on':''}" data-f="sub">제출한 작품 (${subN})</button><button class="seg-b${wf==='all'?' on':''}" data-f="all">작성 중 포함 전체 (${all.length})</button></span></div>`+(list.length?(gs.length?`<h4 class="sec">모둠 작품 (${gs.length}개)</h4>`+gs.map(card).join(''):'')+(ss.length?`<h4 class="sec">개인 작품 (${ss.length}개)</h4>`+ss.map(card).join(''):''):`<p class="hint">${wf==='sub'?'아직 제출한 작품이 없어요.':'아직 저장된 작품이 없어요.'}</p>`);
  $('#cs').onclick=async()=>{const v=parseInt($('#cn').value,10);if(!(v>=1&&v<=60))return;try{await F.setClass(c,{studentCount:v});if(tcache[c])tcache[c].studentCount=v;showWork(F,c)}catch(e){alert(errMsg(e,'t'))}};
  $('#csv').onclick=()=>dl(c+'반_카혼작품_'+new Date().toISOString().slice(0,10)+'.csv',csvOf(all,d,c));
  tv.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{wf=b.dataset.f;showWork(F,c)});
  tv.querySelectorAll('.wk').forEach(el=>{const w=list.find(x=>x.id===el.dataset.id),nm=w.type==='group'?'모둠 '+w.no:w.no+'번';
    el.querySelector('[data-p]').onclick=()=>playCells(el,w);
    const r=el.querySelector('[data-r]');if(r)r.onclick=async()=>{if(!confirm(nm+' 제출을 풀까요? 학생이 다시 고칠 수 있게 돼요.'))return;try{await F.reopen(w.id);showWork(F,c)}catch(e){alert(errMsg(e,'t'))}};
    el.querySelector('[data-x]').onclick=async()=>{if(!confirm(nm+' 작품을 삭제할까요?'))return;try{await F.deleteCreation(w.id);showWork(F,c)}catch(e){alert(errMsg(e,'t'))}};
    el.querySelector('[data-fs]').onclick=async()=>{const st=el.querySelector('[data-fst]'),v={comment:el.querySelector('[data-c]').value.trim().slice(0,300)};
      SCN.forEach(([k])=>{v[k]=+el.querySelector('[data-s="'+k+'"]').value||0});
      try{await F.setFeedback(w.id,v);w.feedback=v;st.textContent='저장했어요 ✓'}catch(e){st.textContent=errMsg(e,'t')}}});
  if(scroll)tv.scrollIntoView({behavior:'smooth'})}
async function playCells(card,w){
  const same=card.classList.contains('playing');
  stopPlay();document.querySelectorAll('.wk.playing').forEach(x=>x.classList.remove('playing'));
  if(same)return;
  ac=ac||new AC();await ac.resume();card.classList.add('playing');
  const els=[...card.querySelectorAll('.slot')],cells=w.cells,beats=w.beats,steps=[];
  if(isV2(w)){w.arr.forEach((a,m)=>{const q=[0,1,2].includes(a)?a:0,ms=60000/(80*SV[c3((w.spd||[])[m])])*4/beats,v=DV[c3((w.dyn||[])[m])];
    const tk=barToks(cells.slice(0,beats),cells.slice(beats,2*beats),cells.slice(2*beats,3*beats),q,beats);for(let k=0;k<beats;k++)steps.push({i:(q===2&&k<beats*3/4)?k:q*beats+k,tk:tk[k],ms,v})})}
  else{const ms=60000/80*4/beats;for(let i=0;i<els.length;i++)steps.push({i,tk:cells[i],ms,v:1})}
  const my=playTok;let n=0;
  const step=()=>{if(my!==playTok)return;els.forEach(c=>c.classList.remove('on'));
    if(n>=steps.length){stopPlay();card.classList.remove('playing');return}
    const st=steps[n];els[st.i].classList.add('on');const t=st.tk;if(TK.includes(t))snd(t[0],st.v);n++;timer=setTimeout(step,st.ms)};
  step()}

/* ----- 비평 ----- */
function critHtml(){return `<p class="hint" style="margin-top:0">친구의 작품이나 들은 음악을 골라 비평하는 글을 써요. 아래 순서로 써 보면 좋아요.</p><ol class="pts"><li><b>관찰</b>: 어떤 음악 요소(리듬, 셈여림, 빠르기)가 들렸나요?</li><li><b>해석</b>: 그 요소가 어떤 느낌이나 분위기를 만드나요?</li><li><b>판단</b>: 좋았던 점과 아쉬운 점은 무엇인가요? 그 까닭도 써요.</li><li><b>제안</b>: 어떻게 바꾸면 더 좋아질까요?</li></ol><div class="card" id="cr"></div>`}
function initCrit(){const box=$('#cr'),j=lsGet('cajon-join');
  if(!j||!j.classCode){box.innerHTML='<p class="hint" style="margin:0">선생님이 보여 주는 QR 코드로 들어오면 비평을 제출할 수 있어요.</p>';return}
  let ty=(j.group||lsGet('cajon-type')==='group')?'group':'solo';const dr=lsGet('cajon-crit')||{};
  box.innerHTML=`<div class="svrow" id="cid"></div><div class="fbg"><label class="cm">비평 작품 <input id="cw" type="text" maxlength="60" placeholder="비평할 작품의 이름 (예: 3모둠의 ‘봄날’)" value="${esc(dr.w||'')}"></label><label class="cm">비평 대상 <input id="cto" type="text" maxlength="60" placeholder="비평할 대상 (예: 변형 리듬의 셈여림)" value="${esc(dr.t||'')}"></label><label class="cm">비평 내용 <textarea id="cx" rows="8" maxlength="1500" placeholder="관찰 → 해석 → 판단 → 제안 순서로 써 보세요.">${esc(dr.x||'')}</textarea></label></div><div class="svrow" style="margin-top:8px"><button id="cb">제출하기</button></div><p class="hint" id="cm" style="margin-bottom:0">제출하면 선생님이 볼 수 있고, 제출한 글은 고칠 수 없어요.</p>`;
  const sv=()=>lsSet('cajon-crit',{w:$('#cw').value,t:$('#cto').value,x:$('#cx').value});
  ['#cw','#cto','#cx'].forEach(q=>$(q).oninput=sv);
  const draw=()=>{const g=ty==='group',lk=!!j.group,no=lk?j.group:(lsGet(g?'cajon-gno':'cajon-no')||'');
    $('#cid').innerHTML=`<b>${esc(j.classCode)}반</b>${lk?`<span class="badge on">${j.group}모둠</span>`:''}<span class="seg" role="group" aria-label="내는 방법"${lk?' hidden':''}><button class="seg-b${g?'':' on'}" data-t="solo">개인</button><button class="seg-b${g?' on':''}" data-t="group">모둠</button></span><label${lk?' hidden':''}>${g?'모둠 번호':'번호'} <input id="cno"${lk?' readonly':''} type="number" min="1" max="${g?30:60}" inputmode="numeric" value="${esc(no)}"></label>`;
    $('#cid').querySelectorAll('.seg-b').forEach(b=>b.onclick=()=>{ty=b.dataset.t;lsSet('cajon-type',ty);draw()})};
  draw();
  $('#cb').onclick=async()=>{const m=$('#cm'),g=ty==='group',mx=g?30:60,v=parseInt($('#cno').value,10),w=$('#cw').value.trim(),t=$('#cto').value.trim(),x=$('#cx').value.trim();
    if(!(v>=1&&v<=mx)){m.textContent=(g?'모둠 번호를':'번호를')+' 1~'+mx+' 사이로 적어 주세요.';return}
    if(!w){m.textContent='비평 작품을 적어 주세요.';return}
    if(!t){m.textContent='비평 대상을 적어 주세요.';return}
    if(x.length<10){m.textContent='비평 내용을 10자 이상 써 주세요.';return}
    if(!confirm((g?'모둠 '+v:v+'번')+' 비평을 제출할까요? 제출하면 고칠 수 없어요.'))return;
    lsSet(g?'cajon-gno':'cajon-no',v);$('#cb').disabled=true;m.textContent='제출하는 중…';
    try{const F=await fb();await F.saveCritique({type:ty,classCode:j.classCode,no:v,joinKey:j.key,work:w.slice(0,60),target:t.slice(0,60),text:x.slice(0,1500)});
      lsSet('cajon-crit',{});$('#cw').value='';$('#cto').value='';$('#cx').value='';m.textContent='제출했어요! 선생님이 볼 수 있어요. ('+new Date().toLocaleTimeString('ko-KR')+')'}
    catch(e){m.textContent=errMsg(e)}
    $('#cb').disabled=false}}
async function showCrit(F,c){const tv=$('#tv');tv.innerHTML='<p class="hint">불러오는 중…</p>';
  let all;try{all=await F.listCritiques(c)}catch(e){tv.innerHTML='<p>'+errMsg(e,'t')+'</p>';return}
  all=all.filter(w=>['solo','group'].includes(w.type)).sort((a,b)=>(a.type===b.type?0:a.type==='group'?-1:1)||a.no-b.no||((a.createdAt&&a.createdAt.seconds)||0)-((b.createdAt&&b.createdAt.seconds)||0));
  tv.innerHTML=`<h3>${esc(c)}반 비평 (${all.length}개)</h3><div class="ctl"><button class="alt" id="ccsv">엑셀(CSV)로 내려받기</button></div>`+(all.length?all.map(w=>`<div class="card wk crt" data-id="${esc(w.id)}"><div class="ctl"><b>${w.type==='group'?'모둠 '+esc(w.no):esc(w.no)+'번'}</b><span class="hint">${esc(tmS(w.createdAt))}</span></div><p><b>비평 작품</b> ${esc(w.work)}</p><p><b>비평 대상</b> ${esc(w.target)}</p><p class="ctext">${esc(w.text)}</p><div class="ctl"><button class="alt" data-x="1">삭제</button></div></div>`).join(''):'<p class="hint">아직 제출한 비평이 없어요.</p>');
  $('#ccsv').onclick=()=>dl(c+'반_비평_'+new Date().toISOString().slice(0,10)+'.csv',[['반','구분','번호','비평 작품','비평 대상','비평 내용','제출시각'],...all.map(w=>[c,w.type==='group'?'모둠':'개인',w.no,w.work,w.target,w.text,tmS(w.createdAt)])].map(r=>r.map(qv).join(',')).join('\r\n'));
  tv.querySelectorAll('.crt').forEach(el=>el.querySelector('[data-x]').onclick=async()=>{if(!confirm('이 비평을 삭제할까요?'))return;try{await F.deleteCritique(el.dataset.id);showCrit(F,c)}catch(e){alert(errMsg(e,'t'))}});
  tv.scrollIntoView({behavior:'smooth'})}

/* ----- QR로 들어온 학생: 반 정보 기억 ----- */
(function(){const p=new URLSearchParams(location.search),c=p.get('class'),k=p.get('key'),gq=parseInt(p.get('g'),10);
  if(c&&k&&/^[A-Za-z0-9_-]{1,20}$/.test(c)&&/^[A-Za-z0-9]{4,40}$/.test(k)){
    const jj={classCode:c,key:k};if(gq>=1&&gq<=30){jj.group=gq;lsSet('cajon-type','group');lsSet('cajon-gno',gq)}lsSet('cajon-join',jj);
    try{history.replaceState(null,'',location.pathname+(location.hash||'#/make'))}catch(e){}}})();

/* 연습곡 악보: images 폴더에서 이름이 맞는 이미지를 찾아 <img>로 보여 줘요. 대소문자와 확장자가 달라도 찾아요. */
function initScore(){const box=$('#scoreBox');if(!box)return;
  const bases=['practice-score','practice-score-1','practice-score-2','practice-score-3','practice-score-4','score','악보','연습곡'],
    exts=['png','jpg','jpeg','webp','PNG','JPG','JPEG','WEBP'],dirs=['images/',''],found={};let pending=0;
  const done=()=>{if(--pending>0)return;
    const hit=bases.filter(b=>found[b]);
    if(hit.length){box.innerHTML=hit.map(b=>`<img class="score" src="${found[b]}" alt="연습곡 악보">`).join('')}
    else box.innerHTML='<p class="hint">악보 이미지를 아직 찾지 못했어요. 선생님 확인용: <a href="images/practice-score.png" target="_blank" rel="noopener">images/practice-score.png</a> 주소가 열려야 해요. (png, jpg, jpeg, webp 가능, 저장소 맨 위에 둬도 찾아요)</p>'};
  bases.forEach(b=>dirs.forEach(d=>exts.forEach(x=>{pending++;const url=d+encodeURI(b)+'.'+x,im=new Image();
    im.onload=()=>{if(!found[b])found[b]=url;done()};im.onerror=done;im.src=url+'?v=1029b'})))}
function route(){
  stopPlay();$('#menu').classList.remove('open');
  const id=(location.hash.replace('#/','')||'home');lastId=id;
  if(id==='teacher'){$('#app').innerHTML=shell('선생님 전용','<h2>선생님 전용</h2><div id="tp"></div>');
    $('#panel').innerHTML='<h4>메뉴</h4><ul><li><a href="#/">처음으로</a></li></ul>'+menuHtml(TREE,'')+'<ul><li><a href="#/teacher" class="cur">선생님 전용</a></li></ul>';
    $('#go').onclick=()=>$('#menu').classList.add('open');window.scrollTo(0,0);teacherInit();return}
  const path=find(id)||find('home'),n=path[path.length-1],par=path[path.length-2];
  let h='';
  if(n.id==='home'){h=`<main class="home"><button class="title" id="ttl">즐거운 카혼수업</button><p class="hint" id="hint">글자를 눌러 보세요</p><div class="btns" id="hb" style="display:none;width:min(100%,360px)">${n.c.map(c=>`<a class="big" href="#/${c.id}" style="text-decoration:none">${c.t}<small>${c.d}</small></a>`).join('')}</div><a class="tl" href="#/teacher">선생님 전용</a></main>`;
  }else{
    h=`<header><button class="hb" onclick="goBack()">← 뒤로</button><div class="t">${n.t}</div><button class="hb go" id="go">바로가기</button></header><main>`;
    h+=n.c?`<h2>${n.t}</h2><div class="btns">${n.c.map(c=>`<a class="big" href="#/${c.id}" style="text-decoration:none">${c.t}${c.d?`<small>${c.d}</small>`:''}</a>`).join('')}</div>`:body(n);
    h+='</main>';
  }
  $('#app').innerHTML=h+'<p class="ver">버전 1029-b</p>';
  $('#panel').innerHTML='<h4>메뉴</h4>'+`<ul><li><a href="#/">처음으로</a></li></ul>`+menuHtml(TREE,n.id)+'<ul><li><a href="#/teacher">선생님 전용</a></li></ul>';
  const go=$('#go');if(go)go.onclick=()=>$('#menu').classList.add('open');
  const showMenu=()=>{menuShown=true;try{sessionStorage.setItem('cajon-menu','1')}catch(e){}const hb=$('#hb'),hn=$('#hint');if(hb)hb.style.display='grid';if(hn)hn.style.display='none'};
  if(n.id!=='home'){menuShown=true;try{sessionStorage.setItem('cajon-menu','1')}catch(e){}}
  const t=$('#ttl');if(t){t.onclick=showMenu;if(menuShown)showMenu()}
  if(n.k==='song')initScore();
  if(n.k==='critique')initCrit();
  const pb=$('#pb');if(pb&&n.k==='create')pb.onclick=()=>playCreate(n);
  document.querySelectorAll('.pbx').forEach(b=>b.onclick=()=>togglePlay(n,b.dataset.bi));
  if(n.k==='create')initCreate(n);
  document.querySelectorAll('.z').forEach(z=>{z.onpointerdown=e=>{e.preventDefault();hit(z.dataset.k,z)};z.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();hit(z.dataset.k,z)}}});
  window.scrollTo(0,0);
}
$('#menu').onclick=e=>{if(e.target.id==='menu'||e.target.tagName==='A')$('#menu').classList.remove('open')};

/* ----- 뒤로가기: 어느 길로 들어와도 한 단계 위 페이지로 가요 (메뉴 구조: 처음 > 이론/연주/창작 > 하위 페이지) ----- */
function nav(){const id=curId(),st=history.state;
  if(!st||typeof st.i!=='number'){hi++;try{history.replaceState({i:hi},'')}catch(e){}}
  else{const back=st.i<hi;hi=st.i;
    if(back&&lastId!==null){const par=parentOf(lastId);if(par!==null&&id!==par){try{history.replaceState({i:hi},'',hashOf(par))}catch(e){}}}}
  route()}
addEventListener('popstate',nav);
(function init(){const id=curId(),st=history.state;
  if(st&&typeof st.i==='number'){hi=st.i}
  else{const ch=id==='home'?[]:(find(id)||[]).slice(1).map(n=>n.id);if(id!=='home'&&!find(id))ch.push(id);
    try{history.replaceState({i:0},'',hashOf('home'));ch.forEach((x,k)=>history.pushState({i:k+1},'',hashOf(x)))}catch(e){}
    hi=ch.length}
  route()})();
