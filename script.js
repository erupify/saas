        document.addEventListener('DOMContentLoaded', () => {

            // Set current year
            document.getElementById('year').textContent = new Date().getFullYear();

            // Mobile Menu Toggle
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const navLinks = document.getElementById('nav-links');

            mobileBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu on link click
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // Sticky Header Scroll Effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Scroll Reveal Animation (Intersection Observer)
            const revealElements = document.querySelectorAll('.reveal-up');

            const revealCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target); // Stop observing once revealed
                    }
                });
            };

            const revealOptions = {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            };

            const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

            revealElements.forEach(el => {
                revealObserver.observe(el);
            });

            // ── Multi-Language Translation System ─────────────────────────
            const TRANSLATIONS = {
                en: {
                    "nav-problem": "The Problem",
                    "nav-solution": "Solution",
                    "nav-how-it-works": "How It Works",
                    "nav-pricing": "Pricing",
                    "nav-tools": "Tools",
                    "nav-get-started": "Start",
                    "hero-value-prop": "Turn your online reputation into a customer-acquisition machine",
                    "hero-title": "Turn Your Online Reputation Into More Customers",
                    "hero-desc": "We help local businesses collect more Google Reviews effortlessly, build massive trust, and rank higher on local search.",
                    "hero-demo": "Get a Free Demo",
                    "hero-see-works": "See How It Works ↓",
                    "trust-headline": "Trusted by 100+ Local Businesses Across Morocco",
                    "trust-served": "Businesses Served",
                    "trust-reviews": "Reviews Generated",
                    "prob-title": "Most Businesses Lose Customers Because of Weak Online Reputation",
                    "prob-subtitle": "Are you missing out on revenue because your competitors look better online?",
                    "prob-card1-title": "Too few Google Reviews",
                    "prob-card1-desc": "Customers hesitate to trust a business with zero or barely any reviews. They simply go to the next option.",
                    "prob-card2-title": "Negative reviews hurt sales",
                    "prob-card2-desc": "A few bad ratings without a strong stream of positive ones can drastically lower your overall star rating.",
                    "prob-card3-title": "Competitors ranking higher",
                    "prob-card3-desc": "Google favors businesses with high ratings and frequent new reviews in local search maps.",
                    "sol-title": "How Erupify Helps Your Business Grow",
                    "sol-subtitle": "We automate your review collection so you can focus on running your business.",
                    "sol-card1-title": "Collect Reviews Easily",
                    "sol-card1-desc": "Never beg for reviews again. We provide simple tools that make it incredibly easy for customers to leave 5-star feedback.",
                    "sol-card2-title": "Redirect Happy Customers",
                    "sol-card2-desc": "Our smart routing sends satisfied customers straight to Google, while capturing poor feedback privately before it goes online.",
                    "sol-card3-title": "Build Massive Trust",
                    "sol-card3-desc": "Stand out in your local area with a glowing reputation that naturally attracts new clients reading your amazing reviews.",
                    "sol-card4-title": "Improve Local SEO",
                    "sol-card4-desc": "More reviews mean higher rankings on Google Maps, driving massive amounts of organic, free foot traffic to your door.",
                    "how-title": "Automate Your Reputation in 3 Steps",
                    "how-subtitle": "We make it frictionless for your customers and entirely hands-off for you.",
                    "how-step1-title": "Smart Page Setup",
                    "how-step1-desc": "We create a beautifully designed, branded landing page optimized to convert your customers into reviewers.",
                    "how-step2-title": "Share With Customers",
                    "how-step2-desc": "Customers scan a QR code at your location or click a link sent via SMS/Email after their purchase.",
                    "how-step3-title": "Watch Reviews Grow",
                    "how-step3-desc": "Happy clients tap easily to leave 5-star Google reviews, skyrocketing your online rating instantly.",
                    "tools-title": "Interactive Growth Tools",
                    "tools-subtitle": "Free calculators and assessments to measure your digital performance and automation savings.",
                    "tools-card1-title": "Pricing Calculator",
                    "tools-card1-desc": "Calculate your customized pricing plan based on locations and add-ons.",
                    "tools-card1-btn": "Calculate Plan",
                    "tools-card2-title": "Business Digital Score",
                    "tools-card2-desc": "Evaluate your business digital automation maturity with our 20-question quiz.",
                    "tools-card2-btn": "Take Assessment",
                    "tools-card3-title": "ROI Calculator",
                    "tools-card3-desc": "Estimate the profit growth and time saved by automating customer reviews.",
                    "tools-card3-btn": "Calculate ROI",
                    "tools-card4-title": "AI Assistant Cost Calculator",
                    "tools-card4-desc": "Compare the cost of human staff vs an AI Agent handling messages & calls.",
                    "tools-card4-btn": "Compare Cost",
                    "tools-card5-title": "Review Cost Calculator",
                    "tools-card5-desc": "Calculate how much buying reviews costs vs using Erupify, and see your monthly & annual savings.",
                    "tools-card5-btn": "Calculate Savings",
                    "rc-lbl-visitors": "Daily Customers",
                    "rc-lbl-days": "Working Days per Month",
                    "rc-lbl-price": "Price per Review",
                    "rc-out-monthly-reviews": "Monthly Reviews",
                    "rc-out-annual-reviews": "Annual Reviews",
                    "rc-out-monthly-cost": "Buying Reviews (Monthly)",
                    "rc-out-annual-cost": "Buying Reviews (Annual)",
                    "rc-out-monthly-saving": "Erupify Monthly Savings",
                    "rc-out-annual-saving": "Erupify Annual Savings",
                    "rc-out-roi": "ROI",
                    "price-title": "Simple, Transparent Pricing",
                    "price-subtitle": "Invest in your reputation and watch your ROI explode.",
                    "price-monthly": "Monthly",
                    "price-annual": "Annual",
                    "price-save": "Save 20%",
                    "price-starter-desc": "For small local businesses.",
                    "price-starter-f1": "Basic review page setup",
                    "price-starter-f2": "Direct Google linking",
                    "price-starter-f3": "Standard QR Code",
                    "price-starter-f4": "Email Support",
                    "price-starter-btn": "Get Starter",
                    "price-business-desc": "For growing establishments.",
                    "price-business-f1": "Advanced review system",
                    "price-business-f2": "Negative feedback capture",
                    "price-business-f3": "Custom branded QR Code",
                    "price-business-f4": "Monthly analytics report",
                    "price-business-btn": "Get Business",
                    "price-pro-desc": "Full reputation management.",
                    "price-pro-f1": "Everything in Business",
                    "price-pro-f2": "SMS/Email API Integrations",
                    "price-pro-f3": "Automated review replies",
                    "price-pro-f4": "Priority 24/7 Support",
                    "price-pro-btn": "Get Pro",
                    "price-popular": "Most Popular",
                    "modal-name": "Full Name",
                    "modal-business": "Business Name",
                    "modal-email": "Email Address",
                    "modal-phone": "Phone Number (Optional)",
                    "modal-success-btn": "Close",
                    "calc-locations": "Number of Locations",
                    "calc-addon1": "Private Feedback Capture (+29/mo)",
                    "calc-addon2": "Branded QR Pack (+19/mo)",
                    "calc-addon3": "AI Review Responder (+49/mo)",
                    "calc-billing": "Billing Cycle",
                    "calc-plan-type": "Recommended Plan",
                    "calc-total-cost": "Total Price",
                    "quiz-intro-desc": "Take this quick 20-question assessment to analyze your business digitalization and find automation bottlenecks.",
                    "quiz-yes": "Yes",
                    "quiz-no": "No",
                    "quiz-lead-desc": "Enter your details to generate your score report and automation recommendations.",
                    "quiz-view-results": "Get Digital Report",
                    "quiz-score-label": "Your Score",
                    "quiz-losing-msg": "Your business is losing potential customers due to missing automation systems.",
                    "roi-lbl-clients": "Monthly Customers",
                    "roi-lbl-conversion": "Current Review Rate (%)",
                    "roi-lbl-profit": "Average Value per Customer",
                    "roi-out-profit": "Additional Annual Revenue",
                    "roi-out-time": "Time Saved (Annually)",
                    "roi-out-rate": "Estimated Annual ROI",
                    "ai-lbl-messages": "Daily Messages",
                    "ai-lbl-calls": "Daily Calls",
                    "ai-lbl-employees": "Number of Support Employees",
                    "ai-out-human": "Staff Cost (Annual)",
                    "ai-out-agent": "AI Agent Cost (Annual)",
                    "ai-out-savings": "Net Savings (Annual)",
                    "quiz-question-1": "Do you have a professional website?",
                    "quiz-question-2": "Is your website mobile-friendly?",
                    "quiz-question-3": "Do you have an active Google Business Profile?",
                    "quiz-question-4": "Do you collect customer reviews automatically?",
                    "quiz-question-5": "Do you respond to all online reviews?",
                    "quiz-question-6": "Do you use a CRM system?",
                    "quiz-question-7": "Do you use WhatsApp Business?",
                    "quiz-question-8": "Have you automated WhatsApp customer replies?",
                    "quiz-question-9": "Do you have an online Booking System?",
                    "quiz-question-10": "Do you run automated Email Marketing campaigns?",
                    "quiz-question-11": "Do you capture negative reviews privately first?",
                    "quiz-question-12": "Do you track customer satisfaction (NPS)?",
                    "quiz-question-13": "Do you run paid ads (Google/Meta) for leads?",
                    "quiz-question-14": "Are lead forms integrated directly with your CRM?",
                    "quiz-question-15": "Do you send automated follow-ups after purchase?",
                    "quiz-question-16": "Do you use AI agents or chatbots for support?",
                    "quiz-question-17": "Do you have a digital loyalty program?",
                    "quiz-question-18": "Do you automate your social media posts?",
                    "quiz-question-19": "Do you track Customer Acquisition Cost (CAC)?",
                    "quiz-question-20": "Do you have automated reporting dashboards?",
                    "testim-title": "Trusted by Local Businesses",
                    "testim-subtitle": "See how Erupify has transformed our clients' online presence.",
                    "testim-1-text": "\"Before Erupify, we had 12 reviews. Within 3 months of placing their QR codes on our tables, we hit over 150 5-star reviews. Our foot traffic has never been better!\"",
                    "testim-1-role": "Owner of Bella Pizza",
                    "testim-2-text": "\"As a dental clinic, trust is everything. Erupify automates our review requests perfectly. We now rank #1 on Google Maps for 'Dentist near me' in our city.\"",
                    "testim-2-role": "Manager at Bright Smiles Clinic",
                    "testim-3-text": "\"The negative feedback capture is a lifesaver. It lets me fix a client's issue privately before it ever hits Google. Erupify is an absolute game changer.\"",
                    "testim-3-role": "Real Estate Agent at Prime Realty",
                    "guar-1-title": "14-Day Money-Back Guarantee",
                    "guar-1-desc": "Not satisfied? Full refund, no questions asked.",
                    "guar-2-title": "No Long-Term Contracts",
                    "guar-2-desc": "Cancel anytime, stay because you love the results.",
                    "guar-3-title": "Setup in 24 Hours",
                    "guar-3-desc": "We handle everything. You just approve it.",
                    "faq-title": "Frequently Asked Questions",
                    "faq-subtitle": "Got questions? We've got answers.",
                    "faq-q1": "Is this compliant with Google's Terms of Service?",
                    "faq-a1": "Absolutely! We never create fake reviews or incentivize customers to leave positive feedback. Our system simply makes it easier for your real, satisfied customers to share their experience on Google. This is 100% compliant with Google's guidelines.",
                    "faq-q2": "Do I need to be tech-savvy to use Erupify?",
                    "faq-a2": "Not at all! We handle the entire setup for you. Once your branded page and QR code are ready, all you need to do is share them with your customers — no technical knowledge required. It's as simple as showing a QR code or sending a link.",
                    "faq-q3": "How does Erupify separate negative feedback from positive reviews?",
                    "faq-a3": "Our smart routing system asks customers about their experience first. Happy customers are directed straight to your Google review page. Unhappy customers are routed to a private feedback form instead, giving you the chance to resolve issues before they become public negative reviews.",
                    "faq-q4": "How quickly will I see results?",
                    "faq-a4": "Most of our clients start seeing new 5-star reviews within the first week. Within 2-3 months, you can expect a significant boost in your overall Google rating and local search ranking, leading to more foot traffic and sales.",
                    "faq-q5": "Can I cancel my subscription at any time?",
                    "faq-a5": "Yes! There are no long-term contracts. You can cancel your subscription at any time. However, most of our clients stay because they see a clear and measurable return on investment from day one.",
                    "faq-q6": "What if I already have negative reviews on Google?",
                    "faq-a6": "That's exactly why you need Erupify! By generating a consistent stream of new positive reviews, your overall star rating will improve quickly. The negative reviews get buried under an avalanche of genuine 5-star feedback from happy customers.",
                    "cta-title": "Start Growing Your Reputation Today",
                    "cta-desc": "Stop losing customers to competitors with better reviews. Join the smart businesses automating their growth.",
                    "cta-btn1": "Get Your Demo",
                    "cta-btn2": "Contact Us",
                    "footer-desc": "Turn your online reputation into a powerful customer-acquisition machine. Collect reviews, build trust, and dominate local search."
                },
                ar: {
                    "nav-problem": "المشكلة",
                    "nav-solution": "الحل",
                    "nav-how-it-works": "كيف يعمل",
                    "nav-pricing": "الأسعار",
                    "nav-tools": "الأدوات",
                    "nav-get-started": "ابدأ الآن",
                    "hero-value-prop": "حول سمعتك الرقمية إلى آلة لجذب العملاء",
                    "hero-title": "حول سمعتك الرقمية إلى مزيد من العملاء",
                    "hero-desc": "نساعد الشركات المحلية على جمع تقييمات جوجل بسهولة، وبناء ثقة هائلة، وتصدر نتائج البحث المحلي.",
                    "hero-demo": "احصل على عرض تجريبي مجاني",
                    "hero-see-works": "شاهد كيف يعمل ↓",
                    "trust-headline": "موثوق به من قِبل أكثر من 100 شركة محلية في المغرب",
                    "trust-served": "الشركات المستفيدة",
                    "trust-reviews": "التقييمات التي تم جمعها",
                    "prob-title": "معظم الشركات تفقد العملاء بسبب ضعف السمعة الرقمية",
                    "prob-subtitle": "هل تضيع عليك الأرباح لأن منافسيك يبدون أفضل منك على الإنترنت؟",
                    "prob-card1-title": "تقييمات جوجل غير كافية",
                    "prob-card1-desc": "يتردد العملاء في الثقة بشركة ليس لديها تقييمات أو لديها تقييمات قليلة جداً. ويذهبون ببساطة إلى الخيار التالي.",
                    "prob-card2-title": "التقييمات السلبية تضر بالمبيعات",
                    "prob-card2-desc": "عدد قليل من التقييمات السيئة دون تدفق مستمر للتقييمات الإيجابية يمكن أن يخفض تصنيفك الإجمالي بشكل كبير.",
                    "prob-card3-title": "المنافسون يتصدرون النتائج",
                    "prob-card3-desc": "تفضل جوجل الشركات ذات التقييمات العالية والتقييمات الإيجابية المتكررة في خرائط البحث المحلي.",
                    "sol-title": "كيف تساعد Erupify عملك على النمو",
                    "sol-subtitle": "نقوم بأتمتة جمع التقييمات الخاصة بك حتى تتمكن من التركيز على إدارة عملك.",
                    "sol-card1-title": "جمع التقييمات بسهولة",
                    "sol-card1-desc": "لا تطلب التقييمات يدوياً بعد اليوم. نحن نوفر أدوات بسيطة تجعل ترك التقييمات من فئة 5 نجوم أمراً سهلاً للغاية على العملاء.",
                    "sol-card2-title": "توجيه العملاء السعداء",
                    "sol-card2-desc": "يقوم نظام التوجيه الذكي لدينا بإرسال العملاء الراضين مباشرة إلى جوجل، بينما يجمع الملاحظات السلبية بشكل خاص قبل نشرها.",
                    "sol-card3-title": "بناء ثقة هائلة",
                    "sol-card3-desc": "تميز في منطقتك المحلية بسمعة متوهجة تجذب عملاء جدد يقرأون تقييماتك الرائعة بشكل طبيعي.",
                    "sol-card4-title": "تحسين محركات البحث المحلية (SEO)",
                    "sol-card4-desc": "المزيد من التقييمات يعني ترتيباً أعلى في خرائط جوجل، مما يؤدي إلى جذب عدد هائل من الزوار مجاناً إلى بابك.",
                    "how-title": "أتمتة سمعتك الرقمية في 3 خطوات",
                    "how-subtitle": "نجعل العملية سهلة لعملائك وتتم بالكامل تلقائياً بدون تدخل منك.",
                    "how-step1-title": "إعداد صفحة ذكية",
                    "how-step1-desc": "نقوم بإنشاء صفحة هبوط مصممة بشكل جميل ومخصصة لعلامتك التجارية لتحويل عملائك إلى مقيمين.",
                    "how-step2-title": "المشاركة مع العملاء",
                    "how-step2-desc": "يقوم العملاء بمسح رمز الاستجابة السريعة (QR) في موقعك أو النقر على الرابط المرسل عبر رسالة قصيرة/بريد إلكتروني بعد الشراء.",
                    "how-step3-title": "شاهد تقييماتك تنمو",
                    "how-step3-desc": "ينقر العملاء الراضون بسهولة لترك تقييمات 5 نجوم على جوجل، مما يرفع تقييمك على الإنترنت على الفور.",
                    "tools-title": "أدوات النمو التفاعلية",
                    "tools-subtitle": "حاسبات واختبارات تفاعلية مجانية لقياس أداء عملك الرقمي وتوفير الأتمتة.",
                    "tools-card1-title": "حاسبة الأسعار",
                    "tools-card1-desc": "احسب تكلفة خطتك المخصصة بناءً على عدد الفروع والخدمات الإضافية.",
                    "tools-card1-btn": "احسب السعر",
                    "tools-card2-title": "مقياس الأداء الرقمي للمشروع",
                    "tools-card2-desc": "قيم مستوى نضج الأتمتة الرقمية في شركتك من خلال اختبار مكون من 20 سؤالاً.",
                    "tools-card2-btn": "ابدأ الاختبار",
                    "tools-card3-title": "حاسبة العائد على الاستثمار (ROI)",
                    "tools-card3-desc": "احسب الأرباح الإضافية والوقت الموفر من خلال أتمتة تقييمات العملاء.",
                    "tools-card3-btn": "احسب العائد (ROI)",
                    "tools-card4-title": "حاسبة تكلفة المساعد الذكي (AI)",
                    "tools-card4-desc": "قارن تكلفة الموظفين التقليديين بتكلفة المساعد الذكي لإدارة الرسائل والمكالمات.",
                    "tools-card4-btn": "قارن التكاليف",
                    "tools-card5-title": "حاسبة تكلفة التقييمات",
                    "tools-card5-desc": "احسب تكلفة شراء التقييمات مقارنة باستخدام Erupify، وشوف التوفير الشهري والسنوي.",
                    "tools-card5-btn": "احسب التوفير",
                    "rc-lbl-visitors": "عدد الزبناء يومياً",
                    "rc-lbl-days": "أيام العمل في الشهر",
                    "rc-lbl-price": "ثمن التقييم الواحد",
                    "rc-out-monthly-reviews": "التقييمات الشهرية",
                    "rc-out-annual-reviews": "التقييمات السنوية",
                    "rc-out-monthly-cost": "تكلفة شراء التقييمات (شهرياً)",
                    "rc-out-annual-cost": "تكلفة شراء التقييمات (سنوياً)",
                    "rc-out-monthly-saving": "توفير Erupify شهرياً",
                    "rc-out-annual-saving": "توفير Erupify سنوياً",
                    "rc-out-roi": "العائد على الاستثمار (ROI)",
                    "price-title": "أسعار بسيطة وشفافة",
                    "price-subtitle": "استثمر في سمعتك الرقمية وشاهد العائد على الاستثمار يرتفع بشكل هائل.",
                    "price-monthly": "شهرياً",
                    "price-annual": "سنوياً",
                    "price-save": "وفر 20%",
                    "price-starter-desc": "للشركات المحلية الصغيرة.",
                    "price-starter-f1": "إعداد صفحة التقييم الأساسية",
                    "price-starter-f2": "ربط مباشر بجوجل",
                    "price-starter-f3": "رمز QR قياسي",
                    "price-starter-f4": "دعم عبر البريد الإلكتروني",
                    "price-starter-btn": "احصل على Starter",
                    "price-business-desc": "للمؤسسات النامية.",
                    "price-business-f1": "نظام تقييمات متقدم",
                    "price-business-f2": "التقاط الملاحظات السلبية بشكل خاص",
                    "price-business-f3": "رمز QR مخصص بالهوية البصرية",
                    "price-business-f4": "تقرير تحليلي شهري",
                    "price-business-btn": "احصل على Business",
                    "price-pro-desc": "إدارة كاملة للسمعة الرقمية.",
                    "price-pro-f1": "كل ما يشمله عرض Business",
                    "price-pro-f2": "ربط مع البرمجيات والرسائل النصية",
                    "price-pro-f3": "ردود تلقائية على التقييمات",
                    "price-pro-f4": "دعم سريع 24/7",
                    "price-pro-btn": "احصل على Pro",
                    "price-popular": "الأكثر شيوعاً",
                    "modal-name": "الاسم الكامل",
                    "modal-business": "اسم الشركة",
                    "modal-email": "البريد الإلكتروني",
                    "modal-phone": "رقم الهاتف",
                    "modal-success-btn": "إغلاق",
                    "calc-locations": "عدد الفروع",
                    "calc-addon1": "نظام شكاوى خاص (+29/شهرياً)",
                    "calc-addon2": "باقة كروت QR مخصصة (+19/شهرياً)",
                    "calc-addon3": "الرد الآلي بالذكاء الاصطناعي (+49/شهرياً)",
                    "calc-billing": "دورة الدفع",
                    "calc-plan-type": "الخطة المقترحة",
                    "calc-total-cost": "السعر الإجمالي",
                    "quiz-intro-desc": "أجب عن 20 سؤالاً بسيطاً لتقييم الحضور الرقمي وأتمتة العمليات في شركتك ومعرفة العقبات السلبية.",
                    "quiz-yes": "نعم",
                    "quiz-no": "لا",
                    "quiz-lead-desc": "أدخل معلوماتك للحصول على التقرير الرقمي الكامل لشركتك وتوصيات الأتمتة المخصصة.",
                    "quiz-view-results": "عرض النتيجة والتقرير",
                    "quiz-score-label": "مقياسك الرقمي",
                    "quiz-losing-msg": "مشروعك يضيع عملاء محتملين بسبب غياب أنظمة الأتمتة الرقمية.",
                    "roi-lbl-clients": "العملاء شهرياً",
                    "roi-lbl-conversion": "معدل المراجعة الحالي (%)",
                    "roi-lbl-profit": "متوسط القيمة لكل عميل",
                    "roi-out-profit": "أرباح سنوية إضافية متوقعة",
                    "roi-out-time": "الوقت الموفر سنوياً",
                    "roi-out-rate": "العائد السنوي على الاستثمار",
                    "ai-lbl-messages": "الرسائل اليومية",
                    "ai-lbl-calls": "المكالمات اليومية",
                    "ai-lbl-employees": "عدد موظفي الدعم والخدمة",
                    "ai-out-human": "تكلفة الموظفين (سنوياً)",
                    "ai-out-agent": "تكلفة المساعد الذكي (سنوياً)",
                    "ai-out-savings": "صافي التوفير والربح الإضافي",
                    "quiz-question-1": "هل عندك موقع إلكتروني للشركة؟",
                    "quiz-question-2": "هل الموقع ديالك متناسق مع التلفونات؟",
                    "quiz-question-3": "هل تملك ملفاً تجارياً مفعلاً على خرائط Google؟",
                    "quiz-question-4": "هل تقوم بجمع تقييمات العملاء بطريقة تلقائية؟",
                    "quiz-question-5": "هل تقوم بالرد على جميع التقييمات التي تصلك على الإنترنت؟",
                    "quiz-question-6": "هل تستعمل نظام CRM لتنظيم وإدارة بيانات العملاء؟",
                    "quiz-question-7": "هل تملك وتستخدم حساب WhatsApp Business؟",
                    "quiz-question-8": "هل قمت بإعداد ردود آلية أو أتمتة الرسائل على الواتساب؟",
                    "quiz-question-9": "هل تملك نظام حجز وجدولة المواعيد أونلاين؟",
                    "quiz-question-10": "هل تقوم بحملات التسويق عبر البريد الإلكتروني (Email Marketing) بشكل تلقائي؟",
                    "quiz-question-11": "هل تملك نظاماً لتلقي شكاوى العملاء السلبية سرياً قبل نشرها؟",
                    "quiz-question-12": "هل تقيس بانتظام مدى رضا زبنائك (معدل NPS)؟",
                    "quiz-question-13": "هل تقوم بتشغيل إعلانات ممولة على جوجل أو السوشيال ميديا؟",
                    "quiz-question-14": "هل يتم ربط بيانات الإعلانات تلقائياً مع نظام المبيعات أو الـ CRM؟",
                    "quiz-question-15": "هل ترسل رسائل متابعة تلقائية للعملاء بعد الشراء؟",
                    "quiz-question-16": "هل تستخدم الذكاء الاصطناعي أو الـ Chatbots في خدمة العملاء؟",
                    "quiz-question-17": "هل تقدم برنامج نقاط أو وفاء رقمي (Loyalty Program) لعملائك؟",
                    "quiz-question-18": "هل تستخدم أدوات لجدولة ونشر منشورات السوشيال ميديا تلقائياً؟",
                    "quiz-question-19": "هل تحسب بدقة تكلفة الحصول على العميل الجديد (CAC)؟",
                    "quiz-question-20": "هل تملك لوحة تحكم رقمية (Dashboard) تعكس إحصائيات عملك مباشرة؟",
                    "testim-title": "موثوق به من الشركات المحلية",
                    "testim-subtitle": "شاهد كيف ساعدت Erupify في تغيير الحضور الرقمي لعملائنا.",
                    "testim-1-text": "\"قبل Erupify، كان لدينا 12 تقييم فقط. خلال 3 أشهر من وضع أكواد QR على طاولاتنا، وصلنا لأكثر من 150 تقييم 5 نجوم. عدد زبائننا لم يكن أفضل من الآن!\"",
                    "testim-1-role": "صاحب مطعم Bella Pizza",
                    "testim-2-text": "\"كعيادة أسنان، الثقة هي كل شيء. Erupify تقوم بأتمتة طلبات التقييم بشكل مثالي. نحن الآن في المرتبة الأولى على خرائط جوجل في مدينتنا.\"",
                    "testim-2-role": "مديرة في عيادة Bright Smiles",
                    "testim-3-text": "\"نظام التقاط الملاحظات السلبية أنقذنا حرفياً. يتيح لي حل مشكلة العميل سراً قبل أن تصل إلى جوجل. Erupify غيّرت اللعبة تماماً.\"",
                    "testim-3-role": "وكيل عقاري في Prime Realty",
                    "guar-1-title": "ضمان استرجاع الأموال 14 يوم",
                    "guar-1-desc": "لست راضياً؟ استرد أموالك بالكامل، دون أي أسئلة.",
                    "guar-2-title": "بدون عقود طويلة الأجل",
                    "guar-2-desc": "ألغِ في أي وقت، استمر لأنك تحب النتائج.",
                    "guar-3-title": "إعداد في 24 ساعة",
                    "guar-3-desc": "نتولى كل شيء. أنت توافق فقط.",
                    "faq-title": "الأسئلة الشائعة",
                    "faq-subtitle": "لديك أسئلة؟ لدينا إجابات.",
                    "faq-q1": "هل هذا متوافق مع شروط خدمة جوجل؟",
                    "faq-a1": "بالتأكيد! نحن لا ننشئ تقييمات وهمية ولا نقدم حوافز للعملاء لترك تقييمات إيجابية. نظامنا يسهل على عملائك الحقيقيين والراضين مشاركة تجربتهم على جوجل. هذا يتوافق بنسبة 100٪ مع إرشادات جوجل.",
                    "faq-q2": "هل أحتاج إلى خبرة تقنية لاستخدام Erupify؟",
                    "faq-a2": "على الإطلاق! نحن نتولى عملية الإعداد بالكامل. بمجرد أن تصبح صفحتك ورمز QR جاهزين، كل ما عليك فعله هو مشاركتهما مع عملائك — لا يلزم أي معرفة تقنية. الأمر بسيط مثل إظهار رمز QR أو إرسال رابط.",
                    "faq-q3": "كيف تفصل Erupify الملاحظات السلبية عن التقييمات الإيجابية؟",
                    "faq-a3": "يسأل نظام التوجيه الذكي لدينا العملاء عن تجربتهم أولاً. يتم توجيه العملاء السعداء مباشرة إلى صفحة تقييم جوجل الخاصة بك. بينما يتم توجيه العملاء غير الراضين إلى نموذج ملاحظات خاص، مما يمنحك الفرصة لحل المشكلات قبل أن تصبح تقييمات سلبية عامة.",
                    "faq-q4": "ما مدى سرعة رؤية النتائج؟",
                    "faq-a4": "يبدأ معظم عملائنا في رؤية تقييمات جديدة من فئة 5 نجوم خلال الأسبوع الأول. في غضون 2-3 أشهر، يمكنك توقع تعزيز كبير في تقييمك العام على جوجل وترتيب البحث المحلي، مما يؤدي إلى زيادة الزيارات والمبيعات.",
                    "faq-q5": "هل يمكنني إلغاء اشتراكي في أي وقت؟",
                    "faq-a5": "نعم! لا توجد عقود طويلة الأجل. يمكنك إلغاء اشتراكي في أي وقت. ومع ذلك، يستمر معظم عملائنا لأنهم يرون عائداً واضحاً وملموساً على الاستثمار من اليوم الأول.",
                    "faq-q6": "ماذا لو كان لدي بالفعل تقييمات سلبية على جوجل؟",
                    "faq-a6": "لهذا السبب بالضبط تحتاج إلى Erupify! من خلال توليد تدفق مستمر من التقييمات الإيجابية الجديدة، سيتحسن تقييمك العام بسرعة. سيتم دفن التقييمات السلبية تحت سيل من التقييمات الحقيقية بـ 5 نجوم من العملاء السعداء.",
                    "cta-title": "ابدأ في تنمية سمعتك اليوم",
                    "cta-desc": "توقف عن خسارة العملاء لصالح المنافسين الذين لديهم تقييمات أفضل. انضم إلى الشركات الذكية التي تقوم بأتمتة نموها.",
                    "cta-btn1": "احصل على عرض تجريبي",
                    "cta-btn2": "اتصل بنا",
                    "footer-desc": "حول سمعتك الرقمية إلى آلة قوية لجذب العملاء. اجمع التقييمات، ابنِ الثقة، وسيطر على البحث المحلي."
                },
                fr: {
                    "nav-problem": "Le Problème",
                    "nav-solution": "Solution",
                    "nav-how-it-works": "Comment ça marche",
                    "nav-pricing": "Tarifs",
                    "nav-tools": "Outils",
                    "nav-get-started": "Commencer",
                    "hero-value-prop": "Transformez votre réputation en ligne en machine d'acquisition de clients",
                    "hero-title": "Transformez Votre Réputation En Ligne En Nouveaux Clients",
                    "hero-desc": "Nous aidons les entreprises locales à collecter plus d'avis Google sans effort, à instaurer une confiance massive et à être mieux classées localement.",
                    "hero-demo": "Obtenir une Démo Gratuite",
                    "hero-see-works": "Voir Comment Ça Marche ↓",
                    "trust-headline": "Recommandé par plus de 100 entreprises locales au Maroc",
                    "trust-served": "Entreprises Accompagnées",
                    "trust-reviews": "Avis Google Générés",
                    "prob-title": "La plupart des entreprises perdent des clients en raison d'une mauvaise réputation en ligne",
                    "prob-subtitle": "Manquez-vous de revenus parce que vos concurrents ont une meilleure image en ligne ?",
                    "prob-card1-title": "Trop peu d'avis Google",
                    "prob-card1-desc": "Les clients hésitent à faire confiance à une entreprise qui n'a pas ou peu d'avis. Ils passent simplement à la suite.",
                    "prob-card2-title": "Les avis négatifs nuisent aux ventes",
                    "prob-card2-desc": "Quelques mauvaises notes sans un flux constant d'avis positifs peuvent faire chuter considérablement votre note globale.",
                    "prob-card3-title": "Des concurrents mieux classés",
                    "prob-card3-desc": "Google favorise les entreprises qui ont des notes élevées et des avis récents sur Google Maps.",
                    "sol-title": "Comment Erupify aide votre entreprise à grandir",
                    "sol-subtitle": "Nous automatisons la collecte de vos avis afin que vous puissiez vous concentrer sur votre activité.",
                    "sol-card1-title": "Collectez des avis facilement",
                    "sol-card1-desc": "Ne réclamez plus jamais d'avis manuellement. Nous offrons des outils simples qui facilitent l'attribution d'une note de 5 étoiles.",
                    "sol-card2-title": "Redirigez les clients satisfaits",
                    "sol-card2-desc": "Notre routage intelligent envoie les clients satisfaits sur Google, tout en capturant les avis négatifs en privé.",
                    "sol-card3-title": "Générez une confiance massive",
                    "sol-card3-desc": "Démarquez-vous dans votre région avec une réputation irréprochable qui attire naturellement de nouveaux clients.",
                    "sol-card4-title": "Améliorez votre SEO local",
                    "sol-card4-desc": "Plus d'avis se traduisent par de meilleures positions sur Google Maps, apportant un trafic organique constant.",
                    "how-title": "Automatisez votre réputation en 3 étapes",
                    "how-subtitle": "Nous rendons l'expérience fluide pour vos clients et entièrement autonome pour vous.",
                    "how-step1-title": "Création de page intelligente",
                    "how-step1-desc": "Nous créons une landing page personnalisée à l'image de votre marque pour convertir vos clients en évaluateurs.",
                    "how-step2-title": "Partagez avec vos clients",
                    "how-step2-desc": "Les clients scannent un code QR sur place ou cliquent sur un lien envoyé par SMS/Email après leur achat.",
                    "how-step3-title": "Obtenez des avis en continu",
                    "how-step3-desc": "Les clients satisfaits laissent facilement leur avis 5 étoiles sur Google, boostant immédiatement votre réputation.",
                    "tools-title": "Outils Interactifs",
                    "tools-subtitle": "Calculateurs et tests gratuits pour mesurer votre performance digitale et vos économies grâce à l'automatisation.",
                    "tools-card1-title": "Calculateur de Tarifs",
                    "tools-card1-desc": "Calculez le tarif de votre forfait personnalisé en fonction de vos points de vente et options.",
                    "tools-card1-btn": "Calculer le Tarif",
                    "tools-card2-title": "Score Digital d'Entreprise",
                    "tools-card2-desc": "Évaluez la maturité digitale de votre entreprise grâce à notre quiz de 20 questions.",
                    "tools-card2-btn": "Faire le Test",
                    "tools-card3-title": "Calculateur de ROI",
                    "tools-card3-desc": "Estimez les gains financiers et le temps économisé grâce à l'automatisation des avis clients.",
                    "tools-card3-btn": "Calculer le ROI",
                    "tools-card4-title": "Calculateur IA vs Humain",
                    "tools-card4-desc": "Comparez le coût d'un employé traditionnel avec celui d'un agent IA pour gérer vos messages et appels.",
                    "tools-card4-btn": "Comparer les Coûts",
                    "tools-card5-title": "Calculateur du Coût des Avis",
                    "tools-card5-desc": "Calculez le coût d'achat des avis par rapport à Erupify et découvrez vos économies mensuelles et annuelles.",
                    "tools-card5-btn": "Calculer les Économies",
                    "rc-lbl-visitors": "Clients Quotidiens",
                    "rc-lbl-days": "Jours de Travail par Mois",
                    "rc-lbl-price": "Prix par Avis",
                    "rc-out-monthly-reviews": "Avis Mensuels",
                    "rc-out-annual-reviews": "Avis Annuels",
                    "rc-out-monthly-cost": "Achat d'Avis (Mensuel)",
                    "rc-out-annual-cost": "Achat d'Avis (Annuel)",
                    "rc-out-monthly-saving": "Économies Erupify (Mensuel)",
                    "rc-out-annual-saving": "Économies Erupify (Annuel)",
                    "rc-out-roi": "ROI",
                    "price-title": "Des tarifs simples et transparents",
                    "price-subtitle": "Investissez dans votre réputation et observez votre chiffre d'affaires décoller.",
                    "price-monthly": "Mensuel",
                    "price-annual": "Annuel",
                    "price-save": "Économisez 20%",
                    "price-starter-desc": "Pour les petites entreprises locales.",
                    "price-starter-f1": "Configuration de page d'avis de base",
                    "price-starter-f2": "Lien direct vers Google Reviews",
                    "price-starter-f3": "Code QR standard",
                    "price-starter-f4": "Support par email",
                    "price-starter-btn": "Choisir Starter",
                    "price-business-desc": "Pour les établissements en croissance.",
                    "price-business-f1": "Système d'avis avancé",
                    "price-business-f2": "Capture d'avis négatifs en privé",
                    "price-business-f3": "Code QR personnalisé",
                    "price-business-f4": "Rapport analytique mensuel",
                    "price-business-btn": "Choisir Business",
                    "price-pro-desc": "Gestion complète de la réputation.",
                    "price-pro-f1": "Tout ce qui est inclus dans Business",
                    "price-pro-f2": "Intégration API SMS/Email",
                    "price-pro-f3": "Réponses automatisées aux avis",
                    "price-pro-f4": "Support prioritaire 24h/24 & 7j/7",
                    "price-pro-btn": "Choisir Pro",
                    "price-popular": "Le Plus Populaire",
                    "modal-name": "Nom Complet",
                    "modal-business": "Nom de l'Entreprise",
                    "modal-email": "Adresse Email",
                    "modal-phone": "Téléphone",
                    "modal-success-btn": "Fermer",
                    "calc-locations": "Nombre de points de vente",
                    "calc-addon1": "Capture d'avis négatifs (+29/mois)",
                    "calc-addon2": "Pack QR personnalisé (+19/mois)",
                    "calc-addon3": "Réponses automatisées par IA (+49/mois)",
                    "calc-billing": "Cycle de facturation",
                    "calc-plan-type": "Forfait Recommandé",
                    "calc-total-cost": "Prix Total",
                    "quiz-intro-desc": "Répondez à ce questionnaire rapide de 20 questions pour analyser la numérisation de votre entreprise et identifier les blocages d'automatisation.",
                    "quiz-yes": "Oui",
                    "quiz-no": "Non",
                    "quiz-lead-desc": "Saisissez vos coordonnées pour générer votre rapport et vos recommandations d'automatisation personnalisées.",
                    "quiz-view-results": "Obtenir le Rapport",
                    "quiz-score-label": "Votre Score",
                    "quiz-losing-msg": "Votre entreprise perd des clients potentiels en raison de l'absence de systèmes d'automatisation.",
                    "roi-lbl-clients": "Clients Mensuels",
                    "roi-lbl-conversion": "Taux d'Avis Actuel (%)",
                    "roi-lbl-profit": "Valeur Moyenne par Client",
                    "roi-out-profit": "Chiffre d'Affaires Additionnel Annuel",
                    "roi-out-time": "Temps Économisé (Annuel)",
                    "roi-out-rate": "ROI Annuel Estimé",
                    "ai-lbl-messages": "Messages Quotidiens",
                    "ai-lbl-calls": "Appels Quotidiens",
                    "ai-lbl-employees": "Nombre d'Employés Support",
                    "ai-out-human": "Coût du Personnel (Annuel)",
                    "ai-out-agent": "Coût de l'Agent IA (Annuel)",
                    "ai-out-savings": "Économies Nettes (Annuel)",
                    "quiz-question-1": "Avez-vous un site web professionnel pour votre entreprise ?",
                    "quiz-question-2": "Votre site web est-il adapté et rapide sur mobile ?",
                    "quiz-question-3": "Avez-vous une fiche d'établissement Google Business active ?",
                    "quiz-question-4": "Collectez-vous les avis clients de manière 100% automatique ?",
                    "quiz-question-5": "Répondez-vous systématiquement à tous les avis clients en ligne ?",
                    "quiz-question-6": "Utilisez-vous un logiciel CRM pour suivre vos clients ?",
                    "quiz-question-7": "Utilisez-vous l'application WhatsApp Business ?",
                    "quiz-question-8": "Avez-vous automatisé des réponses ou des parcours sur WhatsApp ?",
                    "quiz-question-9": "Disposez-vous d'un système de prise de rendez-vous en ligne ?",
                    "quiz-question-10": "Envoyez-vous des emails marketing de relance automatiques ?",
                    "quiz-question-11": "Capturez-vous les avis négatifs en privé avant publication ?",
                    "quiz-question-12": "Mesurez-vous la satisfaction client via un score NPS ?",
                    "quiz-question-13": "Diffusez-vous des publicités payantes sur Google ou Meta ?",
                    "quiz-question-14": "Vos leads publicitaires sont-ils envoyés automatiquement au CRM ?",
                    "quiz-question-15": "Envoyez-vous des messages automatiques après un achat ?",
                    "quiz-question-16": "Utilisez-vous l'IA ou des chatbots pour votre support client ?",
                    "quiz-question-17": "Proposez-vous un programme de fidélité digitalisé ?",
                    "quiz-question-18": "Utilisez-vous des outils pour planifier vos réseaux sociaux ?",
                    "quiz-question-19": "Connaissez-vous précisément votre Coût d'Acquisition Client (CAC) ?",
                    "quiz-question-20": "Avez-vous des tableaux de bord pour suivre votre activité ?",
                    "testim-title": "Recommandé par les Entreprises Locales",
                    "testim-subtitle": "Découvrez comment Erupify a transformé la présence en ligne de nos clients.",
                    "testim-1-text": "\"Avant Erupify, nous avions 12 avis. En 3 mois après avoir placé leurs codes QR sur nos tables, nous avons dépassé les 150 avis 5 étoiles. Notre fréquentation n'a jamais été aussi bonne !\"",
                    "testim-1-role": "Propriétaire de Bella Pizza",
                    "testim-2-text": "\"En tant que clinique dentaire, la confiance est primordiale. Erupify automatise parfaitement nos demandes d'avis. Nous sommes maintenant classés #1 sur Google Maps dans notre ville.\"",
                    "testim-2-role": "Manager à la Clinique Bright Smiles",
                    "testim-3-text": "\"La capture des avis négatifs nous sauve la vie. Cela me permet de résoudre le problème d'un client en privé avant qu'il ne se retrouve sur Google. Erupify a tout changé.\"",
                    "testim-3-role": "Agent Immobilier chez Prime Realty",
                    "guar-1-title": "Garantie Satisfait ou Remboursé (14 jours)",
                    "guar-1-desc": "Pas satisfait ? Remboursement intégral, sans poser de questions.",
                    "guar-2-title": "Sans Engagement",
                    "guar-2-desc": "Annulez à tout moment, restez parce que vous aimez les résultats.",
                    "guar-3-title": "Configuration en 24h",
                    "guar-3-desc": "Nous gérons tout. Vous n'avez qu'à approuver.",
                    "faq-title": "Foire Aux Questions",
                    "faq-subtitle": "Vous avez des questions ? Nous avons les réponses.",
                    "faq-q1": "Est-ce conforme aux conditions d'utilisation de Google ?",
                    "faq-a1": "Absolument ! Nous ne créons jamais de faux avis ni n'offrons de récompenses pour des avis positifs. Notre système facilite simplement la tâche à vos vrais clients satisfaits pour partager leur expérience. C'est 100 % conforme aux règles de Google.",
                    "faq-q2": "Dois-je avoir des connaissances techniques pour utiliser Erupify ?",
                    "faq-a2": "Pas du tout ! Nous gérons toute la configuration pour vous. Une fois votre page et votre code QR prêts, il vous suffit de les partager avec vos clients — aucune compétence technique n'est requise. C'est aussi simple que de montrer un QR code ou d'envoyer un lien.",
                    "faq-q3": "Comment Erupify sépare les avis négatifs des positifs ?",
                    "faq-a3": "Notre système de routage intelligent interroge d'abord les clients sur leur expérience. Les clients satisfaits sont redirigés directement vers Google. Les clients mécontents sont redirigés vers un formulaire de feedback privé, vous donnant la chance de résoudre le problème avant qu'il ne devienne public.",
                    "faq-q4": "À quelle vitesse vais-je voir des résultats ?",
                    "faq-a4": "La plupart de nos clients commencent à recevoir de nouveaux avis 5 étoiles dès la première semaine. En 2 à 3 mois, vous constaterez une augmentation significative de votre note globale et de votre classement local, générant plus de trafic et de ventes.",
                    "faq-q5": "Puis-je annuler mon abonnement à tout moment ?",
                    "faq-a5": "Oui ! Il n'y a pas d'engagement à long terme. Vous pouvez annuler à tout moment. Cependant, la plupart de nos clients restent car ils constatent un retour sur investissement clair dès le premier jour.",
                    "faq-q6": "Et si j'ai déjà des avis négatifs sur Google ?",
                    "faq-a6": "C'est exactement pourquoi vous avez besoin d'Erupify ! En générant un flux constant de nouveaux avis positifs, votre note globale s'améliorera rapidement. Les avis négatifs seront noyés sous une avalanche de vrais avis 5 étoiles.",
                    "cta-title": "Commencez à Développer Votre Réputation Aujourd'hui",
                    "cta-desc": "Arrêtez de perdre des clients face à des concurrents mieux notés. Rejoignez les entreprises intelligentes qui automatisent leur croissance.",
                    "cta-btn1": "Obtenir une Démo",
                    "cta-btn2": "Contactez-nous",
                    "footer-desc": "Transformez votre réputation en ligne en une puissante machine d'acquisition de clients. Collectez des avis, bâtissez la confiance et dominez la recherche locale."
                },
                es: {
                    "nav-problem": "El Problema",
                    "nav-solution": "Solución",
                    "nav-how-it-works": "Cómo funciona",
                    "nav-pricing": "Precios",
                    "nav-tools": "Herramientas",
                    "nav-get-started": "Empezar",
                    "hero-value-prop": "Convierta su reputación online en una máquina de captación de clientes",
                    "hero-title": "Convierta Su Reputación Online En Más Clientes",
                    "hero-desc": "Ayudamos a los negocios locales a recopilar más reseñas en Google sin esfuerzo, generar una confianza masiva y posicionarse mejor.",
                    "hero-demo": "Obtener Demo Gratis",
                    "hero-see-works": "Ver Cómo Funciona ↓",
                    "trust-headline": "Recomendado por más de 100 empresas locales en Marruecos",
                    "trust-served": "Empresas Atendidas",
                    "trust-reviews": "Reseñas Generadas",
                    "prob-title": "La mayoría de las empresas pierden clientes debido a una débil reputación online",
                    "prob-subtitle": "¿Está perdiendo ingresos porque sus competidores se ven mejor en internet?",
                    "prob-card1-title": "Muy pocas reseñas en Google",
                    "prob-card1-desc": "Los clientes dudan en confiar en un negocio con pocas o ninguna reseña. Simplemente eligen la siguiente opción.",
                    "prob-card2-title": "Las reseñas negativas dañan las ventas",
                    "prob-card2-desc": "Unas pocas calificaciones bajas sin un flujo constante de reseñas positivas pueden bajar drásticamente su nota media.",
                    "prob-card3-title": "Competidores mejor posicionados",
                    "prob-card3-desc": "Google favorece a los negocios con valoraciones altas y reseñas recientes en los resultados de búsqueda local.",
                    "sol-title": "Cómo ayuda Erupify a crecer a su negocio",
                    "sol-subtitle": "Automatizamos la recopilación de reseñas para que pueda enfocarse en dirigir su negocio.",
                    "sol-card1-title": "Recopile reseñas fácilmente",
                    "sol-card1-desc": "No vuelva a pedir reseñas de forma manual. Ofrecemos herramientas sencillas que facilitan la valoración con 5 estrellas.",
                    "sol-card2-title": "Redirija a los clientes satisfechos",
                    "sol-card2-desc": "Nuestro enrutamiento inteligente envía a los clientes satisfechos directamente a Google, capturando críticas negativas en privado.",
                    "sol-card3-title": "Genere una confianza masiva",
                    "sol-card3-desc": "Destaque en su zona local con una reputación brillante que atraiga a nuevos clientes de forma natural.",
                    "sol-card4-title": "Mejore su SEO local",
                    "sol-card4-desc": "Más reseñas se traducen en mejores posiciones en Google Maps, atrayendo más tráfico a su establecimiento.",
                    "how-title": "Automatice su reputación en 3 pasos",
                    "how-subtitle": "Hacemos que el proceso sea sencillo para sus clientes y completamente autónomo para usted.",
                    "how-step1-title": "Configuración de página inteligente",
                    "how-step1-desc": "Creamos una landing page personalizada con la imagen de su marca para convertir clientes en reseñas.",
                    "how-step2-title": "Comparta con sus clientes",
                    "how-step2-desc": "Los clientes escanean un código QR en su local o hacen clic en un enlace enviado por SMS o email tras su compra.",
                    "how-step3-title": "Observe crecer sus reseñas",
                    "how-step3-desc": "Los clientes satisfechos valoran con 5 estrellas en Google fácilmente, impulsando su presencia online al instante.",
                    "tools-title": "Herramientas Interactivas",
                    "tools-subtitle": "Calculadoras y pruebas gratuitas para medir el rendimiento digital de su empresa y sus ahorros con automatización.",
                    "tools-card1-title": "Calculadora de Precios",
                    "tools-card1-desc": "Calcule el precio de su plan personalizado en función de sus establecimientos y opciones.",
                    "tools-card1-btn": "Calcular Plan",
                    "tools-card2-title": "Puntaje Digital del Negocio",
                    "tools-card2-desc": "Evalúe el nivel de automatización digital de su empresa con nuestro test de 20 preguntas.",
                    "tools-card2-btn": "Realizar Test",
                    "tools-card3-title": "Calculadora de ROI",
                    "tools-card3-desc": "Estime las ganancias financieras y el tiempo ahorrado mediante la automatización de reseñas de clientes.",
                    "tools-card3-btn": "Calcular ROI",
                    "tools-card4-title": "Calculadora de IA vs Humano",
                    "tools-card4-desc": "Compare el coste de un empleado tradicional con el de un agente de IA para gestionar mensajes y llamadas.",
                    "tools-card4-btn": "Comparar Costes",
                    "tools-card5-title": "Calculadora de Coste de Reseñas",
                    "tools-card5-desc": "Calcule cuánto cuesta comprar reseñas vs usar Erupify, y vea sus ahorros mensuales y anuales.",
                    "tools-card5-btn": "Calcular Ahorros",
                    "rc-lbl-visitors": "Clientes Diarios",
                    "rc-lbl-days": "Días Laborales por Mes",
                    "rc-lbl-price": "Precio por Reseña",
                    "rc-out-monthly-reviews": "Reseñas Mensuales",
                    "rc-out-annual-reviews": "Reseñas Anuales",
                    "rc-out-monthly-cost": "Compra de Reseñas (Mensual)",
                    "rc-out-annual-cost": "Compra de Reseñas (Anual)",
                    "rc-out-monthly-saving": "Ahorro Erupify (Mensual)",
                    "rc-out-annual-saving": "Ahorro Erupify (Anual)",
                    "rc-out-roi": "ROI",
                    "price-title": "Precios simples y transparentes",
                    "price-subtitle": "Invierta en su reputación y observe cómo se disparan sus beneficios.",
                    "price-monthly": "Mensual",
                    "price-annual": "Anual",
                    "price-save": "Ahorre un 20%",
                    "price-starter-desc": "Para pequeñas empresas locales.",
                    "price-starter-f1": "Configuración básica de página de reseñas",
                    "price-starter-f2": "Enlace directo a Google Reviews",
                    "price-starter-f3": "Código QR estándar",
                    "price-starter-f4": "Soporte por correo electrónico",
                    "price-starter-btn": "Obtener Starter",
                    "price-business-desc": "Para establecimientos en crecimiento.",
                    "price-business-f1": "Sistema de reseñas avanzado",
                    "price-business-f2": "Captura de opiniones negativas en privado",
                    "price-business-f3": "Código QR personalizado",
                    "price-business-f4": "Informe analítico mensual",
                    "price-business-btn": "Obtener Business",
                    "price-pro-desc": "Gestión completa de reputación.",
                    "price-pro-f1": "Todo lo incluido en Business",
                    "price-pro-f2": "Integraciones API SMS/Email",
                    "price-pro-f3": "Respuestas automáticas a reseñas",
                    "price-pro-f4": "Soporte prioritario 24h/24 & 7d/7",
                    "price-pro-btn": "Obtener Pro",
                    "price-popular": "Más Popular",
                    "modal-name": "Nombre Completo",
                    "modal-business": "Nombre del Negocio",
                    "modal-email": "Correo Electrónico",
                    "modal-phone": "Teléfono",
                    "modal-success-btn": "Cerrar",
                    "calc-locations": "Número de establecimientos",
                    "calc-addon1": "Captura de opiniones negativas (+29/mes)",
                    "calc-addon2": "Paquete QR personalizado (+19/mes)",
                    "calc-addon3": "Respuesta automática por IA (+49/mes)",
                    "calc-billing": "Ciclo de facturación",
                    "calc-plan-type": "Plan Recomendado",
                    "calc-total-cost": "Precio Total",
                    "quiz-intro-desc": "Realice esta prueba rápida de 20 preguntas para analizar la digitalización de su negocio e identificar cuellos de botella de automatización.",
                    "quiz-yes": "Sí",
                    "quiz-no": "No",
                    "quiz-lead-desc": "Introduzca sus datos para generar su informe de rendimiento digital y recibir recomendaciones de automatización.",
                    "quiz-view-results": "Obtener Informe Digital",
                    "quiz-score-label": "Su Puntaje",
                    "quiz-losing-msg": "Su empresa está perdiendo clientes potenciales debido a la falta de sistemas de automatización.",
                    "roi-lbl-clients": "Clientes Mensuales",
                    "roi-lbl-conversion": "Tasa de Opiniones Actual (%)",
                    "roi-lbl-profit": "Valor Medio por Cliente",
                    "roi-out-profit": "Ingresos Anuales Adicionales",
                    "roi-out-time": "Tiempo Ahorrado (Anual)",
                    "roi-out-rate": "ROI Anual Estimado",
                    "ai-lbl-messages": "Mensajes Diarios",
                    "ai-lbl-calls": "Llamadas Diarias",
                    "ai-lbl-employees": "Número de Empleados de Soporte",
                    "ai-out-human": "Coste del Personal (Anual)",
                    "ai-out-agent": "Coste del Agente IA (Anual)",
                    "ai-out-savings": "Ahorro Neto (Anual)",
                    "quiz-question-1": "¿Tiene un sitio web profesional para su empresa?",
                    "quiz-question-2": "¿Su sitio web es rápido y apto para móviles?",
                    "quiz-question-3": "¿Tiene un perfil de Google Business activo?",
                    "quiz-question-4": "¿Recopila reseñas de clientes de manera automática?",
                    "quiz-question-5": "¿Responde a todas las opiniones online que recibe?",
                    "quiz-question-6": "¿Utiliza un sistema CRM para gestionar clientes?",
                    "quiz-question-7": "¿Utiliza una cuenta de WhatsApp Business?",
                    "quiz-question-8": "¿Ha automatizado respuestas o flujos en WhatsApp?",
                    "quiz-question-9": "¿Dispone de un sistema de reservas online?",
                    "quiz-question-10": "¿Realiza campañas de email marketing automatizadas?",
                    "quiz-question-11": "¿Captura reseñas negativas de forma privada antes de publicarse?",
                    "quiz-question-12": "¿Mide la satisfacción del cliente de forma periódica (NPS)?",
                    "quiz-question-13": "¿Realiza anuncios pagados en Google o Meta?",
                    "quiz-question-14": "¿Se integran los leads automáticamente con su CRM o ventas?",
                    "quiz-question-15": "¿Envía mensajes de seguimiento automáticos tras una compra?",
                    "quiz-question-16": "¿Utiliza inteligencia artificial o bots para atención al cliente?",
                    "quiz-question-17": "¿Ofrece un programa de fidelización digital a sus clientes?",
                    "quiz-question-18": "¿Usa herramientas para programar redes sociales automáticamente?",
                    "quiz-question-19": "¿Conoce con exactitud su Coste de Adquisición de Cliente (CAC)?",
                    "quiz-question-20": "¿Tiene paneles de control para monitorizar sus estadísticas directamente?",
                    "testim-title": "Con la Confianza de Empresas Locales",
                    "testim-subtitle": "Vea cómo Erupify ha transformado la presencia online de nuestros clientes.",
                    "testim-1-text": "\"Antes de Erupify, teníamos 12 reseñas. En 3 meses de colocar sus códigos QR, alcanzamos más de 150 reseñas de 5 estrellas. ¡Nuestra afluencia nunca ha sido mejor!\"",
                    "testim-1-role": "Dueño de Bella Pizza",
                    "testim-2-text": "\"Como clínica dental, la confianza lo es todo. Erupify automatiza perfectamente nuestras solicitudes de reseñas. Ahora somos el número 1 en Google Maps en nuestra ciudad.\"",
                    "testim-2-role": "Gerente en la Clínica Bright Smiles",
                    "testim-3-text": "\"La captura de opiniones negativas es un salvavidas. Me permite resolver el problema de un cliente en privado antes de que llegue a Google. Erupify lo cambia todo.\"",
                    "testim-3-role": "Agente Inmobiliario en Prime Realty",
                    "guar-1-title": "Garantía de Devolución de 14 Días",
                    "guar-1-desc": "¿No está satisfecho? Reembolso completo, sin preguntas.",
                    "guar-2-title": "Sin Contratos a Largo Plazo",
                    "guar-2-desc": "Cancele en cualquier momento, quédese porque le encantan los resultados.",
                    "guar-3-title": "Configuración en 24 Horas",
                    "guar-3-desc": "Nos encargamos de todo. Usted solo aprueba.",
                    "faq-title": "Preguntas Frecuentes",
                    "faq-subtitle": "¿Tiene preguntas? Tenemos respuestas.",
                    "faq-q1": "¿Es esto compatible con los Términos de Servicio de Google?",
                    "faq-a1": "¡Absolutamente! Nunca creamos reseñas falsas ni incentivamos a los clientes a dejar comentarios positivos. Nuestro sistema simplemente facilita que sus clientes reales compartan su experiencia en Google. Esto cumple 100% con las políticas de Google.",
                    "faq-q2": "¿Necesito conocimientos técnicos para usar Erupify?",
                    "faq-a2": "¡Para nada! Manejamos toda la configuración por usted. Una vez que su página y código QR estén listos, solo tiene que compartirlos con sus clientes. Es tan sencillo como mostrar un código QR o enviar un enlace.",
                    "faq-q3": "¿Cómo separa Erupify las opiniones negativas de las reseñas positivas?",
                    "faq-a3": "Nuestro sistema inteligente pregunta a los clientes sobre su experiencia primero. Los clientes felices van directamente a Google. Los clientes descontentos son redirigidos a un formulario privado, dándole la oportunidad de resolver el problema antes de que sea público.",
                    "faq-q4": "¿Qué tan rápido veré resultados?",
                    "faq-a4": "La mayoría de nuestros clientes ven nuevas reseñas de 5 estrellas en la primera semana. En 2-3 meses, notará un gran impulso en su calificación de Google y su posicionamiento local, atrayendo más tráfico y ventas.",
                    "faq-q5": "¿Puedo cancelar mi suscripción en cualquier momento?",
                    "faq-a5": "¡Sí! No hay contratos a largo plazo. Puede cancelar en cualquier momento. Sin embargo, la mayoría de nuestros clientes se quedan porque ven un retorno de inversión claro desde el primer día.",
                    "faq-q6": "¿Qué pasa si ya tengo reseñas negativas en Google?",
                    "faq-a6": "¡Es exactamente por eso que necesita Erupify! Al generar un flujo constante de nuevas reseñas positivas, su calificación general mejorará rápidamente. Las reseñas negativas quedarán enterradas bajo una avalancha de opiniones de 5 estrellas.",
                    "cta-title": "Comience a Crecer su Reputación Hoy",
                    "cta-desc": "Deje de perder clientes frente a competidores con mejores reseñas. Únase a las empresas inteligentes que automatizan su crecimiento.",
                    "cta-btn1": "Obtener Demo",
                    "cta-btn2": "Contáctenos",
                    "footer-desc": "Convierta su reputación online en una potente máquina de adquisición de clientes. Recopile reseñas, genere confianza y domine la búsqueda local."
                }
            };

            let currentLang = 'en';

            window.changeLanguage = function (lang) {
                currentLang = lang;
                const isRtl = lang === 'ar';
                document.body.dir = isRtl ? 'rtl' : 'ltr';
                document.documentElement.lang = lang;
                document.body.classList.toggle('lang-ar', isRtl);

                // Sync dropdowns
                document.getElementById('lang-select').value = lang;

                // Update text content
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                            el.placeholder = TRANSLATIONS[lang][key];
                        } else {
                            el.innerHTML = TRANSLATIONS[lang][key];
                        }
                    }
                });

                // Update quiz question if active
                if (window.quizActive) {
                    updateQuizQuestionDisplay();
                }

                // Update other elements
                updatePrices();
                updatePricingCalculation();
                calculateRoi();
                calculateAiSavings();
                calculateReviewCost();
            };

            // ── Multi-Currency Conversion System ─────────────────────────
            let currentCurrency = 'USD';
            const CURRENCY_RATES = {
                USD: 1.0,
                MAD: 10.0,
                EUR: 0.92
            };
            const CURRENCY_SYMBOLS = {
                USD: '$',
                MAD: ' DH',
                EUR: '€'
            };

            window.changeCurrency = function (curr) {
                currentCurrency = curr;
                document.getElementById('currency-select').value = curr;

                updatePrices();
                updatePricingCalculation();
                calculateRoi();
                calculateAiSavings();
                calculateReviewCost();
            };

            window.formatPrice = function (usdAmount) {
                const converted = Math.round(usdAmount * CURRENCY_RATES[currentCurrency]);
                if (currentCurrency === 'MAD') {
                    return converted.toLocaleString() + ' DH';
                } else if (currentCurrency === 'EUR') {
                    return '€' + converted.toLocaleString();
                } else {
                    return '$' + converted.toLocaleString();
                }
            };

            // ── Pricing Toggle ──────────────────────────────────────
            const ANNUAL_DISCOUNT = 20;
            window.currentBillingMode = 'annual';

            window.setBilling = function (mode) {
                const isAnnual = mode === 'annual';
                window.currentBillingMode = mode;

                // Toggle button styles
                document.getElementById('btn-monthly').classList.toggle('active', !isAnnual);
                document.getElementById('btn-annual').classList.toggle('active', isAnnual);

                // Show/hide badge in annual button
                const badge = document.getElementById('annual-badge');
                if (badge) {
                    badge.style.display = (isAnnual && ANNUAL_DISCOUNT > 0) ? 'inline-block' : 'none';
                }

                // Update each pricing card
                document.querySelectorAll('.pricing-card[data-monthly]').forEach(card => {
                    const monthly = parseFloat(card.dataset.monthly);
                    const amountEl = card.querySelector('.price-amount');
                    const periodEl = card.querySelector('.price-period');
                    const noteEl = card.querySelector('.price-note');

                    if (isAnnual) {
                        const annual = monthly * 12;
                        const discounted = ANNUAL_DISCOUNT > 0
                            ? Math.round(annual * (1 - ANNUAL_DISCOUNT / 100))
                            : annual;
                        amountEl.textContent = formatPrice(discounted);
                        periodEl.textContent = currentLang === 'ar' ? '/سنويا' : (currentLang === 'fr' || currentLang === 'es' ? '/an' : '/yr');
                        noteEl.textContent = ANNUAL_DISCOUNT > 0
                            ? (currentLang === 'ar' ? 'بدلاً من ' + formatPrice(annual) + '/سنويا' :
                                (currentLang === 'fr' ? 'au lieu de ' + formatPrice(annual) + '/an' :
                                    (currentLang === 'es' ? 'en vez de ' + formatPrice(annual) + '/an' : 'instead of ' + formatPrice(annual) + '/yr')))
                            : '';
                    } else {
                        amountEl.textContent = formatPrice(monthly);
                        periodEl.textContent = currentLang === 'ar' ? '/شهريا' : (currentLang === 'fr' || currentLang === 'es' ? '/mois' : '/mo');
                        noteEl.textContent = '';
                    }
                });
            }

            window.updatePrices = function () {
                setBilling(window.currentBillingMode);
            };

            // Initial call to set billing
            setBilling('annual');

            // ── Modal Triggers for Tools ──────────────────────────────
            window.openToolModal = function (modalId) {
                document.getElementById(modalId).classList.add('active');
                if (modalId === 'pricingCalcModal') {
                    updatePricingCalculation();
                } else if (modalId === 'roiCalcModal') {
                    calculateRoi();
                } else if (modalId === 'aiAssistantModal') {
                    calculateAiSavings();
                } else if (modalId === 'reviewCostModal') {
                    calculateReviewCost();
                }
            };

            window.closeToolModal = function (modalId) {
                document.getElementById(modalId).classList.remove('active');
                if (modalId === 'digitalScoreModal') {
                    // Reset quiz state when closing
                    setTimeout(resetQuizState, 300);
                }
            };

            // Intercept all clicks outside tool modals
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        closeToolModal(overlay.id);
                    }
                });
            });

            // ── Tool 1: Pricing Calculator Logic ──────────────────────
            window.updatePricingCalculation = function () {
                const slider = document.getElementById('locations-slider');
                const locations = parseInt(slider.value);
                document.getElementById('locations-value').textContent = locations;

                const addFeedback = document.getElementById('addon-feedback').checked;
                const addQr = document.getElementById('addon-qr').checked;
                const addAi = document.getElementById('addon-ai').checked;
                const billingCycle = document.getElementById('pricing-cycle').value;

                // Base Plan definition based on locations
                let basePlan = 'Starter';
                let monthlyBasePrice = 7;

                if (locations > 1 && locations <= 3) {
                    basePlan = 'Business';
                    monthlyBasePrice = 99;
                } else if (locations > 3) {
                    basePlan = 'Pro';
                    monthlyBasePrice = 199;
                }

                // Add-ons addition
                let addonsTotal = 0;
                if (addFeedback) addonsTotal += 29;
                if (addQr) addonsTotal += 19;
                if (addAi) addonsTotal += 49;

                // Apply location multiplier (e.g. baseline is for 1, 2-3 locations counts base, or multiplier)
                // Let's multiply base price by location factor for simplicity
                let locationsFactor = 1;
                if (basePlan === 'Starter') {
                    locationsFactor = 1;
                } else if (basePlan === 'Business') {
                    // locations: 2 or 3
                    locationsFactor = locations === 3 ? 1.4 : 1.0;
                } else {
                    // locations: 4 to 10
                    locationsFactor = 1.0 + (locations - 4) * 0.2; // +20% per additional location
                }

                let totalMonthly = (monthlyBasePrice * locationsFactor) + addonsTotal;

                // If annual billing, apply 20% discount
                let displayPrice = totalMonthly;
                let displayPeriod = '/ month';

                if (billingCycle === 'annual') {
                    const totalAnnual = totalMonthly * 12 * 0.8;
                    displayPrice = Math.round(totalAnnual);
                    displayPeriod = currentLang === 'ar' ? '/سنويا' : (currentLang === 'fr' || currentLang === 'es' ? '/an' : '/yr');
                } else {
                    displayPrice = Math.round(totalMonthly);
                    displayPeriod = currentLang === 'ar' ? '/شهريا' : (currentLang === 'fr' || currentLang === 'es' ? '/mois' : '/mo');
                }

                // Format plan name translated if needed
                let planDisplay = basePlan;
                if (currentLang === 'ar') {
                    planDisplay = basePlan === 'Starter' ? 'Starter (مبتدئ)' : (basePlan === 'Business' ? 'Business (تجاري)' : 'Pro (احترافي)');
                }

                document.getElementById('calc-plan-name').textContent = planDisplay;
                document.getElementById('calc-total-price').textContent = formatPrice(displayPrice);
                document.getElementById('calc-period-label').textContent = displayPeriod;
            };

            // ── Tool 2: Business Digital Score Quiz Logic ──────────────
            let quizAnswers = [];
            window.quizActive = false;
            let currentQuestionIdx = 0;

            const totalQuestions = 20;

            window.startQuiz = function () {
                window.quizActive = true;
                currentQuestionIdx = 0;
                quizAnswers = [];
                document.getElementById('quiz-intro-step').style.display = 'none';
                document.getElementById('quiz-question-step').style.display = 'block';
                updateQuizQuestionDisplay();
            };

            window.answerQuiz = function (answer) {
                quizAnswers.push(answer);
                currentQuestionIdx++;

                if (currentQuestionIdx < totalQuestions) {
                    updateQuizQuestionDisplay();
                } else {
                    // Quiz questions completed, show lead capture step
                    document.getElementById('quiz-question-step').style.display = 'none';
                    document.getElementById('quiz-lead-step').style.display = 'block';
                }
            };

            function updateQuizQuestionDisplay() {
                const progressFill = document.getElementById('quiz-progress-fill');
                const progressText = document.getElementById('quiz-progress-text');
                const questionText = document.getElementById('quiz-question-text');

                const percent = Math.round((currentQuestionIdx / totalQuestions) * 100);
                progressFill.style.width = percent + '%';

                const qNumber = currentQuestionIdx + 1;

                // Translated progress text
                if (currentLang === 'ar') {
                    progressText.textContent = 'السؤال ' + qNumber + ' من ' + totalQuestions;
                } else if (currentLang === 'fr') {
                    progressText.textContent = 'Question ' + qNumber + ' sur ' + totalQuestions;
                } else if (currentLang === 'es') {
                    progressText.textContent = 'Pregunta ' + qNumber + ' de ' + totalQuestions;
                } else {
                    progressText.textContent = 'Question ' + qNumber + ' of ' + totalQuestions;
                }

                // Load translated question
                const qKey = 'quiz-question-' + qNumber;
                if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][qKey]) {
                    questionText.textContent = TRANSLATIONS[currentLang][qKey];
                } else {
                    // Fallback to English from TRANSLATIONS object
                    questionText.textContent = TRANSLATIONS['en'][qKey];
                }
            }

            window.submitQuizForm = function (e) {
                e.preventDefault();
                // In a real app, send data (Name, Email, Phone, quizAnswers) to backend here.

                // Calculate final score
                const yesCount = quizAnswers.filter(a => a === true).length;
                const score = Math.round((yesCount / totalQuestions) * 100);

                // Show result step
                document.getElementById('quiz-lead-step').style.display = 'none';
                document.getElementById('quiz-result-step').style.display = 'block';

                document.getElementById('quiz-score-num').textContent = score + '/100';

                // Display score messages
                let headline = '';
                let losingMsg = '';

                if (score < 40) {
                    if (currentLang === 'ar') {
                        headline = 'أداء رقمي ضعيف جداً!';
                        losingMsg = 'مشروعك يفقد الكثير من الزبائن المحتملين بسبب غياب أنظمة الأتمتة والتحول الرقمي. نقترح عليك التواصل معنا فوراً.';
                    } else if (currentLang === 'fr') {
                        headline = 'Maturité digitale critique !';
                        losingMsg = 'Votre entreprise perd de nombreux clients potentiels en raison de l\'absence de systèmes d\'automatisation.';
                    } else if (currentLang === 'es') {
                        headline = '¡Madurez digital crítica!';
                        losingMsg = 'Su negocio está perdiendo clientes potenciales debido a la falta de sistemas de automatización.';
                    } else {
                        headline = 'Critical Digital Score!';
                        losingMsg = 'Your business is losing potential customers due to missing automation systems.';
                    }
                } else if (score >= 40 && score < 75) {
                    if (currentLang === 'ar') {
                        headline = 'أداء رقمي متوسط';
                        losingMsg = 'لديك بعض الأنظمة الرقمية ولكنك تفقد فرصاً ثمينة. أتمتة جمع التقييمات ستصنع فرقاً هائلاً في أرباحك.';
                    } else if (currentLang === 'fr') {
                        headline = 'Maturité digitale moyenne';
                        losingMsg = 'Vous avez quelques outils en place, mais vous manquez des opportunités majeures. L\'automatisation des avis boostera vos ventes.';
                    } else if (currentLang === 'es') {
                        headline = 'Madurez digital intermedia';
                        losingMsg = 'Tiene algunas herramientas, pero se está perdiendo grandes oportunidades. La automatización de opiniones impulsará sus ventas.';
                    } else {
                        headline = 'Moderate Digital Maturity';
                        losingMsg = 'Your business has some digital presence, but missing key automation holds your revenue back.';
                    }
                } else {
                    if (currentLang === 'ar') {
                        headline = 'أداء رقمي ممتاز!';
                        losingMsg = 'عملك منظم بشكل جيد جداً! أتمتة الأنظمة ودمج الذكاء الاصطناعي سيساعدك على التوسع والتفوق التام على منافسيك.';
                    } else if (currentLang === 'fr') {
                        headline = 'Excellente maturité digitale !';
                        losingMsg = 'Votre entreprise est bien digitalisée ! Optimiser vos avis et intégrer l\'IA vous aidera à dominer votre marché.';
                    } else if (currentLang === 'es') {
                        headline = '¡Excelente madurez digital!';
                        losingMsg = 'Su empresa está bien digitalizada. Optimizar sus opiniones e integrar IA le ayudará a liderar el mercado.';
                    } else {
                        headline = 'Excellent Digital Score!';
                        losingMsg = 'Good job! Your business has decent digital systems, but there is still room to optimize reviews and AI.';
                    }
                }

                document.getElementById('quiz-result-headline').textContent = headline;
                document.getElementById('quiz-result-step').querySelector('p').textContent = losingMsg;
            };

            function resetQuizState() {
                window.quizActive = false;
                document.getElementById('quiz-intro-step').style.display = 'block';
                document.getElementById('quiz-question-step').style.display = 'none';
                document.getElementById('quiz-lead-step').style.display = 'none';
                document.getElementById('quiz-result-step').style.display = 'none';
                document.getElementById('quizLeadForm').reset();
            }

            // ── Tool 3: ROI Calculator Logic ─────────────────────────
            window.calculateRoi = function () {
                const clients = parseFloat(document.getElementById('roi-clients').value) || 0;
                const conversion = parseFloat(document.getElementById('roi-conversion').value) || 0;
                const profit = parseFloat(document.getElementById('roi-profit').value) || 0;

                // Let's assume automation reviews bring a 15% increase in conversion and revenue
                const additionalRevenueUsd = clients * 12 * (conversion / 100) * profit * 0.15;
                const hoursSaved = Math.round(clients * 12 * 0.25); // 15 mins saved per client

                // Assuming pricing is equivalent to Erupify Business Plan ($1188 / yr base)
                const planCostUsd = 1188;
                const roiPercent = planCostUsd > 0 ? Math.round((additionalRevenueUsd / planCostUsd) * 100) : 0;

                document.getElementById('roi-result-revenue').textContent = formatPrice(Math.round(additionalRevenueUsd));
                document.getElementById('roi-result-time').textContent = hoursSaved.toLocaleString() + ' hrs';
                document.getElementById('roi-result-percent').textContent = roiPercent + '%';
            };

            // ── Tool 4: AI Assistant Cost Calculator Logic ────────────
            window.calculateAiSavings = function () {
                const messages = parseFloat(document.getElementById('ai-messages').value) || 0;
                const calls = parseFloat(document.getElementById('ai-calls').value) || 0;
                const employees = parseFloat(document.getElementById('ai-employees').value) || 0;

                // Human cost equivalent: $6,000 USD/year per employee (which is MAD 60,000 / €5,500 equivalent)
                const employeeAnnualUsd = employees * 6000;

                // AI cost definition: $1,188/yr subscription fee + usage charges:
                // $0.05 per message, $0.20 per call
                const annualMessagesFee = messages * 365 * 0.05;
                const annualCallsFee = calls * 365 * 0.20;
                const aiAnnualUsd = 1188 + annualMessagesFee + annualCallsFee;

                const savingsUsd = Math.max(0, employeeAnnualUsd - aiAnnualUsd);

                document.getElementById('ai-result-human').textContent = formatPrice(Math.round(employeeAnnualUsd));
                document.getElementById('ai-result-agent').textContent = formatPrice(Math.round(aiAnnualUsd));
                document.getElementById('ai-result-savings').textContent = formatPrice(Math.round(savingsUsd));
            };

            // ── Tool 5: Review Cost Calculator Logic ──────────────────
            window.calculateReviewCost = function () {
                const visitors = parseFloat(document.getElementById('rc-visitors').value) || 0;
                const days = parseFloat(document.getElementById('rc-days').value) || 30;
                const pricePerReviewInput = parseFloat(document.getElementById('rc-price').value) || 0;

                // Convert input price from selected currency to USD
                const pricePerReviewUsd = pricePerReviewInput / CURRENCY_RATES[currentCurrency];

                // Reviews calculation
                const monthlyReviews = visitors * days;
                const annualReviews = monthlyReviews * 12;

                // Cost of buying reviews (in USD)
                const monthlyCostUsd = monthlyReviews * pricePerReviewUsd;
                const annualCostUsd = annualReviews * pricePerReviewUsd;

                // Erupify subscription cost (Business plan = $99/mo)
                const erupifyMonthlyUsd = 99;
                const erupifyAnnualUsd = erupifyMonthlyUsd * 12;

                // Savings
                const monthlySavingUsd = Math.max(0, monthlyCostUsd - erupifyMonthlyUsd);
                const annualSavingUsd = Math.max(0, annualCostUsd - erupifyAnnualUsd);

                // ROI
                const roi = erupifyAnnualUsd > 0 ? Math.round((annualSavingUsd / erupifyAnnualUsd) * 100) : 0;

                // Display results dynamically based on current currency
                document.getElementById('rc-monthly-reviews').textContent = monthlyReviews.toLocaleString();
                document.getElementById('rc-annual-reviews').textContent = annualReviews.toLocaleString();
                document.getElementById('rc-monthly-cost').textContent = formatPrice(monthlyCostUsd);
                document.getElementById('rc-annual-cost').textContent = formatPrice(annualCostUsd);
                document.getElementById('rc-monthly-saving').textContent = formatPrice(monthlySavingUsd);
                document.getElementById('rc-annual-saving').textContent = formatPrice(annualSavingUsd);
                document.getElementById('rc-roi').textContent = roi + '%';
            };

            // ── Theme Carousel ──────────────────────────────────
            const track = document.getElementById('themeTrack');
            const dotsContainer = document.getElementById('themeDots');
            const totalSlides = track ? track.children.length : 0;
            let currentSlide = 0;

            if (track && totalSlides > 0) {
                // Build dots
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'theme-dot' + (i === 0 ? ' active' : '');
                    dot.onclick = () => goToSlide(i);
                    dotsContainer.appendChild(dot);
                }

                function goToSlide(index) {
                    currentSlide = (index + totalSlides) % totalSlides;
                    track.style.transform = `translateX(-${currentSlide * 100}%)`;
                    document.querySelectorAll('.theme-dot').forEach((d, i) => {
                        d.classList.toggle('active', i === currentSlide);
                    });
                }

                window.slideTheme = function (dir) { goToSlide(currentSlide + dir); };

                // Auto-advance every 3s
                setInterval(() => goToSlide(currentSlide + 1), 3000);
            }

            // ── FAQ Accordion ──────────────────────────────────────
            window.toggleFaq = function (btn) {
                const item = btn.parentElement;
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('open');

                // Close all items first
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-answer').style.maxHeight = null;
                });

                // Toggle clicked item
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            };
            // ── Form Modal Logic ───────────────────────────────────
            const modal = document.getElementById('contactModal');
            const contactLinks = document.querySelectorAll('a[href="#contact"]');

            window.openModal = function () {
                modal.classList.add('active');
            };

            window.closeModal = function () {
                modal.classList.remove('active');
                // Reset form state after closing
                setTimeout(() => {
                    document.getElementById('leadForm').style.display = 'block';
                    document.getElementById('formSuccess').style.display = 'none';
                    document.getElementById('leadForm').reset();
                }, 300);
            };

            // Intercept all #contact links
            contactLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal();
                });
            });

            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // Handle form submission
            window.submitForm = function (e) {
                e.preventDefault();
                // In a real app, send data to backend here.

                // Show success message
                document.getElementById('leadForm').style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
            };
        });
