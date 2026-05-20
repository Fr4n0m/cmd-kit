import { IconTrash } from "@tabler/icons-react";
import type { SubscriptionItem, SubscriptionStatus } from "./types";

type SubscriptionsTableProps = {
  items: SubscriptionItem[];
  onUpdateStatus: (email: string, status: SubscriptionStatus) => void;
  onDelete: (email: string) => void;
};

export function SubscriptionsTable({ items, onUpdateStatus, onDelete }: SubscriptionsTableProps) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Locale</th>
            <th>Source</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.email}>
              <td>{item.email}</td>
              <td>
                <select
                  value={item.status}
                  onChange={(event) => onUpdateStatus(item.email, event.target.value as SubscriptionStatus)}
                >
                  <option value="pending">pending</option>
                  <option value="active">active</option>
                  <option value="unsubscribed">unsubscribed</option>
                </select>
              </td>
              <td>{item.locale}</td>
              <td>{item.source}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
              <td>
                <button className="ghost-button compact-button" type="button" onClick={() => onDelete(item.email)}>
                  <IconTrash size={16} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
