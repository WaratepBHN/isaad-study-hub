(() => {
  'use strict';
  const app = document.getElementById('app');
  const data = window.ISAAD;
  if (!data?.modules?.length) { app.innerHTML='<div class="empty-error"><h1>ยังโหลดเนื้อหาไม่ครบ</h1><p>ลองรีเฟรชหน้าเว็บอีกครั้ง</p></div>'; return; }
  const key='isaad-study-hub-v1';
  const letters=['A','B','C','D'];
  const captions=['Phase และ milestone ที่ปลายแต่ละช่วง','Generalization · Realization · Dependency · Aggregation และ multiplicity','Actor เป็นได้ทั้งคนและระบบภายนอก โดยพิจารณาขอบเขตระบบ','Use-Case View ยึดโยงอีกสี่มุมมองใน 4+1','เปลี่ยนชื่อ A เป็น A′ โดยคงลูกศรเดิม วงจรยังอยู่','ตัวอย่าง BCE: message ส่งเข้า Schedule จึงมี operation ที่ Schedule'];
  const titles=data.modules.map(m=>m.title);
  const core=window.ISAADQuizCore;
  const banks=core.buildBanks(data);
  let state=core.restoreState(null,banks);
  let resultFilter='wrong';
  try {
    const saved=JSON.parse(localStorage.getItem(key));
    state=core.restoreState(saved,banks);
  } catch(_) {}
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const announce=text=>{document.getElementById('announcer').textContent=text;};
  const save=(newExam=false)=>{try{if(!newExam){const latest=JSON.parse(localStorage.getItem(key));if(latest?.examHistory)state.examHistory=core.cleanHistory(latest.examHistory,banks.exam.pool);}localStorage.setItem(key,JSON.stringify(core.persistentState(state)));}catch(_){announce('เบราว์เซอร์ไม่อนุญาตให้จำประวัติ การทำข้อสอบในหน้านี้ยังใช้ได้');}};
  const getScore=core.score;
  const start=id=>{if(id==='exam'){try{const latest=JSON.parse(localStorage.getItem(key));if(latest)state.examHistory=core.restoreState(latest,banks).examHistory;}catch(_){}const round=core.createExamRound(banks.exam.pool,state.examHistory);banks.exam.questions=round.questions;state.examHistory=round.history;}state.attempts[id]=core.createAttempt(banks[id].questions.length);save(id==='exam');};
  function go(hash,scroll=true){if(location.hash===hash)render(scroll);else location.hash=hash;}
  function refreshNav(){
    const parts=location.hash.split('/'),active=parts[0]==='#module'||parts[0]==='#practice'?Number(parts[1]):banks[parts[1]]?.module;
    document.getElementById('module-nav').innerHTML=data.modules.map(m=>`<a class="module-link${active===m.id?' active':''}${state.read.includes(m.id)?' read':''}" href="#module/${m.id}"${active===m.id?' aria-current="page"':''} aria-label="Module ${m.id} ${esc(m.title)}${state.read.includes(m.id)?' อ่านแล้ว':''}"><span class="index">${state.read.includes(m.id)?'✓':String(m.id).padStart(2,'0')}</span><span class="module-nav-title">${esc(m.title)}</span></a>`).join('');
    document.getElementById('reading-progress').textContent=`อ่านแล้ว ${state.read.length} / 6 บท`;
    document.getElementById('reading-fill').style.width=`${state.read.length/6*100}%`;
    const nav=location.hash.startsWith('#miracle')?'miracle':location.hash.startsWith('#module')||location.hash.startsWith('#practice')?'module':location.hash.includes('exam')?'exam':'home';
    document.querySelectorAll('[data-nav]').forEach(el=>{el.classList.toggle('active',el.dataset.nav===nav);if(el.dataset.nav===nav)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
  }
  function home(){
    const next=data.modules.find(m=>!state.read.includes(m.id))?.id||1;
    app.innerHTML=`<section class="hero"><div><span class="eyebrow">06066304 / INFORMATION SYSTEM ANALYSIS AND DESIGN</span><h1>เข้าใจระบบ<br><em>ก่อนเลือกคำตอบ</em></h1><p class="lede">ติวเข้มตั้งแต่กระบวนการพัฒนา ไปจนถึงการวิเคราะห์คลาส อ่านเหตุผลผ่านตัวอย่าง แล้วฝึกแยกคำตอบที่ “ถูก” ออกจากคำตอบที่ “ดีที่สุด”</p><div class="actions"><a class="button primary" href="#module/${next}">${state.read.length?'เรียนต่อจากที่อ่าน':'เริ่มเรียน Module 1'} <span class="arrow">→</span></a><a class="button" href="#exam">ลองสอบรวม 40 ข้อ</a></div><div class="stats-line"><span><strong>6</strong> โมดูล</span><span><strong>30</strong> ข้อฝึกแยกบท</span><span><strong>40</strong> สุ่มจากคลัง 80 ข้อ</span></div></div><div class="hero-art" aria-hidden="true"><div class="orbit"></div><div class="orbit two"></div><span class="art-tag one">ANALYSIS → DESIGN</span><div class="art-core">i.</div><span class="art-tag two">WHAT · WHY · HOW</span></div></section><div class="section-heading"><h2>เส้นทางการเรียน</h2><span>อ่านสรุปเข้ม → ฝึก 5 ข้อ → ทวนจุดพลาด</span></div><div class="module-grid">${data.modules.map(m=>{const b=banks[`practice-${m.id}`],a=state.attempts[b.id];return `<article class="module-card"><div class="card-top"><span class="chapter-number">${String(m.id).padStart(2,'0')}</span><span class="chapter-status">${a?.submitted?`ฝึกแล้ว ${getScore(b,a)}/5`:state.read.includes(m.id)?'อ่านแล้ว':'5 ข้อท้ายบท'}</span></div><h3>${esc(m.title)}</h3><p>${esc(m.subtitle)}</p><div class="card-links"><a href="#module/${m.id}">อ่านสรุปเข้ม <span aria-hidden="true">↗</span></a><a href="#practice/${m.id}">${a?.submitted?'ดูผล / ฝึกอีกครั้ง':'ฝึกแยกบท 5 ข้อ'} →</a></div></article>`;}).join('')}</div><section class="exam-banner"><div><h3>พร้อมเชื่อมทุกบทเข้าด้วยกัน?</h3><p>สุ่ม 40 จากคลัง 80 ข้อ · ชุดใหม่เมื่อกลับเข้าเว็บ · เฉลยหลังส่งคำตอบ</p></div><a class="button" href="#exam">เข้าสู่โหมดสอบ →</a></section><p class="note-line">อ่านฉบับสั้นได้ด้วย <a href="assets/ISAAD-5-minute-review.pdf" download><u>ชีตทวน 5 นาทีพร้อมภาพประกอบ</u></a> · จำผลฝึกแยกบทในเครื่อง · สอบรวมเริ่มชุดใหม่เมื่อเปิดเว็บใหม่</p>`;
    app.querySelector('.hero').insertAdjacentHTML('afterend','<a class="miracle-entry" href="#miracle"><span class="miracle-entry-number">10</span><span class="miracle-entry-copy"><strong>10 Minutes Miracle</strong><span>ทวนภาพใหญ่ทั้ง 6 Module ด้วยภาพและแผนอ่านก่อนเข้าห้อง</span></span><span class="miracle-entry-arrow" aria-hidden="true">↗</span></a>');
  }
  function miracle(){
    document.title='10 Minutes Miracle · ทวนก่อนเข้าห้อง | ISAAD Study Hub';
    app.innerHTML=window.ISAADMiracle.render(window.ISAAD_MIRACLE.modules);
  }
  function lesson(id){
    const m=data.modules.find(x=>x.id===id);if(!m){go('#home');return;}
    document.title=`Module ${id} · ${m.title} | ISAAD Study Hub`;
    app.innerHTML=`<div class="breadcrumb"><a href="#home">เส้นทางการเรียน</a><span>/</span><span>Module ${id}</span></div><header class="lesson-header"><span class="eyebrow">MODULE ${String(id).padStart(2,'0')} / 06</span><h1>${esc(m.title)}</h1><p class="lede">${esc(m.overview)}</p><div class="lesson-actions"><a class="button primary" href="#practice/${id}">ฝึกท้ายบท 5 ข้อ →</a><span class="note-line">${m.sections.length} ช่วงการเรียน · มีตัวอย่างและจุดสับสน</span></div></header><figure class="lesson-figure"><a href="assets/figures/module-${id}.png" target="_blank" rel="noopener"><img src="assets/figures/module-${id}.png" width="1424" height="300" alt="${esc(captions[id-1])}"></a><figcaption>${esc(captions[id-1])} · แตะภาพเพื่อขยาย · ภาพสรุปประกอบการเรียน</figcaption></figure><nav class="toc" aria-label="หัวข้อในบท"><span class="toc-label">ในบทนี้</span>${m.sections.map((s,i)=>`<button type="button" data-scroll="section-${i}">${esc(s.title)}</button>`).join('')}</nav>${m.sections.map((s,i)=>`<section class="lesson-section" id="section-${i}"><h2><span class="section-no">${String(i+1).padStart(2,'0')}</span>${esc(s.title)}</h2>${s.body.map(p=>`<p>${esc(p)}</p>`).join('')}${s.bullets?.length?`<ul>${s.bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}<div class="example-box"><strong>ลองมองผ่านตัวอย่าง</strong><p>${esc(s.example.scenario)}</p><p>${esc(s.example.reasoning)}</p></div><div class="pitfall"><strong>จุดที่ช้อยส์เทาชอบทำให้สับสน</strong><p class="wrong-word">${esc(s.pitfall.wrong)}</p><p>${esc(s.pitfall.correction)}</p></div><p class="source">อ้างอิง ${esc(m.sourceFile)} หน้า ${s.sourcePages.join(', ')}</p></section>`).join('')}<section class="recap"><h2>ก่อนจบบท จำให้ได้</h2><ul>${m.recap.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section><div class="lesson-end"><button type="button" class="button" data-read="${id}" aria-pressed="${state.read.includes(id)}">${state.read.includes(id)?'✓ อ่านบทนี้แล้ว':'ทำเครื่องหมายว่าอ่านแล้ว'}</button><a class="button primary" href="#practice/${id}">ทดสอบ Module ${id} · 5 ข้อ →</a>${id<6?`<a class="button quiet" href="#module/${id+1}">ไป Module ${id+1} →</a>`:'<a class="button quiet" href="#exam">ไปสอบรวม 40 ข้อ →</a>'}</div>`;
  }
  function examIntro(){
    const a=state.attempts.exam;
    document.title='สอบรวม 40 ข้อ | ISAAD Study Hub';
    app.innerHTML=`<section class="exam-intro"><div class="breadcrumb"><a href="#home">เส้นทางการเรียน</a><span>/</span><span>สอบรวม</span></div><span class="eyebrow">FINAL PRACTICE / MODULE 1–6</span><h1>ทดสอบความเข้าใจ<br>ทั้ง 6 โมดูล</h1><p class="lede">สุ่ม 40 ข้อจากคลัง 80 ข้อที่แยกจากแบบฝึกท้ายบท ครบทั้ง 6 โมดูล ชุดใหม่เมื่อเปิดเว็บ รีเฟรช หรือเริ่มทำใหม่ เฉลยแสดงหลังส่งคำตอบครบ</p><div class="exam-facts"><div class="exam-fact"><strong>40</strong><span>ข้อ ครอบคลุมทุกโมดูล</span></div><div class="exam-fact"><strong>80</strong><span>ข้อในคลังสุ่ม</span></div><div class="exam-fact"><strong>6</strong><span>โมดูลในทุกรอบ</span></div></div><div class="exam-rules"><h3>ก่อนเริ่ม</h3><ul><li>ช้อยส์ขาว = ดีที่สุด · เทา = ถูกแต่ยังไม่ครบโจทย์ · ดำ = ผิด</li><li>เลือกทีละข้อ ย้อนกลับไปแก้ได้ และใช้เลขข้อกระโดดไปข้อที่ต้องการได้</li><li>คะแนนนับเฉพาะคำตอบที่ดีที่สุด ต้องตอบครบ 40 ข้อก่อนส่ง</li><li>เปิดเว็บใหม่หรือรีเฟรชจะสุ่มชุดใหม่ คำตอบสอบรวมจึงไม่เก็บข้ามการเปิดเว็บ</li><li>หยิบข้อที่ยังไม่ถูกสุ่มก่อน เมื่อครบ 80 ข้อจึงวนคลังใหม่ และไม่ใช้โจทย์ฝึกแยกบททั้ง 30 ข้อ</li></ul></div>${a&&!a.submitted?`<p class="saved-note">ชุดที่กำลังทำในการเปิดเว็บครั้งนี้: ตอบแล้ว ${a.answers.filter(x=>x!==null).length} / 40 ข้อ</p>`:''}<div class="actions">${a&&!a.submitted?'<a href="#quiz/exam" class="button primary">ทำต่อจากที่ค้าง →</a><button type="button" class="button" data-start="exam">เริ่มใหม่ทั้ง 40 ข้อ</button>':`<button type="button" class="button primary" data-start="exam">เริ่มสอบ 40 ข้อ →</button>${a?.submitted?'<a class="button" href="#result/exam">ดูผลครั้งล่าสุด</a>':''}`}<a class="button quiet" href="#module/1">กลับไปทวนเนื้อหา</a></div><p class="note-line">ข้อฝึกสร้างขึ้นจากสไลด์อาจารย์ ไม่ใช่ข้อสอบจริงหรือการทำนายข้อสอบ</p></section>`;
  }
  function feedback(q,answer){
    return `<div class="feedback${answer===q.correct?'':' incorrect'}"><h3>${answer===q.correct?`ถูกที่สุด · ${letters[answer]} (ขาว)`:`เลือก ${letters[answer]} · ช้อยส์${q.shades[answer]} — ที่ดีที่สุดคือ ${letters[q.correct]}`}</h3><p>${esc(q.explanation)}</p><details class="choice-explanations"><summary>เหตุผลของทุกตัวเลือก</summary>${q.options.map((text,i)=>`<div class="choice-reason"><strong>${letters[i]}. ${esc(text)}</strong><span class="shade">${q.shades[i]}</span><div>${esc(q.reasons[i])}</div></div>`).join('')}</details><p class="source">อ้างอิง ${esc(q.source.file)} หน้า ${q.source.page}</p></div>`;
  }
  function quiz(id){
    const b=banks[id];if(!b){go('#home');return;}if(!state.attempts[id])start(id);
    const a=state.attempts[id];if(a.submitted){go(`#result/${id}`);return;}
    const q=b.questions[a.current],answer=a.answers[a.current],isPractice=b.mode==='practice',graded=isPractice&&a.graded[a.current],n=b.questions.length,answered=a.answers.filter(x=>x!==null).length;
    document.title=`ข้อ ${a.current+1}/${n} · ${b.label} | ISAAD Study Hub`;
    app.innerHTML=`<div class="breadcrumb"><a href="${isPractice?`#module/${b.module}`:'#exam'}">${isPractice?`Module ${b.module}`:'สอบรวม'}</a><span>/</span><span>${isPractice?'ฝึกแยกบท':'โหมดสอบ'}</span></div><div class="quiz-top"><strong>ข้อ ${a.current+1} / ${n}</strong><span>ตอบแล้ว <span id="answered-count">${answered}</span> / ${n}</span></div><div class="quiz-progress" role="progressbar" aria-label="จำนวนข้อที่ตอบ" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${answered}"><span style="width:${answered/n*100}%"></span></div><span class="quiz-topic">MODULE ${q.module} · ${esc(q.topic)}</span><h1 class="quiz-heading">${esc(q.stem)}</h1><fieldset class="choices"><legend class="sr-only">เลือกคำตอบที่ดีที่สุดหนึ่งข้อ</legend>${q.options.map((text,i)=>`<label class="choice"><input type="radio" name="answer" value="${i}" data-answer="${i}" ${answer===i?'checked':''} ${graded?'disabled':''}><span class="choice-letter">${letters[i]}.</span><span>${esc(text)}</span></label>`).join('')}</fieldset>${graded?feedback(q,answer):''}<div id="quiz-error" role="alert"></div><div class="question-controls"><button type="button" class="button quiet" data-prev="${id}" ${a.current===0?'disabled':''}>← ข้อก่อนหน้า</button>${a.current===n-1?`<button type="button" class="button primary" data-submit="${id}" ${isPractice&&!graded?'disabled':''}>${isPractice?'ดูผล 5 ข้อ':'ส่งคำตอบ 40 ข้อ'} →</button>`:`<button type="button" class="button primary" data-next="${id}" ${isPractice&&!graded?'disabled':''}>ข้อถัดไป →</button>`}</div><div class="exam-map"><div class="exam-map-label"><span>${isPractice?'เลือกข้อเพื่ออ่านทวน':'เลือกเลขข้อเพื่อย้อนตรวจคำตอบ'}</span><span>พื้นเข้ม = ข้อปัจจุบัน</span></div><div class="question-grid">${b.questions.map((_,i)=>`<button type="button" class="q-num${a.answers[i]!==null?' answered':''}${a.current===i?' current':''}" data-question="${i}" data-bank="${id}" aria-label="ข้อ ${i+1}${a.answers[i]!==null?' ตอบแล้ว':' ยังไม่ตอบ'}" ${a.current===i?'aria-current="step"':''}>${i+1}</button>`).join('')}</div></div><p class="quiz-notice">${isPractice?'แตะคำตอบเพื่อตรวจทันที คำตอบที่ตรวจแล้วจะล็อกไว้ · ชุดแยกบทไม่ซ้ำชุดสอบรวม':'เลือกคำตอบและย้อนแก้ได้ เฉลยทุกตัวเลือกและคะแนนจะแสดงหลังส่ง · เปิดเว็บใหม่หรือรีเฟรชจะเริ่มชุดสุ่มใหม่'}</p>`;
  }
  function results(id){
    const b=banks[id],a=state.attempts[id];if(!b||!a?.submitted){go(b?.mode==='practice'?`#practice/${b.module}`:'#exam');return;}
    const n=b.questions.length,score=getScore(b,a),wrong=b.questions.map((q,i)=>({q,i})).filter(({q,i})=>a.answers[i]!==q.correct),all=b.questions.map((q,i)=>({q,i}));
    const list=resultFilter==='all'||!wrong.length?all:wrong;
    document.title=`${score}/${n} · ผล${b.label} | ISAAD Study Hub`;
    app.innerHTML=`<div class="breadcrumb"><a href="#home">เส้นทางการเรียน</a><span>/</span><span>ผล${esc(b.label)}</span></div><section class="score-hero"><div class="score-value">${score}<small> / ${n}</small></div><div><span class="eyebrow">${b.mode==='exam'?'FINAL PRACTICE':'MODULE PRACTICE'} / เสร็จแล้ว</span><h1>${score===n?'เลือกคำตอบดีที่สุดครบทุกข้อ':'รู้จุดที่ควรกลับไปทวนแล้ว'}</h1><p>${wrong.length?`ยังมี ${wrong.length} ข้อให้ทวนเหตุผลด้านล่าง`:'เปิดเฉลยด้านล่างเพื่อย้ำเหตุผลอีกครั้ง'} · คะแนนชุดฝึกนี้ไม่ใช่การคาดการณ์คะแนนสอบจริง</p></div></section>${b.mode==='exam'?`<div class="module-scores">${data.modules.map(m=>{const indexes=b.questions.map((q,i)=>q.module===m.id?i:-1).filter(i=>i>=0),s=indexes.filter(i=>a.answers[i]===b.questions[i].correct).length;return `<a href="#module/${m.id}" class="module-score"><strong>Module ${m.id} <span>${s}/${indexes.length}</span></strong><span>${esc(m.title)}</span><div class="mini-track"><span style="width:${s/indexes.length*100}%"></span></div></a>`;}).join('')}</div>`:''}<div class="actions"><a class="button primary" href="${b.mode==='practice'?`#module/${b.module}`:'#module/1'}">กลับไปทวนเนื้อหา →</a><button type="button" class="button" data-start="${id}">${b.mode==='exam'?'สุ่มชุดใหม่ 40 ข้อ':'ทำชุดเดิมอีกครั้ง'}</button>${b.mode==='practice'?'<a class="button quiet" href="#exam">ลองสอบรวม 40 ข้อ →</a>':''}</div><div class="section-heading"><h2>${wrong.length?'ทวนเหตุผล ไม่จำแค่ตัวอักษร':'เฉลยและเหตุผลทุกข้อ'}</h2><span>${list.length} ข้อ</span></div>${wrong.length?`<div class="actions"><button type="button" class="button${resultFilter==='wrong'?' primary':''}" data-filter="wrong" data-bank="${id}" aria-pressed="${resultFilter==='wrong'}">ข้อที่พลาด ${wrong.length}</button><button type="button" class="button${resultFilter==='all'?' primary':''}" data-filter="all" data-bank="${id}" aria-pressed="${resultFilter==='all'}">เฉลยทั้งหมด ${n}</button></div>`:''}<div class="review-list">${list.map(({q,i},k)=>`<details class="review-question" ${k===0?'open':''}><summary>ข้อ ${i+1} · Module ${q.module} · ${esc(q.topic)} ${a.answers[i]===q.correct?'✓':'↺'}</summary><p>${esc(q.stem)}</p><div class="answer-line">คำตอบของคุณ ${letters[a.answers[i]]} (${q.shades[a.answers[i]]}) · <strong>ดีที่สุด ${letters[q.correct]}</strong></div><p>${esc(q.explanation)}</p>${q.options.map((text,j)=>`<div class="choice-reason"><strong>${letters[j]}. ${esc(text)}</strong><span class="shade">${q.shades[j]}</span><div>${esc(q.reasons[j])}</div></div>`).join('')}<p class="source">อ้างอิง ${esc(q.source.file)} หน้า ${q.source.page}</p><div class="actions"><a class="button quiet" href="#module/${q.module}">อ่าน Module ${q.module} →</a></div></details>`).join('')}</div>`;
  }
  function render(scroll=true){
    const [page,id]=(location.hash.slice(1)||'home').split('/');
    document.title='ISAAD Study Hub · เข้าใจระบบก่อนเลือกคำตอบ';
    if(page==='module')lesson(Number(id));
    else if(page==='practice') {const bank=banks[`practice-${Number(id)}`];if(!bank){go('#home');return;}if(!state.attempts[bank.id])start(bank.id);if(state.attempts[bank.id].submitted)results(bank.id);else quiz(bank.id);}
    else if(page==='miracle')miracle();
    else if(page==='exam')examIntro();
    else if(page==='quiz')quiz(id);
    else if(page==='result')results(id);
    else home();
    refreshNav();if(scroll)window.scrollTo({top:0,behavior:'instant'});
  }
  function currentBank(){const [p,id]=(location.hash.slice(1)||'home').split('/');return banks[p==='practice'?`practice-${Number(id)}`:id];}
  app.addEventListener('change',event=>{
    const input=event.target;if(!input.matches('[data-answer]'))return;
    const b=currentBank(),a=state.attempts[b?.id],choice=Number(input.value);
    if(!a||!core.choose(b,a,choice))return;
    save();
    if(b.mode==='practice'){quiz(b.id);const q=b.questions[a.current];announce(choice===q.correct?'เลือกคำตอบที่ดีที่สุด':'คำตอบที่ดีที่สุดคือ '+letters[q.correct]);app.querySelector('[data-next],[data-submit]')?.focus({preventScroll:true});}
    else {const count=a.answers.filter(x=>x!==null).length;document.getElementById('answered-count').textContent=count;const progress=app.querySelector('.quiz-progress');progress.setAttribute('aria-valuenow',count);progress.firstElementChild.style.width=`${count/b.questions.length*100}%`;const dot=app.querySelector(`[data-question="${a.current}"]`);dot.classList.add('answered');dot.setAttribute('aria-label',`ข้อ ${a.current+1} ตอบแล้ว`);}
  });
  app.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.scroll){document.getElementById(button.dataset.scroll)?.scrollIntoView({block:'start'});return;}
    if(button.dataset.read){const id=Number(button.dataset.read),index=state.read.indexOf(id);if(index<0)state.read.push(id);else state.read.splice(index,1);save();button.textContent=index<0?'✓ อ่านบทนี้แล้ว':'ทำเครื่องหมายว่าอ่านแล้ว';button.setAttribute('aria-pressed',String(index<0));refreshNav();return;}
    if(button.dataset.start){start(button.dataset.start);resultFilter='wrong';go(`#quiz/${button.dataset.start}`);return;}
    if(button.dataset.filter){resultFilter=button.dataset.filter;results(button.dataset.bank);return;}
    const id=button.dataset.next||button.dataset.prev||button.dataset.submit||button.dataset.bank;
    const b=banks[id],a=state.attempts[id];if(!a||!b)return;
    if(button.dataset.question!==undefined){a.current=Number(button.dataset.question);save();quiz(id);window.scrollTo({top:0,behavior:'instant'});return;}
    if(button.dataset.prev){a.current=Math.max(0,a.current-1);save();quiz(id);window.scrollTo({top:0,behavior:'instant'});return;}
    if(button.dataset.next){if(b.mode==='practice'&&!a.graded[a.current])return;a.current=Math.min(b.questions.length-1,a.current+1);save();quiz(id);window.scrollTo({top:0,behavior:'instant'});return;}
    if(button.dataset.submit){const missing=core.missing(a);if(missing.length){document.getElementById('quiz-error').innerHTML=`<p class="error">ยังไม่ได้ตอบ ${missing.length} ข้อ: ${missing.map(i=>i+1).join(', ')} · เลือกเลขข้อด้านล่างเพื่อกลับไปตอบ</p>`;announce(`ยังไม่ได้ตอบ ${missing.length} ข้อ`);return;}if(!core.submit(b,a))return;save();resultFilter='wrong';go(`#result/${id}`);}
  });
  document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();document.getElementById('main').focus();});
  window.addEventListener('hashchange',()=>render());
  window.addEventListener('pageshow',event=>{if(!event.persisted)return;try{state=core.restoreState(JSON.parse(localStorage.getItem(key)),banks);}catch(_){delete state.attempts.exam;}banks.exam.questions=[];render();announce('กลับเข้าเว็บแล้ว ข้อสอบรวมจะใช้ชุดสุ่มใหม่');});
  window.addEventListener('storage',event=>{if(event.key!==key||!event.newValue)return;try{const latest=JSON.parse(event.newValue);if(latest?.examHistory)state.examHistory=core.cleanHistory(latest.examHistory,banks.exam.pool);}catch(_){}});
  render();
})();
