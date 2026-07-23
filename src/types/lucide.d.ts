// lucide-react exposes every icon from one barrel entry (~1,500 icon modules).
// Importing named icons from "lucide-react" forces the bundler to crawl the whole
// catalog (~1,577 modules in this project), which makes `vite-react-ssg build`
// take minutes per pass. We deep-import individual icon modules instead (see
// src/lib/icons.ts). Those `dist/esm/icons/*` paths ship no type declarations, so
// this wildcard module maps each of them to lucide's `LucideIcon` type.
declare module "lucide-react/dist/esm/icons/*" {
  import type { LucideIcon } from "lucide-react";
  const icon: LucideIcon;
  export default icon;
}
