import { useEffect, useRef, useState } from "react";

/**
 * Taalpad — landing page
 * Design system reverse-engineered from rows.gg (paper + ink, Suisse-style grotesk,
 * 9/12/999px radii, warm-tinted shadows, gentle spring motion, reduced-motion honored).
 *
 * Self-contained: all styles are injected via a <style> tag, so this component drops into
 * any React app with no Tailwind or CSS setup. Swap the wordmark "Taalpad" and CTAs as needed.
 */

const CSS = `
:root{
  --paper:#F5F5F2; --paper-2:#F4F4F1; --surface:#FAFAF9; --tint:#E8E8E3; --line:#E4E3DD;
  --ink:#1A191D; --ink-70:rgba(26,25,29,.70); --muted:#7C7C7C; --accent:#2FAA5F;
  --r-btn:9px; --r-card:12px; --r-pill:999px;
  --shadow:rgba(72,66,60,.14) 0 1px 2px, rgba(72,66,60,.16) 0 5px 12px;
  --spring:cubic-bezier(.3,1.5,.4,1); --smooth:cubic-bezier(.2,.72,.25,1);
  --maxw:1120px; --font:'Inter','Suisse Intl','Helvetica Neue',Arial,sans-serif;
}
.tp *{box-sizing:border-box;margin:0;padding:0}
.tp{background:var(--paper);color:var(--ink);font-family:var(--font);font-size:16px;line-height:1.5;
  -webkit-font-smoothing:antialiased;letter-spacing:-.011em}
.tp ::selection{background:var(--ink);color:var(--paper)}
.tp a{color:inherit;text-decoration:none}
.tp .wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}
.tp h1,.tp h2,.tp h3{font-weight:500;letter-spacing:-.03em;line-height:1.05}
.tp p{color:var(--ink-70)}
.tp .eyebrow{font-size:12.5px;font-weight:500;letter-spacing:.02em;color:var(--muted);display:inline-flex;align-items:center;gap:8px}
.tp .eyebrow::before{content:"";width:6px;height:6px;border-radius:var(--r-pill);background:var(--accent)}
.tp .btn{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:500;letter-spacing:-.01em;
  padding:12px 22px;border-radius:var(--r-btn);border:1px solid transparent;cursor:pointer;
  transition:transform .22s var(--spring),background-color .2s var(--smooth),color .2s var(--smooth)}
.tp .btn-primary{background:var(--ink);color:var(--paper)}
.tp .btn-primary:hover{transform:translateY(-2px)}
.tp .btn-ghost{background:transparent;color:var(--ink)}
.tp .btn-ghost .arw{transition:transform .22s var(--spring);display:inline-block}
.tp .btn-ghost:hover .arw{transform:translateX(4px)}
.tp header{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--paper) 82%,transparent);
  backdrop-filter:saturate(1.2) blur(8px);border-bottom:1px solid transparent;transition:border-color .3s var(--smooth)}
.tp header.scrolled{border-bottom-color:var(--line)}
.tp .nav{display:flex;align-items:center;justify-content:space-between;height:64px}
.tp .brand{display:flex;align-items:center;gap:10px;font-weight:600;letter-spacing:-.03em;font-size:16px}
.tp .mark{width:22px;height:22px;border-radius:7px;background:var(--ink);display:inline-grid;place-items:center}
.tp .mark::before{content:"";width:9px;height:9px;border:2px solid var(--paper);border-radius:var(--r-pill)}
.tp .nav-links{display:flex;align-items:center;gap:26px;font-size:14px;color:var(--ink-70)}
.tp .nav-links a{transition:color .2s var(--smooth)} .tp .nav-links a:hover{color:var(--ink)}
.tp .nav-cta{display:flex;align-items:center;gap:14px}
.tp .hero{position:relative;padding:96px 0 40px;overflow:hidden}
.tp .hero-canvas{position:absolute;inset:-10% 0 auto 0;height:340px;width:100%;pointer-events:none;opacity:.9}
.tp .hero-inner{position:relative;max-width:720px;padding-top:150px}
.tp h1.hero-title{font-size:clamp(34px,5.2vw,52px);font-weight:500;letter-spacing:-.035em}
.tp .hero-sub{margin-top:18px;font-size:clamp(16px,2vw,19px);max-width:520px;color:var(--ink-70)}
.tp .hero-cta{margin-top:32px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.tp .hero-fine{margin-top:18px;font-size:13px;color:var(--muted)}
.tp .reveal{opacity:0;transform:translateY(14px);transition:opacity .6s var(--smooth),transform .6s var(--smooth)}
.tp .reveal.in{opacity:1;transform:none}
.tp section{padding:64px 0}
.tp .section-head{max-width:640px;margin-bottom:40px}
.tp .section-head h2{font-size:clamp(26px,3.4vw,34px);margin-top:14px}
.tp .section-head p{margin-top:14px;font-size:17px}
.tp .value{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--paper-2)}
.tp .value .wrap{padding-top:44px;padding-bottom:44px}
.tp .value p{font-size:clamp(20px,2.8vw,27px);font-weight:450;color:var(--ink);letter-spacing:-.025em;max-width:820px;line-height:1.3}
.tp .value p b{font-weight:500}
.tp .grid{display:grid;gap:16px}
.tp .cols-3{grid-template-columns:repeat(3,1fr)}
.tp .card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-card);padding:22px 22px 24px;
  transition:transform .28s var(--spring),box-shadow .28s var(--smooth),border-color .28s var(--smooth)}
.tp .card:hover{transform:translateY(-3px);box-shadow:var(--shadow);border-color:var(--tint)}
.tp .card .k{font-size:12.5px;font-weight:500;color:var(--muted);display:flex;align-items:center;gap:8px}
.tp .card .k .num{width:20px;height:20px;border-radius:var(--r-pill);background:var(--tint);color:var(--ink);
  display:grid;place-items:center;font-size:11px;font-weight:600}
.tp .card h3{font-size:17px;font-weight:500;margin-top:14px;letter-spacing:-.02em}
.tp .card p{margin-top:8px;font-size:14.5px;line-height:1.55}
.tp .flow{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.tp .steps{counter-reset:step;display:flex;flex-direction:column;gap:2px}
.tp .step{display:flex;gap:16px;padding:16px 14px;border-radius:var(--r-card);transition:background-color .2s var(--smooth)}
.tp .step:hover{background:var(--paper-2)}
.tp .step .dot{counter-increment:step;flex:0 0 auto;width:26px;height:26px;border-radius:var(--r-pill);
  border:1px solid var(--tint);background:var(--surface);display:grid;place-items:center;font-size:12px;font-weight:600}
.tp .step .dot::before{content:counter(step)}
.tp .step h4{font-size:15.5px;font-weight:500;letter-spacing:-.02em}
.tp .step p{font-size:14px;margin-top:4px;line-height:1.5}
.tp .flow-visual{position:sticky;top:96px;background:var(--surface);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);padding:20px;overflow:hidden}
.tp .mock-top{display:flex;align-items:center;gap:8px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.tp .tabbtn{font-size:12px;color:var(--muted);padding:5px 10px;border-radius:var(--r-pill);background:var(--paper-2)}
.tp .tabbtn.active{color:var(--ink);background:var(--tint)}
.tp .mock-row{display:flex;align-items:center;gap:10px;padding:12px 4px;border-bottom:1px solid var(--line);font-size:13.5px}
.tp .mock-row:last-child{border-bottom:0}
.tp .mock-row .chk{width:16px;height:16px;border-radius:5px;border:1.5px solid var(--tint);flex:0 0 auto;position:relative}
.tp .mock-row.done .chk{background:var(--ink);border-color:var(--ink)}
.tp .mock-row.done .chk::after{content:"";position:absolute;left:5px;top:2px;width:4px;height:8px;border:solid var(--paper);border-width:0 2px 2px 0;transform:rotate(45deg)}
.tp .mock-row.done span{color:var(--muted);text-decoration:line-through;text-decoration-color:var(--tint)}
.tp .chip{font-size:11px;font-weight:500;padding:3px 9px;border-radius:var(--r-pill);margin-left:auto}
.tp .chip.g{background:rgba(47,170,95,.12);color:#238049}
.tp .chip.n{background:var(--tint);color:var(--ink-70)}
.tp .feat{display:flex;flex-direction:column;gap:12px}
.tp .feat .ic{width:34px;height:34px;border-radius:9px;background:var(--paper-2);border:1px solid var(--line);display:grid;place-items:center}
.tp .feat .ic svg{width:18px;height:18px;stroke:var(--ink);fill:none;stroke-width:1.6}
.tp .feat h3{font-size:16px;font-weight:500;letter-spacing:-.02em}
.tp .feat p{font-size:14.5px;line-height:1.55}
.tp .diff{background:var(--ink);color:var(--paper);border-radius:20px;padding:52px 44px;box-shadow:var(--shadow)}
.tp .diff .eyebrow{color:rgba(245,245,242,.6)} .tp .diff .eyebrow::before{background:var(--accent)}
.tp .diff h2{color:var(--paper);font-size:clamp(24px,3vw,32px);max-width:640px}
.tp .diff-grid{margin-top:36px;display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(245,245,242,.12);border-radius:14px;overflow:hidden}
.tp .diff-cell{background:var(--ink);padding:22px 24px}
.tp .diff-cell .vs{font-size:12.5px;color:rgba(245,245,242,.55);font-weight:500}
.tp .diff-cell p{color:rgba(245,245,242,.82);font-size:14.5px;margin-top:8px;line-height:1.55}
.tp .signal{text-align:center;max-width:680px;margin:0 auto}
.tp .signal h2{font-size:clamp(24px,3.2vw,32px)} .tp .signal p{margin-top:14px;font-size:17px}
.tp .signal .who{margin-top:22px;display:inline-flex;flex-wrap:wrap;gap:8px;justify-content:center}
.tp .signal .who span{font-size:13px;padding:7px 14px;border:1px solid var(--line);border-radius:var(--r-pill);background:var(--surface);color:var(--ink-70)}
.tp .closing{text-align:center;padding:88px 0}
.tp .closing h2{font-size:clamp(30px,4.4vw,48px);font-weight:500;letter-spacing:-.035em}
.tp .closing p{margin-top:16px;font-size:18px}
.tp .closing .hero-cta{justify-content:center;margin-top:30px}
.tp footer{border-top:1px solid var(--line);padding:40px 0;background:var(--paper-2)}
.tp .foot{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
.tp .foot .cols{display:flex;gap:28px;font-size:13.5px;color:var(--ink-70)}
.tp .foot .cols a:hover{color:var(--ink)} .tp .foot .fine{font-size:12.5px;color:var(--muted)}
@media(max-width:860px){.tp .cols-3{grid-template-columns:1fr}.tp .flow{grid-template-columns:1fr;gap:28px}
  .tp .flow-visual{position:static}.tp .diff-grid{grid-template-columns:1fr}.tp .diff{padding:36px 24px}
  .tp .nav-links{display:none}.tp .hero-inner{padding-top:120px}}
@media(prefers-reduced-motion:reduce){.tp *{transition:none!important;animation:none!important}
  .tp .reveal{opacity:1;transform:none}}
`;

