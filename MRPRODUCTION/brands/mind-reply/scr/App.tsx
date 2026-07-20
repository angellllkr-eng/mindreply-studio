import { Routes, Route, Link } from 'react-router-dom'

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="brand"><span className="brand-mark">M</span><span>MindReply</span></Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/campaign-studio">Campaign Studio</Link>
          <Link to="/revenue">Revenue</Link>
          <Link to="/pricing">Pricing</Link>
        </nav>
      </header>
      <main className="shell-main">
        <section className="section narrow">
          <div className="section-title">
            <div className="eyebrow">{subtitle}</div>
            <h2>{title}</h2>
          </div>
          {children}
        </section>
      </main>
    </div>
  )
}

function Home() {
  const routes = [
    ['/dashboard', 'Dashboard', 'Live metrics, actions, and proof.'],
    ['/campaign-studio', 'Campaign Studio', 'Brief to launch pack workflow.'],
    ['/revenue', 'Revenue', 'Commercial surfaces and tracking.'],
    ['/pricing', 'Pricing', 'Offer structure and plans.'],
    ['/login', 'Login', 'Private access entry.'],
    ['/api/health', 'API Health', 'Backend heartbeat check.'],
  ] as const

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="brand"><span className="brand-mark">M</span><span>MindReply</span></Link>
        <nav className="nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/campaign-studio">Campaign Studio</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <section className="hero shell-main">
          <div>
            <div className="pill">MindReply org release</div>
            <h1>The owner hub for replies, routes, proof, and decisions.</h1>
            <p>One backend. One modern shell. One place to ship the live site first, then tighten the workflows without breaking the core.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/dashboard">Open dashboard</Link>
              <Link className="button" to="/campaign-studio">Open campaign studio</Link>
              <Link className="button" to="/pricing">View pricing</Link>
            </div>
          </div>
          <div className="card hero-card">
            <div className="card-title">Current live surfaces</div>
            <div className="stack">
              {routes.slice(0, 4).map(([href, title, text]) => (
                <Link key={title} to={href} className="route-item">
                  <div>
                    <div className="route-title">{title}</div>
                    <div className="muted small">{text}</div>
                  </div>
                  <span className="route-open">Open</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <div className="eyebrow">What this site is now</div>
            <h2>Modern and useful <span className="accent">without the noise.</span></h2>
            <p>The homepage should prove the system, not just describe it.</p>
          </div>
          <div className="grid-3">
            <InfoCard title="Proof first" body="See what is live, what is blocked, and what needs action." />
            <InfoCard title="Routes that work" body="Keep the core surfaces tight: dashboard, studio, revenue, pricing, and login." />
            <InfoCard title="Backend wired" body="The health endpoint is visible and easy to verify." />
          </div>
        </section>

        <section className="section">
          <div className="section-title"><div className="eyebrow">Core routes</div><h2>Everything useful stays one click away.</h2></div>
          <div className="grid-3 routes-grid">
            {routes.map(([href, title, text]) => (
              <Link key={title} to={href} className="card route-card">
                <div className="route-title">{title}</div>
                <div className="muted small mt">{text}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section narrow">
          <div className="card callout">
            <div className="pill cyan">Go live ready</div>
            <h2>Ship the live version first, then tighten the workflows.</h2>
            <p>The homepage is now focused on the main MindReply surface, the backend check is visible, and the important routes are front and centre.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

function Dashboard() {
  return <Shell subtitle="Dashboard" title="Live backend surfaces."><InfoCard title="Status" body="This page is wired to the backend and ready for live metrics." /></Shell>
}
function CampaignStudio() {
  return <Shell subtitle="Campaign Studio" title="Brief to launch pack."><InfoCard title="Workflow" body="Use /api/campaign-studio for structured creative output." /></Shell>
}
function Revenue() { return <Shell subtitle="Revenue" title="Commercial surfaces."><InfoCard title="Revenue" body="Tracking and offer structure live here." /></Shell> }
function Pricing() { return <Shell subtitle="Pricing" title="Offer structure and plans."><InfoCard title="Pricing" body="Keep the offer simple, explicit, and easy to buy." /></Shell> }
function Login() { return <Shell subtitle="Login" title="Private access entry."><InfoCard title="Access" body="Connect your owner-only access flow here." /></Shell> }
function Builder() { return <Shell subtitle="Builder" title="Work in progress."><InfoCard title="Next" body="Use this surface for the next internal workflow." /></Shell> }
function NotFound() { return <Shell subtitle="404" title="Page not found."><InfoCard title="Navigate back" body="Use the main navigation to get back on track." /></Shell> }

function InfoCard({ title, body }: { title: string; body: string }) {
  return <div className="card info-card"><div className="card-title">{title}</div><p>{body}</p></div>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/campaign-studio" element={<CampaignStudio />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}