// ══════════════════════════════════════════
//  CURSOR
// ══════════════════════════════════════════
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = -999, my = -999, rx = -999, ry = -999;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function cursorLoop() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px'; }
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll('a, button, [data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => ring?.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring?.classList.remove('hovered'));
});

// ══════════════════════════════════════════
//  LOADER
// ══════════════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('out');
    // trigger hero animations
    setTimeout(() => {
      document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);
  }, 1100);
});

// ══════════════════════════════════════════
//  NAVBAR SCROLL
// ══════════════════════════════════════════
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
}, { passive: true });

// ══════════════════════════════════════════
//  ACTIVE NAV LINK
// ══════════════════════════════════════════
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link, .mob-link');
  let current = '';
  sections.forEach(s => {
    if (s.getBoundingClientRect().top < 120) current = s.id;
  });
  links.forEach(l => {
    const href = l.getAttribute('href');
    l.classList.toggle('active', href === '#' + current);
  });
}





const mobileLinks = document.querySelectorAll('.mob-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute('id');
        }

    });

    mobileLinks.forEach(link => {

        link.classList.remove('mobile-active');

        if (
            link.getAttribute('href') === `#${current}`
        ) {

            link.classList.add('mobile-active');

        }

    });

});





// ══════════════════════════════════════════
//  MOBILE MENU
// ══════════════════════════════════════════
const menuBtn     = document.getElementById('menu-btn');
const mobileMenu  = document.getElementById('mobile-menu');

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    menuBtn?.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// close on outside click
mobileMenu?.addEventListener('click', e => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove('open');
    menuBtn?.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ══════════════════════════════════════════
//  THEME TOGGLE
// ══════════════════════════════════════════
const themeBtn = document.getElementById('theme-btn');
let isDark = true;

themeBtn?.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀' : '🌙';
});

// ══════════════════════════════════════════
//  LANGUAGE TOGGLE — full bilingual
// ══════════════════════════════════════════
const langBtn = document.getElementById('lang-btn');
let isAr = true;

