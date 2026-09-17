"use client";
import { useState } from "react";
import Image from "next/image";
import { Clapperboard, PenTool, Megaphone, Plus, X, Link2 } from "lucide-react";

const INTERESTS = [
  {
    id: 1,
    name: "Photography",
    animClass: "anim-shutter",
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-300 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="18.5" cy="9.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Videography",
    animClass: "anim-clap",
    icon: <Clapperboard className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-300 group-hover:text-white transition-colors" strokeWidth={1.5} />,
  },
  {
    id: 3,
    name: "Editing",
    animClass: "anim-scrub",
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-300 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="5" width="20" height="5" rx="1" strokeLinecap="round" />
        <rect x="2" y="13" width="20" height="5" rx="1" strokeLinecap="round" />
        <line x1="9" y1="5" x2="9" y2="10" strokeLinecap="round" />
        <line x1="15" y1="13" x2="15" y2="18" strokeLinecap="round" />
        <line x1="13" y1="2.5" x2="13" y2="21.5" strokeLinecap="round" strokeDasharray="2 1.5" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Graphic design",
    animClass: "anim-draw",
    icon: <PenTool className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-300 group-hover:text-white transition-colors" strokeWidth={1.5} />,
  },
  {
    id: 5,
    name: "Social media",
    animClass: "anim-ring",
    icon: <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-300 group-hover:text-white transition-colors" strokeWidth={1.5} />,
  },
];

