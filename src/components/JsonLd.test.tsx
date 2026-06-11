import { describe, expect, it } from "vitest";
import JsonLd from "./JsonLd";

describe("JsonLd", () => {
  it("escapes '<' so '</script>' in message content cannot break the block", () => {
    const el = JsonLd({
      data: { "@type": "FAQPage", answer: 'before</script><img src=x onerror="x">after' },
    });
    const html = el.props.dangerouslySetInnerHTML.__html as string;
    expect(html).not.toContain("</script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("\\u003c/script>");
    // 이스케이프 후에도 유효한 JSON이어야 한다
    expect(JSON.parse(html.replace(/\\u003c/g, "<"))).toEqual({
      "@type": "FAQPage",
      answer: 'before</script><img src=x onerror="x">after',
    });
  });

  it("renders an application/ld+json script element", () => {
    const el = JsonLd({ data: { "@context": "https://schema.org" } });
    expect(el.type).toBe("script");
    expect(el.props.type).toBe("application/ld+json");
  });
});
