// FitNova content — copied 1:1 from the design files (components/home.jsx, components/footers.jsx).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fitnovawellness.com').replace(/\/$/, '');
export const SITE_NAME = 'FitNova Wellness';

export const HOME = {
  wa: 'https://wa.me/919923357018',
  programs: [
    { t: 'Obesity & Weight Management', d: 'Lose weight that stays off — by fixing why it came on.', tag: 'Most chosen' },
    { t: 'PCOS Lifestyle Program', d: 'Regular cycles, balanced hormones and healthy weight — naturally.', tag: 'Women 20–40' },
    { t: 'Thyroid Health & Metabolism', d: 'Get your energy and metabolism back with thyroid-friendly living.' },
    { t: 'Type 2 Diabetes Management', d: 'Better sugar control, and reversal where possible, under doctor care.' },
    { t: 'Fatty Liver Recovery', d: 'Give your liver a chance to heal through food and lifestyle.' },
    { t: 'Gut Health & Nutrition', d: 'Less bloating, better digestion, stronger immunity.' },
    { t: 'General Wellness', d: 'Stay healthy before problems start — energy, sleep, fitness.' },
  ] as { t: string; d: string; tag?: string }[],
  chips: ['Losing weight', 'PCOS / irregular periods', 'Thyroid & low energy', 'High blood sugar', 'Fatty liver', 'Bloating & acidity', 'Staying healthy'],
  steps: [
    ['Consult', 'A free 1:1 talk with our doctor about your health, history and goals.'],
    ['Assess', 'We review your lab reports, food habits, sleep and stress.'],
    ['Personalise', 'You get a roadmap made for your body and daily routine.'],
    ['Transform', 'Weekly coaching on food, movement, sleep, stress and gut health.'],
    ['Reassess', 'We re-check your markers and fine-tune the plan.'],
  ],
  compare: [
    ['A printed calorie chart', 'A plan built on your lab reports'],
    ['Run by trainers or apps', 'Designed and supervised by doctors'],
    ['Treats the symptom', 'Finds the root cause'],
    ['Crash results, then weight comes back', 'Slow, sustainable change that lasts'],
    ['You are on your own after week two', 'A health coach checks in every week'],
    ['Same plan for everyone', 'Indian home-style meals for your routine'],
  ],
  panel: [
    ['Dr Seema Aiwale', 'Gynaecologist'], ['Dr Priyanka Barge', 'Gynaecologist'],
    ['Dr Sachin Aiwale', 'Orthopaedic Surgeon'], ['Dr Neeta Kukre', 'Physiotherapist'],
    ['Dr Vanita Ghalme', 'Ayurveda Physician'], ['Dr Minal Shinde', 'Homoeopathy Physician'],
  ],
  coaches: ['Deepali P', 'Sunil P', 'Snehal P', 'Ashish P', 'Vrushali M', 'Amita C', 'Payal K', 'Sandeep K', 'Raju S', 'Monica B', 'Reshma N', 'Sonal P'],
  track: [
    ['Blood markers', 'HbA1c, fasting sugar, triglycerides and other lab values.'],
    ['Weight & waist', 'Healthy, steady reduction — not crash numbers.'],
    ['Energy, sleep, digestion', 'How you actually feel, week to week.'],
    ['Medicine needs', 'Reduced only when your treating doctor decides it is safe.'],
  ],
  faq: [
    ['Is the first consultation really free?', 'Yes. Your first 1:1 consultation with our doctor is free, with no obligation to join a program.'],
    ['Do I need to visit the Pune clinic?', 'No. You can visit us on Sinhagad Road, Pune, or consult online from anywhere in India. Coaching happens on WhatsApp and calls.'],
    ['Will I have to stop my medicines?', 'Never on your own. Medicines are reduced only in suitable cases, when your treating doctor decides it is safe.'],
    ['What should I bring to my consultation?', 'Any recent lab reports and a list of current medicines. If you have no reports, our doctor will advise which tests are useful.'],
    ['Will I have to eat special or expensive food?', 'No. Plans use Indian, home-style meals — vegetarian or non-vegetarian — that fit your family kitchen.'],
    ['How do I pay?', 'We accept UPI and cash.'],
  ],
};

export const FOUNDERS = [
  { id: 'archana', img: '/images/dr-archana-shinde.webp', n: 'Dr Archana Shinde', r: 'Co-Founder · MBBS, DA (Anaesthesiology)', c: ['Certified Functional Medicine expert', 'Member, Indian Society of Lifestyle Medicine', 'NHI & ISMN certified nutrition advisor', 'NLP practitioner'] },
  { id: 'jeevan', img: '/images/dr-jeevan-shinde.webp', n: 'Dr Jeevan Shinde', r: 'Founder · MBBS, MS (General & Laparoscopic Surgery)', c: ['General & Laparoscopic Surgeon', 'International certified nutrition advisor', 'Holistic health & integrative dietetics', 'Founder, FitNova Wellness Community'] },
];

