window.ISAAD_EXAM_713 = {
  "version": 1,
  "modules": [
    {
      "id": 7,
      "title": "Identify Design Elements",
      "count": 4
    },
    {
      "id": 8,
      "title": "Identify Design Mechanisms",
      "count": 4
    },
    {
      "id": 9,
      "title": "Run-Time Architecture",
      "count": 4
    },
    {
      "id": 10,
      "title": "Deployment and Distribution Architecture",
      "count": 4
    },
    {
      "id": 11,
      "title": "Use-Case Design",
      "count": 4
    },
    {
      "id": 12,
      "title": "Subsystem Design",
      "count": 5
    },
    {
      "id": 13,
      "title": "Class Design",
      "count": 5
    }
  ],
  "questions": [
    {
      "id": "e713-m7-01",
      "module": 7,
      "topic": "Mapping ตาม abstraction และขอบเขตบริการ",
      "stem": "ระบบจัดเก็บหลักฐานมี analysis class สองตัว: EvidenceCode เก็บรหัสหลักฐานหนึ่งค่าและตรวจรูปแบบรหัส ส่วน EvidenceExchange รวมการรับ ส่ง ตรวจรับ และเชื่อมระบบภายนอกหลายแห่ง โดยต้องให้บริการหลักผ่านสัญญาที่ผู้เรียกใช้ได้แม้เปลี่ยนการเชื่อมต่อภายใน แผน mapping เริ่มต้นใดมีน้ำหนักรองรับมากที่สุดจากข้อมูลนี้?",
      "options": [
        "ให้ EvidenceCode เป็น design class; แยก EvidenceExchange เป็นหลายคลาสภายใน package ตามหน้าที่",
        "ให้ EvidenceCode เป็น design class; แยก EvidenceExchange เป็น subsystem ที่ให้บริการผ่าน interface",
        "ให้ EvidenceCode เป็น subsystem; คง EvidenceExchange เป็นคลาสเดียวเพราะเป็น analysis class หนึ่งตัว",
        "ให้ EvidenceCode เป็น design class; คง EvidenceExchange เป็นคลาสเดียวเพื่อรักษา traceability กับ analysis"
      ],
      "correct": 1,
      "shades": [
        "เทา",
        "ขาว",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "คลาสซับซ้อนแยกเป็นหลาย design classes และจัดใน package ได้จริง จึงเป็นขั้นเริ่มต้นที่ใช้ได้ แต่แผนนี้ยังไม่แสดงขอบเขตบริการและ interface ที่โจทย์ต้องการให้ปกปิดการเชื่อมต่อภายใน",
        "EvidenceCode เป็น single logical abstraction จึงมีเหตุผลให้ map ตรง ส่วน EvidenceExchange เป็นบริการซับซ้อนที่ต้องมีสัญญาบริการและซ่อน implementation จึงเหมาะกับ subsystem และ interface",
        "การมีหนึ่ง analysis class ไม่ได้บังคับให้เหลือหนึ่ง design class และข้อมูลของ EvidenceCode ก็ยังไม่แสดงความซับซ้อนหรือบริการหลักที่รองรับการยกระดับเป็น subsystem",
        "การรักษา traceability ไม่ได้บังคับให้คงขอบเขตคลาสเดิม การ mapping ไปสู่ design เป็น many-to-many ได้ และควรพิจารณาความซับซ้อนกับ abstraction ของงาน"
      ],
      "explanation": "ต้องตัดสินใจสองระดับร่วมกัน: ความเรียบง่ายของ abstraction รองรับการ map ตรง ส่วนบริการซับซ้อนที่ต้องซ่อนวิธีเชื่อมต่อรองรับ subsystem ที่มี interface การแบ่งคลาสใน package เป็นทางเลือกที่เป็นไปได้ แต่ยังให้หลักฐานเรื่องขอบเขตบริการน้อยกว่าแผน subsystem",
      "source": {
        "file": "ISAAD-7-2026.PDF",
        "page": 7
      },
      "sourcePages": [
        6,
        7,
        18,
        19,
        22,
        24
      ]
    },
    {
      "id": "e713-m7-02",
      "module": 7,
      "topic": "Boundary packaging ตามความผันผวน",
      "stem": "ระบบสำรวจพื้นที่มี boundary สองชุด: MobileSurvey เปลี่ยนหน้าจอและวิธีรับข้อมูลทุกไตรมาส ขณะที่ FixedConsole มีสัญญาว่าจะคงหน้าจอเดิมตลอดรุ่น ทั้งสองชุดมี control/entity ตามหน้าที่ของตน ทีมต้องเลือกแผนเริ่มต้นตาม heuristic เรื่อง boundary ในบทนี้ และต้องการหลีกเลี่ยงการแยก package ที่ข้อมูลยังไม่สนับสนุน แผนใดตรงเกณฑ์ที่สุด?",
      "options": [
        "แยก boundary ของ MobileSurvey จากคลาสตามหน้าที่; แยก boundary ของ FixedConsole เป็นอีก package ด้วย",
        "รวม boundary ของ MobileSurvey กับคลาสตามหน้าที่; แยก boundary ของ FixedConsole จากคลาสตามหน้าที่",
        "แยก boundary ของ MobileSurvey จากคลาสตามหน้าที่; รวม boundary ของ FixedConsole กับคลาสตามหน้าที่",
        "รวม boundary ของ MobileSurvey กับคลาสตามหน้าที่; รวม boundary ของ FixedConsole โดยถือว่าความผันผวนไม่เกี่ยว"
      ],
      "correct": 2,
      "shades": [
        "เทา",
        "ดำ",
        "ขาว",
        "ดำ"
      ],
      "reasons": [
        "การแยก boundary ทั้งสองชุดเป็นโครงสร้างที่ทำได้ และแยกชุดที่เปลี่ยนบ่อยได้ถูกทิศทาง แต่การแยก FixedConsole เพิ่มยังไม่มีเหตุผลจากความผันผวน จึงตรงเกณฑ์เริ่มต้นของโจทย์น้อยกว่า",
        "วางแผนกลับทิศกับ heuristic: ชุดที่มีการเปลี่ยน interface มากควรพิจารณาแยก ขณะที่ชุดคงที่สามารถอยู่กับคลาสที่เกี่ยวข้องตามหน้าที่ได้",
        "ใช้เงื่อนไขของ heuristic แยกกันสำหรับแต่ละ boundary: แยกชุดเปลี่ยนบ่อย และเก็บชุดคงที่ร่วมกับคลาสตามหน้าที่ จึงใช้ข้อมูลที่ให้มาโดยไม่เพิ่ม package เกินเหตุผล",
        "การรวม boundary ไม่ได้เป็นไปไม่ได้ แต่เหตุผลที่ตัดความผันผวนออกจากการตัดสินใจขัดกับ heuristic ของบทนี้ และทำให้กรณี MobileSurvey ไม่ได้รับการพิจารณาตามข้อมูลสำคัญ"
      ],
      "explanation": "สไลด์ไม่ได้กำหนดให้ boundary ทุกตัวแยก package เหมือนกัน แต่ใช้โอกาสเปลี่ยน system interface เป็นเงื่อนไข การเปรียบเทียบสองชุดจึงต้องใช้เงื่อนไขกับแต่ละชุด และแยกให้ออกระหว่างแผนที่ทำได้กับแผนที่มีเหตุผลรองรับตรงโจทย์ที่สุด",
      "source": {
        "file": "ISAAD-7-2026.PDF",
        "page": 10
      },
      "sourcePages": [
        8,
        10,
        21,
        32
      ]
    },
    {
      "id": "e713-m7-03",
      "module": 7,
      "topic": "Dependency topology และข้อยกเว้นการข้าม layer",
      "stem": "ให้ลูกศร X→Y หมายถึง X พึ่งพา Y ระบบมี U ใน Application, S ใน Business Services และ M ใน Middleware พร้อมเส้น U→S, S→M และ U→M โดยสถาปนิกยืนยันว่า U→M จำเป็นเพื่อใช้ core distribution ของ Java RMI ตามกรณีในสไลด์ ต่อมามีการเพิ่ม M→U เพื่ออ่านค่า config ข้อความ review ใดวินิจฉัยสองเส้น U→M และ M→U ได้เฉพาะเจาะจงกับหลักฐานมากที่สุด?",
      "options": [
        "U→M มีเหตุผลรองรับจาก core Java RMI; M→U ทั้งย้อนชั้นและทำให้กราฟ dependency เกิดวงจร",
        "U→M ข้าม Business Services ลง Middleware; M→U ปิดวงจรผ่านเส้น U→S→M ที่มีอยู่ในกราฟ",
        "U→M มีเหตุผลรองรับจาก core RMI; M→U จึงใช้ข้อยกเว้นเดียวกันเพื่ออ่าน config กลับได้",
        "U→M ละเมิดกฎ layer แม้มีเหตุผล RMI; M→U ยอมรับได้เมื่อคลาส config เปิด public visibility"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "เทา",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "หน้า 31 ให้เหตุผลเฉพาะที่ Application ต้องเข้าถึง core distribution ของ Java RMI จึงรองรับ U→M ส่วน M→U เป็น dependency จากล่างขึ้นบน และปิดวงจรทั้ง U→M→U และ U→S→M→U",
        "เป็นการอ่าน topology ที่ถูกต้องทั้งการข้ามชั้นและวงจร แต่ยังไม่วินิจฉัยสถานะของ U→M จากเหตุผล core RMI ซึ่งสไลด์ยอมรับเป็นข้อยกเว้น จึงให้เหตุผลเชิงสถาปัตยกรรมน้อยกว่าคำตอบที่แยกข้อยกเว้นออกจากข้อบกพร่อง",
        "เหตุผลของ U→M ไม่ได้อนุญาต dependency กลับทิศ M→U การอ่าน config กลับไปยัง Application ยังเป็นการพึ่งพาจากชั้นล่างขึ้นบนและยังสร้างวงจร",
        "กฎไม่ข้าม layer ใช้คำว่า in general และมีตัวอย่าง RMI รองรับข้อยกเว้น ส่วน public visibility บอกสิทธิ์อ้างอิงองค์ประกอบ ไม่ได้ทำให้การย้อนชั้นและวงจรถูกต้องทางสถาปัตยกรรม"
      ],
      "explanation": "ต้องอ่านทั้ง topology และเหตุผลของ dependency พร้อมกัน เส้นที่ข้าม layer ไม่ได้ผิดโดยไม่มีข้อยกเว้น แต่ข้อยกเว้นก็ไม่ได้เปลี่ยนข้อควรหลีกเลี่ยงเรื่อง lower→upper หรือ cyclic dependencies การเปิด public แก้เพียง visibility ไม่ได้แก้ทิศทางกราฟ",
      "source": {
        "file": "ISAAD-7-2026.PDF",
        "page": 31
      },
      "sourcePages": [
        11,
        13,
        15,
        31,
        32
      ]
    },
    {
      "id": "e713-m7-04",
      "module": 7,
      "topic": "Interface contract กับการซ่อน technology",
      "stem": "GeoImage เป็น subsystem ให้หลายแผนกขอภาพตามพื้นที่และวันที่ ผู้ให้บริการภาพจะเปลี่ยนจากบริษัท A เป็น B โดยชนิด token และชนิดผลลัพธ์ของสองบริษัทต่างกัน ทีมต้องกำหนด contract ที่ทั้งคงที่และเป็น technology independent ตามบทนี้ ข้อเสนอใดตอบเป้าหมายเมื่อสลับผู้ให้บริการได้ตรงที่สุด?",
      "options": [
        "ใช้ fetchTile(VendorToken): VendorTile; ระบุ parameter และผลลัพธ์ให้ชัดแล้วตรึง signature นี้",
        "ใช้ fetchArea(Area, Date): TileSet; เปิด private vendor classes ให้ผู้เรียกอ้างข้าม package ได้",
        "ใช้ fetchArea(Area, Date): TileSet; ให้ TileSet มี public field VendorTile โดยถือว่าไม่ผูก vendor เพราะชนิดชั้นนอกเป็นกลาง",
        "ใช้ fetchArea(Area, Date): TileSet; กำหนดชนิดข้อมูลกลางแล้วซ่อนการแปลงชนิด vendor ไว้ภายใน"
      ],
      "correct": 3,
      "shades": [
        "เทา",
        "ดำ",
        "ดำ",
        "ขาว"
      ],
      "reasons": [
        "การระบุ parameter/ผลลัพธ์และตรึง signature เป็นงานกำหนด contract ที่ทำได้จริง แต่ชนิดเฉพาะผู้ให้บริการเดิมยังอยู่ใน contract การเปลี่ยนบริษัทที่มีชนิดต่างกันจึงเหลือภาระรักษาหรือแปลงชนิดเฉพาะ vendor ไม่ตรงหลัก technology independent เท่าข้อที่ใช้ชนิดกลาง",
        "signature ภายนอกใช้ชนิดกลางได้ดี แต่ private classes ของ package ไม่สามารถถูกอ้างอิงโดยตรงจากภายนอก package ตามกติกา visibility ที่สไลด์กำหนด",
        "แม้ชื่อ operation และชนิดชั้นนอกเป็นกลาง แต่ public field ที่ใช้ชนิด VendorTile ยังทำให้ contract ผูกกับผู้ให้บริการ การเปลี่ยน vendor จึงรั่วถึงผู้เรียก",
        "operation สื่อความหมายงานของผู้เรียก ใช้ parameter/return type ที่ไม่ผูกบริษัท และเก็บรายละเอียดชนิดเฉพาะ vendor ภายใน จึงรองรับทั้ง stable interface และ technology independence"
      ],
      "explanation": "ความคงที่ของชื่อ operation อย่างเดียวไม่พอ ต้องตรวจชนิดของ parameter ผลลัพธ์ และ public fields ที่ผู้เรียกผูกอยู่ด้วย การตรึง vendor signature ทำได้แต่ยังไม่เป็น technology independent ส่วนชื่อ TileSet ที่เป็นกลางไม่ได้ซ่อน VendorTile ซึ่งยังปรากฏใน public contract",
      "source": {
        "file": "ISAAD-7-2026.PDF",
        "page": 24
      },
      "sourcePages": [
        13,
        24,
        25,
        26
      ]
    },
    {
      "id": "e713-m8-01",
      "module": 8,
      "topic": "Persistence requirements จาก workload ที่มี volume เท่ากัน",
      "stem": "ทีมเปรียบเทียบข้อมูลใหม่สองชุด: A มี object ขนาด 2 MB จำนวน 20,000 ชิ้น โดย 80% ของคำขอเป็น Create; B มี object ขนาด 2 KB จำนวน 20,000,000 ชิ้น โดย 80% เป็น Read ให้ใช้หน่วยฐานสิบจึงได้ข้อมูลรวมชุดละ 40 GB ทั้งคู่ค้นตาม key เก็บ 5 ปี และต้องทน fault เท่ากัน บันทึกใดแยกมิติที่ต่างกันของ workload สองชุดได้ตรงที่สุดก่อนเลือกกลไก?",
      "options": [
        "แยก granularity ตามขนาด object และ access frequency ตามสัดส่วน CRUD; บันทึก volume รวมว่าเท่ากัน",
        "แยก granularity ตามขนาด object และบันทึก duration ว่าเท่ากัน; ระบุ access mechanism ว่าค้นตาม key",
        "แยก volume ตามจำนวน object และ access frequency ตามจำนวนชิ้นสะสม; บันทึก granularity ว่าเท่ากัน",
        "แยก access mechanism ตามสัดส่วน Create/Read และ volume ตามขนาด object; บันทึก duration ว่าเท่ากัน"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "เทา",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "ขนาดต่อ object ต่างกันคือ granularity และสัดส่วน Create/Read ต่างกันคือ access frequency ส่วน volume คือปริมาณข้อมูลรวม ซึ่งโจทย์คำนวณให้เท่ากันแล้ว",
        "ทั้งขนาด object, อายุข้อมูล และการค้นตาม key ถูกจัดมิติถูกต้อง จึงเป็นบันทึกที่มีประโยชน์จริง แต่ยังไม่แยกความต่างสำคัญเรื่องสัดส่วน CRUD ของสอง workload ตามที่โจทย์ให้มาพิจารณา",
        "จำนวน object อย่างเดียวไม่ใช่ volume รวมเมื่อขนาดต่อ object ต่างกัน และจำนวนชิ้นที่สะสมก็ไม่ใช่สัดส่วน CRUD อีกทั้งขนาด object ในโจทย์ไม่ได้เท่ากัน",
        "access mechanism ถามว่า query อย่างไร ไม่ใช่สัดส่วน CRUD ขณะที่ขนาด object เป็น granularity ไม่ใช่ volume รวม แม้ข้อความเรื่อง duration จะถูกต้องก็ตาม"
      ],
      "explanation": "ห้ามสรุปภาระ persistence จากจำนวน object หรือขนาดต่อ object เพียงอย่างเดียว สองชุดอาจมี volume รวมเท่ากันแต่ต่างทั้ง granularity และ access frequency ซึ่งเป็นคนละมิติในกรอบของสไลด์ และควรใช้ร่วมกับ requirements อื่นก่อนเลือกกลไก",
      "source": {
        "file": "ISAAD-8-2026.PDF",
        "page": 12
      },
      "sourcePages": [
        12,
        19,
        30
      ]
    },
    {
      "id": "e713-m8-02",
      "module": 8,
      "topic": "Repository กับ implementation หลายแหล่ง",
      "stem": "AuditService ต้องค้นหลักฐานจากสองแหล่ง: ฐานเดิมใช้ JDBC พร้อม SQL ที่ทีมต้องการเก็บไว้ และคลังใหม่อ่านผ่าน external API การทดสอบกฎตัดสินหลักฐานต้องแทนทั้งสองแหล่งด้วยข้อมูลจำลองได้ โดยไม่แก้กฎธุรกิจ ข้อเสนอใดตอบเงื่อนไขทั้งการคง implementation เดิมและการแยก business logic ได้ดีที่สุด?",
      "options": [
        "คง JDBC สำหรับฐานเดิมและแยก API client สำหรับคลังใหม่; ให้ AuditService เลือกแหล่งและแปลงผลเอง",
        "เปลี่ยนฐานเดิมเป็น ORM และคง API client สำหรับคลังใหม่; ถือว่า ORM ซ่อนทั้งสองแหล่งจาก Service แล้ว",
        "ใช้ repository interface คืน object ของหลักฐาน; ทำ implementation ด้วย JDBC และ API ให้ Service แทนด้วย mock ได้",
        "ใช้ repository interface รับคำค้นจาก Service; ให้ Service จัดการ ResultSet เพราะ Repository แปลงทุกแหล่งให้เอง"
      ],
      "correct": 2,
      "shades": [
        "เทา",
        "ดำ",
        "ขาว",
        "ดำ"
      ],
      "reasons": [
        "เป็นการแยก JDBC กับ API client ที่ทำได้จริงและคง SQL เดิมไว้ แต่ Service ยังรู้จักการเลือกกลไกและการแปลงผลของแต่ละแหล่ง จึงแยก business logic เพื่อ mock ผ่าน contract เดียวได้ไม่ชัดเท่า Repository",
        "ORM ช่วย mapping ฐานเชิงสัมพันธ์ ไม่ได้ซ่อนการเข้าถึง external API จาก Service โดยตัวมันเอง และยังเปลี่ยน implementation ฐานเดิมโดยไม่ตอบเงื่อนไขเก็บ SQL เดิม",
        "Repository เป็นตัวกลางเชิงโครงสร้างที่ implement ด้วย JDBC หรือ external API ได้ จึงรักษา SQL เดิมไว้ภายในและให้ Service พึ่ง contract ที่ส่ง object กลับ ซึ่งแทนด้วย mock ในการทดสอบได้",
        "Repository ไม่ได้ให้ความสามารถแปลงทุกแหล่งอัตโนมัติ การให้ Service จัดการ ResultSet ยังเปิดเผยรายละเอียด JDBC และขัดกับเป้าหมายการซ่อนกลไกเข้าถึงข้อมูลจาก business logic"
      ],
      "explanation": "โจทย์ไม่ได้ต้องการแทน JDBC ด้วย ORM แต่ต้องการแยกผู้ที่รู้รายละเอียด data access Repository อยู่คนละมิติกับกลไก implementation จึงห่อทั้ง SQL เดิมและ external API ได้ และทำให้ทดสอบกฎธุรกิจผ่าน interface โดยไม่ผูกแหล่งจริง",
      "source": {
        "file": "ISAAD-8-2026.PDF",
        "page": 17
      },
      "sourcePages": [
        13,
        15,
        17,
        20
      ]
    },
    {
      "id": "e713-m8-03",
      "module": 8,
      "topic": "การประกอบ JDBC และ ORM ตามข้อกำหนดต่างกัน",
      "stem": "ระบบประมวลผลภาพมีงานสองส่วนใต้ Repository: Statistics ต้องให้ทีมควบคุม SQL และการแปลง row เองตามรายงานที่รับรองไว้ ส่วน CaseFile เปลี่ยนความสัมพันธ์ One-to-Many และข้อมูล object บ่อย จึงต้องการลดงานเขียน mapping และตรวจการเปลี่ยนแปลงด้วยมือ เมื่อเลือกกลไกตามความรับผิดชอบในสไลด์ แผนใดมีเหตุผลรองรับตรงทั้งสองงานที่สุด?",
      "options": [
        "ใช้ JDBC ทั้ง Statistics และ CaseFile; ทีมควบคุม SQL และเขียน mapping ของทั้งสองงานได้เอง",
        "ใช้ JDBC สำหรับ Statistics และ ORM สำหรับ CaseFile; แบ่งงานควบคุม SQL กับงาน mapping ตามข้อกำหนด",
        "ใช้ ORM สำหรับ Statistics และ JDBC สำหรับ CaseFile; ORM ให้เขียน row mapping เอง ส่วน JDBC ติดตาม object",
        "ใช้ Repository แทน JDBC และ ORM ของทั้งสองงาน; Repository เป็นผู้สร้าง SQL และติดตาม object โดยตัวมันเอง"
      ],
      "correct": 1,
      "shades": [
        "เทา",
        "ขาว",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "JDBC ใช้กับทั้งสองงานได้และให้ผู้พัฒนาควบคุม SQL/mapping เองจริง จึงตอบ Statistics แต่ยังทิ้งภาระ mapping และติดตามการเปลี่ยนแปลงของ CaseFile ไว้กับทีม ไม่ตรงเป้าลดงานส่วนนั้นเท่า ORM",
        "Statistics ตรงกับ direct SQL และ manual row-to-object mapping ของ JDBC ส่วน CaseFile ตรงกับ ORM ที่ช่วย mapping ความสัมพันธ์และตรวจการเปลี่ยนแปลงของ object โดย Repository ยังทำหน้าที่ซ่อน data access ได้ตามเดิม",
        "จัดความรับผิดชอบกลับด้าน: JDBC ในสไลด์ให้ผู้พัฒนาอ่าน ResultSet และ map เอง ส่วน ORM เป็นกลไกที่ช่วยจัดการ mapping ความสัมพันธ์และตรวจการเปลี่ยนแปลงของ object",
        "Repository เป็นรูปแบบจัดโครงสร้างและซ่อน data access ไม่ใช่ตัวสร้าง SQL หรือกลไก change tracking โดยตัวมันเอง ความสามารถดังกล่าวขึ้นกับ implementation ที่อยู่ข้างหลัง"
      ],
      "explanation": "กลไกไม่จำเป็นต้องเป็นตัวเลือกเดียวครอบทั้งระบบ งานที่มี requirements ต่างกันใช้ implementation ต่างกันภายใต้ Repository ได้ ต้องจับความรับผิดชอบของ JDBC กับ ORM ให้ถูกก่อนเลือก และไม่ย้ายความสามารถ mapping ไปให้ Repository เพียงเพราะมันอยู่หน้าฐานข้อมูล",
      "source": {
        "file": "ISAAD-8-2026.PDF",
        "page": 15
      },
      "sourcePages": [
        13,
        15,
        17,
        20,
        30
      ]
    },
    {
      "id": "e713-m8-04",
      "module": 8,
      "topic": "แยก REST exposure ออกจาก microservice ownership",
      "stem": "ศูนย์สื่อดิจิทัลมี GET/POST/PUT/DELETE ผ่าน HTTP อยู่แล้ว แต่ทั้งหมดเข้าโปรแกรมเดียวที่รวม business logic และข้อมูลไว้ร่วมกัน ทีมต้องปรับให้เป็น independent services ตามความหมายในสไลด์ พร้อมรับ event ระหว่างบริการผ่าน messaging ข้อเสนอใดแสดงการเปลี่ยนโครงสร้างที่เป็นหลักฐานตรงที่สุดว่าได้ทำตามเป้าหมาย?",
      "options": [
        "แยก URL ตามความสามารถงานโดยยังใช้ logic และ data ในโปรแกรมเดิม; ทำให้ขอบเขต HTTP ของแต่ละงานชัดขึ้น",
        "แยก process ตาม GET/POST/PUT/DELETE โดยยังเรียกใช้ logic และข้อมูลที่อยู่ส่วนกลาง; จึงได้ independent services",
        "แยกบริการให้ถือ logic และข้อมูลของตนพร้อม messaging; ต้องเปลี่ยนช่องทางนั้นเป็น REST จึงนับได้",
        "แยกบริการให้ถือ logic และข้อมูลของตนพร้อม messaging; ใช้ REST เปิด functionality ให้ client ต่อได้"
      ],
      "correct": 3,
      "shades": [
        "เทา",
        "ดำ",
        "ดำ",
        "ขาว"
      ],
      "reasons": [
        "การจัด URL ตามความสามารถช่วยทำขอบเขต HTTP ให้ชัดขึ้นได้จริง และเป็นงานออกแบบ REST ที่เกี่ยวข้อง แต่ยังไม่มีการเปลี่ยน ownership ของ logic/data หรือแยกเป็น independent services ตามเป้าหมาย",
        "การแยกตาม HTTP verbs และแยก process ไม่ได้เป็นหลักฐานเพียงพอของ independent services ตามสไลด์ เมื่อยังคง logic และ data ส่วนกลางไว้ร่วมกัน จึงสรุปเช่นนั้นไม่ได้",
        "การให้แต่ละบริการถือ logic/data ของตนตรงกับ microservices แต่ข้อสรุปว่าต้องเปลี่ยน messaging เป็น REST ผิด เพราะสไลด์อนุญาตการสื่อสารผ่าน REST หรือ messaging",
        "แสดงการแบ่งความเป็นเจ้าของ business logic/data และการเป็นบริการแยกกัน ส่วน messaging เป็นวิธีสื่อสารที่สไลด์รองรับ ขณะที่ REST ยังคงใช้เปิด functionality ให้ client ได้"
      ],
      "explanation": "HTTP methods เป็นหลักฐานของการเปิด functionality แบบ REST แต่ยังไม่พอพิสูจน์การแบ่ง application เป็น microservices ต้องดูความเป็นอิสระและการถือ logic/data ของแต่ละบริการด้วย การใช้ messaging ระหว่างบริการไม่ขัดกับกรอบ microservices ในบทนี้",
      "source": {
        "file": "ISAAD-8-2026.PDF",
        "page": 23
      },
      "sourcePages": [
        21,
        22,
        23,
        30
      ]
    },
    {
      "id": "e713-m9-01",
      "module": 9,
      "topic": "Outside-In mapping และขอบเขตการ scale",
      "stem": "ระบบประมูลมี BidReceiver → BidValidator → PriceUpdater ทีมเริ่มจาก event การยื่นราคาแล้วตามเส้นทางทำงาน พบว่าเฉพาะ BidValidator ต้องเพิ่มกำลังเมื่อมีการประมูลรอบใหญ่ แม้ BidReceiver จะเรียกมันถี่ หากเป้าหมายรอบนี้คือหาขอบเขต process ที่ตอบต่อภาระจาก event ข้อเสนอพร้อมเหตุผลใดมีน้ำหนักตรงเกณฑ์ที่สุด?",
      "options": [
        "รวม BidReceiver กับ BidValidator ตามการเรียกถี่ เพื่อจำกัด communication overhead ของคู่คลาสใน process เดียว",
        "พิจารณาแยก BidValidator ตาม stage ที่ต้อง scale เพื่อให้ขอบเขต process สอดคล้อง event ตาม Outside-In",
        "จำนวนคลาสในแต่ละ stage แทนปริมาณภาระได้ จึงใช้ Outside-In แบ่ง process ให้มีจำนวนคลาสใกล้กัน",
        "การแยก BidValidator เป็น process ทำให้แชร์ memory context แบบ threads จึงลดต้นทุนการสร้างขอบเขตใหม่"
      ],
      "correct": 1,
      "shades": [
        "เทา",
        "ขาว",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "เป็นแผนที่ใช้เหตุผลจริงของ Inside-Out และลด overhead ของคู่คลาสนี้ได้ แต่ผูกขอบเขตการเพิ่มกำลังของ BidValidator กับ BidReceiver ที่ไม่ได้ต้อง scale ตาม จึงตรงเกณฑ์ภาระจาก event น้อยกว่าแผนที่แยกพิจารณา stage นี้",
        "Outside-In เริ่มจาก external event/service แล้ว trace execution path เข้าด้านใน เพื่อให้ mapping สอดคล้องกับ trigger และ scalability bottleneck ตรงกับวิธีและหลักฐานในสถานการณ์",
        "สไลด์ให้พิจารณา execution path และ bottleneck ไม่ได้ใช้จำนวนคลาสเป็นตัวแทนภาระหรือเกณฑ์แบ่ง process ให้เท่ากัน",
        "memory/context ร่วมกันเป็นลักษณะของ threads ภายใน process ไม่ใช่ผลที่รับประกันหลังแยกเป็นคนละ process และ process มีต้นทุนขอบเขตแยกมากกว่า thread"
      ],
      "explanation": "ความถี่การเรียกระหว่างคลาสเป็นเหตุผลด้าน overhead ที่ต้องชั่ง แต่โจทย์ให้หา boundary จากภาระตาม event การ trace จนพบ stage ที่ต้อง scale จึงเป็นหลักฐานเฉพาะของ Outside-In ไม่ใช่การนับคลาสหรืออาศัย shared context ข้าม process",
      "source": {
        "file": "ISAAD-9-2026.PDF",
        "page": 21
      },
      "sourcePages": [
        8,
        9,
        20,
        21
      ]
    },
    {
      "id": "e713-m9-02",
      "module": 9,
      "topic": "Async messaging กับ shared state ของ threads",
      "stem": "หน้าจอจัดคิวส่งพัสดุส่งงานเข้า queue แล้วตอบผู้ใช้ทันที ภายใน DispatchProcess มี WorkerA และ WorkerB เป็น threads ทั้งคู่แก้ object ตัวนับเดียวกัน ผลทดสอบพบหน้าจอตอบเร็วแต่ยอดงานบางครั้งหาย ผู้พัฒนากล่าวว่า queue ทำให้สอง worker ไม่ต้อง synchronize ข้อใดอธิบายผลทดสอบที่หักล้างข้อกล่าวนี้?",
      "options": [
        "แม้ queue ส่งงานครบ ยอดอาจผิดหลัง worker รับงาน; การตอบเร็วไม่ยืนยันความถูกต้องของตัวนับร่วม",
        "Queue จัดลำดับข้อความเข้าแล้ว จึงทำให้การอ่านและแก้ object ของ worker สองตัวเป็นลำดับเดียวกัน",
        "Queue ลดการรอของผู้ส่ง แต่ threads ยังแชร์ context จึงต้องควบคุมการเข้าถึงตัวนับร่วมกัน",
        "Queue ให้แต่ละ worker รับงานแยกกัน จึงทำให้แต่ละ thread มี memory boundary ของตัวนับเป็นของตน"
      ],
      "correct": 2,
      "shades": [
        "เทา",
        "ดำ",
        "ขาว",
        "ดำ"
      ],
      "reasons": [
        "แยกความครบของการส่งงาน ความตอบสนอง และความถูกต้องของตัวนับได้จริง จึงเกี่ยวกับอาการโดยตรง แต่ยังไม่ระบุเหตุผลเรื่อง threads ใช้ shared context ที่ทำให้ต้องควบคุมการเข้าถึงร่วมกันตามข้อกล่าวที่โจทย์ให้ประเมิน",
        "ลำดับข้อความเข้า queue ไม่ได้ทำให้ชุดการอ่านและแก้ object ร่วมของสอง threads กลายเป็นการทำงานทีละตัวโดยอัตโนมัติ",
        "Async/queue กำหนดการรอและการสื่อสาร ส่วน thread safety กำหนดการใช้ shared memory/context ทั้งสองประเด็นต้องออกแบบแยกกัน",
        "การรับข้อความคนละรายการไม่ได้สร้าง memory boundary แยกให้ threads ใน DispatchProcess เดียวกัน"
      ],
      "explanation": "การตอบเร็วและการแก้ข้อมูลถูกต้องเป็นคนละคุณสมบัติ Queue ช่วยให้ผู้ส่งทำงานต่อได้ ขณะที่สอง threads ยังใช้ object ร่วมใน process จึงยังเกิด race condition และต้องจัด synchronization",
      "source": {
        "file": "ISAAD-9-2026.PDF",
        "page": 9
      },
      "sourcePages": [
        8,
        9,
        10,
        26
      ]
    },
    {
      "id": "e713-m9-03",
      "module": 9,
      "topic": "แก้ UML mapping หลังย้าย class ระหว่าง processes",
      "stem": "Runtime class diagram เดิมมี composition จาก ImportProcess ไป Parser และ dependency จาก ImportProcess ไป IndexProcess หลังปรับระบบ Parser จะ execute ใน IndexProcess ส่วน ImportProcess ยังเรียกใช้ IndexProcess ผ่าน interface เดิม ข้อใดบันทึกทั้งสถานที่ execute ของ Parser และการสื่อสารระหว่าง process หลังย้ายได้ตรงความหมายของเส้นในสไลด์?",
      "options": [
        "IndexProcess รวม Parser ด้วย composition; คง dependency จาก ImportProcess ไป IndexProcess ตามเดิม",
        "ImportProcess ยังพึ่ง IndexProcess ผ่าน interface เดิม; dependency นี้ไม่ระบุที่ execute ของ Parser",
        "ย้าย dependency ของ Parser ไป IndexProcess และคง composition จาก ImportProcess ไป IndexProcess",
        "กลับ composition ให้ Parser เป็น whole ของ IndexProcess และคง dependency ระหว่าง process ทั้งคู่"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "เทา",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "Composition ใน process mapping แสดง class ที่จัดเข้า process จึงต้องย้าย whole เป็น IndexProcess ส่วน dependency เดิมยังบันทึกการพึ่งพาข้าม process ได้",
        "อธิบายความหมายของ dependency ในสถานการณ์นี้ถูกทั้งสองส่วน และยืนยันการสื่อสารเดิมได้ แต่ยังไม่ได้บันทึกว่า IndexProcess เป็นผู้รวม Parser หลังย้าย จึงไม่ครอบคลุมสถานที่ execute ที่โจทย์ให้บันทึกด้วย",
        "Dependency ไม่ได้บอกว่า Parser execute ภายใน IndexProcess และ composition ระหว่างสอง process ก็เปลี่ยนความหมายจากการพึ่งพาเป็น whole-part",
        "เพชรทึบต้องอยู่ฝั่ง process ที่เป็น whole การให้ Parser เป็น whole ของ IndexProcess กลับความหมายของการจัด class เข้า process"
      ],
      "explanation": "การย้ายที่ execute เปลี่ยน composition ที่ใช้ mapping class ไป process โดย whole ต้องเป็น IndexProcess ส่วนการเรียกผ่าน interface ยังแสดงด้วย dependency เดิมได้ การอธิบายความหมายของ dependency อย่างถูกต้องเพียงเส้นเดียวจึงยังไม่บันทึก membership ใหม่ของ Parser",
      "source": {
        "file": "ISAAD-9-2026.PDF",
        "page": 19
      },
      "sourcePages": [
        16,
        17,
        19,
        20
      ]
    },
    {
      "id": "e713-m9-04",
      "module": 9,
      "topic": "Process isolation เทียบกับ threads และ async",
      "stem": "ระบบแปลงไฟล์มีตัวอ่านไฟล์ที่อาจทำ memory context เสียหาย ปัจจุบันมันเป็น thread ร่วม process กับตัวจัดการ session ทีมต้องการเพิ่ม failure isolation ระหว่างสองงาน โดยยอมรับต้นทุนการสื่อสารที่สูงขึ้น ข้อเสนอใดเปลี่ยนขอบเขต runtime ให้ตรงเป้าหมาย?",
      "options": [
        "คงตัวอ่านเป็น thread แล้วใช้ async messaging เพื่อแยก memory context ออกจากตัวจัดการ session",
        "คงตัวอ่านเป็น thread ใน process เดิม เพื่อใช้ execution path ที่เบาและแชร์ context กับ session",
        "คงตัวอ่านเป็น thread แล้วเปลี่ยนเป็น synchronous call เพื่อให้ความเสียหายอยู่ในขอบเขตของผู้รับคำสั่ง",
        "ย้ายตัวอ่านเป็นอีก process แล้วกำหนด interface สื่อสาร เพื่อให้มีขอบเขต isolation แยกจาก session"
      ],
      "correct": 3,
      "shades": [
        "ดำ",
        "เทา",
        "ดำ",
        "ขาว"
      ],
      "reasons": [
        "Async messaging เปลี่ยนว่าผู้ส่งต้องรอหรือไม่ ไม่ได้แยก memory/context ของ thread ที่ยังอยู่ใน process เดิม",
        "Thread เป็น execution path ที่เบาและแชร์ context จริง แต่ข้อเสนอนี้คงขอบเขต isolation เดิม จึงไม่ตอบเป้าหมายเพิ่ม failure isolation",
        "Synchronous call ทำให้ผู้ส่งรอ response ไม่ได้สร้างขอบเขตแยกเพื่อจำกัดความเสียหายของ memory/context",
        "Process เป็น independent execution unit ที่มี isolation สูงกว่า threads การแยก process จึงตรงเป้าหมาย และต้องกำหนดการสื่อสารระหว่างหน่วยงาน"
      ],
      "explanation": "สไลด์แยก isolation ของ process/thread ออกจาก synchronous/asynchronous communication การยอมเพิ่มต้นทุนเพื่อได้ขอบเขตแยกจึงสนับสนุนการใช้ process อีกตัว มากกว่าการเปลี่ยนรูปแบบ call ภายใน process เดิม",
      "source": {
        "file": "ISAAD-9-2026.PDF",
        "page": 8
      },
      "sourcePages": [
        8,
        9,
        16,
        26
      ]
    },
    {
      "id": "e713-m10-01",
      "module": 10,
      "topic": "Process-to-node allocation ภายใต้ cross-network traffic",
      "stem": "ในขั้น Process Allocation ระบบตรวจชิ้นงานมี CaptureProcess ส่งภาพขนาดใหญ่ให้ InspectProcess หลายครั้งต่อชิ้น ส่วน ArchiveProcess รับผลสรุปขนาดเล็กวันละครั้ง Node A รองรับ Capture และ Inspect ร่วมกันได้ตามเป้า throughput; Node B ก็มี capacity เพียงพอ หากการทดลองรอบนี้มุ่งลด cross-network traffic ข้อเสนอใดมีเหตุผลตรงเกณฑ์ที่สุด?",
      "options": [
        "แยก Capture กับ Inspect ลง A/B เพื่อกระจาย processor load โดยใช้ capacity ของทั้งสอง node",
        "วาง Capture กับ Inspect ร่วม A และ Archive บน B เพื่อลดการส่งภาพขนาดใหญ่ข้าม network ระหว่างตรวจงาน",
        "แยก Capture กับ Inspect ลง A/B และใช้ stub เพื่อลดการส่งภาพให้เหลือการเรียก method ภายในเครื่อง",
        "วาง Capture กับ Inspect ร่วม A และ Archive บน B โดยถือว่า traffic A→B เป็นภาพต้นฉบับทุกครั้งที่ Capture ผลิต"
      ],
      "correct": 1,
      "shades": [
        "เทา",
        "ขาว",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "การกระจาย processor load เป็นเหตุผลจริงของ distribution แต่โจทย์ระบุว่า capacity/throughput ผ่านแล้วและกำลังลด traffic ของคู่ที่ส่งภาพถี่",
        "Allocation ต้องชั่ง cross-network traffic กับ capacity และ throughput เงื่อนไข capacity ที่โจทย์ให้ทำให้ colocate คู่ส่งภาพถี่ตอบเกณฑ์ได้ตรงที่สุด",
        "Stub ทำให้ client เห็นการเรียกคล้าย local แต่ RMI Transport ยังส่งผ่าน network จริง ไม่ได้เปลี่ยนการเรียกข้าม node ให้กลายเป็น local execution",
        "หลังวาง Capture และ Inspect ร่วมกัน ภาพระหว่างสอง process ไม่ต้องข้าม A→B ส่วน Archive รับเพียงผลสรุปขนาดเล็กวันละครั้ง การระบุ link ว่าขนภาพต้นฉบับทุกครั้งจึงไม่ตรง data flow"
      ],
      "explanation": "ต้องอ่าน allocation เป็นการชั่งภาระประมวลผลและภาระเครือข่ายร่วมกัน เมื่อ node เดียวรองรับคู่ที่คุยถี่ได้ การวางคู่นั้นร่วม node ลด cross-network traffic ได้ โดยยังมี traffic ของผลสรุปไป Archive และยังต้องประเมินคุณภาพด้านอื่นในงานจริง",
      "source": {
        "file": "ISAAD-10-2026.PDF",
        "page": 13
      },
      "sourcePages": [
        5,
        7,
        10,
        13,
        17
      ]
    },
    {
      "id": "e713-m10-02",
      "module": 10,
      "topic": "RMI stub/skeleton และ network latency",
      "stem": "ทีมมี trace ของ remote pricing call จากเครื่องที่ซิงก์นาฬิกาแล้ว: client เข้าสู่ RemoteStub เวลา 10:00:00.000, RemoteSkeleton รับเวลา .180, RemoteObject ประมวลผลเสร็จเวลา .185 และ client ได้ผลเวลา .360 การค้นหา object ผ่าน Naming เสร็จก่อนเริ่ม trace แล้ว หากต้องหาต้นทุนที่ภาพเรียกคล้าย local ซ่อนไว้ ควรเพิ่มหลักฐานส่วนใดก่อน?",
      "options": [
        "เก็บช่วง transport ผ่าน network ระหว่าง stub กับ skeleton เพื่อแยกเวลาสื่อสารออกจากเวลาที่ remote object ทำงาน",
        "เก็บการใช้ CPU ภายใน RemoteObject เพิ่มเติม เพื่อประเมินภาระประมวลผลของ implementation ฝั่ง server ให้ละเอียด",
        "เก็บจำนวนครั้งที่ Naming ประมวลผลราคาแทน RemoteObject เพื่อแยกเวลาที่เกิดจากการค้นหาและการคำนวณออกจากกัน",
        "เก็บช่วงที่ RemoteStub รัน business method บน client เพื่อแยกเวลาประมวลผล local ออกจากช่วงส่งผลกลับ server"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "เทา",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "สไลด์แสดง stub → RMI Transport/network → skeleton → remote object เวลาส่วนใหญ่ของ trace อยู่นอกช่วงประมวลผล 5 ms จึงควรตรวจขอบเขตการสื่อสารนี้ก่อน",
        "การวัด CPU ของ implementation เป็นหลักฐานด้าน processing ที่มีประโยชน์จริง แต่ trace ระบุว่าช่วง remote object สั้น จึงยังไม่ตอบต้นทุนการสื่อสารที่โจทย์ให้หา",
        "Naming ใช้ค้นหา object ไม่ใช่ส่วนที่ประมวลผลราคาทดแทน RemoteObject และโจทย์ระบุว่าการค้นหาเสร็จก่อน trace แล้ว",
        "Stub เป็นตัวกลางการเรียก remote ไม่ใช่การย้าย business method ของ RemoteObject มาประมวลผลที่ client ตามภาพ RMI"
      ],
      "explanation": "ภาพ local เป็น abstraction ของการเรียก ไม่ใช่ข้อพิสูจน์ว่าไม่มี network cost Trace นี้ยังไม่แยก transport ออกจาก overhead อื่นทุกชนิด แต่บอกได้ว่าการวัดขอบเขต stub–network–skeleton ตอบเป้าหมายก่อนการลงรายละเอียด CPU ใน method",
      "source": {
        "file": "ISAAD-10-2026.PDF",
        "page": 17
      },
      "sourcePages": [
        15,
        17,
        18,
        22
      ]
    },
    {
      "id": "e713-m10-03",
      "module": 10,
      "topic": "บทบาท Java RMI: Remote, Serializable, Naming และ implementation",
      "stem": "โครงการใช้ Java RMI ตาม anatomy ในสไลด์ มี remote interface, server implementation และ client ที่ค้นหา object ได้แล้ว ก่อนเพิ่ม operation ส่ง CalibrationBatch ซึ่งเป็นชุดค่าข้อมูลผ่าน argument ทีมต้องตรวจข้อกำหนดของชนิดข้อมูลนี้โดยตรง ข้อใดเป็นงานตรวจที่ตอบเป้าหมาย?",
      "options": [
        "ตรวจว่า operation ที่รับ CalibrationBatch อยู่ใน remote interface ที่รองรับ java.rmi.Remote เพื่อยืนยันสัญญาการเรียก",
        "ตรวจ CalibrationBatch ว่า extends UnicastRemoteObject เพื่อให้ข้อมูล argument ถูกแปลงเป็นค่าและส่งผ่าน network ได้",
        "ตรวจ CalibrationBatch ว่าเรียก Naming ค้นหา server เพื่อให้ข้อมูล argument ทราบตำแหน่ง node ก่อนถูกส่งไปใช้งาน",
        "ตรวจ CalibrationBatch ว่ารองรับ java.io.Serializable เพื่อให้ชนิดข้อมูล argument ตรงบทบาท Data Parameters ในสไลด์"
      ],
      "correct": 3,
      "shades": [
        "เทา",
        "ดำ",
        "ดำ",
        "ขาว"
      ],
      "reasons": [
        "เป็นการตรวจสัญญาการเรียก operation ที่จะรับข้อมูลใหม่นี้โดยตรง และ java.rmi.Remote ก็เป็นบทบาทของ remote interface จริง แต่ยังไม่ตรวจคุณสมบัติของ CalibrationBatch เองว่าพร้อมเป็น Data Parameters หรือไม่",
        "UnicastRemoteObject อยู่ในบทบาท server implementation ตามภาพ ไม่ใช่ข้อกำหนดของชุดข้อมูล argument ที่ต้องผ่าน Serializable",
        "Naming เป็นบทบาท client สำหรับค้นหา remote object ไม่ได้กำหนดให้ชนิดข้อมูล argument ต้องค้นหา node ด้วยตนเอง",
        "ภาพแยก Data Parameters ออกจาก Interface/Implementation/Client และระบุ Serializable สำหรับ passed arguments ตรงชนิดข้อมูลใหม่ในโจทย์"
      ],
      "explanation": "ต้องแยกสัญญาของบริการ การเปิดบริการ การค้นหาบริการ และข้อมูลที่ส่งให้บริการออกจากกัน โจทย์ถามข้อมูล argument จึงตรวจ Serializable โดยไม่ต้องอาศัยการจับ syntax extends/implements ที่ภาพใช้คำไม่ชัดเจน",
      "source": {
        "file": "ISAAD-10-2026.PDF",
        "page": 18
      },
      "sourcePages": [
        17,
        18
      ]
    },
    {
      "id": "e713-m10-04",
      "module": 10,
      "topic": "Deployment checkpoints: Data Integrity และการประสาน update",
      "stem": "ระบบคลังสินค้ามีสำเนาข้อมูลบนสอง node การทดสอบยืนยันว่า response time ผ่านและสลับ primary ไป secondary ได้สำเร็จ แต่เมื่อทั้งสองฝั่งรับการปรับยอดช่วงเดียวกัน รายงานกลับมียอดต่างกัน ทีมจะเติมหลักฐานใน deployment review เพื่ออธิบายปัญหาที่เหลือ ควรตรวจประเด็นใดก่อน?",
      "options": [
        "ตรวจผลการปรับยอดทีละ node โดยไม่ให้ช่วง update ทับกัน เพื่อแยกความผิดพลาดของแต่ละฝั่งจากปัญหาขณะทำงานพร้อมกัน",
        "ตรวจลำดับและการประสาน distributed updates บนสองสำเนา เพื่อประเมิน Data Integrity ขณะมีการปรับยอดพร้อมกัน",
        "ตรวจว่า argument ทุกชนิดเป็น Serializable แล้วหรือยัง เพื่อใช้ยืนยันว่าการ update บนสองสำเนาถูก synchronize แล้ว",
        "ตรวจว่า link มี bandwidth เหลือเพียงพอตอน peak หรือไม่ เพื่อใช้ยืนยันว่าการ update สองฝั่งไม่เกิดความขัดแย้ง"
      ],
      "correct": 1,
      "shades": [
        "เทา",
        "ขาว",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "การทดสอบ update แยกฝั่งเป็นหลักฐานที่ช่วยคัดปัญหาการคำนวณของแต่ละฝั่งออกได้จริง และเกี่ยวกับยอดที่ผิดโดยตรง แต่ยังไม่ตรวจ coordination/synchronization ที่เกิดระหว่างสองฝั่งในเงื่อนไขพร้อมกันซึ่งเป็นอาการหลัก",
        "Final Checkpoints ระบุ Data Integrity โดยถามถึง distributed data update coordination และ synchronization ตรงกับอาการเมื่อเกิด update พร้อมกัน",
        "Serializable เป็นบทบาทข้อมูล argument สำหรับส่งผ่าน RMI ไม่ได้ยืนยันการประสานลำดับหรือความถูกต้องของ update ระหว่างสำเนา",
        "Bandwidth เป็นเงื่อนไข allocation/communication ที่ต้องพิจารณาจริง แต่ความจุ link ไม่ใช่กลไก synchronize หรือหลักฐานว่าการ update จะไม่ขัดแย้ง"
      ],
      "explanation": "ผ่าน latency และ failover ยังไม่ได้ยืนยัน Data Integrity สไลด์แยกคุณภาพเหล่านี้เป็น checkpoint ต่างกัน อาการยอดต่างกันเมื่อ update พร้อมกันจึงต้องตรวจ coordination/synchronization ของ distributed updates ก่อน",
      "source": {
        "file": "ISAAD-10-2026.PDF",
        "page": 22
      },
      "sourcePages": [
        13,
        18,
        22
      ]
    },
    {
      "id": "e713-m11-01",
      "module": 11,
      "topic": "เจ้าของกฎโดเมนเมื่อมีหลายช่องทางเรียกใช้",
      "stem": "ระบบจองเครื่องทดลองมีทั้งคำขอจากเว็บและงานนำเข้าไฟล์ ทั้งสอง flow โหลด ReservationPlan และต้องตรวจเวลาทับซ้อนก่อนเพิ่มการจอง Repository มี unique constraint กันเลขคำขอซ้ำอยู่แล้ว หากแบ่ง boundary/control/entity ตาม Module 11 ข้อเสนอใดกำหนดเจ้าของการตรวจเวลาทับซ้อนได้เหมาะที่สุด?",
      "options": [
        "ให้ Repository ใช้ unique constraint ป้องกันเลขคำขอซ้ำ และรายงานความขัดแย้งที่เกิดระหว่างบันทึกข้อมูล",
        "ให้แต่ละ Boundary ตรวจเวลาทับซ้อนจากข้อมูลนำเข้า และส่งเฉพาะคำขอที่ผ่านกฎไปให้ Service บันทึก",
        "ให้ ReservationPlan ตรวจเวลาทับซ้อนผ่าน canReserve(slot) และให้ Service ประสานการเรียกก่อนบันทึก",
        "ให้ EquipmentAdapter ตรวจเวลาทับซ้อนของผู้จอง และส่ง slot ที่อนุมัติแล้วกลับให้ Service บันทึกข้อมูล"
      ],
      "correct": 2,
      "shades": [
        "เทา",
        "ดำ",
        "ขาว",
        "ดำ"
      ],
      "reasons": [
        "เป็นกลไก persistence ที่ถูกต้องสำหรับคำขอซ้ำ แต่โจทย์มี constraint นี้แล้ว และเลขคำขอไม่ซ้ำยังมีเวลาทับซ้อนกันได้ จึงยังไม่ระบุเจ้าของกฎที่ถาม",
        "Boundary รับและตรวจคำขอได้ แต่การกระจายกฎเวลาทับซ้อนไปแต่ละช่องทางขัดการให้ entity เป็นเจ้าของ domain rules ตามการแบ่งความรับผิดชอบในบท",
        "เทียบกับ Schedule.canAdd ในสไลด์ ReservationPlan เป็นผู้ถือสถานะและกฎ ส่วน Service ประสาน flow ทั้งสองช่องทางจึงใช้กฎเจ้าของเดียวกัน",
        "Adapter เป็น external boundary ที่ซ่อนรายละเอียดภายนอก ไม่ใช่เจ้าของแผนการจองของผู้ใช้ การให้มันตัดสินกฎใน ReservationPlan สลับความรับผิดชอบกัน"
      ],
      "explanation": "ความต่างอยู่ที่การตรวจรูปแบบคำขอ กฎโดเมน และข้อจำกัด persistence สไลด์แยกสามงานนี้ โดย entity เป็นเจ้าของกฎ และ control ประสานการทำงาน การมี unique constraint ไม่ได้ย้ายกฎเวลาทับซ้อนไปไว้ที่ Repository",
      "source": {
        "file": "ISAAD-11-2026.PDF",
        "page": 36
      },
      "sourcePages": [
        10,
        14,
        28,
        31,
        36
      ]
    },
    {
      "id": "e713-m11-02",
      "module": 11,
      "topic": "Interface เป็นจุดประสานของ flow ข้าม subsystem",
      "stem": "ใน use-case realization การออกใบรับรอง Service เรียก IEligibility.check(id) แล้วแยกเพียงผ่าน/ไม่ผ่าน ทีมภายในกำลังเปลี่ยนฐานข้อมูล แต่พบว่าแหล่งข้อมูลอาจ timeout ซึ่ง caller ต้องแจ้งให้ลองใหม่โดยไม่สร้างใบรับรอง ขณะนี้ contract ยังไม่ระบุ failure นี้ สิ่งใดควรตกลงร่วมกันก่อนแยกทีมพัฒนาต่อ?",
      "options": [
        "เพิ่ม unavailable ใน contract ของ IEligibility และเพิ่ม error flow ของ caller ที่แยกจากผลไม่ผ่านเกณฑ์",
        "ระบุ timeout ในเอกสารภายในของ EligibilityAdapter และให้ caller อนุมาน failure จากผลไม่ผ่านเกณฑ์",
        "วาด mapping ระหว่าง records กับผลตรวจภายใน subsystem และซ่อนรายละเอียดฐานข้อมูลไว้หลัง adapter",
        "เพิ่มคำสั่ง query ฐานข้อมูลใน realization ของ caller และให้ Service จัดการ timeout แทน subsystem"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "ดำ",
        "เทา",
        "ดำ"
      ],
      "reasons": [
        "Failure ที่ caller ต้องจัดการต้องเป็นส่วนของ interface contract และ flow ข้าม boundary ใช้ interface เป็น synchronization point ได้แม้รายละเอียดฐานข้อมูลยังเปลี่ยนอยู่",
        "การซ่อนรายละเอียดฐานข้อมูลถูกทิศทาง แต่ซ่อนความต่างระหว่าง unavailable กับผลไม่ผ่านเกณฑ์ไม่ได้ เพราะ caller มีพฤติกรรมตอบสนองสองกรณีต่างกัน",
        "เป็นงานภายใน subsystem ที่ควรทำและช่วย encapsulation แต่ยังไม่ตกลง observable failure ที่ทั้ง provider และ caller ต้องใช้ร่วมกันในสถานการณ์นี้",
        "การดึง query เข้า realization ของ caller เปิดเผย internals และผูก caller กับฐานข้อมูล แทนการกำหนด failure ผ่าน interface ที่เป็นจุดประสาน"
      ],
      "explanation": "การทำงานคู่ขนานอาศัย contract ที่ตกลงกันตรง boundary ไม่ได้อาศัยการรู้ schema ร่วมกัน สไลด์ให้ระบุ errors ที่ caller ต้องจัดการ และแยก unavailable ออกจากผลลัพธ์เชิงธุรกิจ",
      "source": {
        "file": "ISAAD-11-2026.PDF",
        "page": 23
      },
      "sourcePages": [
        8,
        11,
        17,
        18,
        23,
        27
      ]
    },
    {
      "id": "e713-m11-03",
      "module": 11,
      "topic": "ผลลัพธ์เมื่อการเขียนรายการที่สองใน transaction ล้มเหลว",
      "stem": "ระบบเปิดสิทธิ์ใช้งานบันทึก Entitlement กับ InvoiceRequest ในฐานเดียวกันภายใน UnitOfWork เดียวตามแบบ transaction ของสไลด์ save(Entitlement) สำเร็จ แต่ add(InvoiceRequest) ล้มเหลวก่อน commit และ rollback สำเร็จแล้ว API ยังไม่ได้ส่งผลกลับ ข้อใดเป็นการตอบสนองต่อ trace นี้ที่ตรง boundary ดังกล่าว?",
      "options": [
        "ตอบเปิดสิทธิ์สำเร็จแก่ caller แล้วให้ worker สร้าง InvoiceRequest ทดแทนจาก Entitlement ที่บันทึกไว้",
        "ตอบรับคำขอแก่ caller แล้วให้ Billing ส่งผลล้มเหลวกลับมาเพื่อย้อน transaction ที่เพิ่ง rollback ไป",
        "หลัง commit สำเร็จให้ worker retry รายการ InvoiceRequest ที่ pending โดยคง requestId เดิมเพื่อกู้คืนการส่ง",
        "ตอบเปิดสิทธิ์ล้มเหลวแก่ caller เพราะ rollback ครอบคลุมทั้ง Entitlement และ InvoiceRequest ที่เขียน"
      ],
      "correct": 3,
      "shades": [
        "ดำ",
        "ดำ",
        "เทา",
        "ขาว"
      ],
      "reasons": [
        "save สำเร็จก่อน commit ไม่ได้ทำให้ Entitlement คงอยู่หลัง rollback สมมติฐานว่า worker จะอ่าน Entitlement ที่คงอยู่จึงไม่ตรง trace และละเมิด all-or-nothing",
        "ผลธุรกรรมในฐานข้อมูลทราบแล้วว่า rollback จึงต้องตอบตามนั้น Remote Billing ไม่ใช่ผู้ย้อน transaction เดิมและไม่มี accepted transaction ให้ยืนยัน",
        "เป็นกฎ recovery ที่ถูกต้องภายใต้เงื่อนไขหลัง commit ซึ่งตัวเลือกระบุไว้ แต่ trace นี้ rollback แล้ว จึงไม่มี InvoiceRequest จากธุรกรรมนี้ให้ส่งต่อ และกฎดังกล่าวไม่ใช่การตอบผลของ trace ปัจจุบัน",
        "การเขียนสองรายการอยู่ใน transaction เดียวและ rollback สำเร็จ ผลจึงเป็นล้มเหลวทั้งหน่วย ต้องแจ้ง caller หลังทราบ outcome ตามจริง"
      ],
      "explanation": "จุดชี้ขาดคือ save ครั้งแรกยังอยู่ก่อน commit และ rollback สำเร็จ การออกแบบให้บันทึก intent คู่กับข้อมูลโดเมนมีไว้ให้คงอยู่ทั้งคู่หรือไม่คงอยู่ทั้งคู่ Recovery หลัง commit ใช้แทน rollback ที่เกิดขึ้นแล้วไม่ได้",
      "source": {
        "file": "ISAAD-11-2026.PDF",
        "page": 32
      },
      "sourcePages": [
        29,
        31,
        32,
        33,
        35
      ]
    },
    {
      "id": "e713-m11-04",
      "module": 11,
      "topic": "Remote acceptance ที่คำตอบสูญหายหลัง local commit",
      "stem": "ฐานข้อมูลท้องถิ่น commit การสมัครสมาชิกและ BillingRequest R72 แล้ว Worker ส่ง R72 ไป Billing ซึ่งรับคำขอสำเร็จ แต่คำตอบสูญหายระหว่างทาง Worker จึงยังเห็นสถานะ pending เมื่อจะกู้คืนการส่งครั้งนี้ การกระทำใดรักษาความหมายของ transaction และป้องกันผลซ้ำตามแบบใน Module 11?",
      "options": [
        "สร้าง requestId ใหม่สำหรับการส่งรอบถัดไป และให้ Billing แยกคำขอรอบนี้จาก R72 ที่อาจได้รับแล้ว",
        "ส่งซ้ำโดยคง requestId R72 ไว้ตามเดิม และให้ Billing deduplicate คำขอที่อาจรับสำเร็จไปแล้ว",
        "นับอายุของ R72 ในรายการ pending ต่อไป และติดตามคำขอที่ค้างอยู่เพื่อให้ตรวจพบ recovery ที่ล่าช้า",
        "ย้อน transaction การสมัครสมาชิกที่ commit แล้ว และให้ผลของการส่งรอบถัดไปตัดสินการ commit ใหม่"
      ],
      "correct": 1,
      "shades": [
        "ดำ",
        "ขาว",
        "เทา",
        "ดำ"
      ],
      "reasons": [
        "เปลี่ยน requestId ทำให้ Billing มองเป็นคำขอใหม่ จึงตัดความเชื่อมโยงกับการส่ง R72 ที่รับสำเร็จแต่คำตอบหายและเสี่ยงสร้างผลซ้ำ",
        "ผู้ส่งไม่ทราบ remote outcome แต่ local transaction commit แล้ว การ retry ด้วย ID เดิมร่วมกับ deduplication เป็นกลไก recovery ที่สไลด์กำหนด",
        "การ monitor pending requests เป็นส่วนที่ถูกต้องของ recovery และช่วยพบคำขอค้าง แต่โจทย์ถามการกู้คืนการส่งครั้งนี้ การติดตามอย่างเดียวยังไม่ทำให้ส่งสำเร็จ",
        "Remote Billing อยู่นอก transaction ฐานข้อมูลท้องถิ่น การไม่ได้รับคำตอบไม่ทำให้ transaction ที่ commit แล้วกลับไปเป็น transaction ที่ยังรอตัดสินใจ"
      ],
      "explanation": "ต้องแยก local outcome ที่ทราบแล้วออกจาก remote outcome ที่ผู้ส่งยังไม่ทราบ การรับคำขอซ้ำโดยใช้ ID เดิมจึงสำคัญกว่าการนับจำนวนครั้งที่เรียก และต้องออกแบบ deduplication ฝั่ง Billing ประกอบด้วย",
      "source": {
        "file": "ISAAD-11-2026.PDF",
        "page": 33
      },
      "sourcePages": [
        8,
        27,
        31,
        33,
        35
      ]
    },
    {
      "id": "e713-m12-01",
      "module": 12,
      "topic": "Error ownership ของข้อมูลผิดรูปแบบหลัง query สำเร็จ",
      "stem": "CatalogFacade ตรวจ semesterId ผ่านแล้ว Adapter query สำเร็จและได้ 12 records แต่ record หนึ่งมีชนิดข้อมูล CRS_ID ผิดจากที่ Mapper แปลงได้ กรณีนี้ไม่ใช่ timeout และไม่ใช่ไม่มี offerings หากใช้ error ownership ตามสไลด์ ข้อใดตรงกับ failure ที่เกิดขึ้นขณะนี้?",
      "options": [
        "เมื่อ query timeout ให้ Repository Adapter แปลเป็น CatalogUnavailable เพื่อซ่อน driver exception จาก caller",
        "CatalogFacade ส่ง InvalidSemester กลับให้ caller เพราะ record ที่แปลงไม่ได้ทำให้ semesterId กลายเป็น invalid",
        "Mapper ร่วมกับ Facade จัด controlled failure พร้อม internal logging เพื่อไม่ให้รายละเอียด record รั่วสู่ caller",
        "Repository ร่วมกับ Facade คืน empty list ให้ caller เพราะ record ที่แปลงไม่ได้เทียบได้กับไม่มี matching offerings"
      ],
      "correct": 2,
      "shades": [
        "เทา",
        "ดำ",
        "ขาว",
        "ดำ"
      ],
      "reasons": [
        "เป็น owner และ observable error ที่ถูกสำหรับ database timeout แต่โจทย์ระบุว่า query สำเร็จ ความผิดรูปแบบเกิดในขั้น representation mapping จึงไม่ใช่แถวนี้ในตาราง",
        "semester identifier ผ่านการตรวจแล้ว Record format ไม่ตรงคาดเป็นคนละ failure กับ invalid semester ซึ่ง Facade ต้องบล็อกก่อน query",
        "ตรงแถว unexpected record format ในตารางหน้า 23 ซึ่งกำหนด Mapper + Facade เป็น owner และให้ controlled failure พร้อม internal logging",
        "Empty list เป็น valid success เมื่อไม่มี matching offerings การเปลี่ยน record เสียให้เป็น success ว่างทำให้ความหมาย contract ผิดไป"
      ],
      "explanation": "ต้องระบุ failure จากจุดที่เกิดจริง ไม่ใช่รวมทุกปัญหาเป็น error เดียว ขั้น validate identifier, query และ mapping มีเจ้าของและ observable outcomes ต่างกันตามตาราง error ownership",
      "source": {
        "file": "ISSAD-12-2026.PDF",
        "page": 23
      },
      "sourcePages": [
        16,
        18,
        21,
        23,
        25
      ]
    },
    {
      "id": "e713-m12-02",
      "module": 12,
      "topic": "หลักฐานการห่อ persistence และ DTO contract",
      "stem": "ทีมเปลี่ยน Catalog จาก JDBC เป็น ORM โดยคงพฤติกรรม getCourseOfferings ไว้ ผู้ตรวจต้องเลือกหลักฐานที่ตอบตรงที่สุดว่า client ถูกแยกจาก persistence representation ตาม Module 12 ข้อใดรองรับข้อสรุปนี้โดยตรงที่สุด?",
      "options": [
        "Client อ้าง DTO และ stable errors จาก contract เท่านั้น ส่วน Mapper ภายในเปลี่ยน input จาก records เป็น ORM data",
        "Adapter integration tests ยืนยัน query และ timeout ของ ORM ใหม่ ส่วน unit tests ยืนยันการแปลงข้อมูลภายใน subsystem",
        "Client รับ ORM entity ผ่าน type alias ชื่อ DTO เหมือนเดิม จึงนับว่า contract แยกจาก persistence representation แล้ว",
        "Client กับ Adapter อ้าง shared package ที่รวม driver types เดียวกัน จึงนับว่าทั้งคู่พึ่ง public contract ที่มั่นคงแล้ว"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "เทา",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "หลักฐานแสดง boundary โดยตรงว่า client เห็น stable data types ส่วน representation ที่เปลี่ยนอยู่ภายใน ตรงเป้าหมายให้ public contract อยู่รอดเมื่อเปลี่ยน Repository/ORM",
        "เป็นการทดสอบที่มีประโยชน์และตรงชนิด evidence ตามหน้า 36 แต่ query/mapping ผ่านยังไม่พิสูจน์ว่า client ไม่ import หรือรับ persistence types",
        "การตั้งชื่อ alias ไม่เปลี่ยนสิ่งที่ client ได้รับ ถ้ายังเป็น ORM entity ก็ยังผูกกับ persistence representation และไม่ใช่การ map สู่ DTO ที่ห่อรายละเอียด",
        "shared package ไม่ทำให้ทุก type ในนั้นกลายเป็น stable contract การแชร์ driver types กระจาย technology coupling ไปยัง client"
      ],
      "explanation": "การตรวจ behavior ของ adapter กับการตรวจการห่อข้อมูลตอบคนละด้าน DTO ต้องมี field และความหมายสำหรับ client โดยซ่อน driver/ORM records ไว้ภายใน ชื่อ DTO อย่างเดียวไม่ใช่หลักฐานของ encapsulation",
      "source": {
        "file": "ISSAD-12-2026.PDF",
        "page": 24
      },
      "sourcePages": [
        22,
        24,
        25,
        33,
        34,
        36
      ]
    },
    {
      "id": "e713-m12-03",
      "module": 12,
      "topic": "Required contracts กับวงจรใน import graph",
      "stem": "ตรวจ build graph พบ BillingImpl → ProfileContract → SharedTypes → BillingImpl โดย ProfileContract ใช้เพียง ContactId ส่วน SharedTypes นำเข้า BillingImpl เพื่ออ้าง BillRecord ทีมต้องตัด cycle ที่พบ พร้อมคงการพึ่ง capability ผ่าน public contract ข้อใดแก้ dependency เส้นปัญหานี้ได้ตรงที่สุด?",
      "options": [
        "ให้ ProfileContract นำเข้า BillStore จาก BillingImpl โดยตรง เพื่อให้กราฟเลิกอ้อมผ่าน SharedTypes ก่อนย้อนกลับ",
        "เพิ่ม architecture check ตรวจ build/import graph เพื่อให้ตรวจพบ cycle นี้ก่อนเผยแพร่ implementation",
        "ให้ ProfileContract คืน BillRecord จาก BillingImpl แทน ContactId เพื่อให้ client ใช้ record ได้โดยไม่ต้อง map ข้อมูล",
        "แยก ContactId ไป contract package แคบที่ไม่ import implementation แล้วให้ ProfileContract อ้าง package ใหม่นั้น"
      ],
      "correct": 3,
      "shades": [
        "ดำ",
        "เทา",
        "ดำ",
        "ขาว"
      ],
      "reasons": [
        "ทำให้เส้นย้อนกลับเข้า implementation ตรงขึ้น แต่ BillingImpl ยังพึ่ง ProfileContract และ ProfileContract ย้อนพึ่ง BillingImpl จึงยังเป็น cycle",
        "การตรวจ build/import graph และใช้ architecture check เป็นงานที่สไลด์รองรับและตรวจพบ cycle นี้ได้จริง แต่การเพิ่มตัวตรวจยังไม่ได้ตัดเส้น dependency ที่ย้อนเข้า BillingImpl",
        "ProfileContract จะยิ่งพึ่ง BillingImpl ที่เป็น persistence implementation วงจร BillingImpl → ProfileContract → BillingImpl จึงยังอยู่ และ database record รั่วผ่าน contract",
        "ProfileContract ใช้เพียง ContactId การตัด dependency ไป SharedTypes ที่ดึง BillingImpl กลับเข้ามาจึงตัดวงจรได้ โดยยังอ้าง public contract type ที่แคบพอดี"
      ],
      "explanation": "ต้องอ่านทิศของ graph ไม่ใช่ตัดสินจากชื่อ Shared หรือ Contract เส้นที่ต้องตัดคือทางกลับสู่ implementation สไลด์ให้ shared contract types แคบ ตรวจ coupling และตรวจ build/import graph เพื่อไม่ให้เกิด cycles",
      "source": {
        "file": "ISSAD-12-2026.PDF",
        "page": 33
      },
      "sourcePages": [
        7,
        8,
        33,
        34
      ]
    },
    {
      "id": "e713-m12-04",
      "module": 12,
      "topic": "จุดตอบ accepted กับความรับผิดชอบ delivery",
      "stem": "คำขอออกบิลใหม่ผ่าน findByRequestId แล้วได้ absent ดึง contact และสร้าง bill สำเร็จ Gateway ส่งบิลกำลังปิดปรับปรุง แต่ BillStore ยังเขียนได้ ทีมต้องเลือกจุดที่ออก BillingReceipt แบบ accepted ได้ตาม teaching design โดยไม่อ้างว่า delivery สำเร็จ ข้อใดตรงจุดนั้น?",
      "options": [
        "หลัง createBill คืน object แล้ว จึงตอบ accepted จาก object ในหน่วยความจำก่อนให้ worker บันทึก intent ในภายหลัง",
        "หลัง saveIntentAtomically ทำ durable acceptance แล้ว จึงตอบ accepted ก่อนที่ worker จะส่งผ่าน gateway",
        "เมื่อพบรายการ Pending แล้ว จึงติดตาม Pending, Delivered และ Failed เพื่อให้เห็นผลการส่งของ worker",
        "หลัง gateway รับ connection แล้ว จึงตอบ accepted และให้ worker บันทึก intent เมื่อได้ผลการส่งกลับมา"
      ],
      "correct": 1,
      "shades": [
        "ดำ",
        "ขาว",
        "เทา",
        "ดำ"
      ],
      "reasons": [
        "Bill object ที่สร้างใน memory ยังไม่ใช่ durable acceptance การตอบ accepted ก่อนบันทึก intent จึงเลื่อนความทนทานที่ contract อาศัยไปหลังการตอบ",
        "หน้า 29 ระบุให้ตอบหลัง durable acceptance โดย BillStore ส่วน worker จัด delivery แยกต่างหาก Gateway ยังส่งไม่ได้จึงไม่ขัด accepted ที่มีความหมายนี้",
        "การติดตามสถานะเหล่านี้ถูกต้องตามหน้า 30 และใช้กับ recovery แต่เป็นเรื่องการติดตาม delivery ไม่ได้ระบุจุดที่ facade รับคำขออย่างถาวรและตอบ receipt ได้",
        "การเปิด connection ไม่ได้แทน atomic storage และสลับลำดับที่สไลด์ให้บันทึก intent ก่อนตอบ accepted โดยให้ worker ส่งภายหลัง"
      ],
      "explanation": "BillingReceipt ในบทนี้ยืนยัน accepted request พร้อม status จุดแยกสำคัญอยู่ที่ intent ถูกบันทึกอย่างถาวรแล้วหรือยัง ส่วนการส่งจริงเป็นงานของ worker ซึ่งอาจยัง Pending หรือเกิด Failed ได้",
      "source": {
        "file": "ISSAD-12-2026.PDF",
        "page": 29
      },
      "sourcePages": [
        28,
        29,
        30,
        31
      ]
    },
    {
      "id": "e713-m12-05",
      "module": 12,
      "topic": "Idempotency เมื่อจำนวนเงินเท่ากันแต่ currency ต่างกัน",
      "stem": "Billing รับ R81 ของ student S9 เป็น Money(120.00, THB) อย่างถาวรแล้ว แต่ client ไม่ได้รับ receipt จึงส่ง R81 อีกครั้งเป็น Money(120.00, USD) โดย studentId เดิม และ bill แรกยัง Pending ต้องใช้กฎ repeated request ของสไลด์กับการเรียกครั้งที่สองอย่างไร?",
      "options": [
        "เมื่อ ID และ payload ตรงกันให้คืน receipt เดิมตาม contract โดยไม่สร้าง bill ใบที่สองจากการส่งคำขอเดิมซ้ำ",
        "คืน receipt เดิมให้ requestId เดิมได้เลย เพราะจำนวนแบบ decimal เท่ากันและ bill ยังไม่ได้ส่งจริง",
        "ตอบ conflict สำหรับ payload ที่เปลี่ยนไป เพราะ currency เป็นส่วนของ Money แม้จำนวนแบบ decimal เท่ากัน",
        "แทน intent เดิมด้วย payload รอบล่าสุดได้ เพราะสถานะ Pending ยังไม่ถือว่า Billing รับคำขออย่างถาวร"
      ],
      "correct": 2,
      "shades": [
        "เทา",
        "ดำ",
        "ขาว",
        "ดำ"
      ],
      "reasons": [
        "เป็นกฎที่ถูกเมื่อ ID และ payload ตรงกัน และเป็นทางที่ใช้เมื่อคำตอบหาย แต่กรณีนี้ currency เปลี่ยน จึงเข้าเงื่อนไข conflict แทน",
        "Money ประกอบด้วย decimal amount และ currency จำนวนเท่ากันจึงไม่พอจะถือว่า payload เหมือนเดิม สถานะ Pending ไม่ยกเว้นกฎ conflict",
        "requestId เดิมแต่ payload ต่างต้อง conflict โดย currency เป็นส่วนหนึ่งของ input type ตาม contract จึงต้องนับการเปลี่ยน THB เป็น USD ด้วย",
        "Pending เป็นสถานะ delivery ของคำขอที่รับแล้ว ไม่ได้แปลว่าแก้ intent ที่รับอย่างถาวรได้ และการนำ ID เดิมมาใช้กับ payload ต่างขัด contract"
      ],
      "explanation": "การตัดสิน repeated request ต้องตรวจทั้ง ID และความหมายของ payload ไม่ใช่ดูเพียงจำนวนเงินหรือว่าส่งจริงแล้วหรือยัง Receipt ที่หายไม่ได้เปิดทางให้ payload ใหม่ใช้ ID เดิม",
      "source": {
        "file": "ISSAD-12-2026.PDF",
        "page": 28
      },
      "sourcePages": [
        28,
        29,
        30
      ]
    },
    {
      "id": "e713-m13-01",
      "module": 13,
      "topic": "Operation contract, method และ classifier scope",
      "stem": "ทุก object ของ RateBook มี public operation quote(request: QuoteRequest): Money แบบ instance เดิมทีมคำนวณราคาด้วยสูตรใหม่จะเปลี่ยนไปเรียก LookupTable โดยคง signature และ observable behavior เดิม ผู้พัฒนาเสนอขีดเส้นใต้ quote เพราะทุก object ใช้อัลกอริทึมเดียวกัน ข้อใดระบุการปรับ class design สำหรับการเปลี่ยนครั้งนี้ได้เหมาะที่สุด?",
      "options": [
        "ปรับ method description ให้ใช้ LookupTable โดยคง instance operation; อัลกอริทึมร่วมไม่ได้กำหนด classifier scope",
        "ทบทวนการส่ง QuoteRequest ว่าเป็น by-value หรือ by-reference; parameter description ควรระบุความหมายให้ชัดเจน",
        "ขีดเส้นใต้ quote ให้เป็น classifier operation โดยคง public visibility; การใช้ขั้นตอนร่วมทำให้มี operation เดียวต่อ class",
        "เพิ่ม LookupTable เป็น parameter ของ quote เพื่อส่ง object ที่ method ใช้; ถือว่า signature เดิมคงอยู่เพราะ return type ยังเป็น Money"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "เทา",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "Method ระบุอัลกอริทึมและ objects/operations ที่ใช้ ส่วน scope ระบุสมาชิกระดับ instance หรือ classifier การเปลี่ยนวิธีคำนวณโดยคง contract จึงไม่ใช่เหตุให้เปลี่ยน scope",
        "การทบทวน parameter passing และความหมาย parameter เป็นงานที่ถูกตามแนวทาง operation signatures แต่ไม่ตอบการเปลี่ยน implementation และข้อเสนอเรื่องขีดเส้นใต้ที่โจทย์ให้ตรวจ",
        "การใช้อัลกอริทึมเดียวกันไม่ได้ทำให้ operation ที่กำหนดเป็น instance กลายเป็น classifier member ขีดเส้นใต้สื่อ scope ไม่ได้สื่อการใช้ method body คล้ายกัน",
        "การเพิ่ม parameter เปลี่ยน operation signature แม้ return type ยังคงเดิม ส่วนการเปลี่ยนอัลกอริทึมภายใต้ signature ที่กำหนดต้องอธิบายใน method description"
      ],
      "explanation": "Operation ระบุบริการและ signature ส่วน method อธิบายวิธี implement LookupTable เป็นรายละเอียดของ method ภายใต้ signature เดิม การเพิ่ม parameter ย่อมเปลี่ยน signature แม้ return type คงเดิม และการใช้อัลกอริทึมร่วมไม่ได้ทำให้ operation กลายเป็น classifier scope",
      "source": {
        "file": "ISAAD-13-2026.PDF",
        "page": 16
      },
      "sourcePages": [
        9,
        10,
        11,
        12,
        14,
        16
      ]
    },
    {
      "id": "e713-m13-02",
      "module": 13,
      "topic": "อ่าน event, guard และ action จาก transition",
      "stem": "Statechart ของ ExportJob มี transition จาก Queued ไป Running เขียนว่า start(user) [quota > 0] / quota = quota - 1 และใน Running มี do/ streamRows ขณะนี้อยู่ Queued, quota = 0 และได้รับ start(user) โดยไม่มี transition อื่น ข้อใดอธิบายผลของ event ครั้งนี้ได้ตรง syntax และเงื่อนไขที่ให้?",
      "options": [
        "transition เริ่มก่อนเพื่อลด quota แล้วจึงตรวจ guard; หาก quota ไม่พอให้ย้อนกลับมายัง Queued ภายหลัง",
        "event start(user) ถูกใช้เป็น action ของ Running; guard quota > 0 จึงกำหนดว่าจะขัดจังหวะ streamRows ได้หรือไม่",
        "streamRows เป็น activity ที่ใช้เวลาและขัดจังหวะได้; ส่วนการลด quota เป็น action ที่ติดอยู่กับ transition",
        "guard เป็นเท็จจึงไม่ใช้ transition ไป Running; action ลด quota และ activity ของ Running จึงยังไม่เริ่มทำงาน"
      ],
      "correct": 3,
      "shades": [
        "ดำ",
        "ดำ",
        "เทา",
        "ขาว"
      ],
      "reasons": [
        "วงเล็บเหลี่ยมเป็นเงื่อนไขสำหรับ transition ไม่ใช่ post-check หลัง action จึงไม่เริ่ม transition แล้วลด quota เพื่อค่อยตัดสินว่าจะย้อนกลับ",
        "start(user) เป็น event บน transition ไม่ใช่ action ของ Running ส่วน guard กำกับการใช้ transition ไม่ได้กำหนด interruptibility ของ activity",
        "จำแนก activity และ transition action ได้ถูกตามหน้า 18 และ 22 แต่โจทย์ถามผลเมื่อ event มาถึงขณะที่ guard เป็นเท็จ จึงยังไม่ได้ตัดสินว่า transition ใช้ได้หรือไม่",
        "รูป event [guard] / action กำหนดให้เงื่อนไขผ่านก่อนใช้ transition เมื่อ quota เป็นศูนย์จึงไม่เข้าสู่ Running ผ่านเส้นนี้ และไม่เริ่ม action/activity ที่ระบุ"
      ],
      "explanation": "ต้องอ่านทั้ง syntax และค่าปัจจุบัน การมี event ตรงชื่อยังไม่พอเมื่อ transition มี guard ส่วน do activity เป็นพฤติกรรมใน state เป้าหมาย จึงไม่เริ่มเพียงเพราะ event มาถึง state ต้นทาง",
      "source": {
        "file": "ISAAD-13-2026.PDF",
        "page": 18
      },
      "sourcePages": [
        18,
        21,
        22
      ]
    },
    {
      "id": "e713-m13-03",
      "module": 13,
      "topic": "Map พฤติกรรมตาม state กลับสู่ method",
      "stem": "Review พบ statechart ของ Parcel ให้ reroute(destination) เปลี่ยนปลายทางได้เฉพาะก่อน Dispatched แต่ class มี operation นี้อยู่แล้วและ method กลับเปลี่ยนปลายทางได้ทุก state ทีมยืนยันว่าจะคง statechart นี้ ข้อใดแก้ความไม่สอดคล้องที่พบได้ตรงงาน map statechart กลับสู่ class?",
      "options": [
        "เปลี่ยน reroute เป็น private operation เพื่อให้ state Dispatched ไม่สามารถมองเห็นบริการนี้จากภายนอก class ได้ตามปกติ",
        "ปรับ method ของ reroute ให้ใช้ข้อมูล state ในการตัดสินใจ เพื่อไม่เปลี่ยนปลายทางเมื่อเข้าสู่ Dispatched แล้ว",
        "เพิ่มคำอธิบายความหมาย destination ในเอกสาร operation เพื่อให้ client ส่งค่าปลายทางที่มีความหมายชัดเจน",
        "แยก statechart ออกจาก implementation specification เพื่อให้ method ใช้กฎเดียวกันได้โดยไม่ผูกกับ lifecycle"
      ],
      "correct": 1,
      "shades": [
        "ดำ",
        "ขาว",
        "เทา",
        "ดำ"
      ],
      "reasons": [
        "Visibility ควบคุมผู้เข้าถึง ไม่ใช่เงื่อนไข state การเปลี่ยนเป็น private ไม่ได้ทำให้ method ที่ถูกเรียกภายในหยุดแก้ปลายทางใน Dispatched และยังเปลี่ยนบริการของ client",
        "หน้า 25 ให้ปรับ methods ด้วย state-specific information เมื่อ operation มีแล้วแต่ behavior ผิด state จึงต้องให้ implementation ใช้เงื่อนไขตาม lifecycle ที่ตกลง",
        "การอธิบาย parameter เป็นสิ่งที่ควรทำตามหน้า 10–11 แต่ปลายทางที่มีความหมายถูกต้องก็ยังแก้ผิดช่วง lifecycle ได้ จึงไม่แก้ mismatch ที่โจทย์ระบุ",
        "สไลด์ให้ statechart เชื่อมกลับกับ operations, methods และ attributes ไม่ได้แยกออกเพื่อให้ implementation ทำพฤติกรรมที่ขัดกับ lifecycle ได้"
      ],
      "explanation": "การเพิ่ม operation จาก event เป็นเพียงส่วนหนึ่งของการ map กลับ เมื่อ operation มีแล้วต้องตรวจ method ว่าทำตามข้อจำกัดของ state จริงหรือไม่ การแก้ visibility หรือเอกสาร parameter ไม่ทดแทนกฎ state-specific behavior",
      "source": {
        "file": "ISAAD-13-2026.PDF",
        "page": 25
      },
      "sourcePages": [
        10,
        12,
        16,
        25,
        26,
        59,
        60
      ]
    },
    {
      "id": "e713-m13-04",
      "module": 13,
      "topic": "Delegation กับ structural และ parameter visibility",
      "stem": "ReportWriter ต้อง reuse ClosedFormatter ซึ่งแก้ source ไม่ได้ และมีหลาย operation ที่ไม่ควรเปิดผ่าน ReportWriter จึงเก็บ formatter เป็น field ระยะยาว ส่วน CheckPolicy รับผ่าน parameter เฉพาะ write ครั้งนั้นและไม่เก็บไว้ ตามแนวแบ่งของสไลด์ ข้อใดตรงทั้งกลไก reuse และความสัมพันธ์กับ formatter?",
      "options": [
        "ใช้ generalization จาก ClosedFormatter เพื่อ reuse implementation; เรียกความสัมพันธ์กับ formatter ว่า dependency เพราะมีการเรียก method",
        "ใช้ factoring ย้าย operation ร่วมออกจาก ClosedFormatter ไป superclass; เรียกความสัมพันธ์กับ formatter ว่า association เพราะถือ field",
        "ใช้ delegation ส่งงานไปยัง ClosedFormatter ที่ถือไว้; เรียกความสัมพันธ์กับ formatter ว่า association เพราะเป็นส่วนของโครงสร้าง",
        "ใช้ association สำหรับ field ที่อ้าง ClosedFormatter; ใช้ dependency สำหรับ CheckPolicy ที่รับเข้ามาทาง parameter"
      ],
      "correct": 2,
      "shades": [
        "ดำ",
        "ดำ",
        "ขาว",
        "เทา"
      ],
      "reasons": [
        "อยาก reuse implementation ไม่ได้พิสูจน์ is-a/substitutability และการถือ formatter เป็น field ตามโจทย์เป็น structural relationship ไม่ใช่ dependency เพียงเพราะมีการเรียก method",
        "ส่วน association สอดคล้องกับ field แต่ factoring แบบย้ายส่วนร่วมต้องแก้ class ที่ต้องการ reuse ซึ่งโจทย์ระบุว่าปรับ source ของ ClosedFormatter ไม่ได้",
        "Delegation reuse class ที่แก้ไม่ได้โดยไม่รับทุก operation มาเป็นของ ReportWriter และ field reference ที่เก็บระยะยาวตรง association เชิงโครงสร้างตามบท",
        "จำแนกความสัมพันธ์ทั้ง formatter และ policy ได้ถูกตาม field/parameter visibility แต่ยังไม่ระบุกลไก reuse ที่เหมาะกับ class ที่แก้ source ไม่ได้และไม่ควรเปิดทุก operation"
      ],
      "explanation": "การเรียก operation อย่างเดียวไม่พอบอก relationship ต้องดู visibility/lifetime ของการรู้จักกันด้วย ส่วนการ reuse class ที่แก้ไม่ได้และไม่ควรรับ interface ทั้งหมดตรงกับ delegation มากกว่าการฝืน generalization หรือ factoring",
      "source": {
        "file": "ISAAD-13-2026.PDF",
        "page": 49
      },
      "sourcePages": [
        30,
        31,
        32,
        46,
        47,
        48,
        49
      ]
    },
    {
      "id": "e713-m13-05",
      "module": 13,
      "topic": "Metamorphosis โดยคง identity และเปลี่ยนส่วน classification",
      "stem": "Courier หนึ่งคนสลับระหว่าง Salaried กับ PerDelivery ได้หลายครั้ง โดย courierId และ link ไปประวัติการส่งต้องคงเดิม รูปแบบแรกมี monthlyRate รูปแบบหลังมี perStopRate ทีมกำลังเลือกจุดวาง inheritance ตามแนว metamorphosis ของสไลด์ ข้อใดทำให้ส่วนที่เปลี่ยนรูปแยกจาก identity ที่ต้องคงอยู่ได้ตรงที่สุด?",
      "options": [
        "ให้ Courier ถือ PayClassification แล้วแยก Salaried/PerDelivery เป็นชนิดย่อยของ classification โดยสับเปลี่ยนส่วนนี้เมื่อรูปแบบค่าจ้างเปลี่ยน",
        "ให้ SalariedCourier กับ PerDeliveryCourier สืบทอด Courier เพื่อ share courierId และพฤติกรรมร่วม โดยมีข้อมูลค่าจ้างเฉพาะในแต่ละชนิดย่อย",
        "ให้ object Courier เปลี่ยน runtime subclass เป็น SalariedCourier หรือ PerDeliveryCourier ผ่านเส้น generalization โดยถือว่าความสัมพันธ์นั้นทำการสับเปลี่ยนให้",
        "ให้ PayClassification เป็น whole ของ Courier ผ่าน composition เพื่อให้เมื่อเปลี่ยน classification แล้ว identity และประวัติของ Courier เปลี่ยนตามส่วนที่ถือครอง"
      ],
      "correct": 0,
      "shades": [
        "ขาว",
        "เทา",
        "ดำ",
        "ดำ"
      ],
      "reasons": [
        "ตรงรูปหน้า 56 ที่ย้ายชนิดย่อยไปส่วน Classification แล้วให้ object หลักคง identity และ links ของตัวเอง ส่วนที่เปลี่ยนจึงสับเปลี่ยนได้โดยไม่ต้องเปลี่ยน Courier",
        "Generalization แบบนี้แชร์โครงสร้างและพฤติกรรมร่วมได้จริง และตรงแนวแรกหน้า 55 แต่ยังติดปัญหาว่าจะทำอย่างไรเมื่อ object ที่คง identity ต้องเปลี่ยนชนิด จึงด้อยกว่าการแยกส่วนที่เปลี่ยนตามโจทย์",
        "Generalization ระบุความสัมพันธ์ is-a ไม่ใช่ operation ที่เปลี่ยน runtime class ให้ object อัตโนมัติ ปัญหานี้เป็นเหตุที่สไลด์เสนออีกแนวด้วย Classification",
        "กลับทิศ whole–part และทำให้ identity ของ Courier เปลี่ยนตาม classification ซึ่งขัดข้อกำหนด สไลด์ให้ object หลักถือส่วน Classification ที่เปลี่ยนได้"
      ],
      "explanation": "Metamorphosis ในบทนี้ไม่ได้ปฏิเสธ inheritance แต่ย้าย inheritance ไปไว้ในส่วนที่มีรูปแบบเปลี่ยนได้ ตัว Courier จึงคง courierId และความสัมพันธ์เดิม ขณะที่ข้อมูลและพฤติกรรมค่าจ้างอยู่ใน classification ที่เหมาะกับช่วงนั้น",
      "source": {
        "file": "ISAAD-13-2026.PDF",
        "page": 56
      },
      "sourcePages": [
        34,
        41,
        53,
        54,
        55,
        56,
        57
      ]
    }
  ]
};
