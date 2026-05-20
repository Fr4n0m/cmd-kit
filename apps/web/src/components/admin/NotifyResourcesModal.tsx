import { IconPlus, IconSend2, IconTrash, IconX } from "@tabler/icons-react";
import type { CatalogResource, NotifyResource } from "./types";

type NotifyResourcesModalProps = {
  isOpen: boolean;
  resources: NotifyResource[];
  resourceQuery: string;
  resourceLocale: "en" | "es";
  resourceResults: CatalogResource[];
  resourceSearchBusy: boolean;
  onClose: () => void;
  onResourceQueryChange: (value: string) => void;
  onResourceLocaleChange: (value: "en" | "es") => void;
  onAddResource: (item: CatalogResource) => void;
  onRemoveResource: (index: number) => void;
  onSend: () => void;
};

export function NotifyResourcesModal({
  isOpen,
  resources,
  resourceQuery,
  resourceLocale,
  resourceResults,
  resourceSearchBusy,
  onClose,
  onResourceQueryChange,
  onResourceLocaleChange,
  onAddResource,
  onRemoveResource,
  onSend
}: NotifyResourcesModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal-card">
        <div className="admin-modal-header">
          <h2>Send npm release notification</h2>
          <button
            className="ghost-button compact-button icon-only-button"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <IconX size={16} />
          </button>
        </div>
        <p className="content-paragraph">
          Select one or multiple npm package releases. Subscribers receive one email per send.
        </p>
        <div className="admin-modal-search">
          <select
            className="admin-panel-key"
            value={resourceLocale}
            onChange={(event) => onResourceLocaleChange(event.target.value as "en" | "es")}
          >
            <option value="en">NPM catalog EN</option>
            <option value="es">NPM catálogo ES</option>
          </select>
          <input
            className="admin-panel-key"
            type="text"
            placeholder="Search npm packages..."
            value={resourceQuery}
            onChange={(event) => onResourceQueryChange(event.target.value)}
          />
        </div>
        <div className="admin-search-results">
          {resourceSearchBusy ? <p className="content-paragraph">Searching...</p> : null}
          {!resourceSearchBusy && resourceResults.length === 0 ? (
            <p className="content-paragraph">No npm packages found.</p>
          ) : null}
          {!resourceSearchBusy &&
            resourceResults.map((item) => (
              <div className="admin-search-item" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.summary}</p>
                </div>
                <button
                  className="ghost-button compact-button"
                  type="button"
                  onClick={() => onAddResource(item)}
                >
                  <IconPlus size={16} />
                  Add
                </button>
              </div>
            ))}
        </div>
        <div className="admin-modal-list">
          {resources.map((resource, index) => (
            <div key={`resource-${index}`} className="admin-resource-item">
              <strong>{resource.title}</strong>
              <p>{resource.summary}</p>
              <code>{resource.url}</code>
              <button
                className="ghost-button compact-button"
                type="button"
                onClick={() => onRemoveResource(index)}
              >
                <IconTrash size={16} />
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="admin-modal-actions">
          <span className="content-paragraph">{resources.length} selected packages</span>
          <button className="primary-button compact-button" type="button" onClick={onSend}>
            <IconSend2 size={16} />
            Send now
          </button>
        </div>
      </div>
    </div>
  );
}
