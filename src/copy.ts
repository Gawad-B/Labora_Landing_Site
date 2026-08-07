/**
 * Landing-page copy, English and Arabic.
 *
 * Every claim here is drawn from what is actually implemented — the README and
 * the code, not aspiration. If a feature is removed, the sentence goes with it.
 * A laboratory director who finds one overstatement stops believing the rest,
 * and this page is asking them to trust software with patient results.
 *
 * Voice rules, learned from an earlier draft that read like a manifesto:
 *
 * - Short sentences. The reader has not agreed to an argument yet, so state
 *   what the software does and let them draw the conclusion.
 * - No aphorisms. "An untested backup is a rumour" is a good line in a README,
 *   where the reader has already opted in. On a landing page it sounds like
 *   someone winning a debate with an imaginary opponent.
 * - First person singular, and only where a person has to speak — the contact
 *   section and the caveat. Elsewhere the product is the subject. "We" would be
 *   a fiction sitting two rows above a link to my own portfolio.
 * - Nothing about the stack. Version numbers and test counts impress engineers
 *   and worry lab owners, who read them as the developer being prouder of the
 *   code than of the laboratory. The repository carries them instead.
 * - Banned, because the earlier draft leaned on them until they became a tic:
 *   "deliberately", "rather than", "built in rather than bolted on",
 *   "end to end". "From the front desk to the signed report" survives once, in
 *   the hero, where it is doing real work as a statement of scope.
 *
 * The Arabic is written, not translated word for word: "delta check" and
 * "Westgard" stay in their recognised forms because that is what a lab
 * scientist in Cairo actually calls them. The Arabic headline is not a calque
 * of the English either — "your data on your machine" is limp in Arabic, and
 * "your patients' data never leaves your lab" carries the same point with the
 * force the English has.
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
        'A complete laboratory information system for a single medical lab, installed on one machine in your building. Arabic and English reports, Westgard quality control, critical-value callback records, and backups tested every month. No cloud, no subscription.',
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
      body: 'A complete system for one medical laboratory — from the front desk to the signed report, with your analyzers feeding it directly. It installs on a single PC in your building. No cloud, no monthly fee, and no company that can switch it off.',
      ctaPrimary: 'Arrange a demonstration',
      ctaSecondary: 'What it does',
      chips: [
        'Runs in your lab',
        'No subscription',
        'ASTM / LIS2-A2',
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
          body: 'Names in Arabic and English, phone and national-ID checks, birth date or an approximate age, and a warning when someone looks like a patient already on file. Search works in either script.',
        },
        {
          title: 'History as a trend',
          body: 'Every visit in one table, a column each. A returning patient reads as a direction of travel instead of three separate reports.',
          mono: 'Hb 8.9 → 10.4 → 11.9',
        },
        {
          title: 'Ordering',
          body: 'A catalogue grouped by department. Panels open into their member tests, each item keeps the price it was sold at, and every order carries a sample barcode.',
        },
        {
          title: 'Results',
          body: 'Numeric, text, pick-list, calculated and panel. Reference ranges are chosen by sex and age in days, flags are computed on the server, and no edit erases the value before it.',
        },
        {
          title: 'Reports',
          body: 'A4 in Arabic or English from one template, with full right-to-left. Reprint months later and you get the original file back, matching what the patient was handed.',
        },
        {
          title: 'Billing',
          body: 'One invoice per order, payments by method, discounts limited to admins, collection by day, month or year, and a daily cash count.',
        },
        {
          title: 'Send-outs',
          body: 'Tests going to another laboratory are marked on the bench with the destination named, and a manifest prints for the courier to sign.',
        },
        {
          title: 'Analyzers',
          body: 'An agent reads your instruments over serial using ASTM / LIS2-A2 and maps each one’s test codes to yours. Barcodes it cannot match are kept for someone to reconcile.',
        },
        {
          title: 'Administration',
          body: 'Users and roles, lab identity and report layout, a searchable audit log showing what changed field by field, and a catalogue editor that checks formulas as you type.',
        },
      ] as Capability[],
    },

    queues: {
      eyebrow: '02 — Workflow',
      h2: 'Reception and the bench need different screens.',
      body: 'They ask different questions of the same data. A single shared grid answers neither one well, so there are two.',
      orders: {
        tag: 'Orders',
        who: "reception's view",
        body: 'One row per order: how far this patient has got, and what they owe. Filter by sex, test, referring doctor, or the day they were seen.',
      },
      worklist: {
        tag: 'Worklist',
        who: "the bench's view",
        body: 'One row per test, grouped by department, with the turnaround clock running from collection. Anything past due is flagged',
        flag: 'LATE',
      },
      pull: 'Validated results are locked. A single row can be reopened with a reason while the rest of the report stays signed, so fixing one value never means re-signing the report.',
    },

    safety: {
      eyebrow: '03 — Quality and safety',
      h2: 'The evidence an accreditor asks to see.',
      body: 'ISO 15189 and the CAP checklist ask for records: that controls were run and judged, that a critical value reached a clinician, that a corrected result did not quietly replace the one you reported. Labora produces them while the work happens, so nobody has to assemble them the week before an inspection.',
      quote: 'An instrument can fill a value. It can never validate one.',
      points: [
        {
          title: 'Quality control',
          body: 'Westgard multi-rule — 1-2s, 1-3s, 2-2s, R-4s, 4-1s, 10x — with Levey-Jennings charts and the rule set chosen per test. A rejected run holds patient results for that test until it is repeated, or released with a corrective action on record. 1-2s warns instead of rejecting: a lab stopped every week by chance variation soon learns to click through warnings.',
        },
        {
          title: 'Delta checks',
          body: "Each result is compared with the patient's own previous validated one. It never blocks the report — the patient may genuinely have got worse — but it asks the technician to confirm the sample and record why the change was accepted. Little else catches a swapped tube before it is reported.",
        },
        {
          title: 'Critical values',
          body: 'Flagging the value is the easy half. Every critical result waits in a queue showing how long it has been there, and the call goes on the record: who was told, how, and whether they read the value back. By default the report cannot be released until that call exists.',
        },
        {
          title: 'A trail that survives correction',
          body: 'Reference ranges, prices, QC statistics and the values you telephoned are stored as they stood at the time. Correcting a result later never rewrites what was reported that day, and every clinical and financial change keeps its before and after.',
        },
      ],
    },

    running: {
      eyebrow: '04 — Installation',
      h2: 'One machine in your building. No subscription.',
      body: 'Labora installs on a single PC in the laboratory. Patient data stays on it, nothing is billed monthly, and the operational parts a regulator asks about are working software with records to show.',
      items: [
        {
          title: 'Backups you can prove',
          body: 'Encrypted archives every night, with a copy kept off the machine. Once a month one of them is loaded into a scratch database and counted, so you know an archive restores before the night you need it to.',
        },
        {
          title: 'A downtime pack',
          body: 'A printable file, rebuilt on a timer while everything is healthy: open orders, reserved requisition numbers, the priced catalogue, and a manual result sheet per patient carrying their own reference ranges. The lab keeps working while the system is down.',
        },
        {
          title: 'Validation documents',
          body: 'Installation, operational and performance qualification, plus change control — the records your medical director signs, written against ISO 15189 and the CAP checklist.',
        },
        {
          title: 'Yours to keep',
          body: 'The database sits on your hardware in a standard, open format. TLS across the local network, and a full export of everything whenever you ask for one. Nothing here stops working if I do.',
        },
      ],
    },

    contact: {
      eyebrow: '05 — Get in touch',
      h2: 'See it run on your own test list.',
      body: 'The fastest way to judge this is to watch it handle work you recognise. Message me and we will arrange a demonstration, go through what your laboratory needs, and what installing it would involve.',
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
      noticeTitle: 'Not yet fit for clinical use — what that means',
      noticeBody:
        'The catalogue ships with about 128 tests carrying conventional textbook reference ranges. They are a starting point, not values validated for your analyzers, your methods and your patients: your medical director reviews and approves each one before a patient result goes out. That review, and the qualification records that go with it, are the first part of an installation — I work through them with you.',
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
        'نظام كامل لإدارة معمل طبي واحد، يُثبَّت على جهاز داخل مبناكم. تقارير بالعربية والإنجليزية، وضبط جودة بقواعد ويستجارد، وتسجيل الإبلاغ عن القيم الحرجة، ونسخ احتياطي يُختبَر شهريًا. بلا سحابة وبلا رسوم شهرية.',
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
      body: 'نظام كامل لمعمل طبي واحد — من الاستقبال حتى التقرير الموقَّع، وأجهزتكم تغذّيه مباشرة. يُثبَّت على جهاز واحد داخل مبناكم: بلا سحابة، وبلا رسوم شهرية، وبلا شركة تستطيع إيقافه.',
      ctaPrimary: 'اطلب عرضًا عمليًا',
      ctaSecondary: 'ماذا يفعل النظام',
      chips: ['يعمل داخل معملكم', 'بلا رسوم شهرية', 'ASTM / LIS2-A2', 'تقارير بالعربية والإنجليزية'],
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
          body: 'أسماء بالعربية والإنجليزية، وتحقق من رقم الهاتف والرقم القومي، وتاريخ ميلاد أو عمر تقريبي، وتنبيه إذا شابه المريض مريضًا مسجَّلًا. والبحث يعمل بأي من اللغتين.',
        },
        {
          title: 'التاريخ كاتجاه',
          body: 'كل الزيارات في جدول واحد، عمود لكل زيارة. فالمريض المتكرر يُقرأ كاتجاه واضح لا كثلاثة تقارير منفصلة.',
          mono: 'Hb 8.9 → 10.4 → 11.9',
        },
        {
          title: 'طلب التحاليل',
          body: 'دليل مرتب حسب الأقسام. البروفايلات تتفكك إلى مكوناتها، وكل بند يحفظ السعر الذي بِيع به، ولكل طلب باركود عينة.',
        },
        {
          title: 'النتائج',
          body: 'رقمية ونصية وقوائم اختيار ومعادلات وبروفايلات. المعدلات المرجعية تُختار حسب النوع والعمر بالأيام، والعلامات تُحسب على الخادم، ولا يمحو أي تعديل القيمة التي قبله.',
        },
        {
          title: 'التقارير',
          body: 'مقاس A4 بالعربية أو الإنجليزية من قالب واحد، مع دعم كامل للكتابة من اليمين. وإعادة الطباعة بعد شهور تُخرج الملف الأصلي نفسه، مطابقًا لما استلمه المريض.',
        },
        {
          title: 'الحسابات',
          body: 'فاتورة لكل طلب، ومدفوعات بطرق متعددة، وخصومات للمدير وحده، وتحصيل باليوم أو الشهر أو السنة، ومطابقة نقدية يومية.',
        },
        {
          title: 'الإرسال الخارجي',
          body: 'التحاليل التي تُجرى في معمل آخر تظهر معلَّمة أمام الفني مع اسم الجهة، ويُطبع كشف تسليم يوقّعه المندوب.',
        },
        {
          title: 'ربط الأجهزة',
          body: 'وسيط يقرأ أجهزتكم من المنفذ التسلسلي بمعيار ASTM / LIS2-A2، ويربط أكواد كل جهاز بأكوادكم. والباركودات غير المطابقة تُحفظ للمراجعة لا تُهمل.',
        },
        {
          title: 'الإدارة',
          body: 'المستخدمون والصلاحيات، وهوية المعمل وشكل التقرير، وسجل تدقيق قابل للبحث يوضح ما تغيَّر بندًا بندًا، ومحرر للدليل يتحقق من المعادلات فور كتابتها.',
        },
      ] as Capability[],
    },

    queues: {
      eyebrow: '٠٢ — سير العمل',
      h2: 'الاستقبال والفني يحتاجان شاشتين مختلفتين.',
      body: 'كلٌّ منهما يسأل سؤالًا مختلفًا عن نفس البيانات. والشاشة الواحدة المشتركة لا تخدم أيًّا منهما جيدًا، فصارتا اثنتين.',
      orders: {
        tag: 'الطلبات',
        who: 'شاشة الاستقبال',
        body: 'صف لكل طلب: إلى أين وصل هذا المريض وكم عليه. مع تصفية حسب النوع أو التحليل أو الطبيب المحوِّل أو يوم الزيارة.',
      },
      worklist: {
        tag: 'قائمة العمل',
        who: 'شاشة الفني',
        body: 'صف لكل تحليل على حدة، مرتبًا حسب القسم، مع تشغيل مؤقت المدة من لحظة السحب. وكل ما تجاوزها يُعلَّم بعلامة',
        flag: 'متأخر',
      },
      pull: 'النتائج المعتمدة مقفلة. ويمكن إعادة فتح بند واحد بذكر السبب مع بقاء بقية التقرير معتمدة، فتصحيح قيمة واحدة لا يعني إعادة اعتماد التقرير كله.',
    },

    safety: {
      eyebrow: '٠٣ — الجودة والأمان',
      h2: 'الأدلة التي تطلبها جهة الاعتماد.',
      body: 'يطلب معيار ISO 15189 وقائمة CAP سجلات: أن الكنترول شُغِّل وحُكِم عليه، وأن القيمة الحرجة وصلت إلى طبيب، وأن النتيجة المصححة لم تحلّ بهدوء محل ما أُبلغ به فعلًا. ولابورا يُنتج هذه السجلات أثناء العمل، فلا يجمعها أحد في الأسبوع السابق للتفتيش.',
      quote: 'الجهاز يملأ القيمة. ولا يعتمدها أبدًا.',
      points: [
        {
          title: 'ضبط الجودة',
          body: 'قواعد ويستجارد المتعددة — ‎1-2s‎ و‎1-3s‎ و‎2-2s‎ و‎R-4s‎ و‎4-1s‎ و‎10x‎ — مع رسوم ليفي-جينينجز واختيار القواعد لكل تحليل. والتشغيلة المرفوضة تحجز نتائج المرضى لذلك التحليل حتى تُعاد، أو تُفرج بإجراء تصحيحي مسجَّل. أما ‎1-2s‎ فينبّه ولا يرفض: المعمل الذي يتوقف كل أسبوع لتغيّر عشوائي يتعلم موظفوه تجاهل التنبيهات.',
        },
        {
          title: 'فحص الفروق',
          body: 'كل نتيجة تُقارن بنتيجة المريض السابقة المعتمدة. ولا يمنع ذلك إصدار التقرير — فقد تكون حالة المريض تدهورت فعلًا — لكنه يطلب من الفني التأكد من العينة وتسجيل سبب قبول الفارق. وقليل غيره يكشف تبديل عينة قبل صدور التقرير.',
        },
        {
          title: 'القيم الحرجة',
          body: 'حساب العلامة هو النصف السهل. كل نتيجة حرجة تنتظر في قائمة توضح مدة انتظارها، وتُسجَّل المكالمة عليها: من أُبلغ، وبأي وسيلة، وهل أعاد قراءة القيمة. وافتراضيًا لا يُصدر التقرير قبل تسجيل تلك المكالمة.',
        },
        {
          title: 'سجل يصمد أمام التصحيح',
          body: 'المعدلات المرجعية والأسعار وإحصاءات الضبط والقيم التي أُبلغت هاتفيًا تُحفظ بحالتها وقت تطبيقها. فتصحيح نتيجة لاحقًا لا يعيد كتابة ما صدر يومها، وكل تغيير إكلينيكي أو مالي يحفظ ما كان وما صار.',
        },
      ],
    },

    running: {
      eyebrow: '٠٤ — التركيب',
      h2: 'جهاز واحد داخل مبناكم. بلا اشتراك.',
      body: 'يُثبَّت لابورا على جهاز واحد داخل المعمل. بيانات المرضى تبقى عليه، ولا شيء يُحصَّل شهريًا، والجوانب التشغيلية التي تسأل عنها الجهات الرقابية برنامج يعمل وسجلات تُعرض.',
      items: [
        {
          title: 'نسخ احتياطي يمكن إثباته',
          body: 'نسخ مشفَّرة كل ليلة، ونسخة محفوظة خارج الجهاز. وشهريًا تُحمَّل إحداها في قاعدة بيانات مؤقتة ويُحصر محتواها، فتعرفون أن النسخة تُستعاد قبل الليلة التي تحتاجونها فيها.',
        },
        {
          title: 'حزمة التوقف',
          body: 'ملف قابل للطباعة يُحدَّث دوريًا والنظام سليم: الطلبات المفتوحة، وأرقام محجوزة للطلبات الورقية، والدليل بالأسعار، وورقة نتائج يدوية لكل مريض تحمل معدلاته المرجعية. فيستمر المعمل في العمل بينما النظام متوقف.',
        },
        {
          title: 'وثائق الاعتماد',
          body: 'توثيق التركيب والتشغيل والأداء، وضبط التغيير — السجلات التي يوقّعها مدير المعمل، مكتوبة وفق ISO 15189 وقائمة CAP.',
        },
        {
          title: 'ملككم تحفظونه',
          body: 'قاعدة البيانات على أجهزتكم بصيغة مفتوحة معيارية، وتشفير للاتصال داخل الشبكة، وتصدير كامل لكل شيء وقت ما تطلبون. ولا شيء هنا يتوقف إن توقفتُ أنا.',
        },
      ],
    },

    contact: {
      eyebrow: '٠٥ — تواصل معي',
      h2: 'شاهده يعمل على قائمة تحاليلكم أنتم.',
      body: 'أسرع طريقة للحكم على النظام أن تروه يتعامل مع عمل تعرفونه. راسلوني لنرتّب عرضًا عمليًا، ونستعرض ما يحتاجه معملكم وما يتطلبه التركيب.',
      rows: [
        { label: 'البريد', key: 'email' },
        { label: 'الهاتف', key: 'phone' },
        { label: 'واتساب', key: 'whatsapp' },
        { label: 'أعمالي', key: 'portfolio' },
        { label: 'المقر', key: 'location' },
      ] as ContactRow[],
      city: 'الإسكندرية، مصر',
      noticeTitle: 'غير جاهز بعد للاستخدام الإكلينيكي — وماذا يعني ذلك',
      noticeBody:
        'يأتي الدليل بنحو ١٢٨ تحليلًا بمعدلات مرجعية تقليدية من الكتب. وهي نقطة بداية لا قيمًا معتمدة لأجهزتكم وطرقكم ومجتمع مرضاكم: على مدير المعمل مراجعة كل معدل واعتماده قبل إصدار أي نتيجة لمريض. وهذه المراجعة، ووثائق الاعتماد المصاحبة لها، هي أول خطوة في التركيب — أنفّذها معكم.',
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
