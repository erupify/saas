import re

file_path = "C:/Users/LENOVO/Desktop/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add data-i18n to HTML

replacements = {
    '<h2 class="mb-2">Trusted by Local Businesses</h2>': '<h2 class="mb-2" data-i18n="testim-title">Trusted by Local Businesses</h2>',
    '<p style="color: var(--text-light);">See how Erupify has transformed our clients\' online presence.</p>': '<p style="color: var(--text-light);" data-i18n="testim-subtitle">See how Erupify has transformed our clients\' online presence.</p>',
    
    # Testimonials
    '<p>"Before Erupify, we had 12 reviews. Within 3 months of placing their QR codes on our tables, we hit\n                    over 150 5-star reviews. Our foot traffic has never been better!"</p>': '<p data-i18n="testim-1-text">"Before Erupify, we had 12 reviews. Within 3 months of placing their QR codes on our tables, we hit\\n                    over 150 5-star reviews. Our foot traffic has never been better!"</p>',
    '<p style="font-size: 13px; color: var(--text-light);">Owner of Bella Pizza</p>': '<p style="font-size: 13px; color: var(--text-light);" data-i18n="testim-1-role">Owner of Bella Pizza</p>',
    
    '<p>"As a dental clinic, trust is everything. Erupify automates our review requests perfectly. We now\n                    rank #1 on Google Maps for \'Dentist near me\' in our city."</p>': '<p data-i18n="testim-2-text">"As a dental clinic, trust is everything. Erupify automates our review requests perfectly. We now\\n                    rank #1 on Google Maps for \'Dentist near me\' in our city."</p>',
    '<p style="font-size: 13px; color: var(--text-light);">Manager at Bright Smiles Clinic</p>': '<p style="font-size: 13px; color: var(--text-light);" data-i18n="testim-2-role">Manager at Bright Smiles Clinic</p>',
    
    '<p>"The negative feedback capture is a lifesaver. It lets me fix a client\'s issue privately before it\n                    ever hits Google. Erupify is an absolute game changer."</p>': '<p data-i18n="testim-3-text">"The negative feedback capture is a lifesaver. It lets me fix a client\'s issue privately before it\\n                    ever hits Google. Erupify is an absolute game changer."</p>',
    '<p style="font-size: 13px; color: var(--text-light);">Real Estate Agent at Prime Realty</p>': '<p style="font-size: 13px; color: var(--text-light);" data-i18n="testim-3-role">Real Estate Agent at Prime Realty</p>',
    
    # Guarantees banner
    '<strong>14-Day Money-Back Guarantee</strong>': '<strong data-i18n="guar-1-title">14-Day Money-Back Guarantee</strong>',
    '<span>Not satisfied? Full refund, no questions asked.</span>': '<span data-i18n="guar-1-desc">Not satisfied? Full refund, no questions asked.</span>',
    '<strong>No Long-Term Contracts</strong>': '<strong data-i18n="guar-2-title">No Long-Term Contracts</strong>',
    '<span>Cancel anytime, stay because you love the results.</span>': '<span data-i18n="guar-2-desc">Cancel anytime, stay because you love the results.</span>',
    '<strong>Setup in 24 Hours</strong>': '<strong data-i18n="guar-3-title">Setup in 24 Hours</strong>',
    '<span>We handle everything. You just approve it.</span>': '<span data-i18n="guar-3-desc">We handle everything. You just approve it.</span>',
    
    # Guarantees inside Pricing Cards
    '14-Day Money-Back Guarantee\n                </p>': '<span data-i18n="guar-1-title">14-Day Money-Back Guarantee</span>\n                </p>',
    'Cancel anytime · No contracts</p>': '<span data-i18n="guar-2-title">Cancel anytime · No contracts</span></p>',

    # FAQ
    '<h2 class="mb-2">Frequently Asked Questions</h2>': '<h2 class="mb-2" data-i18n="faq-title">Frequently Asked Questions</h2>',
    '<p style="color: var(--text-light);">Got questions? We\'ve got answers.</p>': '<p style="color: var(--text-light);" data-i18n="faq-subtitle">Got questions? We\'ve got answers.</p>',
    
    'Is this compliant with Google\'s Terms of Service?': '<span data-i18n="faq-q1">Is this compliant with Google\'s Terms of Service?</span>',
    'Do I need to be tech-savvy to use Erupify?': '<span data-i18n="faq-q2">Do I need to be tech-savvy to use Erupify?</span>',
    'How does Erupify separate negative feedback from positive reviews?': '<span data-i18n="faq-q3">How does Erupify separate negative feedback from positive reviews?</span>',
    'How quickly will I see results?': '<span data-i18n="faq-q4">How quickly will I see results?</span>',
    'Can I cancel my subscription at any time?': '<span data-i18n="faq-q5">Can I cancel my subscription at any time?</span>',
    'What if I already have negative reviews on Google?': '<span data-i18n="faq-q6">What if I already have negative reviews on Google?</span>',
    
    '<div class="faq-answer-inner">\n                        Absolutely! We never create fake reviews or incentivize customers to leave positive feedback.\n                        Our system simply makes it <strong>easier</strong> for your real, satisfied customers to share\n                        their experience on Google. This is 100% compliant with Google\'s guidelines.\n                    </div>': '<div class="faq-answer-inner" data-i18n="faq-a1">Absolutely! We never create fake reviews or incentivize customers to leave positive feedback. Our system simply makes it easier for your real, satisfied customers to share their experience on Google. This is 100% compliant with Google\'s guidelines.</div>',
    
    '<div class="faq-answer-inner">\n                        Not at all! We handle the entire setup for you. Once your branded page and QR code are ready,\n                        all you need to do is share them with your customers — no technical knowledge required. It\'s as\n                        simple as showing a QR code or sending a link.\n                    </div>': '<div class="faq-answer-inner" data-i18n="faq-a2">Not at all! We handle the entire setup for you. Once your branded page and QR code are ready, all you need to do is share them with your customers — no technical knowledge required. It\'s as simple as showing a QR code or sending a link.</div>',
    '<div class="faq-answer-inner">\n                        Not at all! We handle the entire setup for you. Once your branded page and QR code are ready,\n                        all you need to do is share them with your customers - no technical knowledge required. It\'s as\n                        simple as showing a QR code or sending a link.\n                    </div>': '<div class="faq-answer-inner" data-i18n="faq-a2">Not at all! We handle the entire setup for you. Once your branded page and QR code are ready, all you need to do is share them with your customers — no technical knowledge required. It\'s as simple as showing a QR code or sending a link.</div>',

    '<div class="faq-answer-inner">\n                        Our smart routing system asks customers about their experience first. Happy customers are\n                        directed straight to your Google review page. Unhappy customers are routed to a private feedback\n                        form instead, giving you the chance to resolve issues <strong>before</strong> they become public\n                        negative reviews.\n                    </div>': '<div class="faq-answer-inner" data-i18n="faq-a3">Our smart routing system asks customers about their experience first. Happy customers are directed straight to your Google review page. Unhappy customers are routed to a private feedback form instead, giving you the chance to resolve issues before they become public negative reviews.</div>',

    '<div class="faq-answer-inner">\n                        Most of our clients start seeing new 5-star reviews within the <strong>first week</strong>.\n                        Within 2-3 months, you can expect a significant boost in your overall Google rating and local\n                        search ranking, leading to more foot traffic and sales.\n                    </div>': '<div class="faq-answer-inner" data-i18n="faq-a4">Most of our clients start seeing new 5-star reviews within the first week. Within 2-3 months, you can expect a significant boost in your overall Google rating and local search ranking, leading to more foot traffic and sales.</div>',

    '<div class="faq-answer-inner">\n                        Yes! There are no long-term contracts. You can cancel your subscription at any time. However,\n                        most of our clients stay because they see a clear and measurable return on investment from day\n                        one.\n                    </div>': '<div class="faq-answer-inner" data-i18n="faq-a5">Yes! There are no long-term contracts. You can cancel your subscription at any time. However, most of our clients stay because they see a clear and measurable return on investment from day one.</div>',

    '<div class="faq-answer-inner">\n                        That\'s exactly why you need Erupify! By generating a consistent stream of new positive reviews,\n                        your overall star rating will improve quickly. The negative reviews get buried under an\n                        avalanche of genuine 5-star feedback from happy customers.\n                    </div>': '<div class="faq-answer-inner" data-i18n="faq-a6">That\'s exactly why you need Erupify! By generating a consistent stream of new positive reviews, your overall star rating will improve quickly. The negative reviews get buried under an avalanche of genuine 5-star feedback from happy customers.</div>',

    # CTA
    '<h2>Start Growing Your Reputation Today</h2>': '<h2 data-i18n="cta-title">Start Growing Your Reputation Today</h2>',
    '<p\n            style="color: var(--text-light); font-size: 18px; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">\n            Stop losing customers to competitors with better reviews. Join the smart businesses automating their growth.\n        </p>': '<p data-i18n="cta-desc"\n            style="color: var(--text-light); font-size: 18px; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">\n            Stop losing customers to competitors with better reviews. Join the smart businesses automating their growth.\n        </p>',
    '<a href="#demo" class="btn btn-primary">Get Your Demo</a>': '<a href="#demo" class="btn btn-primary" data-i18n="cta-btn1">Get Your Demo</a>',
    '<a href="#contact" class="btn btn-secondary">Contact Us</a>': '<a href="#contact" class="btn btn-secondary" data-i18n="cta-btn2">Contact Us</a>',
    
    # Footer
    '<p class="footer-text">Turn your online reputation into a powerful customer-acquisition machine. Collect\n                    reviews, build trust, and dominate local search.</p>': '<p class="footer-text" data-i18n="footer-desc">Turn your online reputation into a powerful customer-acquisition machine. Collect reviews, build trust, and dominate local search.</p>'
}

