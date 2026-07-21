# Frontend Source of Truth

| Brand / Site | Canonical folder (local) | Vercel project ID | Domain / Sub‑domain | Old scratch folder(s) | Status (live / preview / local) | UI renewed? | Next action |
|---|---|---|---|---|---|---|---|
| **A11‑K Engine Core** | `C:\Users\ANGEL\MRPRODUCTION\a11-k-core` | `prj_tF8MATzE2bOP0hPfiKZcuGX992dh` | `https://a11‑k.space` | `frontend-a11k` (quarantined) | Local UI ready; production UI still old until deploy limit resets | ✅ (local) | Deploy once Vercel limit clears |
| **A11‑K Command Center** (`/command`) | same | same | `https://a11‑k.space/command` | – | Local UI ready; production UI still old until deploy limit resets | ✅ (local) | Deploy once Vercel limit clears |
| **Brushworks** | same | same | `https://brushworks.a11‑k.space` | – | Local UI ready; domain attachment needs deploy/domain verification | ✅ (local) | Attach domain in Vercel and deploy |
| **MindReply public site** | MindReply canonical repo (see project) | `prj_C1cMWS3hIZkZarqpCf5Xbmjujquq` | `https://mind‑reply.com` & `https://www.mind‑reply.com` | `frontend-mindreply-scratch` (unknown legacy; verify if present) | `www` shows updated public copy; apex redirects | ✅ for `www` (observed) | Align `mind‑reply.com` routing with `www` canonical content |
| **Tools portal** (`tools.mind‑reply.com`) | tools route inside MindReply | same as MindReply | `https://tools.mind‑reply.com` | – | Blocked (HTTP 404 observed) | no (production) | Deploy tool portal route to MindReply canonical project |
| **Labs hub** (`labs.a11‑k.space`) | same repo/sub-router | same as A11‑K core | `https://labs.a11‑k.space` | – | Blocked (HTTP 404 observed) | no (production) | Deploy labs route to A11‑K core project |

Notes:
* “UI renewed?” reflects **local readiness** unless marked with an observed production marker.
* Old scratch frontends are quarantined/archived under `_ARCHIVE_FRONTENDS` to prevent future agents from using them.
