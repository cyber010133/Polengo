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
const BookOpen = Lucide.BookOpen || Lucide.Book;
const Award = Lucide.Award || Lucide.Star;
const CheckCircle = Lucide.CheckCircle || Lucide.Check;
const Clock = Lucide.Clock || Lucide.Timer;
const Brain = Lucide.Brain || Lucide.Cpu;
const Globe = Lucide.Globe || Lucide.Globe2 || Lucide.Circle;
const Layers = Lucide.Layers || Lucide.Stack || Lucide.Box;

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
  "AI & Automation Builder",
  "Full-Stack Developer",
  "Process Automation Specialist",
  "Gray Hat  //  Purple Team",
  "Bug Hunter & Tool Developer",
];

const SKILLS = [
  { name: "IA & Automação",   pct: 85, desc: "Integração com LLMs, pipelines inteligentes, automação com Make/Zapier e ferramentas de IA aplicadas.", Icon: Brain,    clr: "#a855f7" },
  { name: "Python",           pct: 88, desc: "Ferramentas de segurança, programação de redes, automação assíncrona e parsing de dados em escala.", Icon: Terminal, clr: "#22d3ee" },
  { name: "JavaScript",       pct: 78, desc: "Desenvolvimento full-stack, internos do navegador e vetores de exploração web.",                        Icon: Code2,    clr: "#fbbf24" },
  { name: "C#  /  .NET",      pct: 72, desc: "Desenvolvimento de aplicações Windows, ferramentas de nível de sistema e pesquisa de segurança .NET.",  Icon: Cpu,      clr: "#34d399" },
  { name: "Cybersecurity",    pct: 82, desc: "Operações ofensivas e defensivas, desafios CTF, avaliação de vulnerabilidades e exploit development.",  Icon: Shield,   clr: "#f87171" },
  { name: "HTML & CSS",       pct: 80, desc: "Interfaces responsivas modernas, animações, layouts avançados e páginas de destino otimizadas.",        Icon: Globe,    clr: "#818cf8" },
];

const TIMELINE = [
  { yr: "Idade 6  •  2016",  title: "Primeiras Linhas de Código",         desc: "Primeiro contato com tecnologia e lógica de programação. Curiosidade desde o início — entender como as coisas funcionam por dentro sempre foi a motivação." },
  { yr: "Idade 10  •  2020", title: "Expandindo o Stack",                  desc: "Transição para Python e JavaScript. Construção de bots, scripts de automação e pequenas ferramentas web. Primeiro contato com protocolos de rede e internos do sistema." },
  { yr: "Idade 11  •  2021", title: "Luau & Engenharia de Sistemas",       desc: "Desenvolvimento avançado em Roblox/Luau. Construção de lógica OOP, sistemas complexos e automações dentro de plataformas de jogos." },
  { yr: "Idade 12  •  2022", title: "Estudo Sério Começa",                 desc: "Início dos 3 anos de estudo dedicado. Cursos formais em HTML5, CSS3, Lógica de Programação e JavaScript para Web. Fundamentos sólidos construídos." },
  { yr: "Idade 13  •  2023", title: "Harvard CS50 & Foco em Segurança",    desc: "CS50 da Harvard — Introdução à Ciência da Computação. Deep dive em segurança ofensiva: competições CTF, pesquisa de vulnerabilidades e desenvolvimento C#." },
  { yr: "Idade 14  •  2024", title: "IA, Automação & Operador Gray Hat",   desc: "Foco principal em IA e Automação. Construção de soluções práticas com inteligência artificial. Pesquisa ativa de vulnerabilidades e operações Purple Team." },
];

const PROJECTS = [
  { title: "Automação de Processos", tag: "Automação",          desc: "Sistema automatizado para integração entre ferramentas e otimização de fluxos de trabalho usando Make e APIs. Redução de trabalho manual e aumento de eficiência.", tech: ["Make", "Zapier", "APIs", "Sem código"],       status: "Funcional",        clr: "#a855f7" },
  { title: "Assistente com IA",      tag: "Inteligência Artificial", desc: "Chatbot inteligente integrado com APIs de IA para responder perguntas e auxiliar em tarefas específicas. Treinado para contextos personalizados.",               tech: ["Python", "IA APIs", "LLM", "Automação"],    status: "Experimento",      clr: "#22d3ee" },
  { title: "Páginas de Destino",     tag: "Web Development",    desc: "Desenvolvimento de páginas web responsivas e modernas com HTML, CSS e JavaScript. Design limpo, performance otimizada e experiência do usuário em foco.",              tech: ["HTML", "CSS", "JavaScript", "Responsivo"], status: "Portfólio",        clr: "#34d399" },
  { title: "Integrações de IA",      tag: "IA & Automação",     desc: "Experimentos com diferentes APIs de inteligência artificial para geração de conteúdo e análise de dados. Explorando as fronteiras do que é possível automatizar.",   tech: ["IA", "APIs", "Python", "Automação"],       status: "Em desenvolvimento", clr: "#fbbf24" },
];

