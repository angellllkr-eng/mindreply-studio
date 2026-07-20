import React, { useState, useRef, useEffect } from 'react'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, StatusPill, SectionHeader } from '@/components/ui-bits'
import { MessageSquare, Send, RotateCcw } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  text: string
  model?: string
  timestamp: string
}

interface PlatformStatus {
  total_pending: number
  stalled_threads: Array<{ timestamp: string; from: string; to: string }>
  follow_ups_due: Array<{ timestamp: string; senderHash: string }>
  next_actions: Array<{ risk_rank: number; suggested_next_move: string }>
}

export default function Shell() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'I am MindReply Shell. I read your proof metrics, stalled threads, and revenue protection moves. What do you need?',
      model: 'System',
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState('auto')
  const [status, setStatus] = useState<PlatformStatus | null>(null)
  const [thread, setThread] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    loadReplyControlStatus()
  }, [])

  const loadReplyControlStatus = async () => {
    try {
      // Uses existing /api/dashboard/replycontrol endpoint
      const res = await fetch('/api/dashboard/replycontrol')
      const data: PlatformStatus = await res.json()
      setStatus(data)
    } catch (e) {
      console.warn('Could not load status:', e)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      // Uses existing /api/chat endpoint with model-router
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          model,
          history: newMessages,
        }),
      })

      const data = await res.json()
      const assistantMessage: Message = {
        role: 'assistant',
        text: data.reply,
        model: data.model,
        timestamp: data.timestamp,
      }

      setMessages([...newMessages, assistantMessage])
      setThread(Date.now().toString())
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        model: 'Error',
        timestamp: new Date().toISOString(),
      }
      setMessages([...newMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const resetConversation = () => {
    setMessages([messages[0]])
    setInput('')
    setThread('')
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader
          eyebrow="Your command layer"
          title={<>MindReply <span className="gold-text">Shell</span></>}
          subtitle="Proof metrics. Stalled threads. Revenue protected. All in one place."
        />

        <div className="mt-12 grid lg:grid-cols-4 gap-6">
          {/* Proof Metrics Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {status && (
              <>
                <GlassCard className="border-l-2 border-l-primary">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    ReplyControl Status
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-display text-primary">
                        {status.total_pending}
                      </div>
                      <div className="text-xs text-muted-foreground">Pending actions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-display text-primary">
                        {status.stalled_threads.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Stalled threads</div>
                    </div>
                    <div>
                      <div className="text-2xl font-display text-primary">
                        {status.follow_ups_due.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Follow-ups due</div>
                    </div>
                  </div>
                </GlassCard>

                {status.stalled_threads.length > 0 && (
                  <GlassCard className="border-l-2 border-l-cyan-500">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                      Failovers This Week
                    </div>
                    <div className="space-y-2">
                      {status.stalled_threads.slice(0, 3).map((thread, i) => (
                        <div key={i} className="text-xs">
                          <div className="font-medium">
                            {thread.from} → {thread.to}
                          </div>
                          <div className="text-muted-foreground">
                            {new Date(thread.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}
              </>
            )}
          </div>

          {/* Chat */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-primary" size={24} />
                <div>
                  <h2 className="font-display text-lg">Shell Command</h2>
                  <p className="text-xs text-muted-foreground">
                    {model === 'auto' ? 'Auto-routing model' : `Using ${model}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="text-xs rounded border border-border/40 bg-background/40 px-2 py-1 text-foreground"
                >
                  <option value="auto">Auto</option>
                  <option value="claude">Claude</option>
                  <option value="openai">OpenAI</option>
                  <option value="groq">Groq</option>
                  <option value="local">Local</option>
                </select>
                <button
                  onClick={resetConversation}
                  className="p-2 rounded border border-border/40 hover:bg-border/20 transition"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <GlassCard className="flex-1 overflow-y-auto mb-4 p-6 space-y-4 max-h-[450px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-4 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary/20 text-foreground'
                        : 'bg-border/40 text-foreground'
                    }`}
                  >
                    <div>{msg.text}</div>
                    {msg.model && (
                      <div className="text-xs text-muted-foreground mt-2 italic">
                        {msg.model}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse animation-delay-200" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse animation-delay-400" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </GlassCard>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask Shell about stalled threads, revenue, or next actions..."
                className="flex-1 rounded-lg border border-border/40 bg-background/40 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-primary px-4 py-3 text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Info */}
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Shell uses your proof metrics, failover logs, and ReplyControl data. No raw numbers are logged.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
