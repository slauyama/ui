import { Button } from "../../../components/button/button";
import { Card } from "../../../components/card/card";
import { Chip } from "../../../components/chip/chip";
import { ChipSet } from "../../../components/chipSet/chipSet";
import { Divider } from "../../../components/divider/divider";
import { Heading } from "../../../components/heading/heading";
import { Icon } from "../../../components/icon/icon";
import { Text } from "../../../components/text/text";

interface Family {
  id: string;
  name: string;
  blurb: string;
  icon: string;
  tone: keyof typeof TONE_CLASSES;
}

const FAMILIES: Family[] = [
  {
    id: "button",
    name: "Button",
    blurb: "Five emphasis levels",
    icon: "smart_button",
    tone: "primary",
  },
  {
    id: "chip",
    name: "Chips",
    blurb: "Assist, filter, input",
    icon: "label",
    tone: "tertiary",
  },
  {
    id: "textfield",
    name: "Text field",
    blurb: "Filled and outlined",
    icon: "text_fields",
    tone: "secondary",
  },
  {
    id: "list",
    name: "List",
    blurb: "One to three lines",
    icon: "list",
    tone: "surface",
  },
  {
    id: "navigation",
    name: "Navigation",
    blurb: "Bar, rail, drawer",
    icon: "bottom_navigation",
    tone: "primary",
  },
];

// Literal classes, not built from a template string: Tailwind's scanner needs the whole class
// name in the source text, so `` `bg-(--color-${tone})` `` would never generate a rule.
const TONE_CLASSES = {
  primary: "bg-(--color-primary-container) text-(--color-on-primary-container)",
  secondary:
    "bg-(--color-secondary-container) text-(--color-on-secondary-container)",
  tertiary: "bg-(--color-tertiary-container) text-(--color-on-tertiary-container)",
  surface: "bg-(--color-surface-container-highest) text-(--color-on-surface)",
};

const SWATCH_CLASSES = [
  "bg-(--color-primary)",
  "bg-(--color-primary-container)",
  "bg-(--color-tertiary)",
  "bg-(--color-tertiary-container)",
  "bg-(--color-secondary)",
  "bg-(--color-secondary-container)",
  "bg-(--color-surface-container-highest)",
  "bg-(--color-surface-container-low)",
];

export interface HomeScreenProps {
  onOpen: (value: string) => void;
}

/** Catalog overview: hero, palette swatches, component index. Compare HomeScreen.jsx. */
export function HomeScreen({ onOpen }: HomeScreenProps) {
  return (
    <div className="flex flex-col gap-10">
      <section className="grid grid-cols-[1.2fr_1fr] gap-10 items-center pt-6">
        <div className="flex flex-col items-start gap-5">
          <Text as="span" variant="label-large" className="text-(--color-primary)">
            Design system 2.4.0
          </Text>
          <Heading as="h1" variant="display-large">
            One seed colour, every surface.
          </Heading>
          <Text
            as="p"
            variant="body-large"
            className="text-(--color-on-surface-variant) max-w-130"
          >
            Facet is a tonal design system built on the Material 3 model: six
            reference palettes, thirty semantic roles, and components that
            never hard-code a hex.
          </Text>
          <div className="flex gap-3 pt-1">
            <Button icon="rocket_launch" onClick={() => onOpen("button")}>
              Browse components
            </Button>
            <Button
              variant="outlined"
              icon="palette"
              onClick={() => onOpen("theming")}
            >
              Theming
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-4 auto-rows-[72px] gap-2">
          {SWATCH_CLASSES.map((cls) => (
            <div key={cls} className={`rounded-2xl ${cls}`} />
          ))}
          <div className="col-span-4 flex items-center px-5 rounded-2xl bg-(--color-inverse-surface) text-(--color-inverse-on-surface)">
            <Text as="span" variant="code">
              --color-primary: var(--ref-primary40);
            </Text>
          </div>
        </div>
      </section>
      <Divider />
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <Heading as="h2" variant="headline-medium">
            Components
          </Heading>
          <ChipSet>
            <Chip variant="filter" label="All" selected />
            <Chip variant="filter" label="Stable" />
          </ChipSet>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
          {FAMILIES.map((f) => (
            <Card
              key={f.id}
              variant="outlined"
              interactive
              className="p-5 gap-3"
              onClick={() => onOpen(f.id)}
            >
              <span
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${TONE_CLASSES[f.tone]}`}
              >
                <Icon name={f.icon} />
              </span>
              <Text as="span" variant="title-medium">
                {f.name}
              </Text>
              <Text
                as="span"
                variant="body-medium"
                className="text-(--color-on-surface-variant)"
              >
                {f.blurb}
              </Text>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
