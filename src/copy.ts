/**
 * Landing-page copy, English and Arabic.
 *
 * Every claim here is drawn from what is actually implemented — the README and
 * the code, not aspiration. If a feature is removed, the sentence goes with it.
 * A laboratory director who finds one overstatement stops believing the rest,
 * and this page is asking them to trust software with patient results.
 *
 * Voice rules:
 *
 * - Short. Two sentences a card, three at the very most. The reader is a lab
 *   owner deciding whether to take a meeting, not an engineer reading docs.
 * - Plain words. "A small agent reads your instruments" beats "ASTM/LIS2-A2
 *   driver with per-analyzer instrument-code mapping". The repository carries
 *   the second version for people who want it.
 * - Nothing about the stack. Version numbers and test counts impress engineers
 *   and worry lab owners, who read them as the developer being prouder of the
 *   code than of the laboratory.
 * - First person singular, and only where a person has to speak — the contact
 *   section and the caveat. Elsewhere the product is the subject.
 *
 * The Arabic is written, not translated word for word. The Arabic headline is
 * not a calque of the English either — "your data on your machine" is limp in
 * Arabic, and "your patients' data never leaves your lab" carries the same
 * point with the force the English has.
 */

export type Lang = 'en' | 'ar';

export interface Capability {
  title: string;
  body: string;
  /** Rendered in the mono face inside the body, e.g. a worked example. */
  mono?: string;
}

export interface ContactRow {
  label: string;
  key: 'email' | 'phone' | 'whatsapp' | 'portfolio' | 'location';
}

