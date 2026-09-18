import { useEffect, useState, type CSSProperties } from 'react'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>

const Github = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.3-5.29-1.3-5.29-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.12c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.4-2.72 5.38-5.3 5.67.42.36.79 1.06.79 2.14v3.26c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>
)

const Logo = () => <span className="logo" aria-hidden="true"><i /><i /><i /></span>

const CodeIcon = ({ children }: { children: React.ReactNode }) => <span className="tool-icon">{children}</span>

const integrations = [
  { name: 'Slack', icon: '/integrations/slack.svg' },
  { name: 'Notion', icon: '/integrations/notion.svg' },
  { name: 'Zoom', icon: '/integrations/zoom.svg' },
  { name: 'Zendesk', icon: '/integrations/zendesk.svg' },
  { name: 'HubSpot', icon: '/integrations/hubspot.svg' },
  { name: 'Google', icon: '/integrations/google.svg' },
  { name: 'Box', icon: '/integrations/box.svg' },
  { name: 'Dropbox', icon: '/integrations/dropbox.svg' },
  { name: 'Figma', icon: '/integrations/figma.svg' },
  { name: 'GitHub', icon: '/integrations/github.svg' },
  { name: 'Linear', icon: '/integrations/linear.svg' },
  { name: 'Jira', icon: '/integrations/jira.svg' },
  { name: 'Stripe', icon: '/integrations/stripe.svg' },
  { name: 'Airtable', icon: '/integrations/airtable.svg' },
  { name: 'Asana', icon: '/integrations/asana.svg' },
  { name: 'GitLab', icon: '/integrations/gitlab.svg' },
]

function Header() {
  return <>
    <header className="topbar">
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Fentaris home"><Logo /><b>fentaris</b></a>
        <nav aria-label="Main navigation">
          <a href="#/product">Product</a><a href="#/pricing">Pricing</a><a href="https://fentaris.mintlify.app">Docs</a>
        </nav>
        <div className="nav-actions">
          <a className="github-count" href="https://github.com/fentaris"><Github /><b>GitHub</b></a>
        </div>
      </div>
    </header>
  </>
}

function AgentVisual() {
  return <div className="hero-visual" aria-label="Fentaris MCP request preview">
    <div className="trace-card">
      <div className="trace-title">mcp request: 'github.list_issues'</div>
      <div className="trace-line"><span>client: api-key authenticated</span><em className="bar green" /></div>
      <div className="trace-line"><span>policy: tool allowed</span><em className="bar purple" /></div>
      <div className="trace-line"><span>route: github upstream</span><em className="bar short" /></div>
      <div className="trace-line"><span>event: tool.success · 184ms</span><em className="bar amber" /></div>
    </div>
    <div className="project-card"><small>one stable /mcp endpoint</small><span><CodeIcon>↳</CodeIcon>github</span><span><CodeIcon>↳</CodeIcon>notion</span><span><CodeIcon>↳</CodeIcon>filesystem</span><span><CodeIcon>≋</CodeIcon>policies</span><span><CodeIcon>⌁</CodeIcon>request logs</span></div>
  </div>
}

