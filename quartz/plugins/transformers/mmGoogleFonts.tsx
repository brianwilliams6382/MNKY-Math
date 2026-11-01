import { QuartzTransformerPlugin } from "../types"

export const MMGoogleFonts: QuartzTransformerPlugin = () => {
  return {
    name: "MMGoogleFonts",
    externalResources() {
      return {
        additionalHead: [
          () => (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400..900&family=Rubik+Doodle+Shadow&display=swap"
              />
            </>
          ),
        ],
      }
    },
  }
}