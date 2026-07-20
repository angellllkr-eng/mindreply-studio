"""Model competition runner for 5k-visitor products.
Owner: angellllkr-eng
Primary estate models: Grok 4.5, Claude Opus 4.8
"""
from datetime import datetime, timezone

PRODUCTS = [
    {"name": "Mind-Reply", "url": "https://mind-reply.com", "primary": "grok-4.5", "challenger": "claude-opus-4.8"},
    {"name": "AUREL", "url": "https://aurel.mind-reply.com", "primary": "claude-opus-4.8", "challenger": "grok-4.5"},
    {"name": "Regex Forge", "url": "https://regex-forge.vercel.app", "primary": "grok-4.5", "challenger": "claude-opus-4.8"},
    {"name": "SDR Agent", "url": "https://sdr-agent-flax.vercel.app", "primary": "grok-4.5", "challenger": "claude-opus-4.8"},
    {"name": "Code Tutor", "url": "https://code-tutor-flame.vercel.app", "primary": "claude-opus-4.8", "challenger": "grok-4.5"},
    {"name": "Code Lens", "url": "https://code-lens-henna.vercel.app", "primary": "grok-4.5", "challenger": "claude-opus-4.8"},
    {"name": "SQL Studio", "url": "https://sql-studio-weld.vercel.app", "primary": "claude-opus-4.8", "challenger": "grok-4.5"},
    {"name": "L402 Skills", "url": "https://l402-skills.vercel.app", "primary": "grok-4.5", "challenger": "claude-opus-4.8"},
]

HOOKS = {
    "grok-4.5": [
        "Ship faster. Stay classy.",
        "Predictive loops. Daily expansion.",
        "Because of quality — not noise.",
    ],
    "claude-opus-4.8": [
        "Invisible premium. Visible confidence.",
        "Reliability before hype.",
        "Designed for decision-makers.",
    ],
}

def pack(product):
    return {
        "owner": "angellllkr-eng",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "product": product["name"],
        "url": product["url"],
        "primary_model": product["primary"],
        "challenger_model": product["challenger"],
        "primary_hooks": HOOKS.get(product["primary"], []),
        "challenger_hooks": HOOKS.get(product["challenger"], []),
        "target": "5000 visitors continuous improvement",
        "cta": f"Visit {product['url']} · Owned by angellllkr-eng",
    }

if __name__ == "__main__":
    import json
    print(json.dumps([pack(p) for p in PRODUCTS], indent=2))
