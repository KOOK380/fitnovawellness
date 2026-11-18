'use client';
// Site-wide motion layer: scroll reveals, 3D tilt + light reflection on cards, layered 3D hero, count-up stats.
// Progressive enhancement only — content is fully visible without JavaScript and for reduced-motion users.
// Uses data-* attributes (not className) so React never fights these changes.
import { useEffect } from 'react';

const REVEAL = [
  '.hm-sec-head', '.hm-prog', '.hm-step', '.hm-track-c', '.hm-founder', '.hm-doc', '.hm-story', '.hm-video', '.hm-mode',
  '.hm-compare-h', '.hm-compare-r', '.hm-faq-i', '.hm-coaches', '.hm-quote', '.pg-card', '.pg-note', '.pg-post', '.pg-coach', '.pg-links a',
  '.pg-text', '.pg-table-wrap', '.hm-guide-cover', '.hm-guide-copy', '.hm-stat', '.pg-map > div', '.pg-cta .hm-hero-ctas',
].join(',');
const TILT = ['.hm-prog', '.hm-founder', '.pg-post', '.hm-mode', '.hm-story', '.hm-guide-cover', '.hm-track-c', '.hm-doc'].join(',');
const MAX_TILT = 7; // degrees

export default function Motion({ level = 'full' }: { level?: 'full' | 'subtle' }) {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.setAttribute('data-motion', 'on');
    const cleanups: (() => void)[] = [];

    // ── Scroll reveal (elements already on screen are shown immediately — no flash) ──
    const vh = window.innerHeight;
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.setAttribute('data-mo-in', ''); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll<HTMLElement>(REVEAL).forEach(el => {
      if (el.closest('.hm-hero, .ft-desk, .ft-mob, .ct')) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) return; // visible at load: leave as is
      const sibs = el.parentElement ? [...el.parentElement.children].filter(c => c.matches(REVEAL)) : [];
      el.style.setProperty('--mo-d', `${Math.min(sibs.indexOf(el), 6) * 70}ms`);
      el.setAttribute('data-mo', '');
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    // Safety net: never leave content hidden. On scroll/resize (and shortly after load), reveal anything that is
    // on or above the screen, even if the observer didn't fire (throttled tabs, old browsers, fast scrolling).
    let sraf = 0;
    const sweep = () => {
      sraf = 0;
      const limit = window.innerHeight * 0.95;
      document.querySelectorAll<HTMLElement>('[data-mo]:not([data-mo-in])').forEach(el => {
        if (el.getBoundingClientRect().top < limit) { el.setAttribute('data-mo-in', ''); io.unobserve(el); }
      });
    };
    const onScroll = () => { if (!sraf) sraf = window.setTimeout(sweep, 60); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const t = window.setTimeout(sweep, 1200);
    cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearTimeout(t); clearTimeout(sraf); });

    // ── Count-up numbers ("1500+", "13+", "6") ──
    const co = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        co.unobserve(e.target);
        const el = e.target as HTMLElement;
        const m = (el.dataset.moFinal || el.textContent || '').match(/^(\D*)(\d[\d,]*)(.*)$/);
        if (!m) continue;
        el.dataset.moFinal = el.textContent || '';
        const target = parseInt(m[2].replace(/,/g, ''), 10);
        const t0 = performance.now(), dur = 1300;
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${m[1]}${Math.round(target * eased)}${m[3]}`;
          if (p < 1) requestAnimationFrame(step); else el.textContent = el.dataset.moFinal || el.textContent;
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.6 });
    document.querySelectorAll<HTMLElement>('.hm-stat-n').forEach(el => co.observe(el));
    cleanups.push(() => co.disconnect());

    // ── 3D tilt + light reflection (mouse / trackpad only) ──
    if (level === 'full' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const tilt = (el: HTMLElement, depth = 1) => {
        if (getComputedStyle(el).position === 'static') el.setAttribute('data-tilt-rel', '');
        el.setAttribute('data-tilt', '');
        let raf = 0;
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            el.style.setProperty('--rx', `${((0.5 - y) * MAX_TILT * 2 * depth).toFixed(2)}deg`);
            el.style.setProperty('--ry', `${((x - 0.5) * MAX_TILT * 2 * depth).toFixed(2)}deg`);
            el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
            el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
            el.setAttribute('data-tilting', '');
          });
        };
        const leave = () => { cancelAnimationFrame(raf); el.removeAttribute('data-tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      };
      document.querySelectorAll<HTMLElement>(TILT).forEach(el => tilt(el));

      // Hero: the whole photo + floating badges tilt as layers, following the mouse anywhere over the hero
      document.querySelectorAll<HTMLElement>('.hm-hero').forEach(hero => {
        const media = hero.querySelector<HTMLElement>('.hm-hero-media');
        if (!media) return;
        media.setAttribute('data-hero3d', '');
        let raf = 0;
        const move = (ev: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            media.style.setProperty('--hx', `${(x * 10).toFixed(2)}deg`);
            media.style.setProperty('--hy', `${(-y * 8).toFixed(2)}deg`);
            media.style.setProperty('--px', `${(x * 12).toFixed(1)}px`);
            media.style.setProperty('--py', `${(y * 10).toFixed(1)}px`);
          });
        };
        const leave = () => { for (const [k, v] of [['--hx', '0deg'], ['--hy', '0deg'], ['--px', '0px'], ['--py', '0px']]) media.style.setProperty(k, v); };
        hero.addEventListener('pointermove', move);
        hero.addEventListener('pointerleave', leave);
        cleanups.push(() => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); });
      });
    }

    // ── Hero depth on scroll: photo and badges drift at different speeds as the hero leaves the screen ──
    if (level === 'full') {
      const media = document.querySelector<HTMLElement>('.hm-hero .hm-hero-media');
      if (media) {
        media.setAttribute('data-hero3d', '');
        let praf = 0;
        const para = () => {
          praf = 0;
          const y = Math.min(window.scrollY, window.innerHeight);
          media.style.setProperty('--sy', `${y.toFixed(0)}px`);
        };
        const onPara = () => { if (!praf) praf = requestAnimationFrame(para); };
        window.addEventListener('scroll', onPara, { passive: true });
        cleanups.push(() => { window.removeEventListener('scroll', onPara); cancelAnimationFrame(praf); });
      }
    }

    root.setAttribute('data-motion-level', level);
    return () => { cleanups.forEach(f => f()); root.removeAttribute('data-motion'); root.removeAttribute('data-motion-level'); };
  }, []);
  return null;
}
