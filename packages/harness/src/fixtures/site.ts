import { createServer, type Server } from "node:http";

/**
 * A small site for testing the survey and the deep capture: a rotating icon, a line drawing that draws
 * itself, a scroll reveal, hover transitions, an accordion, tabs, a theme toggle, a blog collection, and
 * pages that must be skipped (sign-in, legal, disallowed by robots.txt).
 */

const head = (title: string) => `<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><title>${title}</title>
<style>
:root{--paper:#f5f0e8;--ink:#1f1e1d;--accent:#d97757}
[data-theme=dark]{--paper:#1f1e1d;--ink:#f5f0e8}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.5 Georgia,serif}
header{position:sticky;top:0;display:flex;gap:24px;padding:16px 32px;background:var(--paper);border-bottom:1px solid #ccc}
header a{color:var(--ink);text-decoration:none;transition:color .2s ease}header a:hover{color:var(--accent)}
main section{padding:96px 32px}
.btn{display:inline-block;padding:12px 20px;border-radius:999px;background:var(--ink);color:var(--paper);border:0;transition:background-color .25s cubic-bezier(.2,.8,.2,1),transform .25s}
.btn:hover{background:var(--accent);transform:translateY(-2px)}
.btn.secondary{background:transparent;color:var(--ink);border:1px solid var(--ink)}
.btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes draw{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}
.spin{animation:spin 6s linear infinite;transform-origin:center}
.draw path{stroke-dasharray:600;animation:draw 1.6s ease-out forwards}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
.reveal.in{opacity:1;transform:none}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{display:block;min-height:160px;padding:24px;border:1px solid #ccc;border-radius:16px;color:inherit;text-decoration:none;transition:box-shadow .2s}
.card:hover{box-shadow:0 8px 24px rgba(0,0,0,.12)}
summary{cursor:pointer;padding:16px 0}summary svg{transition:transform .3s}details[open] summary svg{transform:rotate(180deg)}
@media (prefers-reduced-motion: reduce){.spin,.draw path{animation:none}.reveal{transition:none}}
</style></head><body>
<header><a href="/">Home</a><a href="/features">Features</a><a href="/faq">FAQ</a><a href="/blog">Blog</a><a href="/login">Log in</a>
<button class="btn secondary" aria-label="Toggle theme" onclick="document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark'">◐</button></header>`;

const foot = `<footer style="padding:48px 32px;background:#2b2a28;color:#eee"><a href="/legal/privacy" style="color:#eee">Privacy</a></footer>
<script>new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in'))).observe&&document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in'))).observe(el))</script>
</body></html>`;

const doodle = `<svg class="draw" width="220" height="160" viewBox="0 0 220 160" fill="none"><path d="M10 120 C 60 20, 120 20, 200 110" stroke="#1f1e1d" stroke-width="3" stroke-linecap="round"/><path d="M40 140 L 180 140" stroke="#1f1e1d" stroke-width="3" stroke-linecap="round"/></svg>`;
const question = `<svg class="spin" width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#1f1e1d" stroke-width="2.5"/><path d="M24 24 Q32 12 40 24 Q40 32 32 34 L32 40" stroke="#1f1e1d" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const chevron = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5"/></svg>`;

