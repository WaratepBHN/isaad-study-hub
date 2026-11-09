const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const core=require('../exam-7-13-core.js');
const view=require('../exam-7-13.js');
const root=path.resolve(__dirname,'..');
const loaded={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'exam-7-13-data.js'),'utf8'),loaded);
const data=JSON.parse(JSON.stringify(loaded.window.ISAAD_EXAM_713));
const snapshot=JSON.stringify(data);
const counts=[4,4,4,4,4,5,5];
let seed=492313;
const rng=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
let prior=null;
for(let round=0;round<100;round++){
  const a=core.createAttempt(data.questions,rng);
  assert.equal(a.questions.length,30);
  assert.equal(new Set(a.questions.map(q=>q.id)).size,30);
  assert.deepEqual(core.moduleScores(a).map(s=>s.total),counts);
  const positions=[0,1,2,3].map(i=>a.questions.filter(q=>q.correct===i).length);
  assert(positions.every(n=>n===7||n===8),'Balanced answer positions every attempt');
  if(prior)assert.notDeepEqual(a.questions.map(q=>q.id),prior);
  prior=a.questions.map(q=>q.id);
  assert.equal(core.submit(a),false);
  assert.equal(core.choose(a,-1),false);
  assert.equal(core.choose(a,4),false);
  assert.equal(core.move(a,-1),false);
  assert.equal(core.move(a,30),false);
  a.questions.forEach((q,i)=>{
    const original=data.questions.find(item=>item.id===q.id);
    assert.equal(q.options[q.correct],original.options[original.correct]);
    q.options.forEach((text,j)=>{const before=original.options.indexOf(text);assert.equal(q.reasons[j],original.reasons[before]);assert.equal(q.shades[j],original.shades[before]);});
    assert(core.move(a,i));assert(core.choose(a,q.correct));
  });
  assert.equal(core.score(a),30);
  assert.equal(core.unanswered(a).length,0);
  core.move(a,0);core.choose(a,(a.questions[0].correct+1)%4);
  assert.equal(core.score(a),29,'Editing before submit changes score');
  assert(core.submit(a));assert.equal(core.choose(a,0),false);assert.equal(core.move(a,1),false);
  assert.equal(core.moduleScores(a).reduce((n,s)=>n+s.correct,0),29);
}
assert.equal(JSON.stringify(data),snapshot,'Authored data must not be mutated');
assert.throws(()=>core.createAttempt(data.questions.slice(1)));

