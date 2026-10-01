"use client";

import { useState } from "react";
import type { ProfilePreferences } from "@/types/profile";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";

const INITIAL_PREFERENCES: ProfilePreferences = {
  orderUpdates: true,
  promos: false,
  smsAlerts: true,
};

export function PreferencesSection() {
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);

  function update(key: keyof ProfilePreferences, value: boolean) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  return (
    <Card
      title="Preferencias"
      description="Elige qué avisos quieres recibir de Dings."
    >
      <div className="divide-y divide-border">
        <div className="pb-3 sm:pb-4">
          <Switch
            label="Estado de mis pedidos"
            description="Confirmación, preparación y entrega."
            checked={preferences.orderUpdates}
            onChange={(value) => update("orderUpdates", value)}
          />
        </div>

        <div className="py-3 sm:py-4">
          <Switch
            label="Promociones y novedades"
            description="Descuentos y restaurantes nuevos en tu zona."
            checked={preferences.promos}
            onChange={(value) => update("promos", value)}
          />
        </div>

        <div className="pt-3 sm:pt-4">
          <Switch
            label="Alertas por SMS"
            description="Solo para cambios importantes del pedido."
            checked={preferences.smsAlerts}
            onChange={(value) => update("smsAlerts", value)}
          />
        </div>
      </div>
    </Card>
  );
}