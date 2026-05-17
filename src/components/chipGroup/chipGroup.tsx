import { Chip } from "../chip/chip";

type ChipOption = string | { value: string; label: string };

interface ChipGroupProps {
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ChipGroup({ options, value, onChange, className = "" }: ChipGroupProps) {
  return (
    <div className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}>
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <Chip key={val} active={value === val} onClick={() => onChange(val)}>
            {label}
          </Chip>
        );
      })}
    </div>
  );
}
