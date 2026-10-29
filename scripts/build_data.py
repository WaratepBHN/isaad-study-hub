"""Validate the two question banks, then build the dependency-free browser data."""
import difflib
import json
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]

def normalize(text):
    return re.sub(r'\W+','',text.casefold())

def main():
    packs=[json.loads((ROOT/'content'/f'm{a}-m{a+1}.json').read_text(encoding='utf-8-sig')) for a in [1,3,5]]
    modules=sorted([m for p in packs for m in p['modules']],key=lambda x:x['id'])
    practice=[q for p in packs for q in p['practice']]
    original_exam=[q for p in packs for q in p['exam']]
    assert [m['id'] for m in modules]==list(range(1,7))
    assert len(practice)==30 and len(original_exam)==40
    assert [sum(q['module']==m for q in practice) for m in range(1,7)]==[5]*6
    assert [sum(q['module']==m for q in original_exam) for m in range(1,7)]==[7,7,7,6,6,7]
    ids=set();stems=set()
    for m in modules:
        assert m['sourceFile']==f"ISAAD-{m['id']}-2026.pdf"
        assert len(m['sections'])>=5 and len(m['recap'])>=3
        for s in m['sections']:
            assert s['title'] and s['body'] and s['example']['scenario'] and s['example']['reasoning'] and s['pitfall']['wrong'] and s['pitfall']['correction'] and s['sourcePages']
    for q in practice+original_exam:
        assert q['id'] not in ids, f"Duplicate id {q['id']}"
        ids.add(q['id'])
        stem=normalize(q['stem']);assert stem not in stems,f"Duplicate stem {q['id']}";stems.add(stem)
        assert q['module'] in range(1,7)
        assert all(len(q[k])==4 for k in ['options','shades','reasons']),q['id']
        assert len({normalize(x) for x in q['options']})==4,q['id']
        assert isinstance(q['correct'],int) and q['correct'] in range(4)
        assert q['shades'].count('ขาว')==1 and q['shades'][q['correct']]=='ขาว',q['id']
        assert 'เทา' in q['shades'] and 'ดำ' in q['shades'],q['id']
        assert q['source']['file']==f"ISAAD-{q['module']}-2026.pdf" and isinstance(q['source']['page'],int)
    # Interleave subjects with a fixed order. All 40 unique authored questions are used.
    queues={m:[q for q in original_exam if q['module']==m] for m in range(1,7)}
    exam=[]
    for round_no in range(7):
        order=[1,3,5,2,4,6] if round_no%2==0 else [6,2,4,1,5,3]
        for m in order:
            if queues[m]:exam.append(queues[m].pop(0))
    payload={'version':1,'modules':modules,'practice':practice,'exam':exam}
    (ROOT/'data.js').write_text('window.ISAAD = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
    report={'modules':len(modules),'sections':{str(m['id']):len(m['sections']) for m in modules},'practice':len(practice),'exam':len(exam),'practicePerModule':[5]*6,'examPerModule':[7,7,7,6,6,7],'answerPositions':{str(i):sum(q['correct']==i for q in practice+exam) for i in range(4)},'exactDuplicateStems':0,'crossBankSimilarity':[]}
    pairs=[]
    for p in practice:
        for x in exam:
            if p['module']!=x['module']:continue
            score=difflib.SequenceMatcher(None,normalize(p['stem']),normalize(x['stem'])).ratio()
            pairs.append((score,p,x))
    for score,p,x in sorted(pairs,key=lambda x:x[0],reverse=True)[:12]:
        report['crossBankSimilarity'].append({'similarity':round(score,3),'practice':p['id'],'exam':x['id'],'practiceStem':p['stem'],'examStem':x['stem']})
    (ROOT/'content-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k!='crossBankSimilarity'},ensure_ascii=False))

if __name__=='__main__':main()
