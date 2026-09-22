import { ReactNode, useState } from "react";
import { Button } from "../../../components/button/button";
import { Card } from "../../../components/card/card";
import { Chip } from "../../../components/chip/chip";
import { ChipSet } from "../../../components/chipSet/chipSet";
import { Divider } from "../../../components/divider/divider";
import { Fab } from "../../../components/fab/fab";
import { Heading } from "../../../components/heading/heading";
import { IconButton } from "../../../components/iconButton/iconButton";
import { List } from "../../../components/list/list";
import { NavigationBar } from "../../../components/navigationBar/navigationBar";
import { Table } from "../../../components/table/table";
import { Tabs } from "../../../components/tabs/tabs";
import { Text } from "../../../components/text/text";
import { TextField } from "../../../components/textField/textField";

interface Doc {
  title: string;
  blurb: string;
  /** [prop, type, default] rows for the API tab. */
  rows: [string, string, string][];
  code: string;
}

const DOCS: Record<string, Doc> = {
  button: {
    title: "Button",
    blurb:
      "Buttons prompt most actions in a UI. Facet ships five, ordered by emphasis; only one filled button belongs on a screen.",
    rows: [
      ["variant", "'filled' | 'tonal' | 'elevated' | 'outlined' | 'text'", "'filled'"],
      ["icon", "string", "undefined"],
      ["disabled", "boolean", "false"],
      ["href", "string", "undefined"],
    ],
    code: '<Button variant="filled" icon="add">New project</Button>\n<Button variant="outlined">Cancel</Button>',
  },
  chip: {
    title: "Chips",
    blurb:
      "Chips are compact, 32px tall, and always sit in a ChipSet. Filter chips swap their leading glyph for a check when selected.",
    rows: [
      ["variant", "'assist' | 'filter' | 'input' | 'suggestion'", "'assist'"],
      ["selected", "boolean", "false"],
      ["elevated", "boolean", "false"],
      ["onRemove", "() => void", "undefined"],
    ],
    code: '<ChipSet>\n  <Chip variant="filter" label="Unread" selected />\n  <Chip variant="input" label="ada@facet.dev" onRemove={remove} />\n</ChipSet>',
  },
  textfield: {
    title: "Text field",
    blurb:
      "Text fields are 56px tall with a label that floats to 12px on focus or value. Filled is the default; outlined earns its keep on busy surfaces.",
    rows: [
      ["variant", "'filled' | 'outlined'", "'filled'"],
      ["label", "string", "undefined"],
      ["supportingText", "string", "undefined"],
      ["error", "boolean", "false"],
    ],
    code: '<TextField label="Project name" supportingText="Visible to your team" />',
  },
  list: {
    title: "List",
    blurb:
      "Rows are 56, 72 or 88px tall by line count. Selected rows fill with secondary-container, never primary.",
    rows: [
      ["lines", "1 | 2 | 3", "1"],
      ["leadingIcon", "string", "undefined"],
      ["trailingText", "string", "undefined"],
      ["selected", "boolean", "false"],
    ],
    code: '<List>\n  <List.Item lines={2} headline="Design tokens" supportingText="Updated 2 hours ago" />\n</List>',
  },
  navigation: {
    title: "Navigation",
    blurb:
      "One destination pattern per width: bar under 600, rail to 1240, drawer above. The selected destination fills its glyph and gains a tonal pill.",
    rows: [
      ["items", "NavItem[]", "required"],
      ["value", "string", "undefined"],
      ["onChange", "(value) => void", "undefined"],
    ],
    code: "<NavigationBar items={destinations} value={page} onChange={setPage} />",
  },
};

