import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const MMEssayEndMarkerPlugin: QuartzTransformerPlugin = () => {
  return {
    name: "MMEssayEndMarkerPlugin",
    htmlPlugins() {
      return [
        () => {
          return (tree, file) => {
            const signatureCode = file.data.frontmatter?.signatureCode as string | undefined
            if (!signatureCode) return

            visit(tree, "element", (node: any) => {
              if (
                (node.tagName === "hr" || node.tagName === "div") &&
                ("dataEndMarker" in node.properties || "data-end-marker" in node.properties)
              ) {
                node.tagName = "div"
                node.properties = {
                  ...node.properties,
                  class: "mm-signature-code",
                  className: ["mm-signature-code"],
                  // Direct inline style guarantee:
                  style: "font-family: var(--codeFont) !important; font-size: 0.8rem !important; font-weight: 700 !important; color: var(--darkgraymm) !important; margin: 2rem 0 !important; display: block !important;",
                }
                node.children = [
                  {
                    type: "text",
                    value: `⋮⋮⋮ ${signatureCode}`,
                  },
                ]
              }
            })
          }
        },
      ]
    },
  }
}