for k, v in replacements.items():
    k = k.replace('\\n', '\n')
    v = v.replace('\\n', '\n')
    content = content.replace(k, v)

# Now we need to add the json keys
json_en = """
                    "testim-title": "Trusted by Local Businesses",
                    "testim-subtitle": "See how Erupify has transformed our clients' online presence.",
                    "testim-1-text": "\\"Before Erupify, we had 12 reviews. Within 3 months of placing their QR codes on our tables, we hit over 150 5-star reviews. Our foot traffic has never been better!\\"",
                    "testim-1-role": "Owner of Bella Pizza",
                    "testim-2-text": "\\"As a dental clinic, trust is everything. Erupify automates our review requests perfectly. We now rank #1 on Google Maps for 'Dentist near me' in our city.\\"",
                    "testim-2-role": "Manager at Bright Smiles Clinic",
                    "testim-3-text": "\\"The negative feedback capture is a lifesaver. It lets me fix a client's issue privately before it ever hits Google. Erupify is an absolute game changer.\\"",
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
                    "footer-desc": "Turn your online reputation into a powerful customer-acquisition machine. Collect reviews, build trust, and dominate local search.",
"""

json_ar = """
                    "testim-title": "موثوق به من الشركات المحلية",
                    "testim-subtitle": "شاهد كيف ساعدت Erupify في تغيير الحضور الرقمي لعملائنا.",
                    "testim-1-text": "\\"قبل Erupify، كان لدينا 12 تقييم فقط. خلال 3 أشهر من وضع أكواد QR على طاولاتنا، وصلنا لأكثر من 150 تقييم 5 نجوم. عدد زبائننا لم يكن أفضل من الآن!\\"",
                    "testim-1-role": "صاحب مطعم Bella Pizza",
                    "testim-2-text": "\\"كعيادة أسنان، الثقة هي كل شيء. Erupify تقوم بأتمتة طلبات التقييم بشكل مثالي. نحن الآن في المرتبة الأولى على خرائط جوجل في مدينتنا.\\"",
                    "testim-2-role": "مديرة في عيادة Bright Smiles",
                    "testim-3-text": "\\"نظام التقاط الملاحظات السلبية أنقذنا حرفياً. يتيح لي حل مشكلة العميل سراً قبل أن تصل إلى جوجل. Erupify غيّرت اللعبة تماماً.\\"",
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
                    "footer-desc": "حول سمعتك الرقمية إلى آلة قوية لجذب العملاء. اجمع التقييمات، ابنِ الثقة، وسيطر على البحث المحلي.",
"""