const PROBLEMS = [
  ["1", "Scarce resources", "Few good self-study materials", "Compared with English or Japanese, Dutch has far fewer structured, widely available learning products and communities."],
  ["2", "High cost", "Tutors and courses are expensive", "Private tutoring and formal classes can run into hundreds of euros — a steep barrier before you even know a method works."],
  ["3", "Rigid time", "Fixed schedules are hard to keep", "Work, study, and family make long weekly lessons difficult to maintain consistently."],
  ["4", "No method", "Content, but no way to study it", "You have an article or textbook, but not a clear way to know which words matter, what grammar to watch, or how to practice actively."],
  ["5", "Too shallow", "Most apps optimize for streaks", "Quick sessions and isolated vocabulary don't build the real comprehension serious learners are after."],
];

const STEPS = [
  ["Add or choose Dutch material", "Paste an article, upload a PDF, or pick from level-appropriate content."],
  ["Get a structured lesson", "Taalpad turns the material into a guided lesson with a clear learning path."],
  ["Study vocabulary & phrases", "The words, collocations, and expressions that matter for your level and goals."],
  ["Understand grammar in context", "Explanations grounded in your own text, not abstract examples alone."],
  ["Practice, speak & write", "Guided exercises and an AI partner move you from recognition to active use."],
  ["Get feedback & review", "Clear, encouraging corrections — then revisit words, patterns, and mistakes later."],
];

