import type { DocPageData } from "@/i18n/docs/shared";

export const reactESDoc: DocPageData = {
    slug: "react", navLabel: "React", eyebrow: "React", heading: "Integración con React", title: "Cmd+kit | React",
    description: "Instala el paquete de React y personaliza iconos, estilos, datos asíncronos y comportamiento con la API pública del paquete.",
    intro: ["<code>@cmd-kit/react</code> incluye el componente <code>CommandPalette</code> y el hook <code>useCommandPalette</code> para integraciones más personalizadas."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "react", showAdapter: false, showLink: false }] },
      { id: "uso-basico", label: "Uso básico", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `import { CommandPalette } from "@cmd-kit/react";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" }
    ]
  }
];

export function Example() {
  return <CommandPalette sections={sections} title="Comandos del proyecto" />;
}` }] },
      { id: "props-principales", label: "Props principales", blocks: [{ type: "list", items: ["<code>sections</code> o <code>items</code>: datos estáticos", "<code>source</code>: comandos calculados o asíncronos", "<code>messages</code>: placeholder, estado vacío y cierre", "<code>theme</code>: colores, borde, radio y sombra", "<code>classNames</code> y <code>renderers</code>: overrides visuales y estructurales", "<code>recents</code>: sección de comandos recientes (apagado por defecto)", "<code>open</code>, <code>defaultOpen</code>, <code>onOpenChange</code>: control de estado"] }] },
      { id: "iconos-y-layout-de-item", label: "Iconos y layout de ítem", blocks: [{ type: "paragraph", html: "Usa <code>renderItem</code> cuando quieras controlar completamente la fila del ítem, incluyendo iconos, espaciado y metadatos." }, { type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  renderItem={(item, active) => (
    <div className={active ? "palette-row is-active" : "palette-row"}>
      <MyIcon name={item.id} />
      <div className="palette-row-copy">
        <strong>{item.title}</strong>
        {item.subtitle ? <span>{item.subtitle}</span> : null}
      </div>
    </div>
  )}
  title="Comandos del proyecto"
/>` }] },
      { id: "ejemplo-de-personalizacion", label: "Ejemplo de personalización", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  classNames={{
    dialog: "palette-shell",
    item: "palette-item"
  }}
  messages={{
    searchPlaceholder: "Busca acciones",
    noResults: "No hay comandos para esta búsqueda."
  }}
  theme={{
    accentColor: "#12b5e5",
    backgroundColor: "#0f1720",
    textColor: "#f5fbff"
  }}
  sections={sections}
  title="Comandos del workspace"
/>` }] },
      { id: "fuente-asincrona", label: "Fuente asíncrona", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  source={async () => {
    const response = await fetch("/api/commands");
    return response.json();
  }}
  recents={{ limit: 6, sectionTitle: "Recientes" }}
  title="Comandos del workspace"
/>` }] },
      { id: "anadir-un-comando-nuevo", label: "Añadir un comando nuevo", blocks: [{ type: "paragraph", html: "Para añadir una opción nueva, agrega un nuevo ítem dentro de la sección correspondiente. <code>shortcut</code> es opcional: úsalo cuando quieras atajo de teclado y omítelo si solo debe ejecutarse con click/Enter." }, { type: "code", lang: "tsx", label: "tsx", code: `const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "dashboard", title: "Dashboard", href: "/dashboard" },
      { id: "billing", title: "Billing", href: "/billing", shortcut: "mod+b" },
      { id: "support", title: "Support", href: "/support" }
    ]
  }
];` }] },
      { id: "comandos-recientes", label: "Comandos recientes", blocks: [{ type: "paragraph", html: "<code>recents</code> es opcional y viene desactivado por defecto. Actívalo con <code>recents={true}</code> o configúralo con <code>recents={{ limit: 6, sectionTitle: 'Recientes' }}</code>. Desactívalo con <code>recents={false}</code>." }, { type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  recents={false}
  title="Comandos del workspace"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿Cuándo uso <code>CommandPalette</code> y cuándo <code>useCommandPalette</code>?</strong> Empieza por <code>CommandPalette</code>. Usa <code>useCommandPalette</code> cuando quieras orquestar estado y render por tu cuenta.", "<strong>¿Cómo evito conflictos de atajos con mi aplicación?</strong> Sobrescribe <code>shortcut</code> y usa una combinación que no choque con atajos globales del producto o del navegador.", "<strong>¿Puedo controlar la apertura desde estado de React?</strong> Sí. Usa <code>open</code> y <code>onOpenChange</code> en modo controlado, o <code>defaultOpen</code> en modo no controlado.", "<strong>¿Cómo desactivo los comandos recientes en React?</strong> Deja <code>recents</code> sin definir (apagado por defecto) o pásalo como <code>recents={false}</code>.", "<strong>¿Cuál es la forma recomendada de cargar comandos desde API?</strong> Usa <code>source</code> y devuelve la misma estructura (<code>items</code> y/o <code>sections</code>) que usarías en configuración estática.", "<strong>¿Cómo personalizo bien la fila del ítem?</strong> Usa <code>renderItem</code> si quieres control total de la fila o <code>renderers</code> para overrides puntuales (título, sección, estado vacío)."] }] }
    ]
  };


