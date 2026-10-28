/* 만화풍(애니메이션 느낌) 그림 모음. 모두 직접 그린 SVG라 사진 파일 없이도 선명하게 보여요. */
const ART=(()=>{
  const W1='#f2c98b',W2='#e2a964',W3='#c98a45',WD='#8a5524',LN='#5c3510',SK='#ffd9bd',SKD='#f0b894',HAIR='#5a3a2a',SHIRT='#fdfdfd',PANT='#2a2d34',SH='#f4f4f4',BG1='#fff4dd';
  const svg=(vb,label,inner,cls='art')=>`<svg class="${cls}" viewBox="${vb}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

  /* 카혼 상자 (앞면 + 옆면 + 윗면). x,y는 앞면 왼쪽 위 */
  function box3d(x,y,w,h,opt={}){
    const d=Math.round(w*.26),t=Math.round(h*.2);
    const front=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${W1}" stroke="${LN}" stroke-width="3"/>`
      +`<rect x="${x+6}" y="${y+6}" width="${w-12}" height="${h-12}" rx="3" fill="${W2}" opacity=".35"/>`;
    const side=`<polygon points="${x+w},${y} ${x+w+d},${y-t*.55} ${x+w+d},${y+h-t*.55} ${x+w},${y+h}" fill="${W3}" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`;
    const top=`<polygon points="${x},${y} ${x+d},${y-t*.55} ${x+w+d},${y-t*.55} ${x+w},${y}" fill="#f7dcaa" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`;
    let dots='';
    if(opt.dots){const n=Math.max(4,Math.round(w/22));for(let i=0;i<n;i++){const cx=x+10+i*(w-20)/(n-1);dots+=`<circle cx="${cx}" cy="${y+8}" r="2" fill="${LN}"/><circle cx="${cx}" cy="${y+h-8}" r="2" fill="${LN}"/>`}
      for(let i=1;i<4;i++){const cy=y+8+i*(h-16)/4;dots+=`<circle cx="${x+8}" cy="${cy}" r="2" fill="${LN}"/><circle cx="${x+w-8}" cy="${cy}" r="2" fill="${LN}"/>`}}
    const feet=`<rect x="${x+8}" y="${y+h}" width="14" height="8" rx="2" fill="#2a2a2a"/><rect x="${x+w-22}" y="${y+h}" width="14" height="8" rx="2" fill="#2a2a2a"/>`;
    const hole=opt.hole?`<circle cx="${x+w/2}" cy="${y+h*.45}" r="${w*.17}" fill="#2b2018" stroke="${LN}" stroke-width="3"/><ellipse cx="${x+w/2-4}" cy="${y+h*.45-5}" rx="${w*.06}" ry="${w*.035}" fill="#fff" opacity=".18"/>`:'';
    return top+side+front+dots+hole+feet+(opt.extra||'');
  }

  function origin(){
    const sparkle=(x,y,s=1)=>`<path d="M${x} ${y-8*s}L${x+2.5*s} ${y-2.5*s}L${x+8*s} ${y}L${x+2.5*s} ${y+2.5*s}L${x} ${y+8*s}L${x-2.5*s} ${y+2.5*s}L${x-8*s} ${y}L${x-2.5*s} ${y-2.5*s}Z" fill="#fff" opacity=".9"/>`;
    const a=box3d(48,52,120,150,{dots:true,extra:`<rect x="62" y="104" width="92" height="30" rx="15" fill="#fff" opacity=".0"/>`});
    const b=box3d(268,52,120,150,{hole:true,dots:false});
    return svg('0 0 460 250','카혼 그림: 앞면과 뒷면(사운드 홀)',
      `<rect width="460" height="250" rx="16" fill="${BG1}"/><ellipse cx="116" cy="226" rx="86" ry="9" fill="#000" opacity=".12"/><ellipse cx="336" cy="226" rx="86" ry="9" fill="#000" opacity=".12"/>${a}${b}${sparkle(40,40)}${sparkle(432,48,.8)}`
      +`<text x="104" y="244" text-anchor="middle" class="at">앞면</text><text x="326" y="244" text-anchor="middle" class="at">뒷면 (사운드 홀)</text>`);
  }

  /* 사람(앞모습) */
  function personFront(ox=0,oy=0){
    return `<g transform="translate(${ox} ${oy})">`
      +`<rect x="96" y="176" width="68" height="104" rx="4" fill="${W1}" stroke="${LN}" stroke-width="3"/><rect x="96" y="266" width="68" height="14" fill="${W3}" opacity=".5"/><rect x="104" y="280" width="12" height="7" rx="2" fill="#2a2a2a"/><rect x="144" y="280" width="12" height="7" rx="2" fill="#2a2a2a"/>`
      /* 다리 */
      +`<path d="M112 178 L58 196 L52 264" fill="none" stroke="${LN}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 178 L58 196 L52 264" fill="none" stroke="${PANT}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>`
      +`<path d="M148 178 L202 196 L208 264" fill="none" stroke="${LN}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/><path d="M148 178 L202 196 L208 264" fill="none" stroke="${PANT}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>`
      +`<ellipse cx="50" cy="274" rx="22" ry="11" fill="${SH}" stroke="${LN}" stroke-width="3"/><ellipse cx="210" cy="274" rx="22" ry="11" fill="${SH}" stroke="${LN}" stroke-width="3"/><path d="M34 276h32M194 276h32" stroke="#9aa3b2" stroke-width="3"/>`
      /* 몸통 */
      +`<path d="M82 100 Q130 86 178 100 L184 182 Q130 196 76 182 Z" fill="${SHIRT}" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`
      /* 팔 */
      +`<path d="M84 108 L74 150" stroke="${LN}" stroke-width="26" stroke-linecap="round"/><path d="M84 108 L74 150" stroke="${SHIRT}" stroke-width="20" stroke-linecap="round"/>`
      +`<path d="M176 108 L186 150" stroke="${LN}" stroke-width="26" stroke-linecap="round"/><path d="M176 108 L186 150" stroke="${SHIRT}" stroke-width="20" stroke-linecap="round"/>`
      +`<path d="M74 156 L108 196" stroke="${LN}" stroke-width="17" stroke-linecap="round"/><path d="M74 156 L108 196" stroke="${SK}" stroke-width="11" stroke-linecap="round"/>`
      +`<path d="M186 156 L152 196" stroke="${LN}" stroke-width="17" stroke-linecap="round"/><path d="M186 156 L152 196" stroke="${SK}" stroke-width="11" stroke-linecap="round"/>`
      +`<ellipse cx="112" cy="200" rx="12" ry="9" fill="${SK}" stroke="${LN}" stroke-width="3"/><ellipse cx="148" cy="200" rx="12" ry="9" fill="${SK}" stroke="${LN}" stroke-width="3"/>`
      /* 머리 */
      +`<rect x="120" y="82" width="20" height="16" fill="${SKD}"/>`
      +`<ellipse cx="130" cy="58" rx="30" ry="32" fill="${SK}" stroke="${LN}" stroke-width="3"/>`
      +`<path d="M98 56 Q98 22 130 22 Q162 22 162 56 Q150 36 130 38 Q110 36 98 56Z" fill="${HAIR}" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`
      +`<path d="M98 50 Q92 74 100 92 Q106 70 104 52Z" fill="${HAIR}" stroke="${LN}" stroke-width="2.5"/><path d="M162 50 Q168 74 160 92 Q154 70 156 52Z" fill="${HAIR}" stroke="${LN}" stroke-width="2.5"/>`
      +`<ellipse cx="118" cy="62" rx="3.6" ry="5" fill="#2b1d16"/><ellipse cx="142" cy="62" rx="3.6" ry="5" fill="#2b1d16"/><circle cx="119.4" cy="60.2" r="1.3" fill="#fff"/><circle cx="143.4" cy="60.2" r="1.3" fill="#fff"/>`
      +`<ellipse cx="111" cy="73" rx="6" ry="3.4" fill="#ff9a9a" opacity=".5"/><ellipse cx="149" cy="73" rx="6" ry="3.4" fill="#ff9a9a" opacity=".5"/><path d="M123 76 Q130 82 137 76" fill="none" stroke="${LN}" stroke-width="2.5" stroke-linecap="round"/>`
      +`</g>`;
  }
  /* 사람(옆모습, 오른쪽을 봄) */
  function personSide(ox=0,oy=0){
    return `<g transform="translate(${ox} ${oy})">`
      +`<rect x="64" y="184" width="92" height="96" rx="4" fill="${W1}" stroke="${LN}" stroke-width="3"/><rect x="64" y="266" width="92" height="14" fill="${W3}" opacity=".5"/><rect x="70" y="280" width="14" height="7" rx="2" fill="#2a2a2a"/><rect x="136" y="280" width="14" height="7" rx="2" fill="#2a2a2a"/>`
      /* 뒷다리 */
      +`<path d="M96 178 L170 186 L172 262" fill="none" stroke="${LN}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/><path d="M96 178 L170 186 L172 262" fill="none" stroke="${PANT}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>`
      +`<path d="M164 274 Q194 268 200 276 L162 282Z" fill="${SH}" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`
      /* 몸통: 살짝 뒤로 기울임 */
      +`<path d="M70 104 Q96 88 120 100 Q132 140 120 186 Q92 196 72 184 Q60 140 70 104Z" fill="${SHIRT}" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`
      /* 팔 */
      +`<path d="M92 112 L112 158" stroke="${LN}" stroke-width="24" stroke-linecap="round"/><path d="M92 112 L112 158" stroke="${SHIRT}" stroke-width="18" stroke-linecap="round"/>`
      +`<path d="M112 160 L152 186" stroke="${LN}" stroke-width="17" stroke-linecap="round"/><path d="M112 160 L152 186" stroke="${SK}" stroke-width="11" stroke-linecap="round"/><ellipse cx="158" cy="190" rx="11" ry="9" fill="${SK}" stroke="${LN}" stroke-width="3"/>`
      /* 앞다리 가림 무릎 */
      +`<path d="M100 178 L168 188" fill="none" stroke="${PANT}" stroke-width="30" stroke-linecap="round" opacity=".0"/>`
      /* 머리 */
      +`<rect x="82" y="84" width="18" height="18" fill="${SKD}" transform="rotate(-8 90 92)"/>`
      +`<ellipse cx="94" cy="62" rx="28" ry="30" fill="${SK}" stroke="${LN}" stroke-width="3"/><path d="M121 64 L128 70 L121 73" fill="${SK}" stroke="${LN}" stroke-width="2.5" stroke-linejoin="round"/>`
      +`<path d="M64 62 Q62 26 96 26 Q124 28 122 54 Q106 38 92 44 Q80 50 78 74 Q70 72 64 62Z" fill="${HAIR}" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`
      +`<path d="M68 48 Q40 56 36 92 Q58 82 66 62Z" fill="${HAIR}" stroke="${LN}" stroke-width="3" stroke-linejoin="round"/>`
      +`<ellipse cx="108" cy="62" rx="3.4" ry="4.8" fill="#2b1d16"/><circle cx="109.2" cy="60.4" r="1.2" fill="#fff"/><ellipse cx="102" cy="73" rx="5" ry="3" fill="#ff9a9a" opacity=".5"/><path d="M110 77 Q115 80 119 76" fill="none" stroke="${LN}" stroke-width="2.4" stroke-linecap="round"/>`
      +`</g>`;
  }
  function posture(){
    return svg('0 0 560 310','카혼 연주 자세 그림: 앞모습과 옆모습',
      `<rect width="560" height="310" rx="16" fill="${BG1}"/><line x1="16" y1="290" x2="544" y2="290" stroke="#d9c39a" stroke-width="3"/>`
      +personFront(10,0)+personSide(290,0)
      +`<text x="140" y="306" text-anchor="middle" class="at">앞모습</text><text x="420" y="306" text-anchor="middle" class="at">옆모습</text>`);
  }

  function structure(){
    /* 왼쪽: 구조도 */
    const L=`<g>`
      +`<rect x="150" y="30" width="150" height="14" rx="4" fill="${W3}" stroke="${LN}" stroke-width="3"/>`
      +`<rect x="152" y="44" width="146" height="150" rx="6" fill="${W1}" stroke="${LN}" stroke-width="3"/>`
      +`<rect x="166" y="58" width="118" height="122" rx="3" fill="${W2}" stroke="${LN}" stroke-width="2.5"/>`
      +`<rect x="160" y="194" width="22" height="10" rx="3" fill="#2a2a2a"/><rect x="268" y="194" width="22" height="10" rx="3" fill="#2a2a2a"/>`
      +`<g stroke="#8a7a66" stroke-width="1.6" fill="none"><path d="M150 36H96"/><path d="M166 110H96"/><path d="M160 200H96"/><path d="M298 120H330"/></g>`
      +`<g class="at2"><text x="8" y="40">앉는 면</text><text x="8" y="114">타격면</text><text x="8" y="204">고무 발</text><text x="304" y="116">몸통</text><text x="304" y="132" style="font-size:12px">(속: 스네어)</text></g></g>`;
    /* 오른쪽: 뒷면 */
    const R=box3d(410,34,92,140,{hole:true});
    const lab=`<g stroke="#8a7a66" stroke-width="1.6" fill="none"><path d="M472 100H530"/></g><g class="at2"><text x="534" y="98">사운드 홀</text><text x="534" y="114" style="font-size:12px">(Sound-hole)</text></g>`;
    return svg('0 0 640 250','카혼 구조 그림: 앉는 면, 타격면, 몸통, 고무 발, 사운드 홀',
      `<rect width="640" height="250" rx="16" fill="${BG1}"/>${L}${R}${lab}<text x="456" y="206" text-anchor="middle" class="at">뒷면</text>`);
  }

  function snare(){
    const wire=(x)=>`<rect x="${x-13}" y="40" width="26" height="22" rx="6" fill="#222" stroke="#000" stroke-width="2"/><rect x="${x-5}" y="34" width="10" height="8" rx="2" fill="#777"/><path d="M${x-6} 62V190M${x+6} 62V190" stroke="#8d8d8d" stroke-width="3"/><path d="M${x-6} 62V190M${x+6} 62V190" stroke="#d8d8d8" stroke-width="1" />`;
    return svg('0 0 340 210','카혼 안쪽의 스네어(울림 줄) 그림',
      `<rect width="340" height="210" rx="16" fill="${W2}"/><rect y="0" width="340" height="28" rx="0" fill="${W3}"/><path d="M0 28H340" stroke="${LN}" stroke-width="3"/>`
      +`<g opacity=".25" stroke="${LN}" stroke-width="2" fill="none"><path d="M20 80Q90 70 160 84T320 78"/><path d="M10 130Q100 120 180 134T330 128"/><path d="M20 176Q90 168 170 180T322 174"/></g>`
      +wire(96)+wire(244)+`<text x="170" y="204" text-anchor="middle" class="at" style="font-size:13px">스네어(울림 줄)</text>`);
  }

  /* 손 */
  function hand(x,y,s,fill,rot=0){
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-14" y="-4" width="28" height="30" rx="10" fill="${fill}" stroke="${LN}" stroke-width="2.4"/>`
      +[-10,-3.5,3.5,10].map((dx,i)=>`<rect x="${dx-3}" y="${-24+(i===1||i===2?-4:0)}" width="6.5" height="${24+(i===1||i===2?4:0)}" rx="3.2" fill="${fill}" stroke="${LN}" stroke-width="2.2"/>`).join('')
      +`<path d="M-15 8 L-24 -4 Q-26 -9 -20 -8 L-12 4Z" fill="${fill}" stroke="${LN}" stroke-width="2.2" stroke-linejoin="round"/></g>`;
  }
  function symbols(){
    const cx=240,cy=106;
    const body=`<rect x="${cx-70}" y="${cy-70}" width="140" height="150" rx="6" fill="${W1}" stroke="${LN}" stroke-width="3"/><rect x="${cx-62}" y="${cy-62}" width="124" height="134" rx="3" fill="${W2}" stroke="${LN}" stroke-width="2"/>`
      +`<rect x="${cx-64}" y="${cy-80}" width="128" height="10" rx="3" fill="#333"/>`
      +`<circle cx="${cx}" cy="${cy-18}" r="24" fill="#e03e3e" stroke="${LN}" stroke-width="3"/><text x="${cx}" y="${cy-13}" text-anchor="middle" style="font-size:14px;font-weight:700;fill:#fff">B</text>`
      +`<rect x="${cx-32}" y="${cy+30}" width="26" height="26" fill="#2f9bea" stroke="${LN}" stroke-width="3"/><rect x="${cx+6}" y="${cy+30}" width="26" height="26" fill="#2f9bea" stroke="${LN}" stroke-width="3"/>`
      +`<polygon points="${cx-58},${cy+43} ${cx-45},${cy+30} ${cx-45},${cy+56}" fill="#e6c13a" stroke="${LN}" stroke-width="2.5"/><polygon points="${cx+58},${cy+43} ${cx+45},${cy+30} ${cx+45},${cy+56}" fill="#e6c13a" stroke="${LN}" stroke-width="2.5"/>`
      +`<rect x="${cx-70}" y="${cy+80}" width="140" height="12" rx="3" fill="${W3}" stroke="${LN}" stroke-width="2.5"/>`;
    const call=(x,y,t1,t2,col,fx,fy,hx,hy,rot)=>`<path d="M${fx} ${fy}L${hx} ${hy}" stroke="${col}" stroke-width="3" stroke-dasharray="5 4"/>`+hand(x,y,1.05,SK,rot)+`<rect x="${x-44}" y="${y+34}" width="88" height="40" rx="10" fill="#fff" stroke="${col}" stroke-width="3"/><text x="${x}" y="${y+51}" text-anchor="middle" style="font-size:14px;font-weight:700;fill:#222">${t1}</text><text x="${x}" y="${y+67}" text-anchor="middle" style="font-size:12px;fill:#555">${t2}</text>`;
    return svg('0 0 480 270','손 위치와 소리 이름 그림: 핑거, 슬랩, 베이스',
      `<rect width="480" height="270" rx="16" fill="${BG1}"/>${body}`
      +call(62,34,'핑거(치)','약하게 톡',"#c9a21d",92,70,cx-56,cy+43,-10)
      +call(418,34,'슬랩(띠)','세게 탁',"#1f7fc4",388,70,cx+20,cy+36,10)
      +call(62,150,'베이스(쿵)','낮고 깊게',"#c93030",96,176,cx-26,cy-8,-5));
  }

  return {origin,posture,structure,snare,symbols};
})();
