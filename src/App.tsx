import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import claudeLogo from './assets/clients/claude.svg'
import codexLogo from './assets/clients/codex.svg'
import cursorLogo from './assets/clients/cursor.svg'
import linearLogo from './assets/clients/linear.svg'
import notionLogo from './assets/clients/notion.svg'

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
  { id: 'servers', label: 'Servers', icon: '⟳', title: 'Servers', description: 'Register local and remote servers, inspect their health, and expose every tool through the same endpoint.', code: ['import { fentaris, stdio }', "  from '@fentaris/core';", '', 'const app = fentaris();', "app.mcp('filesystem', {", '  transport: stdio({', "    command: 'npx',", '    args: [', "      '-y',", "      '@modelcontextprotocol/server-filesystem',", "      '/tmp',", '    ],', '  }),', '});'] },
  { id: 'routing', label: 'Routing', icon: '⌘', title: 'Routing', description: 'Resolve every namespaced tool call to the right upstream without changing client configuration.', code: ["app.mcp('github', {", '  transport: stdio({', "    command: 'npx',", "    args: ['-y', '...server-github'],", '  }),', '});', '', '// exposed as github__list_issues'] },
  { id: 'policies', label: 'Policies', icon: '◇', title: 'Policies', description: 'Evaluate identity, group, server, and tool rules before an upstream request can run.', code: ["app.policy('read-only')", "  .mcp('filesystem')", "  .allow('list_directory');", '', "app.group('operators')", "  .policy('read-only');"] },
  { id: 'identity', label: 'Identity', icon: '◔', title: 'Identity', description: 'Turn an incoming API key into a trusted request context with users, groups, and attached policies.', code: ['$ fentaris auth api-key add alice --generate', '', "app.group('operators')", "  .users(user('alice', {", "    email: 'alice@example.com',", '  }))', "  .policy('read-only');"] },
  { id: 'auth', label: 'OAuth', icon: '✣', title: 'OAuth', description: 'Connect OAuth-protected remote servers while keeping upstream tokens out of application code and logs.', code: ["app.mcp('linear', {", '  transport: streamableHttp({', "    url: 'https://mcp.linear.app/mcp',", '  }),', '  auth: oauth(),', '});'] },
  { id: 'events', label: 'Observe', icon: '⌁', title: 'Observe', description: 'Follow authentication, policy, upstream execution, result, and duration in one request trace.', code: ["app.on('tool:success', (", '  { ctx, durationMs }', ') => {', "  ctx.log.info('tool.success', {", '    tool: ctx.tool?.name,', '    durationMs,', '  });', '});'] },
]

function ShowcaseCode({ lines, label }: { lines: string[]; label: string }) {
  const highlightedLines = useMemo(
    () => lines.map(line => Prism.highlight(line || ' ', Prism.languages.typescript, 'typescript')),
    [lines],
  )

  return <div className="showcase-code"><span className="showcase-code-label">{label}.ts</span><pre>{highlightedLines.map((line, index) => <code key={`${lines[index]}-${index}`}><i>{index + 1}</i><span dangerouslySetInnerHTML={{ __html: line }} /></code>)}</pre></div>
}

