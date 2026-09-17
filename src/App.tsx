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

const tabs = {
  Agents: {
    description: 'Define secure agents with instructions, tools, policies, and runtime identity.',
    code: ["import { Agent } from 'fentaris'", '', 'export const researchAgent = new Agent({', "  name: 'research-agent',", "  policy: 'least-privilege',", '  tools: [gmail, notion],', '})'],
  },
  Workflows: {
    description: 'Build durable, observable workflows with approvals at every sensitive step.',
    code: ["import { Workflow } from 'fentaris'", '', "export const review = new Workflow('review')", "  .step('read', readInbox)", "  .approve('send-email')", "  .step('send', sendReply)"],
  },
  Harness: {
    description: 'Bring one security and observability layer to every agent framework.',
    code: ["import { secure } from 'fentaris'", '', 'export const agent = secure(existingAgent, {', '  identity: true,', '  observe: true,', '  enforce: policies,', '})'],
  },
  Memory: {
    description: 'Keep agent memory useful, isolated, auditable, and under your control.',
    code: ["import { Memory } from 'fentaris'", '', 'const memory = new Memory({', "  namespace: 'support',", "  retention: '24h',", '  pii: false,', '})'],
  },
  Server: {
    description: 'Run a unified MCP gateway with policy enforcement built into every request.',
    code: ["import { Server } from 'fentaris'", '', 'new Server({', '  upstreams: [gmail, notion],', '  authorize: policy.check,', '  audit: true,', '}).listen()'],
  },
}

type Tab = keyof typeof tabs

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
  return <div className="hero-visual" aria-label="Fentaris agent observability preview">
    <div className="trace-card">
      <div className="trace-title">agent run: 'research-agent'</div>
      <div className="trace-line"><span>input processor: policy-check</span><em className="bar green" /></div>
      <div className="trace-line"><span>tool: 'gmail.search'</span><em className="bar purple" /></div>
      <div className="trace-line"><span>memory: 'workspace'</span><em className="bar short" /></div>
      <div className="trace-line"><span>output processor: audit-log</span><em className="bar amber" /></div>
    </div>
    <div className="project-card"><small>fentaris-project</small><span><CodeIcon>▣</CodeIcon>agents</span><span><CodeIcon>□</CodeIcon>tools</span><span><CodeIcon>≋</CodeIcon>policies</span><span><CodeIcon>⌁</CodeIcon>servers</span><span><CodeIcon>TS</CodeIcon>index.ts</span></div>
  </div>
}

function Hero() {
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard.writeText('Hello world'); setCopied(true); setTimeout(() => setCopied(false), 1600) }
  return <>
    <section className="hero" id="top">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1>Secure your AI agents</h1>
          <p>Manage, <span>observe</span>, and <span>protect</span> the agents that run your business with Fentaris, the secure infrastructure for the agentic era.</p>
          <div className="hero-links" id="setup"><button onClick={copy}>{copied ? 'Prompt copied' : 'Copy agent prompt'}</button><a href="https://fentaris.mintlify.app">Quickstart <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div>
        </div>
        <AgentVisual />
      </div>
    </section>
    <section className="integrations" id="integrations" aria-labelledby="integrations-title">
      <p id="integrations-title">Connect to any agent to any tool</p>
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
  { id: 'agents', label: 'Agents', icon: '✣', title: 'Agents', description: 'Define typed agents with instructions, models, tools, policies, and runtime behavior in one place.', code: ["import { Agent } from 'fentaris';", '', 'export const researchAgent = new Agent({', "  name: 'research-agent',", "  policy: 'least-privilege',", "  tools: [email, notion],", '});'] },
  { id: 'workflows', label: 'Workflows', icon: '⌘', title: 'Workflows', description: 'Compose durable multi-step work with explicit permissions at every boundary.', code: ["import { Workflow } from 'fentaris';", '', 'export const review = new Workflow({', "  name: 'approval-flow',", "  policy: 'review-required',", "  steps: [draft, approve, send],", '});'] },
  { id: 'harness', label: 'Harness', icon: '⌘', title: 'Harness', description: 'Run agents inside a controlled harness with validation, approvals, and limits.', code: ["import { Harness } from 'fentaris';", '', 'export const harness = new Harness({', "  mode: 'enforced',", "  approvals: ['write', 'send'],", "  audit: true,", '});'] },
  { id: 'memory', label: 'Memory', icon: '◔', title: 'Memory', description: 'Keep useful context while policies control what can be stored and recalled.', code: ["import { Memory } from 'fentaris';", '', 'export const memory = new Memory({', "  scope: 'workspace',", "  retention: '30d',", "  redact: ['secrets'],", '});'] },
  { id: 'server', label: 'Server', icon: '⟳', title: 'Server', description: 'Connect agents to approved services through one observable control plane.', code: ["import { Server } from 'fentaris';", '', 'export const server = new Server({', "  auth: 'required',", "  transports: ['mcp'],", "  telemetry: true,", '});'] },
  { id: 'factory', label: 'Factory', icon: '▱', title: 'Factory', description: 'Ship repeatable agent systems from secure, reusable building blocks.', code: ["import { Factory } from 'fentaris';", '', 'export const factory = new Factory({', "  template: 'secure-agent',", "  checks: ['policy', 'evals'],", '});'] },
]

