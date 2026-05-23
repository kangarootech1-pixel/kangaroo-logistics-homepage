export type Lang = "ar" | "en";

export const translations = {
  ar: {
    dir: "rtl" as "rtl" | "ltr",
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      about: "من نحن",
      coverage: "التغطية",
      contact: "تواصل",
      cta: "تواصل معنا",
    },
    hero: {
      eyebrow: "كنغارو • Kangaroo",
      title: "الشريك اللوجستي الأول في فلسطين والأردن",
      subtitle: "توصيل، تخزين، وشحن دولي بكفاءة عالية",
      tagline: "حلول لوجستية مخصصة وذكية",
      ctaPrimary: "تواصل معنا",
      ctaSecondary: "اكتشف خدماتنا",
      ctaTrack: "تتبع شحنتك",
      stats: [
        { value: "+15", label: "مدينة مغطاة" },
        { value: "24/7", label: "دعم متواصل" },
        { value: "98%", label: "نسبة التوصيل في الوقت" },
      ],
    },
    services: {
      eyebrow: "خدماتنا",
      title: "حلول لوجستية متكاملة لنمو أعمالك",
      subtitle: "من الميل الأول إلى الميل الأخير، نحن نتولى كل التفاصيل لتركز أنت على عملائك.",
      items: [
        {
          title: "التوصيل المحلي",
          desc: "تقدم Kangaroo خدمات توصيل محلي متكاملة مصممة لتلبية احتياجات الأفراد والشركات والمتاجر الإلكترونية، عبر شبكة تشغيل احترافية تغطي مختلف المدن والمناطق في فلسطين والأردن بكفاءة وسرعة عالية، مع خدمات تحصيل نقدي وإدارة مرتجعات وتتبع لحظي.",
          stats: ["تحصيل نقدي", "إدارة مرتجعات", "تتبع لحظي"],
          fullDesc:
            "تقدم Kangaroo خدمات توصيل محلي متكاملة مصممة لتلبية احتياجات الأفراد، الشركات، والمتاجر الإلكترونية، من خلال شبكة تشغيل احترافية تغطي مختلف المدن والمناطق في فلسطين والأردن. تعتمد الشركة على بنية لوجستية متطورة وفرق ميدانية مدربة وأنظمة تشغيل ذكية تضمن تنفيذ عمليات الاستلام والتسليم بأعلى درجات الدقة والموثوقية. توفر كنغارو حلول توصيل مرنة تناسب طبيعة أعمال العملاء، مع إمكانية جدولة عمليات الاستلام والتسليم بما يتوافق مع احتياجات النشاط التجاري. تشمل الخدمات التحصيل النقدي، إدارة المرتجعات، تأكيد الطلبات، وأنظمة تتبع مباشرة تتيح متابعة حالة الشحنة لحظة بلحظة.",
          highlights: [
            "توصيل خلال 24 ساعة",
            "تحصيل نقدي COD",
            "إدارة المرتجعات",
            "تتبع لحظي",
          ],
        },
        {
          title: "خدمات الإنجاز المضاف وحلول التخزين",
          desc: "تُعدّ Kangaroo أول وأبرز شركة متخصصة في Fulfillment وحلول التخزين المتكاملة في فلسطين، وتقدم منظومة تشغيل لوجستية متطورة تشمل إدارة المخزون وتجهيز الطلبات والتغليف والشحن، مع حلول قابلة للتوسع لمختلف أحجام الأعمال.",
          stats: ["إدارة المخزون", "تجهيز الطلبات", "تغليف وشحن"],
          fullDesc:
            "تُعدّ Kangaroo أول وأبرز شركة متخصصة في Fulfillment وحلول التخزين المتكاملة في فلسطين. توفر الشركة مساحات تخزين منظمة وآمنة مجهزة وفق معايير تشغيل حديثة، مع أنظمة ذكية لإدارة المخزون والطلبات تتيح التتبع المباشر وتوفير تقارير تشغيلية دقيقة. تشمل الخدمات جميع مراحل إدارة الطلبات: استلام البضائع وفحصها، التخزين، إدارة المخزون، تجهيز الطلبات، التغليف، الطباعة، وإعداد الشحنات للتسليم النهائي. كما تقدم الشركة خدمات داعمة تشمل إعادة التغليف، فرز المنتجات، إعداد العروض الترويجية، إدارة المرتجعات، ومراقبة الجودة.",
          highlights: [
            "أول شركة Fulfillment في فلسطين",
            "تخزين منظم وآمن",
            "إدارة ذكية للمخزون",
            "تغليف وتجهيز احترافي",
          ],
        },
        {
          title: "نقل الأردن - فلسطين",
          desc: "تقدم Kangaroo حلول نقل متخصصة بين الأردن وفلسطين تضمن الكفاءة والسرعة والموثوقية في عمليات النقل العابرة للحدود، مع أنظمة تتبع حديثة وإجراءات تشغيل احترافية تخدم الشركات والمتاجر والأفراد.",
          stats: ["نقل عابر للحدود", "تتبع لحظي", "إدارة احترافية"],
          fullDesc:
            "تقدم Kangaroo حلول نقل متخصصة بين الأردن وفلسطين تُدار وفق منظومة تشغيل لوجستية متكاملة تضمن الكفاءة والسرعة والموثوقية في عمليات النقل العابرة للحدود. توفر كنغارو خدمات نقل مرنة تشمل نقل الطرود، الشحنات التجارية، البضائع، والطلبات الخاصة للأفراد والشركات. تعتمد الشركة على أنظمة تتبع ومراقبة حديثة توفر للعملاء تحديثات مستمرة حول حالة الشحنات، مما يعزز الشفافية ويمنح العملاء رؤية واضحة لكامل العملية التشغيلية. تخدم هذه الحلول المتاجر الإلكترونية، الشركات التجارية، شركات الاستيراد والتوزيع، والمؤسسات.",
          highlights: [
            "نقل يومي منتظم",
            "تتبع مستمر للشحنات",
            "خدمة الأفراد والشركات",
            "إجراءات تشغيل احترافية",
          ],
        },
        {
          title: "الشحن والتخليص الجمركي",
          desc: "تقدم Kangaroo خدمات شحن وتخليص جمركي متكاملة تشمل الشحن الجوي والبحري والبري، مع إدارة كاملة لإجراءات الاستيراد والتخليص الجمركي والتسليم النهائي، لتبسيط عمليات الاستيراد للشركات والتجار من مختلف دول العالم.",
          stats: ["جوي · بحري · بري", "تخليص جمركي", "تسليم نهائي"],
          fullDesc:
            "تقدم Kangaroo خدمات شحن وتخليص جمركي متكاملة تشمل الشحن الجوي والبحري والبري، مع إدارة كاملة لجميع مراحل العملية اللوجستية بدءاً من استلام الشحنة من بلد المنشأ وصولاً إلى التخليص الجمركي والتسليم النهائي. تتميز كنغارو بخبرتها في إدارة إجراءات التخليص الجمركي ومتابعة المستندات والتنسيق مع الجهات ذات العلاقة. تخدم هذه الحلول شركات التجارة الإلكترونية، المستوردين، الموزعين، والشركات التجارية التي تعتمد على حركة استيراد وتوريد مستمرة.",
          highlights: [
            "شحن جوي وبحري وبري",
            "تخليص جمركي متكامل",
            "متابعة المستندات",
            "تسليم من الباب للباب",
          ],
        },
        {
          title: "الاستشارات اللوجستية",
          desc: "تقدم Kangaroo خدمات استشارية متخصصة في الخدمات اللوجستية وسلاسل التوريد، تساعد الشركات على تطوير كفاءتها التشغيلية وتحسين نماذج العمل اللوجستي، بناءً على خبرة ميدانية حقيقية وليس الطرح النظري فقط.",
          stats: ["سلاسل التوريد", "تطوير العمليات", "خبرة ميدانية"],
          fullDesc:
            "تقدم Kangaroo خدمات استشارية متخصصة في قطاع الخدمات اللوجستية وسلاسل التوريد، تهدف إلى مساعدة الشركات على تطوير كفاءتها التشغيلية وفق أفضل الممارسات الحديثة. تشمل الخدمات الاستشارية دراسة وتحليل العمليات التشغيلية، تقييم سلاسل التوريد، تطوير نماذج العمل اللوجستي، وتحسين إجراءات التخزين والتوزيع والتوصيل. توفر الشركة استشارات متخصصة للمشاريع الجديدة والتوسعات التشغيلية، بما يشمل تخطيط البنية اللوجستية وتصميم مراكز التشغيل. وما يميز كنغارو هو تقديم استشارات عملية مبنية على تجربة حقيقية في إدارة العمليات اللوجستية.",
          highlights: [
            "تحليل العمليات التشغيلية",
            "تطوير نماذج العمل",
            "استشارات مبنية على تجربة حقيقية",
            "دعم التحول الرقمي",
          ],
        },
      ],
    },
    why: {
      eyebrow: "لماذا كنغارو",
      title: "نصنع الفرق في كل شحنة",
      items: [
        { value: "+50", label: "تغطية شاملة في فلسطين والأردن", suffix: " مدينة" },
        { value: "24h", label: "سرعة في التوصيل المحلي" },
        { value: "30%", label: "أسعار تنافسية أقل من السوق" },
        { value: "100%", label: "دعم متخصص للتجارة الإلكترونية" },
      ],
    },
    coverage: {
      eyebrow: "تغطيتنا",
      title: "من فلسطين والأردن إلى العالم",
      subtitle: "شبكة لوجستية تربط أهم المدن العربية مع تركيا والأسواق العالمية.",
      cities: ["رام الله", "نابلس", "الخليل", "بيت لحم", "جنين", "عمّان", "الزرقاء", "إربد"],
      regions: { local: "محلي", regional: "إقليمي", intl: "دولي" },
    },
    partners: {
      eyebrow: "شركاؤنا",
      title: "شركاؤنا وعملاؤنا",
      subtitle: "نفخر بثقة كبرى الشركات والمتاجر الإلكترونية في المنطقة.",
    },
    statsMarquee: {
      items: ["+500 عميل", "6 فروع", "+15 مدينة", "24/7 دعم", "98% توصيل"],
    },
    ctaBand: {
      eyebrow: "انضم إلينا",
      title: "كن جزءاً من عائلة كنغارو",
      subtitle: "ابدأ مع كنغارو اليوم واحصل على عرض سعر مخصص خلال ساعات.",
      buttonRegister: "سجّل كعميل جديد",
      buttonLogin: "دخول للعملاء",
    },
    footer: {
      about: "كنغارو هي إحدى شركات Toureidco Investment، تأسست عام 2018، وتُعدّ من أبرز الشركات المتخصصة في الحلول اللوجستية المتكاملة وخدمات التوصيل في فلسطين والمنطقة.",
      branchesTitle: "فروعنا",
      branches: [
        { city: "رام الله", address: "رام الله والبيرة - شارع الميدان - عمارة بيسان الطابق الأرضي" },
        { city: "نابلس", address: "دوار زواتا - مركز فحص كورونا السابق" },
        { city: "الخليل", address: "رأس الجورة - مقابل حلويات برادايس" },
        { city: "عمّان", address: "جبل الحسين" },
      ],
      linksTitle: "روابط سريعة",
      contactTitle: "تواصل معنا",
      phone: "هاتف",
      email: "البريد",
      address: "العنوان",
      addressValue: "رام الله، فلسطين",
      phoneValue: "0593150120",
      emailValue: "info@kangaroopro.com",
      websiteValue: "www.kangaroopro.com",
      whatsappDisplay: "+972 59 315 0120",
      whatsappUrl: "https://wa.me/972593150120",
      facebookUrl: "http://www.facebook.com/prokangaroo",
      instagramUrl: "https://www.instagram.com/prokangaroo",
      tiktokUrl: "https://www.tiktok.com/@prokangaroo",
      rights: "© 2025 كنغارو للخدمات اللوجستية. جميع الحقوق محفوظة.",
    },
    chat: {
      title: "مرحباً بك في كنغارو 👋",
      greeting: "أهلاً! كيف يمكنني مساعدتك اليوم؟",
      placeholder: "اكتب رسالتك...",
      send: "إرسال",
      error: "عذراً، حدث خطأ. حاول مجدداً.",
    },
  },
  en: {
    dir: "ltr" as "rtl" | "ltr",
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      coverage: "Coverage",
      contact: "Contact",
      cta: "Contact Us",
    },
    hero: {
      eyebrow: "Kangaroo • كنغارو",
      title: "The #1 Logistics Partner in Palestine & Jordan",
      subtitle: "Delivery, fulfillment & international shipping with unmatched efficiency",
      tagline: "Smart & Custom Logistics Solutions",
      ctaPrimary: "Contact Us",
      ctaSecondary: "Explore Services",
      ctaTrack: "Track Shipment",
      stats: [
        { value: "15+", label: "Cities Covered" },
        { value: "24/7", label: "Customer Support" },
        { value: "98%", label: "On-time Delivery" },
      ],
    },
    services: {
      eyebrow: "Our Services",
      title: "End-to-end logistics to grow your business",
      subtitle: "From first mile to last mile, we handle the details so you can focus on customers.",
      items: [
        {
          title: "Local Delivery",
          desc: "Kangaroo provides comprehensive local delivery solutions for individuals, businesses, and e-commerce stores through a professional network covering Palestine and Jordan, with cash collection, returns management, and real-time tracking.",
          stats: ["Cash Collection", "Returns Mgmt", "Real-time Tracking"],
          fullDesc:
            "Kangaroo provides comprehensive local delivery solutions designed to meet the needs of individuals, businesses, and e-commerce stores through a professional operational network covering Palestine and Jordan. The company relies on advanced logistics infrastructure, specialized field teams, and smart operational systems to ensure accurate and reliable pickup and delivery. Kangaroo offers flexible delivery solutions including cash collection (COD), returns management, order confirmation, and real-time tracking systems that provide full shipment visibility throughout the delivery journey.",
          highlights: [
            "24-hour delivery",
            "Cash on Delivery (COD)",
            "Returns management",
            "Real-time tracking",
          ],
        },
        {
          title: "Fulfillment & Storage Solutions",
          desc: "Kangaroo is Palestine's first and leading fulfillment provider, offering advanced warehousing, inventory management, order processing, packing, and final-mile delivery under one integrated logistics ecosystem tailored for e-commerce and businesses of all sizes.",
          stats: ["Inventory Mgmt", "Order Processing", "Pack & Ship"],
          fullDesc:
            "Kangaroo is Palestine's first and leading fulfillment company, providing advanced warehousing and integrated fulfillment solutions for businesses and e-commerce stores. The company offers secure, organized storage facilities with smart inventory management systems providing real-time tracking and detailed operational reporting. Services cover the complete order lifecycle: goods receiving and inspection, warehousing, inventory management, order picking, packing, labeling, and final shipment preparation. Additional value-added services include repackaging, product sorting, promotional bundle preparation, returns management, and quality control.",
          highlights: [
            "Palestine's first fulfillment company",
            "Secure organized storage",
            "Smart inventory management",
            "Professional packing & preparation",
          ],
        },
        {
          title: "Jordan–Palestine Transport",
          desc: "Kangaroo delivers specialized cross-border transport between Jordan and Palestine with full operational efficiency, real-time tracking, and professional logistics management for businesses, e-commerce stores, and individuals.",
          stats: ["Cross-Border", "Real-time Tracking", "Pro Logistics"],
          fullDesc:
            "Kangaroo provides specialized transport solutions between Jordan and Palestine through a fully integrated logistics operation ensuring efficiency, speed, and reliability in cross-border transportation. Services cover parcels, commercial shipments, goods, and customized logistics requests for both individuals and businesses. The company utilizes advanced tracking and monitoring systems providing real-time shipment updates and full operational visibility. These solutions support e-commerce businesses, retailers, import and distribution companies, and organizations requiring stable logistics operations between Jordan and Palestine.",
          highlights: [
            "Daily regular transport",
            "Continuous shipment tracking",
            "Serves individuals & businesses",
            "Professional operational procedures",
          ],
        },
        {
          title: "Freight Forwarding & Clearance",
          desc: "Kangaroo provides integrated freight forwarding and customs clearance services including air, sea, and land freight, managing the full import process from origin to final delivery with professional customs handling and real-time shipment tracking.",
          stats: ["Air · Sea · Land", "Customs Clearance", "Final Delivery"],
          fullDesc:
            "Kangaroo provides integrated freight forwarding and customs clearance services including air, sea, and land freight, managing the complete logistics process from origin pickup to customs clearance and final delivery. The company is experienced in managing customs clearance procedures, documentation, and coordination with relevant authorities. These solutions serve e-commerce companies, importers, distributors, and commercial businesses that rely on continuous import and supply chain operations.",
          highlights: [
            "Air, sea & land freight",
            "Full customs clearance",
            "Documentation handling",
            "Door-to-door delivery",
          ],
        },
        {
          title: "Logistics Consulting",
          desc: "Kangaroo offers specialized logistics and supply chain consulting services, helping businesses optimize their operations, improve efficiency, and build scalable logistics models based on real operational expertise and proven industry experience.",
          stats: ["Supply Chains", "Process Optimization", "Field Expertise"],
          fullDesc:
            "Kangaroo provides specialized consulting services in logistics and supply chain management, helping businesses improve operational efficiency according to modern best practices. Services include operational analysis, supply chain assessment, logistics strategy development, warehouse optimization, and order management improvement. The company offers consulting for new projects and operational expansions including logistics infrastructure planning and fulfillment center setup. What distinguishes Kangaroo is providing practical consulting based on real operational experience rather than purely theoretical recommendations.",
          highlights: [
            "Operational analysis",
            "Business model development",
            "Experience-based consulting",
            "Digital transformation support",
          ],
        },
      ],
    },
    why: {
      eyebrow: "Why Kangaroo",
      title: "Making a difference with every shipment",
      items: [
        { value: "50+", label: "Cities covered in Palestine & Jordan", suffix: "" },
        { value: "24h", label: "Local delivery speed" },
        { value: "30%", label: "Below-market competitive pricing" },
        { value: "100%", label: "Dedicated e-commerce support" },
      ],
    },
    coverage: {
      eyebrow: "Coverage",
      title: "From Palestine & Jordan to the world",
      subtitle: "A logistics network connecting key Arab cities with Turkey and global markets.",
      cities: ["Ramallah", "Nablus", "Hebron", "Bethlehem", "Jenin", "Amman", "Zarqa", "Irbid"],
      regions: { local: "Local", regional: "Regional", intl: "International" },
    },
    partners: {
      eyebrow: "Partners",
      title: "Our Partners & Clients",
      subtitle: "Trusted by leading brands and e-commerce stores across the region.",
    },
    statsMarquee: {
      items: ["500+ Clients", "6 Branches", "15+ Cities", "24/7 Support", "98% On-Time"],
    },
    ctaBand: {
      eyebrow: "Join Us",
      title: "Be Part of the Kangaroo Family",
      subtitle: "Start with Kangaroo today and get a custom quote within hours.",
      buttonRegister: "Register as Customer",
      buttonLogin: "Customer Login",
    },
    footer: {
      about: "Kangaroo is part of Toureidco Investment, established in 2018, and is one of the leading providers of integrated logistics and delivery solutions in Palestine and the region.",
      branchesTitle: "Our Branches",
      branches: [
        { city: "Ramallah", address: "Ramallah & Al-Bireh - Al-Maydan St - Bisan Building, Ground Floor" },
        { city: "Nablus", address: "Zawata Roundabout - Former Corona Testing Center" },
        { city: "Hebron", address: "Ras Al-Jawra - Opposite Paradise Sweets" },
        { city: "Amman", address: "Jabal Al-Hussein" },
      ],
      linksTitle: "Quick Links",
      contactTitle: "Contact Us",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressValue: "Ramallah, Palestine",
      phoneValue: "0593150120",
      emailValue: "info@kangaroopro.com",
      websiteValue: "www.kangaroopro.com",
      whatsappDisplay: "+972 59 315 0120",
      whatsappUrl: "https://wa.me/972593150120",
      facebookUrl: "http://www.facebook.com/prokangaroo",
      instagramUrl: "https://www.instagram.com/prokangaroo",
      tiktokUrl: "https://www.tiktok.com/@prokangaroo",
      rights: "© 2025 Kangaroo Logistics. All rights reserved.",
    },
    chat: {
      title: "Welcome to Kangaroo 👋",
      greeting: "Hello! How can I help you today?",
      placeholder: "Type a message...",
      send: "Send",
      error: "Sorry, something went wrong. Please try again.",
    },
  },
};

export type Translation = typeof translations.ar;
