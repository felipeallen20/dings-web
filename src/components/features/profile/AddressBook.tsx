"use client";

import { useState } from "react";
import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import type { Address } from "@/types/profile";
import type { Zone } from "@/types/zone";
import { Card } from "@/components/ui/Card";
import { Sheet } from "@/components/ui/Sheet";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "adr-1",
    label: "Casa",
    line1: "Calle 85 # 11-53, Apto 302",
    city: "Bogotá",
    zoneName: "Chapinero",
    isDefault: true,
    notes: "Timbre 2, la portería pide código",
  },
  {
    id: "adr-2",
    label: "Trabajo",
    line1: "Carrera 7 # 32-16, Torre Norte",
    line2: "Piso 8, oficina 804",
    city: "Bogotá",
    zoneName: "La Candelaria",
    isDefault: false,
  },
];

const LABEL_OPTIONS = [
  { value: "Casa", label: "Casa" },
  { value: "Trabajo", label: "Trabajo" },
  { value: "Otro", label: "Otro" },
];

const EMPTY_DRAFT: Address = {
  id: "",
  label: "Casa",
  line1: "",
  line2: "",
  city: "Bogotá",
  zoneName: "",
  isDefault: false,
};

const iconButtonClass =
  "flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:bg-canvas-muted hover:text-neutral focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:size-9";

interface AddressBookProps {
  zones: Zone[];
}

