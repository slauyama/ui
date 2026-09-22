import { useState } from "react";
import { Button } from "../../../components/button/button";
import { Card } from "../../../components/card/card";
import { Checkbox } from "../../../components/checkbox/checkbox";
import { Divider } from "../../../components/divider/divider";
import { Heading } from "../../../components/heading/heading";
import { SegmentedButton } from "../../../components/segmentedButton/segmentedButton";
import { Select } from "../../../components/select/select";
import { Slider } from "../../../components/slider/slider";
import { Switch } from "../../../components/switch/switch";
import { Text } from "../../../components/text/text";

const SEEDS = [
  { name: "Ember", hex: "#b43500" },
  { name: "Teal", hex: "#006a66" },
  { name: "Clay", hex: "#77584b" },
  { name: "Error", hex: "#b3261e" },
];

export interface ThemeScreenProps {
  dark: boolean;
  onDark: (dark: boolean) => void;
}

/** Theming page: seed swatches, a live control panel. Compare ThemeScreen.jsx. */
export function ThemeScreen({ dark, onDark }: ThemeScreenProps) {
  const [density, setDensity] = useState("default");
  const [contrast, setContrast] = useState(0);
  const [checked, setChecked] = useState(true);

  return (
    <div className="grid grid-cols-[1fr_360px] gap-10 max-w-275 mx-auto pt-3">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <Text as="span" variant="label-large" className="text-(--color-primary)">
            Get started
          </Text>
          <Heading as="h1" variant="display-small">
            Theming
          </Heading>
          <Text
            as="p"
            variant="body-large"
            className="text-(--color-on-surface-variant) max-w-155"
          >
            A theme is six tonal palettes. Swap the seed and every role,
            state layer and shadow follows; no component changes.
          </Text>
        </header>
        <div className="grid grid-cols-4 gap-3">
          {SEEDS.map((s) => (
            <Card key={s.name} variant="filled" interactive className="p-4 gap-3">
              <div className="h-16 rounded-xl" style={{ background: s.hex }} />
              <div className="flex flex-col">
                <Text as="span" variant="title-medium">
                  {s.name}
                </Text>
                <Text
                  as="span"
                  variant="code"
                  className="text-(--color-on-surface-variant)"
                >
                  {s.hex}
                </Text>
              </div>
            </Card>
          ))}
        </div>
        <Divider />
        <pre className="m-0 p-5 rounded-(--shape-corner-large) bg-(--color-surface-container-high) overflow-x-auto">
          <Text as="span" variant="code">
            {":root {\n  --ref-primary40: #b43500;\n  --color-primary: var(--ref-primary40);\n}"}
          </Text>
        </pre>
      </div>
      <Card variant="outlined" className="p-6 gap-5 h-fit">
        <Heading as="h2" variant="title-large" className="m-0">
          Preview
        </Heading>
        <div className="flex items-center justify-between">
          <Text as="span" variant="body-medium">
            Dark theme
          </Text>
          <Switch selected={dark} onChange={onDark} icons label="Dark theme" />
        </div>
        <div className="flex flex-col gap-2.5">
          <Text as="span" variant="label-large">
            Density
          </Text>
          <SegmentedButton
            value={density}
            onChange={(v) => setDensity(v as string)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "default", label: "Default" },
              { value: "roomy", label: "Roomy" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Text as="span" variant="label-large">
            Contrast
          </Text>
          <Slider
            aria-label="Contrast"
            min={-1}
            max={1}
            step={1}
            value={contrast}
            onChange={setContrast}
            labeled
          />
        </div>
        <Select
          label="Icon style"
          value="rounded"
          onChange={() => {}}
          options={[
            { value: "rounded", label: "Rounded" },
            { value: "outlined", label: "Outlined" },
            { value: "sharp", label: "Sharp" },
          ]}
          fullWidth
        />
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label="Emit CSS custom properties"
        />
        <Divider />
        <div className="flex gap-2">
          <Button variant="text">Reset</Button>
          <Button icon="download" fullWidth>
            Export theme
          </Button>
        </div>
      </Card>
    </div>
  );
}
