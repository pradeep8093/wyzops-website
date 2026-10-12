import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { footerNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div className="container-page relative pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <Link href="/" aria-label={`${siteConfig.name} — home`} className="inline-flex rounded-lg">
              <Logo />
            </Link>
            <p className="mt-5 text-lg font-medium tracking-[-0.02em] text-fg">{siteConfig.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              A technology consultancy and product studio — integration, AI, and product engineering by senior-led
              teams.
            </p>
            <p className="mt-3 text-sm text-subtle">
              Engineering teams in {siteConfig.location.country} · {siteConfig.location.servedRegion}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-6 inline-flex font-mono text-sm text-brand-sky underline-offset-4 hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 lg:col-span-5 lg:col-start-8">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="eyebrow text-subtle">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            {siteConfig.socials.length > 0 ? (
              <nav aria-label="Social">
                <h2 className="eyebrow text-subtle">Social</h2>
                <ul className="mt-5 space-y-3">
                  {siteConfig.socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wide">Build · Integrate · Automate</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden="true" className="pointer-events-none relative -mb-[0.22em] select-none">
        <p className="container-page bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-center text-[23vw] leading-none font-semibold tracking-[-0.06em] text-transparent lg:text-[17rem]">
          WyzOps
        </p>
      </div>
    </footer>
  );
}
