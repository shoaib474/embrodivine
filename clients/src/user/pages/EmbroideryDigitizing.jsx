import { useState } from "react";
import {
  CheckCircle2,
  Upload,
  Clock,
  Shield,
  Star,
  ChevronDown,
  ChevronRight,
  Cpu,
  Layers,
  Zap,
  RefreshCw,
  MessageSquare,
  Award,
  ArrowRight,
  Scissors,
  FileImage,
  Settings2,
  Sparkles,
  Users,
  ThumbsUp,
  Headphones,
  DownloadCloud,
  ImageIcon,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    icon: Upload,
    title: "Upload Your Artwork",
    desc: "Send us your logo, image, or design in any format — JPG, PNG, PDF, AI, EPS. Low-res images are fine; our digitizers work with what you have.",
  },
  {
    icon: Cpu,
    title: "Expert Digitizing",
    desc: "Our skilled digitizers manually convert your design into a stitch file, optimising density, underlay, and pull compensation for perfect results.",
  },
  {
    icon: Settings2,
    title: "Quality Check",
    desc: "Every file is test-sewn on the same fabric type you specified and reviewed for clarity, coverage, and registration before delivery.",
  },
  {
    icon: DownloadCloud,
    title: "Receive Your File",
    desc: "Download your finished embroidery file in your chosen format — DST, PES, EXP, JEF, HUS, VP3, XXX and more.",
  },
];

const SERVICES = [
  {
    icon: Layers,
    title: "Logo Digitizing",
    desc: "Crisp, scalable logo embroidery files for caps, uniforms, bags, and corporate apparel. Any size, any thread count.",
    tag: "Most Popular",
    tagType: "gold",
  },
  {
    icon: Scissors,
    title: "Custom Patches",
    desc: "Iron-on, sew-on, and Velcro patch files optimised for merrowed, heat-cut, and laser-cut borders.",
    tag: null,
  },
  {
    icon: FileImage,
    title: "Photo to Stitch",
    desc: "We transform portrait photographs and artwork into stunning stitch portraits using realistic shading techniques.",
    tag: "Premium",
    tagType: "emerald",
  },
  {
    icon: RefreshCw,
    title: "File Conversion",
    desc: "Convert between any embroidery machine formats. We support all major brands — Brother, Janome, Bernina, Tajima, Barudan, and more.",
    tag: null,
  },
  {
    icon: Zap,
    title: "Rush Digitizing",
    desc: "Same-day turnaround available for urgent orders. Files delivered within 2–4 hours with no compromise on quality.",
    tag: "Fast",
    tagType: "blue",
  },
  {
    icon: Layers,
    title: "3D Puff Digitizing",
    desc: "Specialised puff foam digitizing for raised, dimensional embroidery on caps, hats, and apparel headwear.",
    tag: null,
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop",
    label: "Corporate Logo",
    category: "Logo",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=450&fit=crop",
    label: "Custom Patch",
    category: "Patch",
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=450&fit=crop",
    label: "Floral Design",
    category: "Custom",
  },
  {
    src: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600&h=450&fit=crop",
    label: "Rose Pattern",
    category: "Custom",
  },
  {
    src: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=600&h=450&fit=crop",
    label: "Artistic Design",
    category: "Premium",
  },
  {
    src: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&h=450&fit=crop",
    label: "Nature Motif",
    category: "Custom",
  },
];

const FORMATS = [
  "DST",
  "PES",
  "EXP",
  "JEF",
  "HUS",
  "VP3",
  "XXX",
  "SEW",
  "CSD",
  "EMB",
  "PHC",
  "TAP",
];

