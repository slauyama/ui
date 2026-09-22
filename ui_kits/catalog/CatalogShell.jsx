const {NavigationDrawer, TopAppBar, IconButton, SearchBar, Snackbar} = window.FacetDesignSystem_d4e8f5;

const NAV = [
  {heading: 'Get started'},
  {value: 'home', label: 'Overview', icon: 'home'},
  {value: 'theming', label: 'Theming', icon: 'palette'},
  {heading: 'Components'},
  {value: 'button', label: 'Button', icon: 'smart_button'},
  {value: 'chip', label: 'Chips', icon: 'label'},
  {value: 'textfield', label: 'Text field', icon: 'text_fields'},
  {value: 'list', label: 'List', icon: 'list'},
  {value: 'navigation', label: 'Navigation', icon: 'bottom_navigation'},
];

function CatalogShell() {
  const [page, setPage] = React.useState('home');
  const [dark, setDark] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);
  const go = (v) => { setPage(v); document.querySelector('.cat-main').scrollTop = 0; };
  return (
    <div className="cat-shell">
      <NavigationDrawer
        items={NAV}
        value={page}
        onChange={go}
        style={{background: 'transparent', width: 'auto'}}
        header={
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '20px 16px 12px'}}>
            <span style={{fontFamily: 'var(--fx-ref-typeface-brand)', fontWeight: 600, fontSize: 26, letterSpacing: '-1px'}}>Facet</span>
            <span className="fx-label-small" style={{padding: '2px 8px', borderRadius: 999, background: 'var(--fx-sys-color-tertiary-container)', color: 'var(--fx-sys-color-on-tertiary-container)'}}>v2.4.0</span>
          </div>
        }
      />
      <main className="cat-main">
        <div style={{position: 'sticky', top: 0, zIndex: 5, background: 'var(--fx-sys-color-surface)', padding: '12px 48px 12px 48px', display: 'flex', alignItems: 'center', gap: 16}}>
          <SearchBar placeholder="Search components, tokens, guidance" style={{maxWidth: 520}} />
          <span style={{flex: 1}} />
          <IconButton icon={dark ? 'light_mode' : 'dark_mode'} label="Toggle theme" variant="tonal" onClick={() => setDark(!dark)} />
          <IconButton icon="code" label="Source" onClick={() => setToast('Opens material-web on GitHub')} />
        </div>
        <div className="cat-pad">
          {page === 'home' ? <HomeScreen onOpen={go} /> : null}
          {page === 'theming' ? <ThemeScreen dark={dark} onDark={setDark} /> : null}
          {['button', 'chip', 'textfield', 'list', 'navigation'].includes(page) ? <ComponentScreen id={page} /> : null}
        </div>
        {toast ? (
          <div style={{position: 'fixed', left: 340, bottom: 24, zIndex: 40}}>
            <Snackbar message={toast} action="Dismiss" onAction={() => setToast(null)} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
Object.assign(window, {CatalogShell});
