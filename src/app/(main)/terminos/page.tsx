import type { Metadata } from "next";
import { BadgePercent, Handshake, Scale, Wallet } from "lucide-react";
import { LegalDocument } from "@/components/features/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Términos del Servicio | Dings",
  description:
    "Las reglas de uso de la plataforma Dings: pedidos, pagos, promociones, responsabilidades y solución de controversias.",
};

const HIGHLIGHTS = [
  {
    title: "Marketplace",
    text: "Dings conecta tu pedido con el restaurante que lo prepara.",
    icon: Handshake,
  },
  {
    title: "Precios claros",
    text: "El total con envío e impuestos se confirma antes de pagar.",
    icon: Wallet,
  },
  {
    title: "Promociones",
    text: "Los descuentos se aplican según las reglas de cada campaña.",
    icon: BadgePercent,
  },
  {
    title: "Ley colombiana",
    text: "Estos términos se rigen por las leyes de Colombia.",
    icon: Scale,
  },
];

const SECTIONS = [
  {
    id: "aceptacion",
    title: "Aceptación de los términos",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Estos Términos del Servicio (“Términos”) regulan el acceso y el uso de la plataforma Dings, su sitio web y sus aplicaciones móviles. Al crear una cuenta, realizar un pedido o usar cualquier funcionalidad de la plataforma aceptas estos Términos, nuestro Aviso de Privacidad y las reglas específicas de cada promoción.",
      },
      {
        type: "paragraph" as const,
        text: "Si no estás de acuerdo con alguno de estos apartados, puedes dejar de usar la plataforma. Algunas condiciones son obligatorias porque protegen la operación del marketplace y a las personas que lo usan.",
      },
    ],
  },
  {
    id: "mayoria",
    title: "Quién puede usar Dings",
    blocks: [
      {
        type: "paragraph" as const,
        text: "La plataforma está disponible para personas naturales mayores de dieciocho (18) años con capacidad de contratación.",
      },
    ],
  },
  {
    id: "cuenta",
    title: "Cuenta y registro",
    blocks: [
      {
        type: "list" as const,
        items: [
          "Debes proporcionar información veraz, vigente y completa al registrarte.",
          "Tu cuenta es personal e intransferible: cada pedido se realiza desde tu cuenta y tu entorno.",
          "Eres responsable de la confidencialidad de tu acceso. Si detectas un uso no autorizado, avísanos de inmediato.",
          "Puedes solicitar la eliminación de tu cuenta en cualquier momento. La acción es irreversible una vez confirmada.",
        ],
      },
      {
        type: "note" as const,
        text: "Podemos suspender cuentas que muestren fraude, uso falso de datos o comportamientos que puedan dañar la marketplace.",
      },
    ],
  },
  {
    id: "marketplace",
    title: "Dings como intermediario",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Dings opera un marketplace: los restaurantes publican sus menús, precios y tiempos de preparación, y tú eliges qué pedir. Dings intermedia la experiencia digital, pero la venta y la preparación del alimento son responsabilidad del restaurante, y la entrega corresponde al domiciliario o a la recogida en el local.",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "El restaurante responde por",
            description:
              "La calidad de los alimentos, el peso de las porciones, los alérgenos declarados y el cumplimiento de las normas sanitarias y de rotulación.",
          },
          {
            term: "Dings responde por",
            description:
              "El funcionamiento de la plataforma, el cobro, la trazabilidad del pedido y la atención de reclamos.",
          },
          {
            term: "El domiciliario responde por",
            description:
              "La entrega en el domicilio acordado y la custodia del pedido durante el trayecto.",
          },
        ],
      },
    ],
  },
  {
    id: "pedidos",
    title: "Pedidos y pagos",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Un pedido se forma cuando el restaurante acepta el carrito y el pago queda confirmado. Antes de confirmar verás el detalle de productos, el subtotal, el valor del envío y los impuestos aplicables.",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "Precios",
            description:
              "Se muestran en pesos colombianos e incluyen los impuestos exigibles por la Dian. El restaurante puede ajustar precios en cualquier momento, pero nunca después de tu confirmación.",
          },
          {
            term: "Medios de pago",
            description:
              "Tarjetas, Dings Wallet, efectivo contra entrega y los medios que el restaurante habilite en su ficha.",
          },
          {
            term: "Propinas",
            description:
              "Son opcionales, se calculan sobre el subtotal y se abonan al restaurante o al domiciliario según tu elección.",
          },
          {
            term: "Comprobantes",
            description:
              "Cada pago genera un comprobante disponible en el detalle del pedido y en tu correo de confirmación.",
          },
        ],
      },
    ],
  },
  {
    id: "entrega",
    title: "Entregas y recogidas",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Los tiempos que muestra Dings son estimaciones de preparación y de llegada, y pueden variar por el volumen de pedidos del local, el tráfico o las condiciones de la ruta.",
      },
      {
        type: "list" as const,
        items: [
          "Confirma que tu dirección, punto de referencia y número de contacto estén completos.",
          "Verifica el pedido con el domiciliario antes de cerrar el empaque.",
          "Reporta dentro de las dos (2) horas siguientes cualquier producto faltante, derramado o en mal estado.",
          "En las recogidas en el local debes mostrar el código de confirmación en el momento de retirar el pedido.",
        ],
      },
      {
        type: "note" as const,
        text: "Los pedidos no retirados tras la hora de llegada estimada pueden ser descartados por el restaurante, sin responsabilidad para Dings.",
      },
    ],
  },
  {
    id: "promociones",
    title: "Promociones y descuentos",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Dings y los restaurantes pueden ofrecer promociones, descuentos, envíos gratis o beneficios para socios. Cada campaña tiene reglas propias que se muestran antes de aplicarla.",
      },
      {
        type: "list" as const,
        items: [
          "Los descuentos se aplican sobre el subtotal, salvo que la campaña indique otra base de cálculo.",
          "No son acumulables entre sí, salvo que la promoción indique lo contrario.",
          "Los beneficios de Dings Wallet y los cupones pueden tener fecha de vencimiento.",
          "Dings puede cancelar una promoción si detecta un uso indebido o fraudulento.",
        ],
      },
    ],
  },
  {
    id: "contenido",
    title: "Contenido y reseñas",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Cuando publicas una foto, una reseña o un comentario en Dings, nos concedes una licencia limitada para mostrar ese contenido dentro de la plataforma y en sus comunicaciones promocionales, asociado a tu nombre o a tu alias.",
      },
      {
        type: "list" as const,
        items: [
          "El contenido debe ser veraz y no puede incluir datos personales de terceros.",
          "No publiques contenido ofensivo, ilegal, discriminatorio o que vulnere derechos de propiedad intelectual.",
          "Dings puede retirar contenido que incumpla estas reglas o que reporte un usuario.",
        ],
      },
    ],
  },
  {
    id: "conducta",
    title: "Conducta aceptable",
    blocks: [
      {
        type: "list" as const,
        items: [
          "No realizar pedidos falsos, cargas o solicitudes de reembolso fraudulentas.",
          "No acceder a cuentas ajenas, automatizar consultas masivas ni vulnerar la seguridad de la plataforma.",
          "No usar Dings para actividades ilegales ni para evadir los términos de los restaurantes.",
          "No publicar contenido ilegal, discriminatorio o que promueva violencia.",
          "Respetar a los restaurantes, a los repartidores y a los demás usuarios.",
        ],
      },
      {
        type: "note" as const,
        text: "El incumplimiento de estas reglas puede dar lugar a la cancelación de pedidos, la suspensión de la cuenta o al reembolso de pagos derivados de fraude.",
      },
    ],
  },
  {
    id: "propiedad",
    title: "Propiedad intelectual",
    blocks: [
      {
        type: "paragraph" as const,
        text: "La marca Dings, su diseño, el software, los textos de la plataforma y los elementos de su interfaz son propiedad de Dings Colombia S.A.S. o de sus licenciantes. El nombre, el menú y las fotografías de cada restaurante pertenecen a sus respectivos titulares.",
      },
      {
        type: "paragraph" as const,
        text: "No puedes copiar, modificar, vender ni usar con fines comerciales la plataforma, sus componentes o su contenido sin autorización previa por escrito.",
      },
    ],
  },
  {
    id: "responsabilidad",
    title: "Limitación de responsabilidad",
    blocks: [
      {
        type: "paragraph" as const,
        text: "En la medida permitida por la ley, Dings no responde por daños indirectos, pérdida de ganancias o lucro cesante derivados del uso de la plataforma o de los alimentos entregados por los restaurantes.",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "Calidad del alimento",
            description:
              "Las reclamaciones sobre el producto, su preparación o sus ingredientes se tramitan con el restaurante, responsable de la comida que entrega.",
          },
          {
            term: "Fuerza mayor",
            description:
              "Eventos fuera del control razonable de Dings, como desastres naturales, cortes de luz o fallos generalizados de la plataforma de pagos.",
          },
          {
            term: "Descuentos y promociones",
            description:
              "Las campañas se ofrecen en los términos indicados en cada promoción y pueden cambiar o terminar sin previo aviso.",
          },
        ],
      },
    ],
  },
  {
    id: "suspender",
    title: "Suspensión y terminación",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Puedes dejar de usar Dings en cualquier momento cerrando tu cuenta. Podemos cancelar pedidos, suspender cuentas o modificar funcionalidades cuando detectemos fraude, incumplimiento de estos Términos, una orden de autoridad competente o decisiones operativas que afecten la seguridad de la plataforma.",
      },
      {
        type: "note" as const,
        text: "Las obligaciones que por su naturaleza deben continuar tras la terminación seguirán vigentes, como la confidencialidad y el tratamiento de datos personales.",
      },
    ],
  },
  {
    id: "cambios",
    title: "Modificaciones de los Términos",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Podemos actualizar estos Términos para reflejar cambios legales, técnicos o del marketplace. Publicaremos la versión vigente en esta página con su fecha de actualización.",
      },
      {
        type: "paragraph" as const,
        text: "Si el cambio afecta de forma material tus derechos, te lo avisaremos en la plataforma o por correo antes de que entre en vigor. Continuar usando Dings después de la publicación equivale a aceptarla.",
      },
    ],
  },
  {
    id: "ley",
    title: "Ley aplicable y controversias",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Estos Términos se rigen por las leyes de la República de Colombia. Las partes acordan acudir primero a una negociación directa durante quince (15) días hábiles y, si no hay acuerdo, resolver la controversia en los tribunales ordinarios del domicilio del consumidor en Bogotá D.C.",
      },
    ],
  },
  {
    id: "contacto",
    title: "Contacto",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Para cualquier duda sobre estos Términos puedes escribirnos a terminos@dings.co o usar el Centro de ayuda dentro de la plataforma. Respondemos los mensajes en un plazo máximo de cinco (5) días hábiles.",
      },
    ],
  },
];

export default function TerminosPage() {
  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <LegalDocument
        eyebrow="Legal"
        title="Términos del Servicio"
        summary="Estas son las reglas que rigen el uso de Dings: cómo pides, cómo pagas, cómo entregas, qué protege a cada parte y cómo resolvemos una controversia."
        updatedAt="12 de enero de 2026"
        highlights={HIGHLIGHTS}
        sections={SECTIONS}
        footerNote="Dings Colombia S.A.S. · NIT 901.456.789-1 · Calle 93 # 11-27, oficina 802, Bogotá D.C. · terminos@dings.co"
      />
    </main>
  );
}