function FeatureConsole({ feature }: { feature: string }) {
  const header = <div className="feature-console-top"><span><Logo />Fentaris</span><code>http://localhost:4000/mcp</code><b>● LIVE</b></div>
  if (feature === 'servers') return <div className="feature-console servers-console">{header}<div className="console-heading"><div><small>UPSTREAM REGISTRY</small><h3>3 servers</h3></div><span className="console-action">＋ Add server</span></div><div className="server-rows"><div><i>GH</i><span><b>github</b><small>stdio · 12 tools</small></span><em>Healthy</em></div><div><i>LI</i><span><b>linear</b><small>Streamable HTTP · 18 tools</small></span><em>Healthy</em></div><div><i>FS</i><span><b>filesystem</b><small>stdio · 14 tools</small></span><em>Local</em></div></div></div>
  if (feature === 'routing') return <div className="feature-console routing-console">{header}<div className="console-heading"><div><small>ROUTE INSPECTOR</small><h3>Tool call resolved</h3></div><em>184 ms</em></div><div className="route-request"><small>INCOMING MCP REQUEST</small><code>tools/call&nbsp;&nbsp; github__list_issues</code></div><div className="route-rail"><span><i>01</i><b>Namespace</b><small>github</small></span><span><i>02</i><b>Upstream</b><small>github · stdio</small></span><span><i>03</i><b>Operation</b><small>list_issues</small></span></div></div>
  if (feature === 'policies') return <div className="feature-console policies-console">{header}<div className="decision-head"><span><i>✓</i><small>POLICY DECISION</small><b>Allowed</b></span><code>2 ms</code></div><dl className="decision-grid"><div><dt>Identity</dt><dd>alice@example.com</dd></div><div><dt>Groups</dt><dd>operators</dd></div><div><dt>Target</dt><dd>filesystem__list_directory</dd></div><div><dt>Matched rule</dt><dd>read-only / allow</dd></div></dl><div className="decision-foot">Request may continue to the filesystem upstream.</div></div>
  if (feature === 'identity') return <div className="feature-console identity-console">{header}<div className="identity-profile"><i>A</i><span><small>RESOLVED IDENTITY</small><h3>Alice</h3><p>alice@example.com</p></span><em>API key verified</em></div><div className="identity-context"><section><small>GROUP</small><b>operators</b><span>1 active membership</span></section><section><small>ATTACHED POLICY</small><b>read-only</b><span>tool discovery filtered</span></section></div><div className="identity-foot"><span>Request context</span><code>user:alice · group:operators</code></div></div>
  if (feature === 'auth') return <div className="feature-console oauth-console">{header}<div className="oauth-connection"><i>LI</i><span><small>REMOTE MCP CONNECTION</small><h3>Linear</h3><p>https://mcp.linear.app/mcp</p></span><em>Connected</em></div><div className="oauth-details"><div><small>AUTHORIZATION</small><b>OAuth 2.1</b></div><div><small>TOKEN</small><b>Encrypted · managed</b></div><div><small>REFRESH</small><b>Automatic</b></div></div><div className="oauth-safe">Credential values are redacted from middleware, policies, and logs.</div></div>
  return <div className="feature-console events-console">{header}<div className="console-heading"><div><small>REQUEST TRACE</small><h3>github__list_issues</h3></div><em>success · 184 ms</em></div><div className="trace-events"><div><i /><code>00 ms</code><span><b>client.authenticated</b><small>identity alice resolved</small></span></div><div><i /><code>04 ms</code><span><b>policy.allowed</b><small>operators / github read</small></span></div><div><i /><code>06 ms</code><span><b>upstream.request</b><small>github · stdio</small></span></div><div><i /><code>184 ms</code><span><b>tool.success</b><small>response returned to client</small></span></div></div></div>
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
          <FeatureConsole feature={active.id} />
          <div className="stage-caption"><b>{active.title}</b><span>{active.description}</span></div>
        </div>
      </div>
    </div>
  </section>
}

