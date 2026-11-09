"""Validate the authored 30-question set and emit its browser payload/audit."""
from pathlib import Path
from collections import Counter
import json
import re

ROOT=Path(__file__).resolve().parents[1]
TITLES={7:'Identify Design Elements',8:'Identify Design Mechanisms',9:'Run-Time Architecture',10:'Deployment and Distribution Architecture',11:'Use-Case Design',12:'Subsystem Design',13:'Class Design'}
COUNTS={7:4,8:4,9:4,10:4,11:4,12:5,13:5}
PAGES={7:51,8:31,9:33,10:23,11:43,12:39,13:62}
FILES=['exam-7-13-m7-m8.json','exam-7-13-m9-m10.json','exam-7-13-m11-m13.json']

def main():
    questions=[]
    for name in FILES:
        questions.extend(json.loads((ROOT/'content'/name).read_text(encoding='utf-8'))['questions'])
    assert len(questions)==30
    assert Counter(q['module'] for q in questions)==COUNTS
    assert len({q['id'] for q in questions})==30
    assert len({q['stem'].strip() for q in questions})==30
    details=[]
    for q in questions:
        assert re.fullmatch(r'e713-m(?:7|8|9|10|11|12|13)-\d{2}',q['id']),q['id']
        assert all(isinstance(q[k],str) and q[k].strip() for k in ['topic','stem','explanation'])
        assert len(q['options'])==len(q['shades'])==len(q['reasons'])==4
        assert len(set(q['options']))==4
        assert all(isinstance(s,str) and s.strip() for s in q['options']+q['reasons'])
        assert type(q['correct']) is int and 0<=q['correct']<4
        assert q['shades'].count('ขาว')==1 and q['shades'][q['correct']]=='ขาว'
        assert 'เทา' in q['shades'] and 'ดำ' in q['shades']
        assert set(q['shades'])=={'ขาว','เทา','ดำ'}
        name=('ISSAD' if q['module']==12 else 'ISAAD')+f"-{q['module']}-2026.PDF"
        assert q['source']['file'].upper()==name
        assert type(q['source']['page']) is int and 1<=q['source']['page']<=PAGES[q['module']]
        assert all(type(p) is int and 1<=p<=PAGES[q['module']] for p in q.get('sourcePages',[]))
        assert not re.search(r'(?:ข้อ|ตัวเลือก|ช้อยส์)\s*[A-D](?![A-Za-z])',' '.join(q['reasons'])+' '+q['explanation']),q['id']
        lengths=[len(re.sub(r'\s+',' ',s).strip()) for s in q['options']]
        ratio=max(lengths)/min(lengths)
        assert ratio<=1.45,(q['id'],lengths,ratio)
        correct_length=lengths[q['correct']]
        details.append({'id':q['id'],'lengths':lengths,'maxMinRatio':round(ratio,3),'correctLengthRank':1+sum(n<correct_length for n in lengths),'correctUniqueLongest':correct_length==max(lengths) and lengths.count(correct_length)==1,'longestHeuristicCredit':(1/lengths.count(max(lengths))) if correct_length==max(lengths) else 0,'shortestHeuristicCredit':(1/lengths.count(min(lengths))) if correct_length==min(lengths) else 0})
    longest=sum(x['longestHeuristicCredit'] for x in details)
    shortest=sum(x['shortestHeuristicCredit'] for x in details)
    assert longest<=9,('Longest-option heuristic too effective',longest)
    assert shortest<=10.5,('Shortest-option heuristic too effective',shortest)
    # Keep the original 1–6 banks distinct from the added set.
    old=[]
    for name in ['m1-m2.json','m3-m4.json','m5-m6.json']:
        obj=json.loads((ROOT/'content'/name).read_text(encoding='utf-8'))
        old+=obj['exam']+obj['practice']
    assert not {q['id'] for q in questions}&{q['id'] for q in old}
    assert not {q['stem'] for q in questions}&{q['stem'] for q in old}
    payload={'version':1,'modules':[{'id':i,'title':TITLES[i],'count':COUNTS[i]} for i in TITLES],'questions':questions}
    (ROOT/'exam-7-13-data.js').write_text('window.ISAAD_EXAM_713 = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n',encoding='utf-8',newline='\n')
    audit={'count':30,'moduleCounts':COUNTS,'maxOptionLengthRatio':max(x['maxMinRatio'] for x in details),'correctUniqueLongest':sum(x['correctUniqueLongest'] for x in details),'longestOptionHeuristicExpectedScore':round(longest,3),'shortestOptionHeuristicExpectedScore':round(shortest,3),'lengthAudit':details,'note':'Character lengths are a clue audit, not proof of question quality. Semantic/source cross-review is also required.'}
    (ROOT/'exam-7-13-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
    print(json.dumps({k:v for k,v in audit.items() if k!='lengthAudit'},ensure_ascii=False))

if __name__=='__main__':main()
