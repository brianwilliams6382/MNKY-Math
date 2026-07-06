import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "MNKY Math",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "mnkymath.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Zilla Slab",
        body: "Roboto Flex",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#afaeae",
          gray: "#6361618f",
          darkgray: "#3b3b3b",
          dark: "#1c1c1c",
          secondary: "#8b0000",
          tertiary: "#556b2f",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#aeecf5f5",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#ff4d4d",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      {
        name: "GrowthStageToTags",
        textTransform: (_ctx, src) => {
          // We only modify markdown files that have a frontmatter block
          if (typeof src === "string" && src.startsWith("---")) {
            const parts = src.split("---");
            if (parts.length >= 3) {
        let frontmatterText = parts[1];
        
        // 1. Detect if growth_stage exists in the text block
        if (frontmatterText.includes("growth_stage:")) {
          // Robust regex pulls out single-line arrays [seedling] or multi-line values
          const stageMatch = frontmatterText.match(/growth_stage:\s*([^\n]+)/);
          
          if (stageMatch && stageMatch[1]) {
            let stageValue = stageMatch[1].trim()
              .replace(/[\[\]\-\s"']/g, ""); // Strips brackets, quotes, dashes
            
            if (stageValue) {
              // 2. Inject this value right into the standard tags array dynamically
              if (frontmatterText.includes("tags:")) {
                // If tags block already exists, append our stage to it
                frontmatterText = frontmatterText.replace("tags:", `tags:\n  - ${stageValue}`);
              } else {
                // If no tags exist yet, create the block fresh
                frontmatterText += `\ntags:\n  - ${stageValue}`;
              }
              
              parts[1] = frontmatterText;
              return parts.join("---");
            }
          }
        }
      }
    }
    return src;
  }
},
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ 
        enableInHtmlEmbed: true, 
        enableWikiLinks: true,
        enableCodeBlocks: true 
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({fontOrigin: "googleFonts"}),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
