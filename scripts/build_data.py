"""Validate the two question banks, then build the dependency-free browser data."""
import difflib
import json
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
SOURCE_PAGE_COUNTS={1:41,2:53,3:32,4:30,5:45,6:50}

def normalize(text):
    return re.sub(r'\W+','',text.casefold())

def main():
    packs=[json.loads((ROOT/'content'/f'm{a}-m{a+1}.json').read_text(encoding='utf-8-sig')) for a in [1,3,5]]
    modules=sorted([m for p in packs for m in p['modules']],key=lambda x:x['id'])
    practice=[q for p in packs for q in p['practice']]
    legacy_exam=[q for p in packs for q in p['exam']]
    extra_exam=[q for a in [1,3,5] for q in json.loads((ROOT/'content'/f'exam-extra-m{a}-m{a+1}.json').read_text(encoding='utf-8-sig'))]
    original_exam=legacy_exam+extra_exam
    assert [m['id'] for m in modules]==list(range(1,7))
    assert len(practice)==30 and len(legacy_exam)==40 and len(extra_exam)==40 and len(original_exam)==80
    assert [sum(q['module']==m for q in practice) for m in range(1,7)]==[5]*6
    assert [sum(q['module']==m for q in original_exam) for m in range(1,7)]==[14,14,14,12,12,14]
    ids=set();stems=set()
    for m in modules:
        assert m['sourceFile']==f"ISAAD-{m['id']}-2026.pdf"
        assert len(m['sections'])>=5 and len(m['recap'])>=3
        for s in m['sections']:
            assert s['title'] and s['body'] and s['example']['scenario'] and s['example']['reasoning'] and s['pitfall']['wrong'] and s['pitfall']['correction'] and s['sourcePages']
            assert all(isinstance(page,int) and 1<=page<=SOURCE_PAGE_COUNTS[m['id']] for page in s['sourcePages'])
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
        assert 1<=q['source']['page']<=SOURCE_PAGE_COUNTS[q['module']],q['id']
    # The browser draws a balanced 40-question round from this 80-question pool.
    exam=original_exam
    payload={'version':2,'modules':modules,'practice':practice,'exam':exam,'legacyExamIds':[q['id'] for q in legacy_exam]}
    (ROOT/'data.js').write_text('window.ISAAD = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
    report={'modules':len(modules),'sections':{str(m['id']):len(m['sections']) for m in modules},'practice':len(practice),'examPool':len(exam),'examPerRound':40,'practicePerModule':[5]*6,'examPoolPerModule':[14,14,14,12,12,14],'examRoundPerModule':[7,7,7,6,6,7],'answerPositions':{str(i):sum(q['correct']==i for q in practice+exam) for i in range(4)},'exactDuplicateStems':0,'crossBankSimilarity':[],'examPoolSimilarity':[]}
    pairs=[]
    for p in practice:
        for x in exam:
            if p['module']!=x['module']:continue
            score=difflib.SequenceMatcher(None,normalize(p['stem']),normalize(x['stem'])).ratio()
            pairs.append((score,p,x))
    for score,p,x in sorted(pairs,key=lambda x:x[0],reverse=True)[:12]:
        report['crossBankSimilarity'].append({'similarity':round(score,3),'practice':p['id'],'exam':x['id'],'practiceStem':p['stem'],'examStem':x['stem']})
    pool_pairs=[]
    for newer in extra_exam:
        for older in legacy_exam:
            if newer['module']!=older['module']:continue
            similarity=difflib.SequenceMatcher(None,normalize(newer['stem']),normalize(older['stem'])).ratio()
            pool_pairs.append((similarity,newer,older))
    for similarity,newer,older in sorted(pool_pairs,key=lambda x:x[0],reverse=True)[:12]:
        report['examPoolSimilarity'].append({'similarity':round(similarity,3),'newId':newer['id'],'oldId':older['id'],'newStem':newer['stem'],'oldStem':older['stem']})
    (ROOT/'content-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k not in ['crossBankSimilarity','examPoolSimilarity']},ensure_ascii=False))

if __name__=='__main__':main()