const FEATURES = [
  ["M4 5h16M4 12h10M4 19h7", "Material-to-lesson conversion", "Turn articles, textbook pages, or PDFs into structured lessons."],
  ["M3 7h18M3 12h18M3 17h12", "Vocabulary & phrase extraction", "The words, collocations, and expressions useful for your level and goals."],
  ["M12 3v18M5 8l7-5 7 5", "Contextual grammar guidance", "Grammar explained through your chosen material, in context."],
  ["M4 12l5 5L20 6", "Guided practice", "Exercises that move you from recognition to active use."],
  ["M4 5h16v10H8l-4 4z", "AI conversation practice", "Speak or write with a partner that responds naturally and corrects you."],
  ["M12 20l-1.5-3-3-1.5 3-1.5L12 11l1.5 3 3 1.5-3 1.5z", "Personalized feedback", "Corrections with clear, encouraging explanations of what to improve."],
];

const DIFFS = [
  ["vs. traditional courses", "More flexible and affordable, built around your schedule and your materials."],
  ["vs. private tutors", "Always available, lower cost, endlessly patient — still personalized."],
  ["vs. Duolingo-style apps", "Deeper and more focused: real Dutch material, real ability — not gamified tasks."],
  ["vs. generic AI chatbots", "Not a blank chat box. A clear session flow and Dutch-specific guidance."],
];

