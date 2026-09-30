"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { inputClass } from "@/components/ui/formStyles";

const LENGTH = 6;

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
}

export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = value.padEnd(LENGTH, " ").split("");

  function focusAt(index: number) {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  }

  function commit(next: string) {
    onChange(next);

    if (next.length === LENGTH) {
      onComplete?.(next);
    }
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);

    if (!digit) {
      commit(value.slice(0, index) + value.slice(index + 1));
      return;
    }

    commit(value.slice(0, index) + digit + value.slice(index + 1));

    if (index < LENGTH - 1) {
      focusAt(index + 1);
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      commit(value.slice(0, index - 1) + value.slice(index));
      focusAt(index - 1);
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusAt(index - 1);
      return;
    }

    if (event.key === "ArrowRight" && index < LENGTH - 1) {
      event.preventDefault();
      focusAt(index + 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH);

    if (!pasted) return;

    event.preventDefault();
    commit(pasted);
    focusAt(Math.min(pasted.length, LENGTH - 1));
  }

  return (
    <div className="flex gap-2">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          value={digit.trim()}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.currentTarget.select()}
          disabled={disabled}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Dígito ${index + 1} de ${LENGTH}`}
          className={`${inputClass} px-0 text-center text-title-md tabular-nums`}
        />
      ))}
    </div>
  );
}
