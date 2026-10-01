"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Session } from "@/types/auth";
import { Card } from "@/components/ui/Card";
import { TextField } from "@/components/ui/TextField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

interface PersonalDataFormProps {
  session: Session;
}

export function PersonalDataForm({ session }: PersonalDataFormProps) {
  const [name, setName] = useState(session.name);
  const [phone, setPhone] = useState("+57 310 555 0142");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [savedName, setSavedName] = useState(session.name);
  const [savedPhone, setSavedPhone] = useState("+57 310 555 0142");
  const [hasSaved, setHasSaved] = useState(false);

  const isDirty = name !== savedName || phone !== savedPhone;

  function handleSubmit() {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setPhoneError("Ingresa un número de 10 dígitos.");
      return;
    }

    setPhoneError(null);
    setSavedName(name);
    setSavedPhone(phone);
    setHasSaved(true);
  }

  return (
    <Card
      title="Datos personales"
      description="Así te reconocemos cuando pidas y te contactemos."
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-4 sm:gap-5"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <TextField
            id="profile-name"
            name="name"
            label="Nombre completo"
            value={name}
            onChange={setName}
            autoComplete="name"
            maxLength={60}
          />

          <TextField
            id="profile-phone"
            name="phone"
            label="Teléfono"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={setPhone}
            error={phoneError ?? undefined}
            hint="Solo lo usamos para avisos del pedido."
          />
        </div>

        <TextField
          id="profile-email"
          name="email"
          label="Correo"
          type="email"
          defaultValue={session.email}
          disabled
          hint="Para cambiarlo escribe a soporte@dings.co."
        />

        <div className="flex items-center gap-3">
          <PrimaryButton type="submit" disabled={!isDirty}>
            Guardar cambios
          </PrimaryButton>

          {hasSaved && !isDirty && (
            <span
              role="status"
              className="flex items-center gap-1.5 text-caption text-tertiary-strong sm:text-body-sm"
            >
              <Check className="size-3.5 shrink-0" aria-hidden />
              Cambios guardados
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}