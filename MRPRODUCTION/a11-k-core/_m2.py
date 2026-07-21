from pathlib import Path
p = Path(r"C:\Users\ANGEL\MRPRODUCTION\a11-k-core\app\command\chat\page.tsx")
p.write_text(p.read_text(encoding="utf-8") + r'''
export default function ChatPage() {
  const [engine, setEngine] = useState("r1");
  const [mode, setMode] = useState("chief_orchestrator");
  const [context, setContext] = useState("estate");
  const [brand, setBrand] = useState("a11-k");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isSending, setIsSending] = useState(false);
  const [lastRoute, setLastRoute] = useState("GitHub primary");
  const [showSuggest, setShowSuggest] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = Math.min(taRef.current.scrollHeight, 160) + "px";
  }, [message]);

  const activeEngine = ENGINES.find((e) => e.id === engine) || ENGINES[0];
  const lens = useMemo(
    () => `${MODES.find(([id]) => id === mode)?.[1]} · ${CONTEXTS.find(([id]) => id === context)?.[1]} · ${BRANDS.find(([id]) => id === brand)?.[1]}`,
    [mode, context, brand]
  );

  async function send(text = message) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    setShowSuggest(false);
    setMenuOpen(false);
    setMessages((c) => [...c, { id: `u-${Date.now()}`, role: "user", content: trimmed }]);
    setMessage("");
    setIsSending(true);
    setLastRoute("routing...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed, model: engine, engine, mode, context, brand, safeMode: true, allowActions: false }),
      });
      const provider = response.headers.get("X-A11K-Provider") || "";
      const modelUsed = response.headers.get("X-A11K-Model") || "";
      if (provider) setLastRoute(`${provider} · ${modelUsed || engine}`);
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/plain") && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        const id = `a-${Date.now()}`;
        setMessages((c) => [...c, { id, role: "assistant", content: "", meta: provider ? `${provider} · ${modelUsed}` : "streaming" }]);
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages((c) => c.map((item) => item.id === id ? { ...item, content: answer, meta: provider ? `${provider} · ${modelUsed}` : item.meta } : item));
        }
      } else {
        const data = await response.json().catch(() => null);
        const answer = data?.message || data?.reply || data?.answer || "No live provider answered.";
        setMessages((c) => [...c, { id: `s-${Date.now()}`, role: data?.reply || data?.answer ? "assistant" : "system", content: answer, meta: data?.provider ? `${data.provider} · ${data.model || ""}` : "status" }]);
        if (data?.provider) setLastRoute(`${data.provider} · ${data.model || ""}`);
      }
    } catch {
      setMessages((c) => [...c, { id: `e-${Date.now()}`, role: "system", content: "Transport failed. Retry." }]);
    } finally {
      setIsSending(false);
    }
  }

  function newChat() {
    setMessages([WELCOME]);
    setShowSuggest(true);
    setLastRoute("GitHub primary");
  }
''', encoding="utf-8")
print("p2", p.stat().st_size)