export const COPY = {
  en: {
    dir: 'ltr' as const,
    htmlLang: 'en',
    meta: {
      title: 'Labora — laboratory information system',
      description:
        'A complete system for one medical lab, installed on a single PC in your building. Reception, bench, Arabic and English reports, billing, insurance, and your analyzers feeding results in directly. No cloud, no monthly fee.',
    },
    langToggle: 'العربية',
    nav: {
      what: 'What it does',
      workflow: 'Workflow',
      safety: 'Quality',
      running: 'Installation',
      cta: 'Get in touch',
    },

    hero: {
      eyebrow: 'Laboratory information system',
      h1: "Your lab's data, on your lab's machine.",
      body: 'Everything one laboratory runs on — front desk, bench, reports, billing — with your analyzers feeding results in directly. It installs on a single PC in your building in an afternoon. No cloud, no monthly fee, and no company that can switch it off.',
      ctaPrimary: 'Arrange a demonstration',
      ctaSecondary: 'What it does',
      chips: [
        'Runs in your lab',
        'No subscription',
        'Windows or Linux',
        'Arabic and English reports',
      ],
    },

    mock: {
      caption: 'Result entry — illustration',
      note: '† typed over the calculated value, footnoted on the report',
      columns: { test: 'Test', result: 'Result', range: 'Reference' },
    },

    what: {
      eyebrow: '01 — What it does',
      h2: 'One system for everything the lab does.',
      items: [
        {
          title: 'Patients',
          body: 'Names in Arabic and English, phone and ID checks, and a warning when someone is already on file. Search works in either language.',
        },
        {
          title: 'History as a trend',
          body: 'Every visit in one table, a column each. A returning patient reads as a direction of travel, not three separate reports.',
          mono: 'Hb 8.9 → 10.4 → 11.9',
        },
        {
          title: 'Ordering',
          body: 'A catalogue grouped by department. Panels open into their tests, each item keeps the price it was sold at, and every order gets a barcode.',
        },
        {
          title: 'Results',
          body: 'Typed, picked from a list, or calculated. Ranges match the patient’s sex and age, out-of-range values are flagged automatically, and two technicians can never quietly overwrite each other.',
        },
        {
          title: 'Reports',
          body: 'A4 in Arabic or English, right-to-left included. A reprint months later is the same file the patient was originally handed.',
        },
        {
          title: 'Billing and the cash drawer',
          body: 'One invoice per order, payments by method, discounts for admins only. Open the drawer with a float, close it against a physical count, and print the sheet for signature.',
        },
        {
          title: 'Insurance and contracts',
          body: 'Payers with their own agreed prices and a coverage percentage; the patient pays the rest at the desk. Claims print per payer, per period.',
        },
        {
          title: 'Sending results out',
          body: 'E-mail or WhatsApp, carrying a link instead of an attachment — so it expires, can be withdrawn, and you can see it was opened. A person presses send, and only for a patient who agreed to it.',
        },
        {
          title: 'Sample labels',
          body: 'One label per tube, counted from the tests rather than typed. Sheets sized to the stock you buy, and printing can start anywhere on a part-used sheet.',
        },
        {
          title: 'Send-outs',
          body: 'Tests going to another laboratory are marked at the bench with the destination named. A manifest prints for the courier to sign, and a second screen shows what is still out.',
        },
        {
          title: 'Analyzers',
          body: 'A small agent sits on the PC beside the instrument and files results against the right order. If the network drops it holds them and sends later. It fills values; it never signs them.',
        },
        {
          title: 'Administration',
          body: 'Users and roles, your lab’s identity and report layout, a searchable log of what changed and who changed it, and a catalogue editor for ranges, options and formulas.',
        },
      ] as Capability[],
    },

    queues: {
      eyebrow: '02 — Workflow',
      h2: 'Reception and the bench need different screens.',
      body: 'They ask different questions of the same data, so there are two screens instead of one grid that suits neither.',
      orders: {
        tag: 'Orders',
        who: "reception's view",
        body: 'One row per order: how far this patient has got, and what they owe. Filter by test, referring doctor, or the day they were seen.',
      },
      worklist: {
        tag: 'Worklist',
        who: "the bench's view",
        body: 'One row per test, grouped by department, with the clock running from collection. Anything past due is flagged',
        flag: 'LATE',
      },
      pull: 'Signed results are locked. A single line can be reopened with a reason while the rest of the report stays signed — correcting one value never means re-signing everything.',
    },

    safety: {
      eyebrow: '03 — Quality and safety',
      h2: 'The evidence an accreditor asks to see.',
      body: 'ISO 15189 and the CAP checklist ask for records: that controls were run and judged, that a critical value reached a doctor, that a corrected result did not quietly replace the one you reported. Labora keeps them as the work happens, so nobody assembles them the week before an inspection.',
      quote: 'An instrument can fill a value. It can never validate one.',
      points: [
        {
          title: 'Quality control',
          body: 'Westgard rules with Levey-Jennings charts, chosen per test. A failed run holds that test’s patient results until it is repeated, or released with a written corrective action. After twenty accepted runs the lab’s own mean and SD replace the ones you started with.',
        },
        {
          title: 'Delta checks',
          body: 'Each result is compared with the patient’s own previous one. It never blocks the report — the patient may genuinely have got worse — but it asks the technician to confirm the sample. Little else catches a swapped tube in time.',
        },
        {
          title: 'Critical values',
          body: 'Every critical result waits in a queue showing how long it has been there. The call goes on the record: who was told, how, and whether they read the value back. The report will not release until it exists.',
        },
        {
          title: 'A trail that survives correction',
          body: 'Ranges, prices, control statistics and the values you telephoned are stored as they stood that day. Correcting a result later never rewrites what you reported at the time.',
        },
      ],
    },

    running: {
      eyebrow: '04 — Installation',
      h2: 'One machine in your building. Installed in an afternoon.',
      body: 'Installers for Windows and Linux set up everything, generate their own passwords, and refuse to report success until the system actually answers. Patient data stays on that machine, and nothing is billed monthly.',
      items: [
        {
          title: 'Backups you can prove',
          body: 'Encrypted every night, with a copy kept off the machine. Once a month one is restored into a spare database and counted — so you know it works before the night you need it.',
        },
        {
          title: 'A downtime pack',
          body: 'A printable file kept current while everything is healthy: open orders, spare requisition numbers, the priced catalogue, and a manual result sheet per patient with their own ranges. The lab keeps working while the system is down.',
        },
        {
          title: 'Validation documents',
          body: 'Installation, operation and performance records for your medical director to sign, written against ISO 15189 and the CAP checklist.',
        },
        {
          title: 'Yours to keep',
          body: 'Your database, on your hardware, in a standard open format, with a full export whenever you ask for one. Nothing here stops working if I do.',
        },
      ],
    },

    contact: {
      eyebrow: '05 — Get in touch',
      h2: 'See it run on your own test list.',
      body: 'The fastest way to judge this is to watch it handle work you recognise. Message me and we will arrange a demonstration and go through what installing it would involve.',
      rows: [
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'WhatsApp', key: 'whatsapp' },
        { label: 'Portfolio', key: 'portfolio' },
        { label: 'Based in', key: 'location' },
      ] as ContactRow[],
      /** Joined at runtime with Cairo's current UTC offset — Egypt observes
       *  daylight saving, so a hard-coded GMT+2 is wrong half the year. */
      city: 'Alexandria, Egypt',
      noticeTitle: 'Two things to know before you buy',
      noticeBody:
        'The catalogue arrives with about 128 tests carrying textbook reference ranges. They are a starting point, not values approved for your analyzers and your patients — your medical director reviews and signs them before a single patient result goes out, and I work through that with you as part of the installation. Second: the billing here is your lab’s own record of what was charged and collected. It is not an ETA e-invoice, so keep issuing your tax invoices the way you do today.',
    },

    footer: {
      tagline: 'Laboratory information system',
      built: 'Built for a single medical laboratory.',
    },
  },

  ar: {
    dir: 'rtl' as const,
    htmlLang: 'ar',
    meta: {
      title: 'لابورا — نظام إدارة المعامل الطبية',
      description:
        'نظام كامل لمعمل طبي واحد، يُثبَّت على جهاز داخل مبناكم. الاستقبال والفنيون والتقارير بالعربية والإنجليزية والحسابات والتأمين، وأجهزتكم تغذّيه مباشرة. بلا سحابة وبلا رسوم شهرية.',
    },
    langToggle: 'English',
    nav: {
      what: 'ماذا يفعل',
      workflow: 'سير العمل',
      safety: 'الجودة',
      running: 'التركيب',
      cta: 'تواصل معي',
    },

    hero: {
      eyebrow: 'نظام إدارة المعامل الطبية',
      h1: 'بيانات مرضاكم لا تخرج من معملكم.',
      body: 'كل ما يقوم عليه المعمل — الاستقبال والمعمل والتقارير والحسابات — وأجهزتكم تغذّيه بالنتائج مباشرة. يُثبَّت على جهاز واحد داخل مبناكم في بضع ساعات: بلا سحابة، وبلا رسوم شهرية، وبلا شركة تستطيع إيقافه.',
      ctaPrimary: 'اطلب عرضًا عمليًا',
      ctaSecondary: 'ماذا يفعل النظام',
      chips: ['يعمل داخل معملكم', 'بلا رسوم شهرية', 'ويندوز أو لينكس', 'تقارير بالعربية والإنجليزية'],
    },

    mock: {
      caption: 'إدخال النتائج — للتوضيح',
      note: '† قيمة مُدخلة يدويًا بدل المحسوبة، ومُوضَّحة في هامش التقرير',
      columns: { test: 'التحليل', result: 'النتيجة', range: 'المعدل المرجعي' },
    },

    what: {
      eyebrow: '٠١ — ماذا يفعل',
      h2: 'نظام واحد لكل ما يجري في المعمل.',
      items: [
        {
          title: 'المرضى',
          body: 'أسماء بالعربية والإنجليزية، وتحقق من الهاتف والرقم القومي، وتنبيه إذا كان المريض مسجَّلًا من قبل. والبحث يعمل بأي من اللغتين.',
        },
        {
          title: 'التاريخ كاتجاه',
          body: 'كل الزيارات في جدول واحد، عمود لكل زيارة. فالمريض المتكرر يُقرأ كاتجاه واضح لا كثلاثة تقارير منفصلة.',
          mono: 'Hb 8.9 → 10.4 → 11.9',
        },
        {
          title: 'طلب التحاليل',
          body: 'دليل مرتب حسب الأقسام. البروفايلات تتفكك إلى مكوناتها، وكل بند يحفظ السعر الذي بِيع به، ولكل طلب باركود.',
        },
        {
          title: 'النتائج',
          body: 'مكتوبة أو من قائمة أو محسوبة بمعادلة. المعدلات المرجعية تُختار حسب نوع المريض وعمره، والقيم الخارجة عنها تُعلَّم تلقائيًا، ولا يستطيع فنيّان الكتابة فوق بعضهما دون أن يُنبَّها.',
        },
        {
          title: 'التقارير',
          body: 'مقاس A4 بالعربية أو الإنجليزية بدعم كامل للكتابة من اليمين. وإعادة الطباعة بعد شهور تُخرج الملف نفسه الذي استلمه المريض.',
        },
        {
          title: 'الحسابات والخزنة',
          body: 'فاتورة لكل طلب، ومدفوعات بطرق متعددة، وخصومات للمدير وحده. تُفتح الخزنة برصيد بداية وتُقفل مقابل جرد فعلي، ويُطبع كشف للتوقيع.',
        },
        {
          title: 'التأمين والتعاقدات',
          body: 'جهات لكل منها أسعارها المتفق عليها ونسبة تغطيتها، والمريض يسدد الباقي عند المكتب. وتُطبع المطالبات لكل جهة عن كل فترة.',
        },
        {
          title: 'إرسال النتائج للمريض',
          body: 'بالبريد أو واتساب، برابط لا بمرفق — فينتهي بموعد، ويمكن سحبه، وتعرفون أنه فُتح. الإرسال بضغطة من موظف، ولمريض وافق على ذلك.',
        },
        {
          title: 'ملصقات العينات',
          body: 'ملصق لكل أنبوبة، يُحسب عددها من التحاليل لا يُكتب يدويًا. أوراق بمقاسات الملصقات التي تشترونها، والطباعة تبدأ من أي موضع في الورقة المستعملة جزئيًا.',
        },
        {
          title: 'الإرسال الخارجي',
          body: 'التحاليل التي تُجرى في معمل آخر تظهر معلَّمة أمام الفني مع اسم الجهة. ويُطبع كشف تسليم يوقّعه المندوب، وشاشة أخرى توضح ما لم يعد بعد.',
        },
        {
          title: 'ربط الأجهزة',
          body: 'وسيط صغير يعمل على الجهاز المتصل بالتحليلة ويُسجّل النتائج على الطلب الصحيح. وإذا انقطعت الشبكة يحتفظ بها ويرسلها لاحقًا. يملأ القيم ولا يعتمدها.',
        },
        {
          title: 'الإدارة',
          body: 'المستخدمون والصلاحيات، وهوية المعمل وشكل التقرير، وسجل قابل للبحث يوضح ما تغيَّر ومن غيَّره، ومحرر للدليل للمعدلات والخيارات والمعادلات.',
        },
      ] as Capability[],
    },

    queues: {
      eyebrow: '٠٢ — سير العمل',
      h2: 'الاستقبال والفني يحتاجان شاشتين مختلفتين.',
      body: 'كلٌّ منهما يسأل سؤالًا مختلفًا عن نفس البيانات، فصارتا شاشتين بدل شاشة واحدة لا تخدم أيًّا منهما.',
      orders: {
        tag: 'الطلبات',
        who: 'شاشة الاستقبال',
        body: 'صف لكل طلب: إلى أين وصل هذا المريض وكم عليه. مع تصفية حسب التحليل أو الطبيب المحوِّل أو يوم الزيارة.',
      },
      worklist: {
        tag: 'قائمة العمل',
        who: 'شاشة الفني',
        body: 'صف لكل تحليل على حدة، مرتبًا حسب القسم، مع تشغيل المؤقت من لحظة السحب. وكل ما تجاوز موعده يُعلَّم بعلامة',
        flag: 'متأخر',
      },
      pull: 'النتائج المعتمدة مقفلة. ويمكن إعادة فتح بند واحد بذكر السبب مع بقاء بقية التقرير معتمدة — فتصحيح قيمة لا يعني إعادة اعتماد كل شيء.',
    },

    safety: {
      eyebrow: '٠٣ — الجودة والأمان',
      h2: 'الأدلة التي تطلبها جهة الاعتماد.',
      body: 'يطلب معيار ISO 15189 وقائمة CAP سجلات: أن الكنترول شُغِّل وحُكِم عليه، وأن القيمة الحرجة وصلت إلى طبيب، وأن النتيجة المصححة لم تحلّ بهدوء محل ما أُبلغ به. ولابورا يحفظها أثناء العمل، فلا يجمعها أحد في الأسبوع السابق للتفتيش.',
      quote: 'الجهاز يملأ القيمة. ولا يعتمدها أبدًا.',
      points: [
        {
          title: 'ضبط الجودة',
          body: 'قواعد ويستجارد مع رسوم ليفي-جينينجز، تُختار لكل تحليل. والتشغيلة المرفوضة تحجز نتائج المرضى لذلك التحليل حتى تُعاد أو تُفرج بإجراء تصحيحي مكتوب. وبعد عشرين تشغيلة مقبولة تحلّ إحصاءات معملكم محل الإحصاءات التي بدأتم بها.',
        },
        {
          title: 'فحص الفروق',
          body: 'كل نتيجة تُقارن بنتيجة المريض السابقة. ولا يمنع ذلك إصدار التقرير — فقد تكون حالته تدهورت فعلًا — لكنه يطلب من الفني التأكد من العينة. وقليل غيره يكشف تبديل عينة في وقته.',
        },
        {
          title: 'القيم الحرجة',
          body: 'كل نتيجة حرجة تنتظر في قائمة توضح مدة انتظارها. وتُسجَّل المكالمة: من أُبلغ، وبأي وسيلة، وهل أعاد قراءة القيمة. ولا يصدر التقرير قبل تسجيلها.',
        },
        {
          title: 'سجل يصمد أمام التصحيح',
          body: 'المعدلات والأسعار وإحصاءات الضبط والقيم التي أُبلغت هاتفيًا تُحفظ بحالتها يومها. فتصحيح نتيجة لاحقًا لا يعيد كتابة ما صدر وقتها.',
        },
      ],
    },

    running: {
      eyebrow: '٠٤ — التركيب',
      h2: 'جهاز واحد داخل مبناكم. يُركَّب في بضع ساعات.',
      body: 'برامج تثبيت للويندوز واللينكس تُعدّ كل شيء، وتولّد كلمات السر الخاصة بكم، ولا تعلن نجاحها قبل أن يستجيب النظام فعلًا. بيانات المرضى تبقى على ذلك الجهاز، ولا شيء يُحصَّل شهريًا.',
      items: [
        {
          title: 'نسخ احتياطي يمكن إثباته',
          body: 'نسخ مشفَّرة كل ليلة، ونسخة محفوظة خارج الجهاز. وشهريًا تُستعاد إحداها في قاعدة بيانات مؤقتة ويُحصر محتواها — فتعرفون أنها تعمل قبل الليلة التي تحتاجونها فيها.',
        },
        {
          title: 'حزمة التوقف',
          body: 'ملف قابل للطباعة يُحدَّث والنظام سليم: الطلبات المفتوحة، وأرقام احتياطية للطلبات، والدليل بالأسعار، وورقة نتائج يدوية لكل مريض بمعدلاته هو. فيستمر المعمل في العمل بينما النظام متوقف.',
        },
        {
          title: 'وثائق الاعتماد',
          body: 'سجلات التركيب والتشغيل والأداء ليوقّعها مدير المعمل، مكتوبة وفق ISO 15189 وقائمة CAP.',
        },
        {
          title: 'ملككم تحفظونه',
          body: 'قاعدة بياناتكم على أجهزتكم بصيغة مفتوحة معيارية، وتصدير كامل وقت ما تطلبون. ولا شيء هنا يتوقف إن توقفتُ أنا.',
        },
      ],
    },

    contact: {
      eyebrow: '٠٥ — تواصل معي',
      h2: 'شاهده يعمل على قائمة تحاليلكم أنتم.',
      body: 'أسرع طريقة للحكم على النظام أن تروه يتعامل مع عمل تعرفونه. راسلوني لنرتّب عرضًا عمليًا ونستعرض ما يتطلبه التركيب.',
      rows: [
        { label: 'البريد', key: 'email' },
        { label: 'الهاتف', key: 'phone' },
        { label: 'واتساب', key: 'whatsapp' },
        { label: 'أعمالي', key: 'portfolio' },
        { label: 'المقر', key: 'location' },
      ] as ContactRow[],
      city: 'الإسكندرية، مصر',
      noticeTitle: 'أمران ينبغي معرفتهما قبل الشراء',
      noticeBody:
        'يأتي الدليل بنحو ١٢٨ تحليلًا بمعدلات مرجعية من الكتب. وهي نقطة بداية لا قيمًا معتمدة لأجهزتكم ومرضاكم — على مدير المعمل مراجعتها واعتمادها قبل صدور أي نتيجة، وأنفّذ ذلك معكم ضمن التركيب. والأمر الثاني: الحسابات هنا سجلّ المعمل الداخلي لما حُصِّل، وليست فاتورة إلكترونية لمصلحة الضرائب، فاستمروا في إصدار فواتيركم الضريبية كما تفعلون اليوم.',
    },

    footer: {
      tagline: 'نظام إدارة المعامل الطبية',
      built: 'مصمَّم لمعمل طبي واحد.',
    },
  },
} as const;

/**
 * The hero table is a static illustration, never live data and never a real
 * patient. Values are chosen to show the three things the grid actually does:
 * a flag, a delta warning, and a calculated value typed over.
 */
export const MOCK_ROWS = [
  { test: 'Haemoglobin', testAr: 'الهيموجلوبين', value: '10.4', unit: 'g/dL', range: '13.5 – 17.5', flag: 'LOW' },
  { test: 'Potassium', testAr: 'البوتاسيوم', value: '6.4', unit: 'mmol/L', range: '3.5 – 5.1', flag: 'HIGH' },
  { test: 'Creatinine', testAr: 'الكرياتينين', value: '1.10', unit: 'mg/dL', range: '0.70 – 1.30', flag: null },
  { test: 'LDL (calculated)', testAr: 'الكوليسترول منخفض الكثافة', value: '128 †', unit: 'mg/dL', range: '< 130', flag: null },
] as const;
