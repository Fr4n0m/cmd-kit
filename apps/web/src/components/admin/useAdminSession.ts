import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { sileo } from "sileo";
import type { AuthHeaders } from "./types";

const publicSupabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const publicSupabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

const supabase =
  publicSupabaseUrl && publicSupabaseAnonKey
    ? createClient(publicSupabaseUrl, publicSupabaseAnonKey)
    : null;

export function useAdminSession() {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? new URLSearchParams(window.location.hash.slice(1))
      : null;
    const tokenFromHash = hash?.get("access_token");
    if (tokenFromHash) {
      setAccessToken(tokenFromHash);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setAccessToken(data.session?.access_token ?? null);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    fetch("/api/admin/auth/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ accessToken })
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("session_failed");
        }

        if (window.location.pathname === "/admin") {
          window.location.assign("/admin");
        }
      })
      .catch(() => {
        sileo.error({ title: "Sesión", description: "Acceso admin denegado." });
      });
  }, [accessToken]);

  const authHeaders = useMemo<AuthHeaders | null>(() => {
    if (!accessToken) {
      return null;
    }

    return {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json"
    };
  }, [accessToken]);

  async function requestMagicLink() {
    await sileo.promise(
      fetch("/api/admin/auth/request-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("auth_failed");
        }
        return response.json();
      }),
      {
        loading: { title: "Enviando", description: "Generando enlace de acceso..." },
        success: { title: "Revisa email", description: "Abre el magic link para entrar al panel." },
        error: () => ({
          title: "Error enlace",
          description: "No se pudo enviar el enlace de acceso. Inténtalo de nuevo en unos minutos."
        })
      }
    );
  }

  async function signOut() {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } finally {
      setAccessToken(null);
      window.location.assign(`/api/admin/auth/logout?t=${Date.now()}`);
    }
  }

  return {
    email,
    setEmail,
    accessToken,
    authHeaders,
    requestMagicLink,
    signOut
  };
}