export default function Home() {
  const [activePill, setActivePill] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    interest: "",
  });
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([""]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addLink = () => setPortfolioLinks((prev) => [...prev, ""]);
  const removeLink = (i: number) =>
    setPortfolioLinks((prev) => prev.filter((_, idx) => idx !== i));
  const updateLink = (i: number, val: string) =>
    setPortfolioLinks((prev) => prev.map((l, idx) => (idx === i ? val : l)));

  const handleInterestClick = (id: number, name: string) => {
    setActivePill(id);
    setFormData((prev) => ({ ...prev, interest: name }));
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Grab the URL from the .env.local file
    const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "";

    const data = new FormData();
    data.append("name", formData.name);
    data.append("enrollment", formData.enrollment);
    data.append("interest", formData.interest);
    data.append("portfolioLinks", portfolioLinks.filter(l => l.trim() !== "").join(", "));

    try {
      if (SCRIPT_URL && SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: data,
          mode: "no-cors",
        });
      } else {
        // Mock submission if URL isn't set yet
        console.warn("No Google Sheets webhook URL found in .env.local — mocking submission.");
        await new Promise((r) => setTimeout(r, 1000));
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section
        className="relative h-screen w-full flex flex-col justify-between p-8 md:p-14 lg:p-16 bg-black text-white font-sans antialiased overflow-hidden select-none"
        id="hero"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            alt="Dramatic studio spotlight on Canon EOS R5 camera surrounded by cameras on tripods"
            className="object-cover object-center"
            src="/hero.jpeg"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 h-full w-full flex flex-col justify-between">
          {/* Header */}
          <header className="flex items-start justify-between w-full" data-purpose="main-header">
            <div className="flex flex-col space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white cinematic-glow leading-none">
                Theia
              </h1>
              <p className="text-xs sm:text-sm md:text-base font-normal tracking-wide text-neutral-300/90 pl-0.5">
                Photography and Film society
              </p>
            </div>
            <nav aria-label="Main Navigation" className="flex items-center gap-3 md:gap-4">
              <a aria-label="Theia LinkedIn" className="social-pill" href="https://www.linkedin.com/company/theia-the-photography-society-of-srmuh/" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.02-3.28 1.64 1.64 0 0 0 .02 3.28M7.86 18.5V10.13H5.07V18.5h2.79Z" />
                </svg>
                <span className="relative z-10">Theia</span>
              </a>
              <a aria-label="Instagram thetheiamedia" className="social-pill" href="https://www.instagram.com/thetheiamedia/" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                <span className="relative z-10">thetheiamedia</span>
              </a>
            </nav>
          </header>

          {/* Footer CTA */}
          <footer className="flex flex-col md:flex-row items-end justify-between w-full gap-8 md:gap-4 pb-2">
            {/* Interest Selector */}
            <div className="flex flex-col items-start space-y-3 sm:space-y-4 self-start md:self-end">
              <h2 className="text-base sm:text-lg md:text-xl font-normal italic tracking-wide text-neutral-300/95">
                Whats your interest?
              </h2>
              <div aria-label="Interest Categories" className="flex flex-wrap items-center gap-3.5 sm:gap-4 relative" role="group">
                {INTERESTS.map((interest) => (
                  <div key={interest.id} className="relative group flex flex-col items-center">
                    <button
                      aria-label={interest.name}
                      className={`glass-circle relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 ${activePill === interest.id ? "ring-2 ring-white bg-white/40" : ""}`}
                      type="button"
                      onClick={() => handleInterestClick(interest.id, interest.name)}
                    >
                      <span className={interest.animClass}>{interest.icon}</span>
                    </button>
                    <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none border border-white/20">
                      {interest.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-end text-right space-y-2">
              <a
                aria-label="Auditions 2k26 - Apply Now"
                className="group flex flex-col items-end focus:outline-none cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white cinematic-glow transition-all duration-300 group-hover:text-neutral-200">
                  Auditions 2k26
                </div>
                <div className="inline-flex items-center gap-2 mt-1 text-xs sm:text-sm text-neutral-400 group-hover:text-white transition-colors duration-300 tracking-wider uppercase font-medium">
                  <span>Register &amp; Showcase Portfolio</span>
                  <div className="relative flex flex-col items-center ml-1">
                    <svg
                      className="w-4 h-4 animate-scroll-bounce text-neutral-400 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 5v14M5 13l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </footer>
        </div>
      </section>

      {/* ── REGISTRATION FORM SECTION ─────────────────────────── */}
      <section
        id="register"
        className="relative w-full bg-[#080808] text-white font-sans antialiased py-24 px-6 sm:px-12 md:px-20 lg:px-32"
      >
        {/* Subtle top gradient bleed from hero */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center leading-tight mb-4">
            Audition Registration {" "}
            <span className="text-neutral-400">Batch of 2k26</span>
          </h2>
          <p className="text-center text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-14 leading-relaxed">
            Step into the spotlight. Showcase your craft in photography, filmmaking,
            cinematography, and digital arts with Theia.
          </p>

          {/* ── FORM ────────────────────────────────────────────── */}
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">You&apos;re registered!</h3>
              <p className="text-neutral-400 text-center max-w-sm">
                We&apos;ve received your audition application. Keep an eye on your DMs — we&apos;ll be in touch soon.
              </p>
              <button
                className="mt-4 text-sm text-neutral-500 underline underline-offset-4 hover:text-white transition-colors"
                onClick={() => { setSubmitted(false); setFormData({ name: "", enrollment: "", interest: "" }); setPortfolioLinks([""]); }}
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              {/* Row 1: Name + Enrollment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="form-label" htmlFor="reg-name">
                    Full Name <span className="text-neutral-500">*</span>
                  </label>
                  <input
                    id="reg-name"
                    required
                    type="text"
                    className="form-input"
                    placeholder="e.g. Anuj Divedi"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>

                {/* Enrollment Number */}
                <div className="flex flex-col gap-2">
                  <label className="form-label" htmlFor="reg-enrollment">
                    Enrollment Number <span className="text-neutral-500">*</span>
                  </label>
                  <input
                    id="reg-enrollment"
                    required
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2024CSE1042"
                    value={formData.enrollment}
                    onChange={(e) => setFormData((p) => ({ ...p, enrollment: e.target.value }))}
                  />
                </div>
              </div>

              {/* Row 2: Interest dropdown */}
              <div className="flex flex-col gap-2">
                <label className="form-label" htmlFor="reg-interest">
                  Primary Craft / Interest <span className="text-neutral-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="reg-interest"
                    required
                    className="form-input appearance-none pr-10 cursor-pointer"
                    value={formData.interest}
                    onChange={(e) => setFormData((p) => ({ ...p, interest: e.target.value }))}
                  >
                    <option value="" disabled>Select your primary craft...</option>
                    {INTERESTS.map((i) => (
                      <option key={i.id} value={i.name}>{i.name}</option>
                    ))}
                  </select>
                  {/* Custom chevron */}
                  <svg
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Row 3: Portfolio Links */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="form-label">
                    Prior Work / Portfolio Links <span className="text-neutral-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addLink}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add another link
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {portfolioLinks.map((link, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex items-stretch flex-1 bg-white/[0.04] border border-white/10 rounded-lg overflow-hidden transition-colors focus-within:border-white/35 focus-within:bg-white/[0.07]">
                        <span className="flex items-center justify-center px-3 border-r border-white/10 shrink-0">
                          <Link2 className="w-4 h-4 text-neutral-500" />
                        </span>
                        <input
                          type="url"
                          className="flex-1 bg-transparent outline-none px-3 py-[0.8rem] text-sm text-white placeholder:text-neutral-600 min-w-0"
                          placeholder="Behance, Drive, YouTube, Instagram…"
                          value={link}
                          onChange={(e) => updateLink(i, e.target.value)}
                        />
                      </div>
                      {portfolioLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLink(i)}
                          aria-label="Remove link"
                          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-neutral-500 hover:text-white hover:border-white/30 transition-colors shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button type="submit" className="form-submit group" disabled={isSubmitting}>
                  <span className="relative z-10">
                    {isSubmitting ? "Submitting..." : "Submit Audition"}
                  </span>
                  {!isSubmitting && (
                    <svg
                      className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="w-full bg-[#080808] border-t border-white/5 py-8 px-6 sm:px-12 md:px-20 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold tracking-widest uppercase">Theia</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/thetheiamedia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/company/theia-the-photography-society-of-srmuh/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </>
  );
}