const observabilityTabs = [
  { id: 'evals', label: 'Evals', icon: '◉' },
  { id: 'metrics', label: 'Metrics', icon: '⌁' },
  { id: 'datasets', label: 'Datasets', icon: '▤' },
  { id: 'traces', label: 'Traces', icon: '☷' },
  { id: 'signals', label: 'Signals', icon: '◉' },
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
    <h2><b>Agents. Workflows. Memory. Harness.</b> Fentaris gives<br />agents the secure tools they need to move fast.</h2>
    <div className="showcase-shell product-showcase" data-active-index={activeIndex} style={bridgeStyle}>
      <div className="showcase-tabs" role="tablist" aria-label="Agent platform features">
        <i className="showcase-tab-bridge" aria-hidden="true" />
        {showcaseTabs.map(tab => <button key={tab.id} role="tab" aria-selected={active.id === tab.id} className={active.id === tab.id ? 'active' : ''} onClick={() => setActiveId(tab.id)}><span>{tab.icon}</span>{tab.label}</button>)}
      </div>
      <div className="product-stage" role="tabpanel">
        <div className="product-stage-content">
          <div className="stage-glow" />
          <ShowcaseCode lines={active.code} label={active.title} />
          <div className="studio-card">
            <div className="studio-toolbar"><span className="selected">▢ Chat</span><span>⚙ Editor</span><span>⚗ Evaluate</span><span>✎ Review</span><b>Agents&nbsp; / &nbsp;Schema Validated</b></div>
            <div className="studio-body"><aside><b>＋ New Chat</b><strong>{active.title} workspace</strong><span>Policy review</span><span>Tool access</span></aside><main><small>Fentaris / {active.title}</small><p>Access checked. I can safely continue with the approved tools and policy.</p><div className="validation"><span>Policy validated</span><em>2 tools allowed</em></div></main></div>
          </div>
          <div className="stage-caption"><b>{active.title}</b><span>{active.description}</span></div>
        </div>
      </div>
    </div>
  </section>
}

function EvaluationMatrix() {
  return <div className="eval-console">
    <div className="eval-toolbar"><span>▣ Last 24 hours</span><span>☰ Add filter</span><b>Experiments&nbsp; / &nbsp;Research Agent Evaluation Suite</b></div>
    <div className="eval-console-body"><aside><b>Comparisons</b><strong>✣ Research Agent</strong><b>Prompt</b><span>▢ v3-edited</span><b>Dataset</b><span>▤ policy-data</span><b>Scorers</b><span>▣ policy-checker</span></aside>
      <div className="matrix"><div className="matrix-row matrix-head"><span></span><span>Name</span><span>Input</span><span>Output</span><span>Expected</span><span>Tags</span></div><div className="matrix-row failed"><span>1&nbsp; ◉</span><span>eval</span><span>Enter location for weather…</span><span>Today's forecast: Expect sun…</span><span>492631</span><span>—</span></div><div className="matrix-row failed"><span>1&nbsp; ◉</span><span>eval</span><span>Provide city or ZIP code</span><span>Rain showers are likely…</span><span>835279</span><span>—</span></div><div className="matrix-row"><span>1&nbsp; ◌</span><span>eval</span><span>Specify the location…</span><span>Mild temperatures…</span><span>948362</span><span>—</span></div><div className="matrix-row"><span>1&nbsp; ◌</span><span>eval</span><span>Enter the name of the city…</span><span>Heavy snowfall predicted…</span><span>517834</span><span>—</span></div><div className="matrix-row failed"><span>1&nbsp; ◉</span><span>eval</span><span>Type your area or region</span><span>A chilly evening ahead…</span><span>174958</span><span>—</span></div></div>
    </div>
  </div>
}

function DatasetPanel() {
  return <div className="dataset-console">
    <div className="dataset-breadcrumb">Datasets&nbsp; / &nbsp;<b>Research Agent Evaluation Suite</b></div>
    <div className="dataset-summary"><h3>▤ &nbsp;Research Agent Evaluation Suite</h3><p>Curated test cases covering access checks, policy decisions, tool permissions, and secure agent workflows.</p><small>◴ &nbsp;Created Sep 16, 2026</small><small>▣ &nbsp;Latest version v1</small><div><span>Items&nbsp; <b>20</b></span><span>Experiments&nbsp; <b>20</b></span><span>Review</span></div></div>
    <div className="dataset-search">Search… &nbsp;&nbsp;⌕</div>
    <div className="dataset-table"><div><span>Id</span><span>Input</span><span>Ground Truth</span><span>Created</span></div><div><span>cc92b4a7</span><span>{'{"query":"Can this agent send email?"}'}</span><span>{'{"allowed":true,"policy":"review"…}'}</span><span>Today</span></div><div><span>ef193cd5</span><span>{'{"query":"Read a private credential"}'}</span><span>{'{"allowed":false,"reason":"secret"…}'}</span><span>Today</span></div></div>
  </div>
}

function Observability() {
  const [active, setActive] = useState('evals')
  const current = observabilityTabs.find(tab => tab.id === active) ?? observabilityTabs[0]
  return <section className="observability observability-v2">
    <h2><b>Security and observability, built in.</b> Always see exactly<br />what your agents are doing.</h2>
    <div className="showcase-shell eval-showcase">
      <div className="showcase-tabs" role="tablist" aria-label="Observability features">{observabilityTabs.map(tab => <button key={tab.id} role="tab" aria-selected={active === tab.id} className={active === tab.id ? 'active' : ''} onClick={() => setActive(tab.id)}><span>{tab.icon}</span>{tab.label}</button>)}</div>
      <div className="eval-stage" role="tabpanel">{active === 'datasets' ? <DatasetPanel /> : <EvaluationMatrix />}<div className="stage-caption"><b>{current.label}</b><span>{active === 'datasets' ? 'Capture production traces as repeatable evaluation datasets.' : 'Validate agent behavior before it reaches production.'}</span></div></div>
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
  return <footer><a className="brand" href="#top"><Logo /><b>fentaris</b></a><p>Secure infrastructure for AI agents.</p><span>© 2026 Fentaris</span></footer>
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
  return <main><Header /><Hero /><Platform /><Observability /><Footer /></main>
}

export default App
