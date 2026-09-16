import { useEffect, useState } from 'react'

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
        <a className="brand" href="#top"><img src="/logo-white.png?v=2" alt="Fentaris" className="brand-logo" /><b>fentaris</b></a>
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
  const active = showcaseTabs.find(tab => tab.id === activeId) ?? showcaseTabs[0]
  return <section className="platform platform-v2" id="platform">
    <h2><b>Agents. Workflows. Memory. Harness.</b> Fentaris gives<br />agents the secure tools they need to move fast.</h2>
    <div className="showcase-shell product-showcase">
      <div className="showcase-tabs" role="tablist" aria-label="Agent platform features">
        {showcaseTabs.map(tab => <button key={tab.id} role="tab" aria-selected={active.id === tab.id} className={active.id === tab.id ? 'active' : ''} onClick={() => setActiveId(tab.id)}><span>{tab.icon}</span>{tab.label}</button>)}
      </div>
      <div className="product-stage" role="tabpanel">
        <div className="stage-glow" />
        <ShowcaseCode lines={active.code} label={active.title} />
        <div className="studio-card">
          <div className="studio-toolbar"><span className="selected">▢ Chat</span><span>⚙ Editor</span><span>⚗ Evaluate</span><span>✎ Review</span><b>Agents&nbsp; / &nbsp;Schema Validated</b></div>
          <div className="studio-body"><aside><b>＋ New Chat</b><strong>{active.title} workspace</strong><span>Policy review</span><span>Tool access</span></aside><main><small>Fentaris / {active.title}</small><p>Access checked. I can safely continue with the approved tools and policy.</p><div className="validation"><span>Policy validated</span><em>2 tools allowed</em></div></main></div>
        </div>
        <div className="stage-caption"><b>{active.title}</b><span>{active.description}</span></div>
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

type Route = 'home' | 'product' | 'pricing'

function getRoute(): Route {
  const hash = window.location.hash
  if (hash.startsWith('#/product')) return 'product'
  if (hash.startsWith('#/pricing')) return 'pricing'
  return 'home'
}

function StubPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="stub-page">
    <div className="stub-shell">
      <a className="stub-back" href="#top">← Back home</a>
      <h1>{title}</h1>
      {children}
    </div>
  </section>
}

function ProductPage() {
  return <StubPage title="Product">
    <p>This page is under construction. In the meantime, see the product tour on the <a href="#top">homepage</a>.</p>
  </StubPage>
}

function PricingPage() {
  return <StubPage title="Pricing">
    <p>Fentaris is currently available as <b>open source</b>, free to self-host.</p>
    <p>We are building a <b>hosted platform</b> — a managed version of Fentaris with no infrastructure to run yourself. Pricing details will be published when it's ready.</p>
    <a className="stub-cta" href="https://github.com/fentaris">Get the open source version <Arrow diagonal /></a>
  </StubPage>
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute())
  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  if (route === 'product') return <main><Header /><ProductPage /></main>
  if (route === 'pricing') return <main><Header /><PricingPage /></main>
  return <main><Header /><Hero /><Platform /><Observability /><footer><a className="brand" href="#top"><Logo /><b>fentaris</b></a><p>Secure infrastructure for AI agents.</p><span>© 2026 Fentaris</span></footer></main>
}

export default App
