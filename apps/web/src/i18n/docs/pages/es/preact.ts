import type { DocPageData } from "../../shared";

export const preactESDoc: DocPageData = {
    slug: "preact", navLabel: "Preact", eyebrow: "Preact", heading: "Integración con Preact", title: "Cmd+kit | Preact",
    description: "Instala el paquete de Preact y personaliza una command palette con el mismo modelo de comandos que usa el adaptador de React.",
    intro: ["<code>@cmd-kit/preact</code> replica la API pública de React sobre Preact."],
    sections: [
      { id: "instalacion", label: "Instalación", blocks: [{ type: "install-selector", adapter: "preact", showAdapter: false, showLink: false }] },
      { id: "uso-basico", label: "Uso básico", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `import { CommandPalette } from "@cmd-kit/preact";

const sections = [
  {
    id: "navigation",
    title: "Navigation",
    items: [{ id: "dashboard", title: "Dashboard", href: "/dashboard" }]
  }
];

export function Example() {
  return <CommandPalette sections={sections} title="Comandos del proyecto" />;
}` }] },
      { id: "superficie-de-configuracion", label: "Superficie de configuración", blocks: [{ type: "list", items: ["<code>sections</code>, <code>items</code> y <code>source</code>", "<code>messages</code> para copy específico del producto", "<code>theme</code> para tokens visuales", "<code>classNames</code> para estilos por slot", "<code>renderers</code> para overrides de renderizado", "<code>recents</code> para comandos recientes"] }] },
      { id: "iconos-y-layout", label: "Iconos y layout", blocks: [{ type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  renderItem={(item, active) => (
    <div className={active ? "palette-row is-active" : "palette-row"}>
      <MyIcon name={item.id} />
      <span>{item.title}</span>
    </div>
  )}
  title="Comandos del proyecto"
/>` }] },
      { id: "comandos-recientes", label: "Comandos recientes", blocks: [{ type: "paragraph", html: "<code>recents</code> es opcional y está desactivado por defecto. Actívalo con <code>recents={true}</code> o configúralo con <code>recents={{ limit, sectionTitle }}</code>. Desactívalo con <code>recents={false}</code>." }, { type: "code", lang: "tsx", label: "tsx", code: `<CommandPalette
  sections={sections}
  recents={false}
  title="Comandos del proyecto"
/>` }] },
      { id: "faq", label: "FAQ", blocks: [{ type: "list", items: ["<strong>¿La API de Preact es intencionalmente parecida a React?</strong> Sí. El adaptador replica la API de React para compartir patrones y configuración.", "<strong>¿Necesito alias de compatibilidad de React para usarlo?</strong> No. Con <code>@cmd-kit/preact</code> trabajas directamente sobre Preact.", "<strong>¿También tengo <code>source</code> asíncrono y recientes en Preact?</strong> Sí. <code>source</code> y <code>recents</code> están soportados en el adaptador de Preact.", "<strong>¿Cómo desactivo recientes en Preact?</strong> Deja <code>recents</code> sin definir (apagado por defecto) o pásalo como <code>recents={false}</code>.", "<strong>¿Cómo reemplazo la UI por defecto de cada fila?</strong> Usa <code>renderItem</code> para controlar toda la fila o <code>renderers</code> para overrides puntuales.", "<strong>¿Cuándo es mejor usar Core en vez del adaptador de Preact?</strong> Cuando tu producto requiere una interacción o un render que sobrepasa los límites del componente empaquetado."] }] }
    ]
  };
