import {
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useRef,
  useState,
} from "react";
import { Text } from "../text/text";

/** Continuous or stepped slider, 4px track with a 20px handle. */
export interface SliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  /** Show the value bubble while dragging. */
  labeled?: boolean;
  disabled?: boolean;
  /** Formats the bubble value, e.g. (v) => v + '%'. */
  format?: (value: number) => string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Continuous or stepped slider with an optional value bubble. Drag or click the track, or focus it
 * and use the arrow keys (one step), Page Up/Down (ten steps), Home and End.
 */
export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  labeled = false,
  disabled = false,
  format,
  className = "",
  style,
  ...rest
}: SliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;
  function emit(next: number) {
    onChange?.(Math.min(max, Math.max(min, Number(next.toFixed(4)))));
  }
  function setFromEvent(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const raw = min + ((clientX - r.left) / r.width) * (max - min);
    emit(min + Math.round((raw - min) / step) * step);
  }
  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (disabled || e.altKey || e.ctrlKey || e.metaKey) return;
    const moves: Record<string, number> = {
      ArrowRight: value + step,
      ArrowUp: value + step,
      ArrowLeft: value - step,
      ArrowDown: value - step,
      PageUp: value + step * 10,
      PageDown: value - step * 10,
      Home: min,
      End: max,
    };
    const next = moves[e.key];
    if (typeof next !== "number") return;
    e.preventDefault();
    emit(next);
  }
  return (
    <div
      ref={ref}
      className={[
        "relative flex items-center h-10 w-full min-w-40 touch-none",
        disabled ? "opacity-[0.38] pointer-events-none" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={format ? format(value) : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKeyDown}
      onPointerDown={(e: ReactPointerEvent<HTMLDivElement>) => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromEvent(e.clientX);
      }}
      onPointerMove={(e: ReactPointerEvent<HTMLDivElement>) =>
        dragging && setFromEvent(e.clientX)
      }
      onPointerUp={() => setDragging(false)}
      style={style}
      {...rest}
    >
      <div className="relative w-full h-1 rounded-full bg-(--color-surface-container-highest) overflow-visible">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-(--color-primary)"
          style={{ width: pct + "%" }}
        />
        <div
          className="absolute top-1/2 w-5 h-5 rounded-full bg-(--color-primary) -translate-x-1/2 -translate-y-1/2 shadow-(--elevation-level1) transition-shadow"
          style={{ left: pct + "%" }}
        >
          {labeled && dragging ? (
            <Text
              as="span"
              variant="label-medium"
              className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-(--color-primary) text-(--color-on-primary) whitespace-nowrap"
            >
              {format ? format(value) : value}
            </Text>
          ) : null}
        </div>
      </div>
    </div>
  );
}