const flowSteps = [
  { label: 'MCP clients', title: 'Clients send MCP requests to Fentaris.', copy: 'Claude Code, Codex, Cursor, and custom clients use the same endpoint for initialization, tool discovery, and tool calls.' },
  { label: 'Client authentication', title: 'Fentaris identifies the caller.', copy: 'It validates the client API key, loads the associated identity, and resolves the user and groups used by downstream policy checks.' },
  { label: 'Authorization', title: 'Fentaris checks whether the action is allowed.', copy: 'The policy engine evaluates the resolved identity, MCP operation, server, and tool. A denied request stops here and never reaches the upstream.' },
  { label: 'Upstream request', title: 'Fentaris authenticates to the MCP server.', copy: 'It loads the upstream credentials, sends the request through the configured transport, receives the response, and records lifecycle events.' },
  { label: 'MCP response', title: 'The result returns to the client.', copy: 'The selected server executes the tool. Fentaris records the outcome and duration, then returns the MCP response to the original client.' },
]

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let frame = 0
    const updateStep = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const activationLine = window.innerHeight * .52
        const reachedStep = stepRefs.current.reduce((active, step, index) => {
          if (!step) return active
          return step.getBoundingClientRect().top <= activationLine ? index : active
        }, 0)
        setActiveStep(reachedStep)
      })
    }
    updateStep()
    window.addEventListener('scroll', updateStep, { passive: true })
    window.addEventListener('resize', updateStep)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateStep)
      window.removeEventListener('resize', updateStep)
    }
  }, [])

  return <section className="request-flow" id="how-it-works">
    <h2><b>One request. One control plane.</b><span>Follow a tool call from the MCP client<br />to the right server and back.</span></h2>
    <div className="scroll-flow-shell">
      <div className="flow-sticky" aria-label="MCP request lifecycle" aria-live="polite">
        <div className="request-graph" data-step={activeStep}>
          <div className="graph-clients">
            <div className="graph-item"><img src={claudeLogo} alt="" /><b>Claude Code</b></div>
            <div className="graph-item"><img src={codexLogo} alt="" /><b>Codex</b></div>
            <div className="graph-item"><img src={cursorLogo} alt="" /><b>Cursor</b></div>
            <div className="graph-item"><i className="client-mark app-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5M8 14l-2 2 2 2M16 14l2 2-2 2" /></svg></i><b>Custom client</b></div>
          </div>
          <svg className="graph-lines lines-in" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true"><path d="M12 0 V24 H50 V50" /><path d="M37 0 V34 H50 V50" /><path d="M63 0 V34 H50 V50" /><path d="M88 0 V24 H50 V50" /></svg>
          <div className="graph-core">
            <div className="graph-core-brand"><Logo /><b>fentaris</b></div>
            <div className="fentaris-pipeline"><div className="pipeline-track"><span className="pipeline-auth"><b>Authenticate</b></span><span className="pipeline-policy"><b>Authorize</b></span><span className="pipeline-upstream"><b>Proxy request</b></span></div></div>
            <div className="core-silo identity-silo"><i className="silo-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" /><path d="M5.5 19c.7-3.3 3-5 6.5-5s5.8 1.7 6.5 5" /></svg></i><span>Identities</span></div>
            <div className="core-silo policy-silo"><i className="silo-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 19 6v5.3c0 4.2-2.8 7.5-7 9.2-4.2-1.7-7-5-7-9.2V6Z" /><path d="m8.8 11.8 2.1 2.1 4.4-4.5" /></svg></i><span>Policies</span></div>
            <div className="core-silo secrets-silo"><i className="silo-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8.5" cy="12" r="3.5" /><path d="M12 12h8M17 12v3M14.5 12v2" /></svg></i><span>Credentials</span></div>
            <div className="core-silo events-silo"><i className="silo-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h13" /><circle cx="18" cy="12" r="2" /></svg></i><span>Events</span></div>
          </div>
          <svg className="graph-lines lines-out" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 V24 H12 V50" /><path d="M50 0 V34 H37 V50" /><path d="M50 0 V34 H63 V50" /><path d="M50 0 V24 H88 V50" /></svg>
          <div className="graph-servers">
            <div className="graph-item"><i className="server-mark github-mark"><Github /></i><b>GitHub</b></div>
            <div className="graph-item"><img src={linearLogo} alt="" /><b>Linear</b></div>
            <div className="graph-item"><img src={notionLogo} alt="" /><b>Notion</b></div>
            <div className="graph-item"><i className="server-mark filesystem-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5h7l2 2h9v9.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M3 9h18" /></svg></i><b>Filesystem</b></div>
          </div>
        </div>
      </div>
      <div className="flow-scroll-copy">{flowSteps.map((step, index) => <div className={activeStep === index ? 'flow-scroll-step active' : 'flow-scroll-step'} data-flow-step={index} ref={element => { stepRefs.current[index] = element }} key={step.label}><h3>{step.title}</h3><p>{step.copy}</p></div>)}</div>
    </div>
  </section>
}

const controlPlanePoints = [
  { title: 'Change the gateway, not every client', copy: 'Add, remove, or replace upstream servers while clients keep using the same Fentaris endpoint.' },
  { title: 'Keep tool names predictable', copy: 'Every upstream stays namespaced, so tools remain stable as your MCP stack grows.' },
  { title: 'Apply decisions once', copy: 'Authentication, policy, middleware, approvals, rate limits, and logs live at the shared boundary.' },
]

