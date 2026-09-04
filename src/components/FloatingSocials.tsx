import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube, ChevronRight } from "lucide-react";

export function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed left-0 top-1/2 z-50 flex -translate-y-1/2 items-center transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative flex flex-col gap-3 rounded-r-2xl border border-l-0 border-border/40 bg-white/95 backdrop-blur-md p-2.5 py-4 shadow-[4px_0_24px_rgba(0,0,0,0.12)]">
        {/* WhatsApp */}
        <a
          href="https://wa.me/919305770340"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp (+91 93057 70340)"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-5 w-5"
            aria-hidden
            fill="none"
          >
            <path
              d="M16 4.5C9.596 4.5 4.5 9.596 4.5 16a11.44 11.44 0 0 0 1.69 6.01l.27.43-1.14 4.17 4.27-1.12.42.25A11.44 11.44 0 0 0 16 27.5c6.404 0 11.5-5.096 11.5-11.5S22.404 4.5 16 4.5Z"
              fill="white"
            />
            <path
              d="M21.5 18.86c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.63.14-.19.28-.72.91-.89 1.1-.16.18-.33.2-.61.07a7.72 7.72 0 0 1-2.27-1.4 8.5 8.5 0 0 1-1.57-1.95c-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.55-.46-.47-.63-.48l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.98.96-.98 2.34s1.01 2.72 1.15 2.9c.14.2 1.98 3.02 4.8 4.24.67.29 1.2.46 1.61.59.67.21 1.29.18 1.77.11.54-.08 1.67-.68 1.9-1.34.24-.66.24-1.23.17-1.34-.07-.12-.26-.19-.54-.33Z"
              fill="#25D366"
            />
          </svg>
        </a>

        {/* YouTube Main Channel */}
        <a
          href="https://www.youtube.com/@avinashpathak52"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube Channel (@avinashpathak52)"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <Youtube className="h-5 w-5" strokeWidth={2.2} />
        </a>

        {/* YouTube Vlogs */}
        <a
          href="https://www.youtube.com/@avinashpathakvlogs"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube Vlogs (@avinashpathakvlogs)"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#CC0000] text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <Youtube className="h-5 w-5" strokeWidth={2.2} />
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-navy text-[8px] font-bold text-gold ring-1 ring-white">
            V
          </span>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/sirAvinashPathak"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook (@sirAvinashPathak)"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <Facebook className="h-5 w-5" strokeWidth={2} fill="currentColor" />
        </a>

        {/* Instagram Avinash Pathak */}
        <a
          href="https://www.instagram.com/avinashpathak52"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram (@avinashpathak52)"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <Instagram className="h-5 w-5" strokeWidth={2} />
        </a>

        {/* Instagram theUHOHhouse */}
        <a
          href="https://www.instagram.com/theUHOHhouse"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram Office (@theUHOHhouse)"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <Instagram className="h-5 w-5" strokeWidth={2} />
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-navy text-[8px] font-bold text-gold ring-1 ring-white">
            O
          </span>
        </a>

        {/* X / Twitter */}
        <a
          href="https://www.twitter.com/avinashpathak52"
          target="_blank"
          rel="noreferrer"
          aria-label="X / Twitter (@avinashpathak52)"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/avinashpathak52"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn (avinashpathak52)"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-sm transition-transform hover:scale-115 hover:shadow-md"
        >
          <Linkedin className="h-5 w-5" strokeWidth={2} fill="currentColor" />
        </a>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-10 top-1/2 flex h-14 w-10 -translate-y-1/2 items-center justify-center rounded-r-xl border border-l-0 border-border/40 bg-white text-navy shadow-[4px_0_12px_rgba(0,0,0,0.08)] focus:outline-none md:hidden"
        aria-label="Toggle Social Links"
      >
        <ChevronRight
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