// Test rendered content and actual event wiring in Node, without launching a browser.
class NodeStub{
  constructor(name,owner){this.name=name;this.owner=owner;this.innerHTML='';this.textContent='';this.style={};this.listeners={};this.classList={toggle(){},add(){}};}
  addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
  querySelector(selector){return this.owner.node(`${this.name}:${selector}`);}
  setAttribute(){} removeAttribute(){} insertAdjacentHTML(){}
  focus(){this.owner.focused=this.name;}
}
function runtime(hash='#exam-7-13',shared=new Map()){
  const host={nodes:new Map(),events:{},focused:null,node(name){if(!this.nodes.has(name))this.nodes.set(name,new NodeStub(name,this));return this.nodes.get(name);}};
  const context={console,Math,Uint32Array,location:{hash},localStorage:{getItem:k=>shared.get(k)||null,setItem:(k,v)=>shared.set(k,v)},document:{title:'',getElementById:id=>host.node(id),querySelector:s=>host.node(s),querySelectorAll:()=>[]},scrollTo(){},addEventListener:(name,fn)=>(host.events[name]??=[]).push(fn)};
  context.window=context;
  vm.createContext(context);
  for(const file of ['data.js','quiz-core.js','miracle-data.js','miracle.js','exam-7-13-data.js','exam-7-13-core.js','exam-7-13.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  host.context=context;host.app=host.node('app');host.shared=shared;
  host.flush=()=>{for(const fn of host.events.hashchange||[])fn();};
  host.click=(attribute,value='')=>{const before=context.location.hash;const camel=attribute.slice(5).replace(/-([a-z])/g,(_,s)=>s.toUpperCase());const button={disabled:false,dataset:{[camel]:String(value)},hasAttribute:name=>name===attribute};for(const fn of host.app.listeners.click||[])fn({target:{closest:s=>s==='button'?button:null}});if(context.location.hash!==before)host.flush();};
  host.answer=value=>{for(const fn of host.app.listeners.change||[])fn({target:{value:String(value),matches:selector=>selector==='[data-exam713-answer]'}});};
  return host;
}
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function shownQuestion(host){const html=host.app.innerHTML;const q=data.questions.find(q=>html.includes(`<h1 tabindex="-1" class="quiz-heading">${esc(q.stem)}</h1>`));assert(q,'A valid question is shown');const options=[...html.matchAll(/<input type="radio"[^>]*data-exam713-answer="(\d)"[^>]*><span class="choice-letter">[A-D]\.<\/span><span>(.*?)<\/span>/gs)].map(m=>({index:Number(m[1]),text:m[2]}));assert.equal(options.length,4);return {q,options};}
let host=runtime();
assert(host.app.innerHTML.includes('เริ่มทำ 30 ข้อ'));
assert.equal((host.app.innerHTML.match(/exam713-module-number/g)||[]).length,7);
host.click('data-exam713-start');
assert.equal(host.context.location.hash,'#exam-7-13/quiz');
assert.equal(host.focused,'app:h1','Starting focuses the question heading');
assert(!host.app.innerHTML.includes('choice-reason'),'No explanations before submission');
assert(!host.app.innerHTML.includes('ดีที่สุด A'),'No answer key before submission');
const firstHTML=host.app.innerHTML;
let current=shownQuestion(host),index=current.options.find(o=>o.text===esc(current.q.options[current.q.correct])).index;
host.answer(index);
assert(host.app.innerHTML.includes('ตอบแล้ว 1 / 30'));
host.click('data-exam713-next');host.click('data-exam713-prev');
assert(host.app.innerHTML.includes(`data-exam713-answer="${index}" checked`),'Selection survives moving between questions');
host.click('data-exam713-question',29);host.click('data-exam713-submit');
assert(host.node('app:[data-exam713-error]').innerHTML.includes('ยังไม่ได้ตอบ 29 ข้อ'));
assert.equal(host.context.location.hash,'#exam-7-13/quiz');
for(let i=0;i<30;i++){
  host.click('data-exam713-question',i);
  current=shownQuestion(host);
  const sourceIndex=i<2?current.q.shades.indexOf(i===0?'เทา':'ดำ'):current.q.correct;
  index=current.options.find(o=>o.text===esc(current.q.options[sourceIndex])).index;
  host.answer(index);
}
host.click('data-exam713-submit');
assert.equal(host.context.location.hash,'#exam-7-13/result');
assert(host.app.innerHTML.includes('28<small> / 30'));
assert.equal((host.app.innerHTML.match(/<div class="module-score">/g)||[]).length,7);
assert.equal((host.app.innerHTML.match(/<details class="review-question"/g)||[]).length,2);
host.click('data-exam713-filter','all');
assert.equal((host.app.innerHTML.match(/<details class="review-question"/g)||[]).length,30);
assert.equal((host.app.innerHTML.match(/class="choice-reason"/g)||[]).length,120);
assert.equal(host.focused,'app:[data-exam713-filter="all"]');
assert(!host.app.innerHTML.includes('href="#module/7"'),'No links to missing lesson pages');
const resultsHTML=host.app.innerHTML;
host.answer(0);assert.equal(host.app.innerHTML,resultsHTML,'Submitted answer is locked');
host.context.location.hash='#exam';host.flush();assert(host.app.innerHTML.includes('เริ่มสอบ 40 ข้อ'),'Original exam route still works');
host.context.location.hash='#exam-7-13/result';host.flush();assert(host.app.innerHTML.includes('28<small> / 30'),'Same-page navigation retains this attempt');
const reopened=runtime('#exam-7-13/quiz',host.shared);
assert(reopened.app.innerHTML.includes('ตอบแล้ว 0 / 30'),'A fresh page never restores old exam answers');
reopened.answer(0);
for(const fn of reopened.events.pageshow||[])fn({persisted:true});
assert(reopened.app.innerHTML.includes('ตอบแล้ว 0 / 30'),'BFCache reentry starts a fresh attempt');
const hostile=JSON.parse(JSON.stringify(data));hostile.questions[0].stem='<img src=x onerror=alert(1)>';hostile.questions[0].options[0]='<script>alert(1)</script>';
const hostileAttempt=core.createAttempt(hostile.questions,()=>0.1);hostileAttempt.current=hostileAttempt.questions.findIndex(q=>q.id===hostile.questions[0].id);
const html=view.question(hostileAttempt);
assert(!html.includes('<img src=x'));assert(!html.includes('<script>'));assert(html.includes('&lt;'));
const indexHTML=fs.readFileSync(path.join(root,'index.html'),'utf8');
const order=['exam-7-13-data.js','exam-7-13-core.js','exam-7-13.js','app.js'].map(s=>indexHTML.indexOf(`src="${s}?v=4"`));
assert(order.every((n,i)=>n>=0&&(i===0||n>order[i-1])));
assert(indexHTML.includes('href="#exam-7-13"'));
console.log(JSON.stringify({status:'passed',questions:30,moduleCounts:counts,randomRounds:100,checks:['answer-shuffle-mapping','balanced-answer-positions','question-order','no-pool-mutation','editing','missing-answer-guard','submit-lock','score-and-module-totals','rendered-choice-count','no-early-feedback','all-30-UI-event-flow','28-of-30-with-grey-and-black','result-filters','focus','same-page-memory','fresh-page-reset','BFCache-reset','legacy-route','safe-text','script-order'],browserLaunched:false}));
