import { useEffect, useState } from "react";
import { Button } from "../../components/button/button";
import { Dialog } from "../../components/dialog/dialog";
import { NavigationBar } from "../../components/navigationBar/navigationBar";
import { Snackbar } from "../../components/snackbar/snackbar";
import { DeploysScreen } from "./DeploysScreen";
import { DetailScreen } from "./DetailScreen";
import { SettingsScreen } from "./SettingsScreen";

interface DeployItem {
  id: number;
  name: string;
  env: string;
  time: string;
}

const DESTS = [
  { value: "home", label: "Deploys", icon: "rocket_launch" },
  { value: "builds", label: "Builds", icon: "deployed_code", badge: "4" },
  { value: "logs", label: "Logs", icon: "terminal" },
  { value: "settings", label: "Settings", icon: "settings" },
];

/**
 * Compact-width (420px) app shell: destination switching, a snackbar host and a confirm dialog.
 * Compare with MobileApp.jsx, the Facet original this composition follows.
 */
export function MobileApp() {
  const [page, setPage] = useState("home");
  const [detail, setDetail] = useState<DeployItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="relative flex flex-col h-full bg-(--color-surface) overflow-hidden">
      {detail ? (
        <DetailScreen
          item={detail}
          onBack={() => setDetail(null)}
          onArchive={() => {
            setDetail(null);
            setToast("Deployment archived");
          }}
        />
      ) : (
        <>
          {page === "home" || page === "builds" || page === "logs" ? (
            <DeploysScreen
              page={page as "home" | "builds" | "logs"}
              onOpen={setDetail}
              onCompose={() => setConfirm(true)}
            />
          ) : null}
          {page === "settings" ? <SettingsScreen onToast={setToast} /> : null}
          <NavigationBar items={DESTS} value={page} onChange={setPage} />
        </>
      )}
      {toast ? (
        <div className="absolute left-4 right-4 bottom-24 z-50">
          <Snackbar message={toast} action="Undo" onAction={() => setToast(null)} />
        </div>
      ) : null}
      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        icon="rocket_launch"
        headline="Deploy to production?"
        actions={
          <>
            <Button variant="text" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setConfirm(false);
                setToast("Deploy queued");
              }}
            >
              Deploy
            </Button>
          </>
        }
      >
        This promotes build 4127 to the production environment and restarts
        12 edge regions.
      </Dialog>
    </div>
  );
}