const EDU_INSTITUTIONS = [
  {
    name: "Alura",
    icon: "📚",
    clr: "#a855f7",
    courses: [
      { name: "Python: Começando com a Linguagem", year: "2024", status: "Concluído" },
      { name: "JavaScript para Web",               year: "2024", status: "Concluído" },
      { name: "HTML5 e CSS3",                      year: "2023", status: "Concluído" },
      { name: "Lógica de Programação",             year: "2023", status: "Concluído" },
    ],
  },
  {
    name: "edX / Harvard",
    icon: "🎓",
    clr: "#22d3ee",
    courses: [
      { name: "CS50: Introdução à Ciência da Computação", year: "2024", status: "Em andamento" },
      { name: "Introdução ao Python",                     year: "2024", status: "Concluído" },
    ],
  },
  {
    name: "Microlins",
    icon: "💻",
    clr: "#34d399",
    courses: [
      { name: "Programação em C#", year: "2024", status: "Concluído" },
    ],
  },
  {
    name: "Outros",
    icon: "⚡",
    clr: "#fbbf24",
    courses: [
      { name: "Automação com Make/Zapier", year: "2024", status: "Concluído" },
      { name: "Integração de APIs",        year: "2024", status: "Concluído" },
      { name: "Fundamentos de IA",         year: "2024", status: "Concluído" },
    ],
  },
];

