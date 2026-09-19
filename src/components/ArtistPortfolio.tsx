import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Cat,
  Check,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Menu,
  Moon,
  Palette,
  Pencil,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { Button } from "./Button";
import { artistPortrait, artworks, type Artwork } from "@/data/artworks";

const navItems = ["About", "Artwork", "Commissions", "Services", "Contact"];

function BrandMark() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="Precious Angel Lopez, home">
      <span className="grid size-9 place-items-center rounded-full border border-current font-display text-lg italic transition-transform group-hover:-rotate-6">P</span>
      <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] sm:block">Precious Angel Lopez</span>
    </a>
  );
}

function Header({ dark, onTheme }: { dark: boolean; onTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled ? "border-border bg-background/88 py-3 shadow-soft backdrop-blur-xl" : "border-transparent py-5"}`}>
      <div className="page-shell flex items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="icon" onClick={onTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button asChild className="hidden sm:inline-flex"><a href="#commission-form">Commission me <ArrowDownRight size={17} /></a></Button>
          <Button variant="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="page-shell mt-3 flex flex-col border-t border-border bg-background py-5 lg:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="border-b border-border py-4 font-display text-3xl">{item}</a>)}
        </nav>
      )}
    </header>
  );
}

function SectionTitle({ kicker, title, align = "left" }: { kicker: string; title: string; align?: "left" | "center" }) {
  return <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}><p className="eyebrow">{kicker}</p><h2 className="section-title mt-5">{title}</h2></div>;
}

function ArtworkGallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Artwork | null>(null);
  const categories = ["All", "Graphite", "Painted Portrait"];
  const visible = useMemo(() => filter === "All" ? artworks : artworks.filter((art) => art.category === filter), [filter]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      const index = artworks.findIndex((art) => art.id === selected.id);
      const next = artworks[(index + 1) % artworks.length];
      const previous = artworks[(index - 1 + artworks.length) % artworks.length];
      if (event.key === "ArrowRight" && next) setSelected(next);
      if (event.key === "ArrowLeft" && previous) setSelected(previous);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [selected]);

  const step = (amount: number) => {
    if (!selected) return;
    const index = artworks.findIndex((art) => art.id === selected.id);
    const next = artworks[(index + amount + artworks.length) % artworks.length];
    if (next) setSelected(next);
  };

  return (
    <section id="artwork" className="section-space scroll-mt-20">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-8 md:flex-row md:items-end">
          <SectionTitle kicker="Selected work · 2024–2026" title="Portraits made to hold a memory." />
          <div className="flex flex-wrap gap-2" aria-label="Filter artwork">
            {categories.map((category) => <Button key={category} variant={filter === category ? "primary" : "ghost"} onClick={() => setFilter(category)}>{category}</Button>)}
          </div>
        </div>
        <div className="art-grid mt-12">
          {visible.map((art, index) => (
            <button key={art.id} type="button" onClick={() => setSelected(art)} className={`art-piece group text-left ${index === 0 ? "featured" : ""}`}>
              <span className="art-image-wrap">
                <img src={art.image} alt={art.alt} width={art.width} height={art.height} loading="lazy" className="art-image" />
                <span className="art-overlay"><span>View artwork</span><ArrowDownRight size={24} /></span>
              </span>
              <span className="mt-4 flex items-start justify-between gap-4">
                <span><strong className="block font-display text-2xl font-normal">{art.title}</strong><small className="mt-1 block text-muted-foreground">{art.medium}</small></span>
                <span className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">0{art.id}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="mt-10 border-l-2 border-highlight pl-4 text-sm text-muted-foreground">Every work shown here is an original piece by Precious. No AI-generated imagery is included.</p>
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}>
          <Button variant="icon" className="absolute right-5 top-5" onClick={() => setSelected(null)} aria-label="Close artwork"><X /></Button>
          <Button variant="icon" className="absolute left-4 top-1/2 -translate-y-1/2" onClick={() => step(-1)} aria-label="Previous artwork"><ChevronLeft /></Button>
          <figure className="max-h-[86vh] max-w-[82vw] text-center">
            <img src={selected.image} alt={selected.alt} width={selected.width} height={selected.height} className="max-h-[76vh] max-w-full object-contain shadow-deep" />
            <figcaption className="mt-4 font-display text-2xl text-primary-foreground">{selected.title} <span className="ml-3 font-sans text-sm text-primary-foreground/65">{selected.medium}</span></figcaption>
          </figure>
          <Button variant="icon" className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => step(1)} aria-label="Next artwork"><ChevronRight /></Button>
        </div>
      )}
    </section>
  );
}

function CommissionForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSent(true);
  };
  if (sent) return <div className="success-panel"><span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></span><h3 className="mt-7 font-display text-4xl">Your idea is ready.</h3><p className="mt-3 max-w-md text-muted-foreground">This preview saved nothing and sent no message. Add a real contact destination before publishing the form.</p><Button className="mt-7" onClick={() => setSent(false)}>Send another inquiry</Button></div>;
  return (
    <form onSubmit={submit} className="form-grid">
      <label><span>Name *</span><input name="name" required placeholder="Your full name" /></label>
      <label><span>Email *</span><input name="email" type="email" required placeholder="you@example.com" /></label>
      <label><span>Commission type *</span><select name="type" required defaultValue=""><option value="" disabled>Select a type</option><option>Portrait</option><option>Character art</option><option>Pet illustration</option><option>Custom artwork</option></select></label>
      <label><span>Art style *</span><select name="style" required defaultValue=""><option value="" disabled>Select a style</option><option>Graphite</option><option>Painted portrait</option><option>Open to suggestion</option></select></label>
      <label className="wide"><span>Description / idea *</span><textarea name="idea" required rows={4} placeholder="Tell Precious what you have in mind…" /></label>
      <label><span>Preferred deadline</span><input name="deadline" type="date" /></label>
      <label><span>Budget range *</span><select name="budget" required defaultValue=""><option value="" disabled>Select your range</option><option>Under ₱1,500</option><option>₱1,500–₱3,000</option><option>₱3,000–₱5,000</option><option>₱5,000+</option></select></label>
      <label className="wide upload"><ImagePlus size={22} /><span>Reference image</span><input name="reference" type="file" accept="image/*" /></label>
      <label className="wide"><span>Additional notes</span><textarea name="notes" rows={3} placeholder="Anything else Precious should know?" /></label>
      <div className="wide flex flex-col items-start justify-between gap-5 border-t border-border pt-7 sm:flex-row sm:items-center"><p className="max-w-sm text-xs leading-5 text-muted-foreground">Submitting opens the confirmation preview only. A contact destination has not yet been provided.</p><Button type="submit">Submit request <ArrowRight size={17} /></Button></div>
    </form>
  );
}

export function ArtistPortfolio() {
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <Header dark={dark} onTheme={() => setDark(!dark)} />
      <main>
        <section id="home" className="hero-section">
          <div className="hero-word" aria-hidden="true">PRECIOUS</div>
          <div className="page-shell relative grid min-h-[92vh] items-end gap-8 pb-14 pt-28 lg:grid-cols-[1.1fr_.8fr] lg:pb-20">
            <div className="relative z-10 pb-4">
              <p className="eyebrow">Artist · Illustrator · Creative</p>
              <h1 className="hero-title mt-7">Art made<br />with <em>feeling.</em></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">Portraits and custom creations shaped with patience, personality, and a careful eye for the people behind every story.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Button asChild><a href="#artwork">View artwork <ArrowDownRight size={18} /></a></Button><Button asChild variant="outline"><a href="#commission-form">Start a commission</a></Button></div>
            </div>
            <div className="hero-art">
              <div className="hero-frame"><img src={artistPortrait} alt="Precious Angel Lopez, artist and illustrator" width={768} height={768} className="h-full w-full object-cover" /></div>
              <div className="hero-note"><Pencil size={15} /><span>Drawing stories<br />one line at a time.</span></div>
              <span className="hero-index">PAL / 01</span>
            </div>
          </div>
        </section>

        <section className="statement-band"><div className="page-shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between"><p className="font-display text-3xl md:max-w-3xl md:text-5xl">A portrait can be more than a likeness. It can become a keepsake.</p><Cat className="hidden text-highlight md:block" size={48} strokeWidth={1.2} /></div></section>

        <ArtworkGallery />

        <section id="commissions" className="section-space bg-ink text-paper scroll-mt-20">
          <div className="page-shell">
            <SectionTitle kicker="Open for commissions" title="Your people, pets, and imagined worlds—made personal." />
            <div className="mt-16 grid border-y border-paper/20 md:grid-cols-2 lg:grid-cols-4">
              {["Portraits", "Character Art", "Pet Illustrations", "Custom Artwork"].map((item, index) => <div className="commission-type" key={item}><span>0{index + 1}</span><h3>{item}</h3><ArrowDownRight /></div>)}
            </div>
            <div className="mt-20 grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
              <div><p className="eyebrow text-paper/55">How it works</p><h3 className="mt-5 font-display text-5xl">From first thought to final mark.</h3></div>
              <ol className="process-list">{[["01", "Submit your idea", "Share your vision, references, and preferred style."], ["02", "Discuss & confirm", "We shape the scope, schedule, and final direction."], ["03", "Sketch", "An early draft gives the composition room to breathe."], ["04", "Final artwork", "Your approved piece is refined and prepared with care."]].map(([n,t,d]) => <li key={n}><span>{n}</span><div><h4>{t}</h4><p>{d}</p></div></li>)}</ol>
            </div>
          </div>
        </section>

        <section id="services" className="section-space scroll-mt-20"><div className="page-shell"><SectionTitle kicker="Studio offering" title="Thoughtful work, shaped around your story." /><div className="services-list mt-14">{[[Palette,"Digital illustration","Expressive color, texture, and character-led storytelling."],[Pencil,"Graphite portraiture","Careful tonal work that catches likeness and quiet detail."],[Sparkles,"Character design","Original personalities and visual worlds built from your idea."],[Cat,"Pet art","Distinctive portraits that celebrate beloved companions."]].map(([Icon,title,text],i) => { const I = Icon as typeof Palette; return <article key={String(title)}><span>0{i+1}</span><I /><h3>{String(title)}</h3><p>{String(text)}</p></article>})}</div></div></section>

        <section id="about" className="about-section scroll-mt-20"><div className="page-shell grid gap-12 lg:grid-cols-2 lg:items-center"><div className="about-image"><img src={artistPortrait} alt="Precious Angel Lopez" width={768} height={768} loading="lazy" /><span className="signature">Precious</span></div><div className="lg:pl-12"><p className="eyebrow">Meet the artist</p><h2 className="section-title mt-5">Curiosity in every line.</h2><p className="mt-7 text-xl leading-8">I’m Precious Angel Lopez, a 20-year-old artist and creative freelancer studying at the University of the East – Caloocan.</p><p className="mt-5 leading-7 text-muted-foreground">My practice moves between detailed graphite portraits and painted commissions. I love turning personal references into pieces that feel warm, honest, and made to be kept. Away from the sketchbook, you’ll usually find me admiring cats.</p><div className="mt-9 flex gap-8 border-t border-border pt-7"><div><strong className="font-display text-3xl">20</strong><span className="block text-xs text-muted-foreground">years young</span></div><div><strong className="font-display text-3xl">UE</strong><span className="block text-xs text-muted-foreground">Caloocan student</span></div><div><strong className="font-display text-3xl">∞</strong><span className="block text-xs text-muted-foreground">ideas to draw</span></div></div></div></div></section>

        <section id="commission-form" className="section-space scroll-mt-20"><div className="page-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div className="lg:sticky lg:top-28 lg:self-start"><p className="eyebrow">Commission inquiry</p><h2 className="section-title mt-5">Tell me what you imagine.</h2><p className="mt-6 max-w-sm leading-7 text-muted-foreground">The best pieces begin with a story. Share yours, and we’ll explore what it could become.</p></div><CommissionForm /></div></section>

        <section id="contact" className="contact-band scroll-mt-20"><div className="page-shell py-20 text-center"><p className="eyebrow justify-center">Let’s create something personal</p><h2 className="mx-auto mt-6 max-w-4xl font-display text-6xl leading-[.95] md:text-8xl">Have an idea<br /><em>in mind?</em></h2><p className="mt-7 text-lg text-muted-foreground">Let’s turn it into artwork.</p><Button asChild className="mt-9"><a href="#commission-form">Start a commission <ArrowRight size={18} /></a></Button></div></section>
      </main>
      <footer className="border-t border-border py-10"><div className="page-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><BrandMark /><p className="mt-4 text-sm text-muted-foreground">Artist · Illustrator · Creative</p></div><div className="text-sm text-muted-foreground"><p>Social links coming soon.</p><p className="mt-2">© 2026 Precious Angel Lopez</p></div></div></footer>
    </div>
  );
}