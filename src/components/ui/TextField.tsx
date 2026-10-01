import type { ReactNode } from "react";
import { inputClass, optionalLabelClass } from "@/components/ui/formStyles";

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}

export function Field({ id, label, optional, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-label-lg text-neutral">
        {label}
        {optional && (
          <span className={optionalLabelClass}>(opcional)</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-body-sm text-text-secondary">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "number";
  optional?: boolean;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  maxLength?: number;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function TextField({
  id,
  label,
  name,
  type = "text",
  optional,
  required,
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  defaultValue,
  value,
  onChange,
  error,
  hint,
  disabled,
  className,
  children,
}: TextFieldProps) {
  return (
    <Field id={id} label={label} optional={optional} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        disabled={disabled}
        {...(value === undefined ? { defaultValue } : { value })}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? `${id}-hint` : undefined}
        className={
          className
            ? `${inputClass} ${className}`
            : `${inputClass} ${error ? "border-border-strong" : ""}`
        }
      />
      {hint && (
        <p id={`${id}-hint`} className="text-body-sm text-placeholder">
          {hint}
        </p>
      )}
      {children}
    </Field>
  );
}
