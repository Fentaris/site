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

const Logo = () => <span className="logo" aria-hidden="true"><img src="/logo-white.png" alt="" /></span>

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
        <a className="brand" href="/" aria-label="Fentaris home"><Logo /><b>fentaris</b></a>
        <nav aria-label="Main navigation">
          <a href="/product">Product</a><a href="/pricing">Pricing</a><a href="https://fentaris.mintlify.app">Docs</a>
        </nav>
        <div className="nav-actions">
          <a className="github-count" href="https://github.com/fentaris/fentaris"><Github /><b>GitHub</b></a>
        </div>
      </div>
    </header>
  </>
}

const heroScenes = [
  {
    request: "github.list_issues",
    lines: [
      ['client: api-key authenticated', 'green'],
      ['policy: tool allowed', 'purple'],
      ['route: github upstream', 'short'],
      ['event: tool.success · 184ms', 'amber'],
    ],
    complete: 'request completed',
    endpoint: 'one stable /mcp endpoint',
    items: [['↳', 'github'], ['↳', 'notion'], ['↳', 'filesystem'], ['≋', 'policies'], ['⌁', 'request logs']],
  },
  {
    request: "filesystem.write_file",
    lines: [
      ['identity: codex resolved', 'green'],
      ['policy: approval required', 'purple'],
      ['approval: operator granted', 'short'],
      ['event: tool.success · 241ms', 'amber'],
    ],
    complete: 'approved and executed',
    endpoint: 'policy enforced before execution',
    items: [['◉', 'codex agent'], ['◇', 'write policy'], ['✓', 'human approval'], ['↳', 'filesystem'], ['⌁', 'audit event']],
  },
  {
    request: "linear.create_issue",
    lines: [
      ['client: alice authenticated', 'green'],
      ['oauth: token refreshed', 'purple'],
      ['route: linear remote mcp', 'short'],
      ['event: tool.success · 126ms', 'amber'],
    ],
    complete: 'trace recorded',
    endpoint: 'every action stays observable',
    items: [['◔', 'alice'], ['⌘', 'linear'], ['✣', 'managed OAuth'], ['↗', 'remote server'], ['⌁', 'complete trace']],
  },
] as const

function AgentVisual() {
  const [sceneIndex, setSceneIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setSceneIndex(index => (index + 1) % heroScenes.length), 5600)
    return () => window.clearInterval(timer)
  }, [])

  const scene = heroScenes[sceneIndex]

  return <div className="hero-visual" aria-label="Live Fentaris MCP request preview">
    <div className="trace-card" key={`trace-${scene.request}`}>
      <div className="trace-scan" aria-hidden="true" />
      <div className="trace-title"><span>mcp request: '{scene.request}'</span><small><i /> live</small></div>
      <div className="trace-runner" aria-hidden="true"><i /></div>
      {scene.lines.map(([label, bar], index) => <div className="trace-line" style={{ '--trace-delay': `${index * .8}s` } as CSSProperties} key={label}><span>{label}</span><em className={`bar ${bar}`} /></div>)}
      <div className="trace-complete"><i /> {scene.complete}</div>
    </div>
    <div className="project-card" key={`project-${scene.request}`}>
      <small>{scene.endpoint} <i /></small>
      {scene.items.map(([icon, label]) => <span key={label}><CodeIcon>{icon}</CodeIcon>{label}</span>)}
      <div className="project-cycle" aria-hidden="true">{heroScenes.map((item, index) => <i className={index === sceneIndex ? 'active' : ''} key={item.request} />)}</div>
    </div>
  </div>
}

