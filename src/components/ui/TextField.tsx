import type { ReactNode } from "react";
import { inputClass, optionalLabelClass } from "@/components/ui/formStyles";

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  children: ReactNode;
}

export function Field({ id, label, optional, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-label-lg text-neutral">
        {label}
        {optional && (
          <span className={optionalLabelClass}>(opcional)</span>
        )}
      </label>
      {children}
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
  className,
  children,
}: TextFieldProps) {
  return (
    <Field id={id} label={label} optional={optional}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        defaultValue={defaultValue}
        className={className ? `${inputClass} ${className}` : inputClass}
      />
      {children}
    </Field>
  );
}