const TRANSLATIONS = {
  // Nav
  'nav-featured':    { ar: 'المقالات',   en: 'Articles' },
  'nav-categories':  { ar: 'الأقسام',    en: 'Categories' },
  'nav-guides':      { ar: 'الأدلة',     en: 'Guides' },
  'nav-tutorials':   { ar: 'الشروحات',   en: 'Tutorials' },
  'nav-contact':     { ar: 'التواصل',    en: 'Contact' },
  // Hero
  'hero-badge':      { ar: 'محتوى تقني حصري', en: 'Exclusive Tech Content' },
  'hero-h1-1':       { ar: 'اكتشف', en: 'Discover' },
  'hero-h1-2':       { ar: 'عالم التقنية', en: 'Technology' },
  'hero-h1-3':       { ar: 'بمنظور مختلف', en: 'A New Perspective' },
  'hero-desc':       { ar: 'مدونة تقنية متخصصة في البرمجة وتطوير الويب والحلول التقنية. محتوى عربي عالي الجودة يبسّط المعقد.', en: 'A specialized tech blog covering programming, web development, and technical solutions — premium Arabic content that simplifies complexity.' },
  'hero-btn-p':      { ar: 'استعرض المقالات', en: 'Browse Articles' },
  'hero-btn-s':      { ar: 'تصفح الأقسام', en: 'Explore Categories' },
  'hero-stat-1-n':   { ar: '١٢٠+', en: '120+' },
  'hero-stat-1-l':   { ar: 'مقال منشور', en: 'Articles' },
  'hero-stat-2-n':   { ar: '١٥ك+', en: '15k+' },
  'hero-stat-2-l':   { ar: 'قارئ شهري', en: 'Monthly Readers' },
  'hero-stat-3-n':   { ar: '٦', en: '6' },
  'hero-stat-3-l':   { ar: 'أقسام تقنية', en: 'Tech Categories' },
  // Marquee items
  'mq-1': { ar: 'برمجة', en: 'Programming' },
  'mq-2': { ar: 'تطوير ويب', en: 'Web Dev' },
  'mq-3': { ar: 'تيليغرام', en: 'Telegram' },
  'mq-4': { ar: 'تطبيقات', en: 'Apps' },
  'mq-5': { ar: 'حلول تقنية', en: 'Tech Solutions' },
  'mq-6': { ar: 'تقنية', en: 'Technology' },
  // Section eyebrows
  'ey-featured':    { ar: 'المقالات المميزة', en: 'Featured Articles' },
  'ey-categories':  { ar: 'الأقسام', en: 'Categories' },
  'ey-guides':      { ar: 'الأدلة الشائعة', en: 'Popular Guides' },
  'ey-split':       { ar: 'ما ستجده هنا', en: 'What You\'ll Find' },
  'ey-tutorials':   { ar: 'أحدث الشروحات', en: 'Latest Tutorials' },
  'ey-faq':         { ar: 'الأسئلة الشائعة', en: 'FAQ' },
  'ey-contact':     { ar: 'التواصل', en: 'Contact' },
  // Section titles
  'tt-featured':    { ar: 'أحدث ما تم نشره', en: 'Latest Published' },
  'tt-categories':  { ar: 'تصفح حسب الاهتمام', en: 'Browse by Interest' },
  'tt-guides':      { ar: 'أكثر الأدلة قراءةً', en: 'Most-Read Guides' },
  'tt-split':       { ar: 'منصة معرفية متكاملة', en: 'A Complete Knowledge Platform' },
  'tt-tutorials':   { ar: 'شروحات خطوة بخطوة', en: 'Step-by-Step Tutorials' },
  'tt-faq':         { ar: 'أسئلة يطرحها القراء', en: 'Reader Questions' },
  'tt-contact':     { ar: 'تواصل معنا', en: 'Get in Touch' },
  // See all
  'see-featured':   { ar: 'عرض الكل ←', en: 'View All →' },
  'see-guides':     { ar: 'جميع الأدلة ←', en: 'All Guides →' },
  'see-tutorials':  { ar: 'جميع الشروحات ←', en: 'All Tutorials →' },
  // Cards — titles
  'card-1-title':   { ar: 'دليل React الشامل: من الأساسيات إلى المشاريع', en: 'Complete React Guide: From Basics to Projects' },
  'card-1-cat':     { ar: 'برمجة', en: 'Programming' },
  'card-1-exc':     { ar: 'تعلم React من الصفر مع Hooks وContext وRouter وأفضل الممارسات في بناء تطبيقات حديثة.', en: 'Learn React from scratch with Hooks, Context, Router and best practices for building modern apps.' },
  'card-2-title':   { ar: 'إنشاء بوت تيليغرام احترافي بـ Python', en: 'Build a Professional Telegram Bot with Python' },
  'card-2-cat':     { ar: 'تيليغرام', en: 'Telegram' },
  'card-3-title':   { ar: 'تحسين أداء موقعك: دليل Core Web Vitals', en: 'Boost Your Site Speed: Core Web Vitals Guide' },
  'card-3-cat':     { ar: 'تطوير ويب', en: 'Web Dev' },
  // Cats
  'cat-tech':     { ar: 'تقنية',       en: 'Technology' },
  'cat-prog':     { ar: 'برمجة',       en: 'Programming' },
  'cat-tg':       { ar: 'تيليغرام',   en: 'Telegram' },
  'cat-apps':     { ar: 'تطبيقات',    en: 'Apps' },
  'cat-web':      { ar: 'تطوير ويب',  en: 'Web Dev' },
  // Guides
  'g1-title': { ar: 'دليل المبتدئ الكامل لتعلم البرمجة من الصفر', en: 'Complete Beginner\'s Guide to Learning Programming' },
  'g1-desc':  { ar: 'خارطة طريق واضحة تبدأ من الأساسيات وصولاً إلى مشاريع حقيقية', en: 'A clear roadmap from programming basics to real-world projects' },
  'g2-title': { ar: 'كل ما تحتاجه عن Next.js في 2025', en: 'Everything You Need About Next.js in 2025' },
  'g2-desc':  { ar: 'App Router وServer Components والنشر على Vercel بمشاريع تطبيقية', en: 'App Router, Server Components and deploying to Vercel with practical projects' },
  'g3-title': { ar: 'إتقان Git وGitHub من المبتدئ للمحترف', en: 'Master Git and GitHub: Beginner to Pro' },
  'g3-desc':  { ar: 'التحكم بالإصدارات والتعاون في المشاريع وأفضل الممارسات', en: 'Version control, project collaboration and best practices' },
  'g4-title': { ar: 'بناء تطبيقات تيليغرام: البوتات والمنصات', en: 'Building Telegram Apps: Bots and Platforms' },
  'g4-desc':  { ar: 'بناء بوتات احترافية والاستفادة من API تيليغرام لأتمتة المهام', en: 'Build professional bots and leverage Telegram API to automate tasks' },
  // Split items
  'sp1-t': { ar: 'مقالات برمجية عمق تقني', en: 'Deep Technical Articles' },
  'sp1-d': { ar: 'محتوى يأخذك إلى ما وراء السطح لفهم كيف تعمل الأشياء فعلاً', en: 'Content that goes beneath the surface to understand how things truly work' },
  'sp2-t': { ar: 'شروحات تطبيقية مفصّلة', en: 'Detailed Practical Tutorials' },
  'sp2-d': { ar: 'خطوة بخطوة مع أمثلة كود حقيقية قابلة للتطبيق الفوري', en: 'Step-by-step with real code examples you can apply immediately' },
  'sp3-t': { ar: 'حلول لمشاكل يومية', en: 'Everyday Problem Solutions' },
  'sp3-d': { ar: 'أجوبة مباشرة للأخطاء والمشاكل التي تواجه المطورين يومياً', en: 'Direct answers to errors and problems developers face daily' },
  'sp4-t': { ar: 'موارد ومراجع مختارة', en: 'Curated Resources & References' },
  'sp4-d': { ar: 'أفضل الأدوات والمكتبات والمراجع الموثوقة في كل مجال', en: 'Best tools, libraries and trusted references in every field' },
  // FAQ
  'faq1-q': { ar: 'ما هو تخصص هذه المدونة؟', en: 'What is this blog about?' },
  'faq1-a': { ar: 'مدونة محمد رضا متخصصة في المحتوى التقني العربي الشامل: البرمجة وتطوير الويب وشروحات التطبيقات والحلول التقنية.', en: "Mohamed Reda's blog specializes in comprehensive Arabic tech content: programming, web development, app tutorials, and technical solutions." },
  'faq2-q': { ar: 'هل المحتوى مجاني؟', en: 'Is the content free?' },
  'faq2-a': { ar: 'نعم، جميع المقالات والأدلة والشروحات متاحة مجاناً. الهدف نشر المعرفة التقنية باللغة العربية للجميع.', en: 'Yes, all articles, guides and tutorials are completely free. The goal is spreading technical knowledge in Arabic for everyone.' },
  'faq3-q': { ar: 'كيف أتابع أحدث المقالات؟', en: 'How do I follow new articles?' },
  'faq3-a': { ar: 'يمكنك الاشتراك في النشرة البريدية أو متابعتنا على تيليغرام ليصلك كل جديد فور نشره.', en: 'Subscribe to the newsletter or follow us on Telegram to receive every new post instantly.' },
  'faq4-q': { ar: 'هل يمكنني اقتراح موضوع؟', en: 'Can I suggest a topic?' },
  'faq4-a': { ar: 'بالتأكيد! نرحب دائماً بالاقتراحات. تواصل معنا عبر نموذج التواصل أو مباشرة على تيليغرام.', en: 'Absolutely! We always welcome suggestions. Contact us via the contact form or directly on Telegram.' },
  'faq5-q': { ar: 'ما مستوى المحتوى؟', en: 'What level is the content?' },
  'faq5-a': { ar: 'المدونة تستهدف جميع المستويات — من المبتدئ الذي يبدأ رحلته إلى المحترف الذي يبحث عن تعمق أكبر.', en: 'The blog targets all levels — from beginners starting their journey to professionals seeking deeper understanding.' },
  // Contact
  'ci-email-t': { ar: 'البريد الإلكتروني', en: 'Email' },
  'ci-email-v': { ar: 'contact@mohamedreda.blog', en: 'contact@mohamedreda.blog' },
  'ci-tg-t':    { ar: 'تيليغرام', en: 'Telegram' },
  'ci-tg-v':    { ar: '@MohamedRedaBlog', en: '@MohamedRedaBlog' },
  'ci-loc-t':   { ar: 'الموقع', en: 'Location' },
  'ci-loc-v':   { ar: 'مصر — متاح دولياً', en: 'Egypt — Available Worldwide' },
  'ci-time-t':  { ar: 'وقت الرد', en: 'Response Time' },
  'ci-time-v':  { ar: 'خلال ٢٤ ساعة', en: 'Within 24 hours' },
  'cf-name':    { ar: 'الاسم الكامل', en: 'Full Name' },
  'cf-email':   { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'cf-sub':     { ar: 'الموضوع', en: 'Subject' },
  'cf-msg':     { ar: 'الرسالة', en: 'Message' },
  'cf-ph-name': { ar: 'أدخل اسمك...', en: 'Your name...' },
  'cf-ph-email':{ ar: 'email@example.com', en: 'email@example.com' },
  'cf-ph-sub':  { ar: 'موضوع رسالتك...', en: 'Your subject...' },
  'cf-ph-msg':  { ar: 'اكتب رسالتك هنا...', en: 'Write your message here...' },
  'cf-send':    { ar: 'إرسال الرسالة', en: 'Send Message' },
  // Footer
  'ft-desc': { ar: 'مدونة تقنية متخصصة تقدم محتوى عربياً عالي الجودة في البرمجة وتطوير الويب والحلول التقنية.', en: 'A specialized tech blog delivering high-quality Arabic content in programming, web development and technical solutions.' },
  'ft-col1': { ar: 'الأقسام', en: 'Categories' },
  'ft-col2': { ar: 'روابط', en: 'Links' },
  'ft-col3': { ar: 'تابعنا', en: 'Follow Us' },
  'ft-copy': { ar: '© 2025 محمد رضا. جميع الحقوق محفوظة.', en: '© 2025 Mohamed Reda. All rights reserved.' },
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (TRANSLATIONS[key]) {
      const val = TRANSLATIONS[key][lang];
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    }
  });
}