const pages: Record<string, string> = {
  "/": `${head("Home")}<main><section><h1>Paper and ink</h1>${doodle}<p><a class="btn" href="/features">Start</a> <a class="btn secondary" href="/faq">Learn</a></p></section>
<section style="background:#ebe4d8"><h2>Why</h2><div class="grid"><a class="card" href="/blog/post-1"><h3>One</h3></a><a class="card" href="/blog/post-2"><h3>Two</h3></a><a class="card" href="/blog/post-3"><h3>Three</h3></a></div></section>
<section style="height:1400px"><h2 class="reveal">Later</h2><div class="reveal"><p>Revealed on scroll.</p></div></section></main>${foot}`,
  "/features": `${head("Features")}<main><section><h1>Features</h1><div role="tablist"><button role="tab" aria-selected="true">One</button><button role="tab" aria-selected="false" onclick="this.setAttribute('aria-selected','true')">Two</button></div>
<table><tr><th>Plan</th><th>Seats</th></tr><tr><td>A</td><td>1</td></tr></table><form><input type="email" placeholder="you@example.com"><button class="btn" type="button">Join</button></form></section></main>${foot}`,
  // Script-driven motion (no CSS animation) and a Lottie file, like sites that animate with lottie-web.
  "/download": `${head("Download")}<main><section><h1>Download</h1>
<svg id="scripted" width="160" height="160" viewBox="0 0 160 160" fill="none"><path id="hand" d="M20 120 Q 80 20 140 120" stroke="#1f1e1d" stroke-width="3" stroke-linecap="round"/></svg>
<script>let t=0;(function tick(){t+=1;document.getElementById('hand').setAttribute('d','M20 120 Q 80 '+(20+40*Math.sin(t/8))+' 140 120');requestAnimationFrame(tick)})();fetch('/anim.json')</script>
</section></main>${foot}`,
  "/faq": `${head("FAQ")}<main><section><div>${question}</div><h1>Questions</h1>
<details><summary>First question ${chevron}</summary><p>Answer.</p></details><details><summary>Second question ${chevron}</summary><p>Answer.</p></details></section></main>${foot}`,
  "/blog": `${head("Blog")}<main><section><h1>Blog</h1><div class="grid">${Array.from({ length: 8 }, (_, i) => `<a class="card" href="/blog/post-${i + 1}"><h3>Post ${i + 1}</h3></a>`).join("")}</div></section></main>${foot}`,
  "/login": `${head("Log in")}<main><form><input type="password"></form></main>${foot}`,
  "/legal/privacy": `${head("Privacy")}<main><p>Legal.</p></main>${foot}`,
  "/private/secret": `${head("Secret")}<main><p>Disallowed.</p></main>${foot}`,
};
for (let i = 1; i <= 8; i++) pages[`/blog/post-${i}`] = `${head(`Post ${i}`)}<main><article><h1>Post ${i}</h1><blockquote>Quote.</blockquote><pre>code</pre></article></main>${foot}`;

export function startFixtureSite(): Promise<{ url: string; server: Server; requested: string[] }> {
  const requested: string[] = [];
  const server = createServer((req, res) => {
    const path = (req.url ?? "/").split("?")[0]!.replace(/\/+$/, "") || "/";
    requested.push(path);
    if (path === "/robots.txt") {
      res.writeHead(200, { "content-type": "text/plain" }).end(`User-agent: *\nDisallow: /private\n\nSitemap: http://${req.headers.host}/sitemap.xml\n`);
      return;
    }
    if (path === "/anim.json") {
      const lottie = {
        v: "5.7.0", fr: 30, ip: 0, op: 90, w: 200, h: 200,
        layers: [{ ty: 4, shapes: [{ ty: "gr", it: [{ ty: "sh" }, { ty: "st", c: { k: [0.12, 0.12, 0.11, 1] }, w: { k: 2.5 }, lc: 2 }, { ty: "tm", s: { k: 0 }, e: { k: [{ t: 0, s: [0] }, { t: 60, s: [100] }] } }] }] }],
      };
      res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(lottie));
      return;
    }
    if (path === "/sitemap.xml") {
      const locs = ["/", "/features", "/faq", "/private/secret", ...Array.from({ length: 8 }, (_, i) => `/blog/post-${i + 1}`)];
      res.writeHead(200, { "content-type": "application/xml" }).end(`<?xml version="1.0"?><urlset>${locs.map((l) => `<url><loc>http://${req.headers.host}${l}</loc></url>`).join("")}</urlset>`);
      return;
    }
    const body = pages[path];
    if (!body) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(body);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    resolve({ url: `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`, server, requested });
  }));
}
