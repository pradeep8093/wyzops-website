import {
  Bot,
  Braces,
  Clock,
  Combine,
  Compass,
  Cpu,
  FileCheck,
  KeyRound,
  Moon,
  ShieldCheck,
  UserCheck,
  Users,
  Globe,
  Layers,
  MessagesSquare,
  Plug,
  Route,
  Search,
  Smartphone,
  Sparkles,
  Split,
  Target,
  Workflow,
  Zap,
  type LucideProps,
} from "lucide-react";

/**
 * Content files reference icons by key so the data stays serialisable
 * (and CMS-friendly). Add new keys here.
 */
const icons = {
  workflow: Workflow,
  globe: Globe,
  layers: Layers,
  smartphone: Smartphone,
  sparkles: Sparkles,
  messages: MessagesSquare,
  plug: Plug,
  zap: Zap,
  compass: Compass,
  bot: Bot,
  cpu: Cpu,
  search: Search,
  route: Route,
  target: Target,
  braces: Braces,
  split: Split,
  combine: Combine,
  users: Users,
  "user-check": UserCheck,
  clock: Clock,
  moon: Moon,
  key: KeyRound,
  "file-check": FileCheck,
  "shield-check": ShieldCheck,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.6} {...props} />;
}
