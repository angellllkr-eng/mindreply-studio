import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard } from '@/components/ui-bits'

/**
 * Smart Router: Detects visitor type and routes to appropriate home page
 * 
 * Detection logic:
 * - URL param: ?role=founder / ?role=agency
 * - localStorage: remembers choice
 * - Referrer: if from LinkedIn job titles → likely founder/CEO
 * - Default: shows picker
 */

export default function IndexRouter() {
  const navigate = useNavigate()
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    // Check URL param
    const params = new URLSearchParams(window.location.search)
    const role = params.get('role')
    
    if (role === 'founder') {
      localStorage.setItem('mindreply_role', 'founder')
      navigate('/home-founder')
      return
    }
    
    if (role === 'agency') {
      localStorage.setItem('mindreply_role', 'agency')
      navigate('/home-agency')
      return
    }

    // Check localStorage
    const savedRole = localStorage.getItem('mindreply_role')
    if (savedRole === 'founder') {
      navigate('/home-founder')
      return
    }
    if (savedRole === 'agency') {
      navigate('/home-agency')
      return
    }

    // If here, show picker
    setShowPicker(true)
  }, [navigate])

  if (!showPicker) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display">Which one is you?</h1>
          <p className="mt-2 text-muted-foreground">We'll show you the version built for your situation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* FOUNDER */}
          <GlassCard 
            className="cursor-pointer hover:border-primary/50 transition p-8 text-center"
            onClick={() => {
              localStorage.setItem('mindreply_role', 'founder')
              navigate('/home-founder')
            }}
          >
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-display">Founder / CEO</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              You're managing deals yourself. 
              You lose 3-5 per month to silence. 
              You don't know which ones.
            </p>
            <div className="mt-6 text-primary font-medium">See how we catch them →</div>
          </GlassCard>

          {/* AGENCY */}
          <GlassCard 
            className="cursor-pointer hover:border-primary/50 transition p-8 text-center"
            onClick={() => {
              localStorage.setItem('mindreply_role', 'agency')
              navigate('/home-agency')
            }}
          >
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-xl font-display">Agency / Team</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Your team manages 20+ clients. 
              Someone always forgets something. 
              Clients think you're disorganized.
            </p>
            <div className="mt-6 text-primary font-medium">See how we fix it →</div>
          </GlassCard>
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>This choice is saved. You can always switch later at /role</p>
        </div>
      </div>
    </SiteLayout>
  )
}
