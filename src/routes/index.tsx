import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import portraitHero from "../assets/portrait-hero.jpg";
import portraitSecond from "../assets/portrait-second.jpg";
import tree from "../assets/tree.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Advocate Avinash Pathak — Chambers in Jhansi" },
      { name: "description", content: "Counsel with conviction. Advocacy with conscience. Practice before the Supreme Court of India and High Courts from Jhansi." },
      { property: "og:title", content: "Advocate Avinash Pathak" },
      { property: "og:description", content: "Counsel with conviction. Advocacy with conscience." },
    ],
  }),
  component: Index,
});

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="grid gap-px bg-border md:grid-cols-12">
      <div className="bg-navy p-8 md:col-span-4 flex flex-col justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Write In</p>
        <h3 className="mt-3 font-serif text-2xl text-paper">Send us a message.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Describe your matter in plain language. No legal jargon needed — we reply within one working day.
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          Your message is confidential and not shared with third parties.
        </p>
      </div>
      <div className="bg-midnight p-8 md:col-span-8">
        {sent ? (
          <div className="flex h-full flex-col justify-center py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Received</div>
            <h4 className="mt-3 font-serif text-2xl text-paper">Thank you — we have your message.</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              The chambers will respond within one working day. For urgent matters (bail, custody), call <a href="tel:+919305770340" className="text-paper hover:text-gold">+91 93057 70340</a> directly.
            </p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Your name" name="name" required />
              <FormField label="Email" name="email" type="email" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Phone / WhatsApp" name="phone" type="tel" />
              <FormField label="Country" name="country" placeholder="e.g. India, UK, UAE" />
            </div>
            <FormField label="Subject" name="subject" />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Your message</label>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                placeholder="Tell us about your matter in plain language…"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 bg-paper px-6 py-3 text-sm text-navy hover:bg-gold transition-colors"
            >
              Send message →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({
  label, name, type = "text", required = false, placeholder = "",
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-l border-border pl-4">
      <div className="font-serif text-3xl text-paper">{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    </div>
  );
}

const AREAS = [
  { n: "01", title: "Criminal Defence", desc: "Bail, trial and appellate representation in criminal matters across sessions and superior courts." },
  { n: "02", title: "Corporate & Commercial", desc: "Advisory and contentious work for founders, family businesses and industry across Bundelkhand." },
  { n: "03", title: "Constitutional & Rights", desc: "Writ petitions, PILs and human-rights matters before High Courts and the Supreme Court." },
  { n: "04", title: "Advisory & Retainer", desc: "Standing counsel arrangements for institutions, trusts and non-profit organizations." },
];

const FOUNDATIONS = [
  {
    name: "United Human Organization",
    hindiName: "संयुक्त मानव संघ",
    tagline: "Global Welfare & Youth Rights",
    description: "Worldwide civic and human-rights organization dedicated to youth leadership, constitutional rights, and public welfare.",
    url: "https://twitter.com/theUHOHouse",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=600&q=80",
    badge: "NGO · Since 2017",
  },
  {
    name: "Green Bharat, Great Bharat",
    hindiName: "ग्रीन भारत, ग्रेट भारत",
    tagline: "Plant a Tree on Your Birthday",
    description: "An environmental crusade empowering students and citizens across India to celebrate every birthday by planting a native tree.",
    url: "https://greenbharat.org",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&h=600&q=80",
    badge: "Ecology Movement",
  },
  {
    name: "Saturday for Society",
    hindiName: "शनिवार समाज के लिए",
    tagline: "Weekly Discipline of Civics",
    description: "Chambers dedicate every Saturday to community legal clinics, student book sessions, and localized civic problem solving.",
    url: "https://saturdayforsociety.org",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&h=600&q=80",
    badge: "Civic Initiative",
  },
  {
    name: "Pathak Temple Monastery",
    hindiName: "पाठक टेम्पल मार्शल आर्ट्स",
    tagline: "Discipline of Body & Mind",
    description: "Traditional monastery imparting free martial-arts, physical conditioning, and mental resilience training to regional youth.",
    url: "https://pathaktemple.org",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&h=600&q=80",
    badge: "Youth Academy",
  },
];

const SOCIALS = [
  {
    name: "YouTube Channel",
    handle: "@avinashpathak52",
    url: "https://www.youtube.com/@avinashpathak52",
    desc: "Official channel — legal discussions, public lectures, and civic movements.",
  },
  {
    name: "YouTube Vlogs",
    handle: "@avinashpathakvlogs",
    url: "https://www.youtube.com/@avinashpathakvlogs",
    desc: "Life in court, grassroots campaigns, travel, and personal reflections.",
  },
  {
    name: "Facebook",
    handle: "@sirAvinashPathak",
    url: "https://www.facebook.com/sirAvinashPathak",
    desc: "Speeches, updates, community events, and legal insights.",
  },
  {
    name: "Instagram",
    handle: "@avinashpathak52",
    url: "https://www.instagram.com/avinashpathak52",
    desc: "Personal feed — advocate's journey, writing, books, and nature drives.",
  },
  {
    name: "Office · theUHOHhouse",
    handle: "@theUHOHhouse",
    url: "https://www.instagram.com/theUHOHhouse",
    desc: "Official office channel — United Human Organization & chambers updates.",
  },
  {
    name: "X / Twitter",
    handle: "@avinashpathak52",
    url: "https://www.twitter.com/avinashpathak52",
    desc: "Daily commentary on law, policy, constitution, and civic welfare.",
  },
  {
    name: "LinkedIn",
    handle: "avinashpathak52",
    url: "https://www.linkedin.com/in/avinashpathak52",
    desc: "Professional updates, legal jurisprudence, articles, and chambers network.",
  },
  {
    name: "Blogspot",
    handle: "Notes & essays",
    url: "https://advocateavinashpathak.blogspot.com",
    desc: "Long-form essays on justice, ecology, history, and civic thought.",
  },
];

function SocialIcon({ name }: { name: string }) {
  if (name.includes("YouTube")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#FF0000]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#1877F2]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (name.includes("Instagram")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#E1306C]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#0A66C2]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (name === "X / Twitter") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-paper">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gold">
      <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h12V5H6zm2 2h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
    </svg>
  );
}

function Index() {
  return (
    <>
      {/* CREDENTIALS & MISSION BANNER */}
      <div className="border-b border-border bg-gradient-to-r from-midnight via-navy to-midnight py-3 px-6 text-center text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono text-[11px] text-paper/85">
          <span className="text-gold font-semibold tracking-wider">Adv. Avinash Pathak</span>
          <span className="text-steel">·</span>
          <span>Global Environment Activist</span>
          <span className="text-steel">·</span>
          <span>Top Writer &amp; Lawyer of Great Bharat</span>
          <span className="text-steel">·</span>
          <span>Founder, United Human Organization</span>
          <span className="text-steel">·</span>
          <span>Head, Saturday for Society Global Movement</span>
          <span className="text-steel">·</span>
          <span className="text-gold">The Great Aryan Dream 🇮🇳 🌳 📈</span>
        </div>
      </div>


      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-24">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
              Advocate · Supreme Court & High Courts
            </p>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-paper">
              Counsel with conviction.<br />
              <em className="text-gold/90">Advocacy</em> with conscience.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/75">
              Chambers of <span className="text-paper">Adv. Avinash Pathak</span> — eight years at the bar, thirteen years at the writing desk. Based in Jhansi; appearing before the Supreme Court and High Courts. <span className="text-paper">Online consultations available worldwide.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/appointment"
                className="group inline-flex items-center gap-3 bg-paper px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-gold"
              >
                Book a consultation
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                View the practice
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Stat n="8+" label="Yrs at the bar" />
              <Stat n="19+" label="Books authored" />
              <Stat n="46" label="Districts covered" />
              <Stat n="2020" label="Chambers opened" />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative">
              <div className="absolute -inset-4 border border-border" aria-hidden />
              <img
                src={portraitHero}
                alt="Advocate Avinash Pathak"
                width={1024}
                height={1280}
                className="relative w-full grayscale-[.15] contrast-[1.05]"
              />
              <div className="absolute -bottom-6 -left-6 bg-navy px-5 py-4 border border-border">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">In Chambers</div>
                <div className="mt-1 font-serif text-lg text-paper">Avinash Pathak</div>
                <div className="font-mono text-[10px] text-gold">Advocate · Writer · Jhansi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials strip */}
        <div className="border-y border-border">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>Supreme Court of India</span>
            <span className="text-steel">·</span>
            <span>Allahabad High Court</span>
            <span className="text-steel">·</span>
            <span>District Court Jhansi</span>
            <span className="text-steel">·</span>
            <span>Bar Council of U.P.</span>
            <span className="text-steel">·</span>
            <span className="text-gold">Online · Worldwide</span>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-8 border-b border-border pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Practice</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">Areas of counsel</h2>
          </div>
          <Link to="/practice" className="hidden md:inline-flex items-center gap-2 text-sm text-paper/70 hover:text-paper">
            All practice areas →
          </Link>
        </div>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map(a => (
            <Link
              key={a.n}
              to="/practice"
              className="group flex flex-col justify-between bg-navy p-8 transition-colors hover:bg-midnight"
            >
              <div>
                <div className="font-mono text-xs text-gold">{a.n}</div>
                <h3 className="mt-6 font-serif text-2xl text-paper">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
              <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 transition-colors group-hover:text-gold">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CHAPTERS — the practice so far */}
      <section className="border-y border-border bg-midnight overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">

          {/* Header */}
          <FadeIn className="mb-14 border-b border-border pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">The Record</p>
            <h2 className="mt-3 font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-paper">
              One lawyer, one long argument.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/65">
              From a district-court brief in Jhansi to regular appearances before the Supreme
              Court of India — a practice built slowly, on preparation rather than publicity.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm text-paper/70 hover:text-paper hover:border-paper"
            >
              Read the full biography →
            </Link>
          </FadeIn>

          {/* Chapters */}
          <div className="space-y-px">
            {[
              {
                n: "01",
                title: "Early Years",
                period: "2017 – 2020",
                left: "Through law school at ALS, Avinash Pathak was already advising over 119 brands across sectors — an extraordinary volume of commercial legal work for a student.",
                right: "Parallel to the legal work, thirteen years of continuous authorship produced nineteen books spanning ecology, jurisprudence, history and civic philosophy — not separate from the law, but the long form of the same argument.",
                quote: "\u201cA lawyer's first client is the constitution.\u201d",
              },
              {
                n: "02",
                title: "The Chambers",
                period: "2020 – 2023",
                left: "Chambers opened in Jhansi, near Bundelkhand University — a practice designed to make careful counsel accessible beyond traditional fee structures.",
                right: "Work grew from the District Court Jhansi to the Allahabad High Court, and by 2023 to a regular presence before the Supreme Court of India, across criminal, commercial and constitutional matters.",
                quote: null,
              },
              {
                n: "03",
                title: "Writing",
                period: "2012 – Present",
                left: "Nineteen published books across ecology, jurisprudence, memoir and civic thought — written alongside a full litigation practice, never instead of it.",
                right: "The working tagline, Writer to live for Earth, is a thesis rather than a slogan: that argument on the page and argument in court are the same civic act.",
                quote: null,
              },
              {
                n: "04",
                title: "Beyond the Court",
                period: "2020 – Present",
                left: "Plant a tree on your birthday — a campaign of disarming simplicity, run through schools and neighbourhoods across Bundelkhand.",
                right: "Saturday for Society keeps every Saturday for the community: legal-aid camps, tree planting, and free readings for young students of law.",
                quote: null,
              },
            ].map((ch, i) => (
              <FadeIn key={ch.n} delay={i * 80} className="grid gap-px bg-border md:grid-cols-12">
                <div className="bg-midnight p-8 md:p-10 md:col-span-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Chapter {ch.n}</div>
                  <div className="mt-4 font-serif text-2xl text-paper leading-snug">{ch.title}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{ch.period}</div>
                  <div className="mt-8 h-px w-12 bg-gold/40" />
                </div>
                <div className="bg-navy/40 p-8 md:p-10 md:col-span-9 space-y-4 text-base leading-[1.85] text-paper/80">
                  <p>{ch.left}</p>
                  <p>{ch.right}</p>
                  {ch.quote && (
                    <blockquote className="border-l-2 border-gold pl-5 mt-2 font-serif text-xl text-paper italic">
                      {ch.quote}
                    </blockquote>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Motto banner */}
          <FadeIn delay={320} className="mt-px bg-navy border border-border/60 px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-gold shrink-0" />
              <p className="font-serif text-xl text-paper italic">"Writer to live for Earth."</p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground shrink-0">
              Adv. Avinash Pathak · Jhansi, India
            </p>
          </FadeIn>
        </div>
      </section>


      {/* PHILOSOPHY / PULL QUOTE */}
      <section className="paper-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={portraitSecond} alt="Advocate Avinash Pathak outside the court" width={1280} height={1920} loading="lazy" className="w-full object-cover" />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">The Chambers</p>
            <blockquote className="mt-6 font-serif text-3xl leading-[1.25] md:text-4xl text-navy">
              "Law is not a profession I chose to earn from. It is an instrument — used well, it protects the smallest voice; used badly, it silences the loudest. My chambers exist for the former."
            </blockquote>
            <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-midnight">— Avinash Pathak</div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/about" className="inline-flex items-center gap-3 bg-navy px-6 py-3 text-sm text-paper hover:bg-midnight">
                Read the biography →
              </Link>
              <Link to="/books" className="inline-flex items-center gap-2 border-b border-navy/40 pb-1 text-sm text-navy hover:border-navy">
                Explore the writings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Beyond the courtroom</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">
              A practice that plants trees, publishes books, and organises Saturdays.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Alongside the practice run three commitments — <em>Green Bharat, Great Bharat</em>, the <em>Saturday for Society</em> movement, and free martial-arts training for young people in the region. Advocacy, in its widest sense.
            </p>
            <Link to="/initiatives" className="mt-8 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm hover:border-paper">
              Read the initiatives →
            </Link>
          </div>
          <div className="relative">
            <img src={tree} alt="Plant a tree on your birthday" width={1200} height={900} loading="lazy" className="w-full grayscale-[.2]" />
            <div className="absolute bottom-4 left-4 bg-navy/90 px-4 py-3 border border-border">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Movement</div>
              <div className="mt-1 font-serif text-lg text-paper">Plant a tree on your birthday</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDATIONS & MOVEMENTS */}
      <section className="relative border-t border-border bg-navy py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/70 pb-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Civic Ecosystem</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">Foundations &amp; Movements</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/75">
                  Institutions established by Adv. Avinash Pathak — working continuously for ecological preservation, community legal aid, youth discipline, and human rights. Click any circular foundation to visit its site.
                </p>
              </div>
              <div className="font-mono text-xs text-gold/80 uppercase tracking-widest hidden md:block">
                Click circle to open site ↗
              </div>
            </div>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDATIONS.map((f, i) => (
              <FadeIn key={f.name} delay={i * 100} className="flex flex-col items-center text-center">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit official site of ${f.name}`}
                  className="group relative flex flex-col items-center w-full focus:outline-none"
                >
                  {/* Circular Image Frame */}
                  <div className="relative h-44 w-44 sm:h-48 sm:w-48 rounded-full p-1.5 ring-2 ring-gold/40 transition-all duration-300 group-hover:ring-4 group-hover:ring-gold group-hover:shadow-[0_0_35px_rgba(212,175,55,0.3)]">
                    <div className="h-full w-full overflow-hidden rounded-full bg-midnight relative">
                      <img
                        src={f.image}
                        alt={f.name}
                        width={400}
                        height={400}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[.15] transition-transform duration-500 group-hover:scale-110 group-hover:grayscale-0"
                      />
                      {/* Hover Overlay with Icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-navy/65 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <ExternalLink className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/50 bg-navy px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold shadow-md">
                      {f.badge}
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="mt-8 flex flex-col items-center">
                    <h3 className="font-serif text-xl text-paper transition-colors group-hover:text-gold">
                      {f.name}
                    </h3>
                    <p className="mt-1 font-devanagari text-sm text-gold/90">
                      {f.hindiName}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {f.tagline}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-paper/70 max-w-[260px]">
                      {f.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold/90 transition-all duration-200 group-hover:translate-x-1 group-hover:text-gold">
                      Open Site <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="paper-section border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-steel">Connect</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-navy">Follow the work.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-midnight/80">
              Join the conversation across platforms — daily notes from court, essays on justice, and the movements growing out of Bundelkhand.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {SOCIALS.map((s, i) => (
              <FadeIn key={s.name} delay={i * 80} className="group bg-paper transition-colors hover:bg-navy/[0.03]">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${s.name} profile`}
                  className="block h-full p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-navy/20 text-navy transition-colors group-hover:border-gold group-hover:text-gold">
                    <SocialIcon name={s.name} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-navy">{s.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{s.handle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-midnight/80">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60 transition-colors group-hover:text-gold">
                    Visit profile →
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + MAP + FORM */}
      <section className="border-t border-border bg-midnight">
        <div className="mx-auto max-w-7xl px-6 py-20">

          {/* Section header */}
          <div className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Get in Touch</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">Visit, write, or call.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Chambers near Bundelkhand University, Jhansi. In-person and online consultations available — clients welcome from anywhere in the world.
            </p>
          </div>

          {/* Map + details row */}
          <div className="grid gap-px bg-border md:grid-cols-12 mb-px">
            {/* Map */}
            <div className="md:col-span-7 overflow-hidden">
              <div className="border-b border-border bg-navy px-5 py-2.5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Find Us · Jhansi, UP</span>
                <a
                  href="https://www.google.com/maps/search/Bundelkhand+University,+Jhansi"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50 hover:text-gold"
                >
                  Open in Maps →
                </a>
              </div>
              <iframe
                title="Chambers of Adv. Avinash Pathak — near Bundelkhand University, Jhansi"
                src="https://maps.google.com/maps?q=Bundelkhand+University+Jhansi+Uttar+Pradesh+India&z=15&output=embed"
                width="100%"
                height="340"
                className="block w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Contact details */}
            <div className="bg-navy p-8 md:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Address</div>
                  <div className="mt-2 font-serif text-lg text-paper leading-snug">
                    Chambers of Adv. Avinash Pathak<br />
                    Near Bundelkhand University, Jhansi<br />
                    Uttar Pradesh, India
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Hours</div>
                  <div className="mt-2 font-serif text-lg text-paper">Mon – Sat · 10:00 – 16:00</div>
                  <div className="mt-1 text-xs text-muted-foreground">Bail matters 15:00 – 16:00</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Direct line</div>
                  <a href="tel:+919305770340" className="mt-2 block font-serif text-lg text-paper hover:text-gold">+91 93057 70340</a>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Email</div>
                  <a href="mailto:advocateavinashpathak@gmail.com" className="mt-2 block text-sm text-paper/80 hover:text-gold break-all">advocateavinashpathak@gmail.com</a>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/appointment" className="inline-flex items-center gap-2 bg-paper px-5 py-2.5 text-sm text-navy hover:bg-gold">
                  Book consultation →
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-paper/30 px-5 py-2.5 text-sm text-paper hover:bg-paper/5">
                  Full contact page
                </Link>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