langBtn?.addEventListener('click', () => {
  isAr = !isAr;
  const lang = isAr ? 'ar' : 'en';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('data-lang', lang);
  langBtn.textContent = isAr ? 'EN' : 'AR';
  applyTranslations(lang);
});

// ══════════════════════════════════════════
//  SCROLL REVEAL (re-animates every time)
// ══════════════════════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const cl = e.target.classList;
    if (e.isIntersecting) {
      cl.add('visible');
    } else {
      cl.remove('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObs.observe(el);
});

// ══════════════════════════════════════════
//  FAQ ACCORDION
// ══════════════════════════════════════════
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ══════════════════════════════════════════
//  SMOOTH SCROLL
// ══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ══════════════════════════════════════════
//  PARALLAX HERO BLOBS
// ══════════════════════════════════════════
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-blob-1').forEach(b => {
    b.style.transform = `translate(0, ${y * 0.12}px)`;
  });
  document.querySelectorAll('.hero-blob-2').forEach(b => {
    b.style.transform = `translate(0, ${y * 0.07}px)`;
  });
}, { passive: true });






/* ===== BACK TO TOP ===== */

const backTop = document.getElementById('back-top');

if (backTop) {

    function toggleBackTop() {

        if (window.scrollY > 500) {
            backTop.classList.add('visible');
        } else {
            backTop.classList.remove('visible');
        }

    }

    window.addEventListener('scroll', toggleBackTop);

    toggleBackTop();

    backTop.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });

}
