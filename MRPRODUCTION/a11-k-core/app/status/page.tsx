import type { Metadata } from "next";
import { PublicNav } from "@/components/PublicNav";
import { LiveProofPanel } from "@/components/LiveProofPanel";
import { StatusBadge } from "@/components/StatusBadge";
import { defaultLiveProof } from "@/lib/shadow";
import { BRAND_REGISTRY } from "@/lib/brand-registry";

export const metadata: Metadata = {
  title: "Status",
  description: "Public-safe A11-K estate status monitor (abstract when live checks unavailable).",
};

export default function StatusPage() {
  const proof = defaultLiveProof();
  return (
    <>
      <PublicNav />
      <main className="section">
        <div className="container stack">
          <div>
            <h1 style={{ margin: 0 }}>Status Monitor</h1>
            <p className="muted">Abstract health board. No secrets. No customer data.</p>
          </div>
          <LiveProofPanel data={proof} showEnv={false} />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Surface</th>
                  <th>Visibility</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {BRAND_REGISTRY.filter((b) => b.visibility === "public").map((b) => (
                  <tr key={b.slug}>
                    <td>
                      <strong>{b.name}</strong>
                    </td>
                    <td>
                      <StatusBadge status={b.visibility} />
                    </td>
                    <td>
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
