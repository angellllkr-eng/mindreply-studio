from pathlib import Path
p = Path(r"C:\Users\ANGEL\MRPRODUCTION\a11-k-core\app\command\chat\page.tsx")
p.write_text(p.read_text(encoding="utf-8") + r'''
  return (
    <div className="mx-app">
      <div className="mx-glow" aria-hidden="true" />
      <header className="mx-top">
        <div className="mx-brand">
          <Link href="/command" className="mx-mark">A11</Link>
          <div>
            <div className="mx-title">Ask A11-K</div>
            <div className="mx-sub">{activeEngine.label} · {lens}</div>
          </div>
        </div>
        <div className="mx-top-actions">
          <span className="mx-route">{lastRoute}</span>
          <button type="button" className="mx-ghost" onClick={newChat}>New</button>
          <button type="button" className="mx-ghost" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
            Settings
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="mx-settings">
          <label>Mode
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              {MODES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label>Look at
            <select value={context} onChange={(e) => setContext(e.target.value)}>
              {CONTEXTS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label>Brand
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              {BRANDS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
        </div>
      ) : null}

      <div className="mx-models" role="tablist" aria-label="Models">
        {ENGINES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={engine === item.id}
            className={`mx-model ${engine === item.id ? "is-active" : ""}`}
            onClick={() => setEngine(item.id)}
          >
            <span className="mx-model-short">{item.short}</span>
            <span className="mx-model-label">{item.label}</span>
            <span className="mx-model-detail">{item.detail}</span>
          </button>
        ))}
      </div>

      <main className="mx-thread" ref={threadRef} aria-live="polite">
        {messages.length <= 1 ? (
          <div className="mx-empty">
            <div className="mx-empty-kicker">Private command</div>
            <h1>What do you need?</h1>
            <p>Working models only. GitHub first, OpenAI fallback. No fluff.</p>
            <div className="mx-chips">
              {QUICK.map((prompt) => (
                <button key={prompt} type="button" className="mx-chip" onClick={() => void send(prompt)} disabled={isSending}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((item) => (
            <div key={item.id} className={`mx-msg mx-msg-${item.role}`}>
              <div className="mx-msg-label">
                {item.role === "user" ? "You" : item.role === "assistant" ? "A11-K" : "Status"}
                {item.meta ? ` · ${item.meta}` : ""}
              </div>
              <div className="mx-msg-body">{item.content || (isSending ? "..." : "")}</div>
            </div>
          ))
        )}
        {isSending ? <div className="mx-typing"><i /><i /><i /></div> : null}
      </main>

      <footer className="mx-dock">
        {showSuggest && messages.length > 1 ? (
          <div className="mx-popup">
            <div className="mx-popup-head">
              <span>Suggestions</span>
              <button type="button" onClick={() => setShowSuggest(false)} aria-label="Close">×</button>
            </div>
            {QUICK.slice(0, 4).map((prompt) => (
              <button key={prompt} type="button" className="mx-popup-item" onClick={() => void send(prompt)} disabled={isSending}>
                {prompt}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mx-bar">
          <textarea
            ref={taRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value.trim().length === 0) setShowSuggest(true);
            }}
            onFocus={() => setShowSuggest(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder={`Message ${activeEngine.label}...`}
          />
          <button type="button" className="mx-send" disabled={isSending || !message.trim()} onClick={() => void send()}>
            {isSending ? "..." : "Send"}
          </button>
        </div>
        <div className="mx-hint">Enter send · Shift+Enter newline · private</div>
      </footer>
    </div>
  );
}
''', encoding="utf-8")
print("final", p.stat().st_size)