export function AddressBook({ zones }: AddressBookProps) {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [draft, setDraft] = useState<Address>(EMPTY_DRAFT);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function openCreate() {
    setDraft(EMPTY_DRAFT);
    setIsSheetOpen(true);
  }

  function openEdit(address: Address) {
    setDraft(address);
    setIsSheetOpen(true);
  }

  function closeSheet() {
    setIsSheetOpen(false);
  }

  function handleSave() {
    if (!draft.line1.trim() || !draft.zoneName) return;

    setAddresses((current) => {
      const exists = current.some((item) => item.id === draft.id);
      const next = exists
        ? current.map((item) => (item.id === draft.id ? draft : item))
        : [...current, { ...draft, id: `adr-${current.length + 1}` }];

      return draft.isDefault
        ? next.map((item) => ({ ...item, isDefault: item.id === draft.id }))
        : next;
    });

    closeSheet();
  }

  function setDefault(id: string) {
    setAddresses((current) =>
      current.map((item) => ({ ...item, isDefault: item.id === id })),
    );
  }

  function remove(id: string) {
    setAddresses((current) => {
      const next = current.filter((item) => item.id !== id);
      if (current.find((item) => item.id === id)?.isDefault && next.length > 0) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
    setPendingDeleteId(null);
  }

  return (
    <Card
      title="Direcciones"
      description="Guarda tus direcciones para adelantar el checkout."
      action={
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-caption text-neutral transition-colors hover:border-border-strong hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-9 sm:gap-2 sm:px-3.5 sm:text-label-md"
        >
          <Plus className="size-3.5 shrink-0 sm:size-4" aria-hidden />
          Agregar
        </button>
      }
    >
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border-strong bg-canvas-muted/40 px-4 py-8 text-center">
          <MapPin className="size-5 text-text-secondary" aria-hidden />
          <p className="text-caption text-text-secondary sm:text-body-md">
            Todavía no tienes direcciones guardadas.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5 sm:gap-3">
          {addresses.map((address) => {
            const isPendingDelete = pendingDeleteId === address.id;

            return (
              <li
                key={address.id}
                className="rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong sm:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-canvas-muted px-2 py-0.5 text-label-xs text-neutral uppercase sm:text-label-sm">
                        <MapPin className="size-2.5 sm:size-3" aria-hidden />
                        {address.label}
                      </span>

                      {address.isDefault && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-label-xs text-primary uppercase sm:text-label-sm">
                          Principal
                        </span>
                      )}
                    </div>

                    <p className="text-label-md text-neutral sm:text-body-sm">
                      {address.line1}
                    </p>
                    {address.line2 && (
                      <p className="text-caption text-text-secondary sm:text-body-sm">
                        {address.line2}
                      </p>
                    )}
                    <p className="text-caption text-text-secondary sm:text-body-sm">
                      {address.city} · {address.zoneName}
                    </p>
                    {address.notes && (
                      <p className="text-caption text-placeholder">
                        {address.notes}
                      </p>
                    )}
                  </div>

                  {isPendingDelete ? (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => remove(address.id)}
                        className="h-8 rounded-full border border-border bg-surface px-2.5 text-caption text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:text-label-md"
                      >
                        Sí
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="h-8 rounded-full border border-border bg-surface px-2.5 text-caption text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:text-label-md"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div className="flex shrink-0 items-center gap-1.5">
                      {!address.isDefault && (
                        <button
                          type="button"
                          aria-label={`Usar ${address.label} como dirección principal`}
                          onClick={() => setDefault(address.id)}
                          className={iconButtonClass}
                        >
                          <Star className="size-4" aria-hidden />
                        </button>
                      )}

                      <button
                        type="button"
                        aria-label={`Editar ${address.label}`}
                        onClick={() => openEdit(address)}
                        className={iconButtonClass}
                      >
                        <Pencil className="size-4" aria-hidden />
                      </button>

                      <button
                        type="button"
                        aria-label={`Eliminar ${address.label}`}
                        onClick={() => setPendingDeleteId(address.id)}
                        className={iconButtonClass}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Sheet
        isOpen={isSheetOpen}
        onClose={closeSheet}
        title={draft.id ? "Editar dirección" : "Nueva dirección"}
        description="Solo la usamos para el envío de tus pedidos."
        footer={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeSheet}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 text-label-lg text-neutral transition-colors hover:bg-canvas-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!draft.line1.trim() || !draft.zoneName}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-primary px-4 text-label-lg text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              Guardar
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <SelectField
            id="address-label"
            label="Etiqueta"
            value={draft.label}
            onChange={(label) => setDraft({ ...draft, label })}
            options={LABEL_OPTIONS}
          />

          <TextField
            id="address-line1"
            name="line1"
            label="Dirección"
            value={draft.line1}
            onChange={(line1) => setDraft({ ...draft, line1 })}
            placeholder="Calle 85 # 11-53, Apto 302"
            autoComplete="address-line1"
            maxLength={80}
          />

          <TextField
            id="address-line2"
            name="line2"
            label="Complemento"
            optional
            value={draft.line2 ?? ""}
            onChange={(line2) => setDraft({ ...draft, line2 })}
            placeholder="Piso, oficina, torre"
            autoComplete="address-line2"
            maxLength={60}
          />

          <SelectField
            id="address-zone"
            label="Barrio"
            value={draft.zoneId ?? ""}
            onChange={(zoneId) =>
              setDraft({
                ...draft,
                zoneId: zoneId || undefined,
                zoneName:
                  zones.find((zone) => zone.id === zoneId)?.name ?? draft.zoneName,
              })
            }
            placeholder="Selecciona un barrio"
            options={zones.map((zone) => ({ value: zone.id, label: zone.name }))}
          />

          <TextField
            id="address-notes"
            name="notes"
            label="Indicaciones"
            optional
            value={draft.notes ?? ""}
            onChange={(notes) => setDraft({ ...draft, notes })}
            placeholder="Timbre, portería, punto de referencia"
            maxLength={100}
          />

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={draft.isDefault}
              onChange={(event) =>
                setDraft({ ...draft, isDefault: event.target.checked })
              }
              className="size-5 shrink-0 rounded-[6px] border-[1.5px] border-border-strong accent-primary"
            />
            <span className="text-label-lg text-neutral">
              Usar como dirección principal
            </span>
          </label>
        </div>
      </Sheet>
    </Card>
  );
}