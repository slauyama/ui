import { useState } from "react";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { IconButton } from "../../components/iconButton/iconButton";
import { List } from "../../components/list/list";
import { Radio } from "../../components/radio/radio";
import { Select } from "../../components/select/select";
import { Slider } from "../../components/slider/slider";
import { Switch } from "../../components/switch/switch";
import { Text } from "../../components/text/text";
import { TopAppBar } from "../../components/topAppBar/topAppBar";

const APPEARANCE: [string, string][] = [
  ["system", "Follow system"],
  ["light", "Light"],
  ["dark", "Dark"],
];

export interface SettingsScreenProps {
  onToast: (message: string) => void;
}

/** Settings: switch rows, select, slider, radio group. Compare SettingsScreen.jsx. */
export function SettingsScreen({ onToast }: SettingsScreenProps) {
  const [alerts, setAlerts] = useState(true);
  const [beta, setBeta] = useState(false);
  const [region, setRegion] = useState("iad");
  const [threshold, setThreshold] = useState(70);
  const [theme, setTheme] = useState("system");

  return (
    <>
      <TopAppBar
        variant="large"
        title="Settings"
        leading={<IconButton icon="arrow_back" label="Back" />}
        actions={<IconButton icon="help" label="Help" />}
      />
      <div className="flex-1 overflow-y-auto">
        <List>
          <List.Item
            lines={2}
            leadingIcon="notifications"
            headline="Deploy alerts"
            supportingText="Push when a deploy fails"
            trailing={<Switch selected={alerts} onChange={setAlerts} label="Deploy alerts" />}
          />
          <List.Item
            lines={2}
            leadingIcon="science"
            headline="Beta channel"
            supportingText="Get builds before release"
            trailing={<Switch selected={beta} onChange={setBeta} label="Beta channel" />}
          />
        </List>
        <div className="flex flex-col gap-5 px-4 pt-3">
          <Select
            label="Default region"
            value={region}
            onChange={setRegion}
            fullWidth
            options={[
              { value: "iad", label: "Washington, DC" },
              { value: "fra", label: "Frankfurt" },
              { value: "syd", label: "Sydney" },
            ]}
          />
          <div className="flex flex-col gap-1.5">
            <Text as="span" variant="label-large">
              Alert threshold
            </Text>
            <Slider
              aria-label="Alert threshold"
              min={0}
              max={100}
              step={5}
              value={threshold}
              onChange={setThreshold}
              labeled
              format={(n) => n + "%"}
            />
            <Text
              as="span"
              variant="body-small"
              className="text-(--color-on-surface-variant)"
            >
              Notify when error rate passes {threshold}%.
            </Text>
          </div>
          <Card variant="outlined" className="p-4 gap-1">
            <Text as="span" variant="title-small" className="pb-1.5">
              Appearance
            </Text>
            {APPEARANCE.map(([v, l]) => (
              <Radio
                key={v}
                name="theme"
                value={v}
                checked={theme === v}
                onChange={() => setTheme(v)}
                label={l}
              />
            ))}
          </Card>
          <Button
            variant="tonal"
            icon="save"
            fullWidth
            onClick={() => onToast("Settings saved")}
          >
            Save changes
          </Button>
          <div className="h-6" />
        </div>
      </div>
    </>
  );
}
