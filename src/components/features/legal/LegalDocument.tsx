import type { LucideIcon } from "lucide-react";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "terms"; items: { term: string; description: string }[] }
  | { type: "note"; text: string };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalHighlight {
  title: string;
  text: string;
  icon: LucideIcon;
}

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  highlights: LegalHighlight[];
  sections: LegalSection[];
  footerNote?: string;
}

function renderBlock(block: LegalBlock) {
  if (block.type === "paragraph") {
    return (
      <p key={block.text} className="text-body-md text-text-secondary">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul
        key={block.items.join("|")}
        className="list-disc space-y-2 pl-5 text-body-md text-text-secondary marker:text-text-secondary"
      >
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "terms") {
    return (
      <dl className="divide-y divide-border rounded-xl border border-border bg-surface px-4">
        {block.items.map((item) => (
          <div key={item.term} className="flex flex-col gap-1 py-3.5">
            <dt className="text-label-lg text-neutral">{item.term}</dt>
            <dd className="text-body-sm text-text-secondary">
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <p
      key={block.text}
      className="rounded-lg border border-border bg-canvas-muted px-4 py-3 text-body-sm text-neutral"
    >
      {block.text}
    </p>
  );
}

export function LegalDocument({
  eyebrow,
  title,
  summary,
  updatedAt,
  highlights,
  sections,
  footerNote,
}: LegalDocumentProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-margin-mobile lg:gap-margin">
      <header className="max-w-3xl space-y-3 lg:space-y-4">
        <p className="text-label-xs text-primary uppercase">{eyebrow}</p>
        <h1 className="text-title-sm text-neutral sm:text-headline-lg lg:text-display-sm">
          {title}
        </h1>
        <p className="text-body-md text-text-secondary lg:text-body-lg">
          {summary}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="rounded-full bg-canvas-muted px-3 py-1 text-label-md text-text-secondary">
            Última actualización: {updatedAt}
          </span>
          <span className="rounded-full bg-canvas-muted px-3 py-1 text-label-md text-text-secondary">
            Versión 1.0
          </span>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {highlights.map(({ title: itemTitle, text, icon: Icon }) => (
          <div
            key={itemTitle}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-4" aria-hidden />
            </span>
            <h2 className="text-title-xs text-neutral">{itemTitle}</h2>
            <p className="text-body-sm text-text-secondary">{text}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-col gap-margin-mobile lg:flex-row lg:gap-margin">
        <nav
          aria-label="Contenido del documento"
          className="lg:w-56 lg:shrink-0"
        >
          <div className="lg:sticky lg:top-24">
            <h2 className="text-label-sm text-neutral uppercase">Contenido</h2>
            <ol className="mt-4 flex flex-col gap-1 border-l border-border pl-4">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-md py-1.5 text-body-sm text-text-secondary transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <span className="tabular-nums">{index + 1}.</span>{" "}
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="flex min-w-0 max-w-3xl flex-col gap-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="flex scroll-mt-24 flex-col gap-3 border-t border-border pt-6 first:border-t-0 first:pt-0 lg:gap-4"
            >
              <h2 className="text-title-md text-neutral sm:text-headline-sm">
                {section.title}
              </h2>
              {section.blocks.map(renderBlock)}
            </section>
          ))}

          {footerNote && (
            <p className="border-t border-border pt-6 text-body-sm text-text-secondary">
              {footerNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}