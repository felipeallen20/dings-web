"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown, CircleCheck } from "lucide-react";
import { submitRestaurantInterest } from "@/services/restaurantInterest";
import type { DeliveryMode, RestaurantInterest } from "@/types/restaurant-interest";
import { Field, TextField } from "@/components/ui/TextField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  checkboxClass,
  inputClass,
  optionalLabelClass,
} from "@/components/ui/formStyles";

const CUISINES = [
  "Hamburguesas",
  "Pizza",
  "Sushi",
  "Comida mexicana",
  "Comida asiática",
  "Ensaladas",
  "Sándwiches",
  "Pastas",
  "Parrilla",
  "Comida casera",
  "Postres",
  "Café y panadería",
  "Otro",
];

const DELIVERY_OPTIONS: { value: DeliveryMode; label: string }[] = [
  { value: "propio", label: "Con mi propio domiciliario" },
  { value: "recogida", label: "El cliente recoge" },
  { value: "por-definir", label: "Aún no lo tengo definido" },
];

const pillClass =
  "inline-flex h-9 items-center rounded-full border border-border bg-surface px-4 text-label-lg text-text-secondary transition-colors hover:border-border-strong hover:bg-canvas-muted peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2";

type Status = "idle" | "submitting" | "done";

export function PreregistroForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [confirmation, setConfirmation] = useState<{
    restaurantName: string;
    email: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload: RestaurantInterest = {
      restaurantName: String(data.get("restaurantName") ?? "").trim(),
      contactName: String(data.get("contactName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      cuisine: String(data.get("cuisine") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      deliveryMode: String(
        data.get("deliveryMode") ?? "por-definir",
      ) as DeliveryMode,
      dishesCount: String(data.get("dishesCount") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on",
    };

    setStatus("submitting");

    try {
      await submitRestaurantInterest();
      setConfirmation({
        restaurantName: payload.restaurantName,
        email: payload.email,
      });
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  }

  if (status === "done" && confirmation) {
    return (
      <div
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 rounded-xl border border-border bg-surface px-6 py-14 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-canvas-muted text-tertiary-strong">
          <CircleCheck className="size-6" aria-hidden />
        </span>
        <h2 className="text-headline-md text-neutral">Preregistro recibido</h2>
        <p className="max-w-md text-body-md text-text-secondary">
          Gracias por registrar{" "}
          <span className="font-semibold text-neutral">
            {confirmation.restaurantName}
          </span>
          . Te escribimos a{" "}
          <span className="font-semibold text-neutral">{confirmation.email}</span>{" "}
          para confirmar los datos y agendar la carga de tu menú.
        </p>
        <PrimaryButton
          className="mt-2 border border-border bg-surface text-neutral hover:bg-canvas-muted"
          onClick={() => setStatus("idle")}
        >
          Registrar otro restaurante
        </PrimaryButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="restaurantName"
          label="Nombre del restaurante"
          name="restaurantName"
          required
          autoComplete="organization"
          placeholder="Ej. Donde Pepe"
        />

        <TextField
          id="contactName"
          label="Persona de contacto"
          name="contactName"
          required
          autoComplete="name"
          placeholder="Ej. Mariana López"
        />

        <TextField
          id="email"
          label="Correo electrónico"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="hola@restaurante.com"
        />

        <TextField
          id="phone"
          label="Teléfono o WhatsApp"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="Ej. 300 123 4567"
        />

        <Field id="cuisine" label="Tipo de cocina">
          <div className="relative">
            <select
              id="cuisine"
              name="cuisine"
              required
              defaultValue=""
              className={`${inputClass} appearance-none pr-11`}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {CUISINES.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text-secondary"
              aria-hidden
            />
          </div>
        </Field>

        <TextField
          id="city"
          label="Ciudad o zona donde operas"
          name="city"
          required
          autoComplete="address-level2"
          placeholder="Ej. Chapinero, Bogotá"
        />

        <TextField
          id="dishesCount"
          label="Platillos en el menú"
          name="dishesCount"
          type="number"
          inputMode="numeric"
          optional
          placeholder="Ej. 25"
        />
      </div>

      <fieldset className="mt-6 space-y-2">
        <legend className="text-label-lg text-neutral">
          ¿Cómo gestionas las entregas?
        </legend>
        <div className="flex flex-wrap gap-2">
          {DELIVERY_OPTIONS.map(({ value, label }) => (
            <label key={value} className="inline-flex">
              <input
                type="radio"
                name="deliveryMode"
                value={value}
                required
                className="peer sr-only"
              />
              <span className={pillClass}>{label}</span>
            </label>
          ))}
        </div>
        <p className="text-body-sm text-text-secondary">
          Con tu propio domiciliario cobramos entre 8% y 10% por pedido; si el
          cliente recoge en el local, entre 3% y 5%.
        </p>
      </fieldset>

      <div className="mt-6 space-y-2">
        <label htmlFor="message" className="block text-label-lg text-neutral">
          ¿Algo que debamos saber?
          <span className={optionalLabelClass}>(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Horarios, especialidad, si ya tienes domicilio…"
          className="min-h-28 w-full resize-y rounded-lg border border-border bg-surface px-4 py-3 text-body-sm text-neutral transition-colors placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none"
        />
      </div>

      <label className="mt-6 flex items-start gap-3">
        <input type="checkbox" name="consent" required className={checkboxClass} />
        <span className="text-body-sm text-text-secondary">
          Acepto el{" "}
          <Link
            href="/privacidad"
            className="text-primary underline underline-offset-2"
          >
            Aviso de Privacidad
          </Link>{" "}
          y los{" "}
          <Link
            href="/terminos"
            className="text-primary underline underline-offset-2"
          >
            Términos del Servicio
          </Link>
          .
        </span>
      </label>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-text-secondary">
          El preregistro no tiene costo ni compromiso.
        </p>
        <PrimaryButton
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Enviando…" : "Enviar preregistro"}
        </PrimaryButton>
      </div>
    </form>
  );
}