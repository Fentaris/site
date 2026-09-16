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
        <a className="brand" href="#top"><img src="/logo-white.png" alt="Fentaris" className="brand-logo" /><b>fentaris</b></a>
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
                  <img src={icon} alt={`${name} logo`} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  </>
}

function Platform() {
  const [active, setActive] = useState<Tab>('Agents')
  const data = tabs[active]
  return <section className="platform" id="platform">
    <h2><b>Agents. Workflows. Memory. Harness.</b> Fentaris gives agents the secure tools they need to move fast.</h2>
    <div className="product-window">
      <div className="tabs" role="tablist">{(Object.keys(tabs) as Tab[]).map((tab,index)=><button key={tab} className={active===tab?'active':''} onClick={()=>setActive(tab)} role="tab" aria-selected={active===tab}><span>{['⌘','⌘','⌬','♧','◴'][index]}</span>{tab}</button>)}</div>
      <div className="product-content">
        <div className="code-pane"><div className="code-file">AGENT.TS</div>{data.code.map((line,index)=><code key={`${active}-${index}`}><i>{index+1}</i>{line}</code>)}</div>
        <div className="chat-pane"><div className="chat-toolbar"><span>Chat</span><span>Editor</span><span>Evaluate</span><span>Review</span></div><div className="conversation"><small>Fentaris agent</small><p>Access checked. I can safely search Gmail and update the approved Notion workspace.</p><div className="action-result"><b>Policy validated</b><span>2 tools allowed</span></div></div></div>
        <div className="product-caption"><b>{active}</b><span>{data.description}</span></div>
      </div>
    </div>
  </section>
}

function Observability() {
  return <section className="observability" id="solutions">
    <h2><b>Security and observability, built in.</b> Always see exactly what your agents are doing.</h2>
    <div className="observe-window"><div className="observe-tabs"><span>Evaluations</span><span>Metrics</span><span>Datasets</span><span>Traces</span><span>Signals</span></div><div className="data-table"><aside><b>Comparisons</b><span>Research Agent</span><span>Policy check</span><span>Tool access</span><span>Memory scope</span></aside><div className="rows"><div className="row head"><span>Name</span><span>Input</span><span>Output</span><span>Expected</span></div>{['Location request','Customer lookup','Email draft','Workspace update','Credential access'].map((name,index)=><div className={`row ${index===0||index===4?'failed':''}`} key={name}><span>{name}</span><span>{index===4?'private key':'agent request'}</span><span>{index===4?'blocked':'allowed'}</span><span>{index===4?'denied':'passed'}</span></div>)}</div><div className="table-caption"><b>Policy evaluations</b><span>Validate agent behavior before it reaches production.</span></div></div></div>
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
