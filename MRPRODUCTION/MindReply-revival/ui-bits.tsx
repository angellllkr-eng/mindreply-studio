import React from 'react'
import clsx from 'clsx'

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-border/40 bg-background/40 backdrop-blur-sm p-6',
        className
      )}
    >
      {children}
    </div>
  )
}

export function StatusPill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'gold' | 'cyan' | 'neutral'
}) {
  const colors = {
    gold: 'bg-primary/20 text-primary',
    cyan: 'bg-cyan-500/20 text-cyan-400',
    neutral: 'bg-border/40 text-muted-foreground',
  }

  return (
    <span className={clsx('inline-block px-3 py-1 rounded-full text-xs font-medium', colors[tone])}>
      {children}
    </span>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
}) {
  return (
    <div className="text-center mb-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{eyebrow}</div>
      <h2 className="text-3xl md:text-5xl font-display leading-tight mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