export const FOOTER_DATA = {
  address: 'Sinhagad Road, Pune, Maharashtra — 411068',
  phone: '+91 99233 57018',
  phoneHref: 'tel:+919923357018',
  email: 'team.fitnova@gmail.com',
  hours: 'Mon–Sat: 10 AM – 7 PM',
  hoursClosed: 'Sunday Closed',
  whatsapp: 'https://wa.me/919923357018',
  programs: [
    { label: 'Obesity & Weight Management', href: '/programs/obesity-weight-management/' },
    { label: 'PCOS Program', href: '/programs/pcos-lifestyle-program/' },
    { label: 'Thyroid & Metabolism', href: '/programs/thyroid-health-metabolism/' },
    { label: 'Type 2 Diabetes Reversal', href: '/programs/diabetes-type-2-management/' },
    { label: 'Fatty Liver Recovery', href: '/programs/fatty-liver-recovery/' },
    { label: 'Gut Health & Nutrition', href: '/programs/gut-health-nutrition/' },
  ],
  company: [
    { label: 'About the Doctor', href: '/about-founders/' },
    { label: 'Success Stories', href: '/success-stories/' },
    { label: 'How It Works', href: '/how-it-works/' },
    { label: 'Blog', href: '/blogs/' },
    { label: 'Free 7-Day Gut Reset Guide', href: '/free-resource/' },
    { label: 'Contact Us', href: '/contact-us/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms of Service', href: '/terms-conditions/' },
    { label: 'Medical Disclaimer', href: '/disclaimer/' },
    { label: 'Refund Policy', href: '/cancellation-refund/' },
    { label: 'Sitemap', href: '/sitemap/' },
  ],
  socials: [
    { label: 'Instagram', href: '#', icon: 'ig' },
    { label: 'YouTube', href: '#', icon: 'yt' },
    { label: 'Facebook', href: '#', icon: 'fb' },
    { label: 'WhatsApp', href: 'https://wa.me/919923357018', icon: 'wa' },
  ] as { label: string; href: string; icon: 'ig' | 'yt' | 'fb' | 'wa' }[],
  disclaimer:
    'The information on this website is for general educational and informational purposes only and is not intended as medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before starting any program, especially if you have an existing medical condition or are taking medication. FitNova Wellness programs are personalised lifestyle interventions and do not replace prescribed medical care.',
  copyright: '© 2026 FitNova Wellness. All rights reserved.',
  brandLine: 'Doctor-led lifestyle medicine for lasting health — founded by Dr Archana Shinde & Dr Jeevan Shinde.',
};

export const SYMPTOMS = [
  { label: 'Stubborn belly fat', href: '/programs/obesity-weight-management/', emoji: '⌬' },
  { label: 'Irregular periods / PCOS', href: '/programs/pcos-lifestyle-program/', emoji: '◐' },
  { label: 'Tired all day', href: '/programs/thyroid-health-metabolism/', emoji: '◔' },
  { label: 'High sugar levels', href: '/programs/diabetes-type-2-management/', emoji: '◈' },
  { label: 'Fatty liver', href: '/programs/fatty-liver-recovery/', emoji: '◎' },
  { label: 'Bloating & gas', href: '/programs/gut-health-nutrition/', emoji: '⊙' },
  { label: 'Thyroid imbalance', href: '/programs/thyroid-health-metabolism/', emoji: '◉' },
];

export const TOKENS = {
  green: '#1e7a3a',
  lime: '#53b52a',
  family: 'var(--sans)',
  displayFamily: 'var(--serif)',
};

// Contact page (Booking Hub v4) — from components/contact.jsx and contact-variants.jsx
export const CONTACT = {
  brand: 'FitNova Wellness',
  doctor: 'Dr. Jeevan Shinde',
  address1: 'Sinhagad Road, Pune',
  address2: 'Maharashtra — 411068, India',
  phone: '+91 99233 57018',
  phoneRaw: '+919923357018',
  email: 'team.fitnova@gmail.com',
  hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  hoursClosed: 'Sunday closed',
  website: 'fitnovawellness.com',
};

export const CONTACT_FAQ = [
  { q: 'Is the first consultation really free?', a: 'Yes. The introductory 15-minute call is complimentary, with no obligation to sign up for a program.' },
  { q: 'Do you offer online consultations outside Pune?', a: 'Absolutely — we consult with clients across India through online video consultations, with coaching on WhatsApp and calls.' },
  { q: 'How soon will someone get back to me?', a: 'Our care team replies during working hours (Mon–Sat, 10 AM – 7 PM IST).' },
  { q: 'Will my reports and details stay private?', a: 'Always. Patient information is stored securely and never shared without explicit consent.' },
];
