import { useState, useEffect, useRef } from "react";
import * as Lucide from "lucide-react";

const GitHub = Lucide.GitHub || Lucide.Github || Lucide.Code;
const ExternalLink = Lucide.ExternalLink || Lucide.Share;
const Mail = Lucide.Mail || Lucide.MessageSquare;
const Terminal = Lucide.Terminal || Lucide.Code;
const Shield = Lucide.Shield || Lucide.Lock;
const Code2 = Lucide.Code2 || Lucide.Code;
const Zap = Lucide.Zap || Lucide.Flashlight;
const ChevronDown = Lucide.ChevronDown || Lucide.ArrowDown;
const Cpu = Lucide.Cpu || Lucide.Server;
const Database = Lucide.Database || Lucide.Box;
const Target = Lucide.Target || Lucide.Circle;

function useTypingEffect(texts, speed = 72, delSpeed = 32, pause = 1900) {
  const [s, setS] = useState({ txt: "", idx: 0, ch: 0, del: false, paused: false });

  useEffect(() => {
    const { idx, ch, del, paused } = s;
    const cur = texts[idx];
    if (paused) {
      const t = setTimeout(() => setS(p => ({ ...p, del: true, paused: false })), pause);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (!del) {
        if (ch < cur.length) setS(p => ({ ...p, txt: cur.slice(0, ch + 1), ch: ch + 1 }));
        else setS(p => ({ ...p, paused: true }));
      } else {
        if (ch > 0) setS(p => ({ ...p, txt: cur.slice(0, ch - 1), ch: ch - 1 }));
        else setS(p => ({ ...p, del: false, idx: (idx + 1) % texts.length }));
      }
    }, del ? delSpeed : speed);
    return () => clearTimeout(t);
  }, [s, texts, speed, delSpeed, pause]);

  return s.txt;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const TYPES = [
  "Vulnerability Researcher",
  "Offensive Security Analyst",
  "Automation Architect",
  "Gray Hat  //  Purple Team",
  "Bug Hunter & Tool Developer",
];

const SKILLS = [
  { name: "Cybersecurity",   pct: 85, desc: "Offensive & defensive ops, CTF challenges, vulnerability assessment and exploit development.", Icon: Shield,   clr: "#a855f7" },
  { name: "Python",          pct: 90, desc: "Security tooling, network programming, async automation and data parsing at scale.",          Icon: Terminal, clr: "#22d3ee" },
  { name: "JavaScript",      pct: 78, desc: "Full-stack development, browser internals and web-based exploitation vectors.",               Icon: Code2,    clr: "#fbbf24" },
  { name: "C#  /  .NET",     pct: 72, desc: "Windows application dev, system-level tooling and .NET security research.",                  Icon: Cpu,      clr: "#34d399" },
  { name: "Luau",            pct: 84, desc: "Advanced game scripting, Roblox platform engineering and in-game automation systems.",        Icon: Zap,      clr: "#f87171" },
  { name: "AI & Automation", pct: 80, desc: "LLM integrations, intelligent workflow pipelines and AI-augmented security tooling.",        Icon: Database, clr: "#818cf8" },
];

const TIMELINE = [
  { yr: "Age 7  •  2018",  title: "First Lines of Code",             desc: "Started with Luau/Roblox scripting — built foundational logic, OOP instincts and a deep obsession with how systems work under the hood." },
  { yr: "Age 10  •  2021", title: "Expanding the Stack",             desc: "Transitioned into Python and JavaScript. Built bots, automation scripts and small web tools. First contact with network protocols and system internals." },
  { yr: "Age 12  •  2023", title: "Cybersecurity Focus Begins",      desc: "Deep dive into offensive security: CTF competitions, vulnerability research and C# development. Enrolled in formal IT coursework at Microlins." },
  { yr: "Age 13  •  2024", title: "Harvard & the Professional Shift",desc: "Completed CS50 — Harvard's Introduction to Computer Science. Began treating security as a professional discipline, not just a hobby." },
  { yr: "Age 14  •  2025", title: "Gray Hat Operator",               desc: "Active vulnerability research, custom tool development and Purple Team operations. 2 years of professional-grade work. Hunting bugs, building tools, going deeper." },
];

