import { useState } from "react";
import { Card } from "../../components/card/card";
import { Chip } from "../../components/chip/chip";
import { ChipSet } from "../../components/chipSet/chipSet";
import { Divider } from "../../components/divider/divider";
import { Fab } from "../../components/fab/fab";
import { Icon } from "../../components/icon/icon";
import { IconButton } from "../../components/iconButton/iconButton";
import { LinearProgress } from "../../components/linearProgress/linearProgress";
import { List } from "../../components/list/list";
import { SearchBar } from "../../components/searchBar/searchBar";
import { Text } from "../../components/text/text";
import { TopAppBar } from "../../components/topAppBar/topAppBar";
import { Badge } from "../../components/badge/badge";

interface Deploy {
  id: number;
  name: string;
  env: "Production" | "Preview" | "Development";
  status: string;
  time: string;
  tone: keyof typeof TONE_CLASSES;
  icon: string;
  progress?: number;
}

const DEPLOYS: Deploy[] = [
  { id: 1, name: "aurora-web", env: "Production", status: "Live", time: "2m", tone: "tertiary", icon: "check_circle" },
  { id: 2, name: "aurora-api", env: "Production", status: "Building", time: "4m", tone: "primary", icon: "sync", progress: 0.62 },
  { id: 3, name: "docs-site", env: "Preview", status: "Live", time: "1h", tone: "tertiary", icon: "check_circle" },
  { id: 4, name: "tokens-cdn", env: "Preview", status: "Failed", time: "3h", tone: "error", icon: "error" },
  { id: 5, name: "playground", env: "Development", status: "Live", time: "6h", tone: "tertiary", icon: "check_circle" },
];

const TONE_CLASSES = {
  tertiary: "bg-(--color-tertiary-container) text-(--color-on-tertiary-container)",
  primary: "bg-(--color-primary-container) text-(--color-on-primary-container)",
  error: "bg-(--color-error-container) text-(--color-on-error-container)",
};

const FILTERS: [string, string][] = [
  ["all", "All"],
  ["Production", "Production"],
  ["Preview", "Preview"],
  ["Development", "Development"],
];

const WEEK = [30, 46, 28, 62, 54, 78, 44];

export interface DeploysScreenProps {
  page: "home" | "builds" | "logs";
  onOpen: (deploy: Deploy) => void;
  onCompose: () => void;
}

/** Deployment list: collapsing app bar, search, filter chips, metric card, rows. Compare DeploysScreen.jsx. */
export function DeploysScreen({ page, onOpen, onCompose }: DeploysScreenProps) {
  const [filter, setFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const title = page === "home" ? "Deployments" : page === "builds" ? "Builds" : "Logs";
  const rows = filter === "all" ? DEPLOYS : DEPLOYS.filter((d) => d.env === filter);

  return (
    <>
      <TopAppBar
        variant={scrolled ? "small" : "large"}
        scrolled={scrolled}
        title={title}
        leading={<IconButton icon="menu" label="Menu" />}
        actions={
          <>
            <IconButton icon="filter_list" label="Filter" />
            <Badge value="4">
              <IconButton icon="notifications" label="Alerts" />
            </Badge>
          </>
        }
      />
      <div
        className="flex-1 overflow-y-auto pb-6"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 8)}
      >
        <div className="flex flex-col gap-4 px-4 pt-1">
          <SearchBar
            placeholder="Search deployments"
            trailing={<IconButton icon="mic" label="Voice search" />}
          />
          <ChipSet>
            {FILTERS.map(([v, l]) => (
              <Chip
                key={v}
                variant="filter"
                label={l}
                selected={filter === v}
                onClick={() => setFilter(v)}
              />
            ))}
          </ChipSet>
          <Card variant="filled" className="p-4 gap-3">
            <div className="flex items-center justify-between">
              <Text as="span" variant="title-medium">
                Weekly deploys
              </Text>
              <Text as="span" variant="label-large" className="text-(--color-primary)">
                +18%
              </Text>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {WEEK.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-md ${i === 5 ? "bg-(--color-primary)" : "bg-(--color-primary-container)"}`}
                  style={{ height: h + "%" }}
                />
              ))}
            </div>
          </Card>
          <Text
            as="span"
            variant="title-small"
            className="text-(--color-on-surface-variant) pt-1"
          >
            Recent
          </Text>
        </div>
        <List className="bg-transparent p-0">
          {rows.map((d, i) => (
            <div key={d.id}>
              <List.Item
                lines={2}
                onClick={() => onOpen(d)}
                leading={
                  <span
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${TONE_CLASSES[d.tone]}`}
                  >
                    <Icon name={d.icon} size={22} filled />
                  </span>
                }
                headline={d.name}
                supportingText={`${d.env} / ${d.status}`}
                trailingText={d.time}
              />
              {d.progress ? (
                <div className="pl-18 pr-4 pb-3">
                  <LinearProgress
                    value={d.progress}
                    label={`${d.name} build progress`}
                  />
                </div>
              ) : null}
              {i < rows.length - 1 ? <Divider insetStart /> : null}
            </div>
          ))}
        </List>
      </div>
      <div className="absolute right-4 bottom-24 z-30">
        <Fab icon="rocket_launch" label="Deploy" color="tertiary" onClick={onCompose} />
      </div>
    </>
  );
}