const FAQS = [
  {
    q: "What file formats do you accept for digitizing?",
    a: "We accept virtually any image format: JPG, PNG, BMP, GIF, TIFF, PDF, AI (Adobe Illustrator), EPS, SVG, and CDR. Even low-resolution logos work — our digitizers trace and rebuild by hand.",
  },
  {
    q: "How long does digitizing take?",
    a: "Standard orders are delivered within 12–24 hours. Rush orders can be completed in 2–4 hours. Complex or large designs may take up to 48 hours. We always communicate timelines upfront.",
  },
  {
    q: "Do you offer free revisions?",
    a: "Yes. Every order includes unlimited free revisions until you are 100% satisfied with your digitized file. Simply send us your feedback and we'll update the file at no extra charge.",
  },
  {
    q: "What machine formats do you support?",
    a: "We deliver in all major embroidery machine formats including DST (Tajima), PES (Brother), JEF (Janome), HUS (Husqvarna), VP3 (Viking), EXP (Melco), XXX (Singer), and many more.",
  },
  {
    q: "How do I know the quality before I run it on my machine?",
    a: "Every file is test-sewn on a swatch of the same fabric type you specify in your order. We photograph or video the test sew and include it with your delivery so you can preview results before production.",
  },
  {
    q: "Can you re-digitize an existing embroidery file?",
    a: "Absolutely. If you have a poorly digitized file or just need it cleaned up, resized, or re-formatted, we can re-digitize it from scratch or edit the existing file — whichever gives the best result.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Uniform Supplier, Dubai",
    stars: 5,
    text: "Turnaround was under 8 hours and the DST file ran perfectly on our first test sew. Our corporate client was thrilled with the quality.",
  },
  {
    name: "James T.",
    role: "Cap Manufacturer, UK",
    stars: 5,
    text: "I've tried four other digitizing services. Embrodivine is the only one that nails 3D puff consistently. The density settings are spot on.",
  },
  {
    name: "Priya K.",
    role: "Boutique Embroidery, India",
    stars: 5,
    text: "Affordable pricing, impeccable stitch quality, and their support team actually responds at 2 AM. Genuinely impressed every time.",
  },
];

const STATS = [
  { value: "50K+", label: "Designs Digitized" },
  { value: "12 hrs", label: "Avg. Turnaround" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "30+", label: "File Formats" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-yellow-500/50" />
      <span className="text-[10px] tracking-[4px] uppercase text-yellow-500/60 font-bold">
        {children}
      </span>
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-yellow-500/50" />
    </div>
  );
}

