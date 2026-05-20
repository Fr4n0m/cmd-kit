import { useEffect, useState } from "react";
import { sileo } from "sileo";
import { AdminToolbar } from "./AdminToolbar";
import { NotifyResourcesModal } from "./NotifyResourcesModal";
import { SubscriptionsTable } from "./SubscriptionsTable";
import type { AdminPanelMode, CatalogResource, NotifyResource } from "./types";
import { useAdminSession } from "./useAdminSession";
import { useResourceCatalog } from "./useResourceCatalog";
import { useSubscriptionsAdmin } from "./useSubscriptionsAdmin";

export function AdminSubscriptionsPanel({ mode = "full" }: { mode?: AdminPanelMode }) {
  const { email, setEmail, authHeaders, requestMagicLink, signOut } = useAdminSession();
  const { items, loadItems, updateStatus, removeSubscription, clearItems } =
    useSubscriptionsAdmin(authHeaders);

  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [resources, setResources] = useState<NotifyResource[]>([]);
  const [resourceQuery, setResourceQuery] = useState("");
  const [resourceLocale, setResourceLocale] = useState<"en" | "es">("en");
  const { resourceResults, resourceSearchBusy, setResourceResults } = useResourceCatalog(
    isNotifyModalOpen,
    resourceLocale,
    resourceQuery
  );

  useEffect(() => {
    if (mode === "full") {
      void loadItems();
    }
  }, [mode, loadItems]);

  function resetNotifyState() {
    setResources([]);
    setResourceQuery("");
    setResourceResults([]);
  }

  function closeNotifyModal() {
    setIsNotifyModalOpen(false);
    resetNotifyState();
  }

  function addResourceFromSearch(item: CatalogResource) {
    setResources((prev) => (prev.some((resource) => resource.id === item.id) ? prev : [...prev, item]));
  }

  function removeResourceRow(index: number) {
    setResources((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  }

  async function sendNotify() {
    const cleanResources = resources
      .map((entry) => ({
        id: entry.id.trim(),
        title: entry.title.trim(),
        url: entry.url.trim(),
        summary: entry.summary.trim()
      }))
      .filter((entry) => entry.id && entry.title && entry.url)
      .map((entry) => ({
        ...entry,
        summary: entry.summary || undefined
      }));

    if (!cleanResources.length) {
      sileo.error({ title: "Error envío", description: "Añade al menos un recurso válido." });
      return;
    }

    await sileo.promise(
      fetch("/api/admin/subscriptions/notify", {
        method: "POST",
        headers: authHeaders ?? { "content-type": "application/json" },
        body: JSON.stringify({ resources: cleanResources })
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Notify failed");
        }
        return response.json();
      }),
      {
        loading: { title: "Enviando", description: "Lanzando notificaciones..." },
        success: { title: "Envío ok", description: "Notificaciones enviadas." },
        error: () => ({ title: "Error envío", description: "No se pudieron enviar." })
      }
    );

    closeNotifyModal();
  }

  async function handleSignOut() {
    clearItems();
    await signOut();
  }

  return (
    <section className="admin-panel-wrap">
      <AdminToolbar
        email={email}
        mode={mode}
        onEmailChange={setEmail}
        onRequestMagicLink={requestMagicLink}
        onRefresh={loadItems}
        onOpenNotify={() => setIsNotifyModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {mode === "gate" && (
        <p className="content-paragraph">Magic link required. Direct access to subscriptions is blocked.</p>
      )}

      {mode === "full" && (
        <SubscriptionsTable
          items={items}
          onUpdateStatus={updateStatus}
          onDelete={removeSubscription}
        />
      )}

      <NotifyResourcesModal
        isOpen={isNotifyModalOpen}
        resources={resources}
        resourceQuery={resourceQuery}
        resourceLocale={resourceLocale}
        resourceResults={resourceResults}
        resourceSearchBusy={resourceSearchBusy}
        onClose={closeNotifyModal}
        onResourceQueryChange={setResourceQuery}
        onResourceLocaleChange={setResourceLocale}
        onAddResource={addResourceFromSearch}
        onRemoveResource={removeResourceRow}
        onSend={sendNotify}
      />
    </section>
  );
}
