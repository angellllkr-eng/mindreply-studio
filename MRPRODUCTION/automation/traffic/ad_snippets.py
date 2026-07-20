"""AUREL / Mind-Reply traffic + ad concept generator (owner: angellllkr-eng).
Run locally. No secrets required for concept generation.
"""
from datetime import datetime

BRANDS = {
    "mind-reply": {
        "url": "https://mind-reply.com",
        "angle": "Owner control plane for premium AI products",
    },
    "aurel": {
        "url": "https://aurel.mind-reply.com",
        "angle": "Invisible Premium Connectivity for luxury homes & hospitality",
    },
}

HOOKS = [
    "Because of quality — not noise.",
    "Reliability before hype.",
    "Private by default. Premium by design.",
    "Invisible infrastructure. Visible confidence.",
    "Classy systems that compound daily.",
]

def campaign_pack(brand_key: str):
    b = BRANDS[brand_key]
    day = datetime.utcnow().strftime("%Y-%m-%d")
    return {
        "date": day,
        "brand": brand_key,
        "url": b["url"],
        "owner": "angellllkr-eng",
        "hooks": HOOKS,
        "posts": [
            f"{HOOKS[0]} Explore {b['url']}",
            f"{b['angle']} — {HOOKS[1]}",
            f"Daily improvement loop. {HOOKS[4]} {b['url']}",
        ],
        "cta": f"Visit {b['url']} · Owned by angellllkr-eng",
    }

if __name__ == "__main__":
    import json
    print(json.dumps({"mind-reply": campaign_pack("mind-reply"), "aurel": campaign_pack("aurel")}, indent=2))