const PROJECTS = [
  { title: "ShadowScan",  tag: "Offensive Security",   desc: "Async port scanner and vulnerability mapper in Python. Features service fingerprinting, banner grabbing and automated CVE correlation against live scan results.", tech: ["Python", "asyncio", "Nmap API", "NVD"],             status: "Active",   clr: "#a855f7" },
  { title: "RedRecon",    tag: "OSINT Automation",     desc: "Multi-source OSINT aggregation tool for ethical reconnaissance and threat intelligence. Correlates data across public APIs, WHOIS and web sources.",           tech: ["Python", "BeautifulSoup4", "Shodan API", "WHOIS"], status: "Beta",     clr: "#22d3ee" },
  { title: "PhantomBot",  tag: "Automation Framework", desc: "Modular Discord automation framework with event-driven plugin architecture. Handles monitoring, data aggregation, alerts and custom command pipelines.",        tech: ["JavaScript", "Discord.js", "SQLite", "Node.js"],   status: "Released", clr: "#34d399" },
  { title: "CryptoVault", tag: "Cryptography",         desc: "Hybrid RSA + AES-256-GCM file encryption tool with authenticated encryption, Argon2id key derivation and optional plausible deniability containers.",         tech: ["C#", ".NET 8", "BouncyCastle", "Argon2"],          status: "Private",  clr: "#fbbf24" },
];

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#050508;--bg2:#0b0b13;--bg3:#111120;
    --ac:#a855f7;--ac2:#7c3aed;--cy:#22d3ee;
    --tx:#f1f5f9;--tx2:#94a3b8;--tx3:#475569;
    --bdr:rgba(168,85,247,.14);
    --mono:'Share Tech Mono',monospace;--hd:'Exo 2',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--tx);font-family:var(--hd);overflow-x:hidden}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-track{background:var(--bg)}
  ::-webkit-scrollbar-thumb{background:var(--ac)}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes scanline{0%{transform:translateY(-100vh)}100%{transform:translateY(200vh)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes glitch{0%,100%{text-shadow:2px 0 var(--cy),-2px 0 var(--ac)}33%{text-shadow:-2px 0 var(--cy),2px 0 var(--ac);transform:translateX(2px)}66%{text-shadow:2px 0 var(--ac),-2px 0 var(--cy);transform:translateX(-2px)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,.4)}50%{box-shadow:0 0 0 5px rgba(34,211,238,0)}}
  .nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:18px 52px;display:flex;align-items:center;justify-content:space-between;transition:background .4s,border-color .4s}
  .nav.scrolled{background:rgba(5,5,8,.96);border-bottom:1px solid var(--bdr);backdrop-filter:blur(20px)}
  .logo{font-family:var(--mono);font-size:15px;letter-spacing:3px;color:var(--ac);cursor:default}
  .logo-stroke{-webkit-text-stroke:1px var(--ac);color:transparent}
  .logo-dim{color:var(--tx3);font-size:11px}
  .nav-links{display:flex;gap:36px;list-style:none}
  .nav-links a{font-family:var(--mono);font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--tx3);text-decoration:none;position:relative;transition:color .2s}
  .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:var(--ac);transform:scaleX(0);transition:transform .25s;transform-origin:left}
  .nav-links a:hover{color:var(--ac)}
  .nav-links a:hover::after{transform:scaleX(1)}
  .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;background:var(--bg)}
  .hero-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(168,85,247,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.04) 1px,transparent 1px);background-size:64px 64px}
  .hero-radial{position:absolute;width:1000px;height:1000px;pointer-events:none;background:radial-gradient(circle,rgba(168,85,247,.11) 0%,transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%)}
  .hero-radial2{position:absolute;width:600px;height:600px;pointer-events:none;background:radial-gradient(circle,rgba(34,211,238,.05) 0%,transparent 60%);top:30%;left:70%;transform:translate(-50%,-50%)}
  .hero-scan{position:absolute;inset:0;overflow:hidden;pointer-events:none}
  .hero-scan::after{content:'';position:absolute;top:0;left:0;right:0;height:280px;background:linear-gradient(to bottom,transparent,rgba(168,85,247,.05),transparent);animation:scanline 12s linear infinite}
  .hero-content{position:relative;z-index:2;text-align:center;padding:0 24px}
  .badge{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--cy);border:1px solid rgba(34,211,238,.2);padding:5px 14px;margin-bottom:28px}
  .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--cy);animation:pulse 2s infinite}
  .hero-pre{font-family:var(--mono);font-size:11px;letter-spacing:5px;color:var(--ac);text-transform:uppercase;margin-bottom:28px;opacity:0;animation:fadeUp .9s ease .2s forwards}
  .hero-pre .dim{color:var(--tx3)}
  .hero-name{font-family:var(--hd);font-size:clamp(58px,11vw,128px);font-weight:900;line-height:.9;letter-spacing:-5px;color:var(--tx);margin-bottom:22px;display:inline-block;cursor:default;opacity:0;animation:fadeUp .9s ease .45s forwards}
  .hero-name:hover{animation:glitch .35s ease infinite}
  .hero-name .stroke{-webkit-text-stroke:2px var(--ac);color:transparent}
  .hero-role{font-family:var(--mono);font-size:clamp(13px,2.2vw,20px);color:var(--cy);min-height:28px;margin-bottom:36px;opacity:0;animation:fadeUp .9s ease .7s forwards}
  .cursor{display:inline-block;width:2px;height:1.1em;vertical-align:middle;background:var(--cy);margin-left:4px;animation:blink 1s step-end infinite}
  .hero-desc{font-size:15px;color:var(--tx2);max-width:520px;margin:0 auto 44px;line-height:1.85;opacity:0;animation:fadeUp .9s ease .9s forwards}
  .hero-cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;opacity:0;animation:fadeUp .9s ease 1.1s forwards}
  .btn-p{display:inline-flex;align-items:center;gap:9px;padding:13px 30px;background:linear-gradient(135deg,var(--ac2),var(--ac));color:#fff;font-family:var(--mono);font-size:12px;letter-spacing:1.5px;border:none;cursor:pointer;text-decoration:none;clip-path:polygon(7px 0,100% 0,calc(100% - 7px) 100%,0 100%);transition:transform .3s,box-shadow .3s,filter .3s}
  .btn-p:hover{transform:translateY(-3px);box-shadow:0 14px 44px rgba(168,85,247,.38);filter:brightness(1.12)}
  .btn-o{display:inline-flex;align-items:center;gap:9px;padding:12px 29px;border:1px solid var(--bdr);color:var(--tx2);font-family:var(--mono);font-size:12px;letter-spacing:1.5px;cursor:pointer;text-decoration:none;clip-path:polygon(7px 0,100% 0,calc(100% - 7px) 100%,0 100%);transition:border-color .3s,color .3s,transform .3s}
  .btn-o:hover{border-color:var(--ac);color:var(--ac);transform:translateY(-3px)}
  .scroll-hint{position:absolute;bottom:34px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;color:var(--tx3);font-family:var(--mono);font-size:10px;letter-spacing:3px;animation:float 2.8s ease-in-out infinite;cursor:pointer}
  .sec{padding:120px 52px;max-width:1240px;margin:0 auto}
  .sec-lbl{font-family:var(--mono);font-size:10px;letter-spacing:4px;color:var(--ac);text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:10px}
  .sec-lbl::before{content:'//';color:var(--tx3)}
  .sec-ttl{font-size:clamp(30px,5vw,54px);font-weight:900;letter-spacing:-2px;color:var(--tx);margin-bottom:64px;line-height:1.05}
  .sec-ttl .dim{color:var(--tx3)}
  .div-line{height:1px;background:linear-gradient(90deg,transparent,var(--bdr),transparent)}
  .about-g{display:grid;grid-template-columns:5fr 4fr;gap:84px;align-items:start}
  .a-p{color:var(--tx2);font-size:15px;line-height:1.9;margin-bottom:18px}
  .a-p strong{color:var(--ac)}
  .stats-g{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-top:36px}
  .stat{background:var(--bg2);border:1px solid var(--bdr);padding:20px 24px;position:relative;overflow:hidden;transition:border-color .3s}
  .stat::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--ac),transparent)}
  .stat:hover{border-color:rgba(168,85,247,.4)}
  .stat-n{font-family:var(--mono);font-size:38px;color:var(--ac);line-height:1;margin-bottom:5px}
  .stat-l{font-size:11px;color:var(--tx3);letter-spacing:1px;text-transform:uppercase}
  .tl{position:relative}
  .tl::before{content:'';position:absolute;left:14px;top:10px;bottom:0;width:1px;background:linear-gradient(to bottom,var(--ac),transparent)}
  .tl-row{display:flex;gap:28px;margin-bottom:44px;cursor:default}
  .tl-dot{width:28px;height:28px;flex-shrink:0;border:1px solid var(--ac);background:var(--bg);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:13px;color:var(--ac);position:relative;z-index:1;transition:background .3s,color .3s}
  .tl-row:hover .tl-dot{background:var(--ac);color:var(--bg)}
  .tl-yr{font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--cy);margin-bottom:5px}
  .tl-t{font-size:15px;font-weight:700;color:var(--tx);margin-bottom:4px}
  .tl-d{font-size:13px;color:var(--tx2);line-height:1.75}
  .sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .sk-card{background:var(--bg2);border:1px solid var(--bdr);padding:26px;position:relative;overflow:hidden;cursor:default;transition:transform .35s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .35s}
  .sk-card:hover{transform:translateY(-5px)}
  .sk-ico{width:40px;height:40px;border:1px solid;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:transform .3s}
  .sk-card:hover .sk-ico{transform:scale(1.08)}
  .sk-n{font-size:14px;font-weight:700;margin-bottom:6px}
  .sk-d{font-size:12px;color:var(--tx3);line-height:1.65;margin-bottom:18px}
  .sk-row{display:flex;justify-content:space-between;margin-bottom:7px}
  .sk-pct{font-family:var(--mono);font-size:10px;color:var(--tx3)}
  .sk-bg{height:2px;background:var(--bg3);position:relative;overflow:hidden}
  .sk-bar{height:100%;position:absolute;left:0;top:0;transition:width 1.5s cubic-bezier(.16,1,.3,1)}
  .sk-ghost{position:absolute;bottom:20px;right:20px;font-family:var(--mono);font-size:56px;font-weight:900;line-height:1;pointer-events:none;user-select:none}
  .pj-g{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
  .pj-card{background:var(--bg2);border:1px solid var(--bdr);padding:32px;position:relative;overflow:hidden;transition:transform .4s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .4s}
  .pj-card:hover{transform:translateY(-7px);border-color:rgba(168,85,247,.3);box-shadow:0 28px 72px rgba(0,0,0,.55)}
  .pj-top-line{position:absolute;top:0;left:0;right:0;height:1px;opacity:0;transition:opacity .3s}
  .pj-card:hover .pj-top-line{opacity:1}
  .pj-ext{position:absolute;top:30px;right:30px;opacity:0;transition:opacity .3s;color:var(--ac)}
  .pj-card:hover .pj-ext{opacity:1}
  .pj-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:13px}
  .pj-tag{font-family:var(--mono);font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border:1px solid;line-height:1.4}
  .pj-st{font-family:var(--mono);font-size:9px;color:var(--tx3);display:flex;align-items:center;gap:5px}
  .st-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse 2.2s infinite}
  .st-dot.pvt{background:#f59e0b;animation:none}
  .pj-title{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:10px;color:var(--tx);transition:color .25s}
  .pj-card:hover .pj-title{color:var(--ac)}
  .pj-d{font-size:13px;color:var(--tx2);line-height:1.78;margin-bottom:22px}
  .tech-row{display:flex;gap:7px;flex-wrap:wrap}
  .tch{font-family:var(--mono);font-size:10px;padding:3px 9px;background:var(--bg3);color:var(--tx3);border:1px solid rgba(255,255,255,.04)}
  .certs{margin-top:64px;padding:28px 36px;background:var(--bg2);border:1px solid var(--bdr);display:flex;align-items:center;gap:32px;flex-wrap:wrap}
  .certs-lbl{font-family:var(--mono);font-size:10px;letter-spacing:3px;color:var(--tx3);text-transform:uppercase;flex-shrink:0}
  .cert-item{display:flex;flex-direction:column}
  .cert-name{font-family:var(--mono);font-size:12px;color:var(--ac);letter-spacing:1px}
  .cert-sub{font-size:11px;color:var(--tx3)}
  .ct-wrap{border-top:1px solid var(--bdr);background:var(--bg2);padding:80px 52px 56px;text-align:center}
  .ct-ttl{font-size:clamp(26px,4vw,46px);font-weight:900;letter-spacing:-1.5px;margin-bottom:12px}
  .ct-sub{color:var(--tx2);font-size:15px;margin-bottom:48px;line-height:1.7}
  .ct-links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:56px}
  .ct-link{display:flex;align-items:center;gap:10px;padding:14px 26px;background:var(--bg);border:1px solid var(--bdr);color:var(--tx2);text-decoration:none;font-family:var(--mono);font-size:11px;letter-spacing:1px;transition:border-color .3s,color .3s,transform .3s,box-shadow .3s}
  .ct-link:hover{border-color:var(--ac);color:var(--ac);transform:translateY(-3px);box-shadow:0 8px 32px rgba(168,85,247,.15)}
  .terminal{max-width:480px;margin:0 auto 52px;padding:20px 24px;background:var(--bg);border:1px solid var(--bdr);text-align:left}
  .term-dots{display:flex;gap:6px;margin-bottom:14px}
  .term-dot{width:8px;height:8px;border-radius:50%}
  .term-body{font-family:var(--mono);font-size:12px;color:var(--tx2);line-height:1.8}
  .term-ac{color:var(--ac)}
  .term-tx3{color:var(--tx3)}
  .term-cy{color:var(--cy)}
  .footer-t{font-family:var(--mono);font-size:10px;color:var(--tx3);letter-spacing:.5px}
  .footer-t .ac{color:var(--ac)}
  .footer-t .cy{color:var(--cy)}
  @media(max-width:960px){.about-g{grid-template-columns:1fr;gap:52px}.sk-g{grid-template-columns:repeat(2,1fr)}.pj-g{grid-template-columns:1fr}.nav{padding:16px 24px}.nav-links{gap:22px}.sec{padding:90px 28px}.ct-wrap{padding:64px 28px}}
  @media(max-width:560px){.sk-g{grid-template-columns:1fr}.stats-g{grid-template-columns:1fr 1fr}.nav-links{display:none}.hero-name{letter-spacing:-3px}.sec{padding:72px 20px}.sec-ttl{margin-bottom:44px}}
