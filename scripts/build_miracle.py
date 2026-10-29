"""Build the concise, slide-aligned 10-minute review without changing quiz banks."""
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PAGES={1:41,2:53,3:32,4:30,5:45,6:50}
def main():
    modules=[]
    for first in [1,3,5]:
        modules.extend(json.loads((ROOT/'content'/f'miracle-m{first}-m{first+1}.json').read_text(encoding='utf-8-sig')))
    modules.sort(key=lambda m:m['id'])
    assert [m['id'] for m in modules]==[1,2,3,4,5,6]
    for m in modules:
        assert all(m.get(key) for key in ['title','bigPicture','memoryLine','diagramTakeaway','sourcePages'])
        assert len(m['points'])==4 and all(p.get('label') and p.get('text') for p in m['points'])
        assert m['trap']['tempting'] and m['trap']['correction']
        assert all(isinstance(p,int) and 1<=p<=PAGES[m['id']] for p in m['sourcePages'])
        length=sum(len(m[k]) for k in ['title','bigPicture','memoryLine','diagramTakeaway'])+sum(len(p['label'])+len(p['text']) for p in m['points'])+sum(len(s) for s in m['trap'].values())
        assert length<=1100,(m['id'],length)
    payload={'minutes':10,'modules':modules}
    (ROOT/'miracle-data.js').write_text('window.ISAAD_MIRACLE = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8',newline='\n')
    print(json.dumps({'modules':6,'points':24,'readingMinutes':10,'sourcePageRanges':'validated'}))
if __name__=='__main__':main()
