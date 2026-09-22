import { useState } from "react";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { Chip } from "../../components/chip/chip";
import { ChipSet } from "../../components/chipSet/chipSet";
import { CircularProgress } from "../../components/circularProgress/circularProgress";
import { Heading } from "../../components/heading/heading";
import { IconButton } from "../../components/iconButton/iconButton";
import { List } from "../../components/list/list";
import { Tabs } from "../../components/tabs/tabs";
import { Text } from "../../components/text/text";
import { TopAppBar } from "../../components/topAppBar/topAppBar";

interface DeployItem {
  name: string;
  env: string;
  time: string;
}

const LOG_LINES = [
  "12:04:01 build started",
  "12:04:04 resolving 214 modules",
  "12:04:19 compiled tokens",
  "12:04:31 bundled components",
  "12:04:42 deploy complete",
];

const ENV_VARS = ["NODE_ENV", "FACET_TOKENS_URL", "EDGE_REGION", "LOG_LEVEL"];

export interface DetailScreenProps {
  item: DeployItem;
  onBack: () => void;
  onArchive: () => void;
}

/** Deployment detail: app bar, tabs, stat card, metadata list, log view. Compare DetailScreen.jsx. */
export function DetailScreen({ item, onBack, onArchive }: DetailScreenProps) {
  const [tab, setTab] = useState("overview");
  return (
    <>
      <TopAppBar
        variant="medium"
        title={item.name}
        leading={<IconButton icon="arrow_back" label="Back" onClick={onBack} />}
        actions={
          <>
            <IconButton icon="share" label="Share" />
            <IconButton icon="more_vert" label="More" />
          </>
        }
      />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "logs", label: "Logs" },
          { value: "env", label: "Env" },
        ]}
      />
      <div className="flex-1 overflow-y-auto">
        {tab === "overview" ? (
          <div className="flex flex-col gap-4 px-4 pt-4">
            {/*
              flex-row as a class here would fight Card's own baked-in flex-col at equal
              specificity, with the winner decided by stylesheet order, not class order — so the
              direction override goes through style instead.
            */}
            <Card
              variant="filled"
              className="items-center gap-5 p-5"
              style={{ flexDirection: "row" }}
            >
              <CircularProgress
                value={0.82}
                size={64}
                strokeWidth={6}
                label="Build time"
              />
              <div className="flex flex-col gap-0.5">
                <Heading as="h2" variant="headline-small" className="m-0">
                  42s
                </Heading>
                <Text
                  as="span"
                  variant="body-small"
                  className="text-(--color-on-surface-variant)"
                >
                  Build time, 18% faster than last
                </Text>
              </div>
            </Card>
            <ChipSet>
              <Chip variant="assist" icon="commit" label="4127" />
              <Chip variant="assist" icon="account_tree" label="main" />
              <Chip variant="assist" icon="schedule" label={`${item.time} ago`} />
            </ChipSet>
            <Card variant="outlined">
              <List>
                <List.Item
                  lines={2}
                  leadingIcon="public"
                  headline="Regions"
                  supportingText="12 edge locations"
                  trailingIcon="chevron_right"
                  onClick={() => {}}
                />
                <List.Item
                  lines={2}
                  leadingIcon="database"
                  headline="Environment"
                  supportingText={item.env}
                  trailingIcon="chevron_right"
                  onClick={() => {}}
                />
                <List.Item
                  lines={2}
                  leadingIcon="person"
                  headline="Triggered by"
                  supportingText="ada@facet.dev"
                  trailingIcon="chevron_right"
                  onClick={() => {}}
                />
              </List>
            </Card>
            <div className="flex gap-3 pb-6">
              <Button variant="outlined" icon="replay" fullWidth>
                Redeploy
              </Button>
              <Button icon="archive" fullWidth onClick={onArchive}>
                Archive
              </Button>
            </div>
          </div>
        ) : null}
        {tab === "logs" ? (
          <div className="flex flex-col gap-0 p-4 text-(--color-on-surface-variant)">
            {LOG_LINES.map((l) => (
              <div key={l} className="flex gap-2.5">
                <Text as="span" variant="code" className="text-(--color-primary)">
                  &gt;
                </Text>
                <Text as="span" variant="code">
                  {l}
                </Text>
              </div>
            ))}
          </div>
        ) : null}
        {tab === "env" ? (
          <List>
            {ENV_VARS.map((k) => (
              <List.Item
                key={k}
                lines={2}
                headline={k}
                supportingText="Set 3 days ago"
                trailingIcon="visibility"
                onClick={() => {}}
              />
            ))}
          </List>
        ) : null}
      </div>
    </>
  );
}