function ServiceBadge({ tag, tagType }) {
  if (!tag) return null;
  const cls =
    {
      gold: "bg-yellow-500/20 text-yellow-500 border-yellow-500/40",
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    }[tagType] || "bg-yellow-500/20 text-yellow-500 border-yellow-500/40";
  return (
    <span
      className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${cls}`}
    >
      {tag}
    </span>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-yellow-500/20 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#1A1A1A] hover:bg-yellow-500/5 transition-colors"
      >
        <span className="text-sm font-semibold text-[#E8D7B5] pr-4">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-yellow-500/60 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#101010] border-t border-yellow-500/10">
          <p className="text-sm text-yellow-500/70 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

const EmbroideryDigitizing = () => {
  const [galleryFilter, setGalleryFilter] = useState("All");
  const galleryCategories = ["All", "Logo", "Patch", "Custom", "Premium"];

  const filteredGallery =
    galleryFilter === "All"
      ? GALLERY
      : GALLERY.filter((g) => g.category === galleryFilter);

  return (
    <div className="min-h-screen bg-[#101010] text-[#E8D7B5]">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-yellow-500/20">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-yellow-500/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-yellow-500/50" />
                <span className="text-[10px] tracking-[4px] uppercase text-yellow-500/70 font-bold">
                  Professional Service
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                <span className="text-[#E8D7B5]">Embroidery</span>
                <br />
                <span className="text-yellow-500">Digitizing</span>
                <br />
                <span className="text-[#E8D7B5]">Services</span>
              </h1>
              <p className="text-yellow-500/70 text-base leading-relaxed mb-8 max-w-lg">
                We convert your logo, artwork, or image into a flawless
                embroidery stitch file — ready to run on any machine, in any
                format, with any thread count. Precision crafted by expert
                digitizers, not software.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button className="flex items-center gap-2 bg-yellow-500 text-[#101010] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#E8D7B5] transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Your Design
                </button>
                <button className="flex items-center gap-2 bg-transparent border border-yellow-500/40 text-yellow-500 px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-500/10 transition-colors">
                  View Samples
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Clock, text: "12hr Turnaround" },
                  { Icon: RefreshCw, text: "Free Revisions" },
                  { Icon: Shield, text: "100% Satisfaction" },
                  { Icon: Award, text: "Expert Digitizers" },
                ].map(({ Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 bg-[#1A1A1A] border border-yellow-500/20 rounded-full px-3 py-1.5 text-xs text-yellow-500/70"
                  >
                    <Icon className="w-3 h-3 text-yellow-500/50" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image stack */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-yellow-500/5 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-3">
                {GALLERY.slice(0, 4).map((g, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl overflow-hidden border border-yellow-500/20 ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}
                  >
                    <img
                      src={g.src}
                      alt={g.label}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────────── */}
      <section className="border-b border-yellow-500/20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-yellow-500 mb-1">
                  {value}
                </p>
                <p className="text-xs text-yellow-500/50 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS DIGITIZING ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-yellow-500/5 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-yellow-500/20 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                alt="Embroidery digitizing process"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#101010]/80 border border-yellow-500/30 rounded-xl px-4 py-3 backdrop-blur-sm">
                  <p className="text-yellow-500 font-bold text-sm">
                    Expert Digitizing
                  </p>
                  <p className="text-[#E8D7B5]/70 text-xs mt-0.5">
                    Hand-crafted stitch paths, not auto-generated
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] mb-6 text-center lg:text-left">
              What is Embroidery{" "}
              <span className="text-yellow-500">Digitizing?</span>
            </h2>
            <div className="space-y-4 text-yellow-500/70 text-sm leading-relaxed">
              <p>
                Embroidery digitizing is the art of converting an image, logo,
                or artwork into a digital embroidery file — a set of precise
                instructions that tells your embroidery machine exactly where to
                place each stitch, in what direction, at what density, and in
                which colour sequence.
              </p>
              <p>
                Unlike printing, every detail in an embroidery design must be
                re-interpreted for thread. Curves become satin columns. Fills
                become rows of running stitches. Fine lines must be thickened or
                simplified. A skilled digitizer makes hundreds of decisions per
                design that automated software simply cannot replicate.
              </p>
              <p>
                The quality of a digitized file determines whether your finished
                embroidery looks flat and garbled, or sharp, professional, and
                three-dimensional. Bad digitizing is the number-one cause of
                poor embroidery results — even on the best machines.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Hand-crafted stitch paths",
                "Correct pull compensation",
                "Optimised underlay",
                "Proper stitch density",
                "Smooth colour transitions",
                "Machine-tested output",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-xs text-[#E8D7B5]/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] border-y border-yellow-500/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>The Process</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] text-center mb-14">
            How It <span className="text-yellow-500">Works</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative">
                {/* Connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-px bg-yellow-500/15 z-0"
                    style={{ width: "calc(100% - 2rem)" }}
                  />
                )}
                <div className="relative bg-[#1A1A1A] border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-yellow-500" />
                    </div>
                    <span className="text-2xl font-bold text-yellow-500/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-[#E8D7B5] font-bold text-sm mb-2">
                    {title}
                  </h3>
                  <p className="text-yellow-500/55 text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionLabel>What We Offer</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] text-center mb-3">
          Our <span className="text-yellow-500">Services</span>
        </h2>
        <p className="text-center text-yellow-500/50 text-sm max-w-lg mx-auto mb-12">
          From a single logo to thousands of designs, we cover every embroidery
          digitizing need.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc, tag, tagType }) => (
            <div
              key={title}
              className="group bg-[#1A1A1A] border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/50 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 bg-yellow-500/10 border border-yellow-500/25 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-yellow-500" />
                </div>
                <ServiceBadge tag={tag} tagType={tagType} />
              </div>
              <h3 className="text-[#E8D7B5] font-bold text-sm mb-2">{title}</h3>
              <p className="text-yellow-500/55 text-xs leading-relaxed mb-4">
                {desc}
              </p>
              <div className="flex items-center gap-1 text-yellow-500/40 group-hover:text-yellow-500 transition-colors text-xs font-semibold">
                Learn more <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] border-y border-yellow-500/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>Our Work</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] text-center mb-3">
            Digitizing <span className="text-yellow-500">Gallery</span>
          </h2>
          <p className="text-center text-yellow-500/50 text-sm max-w-md mx-auto mb-8">
            A sample of designs we've digitized across industries and styles.
          </p>

          {/* Filter chips */}
          <div className="flex gap-2 justify-center flex-wrap mb-8">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  galleryFilter === cat
                    ? "bg-yellow-500 text-[#101010] border-yellow-500"
                    : "bg-[#1A1A1A] text-yellow-500/60 border-yellow-500/20 hover:border-yellow-500/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredGallery.map((g, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden border border-yellow-500/15 hover:border-yellow-500/50 transition-all ${i === 0 && galleryFilter === "All" ? "sm:col-span-2 sm:row-span-2" : ""}`}
              >
                <div
                  className={
                    i === 0 && galleryFilter === "All"
                      ? "aspect-[16/9]"
                      : "aspect-square"
                  }
                >
                  <img
                    src={g.src}
                    alt={g.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold text-[#E8D7B5] bg-[#101010]/70 border border-yellow-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {g.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILE FORMATS ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Compatibility</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] mb-4">
              All Machine <span className="text-yellow-500">Formats</span>
            </h2>
            <p className="text-yellow-500/60 text-sm leading-relaxed mb-8">
              We deliver your finished file in any embroidery machine format you
              need — covering every major brand worldwide. Just tell us your
              machine and we'll handle the rest.
            </p>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((fmt) => (
                <span
                  key={fmt}
                  className="bg-[#1A1A1A] border border-yellow-500/25 text-yellow-500 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest hover:bg-yellow-500/10 transition-colors cursor-default"
                >
                  .{fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Why choose us */}
          <div className="bg-[#1A1A1A] border border-yellow-500/20 rounded-2xl p-8">
            <h3 className="text-[#E8D7B5] font-bold text-lg mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Why Choose Embrodivine?
            </h3>
            <div className="space-y-4">
              {[
                {
                  Icon: Users,
                  title: "Human Digitizers",
                  desc: "Every file is crafted by a real, experienced digitizer — not an AI tool.",
                },
                {
                  Icon: ThumbsUp,
                  title: "Unlimited Revisions",
                  desc: "We revise until you're happy, every time, at no extra cost.",
                },
                {
                  Icon: Clock,
                  title: "Fast Turnaround",
                  desc: "Standard 12hr delivery; same-day rush available for urgent orders.",
                },
                {
                  Icon: Headphones,
                  title: "24/7 Support",
                  desc: "Our team is available around the clock via chat, email, and WhatsApp.",
                },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-9 h-9 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-[#E8D7B5] font-semibold text-sm">
                      {title}
                    </p>
                    <p className="text-yellow-500/50 text-xs mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] border-y border-yellow-500/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>Reviews</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] text-center mb-12">
            What Clients <span className="text-yellow-500">Say</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, stars, text }) => (
              <div
                key={name}
                className="bg-[#1A1A1A] border border-yellow-500/20 rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-yellow-500/70 text-sm leading-relaxed mb-5 italic">
                  "{text}"
                </p>
                <div className="border-t border-yellow-500/10 pt-4">
                  <p className="text-[#E8D7B5] font-bold text-sm">{name}</p>
                  <p className="text-yellow-500/40 text-xs mt-0.5">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] text-center mb-12">
          Frequently Asked <span className="text-yellow-500">Questions</span>
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} {...faq} />
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-yellow-500/20 py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-yellow-500/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-yellow-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scissors className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-yellow-500/60 text-sm leading-relaxed mb-8">
            Upload your design now and receive a professionally digitized
            embroidery file within 12 hours. First order? Get 20% off with code{" "}
            <span className="text-yellow-500 font-bold">FIRST20</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center gap-2 bg-yellow-500 text-[#101010] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#E8D7B5] transition-colors">
              <Upload className="w-4 h-4" />
              Upload Your Design
            </button>
            <button className="flex items-center justify-center gap-2 border border-yellow-500/40 text-yellow-500 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-yellow-500/10 transition-colors">
              <MessageSquare className="w-4 h-4" />
              Chat With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmbroideryDigitizing;
