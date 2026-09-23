import { useEffect, useState } from "react";
import { IconButton } from "../../../components/iconButton/iconButton";
import type { DrawerEntry } from "../../../components/navigationDrawer/navigationDrawer";
import { NavigationDrawer } from "../../../components/navigationDrawer/navigationDrawer";
import { SearchBar } from "../../../components/searchBar/searchBar";
import { Snackbar } from "../../../components/snackbar/snackbar";
import { Text } from "../../../components/text/text";
import { ComponentScreen } from "./ComponentScreen";
import { HomeScreen } from "./HomeScreen";
import { ThemeScreen } from "./ThemeScreen";

const NAV: DrawerEntry[] = [
  { heading: "Get started" },
  { value: "home", label: "Overview", icon: "home" },
  { value: "theming", label: "Theming", icon: "palette" },
  { heading: "Components" },
  { value: "button", label: "Button", icon: "touch_app" },
  { value: "chip", label: "Chips", icon: "label" },
  { value: "textfield", label: "Text field", icon: "text_fields" },
  { value: "list", label: "List", icon: "list" },
  { value: "navigation", label: "Navigation", icon: "bottom_navigation" },
];

const COMPONENT_PAGES = ["button", "chip", "textfield", "list", "navigation"];

/**
 * Documentation-site shell composed of this library's own components and tokens: nav drawer,
 * sticky search row, theme toggle. Compare with ../CatalogShell.jsx, the Facet original this
 * composition follows (that version runs Facet's own `_ds_bundle.js` in-browser; this one is a
 * real .tsx import of the package).
 */
export function CatalogShell() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  function go(value: string) {
    setPage(value);
    document.querySelector(".cat-main")?.scrollTo({ top: 0 });
  }

  return (
    <div className="grid grid-cols-[360px_1fr] h-screen">
      <NavigationDrawer
        items={NAV}
        value={page}
        onChange={go}
        header={
          <div className="flex items-center gap-2.5 px-4 pt-5 pb-3">
            <span className="[font-family:var(--typescale-display-hero-font)] text-2xl font-semibold tracking-[-1px]">
              Facet
            </span>
            <Text
              as="span"
              variant="label-small"
              className="px-2 py-0.5 rounded-full bg-(--color-tertiary-container) text-(--color-on-tertiary-container)"
            >
              v2.4.0
            </Text>
          </div>
        }
      />
      <main className="cat-main relative rounded-s-(--shape-corner-extra-large) bg-(--color-surface) overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center gap-4 bg-(--color-surface) px-12 py-3">
          <SearchBar
            placeholder="Search components, tokens, guidance"
            className="max-w-130"
          />
          <span className="flex-1" />
          <IconButton
            icon={dark ? "light_mode" : "dark_mode"}
            label="Toggle theme"
            variant="tonal"
            onClick={() => setDark(!dark)}
          />
          <IconButton
            icon="code"
            label="Source"
            onClick={() => setToast("Opens material-web on GitHub")}
          />
        </div>
        <div className="px-12 pt-7 pb-20">
          {page === "home" ? <HomeScreen onOpen={go} /> : null}
          {page === "theming" ? (
            <ThemeScreen dark={dark} onDark={setDark} />
          ) : null}
          {COMPONENT_PAGES.includes(page) ? (
            <ComponentScreen id={page} />
          ) : null}
        </div>
        {toast ? (
          <div className="fixed left-[380px] bottom-6 z-40">
            <Snackbar
              message={toast}
              action="Dismiss"
              onAction={() => setToast(null)}
            />
          </div>
        ) : null}
      </main>
    </div>
  );
}
