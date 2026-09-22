const {Card, Button, Chip, ChipSet, Icon, Divider} = window.FacetDesignSystem_d4e8f5;

const FAMILIES = [
  {id: 'button', name: 'Button', blurb: 'Five emphasis levels', icon: 'smart_button', tone: 'primary-container'},
  {id: 'chip', name: 'Chips', blurb: 'Assist, filter, input', icon: 'label', tone: 'tertiary-container'},
  {id: 'textfield', name: 'Text field', blurb: 'Filled and outlined', icon: 'text_fields', tone: 'secondary-container'},
  {id: 'list', name: 'List', blurb: 'One to three lines', icon: 'list', tone: 'surface-container-high'},
  {id: 'navigation', name: 'Navigation', blurb: 'Bar, rail, drawer', icon: 'bottom_navigation', tone: 'primary-container'},
  {id: 'button', name: 'Dialog', blurb: 'Decision points', icon: 'chat_bubble', tone: 'tertiary-container'},
];

function HomeScreen({onOpen}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 40}}>
      <section style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center', paddingTop: 24}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start'}}>
          <span className="fx-label-large" style={{color: 'var(--fx-sys-color-primary)'}}>Design system 2.4.0</span>
          <h1 className="fx-display-large" style={{margin: 0}}>One seed colour, every surface.</h1>
          <p className="fx-body-large" style={{margin: 0, color: 'var(--fx-sys-color-on-surface-variant)', maxWidth: 520}}>
            Facet is a tonal design system built on the Material 3 model: six reference palettes, thirty semantic roles, and components that never hard-code a hex.
          </p>
          <div style={{display: 'flex', gap: 12, paddingTop: 4}}>
            <Button variant="filled" icon="rocket_launch" onClick={() => onOpen('button')}>Browse components</Button>
            <Button variant="outlined" icon="palette" onClick={() => onOpen('theming')}>Theming</Button>
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridAutoRows: '72px', gap: 8}}>
          {['primary','primary-container','tertiary','tertiary-container','secondary','secondary-container','surface-container-highest','surface-container-low'].map((t) => (
            <div key={t} style={{background: 'var(--fx-sys-color-' + t + ')', borderRadius: 16}} />
          ))}
          <div style={{gridColumn: 'span 4', background: 'var(--fx-sys-color-inverse-surface)', color: 'var(--fx-sys-color-inverse-on-surface)', borderRadius: 16, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: 'var(--fx-ref-typeface-mono)', fontSize: 12}}>
            --fx-ref-primary40: #b43500;
          </div>
        </div>
      </section>
      <Divider />
      <section style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
          <h2 className="fx-headline-medium" style={{margin: 0}}>Components</h2>
          <ChipSet>
            <Chip variant="filter" label="All" selected />
            <Chip variant="filter" label="Actions" />
            <Chip variant="filter" label="Forms" />
            <Chip variant="filter" label="Navigation" />
          </ChipSet>
        </div>
        <div className="cat-grid">
          {FAMILIES.map((c, i) => (
            <Card key={i} variant="outlined" interactive onClick={() => onOpen(c.id)}>
              <div style={{height: 130, background: 'var(--fx-sys-color-' + c.tone + ')', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={c.icon} size={44} />
              </div>
              <div style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 2}}>
                <span className="fx-title-medium">{c.name}</span>
                <span className="fx-body-small" style={{color: 'var(--fx-sys-color-on-surface-variant)'}}>{c.blurb}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
Object.assign(window, {HomeScreen});
