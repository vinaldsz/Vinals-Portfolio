// Central icon barrel. Deep-import lucide icons individually so the bundler only
// pulls the icons we actually use into the build graph — importing them by name
// from "lucide-react" drags in the entire ~1,500-icon catalog and turns
// `vite-react-ssg build` into a multi-minute crawl. See src/types/lucide.d.ts.
//
// Add icons here as phases need them, then import via `import { Foo } from "@/lib/icons"`.
export { default as Menu } from "lucide-react/dist/esm/icons/menu";
export { default as X } from "lucide-react/dist/esm/icons/x";
export { default as Github } from "lucide-react/dist/esm/icons/github";
export { default as Linkedin } from "lucide-react/dist/esm/icons/linkedin";
export { default as ArrowUp } from "lucide-react/dist/esm/icons/arrow-up";
export { default as Database } from "lucide-react/dist/esm/icons/database";
export { default as Cloud } from "lucide-react/dist/esm/icons/cloud";
export { default as Server } from "lucide-react/dist/esm/icons/server";
export { default as Cpu } from "lucide-react/dist/esm/icons/cpu";
