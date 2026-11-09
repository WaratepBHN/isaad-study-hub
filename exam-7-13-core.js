(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ISAADExam713Core=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const SIZE=30;
  function random(){if(typeof globalThis!=='undefined'&&globalThis.crypto?.getRandomValues){const value=new Uint32Array(1);globalThis.crypto.getRandomValues(value);return value[0]/4294967296;}return Math.random();}
  function shuffle(values,rng=random){const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
  function createAttempt(pool,rng=random){
    if(!Array.isArray(pool)||pool.length!==SIZE||new Set(pool.map(q=>q.id)).size!==SIZE)throw new Error('Expected 30 distinct questions');
    const letters=shuffle([0,1,2,3],rng),positions=shuffle(Array.from({length:SIZE},(_,i)=>letters[i%4]),rng);
    const questions=shuffle(pool,rng).map((q,i)=>{
      if(q.options?.length!==4||q.reasons?.length!==4||q.shades?.length!==4||!Number.isInteger(q.correct)||q.correct<0||q.correct>3||q.shades[q.correct]!=='ขาว'||q.shades.filter(s=>s==='ขาว').length!==1)throw new Error('Invalid answer mapping');
      const order=shuffle([0,1,2,3].filter(n=>n!==q.correct),rng);order.splice(positions[i],0,q.correct);
      return {...q,source:{...q.source},sourcePages:q.sourcePages?[...q.sourcePages]:undefined,options:order.map(n=>q.options[n]),reasons:order.map(n=>q.reasons[n]),shades:order.map(n=>q.shades[n]),correct:positions[i]};
    });
    return {questions,answers:Array(SIZE).fill(null),current:0,submitted:false};
  }
  function choose(attempt,choice){if(!attempt||attempt.submitted||!Number.isInteger(choice)||choice<0||choice>3||!Number.isInteger(attempt.current)||attempt.current<0||attempt.current>=attempt.questions.length)return false;attempt.answers[attempt.current]=choice;return true;}
  function move(attempt,index){if(!attempt||attempt.submitted||!Number.isInteger(index)||index<0||index>=attempt.questions.length)return false;attempt.current=index;return true;}
  function unanswered(attempt){return attempt.answers.flatMap((a,i)=>a===null?[i]:[]);}
  function submit(attempt){if(!attempt||attempt.submitted||unanswered(attempt).length)return false;attempt.submitted=true;return true;}
  function score(attempt){return attempt.questions.reduce((n,q,i)=>n+(attempt.answers[i]===q.correct?1:0),0);}
  function moduleScores(attempt){return [...new Set(attempt.questions.map(q=>q.module))].sort((a,b)=>a-b).map(module=>{const indexes=attempt.questions.flatMap((q,i)=>q.module===module?[i]:[]);return {module,total:indexes.length,correct:indexes.filter(i=>attempt.answers[i]===attempt.questions[i].correct).length};});}
  return {SIZE,shuffle,createAttempt,choose,move,unanswered,submit,score,moduleScores};
});