function IntegrationMarquee() {
  return <section className="integrations" id="integrations" aria-labelledby="integrations-title">
    <p id="integrations-title">Connect any tool to any agent</p>
    <div className="integration-marquee">
      <div className="integration-track">
        {[false, true].map((duplicate) => (
          <ul className="integration-list" aria-hidden={duplicate || undefined} key={String(duplicate)}>
            {integrations.map(({ name, icon }) => (
              <li key={name} title={name}><img src={`${icon}?v=2`} alt={`${name} logo`} /></li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </section>
}

function Hero() {
  const [copied, setCopied] = useState(false)
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (copyResetTimer.current) clearTimeout(copyResetTimer.current)
  }, [])

  const copy = async () => {
    if (copyResetTimer.current) clearTimeout(copyResetTimer.current)
    setCopied(true)

    try {
      await navigator.clipboard.writeText(`Set up Fentaris completely on this computer with a zero-hassle experience.

   Act autonomously: detect the operating system, inspect the environment, install missing prerequisites, install the official Fentaris CLI and skills, create a working local Fentaris proxy, offer to migrate existing MCP servers from the AI clients
 already installed, configure the clients I select, and validate the result end to end.

   Use only official sources:
   - CLI package: @fentaris/cli
   - Skills: https://github.com/Fentaris/fentaris-skills
   - Documentation: https://fentaris.mintlify.app

   If $fentaris-machine-setup is already available, use it. Otherwise, follow this prompt as the setup contract.

   Do not merely explain commands when you have terminal and file access: perform the work. Use an interactive question or dialog tool when available, ask one focused question at a time, and fall back to a short text question if no dialog tool exists.

   TARGET STATE

   The completed setup must include:

   1. A supported Node.js and npm installation. Prefer Node 24 LTS on a new machine.
   2. The official Fentaris CLI.
   3. All official Fentaris skills installed for the AI clients I select.
   4. A local Fentaris proxy project, preferably under ~/fentaris-proxy.
   5. Only the MCP servers I approve migrated behind Fentaris.
   6. The selected AI clients connected to one validated Fentaris endpoint.
   7. Credentials and OAuth tokens stored securely.
   8. Successful static and runtime validation.
   9. Backups and exact rollback instructions.

   SAFETY RULES

   - Inventory the environment before changing anything.
   - Never expose or repeat passwords, tokens, API keys, client secrets, refresh tokens, or credential values.
   - Never place secrets in source code, fentaris.json, prose, logs, shell arguments, or retained agent-terminal output.
   - Do not run an API-key generation command if its raw output will be captured in the agent transcript. Use a verified secret-output channel, protected input with --value-stdin, or ask me to run the single generation command in a private terminal.
   - Back up every client configuration before editing it.
   - Do not remove or disable original MCP entries until Fentaris and that client have both been validated.
   - Keep Fentaris bound to 127.0.0.1 unless I explicitly approve network exposure after authentication and policy are configured.
   - Ask before privileged installation, changing a security boundary, sharing credentials between users, creating autostart, or removing original configuration.
   - Do not claim that Codex, Claude, Cursor, or other agent/persona definitions are imported into Fentaris. Fentaris centralizes MCP servers, identity, policy, credentials, and observability; client-specific agents remain in their client.
   - Do not claim completion if build, static checks, runtime checks, or selected-client connectivity failed.

   PHASE 1 — READ-ONLY INVENTORY

   Without modifying the machine:

   1. Detect the operating system, architecture, shell, and available package manager.
   2. Inspect the versions or absence of Node.js, npm/npx, pnpm/bun, Git, and Fentaris.
   3. Detect installed MCP-capable clients such as Codex, Claude Code, Claude Desktop, Cursor, Gemini CLI, OpenCode, and any others you can identify reliably.
   4. Locate their documented global and workspace MCP configuration without scanning unrelated personal data.
   5. Inventory MCP server names, configuration scope, and transport: stdio, Streamable HTTP, SSE, or unknown.
   6. Note whether credentials are present without reading their values into the conversation.
   7. Inventory installed skills and client-owned agent/persona definitions.

   Show me only a short, redacted summary.

   PHASE 2 — CONSENT

   Ask which detected clients I want to integrate. Offer only clients you actually detected, plus:

   - All detected clients
   - Current client only
   - Fentaris only

   Then ask which detected MCP servers I want to migrate. Show the server name, source client, configuration scope, and transport, but never credential values.

   If agent or persona definitions exist, explain that they remain in their client. Ask whether I want to:

   - Leave them unchanged
   - Install the Fentaris skills and configure their client to use the Fentaris endpoint
   - Skip agent-related changes

   Do not ask for information you already discovered.

   Use safe defaults for choices that do not change a security boundary:

   - A user-owned project directory
   - Loopback networking
   - Endpoint path /mcp
   - An available local port

   PHASE 3 — INSTALLATION

   After receiving consent:

   1. Install a supported Node.js version only if it is missing or incompatible. Prefer Node 24 LTS for a new machine and use a trusted platform installer.
   2. Verify:

      node --version
      npm --version

   3. Install or update the official CLI:

      npm install -g @fentaris/cli

   4. Verify:

      fentaris --version
      fentaris --help

   5. Inspect the available \`npx skills\` targets and install every official Fentaris skill for each selected supported agent, using an explicit target, for example:

      npx skills add Fentaris/fentaris-skills -g -a <agent> --skill '*'

   6. Do not use --all unless I approve installing the skills into every supported agent.
   7. If a client must restart to load newly installed skills, continue the setup using official CLI help and documentation. Report the required restart at the end.

   PHASE 4 — CREATE OR SELECT THE PROJECT

   If no suitable Fentaris project exists:

   1. Inspect:

      fentaris init --help

   2. Create a minimal project using explicit, non-interactive options.
   3. Default to:
      - Directory: ~/fentaris-proxy
      - Host: 127.0.0.1
      - Path: /mcp
      - Port: 4000, or the first available port
   4. Use an available package manager and install dependencies.
   5. Inspect the generated files before editing them.
   6. Keep port, endpoint path, entrypoint, and auth directory in fentaris.json.
   7. Host is not a fentaris.json field. Retain the default loopback binding unless intentional exposure is configured through a supported application option.

   If a suitable Fentaris project already exists, ask whether I want to reuse it or create a separate one.

   PHASE 5 — MIGRATE MCP SERVERS

   For each approved MCP server:

   1. Preserve a stable, unique name, command and arguments or URL, transport, and required working directory.
   2. Map stdio servers directly to the Fentaris stdio transport without shell wrappers unless officially required.
   3. Map remote servers to their actual Streamable HTTP or SSE transport.
   4. Detect loopback, private, and link-local upstream or OAuth endpoints.
   5. Ask before allowing private destinations.
   6. Prefer a narrow network.allowedPrivateHosts allow-list.
   7. Use allowPrivateNetworkUrls: true only if I explicitly accept the broader SSRF exposure.
   8. Use high-level Fentaris APIs such as:
      - app.mcp(...)
      - mcp(...)
      - stdio(...)
      - streamableHttp(...)
      - sse(...)
   9. Do not merge duplicate names with different commands, URLs, scopes, or credentials without asking.
   10. Leave unsupported or unknown transports unchanged and report them.
   11. Move static credentials only through Fentaris encrypted secrets and protected stdin or human input.
   12. Never copy a client’s OAuth token cache. Configure a new supported Fentaris OAuth flow instead.

   PHASE 6 — AUTHENTICATION

   Keep these two boundaries separate:

   A. Clients authenticating to Fentaris
   B. Fentaris authenticating to upstream MCP servers

   For client access, ask whether this is:

   - A personal loopback-only setup
   - A setup requiring Fentaris API keys
   - A setup requiring users and groups
   - A setup behind an existing trusted authentication boundary

   Use x-fentaris-api-key only when selected. Store the key through the client’s supported secret mechanism and never log it.

   Because --generate prints the raw API key once, only run it through a verified, non-recorded secret-output channel. Otherwise, ask me to generate it in a private terminal or provide it through protected input and --value-stdin.

   For an OAuth 2.1 upstream:

   1. Use oauth() only with native Streamable HTTP or SSE transports, never stdio.
   2. Use Authorization Code with PKCE for human accounts.
   3. Choose per-user tokens only after distinct, authenticated Fentaris user identities are configured. Unauthenticated callers collapse to the shared OAuth session.
   4. For a personal, unauthenticated loopback setup, explain the account sharing and ask me to approve shared tokens.
   5. Use shared tokens or client credentials in any topology only after I approve that security boundary.
   6. Ensure FENTARIS_AUTH_KEY or an explicit OAuth store provides encrypted persistence.
   7. Start consent with the currently documented fentaris auth login command.
   8. Let me complete login and consent in the browser.
   9. Use --print-url in a headless environment.
   10. Verify with fentaris auth status without exposing tokens.

   Do not describe an Authorization Code flow as unattended. The human consent step is intentional.

   PHASE 7 — VALIDATION GATE

   Before changing any AI-client configuration:

   1. Install project dependencies.
   2. Run the available build and typecheck scripts.
   3. Run:

      fentaris check --offline --json

   4. Run:

      fentaris doctor --json

   5. Start the proxy under supervision.
   6. Run:

      fentaris doctor --runtime --json

   7. List effective tools through Fentaris.
   8. Verify non-sensitive authentication and OAuth status when used.
   9. Make one safe, non-destructive tool call when possible.

   Diagnose and fix failures.

   Keep any failing upstream in its original client configuration, and do not cut over a client while the Fentaris proxy is unhealthy.

   PHASE 8 — CLIENT CUTOVER

   Only after validation succeeds, for every selected client:

   1. Create a timestamped backup of its exact configuration.
   2. Validate the existing configuration syntax.
   3. Add one MCP server named fentaris pointing to the validated endpoint, normally:

      http://127.0.0.1:4000/mcp

   4. Add the API-key header only through supported secret or header storage when authentication is enabled.
   5. Validate the configuration syntax again.
   6. Reload or restart the client only when required.
   7. Confirm that the client can initialize and list the expected proxied tools.
   8. Then ask whether the migrated original MCP entries should:
      - Remain configured
      - Be disabled
      - Be removed while retaining the backup

   If the client is sandboxed or remote and cannot reach loopback, use its approved local networking path. Do not bind Fentaris publicly merely as a workaround.

   PHASE 9 — OPTIONAL AUTOSTART

   Ask whether Fentaris should:

   - Start manually
   - Start at user login
   - Run through an existing process manager

   Do not create a service or scheduled task without consent.

   If autostart is selected, use the least invasive user-level mechanism and provide removal instructions.

   FINAL REPORT

   Return a concise report containing:

   - Installed versions
   - Project directory and endpoint
   - Configured clients and required restarts
   - Migrated, skipped, and blocked MCP servers
   - Non-sensitive client-authentication and OAuth status
   - Installed skill targets
   - Validation commands and results
   - Backup paths
   - Start and stop commands
   - Rollback steps
   - Anything that could not be verified

   If blocked, stop safely and state:

   1. The exact failed check
   2. What you attempted
   3. The single permission or input required to continue`)
      copyResetTimer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return <>
    <section className="hero" id="top">
      <div className="hero-shell">
        <div className="hero-copy">
          <h1>Manage every MCP</h1>
          <p>Run, route, and manage every MCP server behind <span>one stable endpoint</span>—with authentication, policy, and observability built in</p>
          <div className="hero-links" id="setup"><button className={`copy-prompt-button${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={copied ? 'Agent prompt copied' : 'Copy agent prompt'}><span>{copied ? 'Copied' : 'Copy agent prompt'}</span><span className="copy-prompt-icon" aria-hidden="true">{copied ? <svg viewBox="0 0 16 16"><path d="m3 8.2 3.1 3.1L13 4.8" /></svg> : <svg viewBox="0 0 16 16"><rect x="5.2" y="5.2" width="7.3" height="7.3" rx="1.4" /><path d="M10.5 5.2V4.8c0-.7-.6-1.3-1.3-1.3H4.8c-.7 0-1.3.6-1.3 1.3v4.4c0 .7.6 1.3 1.3 1.3h.4" /></svg>}</span></button><a href="https://fentaris.mintlify.app/getting-started/quickstart">Quickstart <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div>
        </div>
        <AgentVisual />
      </div>
    </section>
    <IntegrationMarquee />
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

function HomeCta({ title = <>One endpoint for every server.<br /><span>One place to stay in control.</span></> }: { title?: React.ReactNode }) {
  return <section className="home-cta"><div className="home-cta-glow" /><h2>{title}</h2><div><a className="cta-primary" href="https://fentaris.mintlify.app/getting-started/quickstart">Build your first proxy <Arrow /></a><a className="cta-secondary" href="https://github.com/Fentaris/fentaris"><Github /> View on GitHub</a></div></section>
}

type Route = 'home' | 'product' | 'pricing' | 'landing2'

function getRoute(): Route {
  const { pathname, hash } = window.location
  if (pathname.startsWith('/landing2') || hash.startsWith('#/landing2')) return 'landing2'
  if (pathname.startsWith('/product') || hash.startsWith('#/product')) return 'product'
  if (pathname.startsWith('/pricing') || hash.startsWith('#/pricing')) return 'pricing'
  return 'home'
}

const productFeatures = [
  ['01', 'Servers', 'Register local and remote MCP servers behind one stable endpoint.'],
  ['02', 'Routing', 'Keep every tool namespaced and route each request to the right upstream.'],
  ['03', 'Identity', 'Resolve every API key to a trusted user, agent, and group context.'],
  ['04', 'Policies', 'Enforce least-privilege rules before an action can reach production.'],
  ['05', 'OAuth', 'Connect protected upstreams without exposing credentials to application code.'],
  ['06', 'Observability', 'Follow authentication, policy, execution, result, and latency in one trace.'],
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

const productSections = [
  {
    id: 'gateway',
    label: 'Gateway',
    title: 'One endpoint for every MCP server.',
    copy: 'Connect local and remote servers once. Every compatible client gets a stable, namespaced tool catalog without maintaining its own server configuration.',
    feature: ['A shared gateway for your entire MCP stack', 'Register stdio and HTTP servers side by side, route every tool call to the right upstream, and change infrastructure without touching client configuration.'],
    cards: [
      ['⌘', 'Predictable routing', 'Namespace every tool by its server, so names remain stable and collisions disappear as your catalog grows. Clients always know which upstream will receive a request, even when several servers expose similar capabilities.'],
      ['↗', 'Any transport', 'Run local stdio servers and remote Streamable HTTP servers behind the same endpoint. Fentaris handles each transport consistently, so clients do not need separate integrations or configuration.'],
      ['⟳', 'Live registry', 'Inspect registered servers, their connection status, and available tools from one operational view. Changes become visible centrally, making it easier to understand what every connected client can use.'],
      ['◇', 'Shared middleware', 'Apply validation, rate limits, approvals, and custom logic at the gateway instead of rebuilding them in every client. One shared pipeline keeps behavior consistent across your MCP environment.'],
      ['＋', 'Simple expansion', 'Add, replace, or reorganize an upstream without reconfiguring every agent. The client-facing endpoint stays stable while your internal MCP infrastructure evolves behind it.'],
      ['→', 'Native MCP', 'Preserve standard MCP initialization, discovery, and tool-call behavior from end to end. Existing compatible clients and servers continue to work without adopting a proprietary protocol.'],
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    title: 'Decide who can use what—before it runs.',
    copy: 'Turn an incoming API key into trusted context, evaluate least-privilege policy, and keep upstream credentials outside clients, callbacks, and logs.',
    feature: ['Policy at the shared boundary', 'Resolve users and groups for every request. Allow, deny, or require approval by MCP operation, server, and tool before the upstream sees the call.'],
    cards: [
      ['◔', 'Identity', 'Resolve every client request to a trusted user, agent, and group context before it reaches a tool. Policies can then make decisions using real organizational identity instead of anonymous connections.'],
      ['✓', 'Tool approval', 'Pause sensitive actions until a human or an external system explicitly approves them. The request keeps its original identity and context, so reviewers can make an informed decision.'],
      ['✣', 'Managed OAuth', 'Connect protected remote servers while Fentaris stores credentials and refreshes tokens centrally. Clients gain authorized access without receiving or managing upstream secrets themselves.'],
      ['▣', 'Filtered discovery', 'Expose only the servers and tools that each identity is permitted to use. Clients receive a smaller, safer catalog and cannot discover capabilities that fall outside their policy.'],
      ['●', 'Protected secrets', 'Keep credential values out of clients, middleware, policy code, and event payloads. Secrets remain confined to the component that needs them, reducing accidental exposure across the request path.'],
      ['≋', 'Composable policies', 'Build clear rules around identities, operations, servers, and individual tools, then reuse them across teams and clients. Small policies can be combined without duplicating authorization logic.'],
    ],
  },
  {
    id: 'observability',
    label: 'Observability',
    title: 'Understand every request end to end.',
    copy: 'Follow authentication, authorization, upstream execution, result, and duration in one trace so operators can answer what happened and why.',
    feature: ['A complete MCP request timeline', 'See the caller, matched policy, selected upstream, lifecycle events, outcome, and latency together instead of piecing them across clients and servers.'],
    cards: [
      ['⌁', 'Lifecycle events', 'Subscribe to authentication, policy, execution, success, and failure events throughout every request. Use the same event stream for monitoring, automation, alerts, or custom operational workflows.'],
      ['184', 'Latency', 'Measure how long each stage of a request takes, from gateway processing to upstream execution. Detailed timing makes slow servers and transport bottlenecks easier to identify.'],
      ['!', 'Actionable failures', 'Connect denied and failed calls to the identity, policy rule, tool, and server involved. Operators get the context needed to diagnose the cause instead of searching across disconnected logs.'],
      ['{ }', 'Structured logs', 'Send consistent request metadata and outcomes to the logging stack your team already uses. A predictable schema makes MCP activity easier to search, correlate, and monitor at scale.'],
      ['↳', 'Upstream health', 'Distinguish gateway problems from transport errors and upstream server failures quickly. Clear boundaries help teams respond to the right component and reduce time spent debugging clients.'],
      ['◎', 'Audit context', 'Retain the identities, policy decisions, selected upstreams, and outcomes needed to review production agent activity. Each record explains not only what ran, but why it was allowed.'],
    ],
  },
]

function ProductFeatureVisual({ type }: { type: string }) {
  return <div className={`product-feature-visual visual-${type}`} aria-hidden="true">
    <div className="feature-visual-bar"><span /><span /><span /><code>fentaris / {type}</code></div>
    {type === 'gateway' && <div className="gateway-map"><div><small>CLIENTS</small><span>Claude</span><span>Codex</span><span>Cursor</span></div><i>→</i><strong><Logo /><b>one /mcp endpoint</b></strong><i>→</i><div><small>SERVERS</small><span>GitHub</span><span>Linear</span><span>Filesystem</span></div></div>}
    {type === 'governance' && <div className="policy-preview"><div><small>REQUEST CONTEXT</small><b>alice@example.com</b><span>group: operators</span></div><div className="policy-result"><i>✓</i><span><small>POLICY DECISION</small><b>Allowed</b></span><code>2 ms</code></div><p>github__list_issues · matched github-read</p></div>}
    {type === 'observability' && <div className="timeline-preview"><div><i /><code>00 ms</code><span><b>client.authenticated</b><small>alice resolved</small></span></div><div><i /><code>04 ms</code><span><b>policy.allowed</b><small>github-read</small></span></div><div><i /><code>06 ms</code><span><b>upstream.request</b><small>github · stdio</small></span></div><div><i /><code>184 ms</code><span><b>tool.success</b><small>response returned</small></span></div></div>}
  </div>
}

function ProductPage() {
  return <>
    <section className="mastra-product-hero" id="top">
      <div className="mastra-hero-inner">
        <h1>Everything you need to run MCP as <em>production infrastructure.</em></h1>
        <div><a className="mastra-prompt-action" href="https://github.com/Fentaris/fentaris"><Github /> View on GitHub</a><a className="mastra-quickstart" href="https://fentaris.mintlify.app/getting-started/quickstart">Quickstart <Arrow /></a></div>
      </div>
    </section>

    {productSections.map(section => <section className="mastra-feature-section" id={section.id} key={section.id}>
      <div className="mastra-section-shell">
        <header className="mastra-section-header"><h2>{section.label}</h2><p>{section.copy}</p></header>
        <div className="mastra-feature-grid">
          <a className="mastra-feature-card featured" href="https://fentaris.mintlify.app/concepts/architecture">
            <div className="mastra-card-copy"><h3>{section.feature[0]}</h3><p>{section.feature[1]}</p><span>Explore {section.label.toLowerCase()} <Arrow /></span></div>
            <ProductFeatureVisual type={section.id} />
          </a>
          {section.cards.map(([, title, copy]) => <article className="mastra-feature-card" key={title}><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </div>
    </section>)}

    <section className="mastra-solutions-section" id="solutions">
      <div className="mastra-section-shell">
        <header className="mastra-section-header"><h2>Built for teams putting agents to work</h2><p>Use the same open foundation for coding agents, internal automations, or a company-wide MCP platform.</p></header>
        <div className="mastra-solution-grid"><article><small>ENGINEERING TEAMS</small><h3>Production-safe tools for coding agents</h3><p>Share GitHub, Linear, and filesystem access without distributing unrestricted credentials to every developer and client.</p></article><article><small>INTERNAL AUTOMATION</small><h3>Govern workflows across business systems</h3><p>Keep identity, OAuth, and authorization consistent as agents move between support, knowledge, CRM, and collaboration tools.</p></article><article><small>PLATFORM TEAMS</small><h3>MCP as reliable internal infrastructure</h3><p>Give every team a stable tool catalog while operating transports, policy, credentials, and telemetry centrally.</p></article></div>
      </div>
    </section>

    <FaqSection />
    <HomeCta title={<>Start with one endpoint.<br /><span>Stay in control as you scale.</span></>} />
  </>
}

const WAITLIST_ENDPOINT = 'https://docs.google.com/forms/d/e/1FAIpQLScodsYk5yX27jxuwwjP4LFEq8hLnW71nWojWhGa6RI8ZWzR1A/formResponse'

function PricingPage() {
  const [email, setEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const joinWaitlist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setWaitlistStatus('submitting')

    try {
      await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({ 'entry.185426948': email }),
      })
      setEmail('')
      setWaitlistStatus('success')
    } catch {
      setWaitlistStatus('error')
    }
  }

  return <section className="cloud-page">
    <div className="page-shell cloud-layout">
      <div className="cloud-copy">
        <h1>The simpler way to run Fentaris is <span>on its way.</span></h1>
        <p className="cloud-lede">Fentaris Cloud will make it easier to deploy, manage, and monitor Fentaris—without taking on the infrastructure work yourself.</p>
        <div className="cloud-status"><i aria-hidden="true" /><span><b>Currently in development</b>We’re building the first version now.</span></div>
      </div>

      <aside className="waitlist-card" aria-labelledby="waitlist-title">
        <h2 id="waitlist-title">Join the waitlist.</h2>
        <p>Be the first to know when Fentaris Cloud is ready.</p>
        {waitlistStatus === 'success' ? (
          <div className="waitlist-success" role="status"><span>✓</span><div><b>You’re on the list.</b><p>We’ll be in touch when Fentaris Cloud is ready.</p></div></div>
        ) : (
          <form className="waitlist-form" onSubmit={joinWaitlist}>
            <label htmlFor="waitlist-email">Email address</label>
            <div>
              <input id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={event => setEmail(event.target.value)} required />
              <button type="submit" disabled={waitlistStatus === 'submitting'}>{waitlistStatus === 'submitting' ? 'Joining…' : 'Join waitlist'} <Arrow /></button>
            </div>
            {waitlistStatus === 'error' && <p className="waitlist-error" role="alert">Something went wrong. Please try again.</p>}
          </form>
        )}
      </aside>
    </div>
  </section>
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
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand" href="/"><Logo /><b>fentaris</b></a><p>The open-source control plane for your MCP servers.</p><span>Run, route, manage, and observe MCP through one stable endpoint.</span></div><div className="footer-column"><b>Product</b><a href="#platform">Platform</a><a href="#how-it-works">How it works</a><a href="#quickstart">Quickstart</a></div><div className="footer-column"><b>Resources</b><a href="https://fentaris.mintlify.app">Documentation</a><a href="https://fentaris.mintlify.app/concepts/architecture">Architecture</a><a href="https://fentaris.mintlify.app/getting-started/quickstart">Getting started</a></div><div className="footer-column"><b>Community</b><a href="https://github.com/Fentaris/fentaris">GitHub</a><a href="https://github.com/Fentaris/fentaris/issues">Issues</a><a href="https://github.com/Fentaris/fentaris/blob/main/LICENSE.txt">MIT License</a></div></div><div className="footer-bottom"><span>© 2026 Fentaris</span></div></footer>
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
