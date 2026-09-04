import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-steel">Section 404</p>
        <h1 className="mt-6 font-serif text-5xl">Not on the docket.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you were looking for isn't filed here.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm hover:border-paper"
        >
          Return to chambers →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl">An interruption in proceedings.</h1>
        <p className="mt-4 text-sm text-muted-foreground">Please try again in a moment.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center bg-paper px-5 py-2 text-sm text-navy hover:bg-paper/90"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center border border-paper/30 px-5 py-2 text-sm hover:bg-paper/5">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Advocate Avinash Pathak — Supreme Court Advocate, Jhansi" },
      { name: "description", content: "Chambers of Advocate Avinash Pathak. Supreme Court & High Court practice in criminal, corporate and constitutional law, based in Jhansi." },
      { name: "author", content: "Avinash Pathak" },
      { property: "og:title", content: "Advocate Avinash Pathak" },
      { property: "og:description", content: "Counsel with conviction. Advocacy with conscience. Chambers based in Jhansi, practising before the Supreme Court and High Courts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@theUHOHouse" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+Devanagari:wght@400;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/about", label: "About" },
  { to: "/practice", label: "Practice" },
  { to: "/books", label: "Writings" },
  { to: "/initiatives", label: "Initiatives" },
  { to: "/appointment", label: "Appointment" },
  { to: "/contact", label: "Contact" },
] as const;

function Seal({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`${className} inline-flex items-center justify-center border border-paper/40 font-serif leading-none text-paper`}
    >
      AP
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-navy/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-paper">
          <Seal className="h-10 w-10 shrink-0 text-sm tracking-[0.08em]" />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-serif text-base tracking-tight">Adv. Avinash Pathak</div>
            <div className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Advocate & Author · Jhansi</div>
          </div>
        </Link>


        <nav className="hidden lg:flex items-center justify-center gap-8">
          {NAV.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="font-sans text-[13px] tracking-wide text-paper/75 transition-colors hover:text-paper"
              activeProps={{ className: "text-paper" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/appointment"
            className="hidden sm:inline-flex items-center border border-paper/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-navy"
          >
            Book Consultation
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen(v => !v)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center border border-paper/30"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1">
              <div className="h-px w-4 bg-paper" />
              <div className="h-px w-4 bg-paper" />
              <div className="h-px w-4 bg-paper" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-navy px-6 py-4">
          <div className="flex flex-col gap-3">
            {NAV.map(item => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-sm text-paper/80 hover:text-paper">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Seal className="h-12 w-12 text-base tracking-[0.08em]" />
              <div className="font-serif text-lg">Avinash Pathak</div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Chambers of Advocate Avinash Pathak. Counsel before the Supreme Court of India and High Courts. Advocate, author and civic campaigner.
            </p>
            <p className="mt-6 font-devanagari text-lg text-paper/90">कार्यालय अविनाश पाठक — लेखक व अधिवक्ता</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Chambers</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map(n => <li key={n.to}><Link to={n.to} className="text-paper/80 hover:text-paper">{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Reach</div>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li>Jhansi, Bundelkhand</li>
              <li><a href="tel:+919305770340" className="hover:text-paper">+91 93057 70340</a></li>
              <li><a href="mailto:advocateavinashpathak@gmail.com" className="hover:text-paper break-words">advocateavinashpathak@gmail.com</a></li>
              <li><a href="https://twitter.com/theUHOHouse" target="_blank" rel="noreferrer" className="hover:text-paper">@theUHOHouse</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">© {new Date().getFullYear()} Adv. Avinash Pathak · All rights reserved</p>
          <p className="font-mono text-[11px] text-muted-foreground">Advocates & Solicitors · Bar Council of India</p>
        </div>
      </div>
    </footer>
  );
}

const WA_NUMBER = "919305770340";
const WA_MESSAGE = encodeURIComponent(
  "Hello, I'd like to book a consultation with Adv. Avinash Pathak."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse ring */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] animate-[wa-pulse_2s_ease-out_infinite]"
        style={{ animationDelay: "0.4s" }}
      />
      <a
        href={WA_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp to book an appointment"
        className="relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 shadow-lg
          transition-all duration-200
          hover:scale-105 hover:shadow-xl hover:bg-[#20c05a]
          active:scale-95
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        {/* Official WhatsApp speech-bubble icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-5 w-5 shrink-0"
          aria-hidden
          fill="none"
        >
          <path
            d="M16 2C8.268 2 2 8.268 2 16c0 2.478.674 4.797 1.848 6.79L2 30l7.41-1.824A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z"
            fill="white"
            fillOpacity=".15"
          />
          <path
            d="M16 4.5C9.596 4.5 4.5 9.596 4.5 16a11.44 11.44 0 0 0 1.69 6.01l.27.43-1.14 4.17 4.27-1.12.42.25A11.44 11.44 0 0 0 16 27.5c6.404 0 11.5-5.096 11.5-11.5S22.404 4.5 16 4.5Z"
            fill="white"
          />
          <path
            d="M21.5 18.86c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.63.14-.19.28-.72.91-.89 1.1-.16.18-.33.2-.61.07a7.72 7.72 0 0 1-2.27-1.4 8.5 8.5 0 0 1-1.57-1.95c-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.55-.46-.47-.63-.48l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.98.96-.98 2.34s1.01 2.72 1.15 2.9c.14.2 1.98 3.02 4.8 4.24.67.29 1.2.46 1.61.59.67.21 1.29.18 1.77.11.54-.08 1.67-.68 1.9-1.34.24-.66.24-1.23.17-1.34-.07-.12-.26-.19-.54-.33Z"
            fill="#25D366"
          />
        </svg>
        <span className="text-sm font-semibold text-white">Chat &amp; Book</span>
      </a>
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

import { FloatingSocials } from "../components/FloatingSocials";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
        <FloatingSocials />
      </div>
    </QueryClientProvider>
  );
}
