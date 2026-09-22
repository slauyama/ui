const {Tabs, Button, Chip, ChipSet, TextField, List, ListItem, Divider, NavigationBar, IconButton, Fab, Card} = window.FacetDesignSystem_d4e8f5;

const DOCS = {
  button: {
    title: 'Button',
    blurb: 'Buttons prompt most actions in a UI. Facet ships five, ordered by emphasis; only one filled button belongs on a screen.',
    rows: [['variant', "'filled' | 'tonal' | 'elevated' | 'outlined' | 'text'", "'filled'"], ['icon', 'string', 'undefined'], ['disabled', 'boolean', 'false'], ['href', 'string', 'undefined']],
    code: '<Button variant="filled" icon="add">New project</Button>\n<Button variant="outlined">Cancel</Button>',
  },
  chip: {
    title: 'Chips',
    blurb: 'Chips are compact, 32px tall, and always sit in a ChipSet. Filter chips swap their leading glyph for a check when selected.',
    rows: [['variant', "'assist' | 'filter' | 'input' | 'suggestion'", "'assist'"], ['selected', 'boolean', 'false'], ['elevated', 'boolean', 'false'], ['onRemove', '() => void', 'undefined']],
    code: '<ChipSet>\n  <Chip variant="filter" label="Unread" selected />\n  <Chip variant="input" label="ada@facet.dev" onRemove={remove} />\n</ChipSet>',
  },
  textfield: {
    title: 'Text field',
    blurb: 'Text fields are 56px tall with a label that floats to 12px on focus or value. Filled is the default; outlined earns its keep on busy surfaces.',
    rows: [['variant', "'filled' | 'outlined'", "'filled'"], ['label', 'string', 'undefined'], ['supportingText', 'string', 'undefined'], ['error', 'boolean', 'false']],
    code: '<TextField label="Project name" supportingText="Visible to your team" />',
  },
  list: {
    title: 'List',
    blurb: 'Rows are 56, 72 or 88px tall by line count. Selected rows fill with secondary-container, never primary.',
    rows: [['lines', '1 | 2 | 3', '1'], ['leadingIcon', 'string', 'undefined'], ['trailingText', 'string', 'undefined'], ['selected', 'boolean', 'false']],
    code: '<List>\n  <ListItem lines={2} headline="Design tokens" supportingText="Updated 2 hours ago" />\n</List>',
  },
  navigation: {
    title: 'Navigation',
    blurb: 'One destination pattern per width: bar under 600, rail to 1240, drawer above. The selected destination fills its glyph and gains a tonal pill.',
    rows: [['items', 'NavItem[]', 'required'], ['value', 'string', 'undefined'], ['onChange', '(value) => void', 'undefined']],
    code: '<NavigationBar items={destinations} value={page} onChange={setPage} />',
  },
};

function Figure({id}) {
  const {Chip: C} = window.FacetDesignSystem_d4e8f5;
  if (id === 'button') return <div className="cat-figure"><Button variant="filled" icon="add">New project</Button><Button variant="tonal">Duplicate</Button><Button variant="elevated">Export</Button><Button variant="outlined">Cancel</Button><Button variant="text">Docs</Button></div>;
  if (id === 'chip') return <div className="cat-figure"><ChipSet><C variant="assist" icon="bolt" label="Run build" /><C variant="filter" label="Unread" selected /><C variant="input" label="ada@facet.dev" icon="person" onRemove={() => {}} /><C variant="suggestion" label="Add a reviewer" /></ChipSet></div>;
  if (id === 'textfield') return <div className="cat-figure"><TextField label="Project name" defaultValue="Aurora" /><TextField variant="outlined" label="Email" leadingIcon="mail" /></div>;
  if (id === 'list') return <div className="cat-figure"><Card variant="outlined" style={{width: 420}}><List><ListItem lines={2} leadingIcon="folder" headline="Design tokens" supportingText="Updated 2 hours ago" trailingText="12" onClick={() => {}} /><Divider insetStart /><ListItem lines={2} leadingIcon="bolt" headline="Edge runtime" supportingText="Selected row" selected onClick={() => {}} /></List></Card></div>;
  return <div className="cat-figure"><div style={{width: 380, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--fx-sys-color-outline-variant)'}}><NavigationBar value="home" items={[{value:'home',label:'Home',icon:'home'},{value:'builds',label:'Builds',icon:'deployed_code',badge:'4'},{value:'logs',label:'Logs',icon:'terminal'},{value:'you',label:'You',icon:'person'}]} /></div><Fab icon="add" color="tertiary" /></div>;
}

function ComponentScreen({id}) {
  const d = DOCS[id];
  const [tab, setTab] = React.useState('usage');
  return (
    <article style={{display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 980, margin: '0 auto'}}>
      <header style={{display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 12}}>
        <span className="fx-label-large" style={{color: 'var(--fx-sys-color-primary)'}}>Components</span>
        <h1 className="fx-display-small" style={{margin: 0}}>{d.title}</h1>
        <p className="fx-body-large" style={{margin: 0, color: 'var(--fx-sys-color-on-surface-variant)', maxWidth: 680}}>{d.blurb}</p>
      </header>
      <Tabs variant="secondary" value={tab} onChange={setTab} tabs={[{value: 'usage', label: 'Usage'}, {value: 'api', label: 'API'}, {value: 'tokens', label: 'Tokens'}]} />
      {tab === 'usage' ? (
        <React.Fragment>
          <Figure id={id} />
          <div className="cat-code">{d.code}</div>
        </React.Fragment>
      ) : null}
      {tab === 'api' ? (
        <table className="cat-table">
          <tbody>
            <tr><th>Prop</th><th>Type</th><th>Default</th></tr>
            {d.rows.map((r) => (
              <tr key={r[0]}><td style={{fontFamily: 'var(--fx-ref-typeface-mono)'}}>{r[0]}</td><td style={{color: 'var(--fx-sys-color-on-surface-variant)', fontFamily: 'var(--fx-ref-typeface-mono)', fontSize: 13}}>{r[1]}</td><td style={{fontFamily: 'var(--fx-ref-typeface-mono)', fontSize: 13}}>{r[2]}</td></tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {tab === 'tokens' ? (
        <div className="cat-code">{'--fx-sys-color-primary\n--fx-sys-shape-corner-full\n--fx-sys-typescale-label-large-size\n--fx-sys-state-hover-opacity'}</div>
      ) : null}
      <div style={{display: 'flex', gap: 12, alignItems: 'center', padding: 16, borderRadius: 16, background: 'var(--fx-sys-color-secondary-container)', color: 'var(--fx-sys-color-on-secondary-container)'}}>
        <IconButton icon="info" label="Note" />
        <span className="fx-body-medium">Every value above resolves to a token. If you are reaching for a hex, the system is missing a role.</span>
      </div>
    </article>
  );
}
Object.assign(window, {ComponentScreen, Figure});