`;

export default function Portfolio() {
  const typed = useTypingEffect(TYPES);
  const [scrolled, setScrolled] = useState(false);
  const [skVis,    setSkVis]    = useState(false);
  const skRef = useRef(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.id = "portfolio-css";
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!skRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkVis(true); },
      { threshold: 0.15 }
    );
    obs.observe(skRef.current);
    return () => obs.disconnect();
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="logo">
          <span>POL</span><span className="logo-stroke">ENGO</span><span className="logo-dim"> ™</span>
        </div>
        <ul className="nav-links">
          {["about", "skills", "projects", "contact"].map(id => (
            <li key={id}><a href={`#${id}`} onClick={go(id)}>{id}</a></li>
          ))}
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-radial" />
        <div className="hero-radial2" />
        <div className="hero-scan" />

        {[
          { top: 80, left: 52 },
          { top: 80, right: 52 },
          { bottom: 80, left: 52 },
          { bottom: 80, right: 52 },
        ].map((pos, i) => {
          const isTop  = pos.top  !== undefined;
          const isLeft = pos.left !== undefined;
          return (
            <div key={i} style={{
              position: "absolute", width: 60, height: 60, ...pos,
              borderTop:    isTop   ? "1px solid rgba(168,85,247,.2)" : undefined,
              borderBottom: !isTop  ? "1px solid rgba(168,85,247,.2)" : undefined,
              borderLeft:   isLeft  ? "1px solid rgba(168,85,247,.2)" : undefined,
              borderRight:  !isLeft ? "1px solid rgba(168,85,247,.2)" : undefined,
            }} />
          );
        })}

        {[
          { top: "18%", left: "8%",  sz: 120, op: 0.06 },
          { top: "65%", left: "4%",  sz: 70,  op: 0.04 },
          { top: "22%", right: "6%", sz: 90,  op: 0.05 },
          { top: "70%", right: "9%", sz: 140, op: 0.04 },
        ].map((h, i) => (
          <svg key={i} viewBox="0 0 100 115" style={{
            position: "absolute", width: h.sz, opacity: h.op,
            top: h.top, left: h.left, right: h.right, pointerEvents: "none",
          }}>
            <polygon points="50,2 98,26 98,74 50,98 2,74 2,26" fill="none" stroke="var(--ac)" strokeWidth="1" />
          </svg>
        ))}

        <div className="hero-content">
          <div style={{ display: "flex", justifyContent: "center", opacity: 0, animation: "fadeUp .9s ease .1s forwards" }}>
            <span className="badge">
              <span className="badge-dot" />
              <span>Available for Collaboration</span>
            </span>
          </div>

          <div className="hero-pre">
            <span className="dim">{"[ "}</span>
            <span>{"sec_operator"}</span>
            <span className="dim">{" ] —"}</span>
            <span>{" init_sequence()"}</span>
          </div>

          <div className="hero-name">
            <span>{"POL"}</span><span className="stroke">{"ENGO"}</span>
          </div>

          <div className="hero-role">
            <span>{">_ "}</span><span>{typed}</span><span className="cursor" />
          </div>

          <p className="hero-desc">
            <span>Gray Hat operator &amp; Purple Team practitioner from Brazil. Programming since age 7 — building offensive tools, hunting vulnerabilities, and automating everything worth automating.</span>
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-p" onClick={go("projects")}>
              <Target size={13} /><span>View Projects</span>
            </a>
            <a href="#contact" className="btn-o" onClick={go("contact")}>
              <Mail size={13} /><span>Get in Touch</span>
            </a>
          </div>
        </div>

        <div className="scroll-hint" onClick={go("about")}>
          <span>scroll</span><ChevronDown size={13} />
        </div>
      </section>

      <div className="div-line" />
      <div id="about" style={{ background: "var(--bg)" }}>
        <div className="sec">
          <Reveal>
            <div className="sec-lbl"><span>About</span></div>
            <div className="sec-ttl">
              <span>The Operator</span><br />
              <span className="dim">Behind the Handle</span>
            </div>
          </Reveal>

          <div className="about-g">
            <Reveal delay={80}>
              <p className="a-p"><strong>Polengo</strong><span> is a 14-year-old cybersecurity practitioner, developer and Gray Hat operator based in Brazil. Programming since age 7, with professional-grade focus on offensive security and automation for the last 2 years.</span></p>
              <p className="a-p"><span>The journey started in </span><strong>Roblox / Luau scripting</strong><span> — learning logic, systems thinking, and how to make machines do exactly what you command. That obsession expanded into Python, JavaScript, C#, and eventually a deep focus on </span><strong>vulnerability research</strong><span> and custom security tooling.</span></p>
              <p className="a-p"><span>Formally educated through </span><strong>{"Harvard's CS50"}</strong><span> and Microlins professional IT coursework, Polengo brings an unusual combination: the raw instinct of a self-taught hacker and the structured discipline of academic training.</span></p>
              <p className="a-p"><span>Current focus: </span><strong>Purple Team operations</strong><span> — bridging red team offense and blue team defense. Building tools that real operators would actually deploy.</span></p>
              <div className="stats-g">
                {[
                  { n: "7",  l: "Years Programming" },
                  { n: "2+", l: "Years Professional" },
                  { n: "6+", l: "Languages / Stacks" },
                  { n: "\u221e", l: "Curiosity Level" },
                ].map(({ n, l }) => (
                  <div className="stat" key={l}>
                    <div className="stat-n"><span>{n}</span></div>
                    <div className="stat-l"><span>{l}</span></div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="tl">
                {TIMELINE.map((item, i) => (
                  <div className="tl-row" key={i}>
                    <div className="tl-dot"><span>{">"}</span></div>
                    <div>
                      <div className="tl-yr"><span>{item.yr}</span></div>
                      <div className="tl-t"><span>{item.title}</span></div>
                      <div className="tl-d"><span>{item.desc}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="div-line" />
      <div id="skills" style={{ background: "var(--bg2)" }}>
        <div className="sec" ref={skRef}>
          <Reveal>
            <div className="sec-lbl"><span>Skills</span></div>
            <div className="sec-ttl">
              <span>Technical</span><br /><span className="dim">Arsenal</span>
            </div>
          </Reveal>

          <div className="sk-g">
            {SKILLS.map((sk, i) => (
              <Reveal key={sk.name} delay={i * 80}>
                <div
                  className="sk-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${sk.clr}44`;
                    e.currentTarget.style.boxShadow  = `0 20px 60px rgba(0,0,0,.45),0 0 40px ${sk.clr}14`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow   = "";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${sk.clr}88,transparent)` }} />
                  <div className="sk-ico" style={{ borderColor: `${sk.clr}55`, color: sk.clr }}>
                    <sk.Icon size={17} />
                  </div>
                  <div className="sk-n"><span>{sk.name}</span></div>
                  <div className="sk-d"><span>{sk.desc}</span></div>
                  <div className="sk-row">
                    <span className="sk-pct"><span>Proficiency</span></span>
                    <span className="sk-pct" style={{ color: sk.clr }}><span>{sk.pct}%</span></span>
                  </div>
                  <div className="sk-bg">
                    <div className="sk-bar" style={{ width: skVis ? `${sk.pct}%` : "0%", background: `linear-gradient(90deg,${sk.clr}66,${sk.clr})`, transitionDelay: `${i * 80}ms` }} />
                  </div>
                  <div className="sk-ghost" style={{ color: `${sk.clr}09` }}><span>{sk.pct}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="div-line" />
      <div id="projects" style={{ background: "var(--bg)" }}>
        <div className="sec">
          <Reveal>
            <div className="sec-lbl"><span>Projects</span></div>
            <div className="sec-ttl">
              <span>Deployed</span><br /><span className="dim">Operations</span>
            </div>
          </Reveal>

          <div className="pj-g">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="pj-card">
                  <div className="pj-top-line" style={{ background: `linear-gradient(90deg,transparent,${p.clr},transparent)` }} />
                  <div className="pj-ext"><ExternalLink size={15} /></div>
                  <div style={{ position: "absolute", top: -1, left: -1, width: 16, height: 16, borderTop: `1px solid ${p.clr}`, borderLeft: `1px solid ${p.clr}` }} />
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 16, height: 16, borderBottom: `1px solid ${p.clr}`, borderRight: `1px solid ${p.clr}` }} />
                  <div className="pj-head">
                    <span className="pj-tag" style={{ borderColor: `${p.clr}44`, color: p.clr }}><span>{p.tag}</span></span>
                    <span className="pj-st">
                      <span className={`st-dot${p.status === "Private" ? " pvt" : ""}`} />
                      <span>{p.status}</span>
                    </span>
                  </div>
                  <div className="pj-title"><span>{p.title}</span></div>
                  <div className="pj-d"><span>{p.desc}</span></div>
                  <div className="tech-row">
                    {p.tech.map(t => <span className="tch" key={t}>{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="certs">
              <span className="certs-lbl"><span>{"// Education & Certs"}</span></span>
              {[
                { label: "CS50",            sub: "Harvard University" },
                { label: "IT Professional", sub: "Microlins" },
                { label: "CTF Active",      sub: "HackTheBox / THM" },
                { label: "Gray Hat",        sub: "Purple Team Ops" },
              ].map(({ label, sub }) => (
                <div className="cert-item" key={label}>
                  <span className="cert-name"><span>{label}</span></span>
                  <span className="cert-sub"><span>{sub}</span></span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div id="contact" className="ct-wrap">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <div className="sec-lbl"><span>Contact</span></div>
          </div>
          <div className="ct-ttl">
            <span>{"Ready to "}</span><span style={{ color: "var(--ac)" }}>{"Collaborate"}</span><span>{"?"}</span>
          </div>
          <div className="ct-sub">
            <span>Open to bug bounty collaborations, freelance security consulting, tool development projects and joint CTF operations.</span>
          </div>

          <div className="ct-links">
            <a href="https://github.com/" className="ct-link" target="_blank" rel="noreferrer">
              <GitHub size={14} /><span>GitHub</span>
            </a>
            <a href="mailto:polengo@protonmail.com" className="ct-link">
              <Mail size={14} /><span>Email</span>
            </a>
            <a href="https://app.hackthebox.com/" className="ct-link" target="_blank" rel="noreferrer">
              <Shield size={14} /><span>HackTheBox</span>
            </a>
            <a href="https://tryhackme.com/" className="ct-link" target="_blank" rel="noreferrer">
              <Target size={14} /><span>TryHackMe</span>
            </a>
          </div>

          <div className="terminal">
            <div className="term-dots">
              {["#f87171", "#fbbf24", "#34d399"].map(c => (
                <div key={c} className="term-dot" style={{ background: c }} />
              ))}
            </div>
            <div className="term-body">
              <span className="term-ac">polengo</span>
              <span className="term-tx3">@operator</span>
              <span className="term-cy">:~$</span>
              <span>{" whoami"}</span>
              <br />
              <span className="term-tx3">gray-hat | purple-team | automation-architect</span>
              <br />
              <span className="term-ac">polengo</span>
              <span className="term-tx3">@operator</span>
              <span className="term-cy">:~$</span>
              <span className="term-tx3">{" _"}</span>
              <span className="cursor" style={{ background: "var(--tx3)" }} />
            </div>
          </div>

          <div className="footer-t">
            <span className="ac">POLENGO</span>
            <span>{" \u00A92025 \u2014 Crafted with precision. Stack: "}</span>
            <span className="cy">React</span>
            <span>{" + Vite. All systems nominal."}</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}