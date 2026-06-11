// JSON-LD structured-data <script>. '<' is escaped because JSON.stringify
// does NOT escape '</script>' inside string values — an HTML fragment in a
// translated message would otherwise terminate the script block early and
// leak the remainder into the DOM.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