const CERTS = [
  { name: "Programação em C#",       org: "Microlins • 2024" },
  { name: "Python Básico",           org: "Marcha • 2024" },
  { name: "Fundamentos de JavaScript", org: "Marcha • 2024" },
  { name: "Desenvolvimento Web",     org: "HTML/CSS/JS • 2023" },
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
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
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
  /* ─── EDU ─── */
  .edu-g{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin-bottom:52px}
  .edu-card{background:var(--bg2);border:1px solid var(--bdr);padding:28px;position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .35s}
  .edu-card:hover{transform:translateY(-5px)}
  .edu-card-top{position:absolute;top:0;left:0;right:0;height:1px;opacity:0;transition:opacity .3s}
  .edu-card:hover .edu-card-top{opacity:1}
  .edu-inst-head{display:flex;align-items:center;gap:12px;margin-bottom:20px}
  .edu-emoji{font-size:22px;line-height:1}
  .edu-inst-name{font-size:16px;font-weight:800;letter-spacing:-.3px}
  .edu-course-list{display:flex;flex-direction:column;gap:10px}
  .edu-course{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--bg3);border:1px solid rgba(255,255,255,.04);gap:12px}
  .edu-course-name{font-size:12px;color:var(--tx2);flex:1;line-height:1.4}
  .edu-meta{display:flex;align-items:center;gap:8px;flex-shrink:0}
  .edu-year{font-family:var(--mono);font-size:10px;color:var(--tx3)}
  .edu-badge{font-family:var(--mono);font-size:9px;letter-spacing:1px;padding:3px 8px;border:1px solid;display:flex;align-items:center;gap:4px;white-space:nowrap}
  .edu-badge.done{color:#22c55e;border-color:rgba(34,197,94,.3);background:rgba(34,197,94,.06)}
  .edu-badge.wip{color:#fbbf24;border-color:rgba(251,191,36,.3);background:rgba(251,191,36,.06)}
  /* Certs strip */
  .certs-strip{padding:28px 36px;background:var(--bg2);border:1px solid var(--bdr);display:flex;align-items:center;gap:0;flex-wrap:wrap;overflow:hidden;position:relative}
  .certs-strip::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--ac),var(--cy),var(--ac))}
  .certs-lbl{font-family:var(--mono);font-size:10px;letter-spacing:3px;color:var(--tx3);text-transform:uppercase;flex-shrink:0;margin-right:32px}
  .certs-list{display:flex;gap:20px;flex-wrap:wrap}
  .cert-item{display:flex;flex-direction:column;border-left:2px solid rgba(168,85,247,.3);padding-left:12px}
  .cert-name{font-family:var(--mono);font-size:12px;color:var(--ac);letter-spacing:1px}
  .cert-sub{font-size:11px;color:var(--tx3)}
  /* ─── ABOUT ─── */
  .about-g{display:grid;grid-template-columns:5fr 4fr;gap:84px;align-items:start}
  .a-p{color:var(--tx2);font-size:15px;line-height:1.9;margin-bottom:18px}
  .a-p strong{color:var(--ac)}
  .a-quote{border-left:2px solid var(--ac);padding:16px 20px;margin:28px 0;background:rgba(168,85,247,.05)}
  .a-quote p{font-style:italic;color:var(--tx2);font-size:14px;line-height:1.8}
  .a-traits{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px}
  .a-trait{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;color:var(--tx3);padding:8px 12px;background:var(--bg2);border:1px solid var(--bdr)}
  .a-trait-dot{width:5px;height:5px;border-radius:50%;background:var(--ac);flex-shrink:0}
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
  /* ─── SKILLS ─── */
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
  /* ─── PROJECTS ─── */
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
  .st-dot.warn{background:#fbbf24;animation:none}
  .st-dot.info{background:#22d3ee;animation:none}
  .pj-title{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:10px;color:var(--tx);transition:color .25s}
  .pj-card:hover .pj-title{color:var(--ac)}
  .pj-d{font-size:13px;color:var(--tx2);line-height:1.78;margin-bottom:22px}
  .tech-row{display:flex;gap:7px;flex-wrap:wrap}
  .tch{font-family:var(--mono);font-size:10px;padding:3px 9px;background:var(--bg3);color:var(--tx3);border:1px solid rgba(255,255,255,.04)}
  .pj-more{margin-top:24px;padding:18px 28px;background:var(--bg2);border:1px dashed rgba(168,85,247,.2);text-align:center;font-family:var(--mono);font-size:11px;color:var(--tx3);letter-spacing:2px}
  /* ─── CONTACT ─── */
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
  @media(max-width:960px){.about-g{grid-template-columns:1fr;gap:52px}.sk-g{grid-template-columns:repeat(2,1fr)}.pj-g{grid-template-columns:1fr}.edu-g{grid-template-columns:1fr}.nav{padding:16px 24px}.nav-links{gap:22px}.sec{padding:90px 28px}.ct-wrap{padding:64px 28px}.certs-strip{padding:20px 24px}}
  @media(max-width:560px){.sk-g{grid-template-columns:1fr}.stats-g{grid-template-columns:1fr 1fr}.a-traits{grid-template-columns:1fr}.nav-links{display:none}.hero-name{letter-spacing:-3px}.sec{padding:72px 20px}.sec-ttl{margin-bottom:44px}.edu-course{flex-direction:column;align-items:flex-start;gap:8px}.edu-meta{flex-wrap:wrap}}
`;

export default function Portfolio() {
  const typed = useTypingEffect(TYPES);
  const [scrolled, setScrolled] = useState(false);
  const [skVis, setSkVis] = useState(false);
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

  const statusDotClass = (status) => {
    if (status === "Em desenvolvimento") return "st-dot warn";
    if (status === "Experimento" || status === "Portfólio") return "st-dot info";
    return "st-dot";
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="logo">
          <span>POL</span><span className="logo-stroke">ENGO</span><span className="logo-dim"> ™</span>
        </div>
        <ul className="nav-links">
          {["educacao", "about", "skills", "projects", "contact"].map(id => (
            <li key={id}><a href={`#${id}`} onClick={go(id)}>{id === "educacao" ? "educação" : id}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
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
          const isTop = pos.top !== undefined;
          const isLeft = pos.left !== undefined;
          return (
            <div key={i} style={{
              position: "absolute", width: 60, height: 60, ...pos,
              borderTop: isTop ? "1px solid rgba(168,85,247,.2)" : undefined,
              borderBottom: !isTop ? "1px solid rgba(168,85,247,.2)" : undefined,
              borderLeft: isLeft ? "1px solid rgba(168,85,247,.2)" : undefined,
              borderRight: !isLeft ? "1px solid rgba(168,85,247,.2)" : undefined,
            }} />
          );
        })}

        {[
          { top: "18%", left: "8%", sz: 120, op: 0.06 },
          { top: "65%", left: "4%", sz: 70, op: 0.04 },
          { top: "22%", right: "6%", sz: 90, op: 0.05 },
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
              <span>Disponível para Colaboração</span>
            </span>
          </div>

          <div className="hero-pre">
            <span className="dim">{"[ "}</span>
            <span>{"dev_operator"}</span>
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
            Desenvolvedor & operador Gray Hat do Brasil. Programando desde os 6 anos — construindo automações com IA, ferramentas de segurança e soluções práticas que fazem diferença real.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-p" onClick={go("projects")}>
              <Target size={13} /><span>Ver Projetos</span>
            </a>
            <a href="#contact" className="btn-o" onClick={go("contact")}>
              <Mail size={13} /><span>Entrar em Contato</span>
            </a>
          </div>
        </div>

        <div className="scroll-hint" onClick={go("educacao")}>
          <span>scroll</span><ChevronDown size={13} />
        </div>
      </section>

      {/* ─── EDUCAÇÃO & CERTIFICAÇÕES ─── */}
      <div className="div-line" />
      <div id="educacao" style={{ background: "var(--bg2)" }}>
        <div className="sec">
          <Reveal>
            <div className="sec-lbl"><span>Educação</span></div>
            <div className="sec-ttl">
              <span>Educação &</span><br />
              <span className="dim">Certificações</span>
            </div>
          </Reveal>

          <div className="edu-g">
            {EDU_INSTITUTIONS.map((inst, ii) => (
              <Reveal key={inst.name} delay={ii * 100}>
                <div
                  className="edu-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${inst.clr}44`;
                    e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,.4),0 0 30px ${inst.clr}10`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="edu-card-top" style={{ background: `linear-gradient(90deg,${inst.clr},transparent)` }} />
                  <div style={{ position: "absolute", top: -1, left: -1, width: 14, height: 14, borderTop: `1px solid ${inst.clr}`, borderLeft: `1px solid ${inst.clr}` }} />

                  <div className="edu-inst-head">
                    <span className="edu-emoji">{inst.icon}</span>
                    <span className="edu-inst-name" style={{ color: inst.clr }}>{inst.name}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--tx3)", marginLeft: "auto" }}>
                      {inst.courses.length} curso{inst.courses.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="edu-course-list">
                    {inst.courses.map((c, ci) => (
                      <div className="edu-course" key={ci}>
                        <span className="edu-course-name">{c.name}</span>
                        <div className="edu-meta">
                          <span className="edu-year">{c.year}</span>
                          <span className={`edu-badge ${c.status === "Concluído" ? "done" : "wip"}`}>
                            {c.status === "Concluído"
                              ? <CheckCircle size={9} />
                              : <Clock size={9} />
                            }
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="certs-strip">
              <span className="certs-lbl">
                <Award size={12} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                Certificados
              </span>
              <div className="certs-list">
                {CERTS.map(({ name, org }) => (
                  <div className="cert-item" key={name}>
                    <span className="cert-name">{name}</span>
                    <span className="cert-sub">{org}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <div className="div-line" />
      <div id="about" style={{ background: "var(--bg)" }}>
        <div className="sec">
          <Reveal>
            <div className="sec-lbl"><span>Sobre</span></div>
            <div className="sec-ttl">
              <span>Jovem, mas com</span><br />
              <span className="dim">Trajetória Real</span>
            </div>
          </Reveal>

          <div className="about-g">
            <Reveal delay={80}>
              <p className="a-p">
                <strong>Polengo</strong> é um desenvolvedor de 14 anos focado em <strong>IA e Automação</strong>, baseado no Brasil. Programando desde os <strong>6 anos</strong>, com estudo dedicado e consistente nos últimos <strong>3 anos</strong> — transformando curiosidade em competência real.
              </p>
              <p className="a-p">
                A jornada começou com <strong>Roblox / Luau scripting</strong> — aprendendo lógica, pensamento sistêmico e como fazer máquinas fazerem exatamente o que você quer. Essa obsessão evoluiu para Python, JavaScript, C# e um foco profundo em <strong>automação com IA</strong> e desenvolvimento web.
              </p>
              <p className="a-p">
                Com formação pelo <strong>CS50 de Harvard</strong>, cursos na Marcha, Microlins e certificações práticas, Polengo combina a mentalidade de quem aprende por conta própria com a disciplina de quem segue estrutura acadêmica.
              </p>
              <p className="a-p">
                Foco atual: <strong>IA aplicada e automação de processos</strong> — construindo ferramentas que pessoas reais usam para resolver problemas reais. Não busca ser o mais jovem. Busca ser <strong>competente, consistente e preparado</strong> para o futuro que está construindo agora.
              </p>

              <div className="a-quote">
                <p>"A idade é apenas contexto. O que importa é o que você constrói com o tempo que tem."</p>
              </div>

              <div className="a-traits">
                {["Primeiro código aos 6 anos", "Mentalidade de produto", "Foco em IA & Automação", "Visão de longo prazo"].map(t => (
                  <div className="a-trait" key={t}>
                    <span className="a-trait-dot" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              <div className="stats-g">
                {[
                  { n: "8",  l: "Anos com Tecnologia" },
                  { n: "3+", l: "Anos Estudo Sério" },
                  { n: "6+", l: "Linguagens / Stacks" },
                  { n: "∞",  l: "Curiosidade" },
                ].map(({ n, l }) => (
                  <div className="stat" key={l}>
                    <div className="stat-n">{n}</div>
                    <div className="stat-l">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--ac)", textTransform: "uppercase", marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "var(--tx3)" }}>//</span>
                <span>Linha do Tempo</span>
              </div>
              <div className="tl">
                {TIMELINE.map((item, i) => (
                  <div className="tl-row" key={i}>
                    <div className="tl-dot">{">"}</div>
                    <div>
                      <div className="tl-yr">{item.yr}</div>
                      <div className="tl-t">{item.title}</div>
                      <div className="tl-d">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ─── SKILLS ─── */}
      <div className="div-line" />
      <div id="skills" style={{ background: "var(--bg2)" }}>
        <div className="sec" ref={skRef}>
          <Reveal>
            <div className="sec-lbl"><span>Skills</span></div>
            <div className="sec-ttl">
              <span>Arsenal</span><br /><span className="dim">Técnico</span>
            </div>
          </Reveal>

          <div className="sk-g">
            {SKILLS.map((sk, i) => (
              <Reveal key={sk.name} delay={i * 80}>
                <div
                  className="sk-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${sk.clr}44`;
                    e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,.45),0 0 40px ${sk.clr}14`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${sk.clr}88,transparent)` }} />
                  <div className="sk-ico" style={{ borderColor: `${sk.clr}55`, color: sk.clr }}>
                    <sk.Icon size={17} />
                  </div>
                  <div className="sk-n">{sk.name}</div>
                  <div className="sk-d">{sk.desc}</div>
                  <div className="sk-row">
                    <span className="sk-pct">Proficiência</span>
                    <span className="sk-pct" style={{ color: sk.clr }}>{sk.pct}%</span>
                  </div>
                  <div className="sk-bg">
                    <div className="sk-bar" style={{ width: skVis ? `${sk.pct}%` : "0%", background: `linear-gradient(90deg,${sk.clr}66,${sk.clr})`, transitionDelay: `${i * 80}ms` }} />
                  </div>
                  <div className="sk-ghost" style={{ color: `${sk.clr}09` }}>{sk.pct}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PROJECTS ─── */}
      <div className="div-line" />
      <div id="projects" style={{ background: "var(--bg)" }}>
        <div className="sec">
          <Reveal>
            <div className="sec-lbl"><span>Projetos</span></div>
            <div className="sec-ttl">
              <span>Projetos &</span><br /><span className="dim">Experimentos</span>
            </div>
            <p style={{ color: "var(--tx3)", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1, marginTop: -44, marginBottom: 44 }}>
              Cada projeto é uma oportunidade de aprender. Foco em iniciativa, pensamento técnico e soluções práticas.
            </p>
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
                    <span className="pj-tag" style={{ borderColor: `${p.clr}44`, color: p.clr }}>{p.tag}</span>
                    <span className="pj-st">
                      <span className={statusDotClass(p.status)} />
                      {p.status}
                    </span>
                  </div>
                  <div className="pj-title">{p.title}</div>
                  <div className="pj-d">{p.desc}</div>
                  <div className="tech-row">
                    {p.tech.map(t => <span className="tch" key={t}>{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={320}>
            <div className="pj-more">
              <span style={{ color: "var(--ac)" }}>// </span>
              Mais projetos em desenvolvimento...
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─── CONTACT ─── */}
      <div id="contact" className="ct-wrap">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <div className="sec-lbl"><span>Contato</span></div>
          </div>
          <div className="ct-ttl">
            <span>{"Pronto para "}</span><span style={{ color: "var(--ac)" }}>{"Colaborar"}</span><span>{"?"}</span>
          </div>
          <div className="ct-sub">
            Aberto a colaborações em bug bounty, consultoria de segurança freelance, projetos de desenvolvimento e operações CTF conjuntas.
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
              <span className="term-tx3">ai-builder | automation-architect | gray-hat</span>
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
            <span>{" ©2025 — Construído com precisão. Stack: "}</span>
            <span className="cy">React</span>
            <span>{" + Vite. Todos os sistemas nominais."}</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
