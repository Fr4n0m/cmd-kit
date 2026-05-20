type AdminHealthCheck = {
  key: string;
  ok: boolean;
  detail: string;
};

type AdminHealthCardProps = {
  healthy: boolean;
  checks: AdminHealthCheck[];
};

function normalizeLabel(key: string) {
  return key.replaceAll("_", " ");
}

export function AdminHealthCard({ healthy, checks }: AdminHealthCardProps) {
  return (
    <article className="admin-health-card">
      <div className="admin-health-header">
        <h2>System health</h2>
        <span className={`admin-health-badge ${healthy ? "is-ok" : "is-fail"}`}>
          {healthy ? "ready" : "issues"}
        </span>
      </div>
      <div className="admin-health-grid">
        {checks.map((check) => (
          <div className="admin-health-item" key={check.key}>
            <strong>{normalizeLabel(check.key)}</strong>
            <span className={check.ok ? "is-ok" : "is-fail"}>{check.ok ? "OK" : "FAIL"}</span>
            <p>{check.detail}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
