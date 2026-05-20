import { useCallback, useState } from "react";
import { sileo } from "sileo";
import type { AuthHeaders } from "./types";

type AdminHealthCheck = {
  key: string;
  ok: boolean;
  detail: string;
};

type AdminHealthPayload = {
  ok: boolean;
  healthy: boolean;
  checks: AdminHealthCheck[];
};

export function useAdminHealth(authHeaders: AuthHeaders | null) {
  const [health, setHealth] = useState<AdminHealthPayload | null>(null);

  const loadHealth = useCallback(async () => {
    await sileo.promise(
      fetch("/api/admin/health/subscriptions", {
        headers: authHeaders ?? undefined
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("health_failed");
        }
        const payload = (await response.json()) as AdminHealthPayload;
        setHealth(payload);
      }),
      {
        loading: { title: "Checking", description: "Validating production env essentials..." },
        success: { title: "Check ready", description: "Admin health data loaded." },
        error: () => ({ title: "Health error", description: "Could not load admin health checks." })
      }
    );
  }, [authHeaders]);

  return { health, loadHealth };
}