function Hero() {
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard.writeText('npm install -g @fentaris/cli'); setCopied(true); setTimeout(() => setCopied(false), 1600) }
  return <>
    <section className="hero" id="top">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1>Manage every MCP</h1>
          <p>Run, route, and manage every MCP server behind <span>one stable endpoint</span>—with authentication, policy, and observability built in</p>
          <div className="hero-links" id="setup"><button onClick={copy}>{copied ? 'Command copied' : 'Copy install command'}</button><a href="https://fentaris.mintlify.app/getting-started/quickstart">Quickstart <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div>
        </div>
        <AgentVisual />
      </div>
    </section>
    <section className="integrations" id="integrations" aria-labelledby="integrations-title">
      <p id="integrations-title">Bring every tool behind one MCP endpoint</p>
      <div className="integration-marquee">
        <div className="integration-track">
          {[false, true].map((duplicate) => (
            <ul className="integration-list" aria-hidden={duplicate || undefined} key={String(duplicate)}>
              {integrations.map(({ name, icon }) => (
                <li key={name} title={name}>
                  <img src={`${icon}?v=2`} alt={`${name} logo`} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  </>
}

const showcaseTabs = [
  { id: 'servers', label: 'Servers', icon: '⟳', title: 'Servers', description: 'Add local or remote MCP servers without changing the endpoint your clients use.', code: ["import { fentaris, stdio } from '@fentaris/core';", '', 'const app = fentaris();', "app.mcp('filesystem', {", '  transport: stdio({', "    command: 'npx',", '  }),', '});'] },
  { id: 'routing', label: 'Routing', icon: '⌘', title: 'Routing', description: 'Give every upstream a stable namespace and expose them all through one MCP endpoint.', code: ["app.mcp('github', {", '  transport: stdio({', "    command: 'npx',", "    args: ['-y', '@modelcontextprotocol/server-github'],", '  }),', '});', '', "// github__list_issues"] },
  { id: 'policies', label: 'Policies', icon: '◇', title: 'Policies', description: 'Decide which tools each user or group can discover and call before execution.', code: ["app.policy('read-only')", "  .mcp('filesystem')", "  .allow('list_directory');", '', "app.group('operators')", "  .policy('read-only');"] },
  { id: 'identity', label: 'Identity', icon: '◔', title: 'Identity', description: 'Authenticate MCP clients with API keys and resolve every request to an identity.', code: ["app.group('operators')", "  .users(user('alice', {", "    email: 'alice@example.com',", '  }))', "  .policy('read-only');"] },
  { id: 'auth', label: 'OAuth', icon: '✣', title: 'OAuth', description: 'Connect protected remote MCP servers while Fentaris handles OAuth 2.1 credentials.', code: ["app.mcp('linear', {", '  transport: streamableHttp({', "    url: 'https://mcp.linear.app/mcp',", '  }),', '  auth: oauth(),', '});'] },
  { id: 'events', label: 'Observe', icon: '⌁', title: 'Observe', description: 'Trace every proxied operation with lifecycle events, request context, and duration.', code: ["app.on('tool:success', ({ ctx, durationMs }) => {", "  ctx.log.info('tool.success', {", '    tool: ctx.tool?.name,', '    durationMs,', '  });', '});'] },
]

function ShowcaseCode({ lines, label }: { lines: string[]; label: string }) {
  return <div className="showcase-code"><span className="showcase-code-label">{label}.ts</span><pre>{lines.map((line, index) => <code key={`${line}-${index}`}><i>{index + 1}</i>{line || ' '}</code>)}</pre></div>
}

function Platform() {
  const [activeId, setActiveId] = useState(showcaseTabs[0].id)
  const activeIndex = Math.max(0, showcaseTabs.findIndex(tab => tab.id === activeId))
  const active = showcaseTabs[activeIndex]
  const bridgeStyle = {
    '--bridge-translate': `translateX(calc(${activeIndex * 100}% + ${activeIndex * 20}px))`,
    '--bridge-translate-mobile': `translateX(calc(${activeIndex * 100}% + ${activeIndex * 8}px))`,
  } as CSSProperties

  return <section className="platform platform-v2" id="platform">
    <h2><b>Servers. Routing. Policy. Identity.</b> Everything you need<br />to operate MCP as production infrastructure.</h2>
    <div className="showcase-shell product-showcase" data-active-index={activeIndex} style={bridgeStyle}>
      <div className="showcase-tabs" role="tablist" aria-label="MCP control plane features">
        <i className="showcase-tab-bridge" aria-hidden="true" />
        {showcaseTabs.map(tab => <button key={tab.id} role="tab" aria-selected={active.id === tab.id} className={active.id === tab.id ? 'active' : ''} onClick={() => setActiveId(tab.id)}><span>{tab.icon}</span>{tab.label}</button>)}
      </div>
      <div className="product-stage" role="tabpanel">
        <div className="product-stage-content">
          <div className="stage-glow" />
          <ShowcaseCode lines={active.code} label={active.title} />
          <div className="studio-card">
            <div className="studio-toolbar"><span className="selected">▣ Requests</span><span>⚙ Servers</span><span>◇ Policies</span><span>⌁ Events</span><b>Control plane&nbsp; / &nbsp;Live</b></div>
            <div className="studio-body"><aside><b>＋ Add server</b><strong>{active.title}</strong><span>github · healthy</span><span>notion · healthy</span><span>filesystem · local</span></aside><main><small>Fentaris / {active.title}</small><p>Request authenticated, checked against policy, and routed to the approved upstream.</p><div className="validation"><span>github__list_issues</span><em>allowed · 184ms</em></div></main></div>
          </div>
          <div className="stage-caption"><b>{active.title}</b><span>{active.description}</span></div>
        </div>
      </div>
    </div>
  </section>
}

const flowSteps = [
  { label: 'Connect', title: 'The client calls one endpoint.', copy: 'Claude, Codex, or your own app connects to Fentaris instead of configuring every MCP server separately.', event: 'POST /mcp · tools/call', result: 'client identified' },
  { label: 'Control', title: 'Fentaris checks and routes.', copy: 'Identity, policy, middleware, approvals, and rate limits run before the request reaches an upstream server.', event: 'github__list_issues', result: 'policy allowed' },
  { label: 'Run', title: 'The MCP server does its job.', copy: 'Fentaris supplies upstream authentication, forwards the call, and records the result before returning it to the client.', event: 'tool.success · 184ms', result: 'response returned' },
]

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    if (!isPlaying) return
    const timer = window.setInterval(() => setActiveStep(step => (step + 1) % flowSteps.length), 3600)
    return () => window.clearInterval(timer)
  }, [isPlaying])
  const active = flowSteps[activeStep]

  return <section className="mcp-flow" id="how-it-works">
    <h2><b>One endpoint in. The right server out.</b><br />See what happens to every MCP request.</h2>
    <div className="flow-shell" data-step={activeStep}>
      <div className="flow-tabs" role="tablist" aria-label="How an MCP request moves through Fentaris">
        {flowSteps.map((step, index) => <button key={step.label} role="tab" aria-selected={activeStep === index} className={activeStep === index ? 'active' : ''} onClick={() => setActiveStep(index)}><i>0{index + 1}</i><span>{step.label}</span><em /></button>)}
      </div>
      <div className="flow-stage">
        <button className="flow-pause" onClick={() => setIsPlaying(playing => !playing)} aria-label={isPlaying ? 'Pause request demo' : 'Play request demo'}>{isPlaying ? 'Ⅱ Pause' : '▶ Play'}</button>
        <div className="flow-topology" aria-label="MCP clients connect through Fentaris to upstream MCP servers">
          <div className="flow-column flow-clients"><small>MCP clients</small><span>Claude Desktop</span><span>Codex</span><span>Your app</span></div>
          <div className="flow-wire wire-in"><i /></div>
          <div className="flow-core"><Logo /><strong>fentaris</strong><small>ONE /MCP ENDPOINT</small><ul><li>Identity</li><li>Policy</li><li>Routing</li><li>Logs</li></ul></div>
          <div className="flow-wire wire-out"><i /></div>
          <div className="flow-column flow-servers"><small>MCP servers</small><span>GitHub <i>HTTP</i></span><span>Linear <i>OAuth</i></span><span>Filesystem <i>stdio</i></span></div>
        </div>
        <div className="flow-detail" aria-live="polite"><small>Step 0{activeStep + 1}</small><h3>{active.title}</h3><p>{active.copy}</p><div><code>{active.event}</code><span>✓ {active.result}</span></div></div>
      </div>
    </div>
  </section>
}

type Route = 'home' | 'product' | 'pricing' | 'landing2'

function getRoute(): Route {
  const hash = window.location.hash
  if (window.location.pathname.startsWith('/landing2') || hash.startsWith('#/landing2')) return 'landing2'
  if (hash.startsWith('#/product')) return 'product'
  if (hash.startsWith('#/pricing')) return 'pricing'
  return 'home'
}

const productFeatures = [
  ['01', 'Agents', 'Identity and least-privilege access for every agent.'],
  ['02', 'Workflows', 'Approvals built into every sensitive step.'],
  ['03', 'Tools', 'One secure gateway to every tool your agents use.'],
  ['04', 'Policies', 'Rules enforced before actions reach production.'],
  ['05', 'Memory', 'Useful context, isolated and under your control.'],
  ['06', 'Observability', 'A complete trace of every decision and action.'],
]

function PageHero({ eyebrow, title, copy, children }: { eyebrow: string; title: React.ReactNode; copy: string; children?: React.ReactNode }) {
  return <section className="page-hero">
    <div className="page-shell page-hero-inner">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-lede">{copy}</p>
      {children}
    </div>
  </section>
}

function ProductPage() {
  return <>
    <PageHero eyebrow="Fentaris platform" title={<>One secure layer.<br /><span>Every agent.</span></>} copy="Build, connect, and operate AI agents without giving up control.">
      <div className="page-actions"><a className="primary-action" href="https://fentaris.mintlify.app">Start building <Arrow /></a><a className="text-action" href="#product-capabilities">Explore the platform ↓</a></div>
      <div className="product-orbit" aria-label="Fentaris connects agents, policy, tools, and observability">
        <div className="orbit-core"><Logo /><b>fentaris</b><small>secure runtime</small></div>
        <span className="orbit-node node-agent">Agent</span><span className="orbit-node node-policy">Policy</span><span className="orbit-node node-tools">Tools</span><span className="orbit-node node-trace">Trace</span>
      </div>
    </PageHero>

    <section className="page-section" id="product-capabilities">
      <div className="page-shell">
        <div className="section-heading"><p className="eyebrow">The platform</p><h2>Everything agents need.<br /><span>Nothing they shouldn't have.</span></h2></div>
        <div className="feature-grid">{productFeatures.map(([number, title, copy]) => <article key={title}><small>{number}</small><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>

    <section className="page-section product-flow-section">
      <div className="page-shell split-section">
        <div className="section-heading"><p className="eyebrow">One control plane</p><h2>Connect.<br />Govern.<br /><span>Observe.</span></h2></div>
        <div className="product-flow">
          <div><i>01</i><b>Connect</b><span>Bring any agent and any tool.</span></div>
          <div><i>02</i><b>Govern</b><span>Apply identity, permissions, and approvals.</span></div>
          <div><i>03</i><b>Observe</b><span>See what happened and why.</span></div>
        </div>
      </div>
    </section>

    <PageCta title="Build agents you can trust." label="Read the quickstart" href="https://fentaris.mintlify.app" />
  </>
}

function PricingPage() {
  return <>
    <PageHero eyebrow="Simple pricing" title={<>Start open.<br /><span>Scale when you're ready.</span></>} copy="Self-host Fentaris for free. Move to managed infrastructure when you need it.">
      <div className="pricing-signal"><span /><p>No per-agent tax. No locked-in tools.</p></div>
    </PageHero>

    <section className="page-section pricing-section">
      <div className="page-shell pricing-grid">
        <article className="price-card featured">
          <div className="price-card-head"><p className="eyebrow">Open source</p><span>Available now</span></div>
          <h2>$0<small> forever</small></h2>
          <p>Run Fentaris on your own infrastructure.</p>
          <ul><li>Unlimited agents</li><li>Policy enforcement</li><li>Audit logs</li><li>Community support</li></ul>
          <a className="primary-action" href="https://github.com/fentaris">Get Fentaris <Arrow diagonal /></a>
        </article>
        <article className="price-card">
          <div className="price-card-head"><p className="eyebrow">Fentaris Cloud</p><span>Coming soon</span></div>
          <h2>Managed</h2>
          <p>Secure agent infrastructure, without infrastructure work.</p>
          <ul><li>Hosted control plane</li><li>Managed updates</li><li>Team workspaces</li><li>Priority support</li></ul>
          <a className="secondary-action" href="https://github.com/fentaris">Follow updates <Arrow diagonal /></a>
        </article>
      </div>
    </section>

    <section className="pricing-note"><div className="page-shell"><p>Both plans use the same open foundation.</p><span>Your agents. Your tools. Your data.</span></div></section>
    <PageCta title="Secure your first agent today." label="View the docs" href="https://fentaris.mintlify.app" />
  </>
}

function PageCta({ title, label, href }: { title: string; label: string; href: string }) {
  return <section className="page-cta"><div className="page-shell"><h2>{title}</h2><a className="primary-action" href={href}>{label} <Arrow /></a></div></section>
}

const landing2Features = [
  { icon: '⌘', title: 'Unify', copy: 'Route every MCP server through one predictable endpoint.' },
  { icon: '◇', title: 'Protect', copy: 'Enforce identity, policy, approvals, and secrets before tools run.' },
  { icon: '⌁', title: 'Observe', copy: 'Inspect every request, decision, latency, and result in one trace.' },
]

const landing2Links = [
  { eyebrow: 'Get started', title: 'Quickstart', copy: 'Create your first governed proxy and connect an agent in minutes.', href: 'https://fentaris.mintlify.app/getting-started/quickstart' },
  { eyebrow: 'Understand', title: 'Architecture', copy: 'See how clients, policy, middleware, and upstream servers fit together.', href: 'https://fentaris.mintlify.app/concepts/architecture' },
  { eyebrow: 'Ship safely', title: 'Team-governed proxy', copy: 'Follow a production-minded setup for users, groups, and approvals.', href: 'https://fentaris.mintlify.app/examples/team-governed-proxy' },
]

function Landing2Header() {
  return <header className="l2-header">
    <div className="l2-nav">
      <a className="l2-brand" href="/landing2"><Logo /><b>fentaris</b></a>
      <nav aria-label="Landing navigation"><a href="#why-fentaris">Platform</a><a href="#quickstart">Quickstart</a><a href="https://fentaris.mintlify.app">Documentation</a></nav>
      <a className="l2-github" href="https://github.com/Fentaris/fentaris"><Github /><span>GitHub</span><Arrow diagonal /></a>
    </div>
  </header>
}

function Landing2Page() {
  return <div className="landing2">
    <Landing2Header />
    <section className="l2-hero">
      <div className="l2-glow" aria-hidden="true" />
      <div className="l2-hero-inner">
        <a className="l2-release" href="https://fentaris.mintlify.app/getting-started/quickstart"><span>New</span> Agent setup skills are available <Arrow /></a>
        <p className="l2-kicker">The centralized MCP proxy</p>
        <h1>One secure gateway<br />for every <em>AI agent.</em></h1>
        <p className="l2-lede">Route multiple MCP servers, enforce policy per user, and observe every tool call—without changing how your agents work.</p>
        <div className="l2-actions"><a className="l2-primary" href="https://fentaris.mintlify.app/getting-started/quickstart">Get started <Arrow /></a><a className="l2-secondary" href="https://github.com/Fentaris/fentaris"><Github /> View on GitHub</a></div>
        <div className="l2-command"><span>$</span><code>npx skills add Fentaris/fentaris-skills -g</code><button aria-label="Copy command" onClick={() => navigator.clipboard.writeText('npx skills add Fentaris/fentaris-skills -g')}>Copy</button></div>
      </div>
    </section>

    <section className="l2-pillars" id="why-fentaris">
      <div className="l2-section-heading"><span>Built for the agentic stack</span><h2>Control at the boundary.<br />Freedom everywhere else.</h2><p>Fentaris sits between agents and tools, adding the infrastructure production systems need.</p></div>
      <div className="l2-feature-grid">{landing2Features.map(feature => <article key={feature.title}><i>{feature.icon}</i><h3>{feature.title}</h3><p>{feature.copy}</p><a href="https://fentaris.mintlify.app/concepts/architecture">Learn more <Arrow /></a></article>)}</div>
    </section>

    <section className="l2-proxy">
      <div className="l2-proxy-copy"><span className="l2-label">One control plane</span><h2>Connect anything.<br />Govern everything.</h2><p>Keep the flexibility of MCP while centralizing the parts that matter: authentication, authorization, middleware, secrets, and audit logs.</p><ul><li><b>Any agent</b><span>Claude, Codex, custom clients</span></li><li><b>One endpoint</b><span>HTTP, stdio, and remote servers</span></li><li><b>Policy first</b><span>Rules evaluated before execution</span></li></ul></div>
      <div className="l2-diagram" aria-label="Agent requests pass through Fentaris to approved tools">
        <div className="l2-diagram-col"><span>Clients</span><b>Claude</b><b>Codex</b><b>Custom agent</b></div>
        <div className="l2-connector"><i /><i /><i /></div>
        <div className="l2-core"><Logo /><strong>fentaris</strong><small>AUTH · POLICY · LOGS</small><em>Request allowed</em></div>
        <div className="l2-connector reverse"><i /><i /><i /></div>
        <div className="l2-diagram-col"><span>Tools</span><b>GitHub</b><b>Notion</b><b>Slack</b></div>
      </div>
    </section>

    <section className="l2-quickstart" id="quickstart">
      <div className="l2-section-heading"><span>Start in minutes</span><h2>From zero to governed.</h2><p>Use the agent-guided setup or configure Fentaris manually. The same secure foundation either way.</p></div>
      <div className="l2-code-window"><div className="l2-code-top"><span /><span /><span /><b>terminal</b></div><pre><code><i>01</i><span className="l2-comment"># Install the Fentaris setup skills</span>{'\n'}<i>02</i><span>npx skills add Fentaris/fentaris-skills -g -a codex</span>{'\n'}<i>03</i>{'\n'}<i>04</i><span className="l2-comment"># Ask your agent to configure the proxy</span>{'\n'}<i>05</i><span>Use $fentaris-project-setup for my team.</span>{'\n'}<i>06</i>{'\n'}<i>07</i><span className="l2-success">✓ policy validated · proxy ready</span></code></pre></div>
    </section>

    <section className="l2-explore"><div className="l2-section-heading"><span>Explore Fentaris</span><h2>Everything you need to build.</h2></div><div className="l2-link-grid">{landing2Links.map(item => <a href={item.href} key={item.title}><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.copy}</p><b>Read the guide <Arrow /></b></a>)}</div></section>

    <section className="l2-final"><span>Open source · TypeScript · MCP native</span><h2>Give every agent the right tools.<br /><em>And only the right tools.</em></h2><a className="l2-primary" href="https://fentaris.mintlify.app/getting-started/quickstart">Build your first proxy <Arrow /></a></section>
    <footer className="l2-footer"><a className="l2-brand" href="/landing2"><Logo /><b>fentaris</b></a><p>The centralized MCP proxy.</p><div><a href="https://fentaris.mintlify.app">Docs</a><a href="https://github.com/Fentaris/fentaris">GitHub</a></div></footer>
  </div>
}

function Footer() {
  return <footer><a className="brand" href="#top"><Logo /><b>fentaris</b></a><p>The control plane for your MCP servers.</p><span>© 2026 Fentaris</span></footer>
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute())
  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  if (route === 'landing2') return <main><Landing2Page /></main>
  if (route === 'product') return <main><Header /><ProductPage /><Footer /></main>
  if (route === 'pricing') return <main><Header /><PricingPage /><Footer /></main>
  return <main><Header /><Hero /><Platform /><HowItWorks /><Footer /></main>
}

export default App
