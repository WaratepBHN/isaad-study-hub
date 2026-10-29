(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ISAADQuizCore=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EXAM_QUOTAS=[7,7,7,6,6,7];
  const EXAM_SIZE=40;
  function buildBanks(data){const banks={exam:{id:'exam',mode:'exam',label:'สอบรวมทุกโมดูล',pool:data.exam,legacyIds:data.legacyExamIds||[],questions:[]}};for(const m of data.modules)banks[`practice-${m.id}`]={id:`practice-${m.id}`,mode:'practice',module:m.id,label:`แบบฝึก Module ${m.id}`,questions:data.practice.filter(q=>q.module===m.id)};return banks;}
  function createAttempt(n){return {answers:Array(n).fill(null),graded:Array(n).fill(false),current:0,submitted:false};}
  function cleanHistory(history,pool){const valid=new Set(pool.map(q=>q.id));const clean=values=>Array.isArray(values)?[...new Set(values.filter(id=>typeof id==='string'&&valid.has(id)))]:[];return {seenIds:clean(history?.seenIds),lastIds:clean(history?.lastIds),cycle:Number.isInteger(history?.cycle)&&history.cycle>0?history.cycle:1};}
  function randomUnit(){if(typeof globalThis!=='undefined'&&globalThis.crypto?.getRandomValues){const value=new Uint32Array(1);globalThis.crypto.getRandomValues(value);return value[0]/4294967296;}return Math.random();}
  function shuffle(values,rng){const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
  function createExamRound(pool,history={},rng=randomUnit){
    const h=cleanHistory(history,pool);let seen=new Set(h.seenIds),cycle=h.cycle;
    if(seen.size===pool.length){seen=new Set();cycle++;}
    let questions=[];
    EXAM_QUOTAS.forEach((quota,index)=>{const module=index+1,candidates=pool.filter(q=>q.module===module);if(candidates.length<quota)throw new Error(`Not enough exam questions for Module ${module}`);const fresh=shuffle(candidates.filter(q=>!seen.has(q.id)),rng);const selected=fresh.slice(0,quota);if(selected.length<quota)selected.push(...shuffle(candidates.filter(q=>seen.has(q.id)),rng).slice(0,quota-selected.length));questions.push(...selected);});
    const selectedIds=new Set(questions.map(q=>q.id)),last=new Set(h.lastIds);
    if(last.size===EXAM_SIZE&&questions.every(q=>last.has(q.id))){const replacement=pool.find(q=>!selectedIds.has(q.id));if(replacement){const index=questions.findIndex(q=>q.module===replacement.module);questions[index]=replacement;}}
    questions=shuffle(questions,rng);questions.forEach(q=>seen.add(q.id));
    return {questions,history:{seenIds:[...seen],lastIds:questions.map(q=>q.id),cycle}};
  }
  function restoreState(saved,banks){
    const state={read:[],attempts:{},examHistory:cleanHistory({},banks.exam.pool)};
    if(!saved||typeof saved!=='object')return state;
    state.read=Array.isArray(saved.read)?[...new Set(saved.read.filter(n=>Number.isInteger(n)&&n>=1&&n<=6))]:[];
    const legacy=!saved.examHistory&&saved.attempts?.exam&&banks.exam.legacyIds.length===EXAM_SIZE?{seenIds:banks.exam.legacyIds,lastIds:banks.exam.legacyIds,cycle:1}:{};
    state.examHistory=cleanHistory(saved.examHistory||legacy,banks.exam.pool);
    // A new page load starts a new exam session; practice attempts survive.
    for(const [id,bank]of Object.entries(banks)){if(bank.mode==='exam')continue;const a=saved.attempts?.[id],n=bank.questions.length;if(!a||!Array.isArray(a.answers)||a.answers.length!==n)continue;const answers=a.answers.map(v=>Number.isInteger(v)&&v>=0&&v<4?v:null);const graded=answers.map((v,i)=>v!==null&&a.graded?.[i]===true);state.attempts[id]={answers,graded,current:Math.max(0,Math.min(n-1,Number.isInteger(a.current)?a.current:0)),submitted:a.submitted===true&&answers.every(v=>v!==null)&&graded.every(Boolean)};}return state;
  }
  function persistentState(state,latestHistory=state.examHistory){return {read:state.read,examHistory:latestHistory,attempts:Object.fromEntries(Object.entries(state.attempts).filter(([id])=>id!=='exam'))};}
  function choose(bank,attempt,choice){if(!Number.isInteger(choice)||choice<0||choice>3||attempt.submitted||attempt.current<0||attempt.current>=bank.questions.length)return false;if(bank.mode==='practice'&&attempt.graded[attempt.current])return false;attempt.answers[attempt.current]=choice;if(bank.mode==='practice')attempt.graded[attempt.current]=true;return true;}
  function missing(attempt){return attempt.answers.reduce((out,v,i)=>v===null?[...out,i]:out,[]);}
  function submit(bank,attempt){if(missing(attempt).length||(bank.mode==='practice'&&!attempt.graded.every(Boolean)))return false;attempt.submitted=true;return true;}
  function score(bank,attempt){return bank.questions.reduce((s,q,i)=>s+(attempt.answers[i]===q.correct?1:0),0);}
  function moduleScores(bank,attempt){return Array.from({length:6},(_,i)=>i+1).map(module=>{const indexes=bank.questions.map((q,i)=>q.module===module?i:-1).filter(i=>i>=0);return {module,total:indexes.length,correct:indexes.filter(i=>attempt.answers[i]===bank.questions[i].correct).length};}).filter(x=>x.total>0);}
  return {EXAM_SIZE,EXAM_QUOTAS,buildBanks,createAttempt,createExamRound,cleanHistory,restoreState,persistentState,choose,missing,submit,score,moduleScores};
});
