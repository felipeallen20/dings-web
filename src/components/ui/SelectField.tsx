import { ChevronDown } from "lucide-react";
import { Field } from "@/components/ui/TextField";

const selectClass =
  "h-12 w-full appearance-none rounded-lg border border-border bg-surface pr-11 pl-4 text-body-sm text-neutral transition-colors hover:bg-canvas-muted focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none disabled:cursor-not-allowed disabled:bg-canvas-muted disabled:text-text-secondary";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  optional?: boolean;
  disabled?: boolean;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  optional,
  disabled,
}: SelectFieldProps) {
  return (
    <Field id={id} label={label} optional={optional}>
      <div className="relative">
        <select
          id={id}
          aria-label={label}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={selectClass}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-text-secondary"
          aria-hidden
        />
      </div>
    </Field>
  );
}