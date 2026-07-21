type TrendItem = {
  source: string;
  title: string;
  url?: string;
  score?: number | string;
  comments?: number | string;
  signal?: string;
  suggestedAction?: string;
};

function cleanTitle(x: unknown) {
  return String(x || "").replace(/\s+/g, " ").trim();
}

function actionFor(title: string, source: string) {
  const t = title.toLowerCase();

  if (t.includes("agent") || t.includes("workflow") || t.includes("automation")) {
    return "Turn into AUREL workflow card or n8n review item.";
  }

  if (t.includes("shop") || t.includes("commerce") || t.includes("product")) {
    return "Review for UNAPOLAGETIC commerce angle; keep publishing owner-approved.";
  }

  if (t.includes("security") || t.includes("vulnerability") || t.includes("github")) {
    return "Send to Security / GitHub queue before deploy.";
  }

  if (source === "npm") {
    return "Check package maturity before adding. Do not install automatically.";
  }

  return "Review inside /command and decide: ignore, save, prototype, or action.";
}

async function safeJson(url: string) {
  const res = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "User-Agent": "AUREL-Command-TrendIntel",
    },
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error(`${url} -> ${res.status}`);
  }

  return res.json();
}

export async function GET() {
  const errors: string[] = [];
  const items: TrendItem[] = [];

  try {
    const hnFront = await safeJson("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=12");

    for (const hit of hnFront.hits || []) {
      const title = cleanTitle(hit.title || hit.story_title);
      if (!title) continue;

      items.push({
        source: "HN front",
        title,
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        score: hit.points ?? "n/a",
        comments: hit.num_comments ?? "n/a",
        signal: "Front-page market/developer attention signal.",
        suggestedAction: actionFor(title, "hn"),
      });
    }
  } catch (error: any) {
    errors.push(`HN front failed: ${error.message}`);
  }

  try {
    const hnShow = await safeJson("https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&query=AI%20agent%20workflow%20automation&hitsPerPage=8");

    for (const hit of hnShow.hits || []) {
      const title = cleanTitle(hit.title || hit.story_title);
      if (!title) continue;

      items.push({
        source: "Show HN",
        title,
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        score: hit.points ?? "n/a",
        comments: hit.num_comments ?? "n/a",
        signal: "Builder/product launch signal.",
        suggestedAction: actionFor(title, "hn"),
      });
    }
  } catch (error: any) {
    errors.push(`Show HN failed: ${error.message}`);
  }

  try {
    const gh = await safeJson("https://api.github.com/search/repositories?q=ai+agent+workflow+automation+dashboard&sort=updated&order=desc&per_page=8");

    for (const repo of gh.items || []) {
      const title = cleanTitle(repo.full_name);
      if (!title) continue;

      items.push({
        source: "GitHub",
        title,
        url: repo.html_url,
        score: repo.stargazers_count ?? "n/a",
        comments: repo.open_issues_count ?? "n/a",
        signal: cleanTitle(repo.description) || "Repository ecosystem signal.",
        suggestedAction: actionFor(`${title} ${repo.description || ""}`, "github"),
      });
    }
  } catch (error: any) {
    errors.push(`GitHub search failed: ${error.message}`);
  }

  try {
    const npm = await safeJson("https://registry.npmjs.org/-/v1/search?text=ai%20agent%20workflow&size=8");

    for (const pkg of npm.objects || []) {
      const p = pkg.package || {};
      const title = cleanTitle(p.name);
      if (!title) continue;

      items.push({
        source: "npm",
        title,
        url: p.links?.npm,
        score: pkg.score?.final ? Number(pkg.score.final).toFixed(2) : "n/a",
        comments: "pkg",
        signal: cleanTitle(p.description) || "npm package signal.",
        suggestedAction: actionFor(`${title} ${p.description || ""}`, "npm"),
      });
    }
  } catch (error: any) {
    errors.push(`npm search failed: ${error.message}`);
  }

  return Response.json({
    ok: errors.length === 0,
    generatedAt: new Date().toISOString(),
    count: items.length,
    items: items.slice(0, 24),
    errors,
  });
}
