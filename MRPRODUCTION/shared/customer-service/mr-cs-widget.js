/*! Mind-Reply 24/7 Customer Service Widget | Owner: angellllkr-eng | Org: Mind-Reply */
(function () {
  if (window.__MR_CS_LOADED__) return;
  window.__MR_CS_LOADED__ = true;
  var BRAND = (document.currentScript && document.currentScript.getAttribute("data-brand")) || "mind-reply";
  var ACCENT = (document.currentScript && document.currentScript.getAttribute("data-accent")) || "#d8b76a";
  var TITLE = (document.currentScript && document.currentScript.getAttribute("data-title")) || "Concierge · 24/7";
  var I18N = {
    en: { title: TITLE, online: "Online · replies instantly", placeholder: "Ask anything…", send: "Send", welcome: "Welcome. I’m your 24/7 concierge. How can I help?", suggestions: ["What do you offer?", "Pricing & access", "Book a consultation", "Technical support", "Talk to a human"], replies: { offer: "We deliver premium digital products under Mind-Reply: AUREL connectivity, agent tools, and owner-grade systems.", pricing: "Access is tailored. Share your use case and I’ll route the right package.", book: "Perfect. Leave your email/goal and we’ll schedule a private consultation.", support: "Describe the issue (site, tool, account). I’ll triage immediately.", human: "Connecting you to the owner team queue. Please share contact + urgency.", default: "Got it. I’ll help with that. Share a bit more detail for a precise next step." } },
    uk: { title: "Консьєрж · 24/7", online: "Онлайн · миттєві відповіді", placeholder: "Запитайте будь-що…", send: "Надіслати", welcome: "Вітаю. Я ваш консьєрж 24/7. Чим допомогти?", suggestions: ["Що ви пропонуєте?", "Ціни та доступ", "Записатись на консультацію", "Технічна підтримка", "Зв’язок з людиною"], replies: { offer: "Ми створюємо преміальні продукти Mind-Reply: AUREL connectivity, агентні інструменти та owner-grade системи.", pricing: "Доступ індивідуальний. Опишіть задачу — підберу правильний пакет.", book: "Чудово. Залиште email/ціль — організуємо приватну консультацію.", support: "Опишіть проблему (сайт, інструмент, акаунт). Зроблю тріаж одразу.", human: "Передаю команді власника. Напишіть контакт і терміновість.", default: "Зрозумів. Допоможу. Додайте трохи деталей для точного наступного кроку." } },
    de: { title: "Concierge · 24/7", online: "Online · sofortige Antworten", placeholder: "Fragen Sie etwas…", send: "Senden", welcome: "Willkommen. Ich bin Ihr 24/7 Concierge. Wie kann ich helfen?", suggestions: ["Was bieten Sie an?", "Preise & Zugang", "Beratung buchen", "Technischer Support", "Mit Mensch sprechen"], replies: { offer: "Wir liefern Premium-Produkte unter Mind-Reply: AUREL Connectivity, Agent-Tools und Owner-Systeme.", pricing: "Zugang ist individuell. Teilen Sie Ihren Use-Case – ich leite das passende Paket.", book: "Perfekt. Hinterlassen Sie E-Mail/Ziel – wir planen eine private Beratung.", support: "Beschreiben Sie das Problem (Site, Tool, Account). Ich priorisiere sofort.", human: "Verbinde mit dem Owner-Team. Bitte Kontakt + Dringlichkeit senden.", default: "Verstanden. Ich helfe. Bitte etwas mehr Detail für den nächsten Schritt." } }
  };
    ,
    fr: { title: "Conciergerie · 24/7", online: "En ligne · réponses instantanées", placeholder: "Posez votre question…", send: "Envoyer", welcome: "Bienvenue. Je suis votre concierge 24/7. Comment puis-je aider ?", suggestions: ["Que proposez-vous ?", "Tarifs & accès", "Réserver une consultation", "Support technique", "Parler à un humain"], replies: { offer: "Nous livrons des produits premium Mind-Reply : connectivité AUREL, outils agents et systèmes owner-grade.", pricing: "L’accès est sur mesure. Partagez votre besoin, je route le bon pack.", book: "Parfait. Laissez email/objectif — nous planifions une consultation privée.", support: "Décrivez le problème (site, outil, compte). Je trie immédiatement.", human: "Connexion à l’équipe owner. Merci d’indiquer contact + urgence.", default: "Compris. J’aide. Ajoutez un peu de détail pour l’étape suivante." } },
    es: { title: "Conserjería · 24/7", online: "En línea · respuestas al instante", placeholder: "Pregunta lo que necesites…", send: "Enviar", welcome: "Bienvenido. Soy tu conserje 24/7. ¿Cómo puedo ayudar?", suggestions: ["¿Qué ofrecen?", "Precios y acceso", "Reservar consulta", "Soporte técnico", "Hablar con un humano"], replies: { offer: "Entregamos productos premium de Mind-Reply: conectividad AUREL, herramientas agent y sistemas owner-grade.", pricing: "El acceso es a medida. Comparte tu caso y enruto el paquete correcto.", book: "Perfecto. Deja email/objetivo y agendamos una consulta privada.", support: "Describe el problema (sitio, herramienta, cuenta). Priorizo al instante.", human: "Conectando con el equipo owner. Comparte contacto + urgencia.", default: "Entendido. Te ayudo. Añade un poco más de detalle para el siguiente paso." } },
    pl: { title: "Concierge · 24/7", online: "Online · natychmiastowe odpowiedzi", placeholder: "Zapytaj o cokolwiek…", send: "Wyślij", welcome: "Witaj. Jestem Twoim concierge 24/7. Jak mogę pomóc?", suggestions: ["Co oferujecie?", "Cennik i dostęp", "Umów konsultację", "Wsparcie techniczne", "Porozmawiaj z człowiekiem"], replies: { offer: "Dostarczamy produkty premium Mind-Reply: łączność AUREL, narzędzia agentów i systemy owner-grade.", pricing: "Dostęp jest dopasowany. Opisz przypadek — skieruję właściwy pakiet.", book: "Świetnie. Zostaw email/cel — umówimy prywatną konsultację.", support: "Opisz problem (strona, narzędzie, konto). Zrobię triage od razu.", human: "Łączę z zespołem właściciela. Podaj kontakt + pilność.", default: "Rozumiem. Pomogę. Dodaj trochę szczegółów dla kolejnego kroku." } }
  };
  var COUNTRY_LANG = { UA:"uk", PL:"pl", DE:"de", AT:"de", CH:"de", FR:"fr", BE:"fr", ES:"es", MX:"es", AR:"es", CO:"es", US:"en", GB:"en", IE:"en", CA:"en", AU:"en", NZ:"en" };
  function detectLangFromBrowser() {
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("uk") === 0 || nav.indexOf("ua") === 0) return "uk";
    if (nav.indexOf("de") === 0) return "de";
    if (nav.indexOf("fr") === 0) return "fr";
    if (nav.indexOf("es") === 0) return "es";
    if (nav.indexOf("pl") === 0) return "pl";
    return "en";
  }
  function classify(text) {
    var t = (text || "").toLowerCase();
    if (/price|pricing|cost|доступ|цін|preis|tarif|precio|cennik/.test(t)) return "pricing";
    if (/book|consult|запис|beratung|réserver|reserv|umów/.test(t)) return "book";
    if (/support|bug|error|issue|техніч|problema|wsparcie/.test(t)) return "support";
    if (/human|person|owner|людин|mensch|humain|humano|człowiek/.test(t)) return "human";
    if (/offer|what|product|пропон|angebot|propose|ofrec|ofer/.test(t)) return "offer";
    return "default";
  }
  function css() {
    return "#mr-cs-root{all:initial;font-family:Inter,system-ui,sans-serif}#mr-cs-root *{box-sizing:border-box}#mr-cs-btn{position:fixed;right:20px;bottom:20px;z-index:2147483000;border:0;border-radius:999px;padding:14px 18px;background:linear-gradient(135deg," + ACCENT + ",#f5da8c);color:#111;font-weight:800;cursor:pointer;box-shadow:0 16px 40px rgba(0,0,0,.35)}#mr-cs-panel{position:fixed;right:20px;bottom:84px;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 120px));z-index:2147483000;display:none;flex-direction:column;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,#0b1020,#070a14);color:#f6f4ed;box-shadow:0 30px 80px rgba(0,0,0,.5)}#mr-cs-panel.open{display:flex}#mr-cs-head{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.03)}#mr-cs-head strong{display:block;font-size:14px}#mr-cs-head span{display:block;font-size:11px;color:#9aa7bd;margin-top:2px}#mr-cs-close{background:transparent;border:0;color:#9aa7bd;font-size:18px;cursor:pointer}#mr-cs-msgs{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px}.mr-msg{max-width:88%;padding:10px 12px;border-radius:14px;font-size:13px;line-height:1.45}.mr-bot{align-self:flex-start;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}.mr-user{align-self:flex-end;background:rgba(216,183,106,.18);border:1px solid rgba(216,183,106,.35)}#mr-cs-sugs{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}#mr-cs-sugs button{border:1px solid rgba(102,232,255,.25);background:rgba(102,232,255,.08);color:#66e8ff;border-radius:999px;padding:7px 10px;font-size:11px;cursor:pointer}#mr-cs-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.1)}#mr-cs-input{flex:1;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#050812;color:#f6f4ed;padding:11px 12px;font:inherit}#mr-cs-send{border:0;border-radius:12px;padding:0 14px;background:linear-gradient(135deg," + ACCENT + ",#f5da8c);color:#111;font-weight:800;cursor:pointer}#mr-cs-meta{padding:0 14px 10px;font-size:10px;color:#6f7b90}";
  }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function boot(lang, geo) {
    var t = I18N[lang] || I18N.en;
    var root = el("div", { id: "mr-cs-root" });
    var style = el("style");
    style.textContent = css();
    root.appendChild(style);
    var btn = el("button", { id: "mr-cs-btn", type: "button" }, "Chat · 24/7");
    var panel = el("div", { id: "mr-cs-panel" });
    panel.innerHTML = '<div id="mr-cs-head"><div><strong>' + t.title + '</strong><span>' + t.online + '</span></div><button id="mr-cs-close" type="button" aria-label="Close">×</button></div><div id="mr-cs-msgs"></div><div id="mr-cs-sugs"></div><div id="mr-cs-meta">Brand: ' + BRAND + ' · Locale: ' + lang + (geo ? (" · " + geo) : "") + ' · Owner: angellllkr-eng</div><form id="mr-cs-form"><input id="mr-cs-input" autocomplete="off" placeholder="' + t.placeholder + '" /><button id="mr-cs-send" type="submit">' + t.send + '</button></form>';
    root.appendChild(btn); root.appendChild(panel); document.body.appendChild(root);
    var msgs = panel.querySelector("#mr-cs-msgs");
    var sugs = panel.querySelector("#mr-cs-sugs");
    var form = panel.querySelector("#mr-cs-form");
    var input = panel.querySelector("#mr-cs-input");
    function add(role, text) {
      var m = el("div", { class: "mr-msg " + (role === "user" ? "mr-user" : "mr-bot") });
      m.textContent = text; msgs.appendChild(m); msgs.scrollTop = msgs.scrollHeight;
    }
    function answer(text) {
      var key = classify(text);
      var rep = t.replies[key] || t.replies.default;
      setTimeout(function () { add("bot", rep); }, 250);
      try {
        var payload = { ts: new Date().toISOString(), brand: BRAND, lang: lang, geo: geo || "", q: text, key: key };
        var arr = JSON.parse(localStorage.getItem("mr_cs_log") || "[]");
        arr.push(payload);
        localStorage.setItem("mr_cs_log", JSON.stringify(arr.slice(-100)));
      } catch (e) {}
    }
    t.suggestions.forEach(function (s) {
      var b = el("button", { type: "button" });
      b.textContent = s;
      b.onclick = function () { add("user", s); answer(s); };
      sugs.appendChild(b);
    });
    add("bot", t.welcome);
    btn.onclick = function () { panel.classList.toggle("open"); };
    panel.querySelector("#mr-cs-close").onclick = function () { panel.classList.remove("open"); };
    form.onsubmit = function (e) {
      e.preventDefault();
      var v = (input.value || "").trim();
      if (!v) return;
      input.value = "";
      add("user", v);
      answer(v);
    };
    window.MR_CS = { lang: lang, geo: geo, brand: BRAND };
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-mr-lang", lang);
    if (geo) document.documentElement.setAttribute("data-mr-geo", geo);
  }
  function start() {
    var lang = detectLangFromBrowser();
    var geo = "";
    fetch("https://ipapi.co/json/", { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (j && j.country_code) {
          geo = [j.city, j.country_name].filter(Boolean).join(", ");
          lang = COUNTRY_LANG[j.country_code] || lang;
        }
      })
      .catch(function () {})
      .finally(function () { boot(lang, geo); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