function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".tp .reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(i, 4) * 40 + "ms";
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W, H, dpr, pts = [], raf, t = 0;
    const INK = "26,25,29";
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const build = () => {
      pts = [];
      const cx = Math.min(W * 0.34, 380), cy = H * 0.5, N = 260;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const rr = 92 + Math.sin(a * 3) * 14 + (Math.random() * 22 - 11);
        pts.push({ a, rr, cx, cy, sp: 0.15 + Math.random() * 0.35, r: 0.6 + Math.random() * 1.4, o: 0.12 + Math.random() * 0.5 });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.004;
      for (const p of pts) {
        const ang = p.a + t * p.sp, wob = Math.sin(t * 2 + p.a * 5) * 6;
        const x = p.cx + Math.cos(ang) * (p.rr + wob) * 1.9;
        const y = p.cy + Math.sin(ang) * (p.rr + wob) * 0.62;
        ctx.beginPath(); ctx.fillStyle = `rgba(${INK},${p.o})`; ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        const x = p.cx + Math.cos(p.a) * p.rr * 1.9, y = p.cy + Math.sin(p.a) * p.rr * 0.62;
        ctx.beginPath(); ctx.fillStyle = `rgba(${INK},${p.o})`; ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const init = () => { size(); build(); reduce ? drawStatic() : draw(); };
    const onResize = () => { size(); build(); if (reduce) drawStatic(); };
    window.addEventListener("resize", onResize, { passive: true });
    init();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="tp" id="top">
      <style>{CSS}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,450;14..32,500;14..32,600&display=swap" rel="stylesheet" />

      <header className={scrolled ? "scrolled" : ""}>
        <div className="wrap nav">
          <a className="brand" href="#top"><span className="mark" aria-hidden="true" /> Taalpad</a>
          <nav className="nav-links">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#why">Why Taalpad</a>
            <a href="#who">Who it's for</a>
          </nav>
          <div className="nav-cta">
            <a href="#" style={{ fontSize: 14, color: "var(--ink-70)" }}>Sign in</a>
            <a href="#start" className="btn btn-primary">Create your first lesson</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <HeroCanvas />
          <div className="wrap">
            <div className="hero-inner">
              <span className="eyebrow reveal">Dutch, learned deeply</span>
              <h1 className="hero-title reveal" style={{ marginTop: 16 }}>Turn any Dutch material into your own language lesson.</h1>
              <p className="hero-sub reveal">Learn with a structured, AI-guided learning experience — vocabulary, grammar, practice, conversation, and feedback, built from the material you choose.</p>
              <div className="hero-cta reveal">
                <a href="#start" className="btn btn-primary">Create your first lesson</a>
                <a href="#how" className="btn btn-ghost">See how it works <span className="arw" aria-hidden="true">→</span></a>
              </div>
              <p className="hero-fine reveal">Bring an article, a textbook page, or a PDF. 10–30 focused minutes per session.</p>
            </div>
          </div>
        </section>

        <section className="value" style={{ padding: 0 }}>
          <div className="wrap reveal">
            <p>Learn Dutch deeply with the materials you choose, at your own pace — <b>without expensive courses or fixed schedules.</b></p>
          </div>
        </section>

        <section id="why">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">The problem</span>
              <h2>Dutch learners face a hard trade-off.</h2>
              <p>You have the motivation and often the material. What's missing is a method — and everything else is either too expensive, too rigid, or too shallow.</p>
            </div>
            <div className="grid cols-3">
              {PROBLEMS.map(([n, k, h, p]) => (
                <div className="card reveal" key={n}>
                  <div className="k"><span className="num">{n}</span> {k}</div>
                  <h3>{h}</h3><p>{p}</p>
                </div>
              ))}
              <div className="card reveal" style={{ background: "var(--paper-2)", borderStyle: "dashed" }}>
                <div className="k"><span className="num" style={{ background: "var(--ink)", color: "var(--paper)" }}>→</span> The gap</div>
                <h3>A repeatable method for your own material</h3>
                <p>That's the piece Taalpad adds — structure around the content you already care about.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">How it works</span>
              <h2>Bring the material. Get a lesson.</h2>
              <p>Every session follows the same deliberate flow — the kind of structure a thoughtful tutor would give you.</p>
            </div>
            <div className="flow">
              <div className="steps">
                {STEPS.map(([h, p], i) => (
                  <div className="step reveal" key={i}><div className="dot" /><div><h4>{h}</h4><p>{p}</p></div></div>
                ))}
              </div>
              <div className="flow-visual reveal" aria-hidden="true">
                <div className="mock-top">
                  <span className="tabbtn active">Lesson</span>
                  <span className="tabbtn">Vocab</span>
                  <span className="tabbtn">Practice</span>
                  <span className="chip n" style={{ marginLeft: "auto" }}>B1 · article</span>
                </div>
                <div className="mock-row done"><span className="chk" /><span>Read: "De verkiezingen in Nederland"</span><span className="chip g">done</span></div>
                <div className="mock-row done"><span className="chk" /><span>12 key words &amp; phrases</span><span className="chip g">done</span></div>
                <div className="mock-row"><span className="chk" /><span>Grammar: de/het &amp; word order</span><span className="chip n">now</span></div>
                <div className="mock-row"><span className="chk" /><span>Guided practice · 6 items</span><span className="chip n">next</span></div>
                <div className="mock-row"><span className="chk" /><span>Speak with your AI tutor</span><span className="chip n">next</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">What you get</span>
              <h2>Everything a lesson needs, generated from your material.</h2>
            </div>
            <div className="grid cols-3">
              {FEATURES.map(([d, h, p], i) => (
                <div className="feat card reveal" key={i}>
                  <div className="ic"><svg viewBox="0 0 24 24"><path d={d} /></svg></div>
                  <h3>{h}</h3><p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="diff">
          <div className="wrap reveal">
            <div className="diff">
              <span className="eyebrow">Not another streak app</span>
              <h2 style={{ marginTop: 14 }}>A structured method — with AI as the engine, not the story.</h2>
              <div className="diff-grid">
                {DIFFS.map(([vs, p], i) => (
                  <div className="diff-cell" key={i}><div className="vs">{vs}</div><p>{p}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="who">
          <div className="wrap">
            <div className="signal reveal">
              <span className="eyebrow" style={{ display: "flex", justifyContent: "center" }}>Who it's for</span>
              <h2 style={{ marginTop: 14 }}>Built for serious Dutch learners.</h2>
              <p>For people who can commit 10–30 minutes of focused practice and want to build real language ability — not just maintain a daily streak.</p>
              <div className="who">
                <span>Living in or moving to the Netherlands</span>
                <span>Learning for work, study, or daily life</span>
                <span>Already have Dutch materials</span>
                <span>Frustrated by shallow apps</span>
              </div>
            </div>
          </div>
        </section>

        <section className="closing" id="start" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}>
          <div className="wrap reveal">
            <h2>Bring the Dutch material.<br />We guide the learning.</h2>
            <p>A structured, AI-guided way to learn Dutch deeply — from any material you choose.</p>
            <div className="hero-cta">
              <a href="#" className="btn btn-primary">Create your first lesson</a>
              <a href="#" className="btn btn-ghost">Try the demo <span className="arw" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <a className="brand" href="#top"><span className="mark" aria-hidden="true" /> Taalpad</a>
          <nav className="cols">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#why">Why Taalpad</a>
            <a href="#who">Who it's for</a>
          </nav>
          <span className="fine">© 2026 Taalpad · Dutch, learned deeply.</span>
        </div>
      </footer>
    </div>
  );
}
