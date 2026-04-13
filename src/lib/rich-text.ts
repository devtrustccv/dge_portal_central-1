const ALLOWED_TAGS = new Set([
  "B",
  "STRONG",
  "I",
  "EM",
  "U",
  "UL",
  "OL",
  "LI",
  "P",
  "BR",
  "DIV",
])

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const sanitizeNode = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeHtml(node.textContent || "")
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return ""
  }

  const element = node as HTMLElement
  const tagName = element.tagName.toUpperCase()
  const children = Array.from(element.childNodes).map(sanitizeNode).join("")

  if (!ALLOWED_TAGS.has(tagName)) {
    return children
  }

  if (tagName === "BR") {
    return "<br>"
  }

  const normalizedTag = tagName === "DIV" ? "p" : tagName.toLowerCase()
  return `<${normalizedTag}>${children}</${normalizedTag}>`
}

export const sanitizeRichText = (value: string | undefined | null): string => {
  if (!value) return ""
  if (typeof window === "undefined") {
    return value
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(value, "text/html")
  return Array.from(doc.body.childNodes).map(sanitizeNode).join("").trim()
}

export const normalizeRichTextValue = (value: string | undefined | null): string => {
  if (!value) return ""

  const hasHtml = /<[^>]+>/.test(value)
  if (hasHtml) {
    return sanitizeRichText(value)
  }

  return escapeHtml(value).replace(/\n/g, "<br>")
}

export const stripRichText = (value: string | undefined | null): string => {
  if (!value) return ""
  if (typeof window === "undefined") {
    return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  }

  const container = document.createElement("div")
  container.innerHTML = normalizeRichTextValue(value)
  return (container.textContent || "").replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim()
}

export const isRichTextEmpty = (value: string | undefined | null): boolean => {
  return !stripRichText(value)
}

export const getRichTextTextLength = (value: string | undefined | null): number => {
  return stripRichText(value).length
}
