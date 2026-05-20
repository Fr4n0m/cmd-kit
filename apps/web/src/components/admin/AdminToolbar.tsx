import {
  IconBellRinging,
  IconHeartbeat,
  IconLogout,
  IconMail,
  IconRefresh
} from "@tabler/icons-react";
import type { AdminPanelMode } from "./types";

type AdminToolbarProps = {
  email: string;
  mode: AdminPanelMode;
  onEmailChange: (value: string) => void;
  onRequestMagicLink: () => void;
  onRefresh: () => void;
  onOpenNotify: () => void;
  onOpenHealth: () => void;
  onSignOut: () => void;
};

export function AdminToolbar({
  email,
  mode,
  onEmailChange,
  onRequestMagicLink,
  onRefresh,
  onOpenNotify,
  onOpenHealth,
  onSignOut
}: AdminToolbarProps) {
  return (
    <div className="admin-panel-toolbar">
      <input
        className="admin-panel-key"
        type="email"
        placeholder="admin@email.com"
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
      />
      <button className="primary-button compact-button" type="button" onClick={onRequestMagicLink}>
        <IconMail size={16} />
        Send access link
      </button>
      {mode === "full" && (
        <>
          <button className="ghost-button compact-button" type="button" onClick={onRefresh}>
            <IconRefresh size={16} />
            Refresh list
          </button>
          <button className="primary-button compact-button" type="button" onClick={onOpenNotify}>
            <IconBellRinging size={16} />
            Send notify
          </button>
          <button className="ghost-button compact-button" type="button" onClick={onOpenHealth}>
            <IconHeartbeat size={16} />
            Check health
          </button>
          <button className="ghost-button compact-button" type="button" onClick={onSignOut}>
            <IconLogout size={16} />
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
