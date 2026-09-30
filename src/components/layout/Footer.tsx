import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const LINK_GROUPS = [
  {
    id: "marketplace",
    title: "Marketplace",
    links: [
      { label: "Descubrir platillos", href: "/explorar" },
      { label: "Director culinario", href: "/director-culinario" },
      { label: "Ofertas y beneficios", href: "/ofertas" },
      { label: "Catas y menús degustación", href: "/catas" },
    ],
  },
  {
    id: "restaurantes",
    title: "Restaurantes",
    links: [
      { label: "Afiliar mi restaurante", href: "/registrar-restaurante" },
      { label: "Portal de partners", href: "/partners" },
      { label: "Comunidad de chefs", href: "/comunidad-chefs" },
      { label: "Cobertura de envíos", href: "/cobertura-envios" },
    ],
  },
  {
    id: "soporte",
    title: "Compañía y soporte",
    links: [
      { label: "Sobre Dings", href: "/sobre-dings" },
      { label: "Centro de ayuda", href: "/ayuda" },
      { label: "Aviso de Privacidad", href: "/privacidad" },
      { label: "Términos del Servicio", href: "/terminos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 py-10 md:px-6 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="text-title-md text-primary">
              Dings
            </Link>
            <p className="max-w-xs text-body-sm text-text-secondary">
              La plataforma donde los restaurantes de tu barrio publican su menú
              y tú lo pides sin salir de casa.
            </p>
            <p className="flex items-center gap-2 text-label-lg text-neutral">
              <ShieldCheck className="size-4 shrink-0 text-tertiary-strong" aria-hidden />
              Selección 100% verificada
            </p>
          </div>

          {LINK_GROUPS.map(({ id, title, links }) => (
            <nav key={id} aria-labelledby={`footer-${id}`}>
              <h2
                id={`footer-${id}`}
                className="text-label-sm text-neutral uppercase"
              >
                {title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-body-sm text-text-secondary transition-colors hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="text-center text-label-md text-text-secondary">
          © 2026 Dings. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
