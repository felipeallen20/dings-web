import type { Metadata } from "next";
import { FileCheck, Lock, MailCheck, UserRound } from "lucide-react";
import { LegalDocument } from "@/components/features/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Dings",
  description:
    "Conoce qué datos recogemos en Dings, para qué los usamos y cómo ejercer tus derechos como titular.",
};

const HIGHLIGHTS = [
  {
    title: "Tú decides",
    text: "Recogemos solo lo necesario para operar tu cuenta y tus pedidos.",
    icon: UserRound,
  },
  {
    title: "Base legal",
    text: "Tratamos tus datos bajo tu autorización y el cumplimiento legal.",
    icon: FileCheck,
  },
  {
    title: "Tus derechos",
    text: "Puedes pedir acceso, corrección o eliminación de tus datos.",
    icon: MailCheck,
  },
  {
    title: "Protegido",
    text: "Cifrado en tránsito y control de accesos para cada socio.",
    icon: Lock,
  },
];

const SECTIONS = [
  {
    id: "responsable",
    title: "Responsable del tratamiento",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Dings Colombia S.A.S. (en adelante «Dings»), sociedad comercial colombiana con NIT 901.456.789-1, con domicilio en Calle 93 # 11-27, oficina 802, Bogotá D.C., es responsable del tratamiento de los datos personales que recogemos a través de la plataforma Dings, su sitio web y sus aplicaciones móviles.",
      },
      {
        type: "paragraph" as const,
        text: "Dings actúa como encargado cuando un restaurante o un domiciliario decide sobre los datos que recoge en nombre propio, y como controlador en el tratamiento de los datos que la plataforma necesita para funcionar, como tu cuenta, tus pedidos y las comunicaciones de servicio.",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "Canal de privacidad",
            description: "privacidad@dings.co · Bogotá, Colombia",
          },
          {
            term: "Encargado del manejo de datos",
            description:
              "Dings Data Services S.A.S., con sede en Medellín, contratada para operar la infraestructura tecnológica y las copias de respaldo.",
          },
        ],
      },
    ],
  },
  {
    id: "datos",
    title: "Qué datos recogemos",
    blocks: [
      {
        type: "paragraph" as const,
        text: "El alcance depende de cómo uses Dings. Recogemos datos que nos entregas voluntariamente y datos técnicos mínimos para mantener la sesión segura.",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "Datos de registro",
            description:
              "Nombre, correo electrónico, número de celular y foto de perfil cuando inicias sesión con correo o con Google.",
          },
          {
            term: "Datos de contacto y entrega",
            description:
              "Direcciones guardadas, notas de entrega, punto de referencia y el contacto que designas para recibir el pedido.",
          },
          {
            term: "Datos de la transacción",
            description:
              "Restaurantes seleccionados, productos, cantidades, valores pagados, método de pago y comprobantes. Dings nunca almacena el número completo de tu tarjeta.",
          },
          {
            term: "Datos de uso y soporte",
            description:
              "Historial de pedidos, búsquedas realizadas, mensajes con soporte y calificaciones que dejas a los restaurantes.",
          },
          {
            term: "Datos técnicos",
            description:
              "Dirección IP, identificador del dispositivo, navegador y páginas visitadas, usados para seguridad y diagnóstico.",
          },
        ],
      },
    ],
  },
  {
    id: "finalidades",
    title: "Para qué usamos tus datos",
    blocks: [
      {
        type: "list" as const,
        items: [
          "Crear y mantener tu cuenta, iniciar sesión y recuperar el acceso.",
          "Procesar pedidos, pagos, envíos y recogidas con el restaurante y el domiciliario.",
          "Enviarte notificaciones sobre el estado de tus pedidos, promociones que aceptaste recibir y alertas de seguridad.",
          "Prevenir fraude, abuso de la plataforma y resolver disputas de pago.",
          "Cumplir obligaciones legales, tributarias y regulatorias ante la autoridad competente.",
          "Mejorar el marketplace con estadísticas agregadas y anonimizadas.",
        ],
      },
      {
        type: "note" as const,
        text: "No vendemos tus datos personales ni los cedemos con fines comerciales a terceros.",
      },
    ],
  },
  {
    id: "bases",
    title: "Bases de autorización",
    blocks: [
      {
        type: "paragraph" as const,
        text: "El tratamiento de tus datos se apoya en las siguientes bases legales, conforme a la Ley 1581 de 2012 y sus normas reglamentarias:",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "Autorización previa",
            description:
              "Otorgada al aceptar este aviso, usar la plataforma y contratar con nosotros.",
          },
          {
            term: "Ejecución del contrato",
            description:
              "Necesaria para gestionar tu cuenta, tus pedidos, tus pagos y tus devoluciones.",
          },
          {
            term: "Obligación legal o contractual",
            description:
              "Conservación de comprobantes de pago, facturación e información tributaria durante los plazos exigidos por la Dian.",
          },
          {
            term: "Interés legítimo",
            description:
              "Seguridad de la plataforma, prevención de fraude y optimización de la experiencia, siempre con mecanismos para que ejerzas tus derechos.",
          },
        ],
      },
    ],
  },
  {
    id: "derechos",
    title: "Tus derechos como titular",
    blocks: [
      {
        type: "paragraph" as const,
        text: "De conformidad con el artículo 15 de la Ley 1581 de 2012, puedes ejercer en cualquier momento los derechos de conocer, acceder, consultar, actualizar, suprimir, anonimizar y portar tus datos personales, así como revocar tu autorización.",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "Acceso y consulta",
            description:
              "Solicita una copia de los datos que tenemos sobre ti desde tu perfil o por correo.",
          },
          {
            term: "Corrección y actualización",
            description:
              "Actualiza tu nombre, correo, celular y direcciones desde «Mi perfil». Podemos pedir verificación para proteger tu cuenta.",
          },
          {
            term: "Supresión y eliminación",
            description:
              "Solicita la eliminación de tu cuenta. Eliminar un pedido ya entregado no es posible por obligación contable, pero sí anonimizamos ese historial.",
          },
          {
            term: "Portabilidad",
            description:
              "Recibe tus datos en un formato estructurado y de uso común, directamente en tu correo.",
          },
          {
            term: "Revocatoria",
            description:
              "Retira tu consentimiento para promociones o comunicaciones no esenciales sin afectar la operación de tus pedidos.",
          },
        ],
      },
      {
        type: "paragraph" as const,
        text: "Escribe a privacidad@dings.co con tu solicitud. Respondemos dentro de los diez (10) días hábiles siguientes a su recepción. Si consideras que tu derecho no fue atendido, puedes reclamar ante la Autoridad Nacional de Protección de Datos Personales (ANPD) de Colombia.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies y tecnologías similares",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Usamos cookies y almacenamiento local del navegador para mantener tu sesión iniciada, recordar tu carrito y prevenir el uso indebido y el fraude. Las cookies estrictamente necesarias no requieren consentimiento; las analíticas y de personalización se activan solo si las aceptas desde «Preferencias» en tu perfil.",
      },
      {
        type: "list" as const,
        items: [
          "Cookies de sesión: mantienen tu autenticación y la seguridad del formulario de pago.",
          "Almacenamiento local: recuerda la zona de entrega seleccionada y los productos agregados al carrito.",
          "Medición de uso: cuenta páginas vistas y clics en campañas, sin identificarte.",
        ],
      },
    ],
  },
  {
    id: "terceros",
    title: "Terceros que participan",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Compartimos el mínimo necesario de tus datos con operadores que hacen posible la operación de Dings, siempre sujetos a contratos que exigen el mismo nivel de protección:",
      },
      {
        type: "terms" as const,
        items: [
          {
            term: "Restaurantes",
            description:
              "Reciben nombre, contacto, dirección de entrega y el detalle del pedido para preparar y entregar.",
          },
          {
            term: "Domiciliarios",
            description:
              "Reciben nombre, teléfono y dirección del punto de entrega, además del código de verificación del pedido.",
          },
          {
            term: "Pasarelas de pago",
            description:
              "Procesan el cobro y nos devuelven el resultado de la transacción; nunca almacenamos el número completo de tu tarjeta.",
          },
          {
            term: "Proveedores de infraestructura",
            description:
              "Alojan la plataforma, envían las notificaciones transaccionales y dan soporte técnico.",
          },
        ],
      },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad de la información",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Aplicamos medidas técnicas y administrativas para proteger tus datos: cifrado en tránsito con TLS, cifrado en reposo, control de acceso por roles, registros de auditoría y copias de respaldo periódicas. Si ocurre una vulneración que pueda afectarte, te avisaremos dentro de los plazos establecidos por la ley y publicaremos un aviso en la plataforma.",
      },
      {
        type: "note" as const,
        text: "Ningún sistema es infalible. Puedes mejorar la protección de tu cuenta con una contraseña robusta y la verificación de correo que usamos al iniciar sesión.",
      },
    ],
  },
  {
    id: "menores",
    title: "Menores de edad",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Dings está dirigido a personas mayores de dieciocho (18) años. No recopilamos de forma consciente datos de menores de edad. Si detectamos una cuenta menor sin autorización de un adulto, la desactivaremos y eliminaremos los datos asociados.",
      },
    ],
  },
  {
    id: "cambios",
    title: "Cambios a este aviso",
    blocks: [
      {
        type: "paragraph" as const,
        text: "Podemos actualizar este Aviso de Privacidad para reflejar cambios legales, técnicos o del marketplace. Publicaremos la versión vigente en esta misma página con su fecha de actualización y, cuando el cambio sea material, te lo notificaremos en la plataforma o por correo.",
      },
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <main className="w-full px-4 py-6 md:px-6 lg:py-8">
      <LegalDocument
        eyebrow="Legal"
        title="Aviso de Privacidad"
        summary="En Dings tratamos los datos personales que nos entregas para que puedas pedir, pagar y recibir tus pedidos con confianza, y para que los restaurantes de tu barrio te ofrezcan lo mejor de su menú."
        updatedAt="12 de enero de 2026"
        highlights={HIGHLIGHTS}
        sections={SECTIONS}
        footerNote="Dings Colombia S.A.S. · NIT 901.456.789-1 · Calle 93 # 11-27, oficina 802, Bogotá D.C. · privacidad@dings.co"
      />
    </main>
  );
}