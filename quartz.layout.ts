import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// User-defined shared components (Header, Footer, etc.)
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.MMFooter(),
}

// Components for content pages (Articles, About, Home)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({
      spacerSymbol: ">", // Custom symbol to separate breadcrumb items
      rootName: "",
      }),    
    Component.TagList(),
    Component.MMReadTime(),
    Component.MMLinkedInBridge(),
  ],
  left: [
    Component.MMPageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer({
      // Keep your preferred click behaviors intact here
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      useSavedState: true,
  
     /* THE UNIFIED FILTER ENGINE */
    filterFn: (node) => {
        // 1. EXTRACT ALL POTENTIAL IDENTIFIERS
        const folderName = node.name?.toLowerCase() ?? ""
        const segmentName = node.slugSegment?.toLowerCase() ?? ""
  
        // Extract file frontmatter safely (will be undefined for pure folder directory nodes)
        const frontmatter = node.file?.frontmatter
        const fileSlug = node.file?.slug?.toLowerCase() ?? ""

        // 2. FRONTMATTER OVERRIDE (FOR FILES)
        // If it's a file and explicitly marked to hide, drop it instantly
        if (frontmatter) {
        if (frontmatter.explorerDisplay === false || frontmatter.explorerHide === true) {
        return false
        }
      }

        // 3. HARD CRITERIA A: EXCLUDE "_REFERENCE" (FOLDERS + FILES)
        // Drops the folder directory, the segment path, or any file residing inside it
        if (
        folderName === "_reference" || 
        segmentName === "_reference" || 
        fileSlug.startsWith("_reference/")
        ) {
        return false
        }

      // 4. HARD CRITERIA B: EXCLUDE AUTOMATED TAGS GRID
      if (segmentName === "tags" || fileSlug.startsWith("tags/")) {
      return false
      }

      // If it survives all the filters above, let it display in the Explorer sidebar tree
      return true
    },
    }),
    
    Component.MMSidebarFooter({ // New component at the bottom of the left column
      links: {
        github: "https://github.com/brianwilliams6382/MNKY-Math",
      linkedin: "https://www.linkedin.com/company/mnky-math/",
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],

  afterBody: [
    Component.MMLinkedInFooter(), // New component at the very end of the content
    Component.MMJourneyNav(), // New component at the very end of the content
  ]
}

// Components for list pages (Tags, Folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({
      spacerSymbol: ">", // Custom symbol to separate breadcrumb items
      rootName: "",
      }),
    Component.MMReadTime(),
    Component. ArticleTitle(),
    ],
  left: [
    Component.MMPageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer({
      // Keep your preferred click behaviors intact here
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      useSavedState: true,
  
     /* THE UNIFIED FILTER ENGINE */
    filterFn: (node) => {
        // 1. EXTRACT ALL POTENTIAL IDENTIFIERS
        const folderName = node.name?.toLowerCase() ?? ""
        const segmentName = node.slugSegment?.toLowerCase() ?? ""
  
        // Extract file frontmatter safely (will be undefined for pure folder directory nodes)
        const frontmatter = node.file?.frontmatter
        const fileSlug = node.file?.slug?.toLowerCase() ?? ""

        // 2. FRONTMATTER OVERRIDE (FOR FILES)
        // If it's a file and explicitly marked to hide, drop it instantly
        if (frontmatter) {
        if (frontmatter.explorerDisplay === false || frontmatter.explorerHide === true) {
        return false
        }
      }

        // 3. HARD CRITERIA A: EXCLUDE "_REFERENCE" (FOLDERS + FILES)
        // Drops the folder directory, the segment path, or any file residing inside it
        if (
        folderName === "_reference" || 
        segmentName === "_reference" || 
        fileSlug.startsWith("_reference/")
        ) {
        return false
        }

      // 4. HARD CRITERIA B: EXCLUDE AUTOMATED TAGS GRID
      if (segmentName === "tags" || fileSlug.startsWith("tags/")) {
      return false
      }

      // If it survives all the filters above, let it display in the Explorer sidebar tree
      return true
    },
    }),

    Component.MMSidebarFooter({
      links: {
        github: "https://github.com/brianwilliams6382/MNKY-Math",
        linkedin: "https://www.linkedin.com/company/mnky-math/",
      }
    }),
  ],
  right: [
    Component.DesktopOnly(Component.Spacer()),
    Component.Backlinks(),
  ],

  afterBody: [
    Component.MMJourneyNav(), // New component at the very end of the content
  ]
}