import {
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  createContext,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";
import { useSelectionIndicator } from "../selectionIndicator/useSelectionIndicator";

type Direction = "forward" | "backward";

interface TabsContextValue {
  baseId: string;
  value?: string;
  direction?: Direction;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const SLIDE_FADE: Record<Direction, string> = {
  forward:
    "animate-[slide-fade-from-end_var(--motion-enter)] motion-reduce:animate-[fade_var(--motion-enter)]",
  backward:
    "animate-[slide-fade-from-start_var(--motion-enter)] motion-reduce:animate-[fade_var(--motion-enter)]",
};

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** The `value` of the tab this panel belongs to. */
  value: string;
}

function TabPanel({ value, className = "", children, ...rest }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.Panel must be rendered inside Tabs");
  if (ctx.value !== value) return null;
  return (
    <div
      key={value}
      role="tabpanel"
      id={`${ctx.baseId}-${value}-panel`}
      aria-labelledby={`${ctx.baseId}-${value}`}
      tabIndex={0}
      className={[
        "focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-(--color-secondary)",
        ctx.direction ? SLIDE_FADE[ctx.direction] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface TabDef {
  value: string;
  label: string;
  icon?: MaterialSymbol;
}

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  tabs: TabDef[];
  value?: string;
  onChange?: (value: string) => void;
  /** primary for top-level content, secondary for content within a tab. */
  variant?: "primary" | "secondary";
  /** When set, each tab gets id `{id}-{value}` and aria-controls `{id}-{value}-panel`. Tabs.Panel children use these ids; give your own panel that id. */
  id?: string;
  /** Tabs.Panel elements, rendered after the tablist. Only the selected one mounts. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const NEXT_INDEX: Record<string, (i: number, n: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

function TabsRoot({
  tabs = [],
  value,
  onChange,
  variant = "primary",
  id,
  children,
  className = "",
  style,
  ...rest
}: TabsProps) {
  const { containerRef, indicatorStyle, indicatorClassName } =
    useSelectionIndicator<HTMLDivElement>(value);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = tabs.findIndex((t) => t.value === value);
  const autoId = useId();
  const baseId = id || autoId;
  const tabIds = Boolean(id) || children != null;

  const [prevValue, setPrevValue] = useState(value);
  const [direction, setDirection] = useState<Direction>();
  if (value !== prevValue) {
    const prevIndex = tabs.findIndex((t) => t.value === prevValue);
    setPrevValue(value);
    setDirection(selectedIndex < prevIndex ? "backward" : "forward");
  }

  function moveSelection(e: KeyboardEvent, index: number) {
    const next = NEXT_INDEX[e.key]?.(index, tabs.length);
    if (next === undefined) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    onChange?.(tabs[next].value);
  }

  const tablist = (
    <div
      ref={containerRef}
      className={[
        "relative flex items-stretch gap-0 bg-(--color-surface) shadow-[inset_0_-1px_0_0_var(--color-surface-container-highest)] overflow-x-auto",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="tablist"
      id={id}
      style={style}
      {...rest}
    >
      {tabs.map((t, i) => {
        const on = t.value === value;
        const tabbable = on || (selectedIndex === -1 && i === 0);
        return (
          <button
            key={t.value}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={tabIds ? `${baseId}-${t.value}` : undefined}
            aria-controls={tabIds ? `${baseId}-${t.value}-panel` : undefined}
            aria-selected={on}
            tabIndex={tabbable ? 0 : -1}
            onKeyDown={(e) => moveSelection(e, i)}
            data-indicator-target={on || undefined}
            className={[
              "fx-reset fx-state relative inline-flex flex-1 items-center justify-center gap-2 min-w-20 h-12 px-4 border-none bg-transparent cursor-pointer whitespace-nowrap transition-colors",
              on
                ? variant === "secondary"
                  ? "text-(--color-on-surface)"
                  : "text-(--color-primary)"
                : "text-(--color-on-surface-variant)",
            ].join(" ")}
            onClick={() => onChange && onChange(t.value)}
          >
            {t.icon ? <Icon name={t.icon} size={24} filled={on} /> : null}
            <Text as="span" variant="title-small">
              {t.label}
            </Text>
          </button>
        );
      })}
      {indicatorStyle ? (
        <span
          aria-hidden="true"
          className={["flex items-end justify-center", indicatorClassName].join(
            " ",
          )}
          style={indicatorStyle}
        >
          <span
            className={
              variant === "secondary"
                ? "h-0.5 w-full bg-(--color-primary)"
                : "h-1 w-3/5 max-w-30 rounded-t-[3px] bg-(--color-primary)"
            }
          />
        </span>
      ) : null}
    </div>
  );

  if (children == null) return tablist;
  return (
    <TabsContext.Provider value={{ baseId, value, direction }}>
      {tablist}
      {children}
    </TabsContext.Provider>
  );
}

/** Primary (3px pill indicator) or secondary (2px full-width) tabs. Pass Tabs.Panel children and the selected one slides in from the side the selection moved towards. */
export const Tabs = Object.assign(TabsRoot, { Panel: TabPanel });