function figureFor(id: string): ReactNode {
  switch (id) {
    case "button":
      return (
        <>
          <Button icon="add">New project</Button>
          <Button variant="tonal">Duplicate</Button>
          <Button variant="elevated">Export</Button>
          <Button variant="outlined">Cancel</Button>
          <Button variant="text">Docs</Button>
        </>
      );
    case "chip":
      return (
        <ChipSet>
          <Chip variant="assist" icon="bolt" label="Run build" />
          <Chip variant="filter" label="Unread" selected />
          <Chip
            variant="input"
            label="ada@facet.dev"
            icon="person"
            onRemove={() => {}}
          />
          <Chip variant="suggestion" label="Add a reviewer" />
        </ChipSet>
      );
    case "textfield":
      return (
        <>
          <TextField label="Project name" defaultValue="Aurora" />
          <TextField variant="outlined" label="Email" leadingIcon="mail" />
        </>
      );
    case "list":
      return (
        <Card variant="outlined" style={{ width: 420 }}>
          <List>
            <List.Item
              lines={2}
              leadingIcon="folder"
              headline="Design tokens"
              supportingText="Updated 2 hours ago"
              trailingText="12"
              onClick={() => {}}
            />
            <Divider insetStart />
            <List.Item
              lines={2}
              leadingIcon="bolt"
              headline="Edge runtime"
              supportingText="Selected row"
              selected
              onClick={() => {}}
            />
          </List>
        </Card>
      );
    default:
      return (
        <>
          <div className="w-95 rounded-2xl overflow-hidden border border-(--color-outline-variant)">
            <NavigationBar
              value="home"
              items={[
                { value: "home", label: "Home", icon: "home" },
                { value: "builds", label: "Builds", icon: "deployed_code", badge: "4" },
                { value: "logs", label: "Logs", icon: "terminal" },
                { value: "you", label: "You", icon: "person" },
              ]}
            />
          </div>
          <Fab icon="add" color="tertiary" />
        </>
      );
  }
}

const TOKENS_BY_ID: Record<string, string> = {
  button:
    "--typescale-label-large\n--shape-button\n--state-hover-opacity\n--elevation-level1",
  chip: "--shape-chip\n--typescale-label-large\n--color-secondary-container",
  textfield: "--shape-field\n--shape-field-outlined\n--color-error",
  list: "--typescale-body-large\n--typescale-body-medium\n--color-secondary-container",
  navigation: "--shape-corner-full\n--color-secondary-container\n--typescale-label-medium",
};

/** Docs page: header, usage/API/tokens tabs, live figure. Compare ComponentScreen.jsx. */
export function ComponentScreen({ id }: { id: string }) {
  const d = DOCS[id];
  const [tab, setTab] = useState("usage");
  return (
    <article className="flex flex-col gap-7 max-w-245 mx-auto">
      <header className="flex flex-col gap-3 pt-3">
        <Text as="span" variant="label-large" className="text-(--color-primary)">
          Components
        </Text>
        <Heading as="h1" variant="display-small">
          {d.title}
        </Heading>
        <Text
          as="p"
          variant="body-large"
          className="text-(--color-on-surface-variant) max-w-170"
        >
          {d.blurb}
        </Text>
      </header>
      <Tabs
        variant="secondary"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "usage", label: "Usage" },
          { value: "api", label: "API" },
          { value: "tokens", label: "Tokens" },
        ]}
      />
      {tab === "usage" ? (
        <>
          <div className="flex items-center justify-center gap-4 flex-wrap min-h-35 p-7 rounded-(--shape-corner-large) border border-(--color-outline)">
            {figureFor(id)}
          </div>
          <pre className="m-0 p-5 rounded-(--shape-corner-large) bg-(--color-surface-container-high) overflow-x-auto">
            <Text as="span" variant="code">
              {d.code}
            </Text>
          </pre>
        </>
      ) : null}
      {tab === "api" ? (
        <Table bordered={false}>
          <Table.Header>
            <Table.Row>
              <Table.Head>Prop</Table.Head>
              <Table.Head>Type</Table.Head>
              <Table.Head>Default</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {d.rows.map((r) => (
              <Table.Row key={r[0]}>
                <Table.Cell>
                  <Text as="span" variant="code">
                    {r[0]}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text
                    as="span"
                    variant="code"
                    className="text-(--color-on-surface-variant)"
                  >
                    {r[1]}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text as="span" variant="code">
                    {r[2]}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : null}
      {tab === "tokens" ? (
        <pre className="m-0 p-5 rounded-(--shape-corner-large) bg-(--color-surface-container-high) overflow-x-auto">
          <Text as="span" variant="code">
            {TOKENS_BY_ID[id]}
          </Text>
        </pre>
      ) : null}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-(--color-secondary-container) text-(--color-on-secondary-container)">
        <IconButton icon="info" label="Note" />
        <Text as="span" variant="body-medium">
          Every value above resolves to a token. If you are reaching for a
          hex, the system is missing a role.
        </Text>
      </div>
    </article>
  );
}