json_fr = """
                    "testim-title": "Recommandé par les Entreprises Locales",
                    "testim-subtitle": "Découvrez comment Erupify a transformé la présence en ligne de nos clients.",
                    "testim-1-text": "\\"Avant Erupify, nous avions 12 avis. En 3 mois après avoir placé leurs codes QR sur nos tables, nous avons dépassé les 150 avis 5 étoiles. Notre fréquentation n'a jamais été aussi bonne !\\"",
                    "testim-1-role": "Propriétaire de Bella Pizza",
                    "testim-2-text": "\\"En tant que clinique dentaire, la confiance est primordiale. Erupify automatise parfaitement nos demandes d'avis. Nous sommes maintenant classés #1 sur Google Maps dans notre ville.\\"",
                    "testim-2-role": "Manager à la Clinique Bright Smiles",
                    "testim-3-text": "\\"La capture des avis négatifs nous sauve la vie. Cela me permet de résoudre le problème d'un client en privé avant qu'il ne se retrouve sur Google. Erupify a tout changé.\\"",
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
                    "footer-desc": "Transformez votre réputation en ligne en une puissante machine d'acquisition de clients. Collectez des avis, bâtissez la confiance et dominez la recherche locale.",
"""

json_es = """
                    "testim-title": "Con la Confianza de Empresas Locales",
                    "testim-subtitle": "Vea cómo Erupify ha transformado la presencia online de nuestros clientes.",
                    "testim-1-text": "\\"Antes de Erupify, teníamos 12 reseñas. En 3 meses de colocar sus códigos QR, alcanzamos más de 150 reseñas de 5 estrellas. ¡Nuestra afluencia nunca ha sido mejor!\\"",
                    "testim-1-role": "Dueño de Bella Pizza",
                    "testim-2-text": "\\"Como clínica dental, la confianza lo es todo. Erupify automatiza perfectamente nuestras solicitudes de reseñas. Ahora somos el número 1 en Google Maps en nuestra ciudad.\\"",
                    "testim-2-role": "Gerente en la Clínica Bright Smiles",
                    "testim-3-text": "\\"La captura de opiniones negativas es un salvavidas. Me permite resolver el problema de un cliente en privado antes de que llegue a Google. Erupify lo cambia todo.\\"",
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
                    "footer-desc": "Convierta su reputación online en una potente máquina de adquisición de clientes. Recopile reseñas, genere confianza y domine la búsqueda local.",
"""

# Insert JSON blocks
content = content.replace('"quiz-question-20": "Do you have automated reporting dashboards?"', '"quiz-question-20": "Do you have automated reporting dashboards?",\n' + json_en.strip(',\n'))
content = content.replace('"quiz-question-20": "هل تملك لوحة تحكم رقمية (Dashboard) تعكس إحصائيات عملك مباشرة؟"', '"quiz-question-20": "هل تملك لوحة تحكم رقمية (Dashboard) تعكس إحصائيات عملك مباشرة؟",\n' + json_ar.strip(',\n'))
content = content.replace('"quiz-question-20": "Avez-vous des tableaux de bord pour suivre votre activité ?"', '"quiz-question-20": "Avez-vous des tableaux de bord pour suivre votre activité ?",\n' + json_fr.strip(',\n'))
content = content.replace('"quiz-question-20": "¿Tiene paneles de control para monitorizar sus estadísticas directamente?"', '"quiz-question-20": "¿Tiene paneles de control para monitorizar sus estadísticas directamente?",\n' + json_es.strip(',\n'))

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied!")
