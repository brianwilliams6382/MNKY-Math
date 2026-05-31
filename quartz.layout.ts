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
        Component.TagList(),
        Component.MMReadTime(),
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
         // A. Master Structural Filter: If it's a file, drop it immediately.
         const isFolderOnly = node.isFolder

        // B. Security Filter: Exclude the specific _reference directory container
        const isNotReference = node.displayName.toLowerCase() !== "_reference" && node.name !== "_reference"

        // C. Content Filter: Exclude any folder specifically tagged with explorerHide: true
        const isNotHidden = node.data?.frontmatter?.explorerHide !== true

        // D. Tags Exclusion: Exclude the default Quartz automated tags folder segment
        const isNotTags = node.slugSegment !== "tags"

        // Execute all conditions simultaneously. All must evaluate to true to appear in the sidebar.
        return isFolderOnly && isNotReference && isNotHidden && isNotTags
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
}

// Components for list pages (Tags, Folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
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
         // A. Master Structural Filter: If it's a file, drop it immediately.
         const isFolderOnly = node.isFolder

        // B. Security Filter: Exclude the specific _reference directory container
        const isNotReference = node.displayName.toLowerCase() !== "_reference" && node.name !== "_reference"

        // C. Content Filter: Exclude any folder specifically tagged with explorerHide: true
        const isNotHidden = node.data?.frontmatter?.explorerHide !== true

        // D. Tags Exclusion: Exclude the default Quartz automated tags folder segment
        const isNotTags = node.slugSegment !== "tags"

        // Execute all conditions simultaneously. All must evaluate to true to appear in the sidebar.
        return isFolderOnly && isNotReference && isNotHidden && isNotTags
      },
    }),
    Component.MMSidebarFooter({
      links: {
        github: "https://github.com/brianwilliams6382/MNKY-Math",
        linkedin: "https://www.linkedin.com/company/mnky-math/",
      }
    }),
  ],
  right: [],
}