function ControlPlaneStory() {
  return <section className="control-story">
    <div className="story-shell">
      <div className="story-intro"><h2>Stop managing MCP<br /><span>one client at a time.</span></h2><p>Direct connections are simple at first. Then every agent has its own server list, credentials, permissions, and failure modes. Fentaris moves that operational complexity into one control plane.</p></div>
      <div className="story-list">{controlPlanePoints.map(point => <article key={point.title}><h3>{point.title}</h3><p>{point.copy}</p></article>)}</div>
    </div>
  </section>
}

const quickstartCommands = [
  'npm install -g @fentaris/cli',
  'fentaris init my-proxy',
  'cd my-proxy',
  'fentaris dev',
]

function QuickstartSection() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const terminal = terminalRef.current
    if (!terminal || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsVisible(true)
      observer.disconnect()
    }, { threshold: .35 })
    observer.observe(terminal)
    return () => observer.disconnect()
  }, [])

  return <section className="home-quickstart" id="quickstart">
    <div className="quickstart-heading"><h2>Your first MCP control plane<br /><span>in a few commands.</span></h2></div>
    <div ref={terminalRef} className={`quickstart-terminal${isVisible ? ' is-visible' : ''}`} aria-label={`Terminal commands: ${quickstartCommands.join(', ')}`}>
      <div className="terminal-top" aria-hidden="true"><span /><span /><span /><b>terminal</b></div>
      <pre aria-hidden="true"><code>{quickstartCommands.map((command, index) => <span className="terminal-line" key={command}><i>$</i><span className="terminal-command" style={{ '--chars': command.length, '--delay': `${index * 1.05 + .35}s` } as CSSProperties}>{command}</span>{index === quickstartCommands.length - 1 && <em className="terminal-cursor" />}</span>)}</code></pre>
    </div>
  </section>
}

const faqs = [
  ['What is Fentaris?', 'Fentaris is an open-source control plane and proxy for MCP servers. It gives MCP clients one endpoint while centralizing routing, identity, policy, authentication, and observability.'],
  ['Do I need to change my MCP servers?', 'No. Fentaris sits between MCP clients and upstream servers, and supports local stdio as well as remote HTTP-based transports.'],
  ['Can I use it with more than one AI client?', 'Yes. Any compatible MCP client can connect to the same endpoint and receive the tools allowed for its resolved identity and policies.'],
  ['How are remote credentials handled?', 'Upstreams can use API keys, bearer tokens, custom headers, or OAuth 2.1. Credential values are kept away from middleware, hooks, logs, and policy callbacks.'],
]

function FaqSection() {
  return <section className="faq-section"><div className="faq-shell"><div><h2>Common questions<br /></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></div></section>
}

function HomeCta() {
  return <section className="home-cta"><div className="home-cta-glow" /><h2>One endpoint for every server.<br /><span>One place to stay in control.</span></h2><div><a className="cta-primary" href="https://fentaris.mintlify.app/getting-started/quickstart">Build your first proxy <Arrow /></a><a className="cta-secondary" href="https://github.com/Fentaris/fentaris"><Github /> View on GitHub</a></div></section>
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
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#top"><Logo /><b>fentaris</b></a><p>The open-source control plane for your MCP servers.</p><span>Run, route, manage, and observe MCP through one stable endpoint.</span></div><div className="footer-column"><b>Product</b><a href="#platform">Platform</a><a href="#how-it-works">How it works</a><a href="#quickstart">Quickstart</a></div><div className="footer-column"><b>Resources</b><a href="https://fentaris.mintlify.app">Documentation</a><a href="https://fentaris.mintlify.app/concepts/architecture">Architecture</a><a href="https://fentaris.mintlify.app/getting-started/quickstart">Getting started</a></div><div className="footer-column"><b>Community</b><a href="https://github.com/Fentaris/fentaris">GitHub</a><a href="https://github.com/Fentaris/fentaris/issues">Issues</a><a href="https://github.com/Fentaris/fentaris/blob/main/LICENSE.txt">MIT License</a></div></div><div className="footer-bottom"><span>© 2026 Fentaris</span><span>Built for the Model Context Protocol.</span></div></footer>
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
  return <main><Header /><Hero /><ControlPlaneStory /><Platform /><HowItWorks /><QuickstartSection /><FaqSection /><HomeCta /><Footer /></main>
}

export default App
