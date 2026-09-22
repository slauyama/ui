const {Switch, Slider, SegmentedButton, Card, Button, Divider, Select, Checkbox} = window.FacetDesignSystem_d4e8f5;

const SEEDS = [
  {name: 'Ember', hex: '#b43500', role: 'primary'},
  {name: 'Teal', hex: '#006a66', role: 'tertiary'},
  {name: 'Clay', hex: '#77584b', role: 'secondary'},
  {name: 'Error', hex: '#b3261e', role: 'error'},
];

function ThemeScreen({dark, onDark}) {
  const [density, setDensity] = React.useState('default');
  const [contrast, setContrast] = React.useState(0);
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, maxWidth: 1100, margin: '0 auto', paddingTop: 12}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
        <header style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <span className="fx-label-large" style={{color: 'var(--fx-sys-color-primary)'}}>Get started</span>
          <h1 className="fx-display-small" style={{margin: 0}}>Theming</h1>
          <p className="fx-body-large" style={{margin: 0, color: 'var(--fx-sys-color-on-surface-variant)', maxWidth: 620}}>
            A theme is six tonal palettes. Swap the seed and every role, state layer and shadow follows; no component changes.
          </p>
        </header>
        <div className="cat-swatchgrid">
          {SEEDS.map((s) => (
            <Card key={s.name} variant="filled" interactive style={{padding: 16, gap: 12}}>
              <div style={{height: 64, borderRadius: 12, background: s.hex}} />
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span className="fx-title-medium">{s.name}</span>
                <span className="fx-body-small" style={{color: 'var(--fx-sys-color-on-surface-variant)', fontFamily: 'var(--fx-ref-typeface-mono)'}}>{s.hex}</span>
              </div>
            </Card>
          ))}
        </div>
        <Divider />
        <div className="cat-code">{':root {\n  --fx-ref-primary40: #b43500;\n  --fx-sys-color-primary: var(--fx-ref-primary40);\n}'}</div>
      </div>
      <Card variant="outlined" style={{padding: 24, gap: 20, height: 'fit-content'}}>
        <span className="fx-title-large">Preview</span>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <span className="fx-body-medium">Dark theme</span>
          <Switch selected={dark} onChange={onDark} icons />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <span className="fx-label-large">Density</span>
          <SegmentedButton value={density} onChange={setDensity} options={[{value: 'compact', label: 'Compact'}, {value: 'default', label: 'Default'}, {value: 'roomy', label: 'Roomy'}]} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <span className="fx-label-large">Contrast</span>
          <Slider min={-1} max={1} step={1} value={contrast} onChange={setContrast} labeled />
        </div>
        <Select label="Icon style" value="rounded" options={[{value: 'rounded', label: 'Rounded'}, {value: 'outlined', label: 'Outlined'}, {value: 'sharp', label: 'Sharp'}]} fullWidth />
        <Checkbox checked label="Emit CSS custom properties" onChange={() => {}} />
        <Divider />
        <div style={{display: 'flex', gap: 8}}>
          <Button variant="text">Reset</Button>
          <Button variant="filled" icon="download" fullWidth>Export theme</Button>
        </div>
      </Card>
    </div>
  );
}
Object.assign(window, {ThemeScreen});
