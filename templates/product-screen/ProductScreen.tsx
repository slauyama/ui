import { Button } from "../../components/button/button";
import { Chip } from "../../components/chip/chip";
import { ChipSet } from "../../components/chipSet/chipSet";
import { Heading } from "../../components/heading/heading";
import type { DrawerEntry } from "../../components/navigationDrawer/navigationDrawer";
import { NavigationDrawer } from "../../components/navigationDrawer/navigationDrawer";
import { Text } from "../../components/text/text";

interface Row {
  initial: string;
  name: string;
  meta: string;
  time: string;
}

const ROWS: Row[] = [
  { initial: "A", name: "aurora-web", meta: "Production / Live", time: "2m" },
  { initial: "A", name: "aurora-api", meta: "Production / Building", time: "4m" },
  { initial: "D", name: "docs-site", meta: "Preview / Live", time: "1h" },
  { initial: "T", name: "tokens-cdn", meta: "Preview / Failed", time: "3h" },
  { initial: "P", name: "playground", meta: "Development / Live", time: "6h" },
];

const NAV: DrawerEntry[] = [
  { heading: "Workspace" },
  { value: "deployments", label: "Deployments", icon: "rocket_launch" },
  { value: "builds", label: "Builds", icon: "deployed_code", badge: "4" },
  { value: "logs", label: "Logs", icon: "terminal" },
  { heading: "Account" },
  { value: "settings", label: "Settings", icon: "settings" },
];

const METRICS = [
  { label: "DEPLOYS THIS WEEK", value: "128", note: "+18% on last week", tone: "neutral" as const },
  { label: "MEDIAN BUILD", value: "42s", note: "Across 214 modules", tone: "neutral" as const },
  { label: "UPTIME", value: "99.98%", note: "No incidents in 30 days", tone: "tertiary" as const },
];

const METRIC_CLASSES = {
  neutral: "bg-(--color-surface-container-highest) text-(--color-on-surface)",
  tertiary: "bg-(--color-tertiary-container) text-(--color-on-tertiary-container)",
};

/**
 * Desktop app shell: nav drawer, header, metric cards and a data list, all on this library's own
 * components and tokens. Compare with ProductScreen.dc.html, the Facet original this composition
 * follows — that file is Claude Design's own `.dc.html` template format (`x-dc`, `x-import`,
 * `sc-for`), rendered by its own runtime (`support.js`); there's no way to port that mechanism
 * itself into React, so this is a fresh composition built to the same layout and content.
 */
export function ProductScreen() {
  return (
    <div className="grid grid-cols-[300px_1fr] min-h-screen bg-(--color-surface-container)">
      <NavigationDrawer
        items={NAV}
        value="deployments"
        header={
          <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
            <span className="[font-family:var(--typescale-display-hero-font)] text-2xl font-semibold tracking-[-1px]">
              Facet
            </span>
            <Text
              as="span"
              variant="label-small"
              className="px-2 py-0.5 rounded-full bg-(--color-tertiary-container) text-(--color-on-tertiary-container)"
            >
              v2.4.0
            </Text>
          </div>
        }
      />
      <main className="rounded-s-(--shape-corner-extra-large) bg-(--color-surface) px-12 py-7 overflow-y-auto">
        <header className="flex items-start gap-6 pb-7">
          <div className="flex flex-col gap-2">
            <Text as="span" variant="label-large" className="text-(--color-primary)">
              Production
            </Text>
            <Heading as="h1" variant="headline-large">
              Deployments
            </Heading>
            <Text
              as="p"
              variant="body-large"
              className="text-(--color-on-surface-variant) max-w-140"
            >
              Everything shipped in the last seven days, across twelve edge
              regions.
            </Text>
          </div>
          <div className="ms-auto flex gap-3 pt-7">
            <Button variant="outlined" icon="replay">
              Redeploy
            </Button>
            <Button icon="rocket_launch">Deploy</Button>
          </div>
        </header>
        <div className="grid grid-cols-3 gap-5 pb-7">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className={`flex flex-col gap-1.5 p-5 rounded-xl ${METRIC_CLASSES[m.tone]}`}
            >
              <Text as="span" variant="label-medium">
                {m.label}
              </Text>
              <Heading as="h2" variant="display-small" className="m-0">
                {m.value}
              </Heading>
              <Text as="span" variant="body-medium">
                {m.note}
              </Text>
            </div>
          ))}
        </div>
        <ChipSet className="pb-5">
          <Chip variant="filter" label="All" selected />
          <Chip variant="filter" label="Production" />
          <Chip variant="filter" label="Preview" />
          <Chip variant="assist" icon="tune" label="Filters" />
        </ChipSet>
        <div className="rounded-xl overflow-hidden border border-(--color-outline-variant)">
          {ROWS.map((row, i) => (
            <div
              key={row.name}
              className={[
                "flex items-center gap-4 min-h-18 px-4",
                i > 0 ? "border-t border-(--color-outline-variant)" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-(--color-primary-container) text-(--color-on-primary-container) font-semibold">
                {row.initial}
              </span>
              <span className="flex flex-col gap-0.5 flex-1">
                <Text as="span" variant="body-large">
                  {row.name}
                </Text>
                <Text
                  as="span"
                  variant="body-medium"
                  className="text-(--color-on-surface-variant)"
                >
                  {row.meta}
                </Text>
              </span>
              <Text
                as="span"
                variant="label-small"
                className="text-(--color-on-surface-variant)"
              >
                {row.time}
              </Text>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
