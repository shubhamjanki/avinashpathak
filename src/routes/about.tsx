import { createFileRoute, Link } from "@tanstack/react-router";
import portraitAsset from "../assets/portrait-buttoning.jpeg.asset.json";
import library from "../assets/library.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Advocate Avinash Pathak" },
      { name: "description", content: "The biography, philosophy and milestones of Adv. Avinash Pathak — advocate, writer and civic campaigner practising before the Supreme Court of India." },
      { property: "og:title", content: "About Advocate Avinash Pathak" },
      { property: "og:description", content: "Advocate, writer, and counsel before the Supreme Court of India." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { year: "1997", title: "Born in Bundelkhand", body: "Roots in Lalitpur, Uttar Pradesh — a childhood shaped by the region's history and its unresolved questions." },
  { year: "2017 – 2020", title: "Corporate Law at ALS", body: "Formal legal training. Concurrent work with 119+ brands during college — a foundation in commercial practice." },
  { year: "2020 – 2023", title: "Own chambers in Jhansi", body: "Established an independent practice. First matters before the District Court and Allahabad High Court." },
  { year: "2023 – Now", title: "Supreme Court practice", body: "Regular appearances before the Supreme Court of India, alongside High Court and district practice." },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Biography</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          A lawyer who writes. A writer who litigates.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Avinash Pathak's practice sits at an uncommon intersection — the disciplined patience of writing books, and the immediate consequence of standing before a judge.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={portraitAsset.url} alt="Avinash Pathak" width={686} height={1024} loading="lazy" className="w-full" />
          <div className="mt-6 border-l border-gold pl-4">
            <p className="font-devanagari text-2xl leading-tight text-paper">
              कार्यालय अविनाश पाठक — लेखक व अधिवक्ता
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Office of Avinash Pathak — Writer & Advocate
            </p>
          </div>
        </div>
        <div className="md:col-span-7 space-y-8 text-base leading-[1.8] text-paper/85">
          <p>
            The chambers were formally established in 2020, but the work began much earlier. Through law school at ALS, Avinash was already consulting for over a hundred brands — an unusual apprenticeship that grounded him in the practical business of commercial law before he had a bar card.
          </p>
          <p>
            In parallel, another discipline: writing. Thirteen years of it. Nineteen published books on ecology, jurisprudence, history and civic thought. The tagline he keeps on his desk — <em>Writer to live for Earth</em> — is not a slogan; it is a working thesis.
          </p>
          <p>
            Today the practice covers criminal defence, corporate advisory, constitutional matters and human-rights litigation. He appears regularly before the Allahabad High Court and the Supreme Court of India, while continuing to run the office in Jhansi personally — no gatekeepers, no long chains between counsel and client.
          </p>
          <p>
            The founding conviction has not changed: <span className="text-paper">a lawyer's first client is the constitution</span>. Everything downstream — commercial retainers, criminal defence, PILs — flows from that.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-y border-border bg-midnight">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Milestones</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">The record so far.</h2>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-4">
            {TIMELINE.map(t => (
              <div key={t.year} className="bg-midnight p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{t.year}</div>
                <div className="mt-4 font-serif text-xl text-paper">{t.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="border-b border-border pb-8 mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Philosophy</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">How this practice works.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
            No gatekeepers, no long chains between counsel and client. Every matter is prepared
            personally, and every client is told honestly what the law can and cannot do for them.
          </p>
        </div>

        <div className="grid gap-px bg-border md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Preparation over performance",
              body: "Hearings are won in the reading, not the rhetoric. Files are worked in full before a single date is taken.",
            },
            {
              n: "02",
              title: "Plain language",
              body: "Clients receive a written note in language they can act on — no jargon, no vagueness about cost or timeline.",
            },
            {
              n: "03",
              title: "Access as principle",
              body: "A concessional rate exists for students, volunteers and clients of limited means. Legal advice should not be a luxury.",
            },
          ].map(c => (
            <div key={c.n} className="bg-midnight p-8 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{c.n}</div>
              <h3 className="mt-4 font-serif text-2xl text-paper leading-snug">{c.title}</h3>
              <p className="mt-4 text-base leading-[1.85] text-paper/80">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-px border border-border/60 bg-navy px-8 py-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-3">Working motto</p>
          <p className="font-serif text-2xl text-paper leading-snug">"Writer to live for Earth."</p>
          <p className="mt-3 text-sm text-muted-foreground">Adv. Avinash Pathak · Jhansi, India</p>
        </div>
      </section>


      {/* WRITING */}
      <section className="paper-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-6">
            <img src={library} alt="The library" width={1600} height={1000} loading="lazy" className="w-full" />
          </div>
          <div className="md:col-span-6 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">The Writer</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">Nineteen books, and still counting.</h2>
            <p className="mt-6 text-base leading-relaxed text-navy/80">
              Avinash's writing runs parallel to his practice — essays, monographs, and public philosophy on ecology, rights, and the future of the Indian civic imagination. The most read among them are the works around <em>The Great Aryan Dream</em> and <em>World Peace Treaty</em>.
            </p>
            <Link to="/books" className="mt-8 inline-flex items-center gap-2 border-b border-navy/40 pb-1 text-sm text-navy hover:border-navy w-fit">
              Browse the writings →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
