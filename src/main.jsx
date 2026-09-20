import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Leaf,
  Sun,
  ChevronDown,
  Search,
  Play,
} from "lucide-react";
import pages from "./catalog.json";
import AboutPage from "./AboutPage";
import RoofOnAPalletPage from "./RoofOnAPalletPage";
import DIYPage from "./DIYPage";
import "./fonts.css";
import "./style.css";

const byPath = Object.fromEntries(pages.map((p) => [p.path, p]));
const cities = [
  "Toronto",
  "Mississauga",
  "Burlington",
  "Hamilton",
  "Guelph",
  "Ajax",
  "New York",
  "Los Angeles",
  "Chicago",
];
const cityPath = (c) => "/" + c.toLowerCase().replaceAll(" ", "-");
const products = pages.filter((p) => p.path.startsWith("/product/"));
const projects = pages.filter((p) => p.path.startsWith("/projects/"));
const blogs = pages.filter((p) => p.path.startsWith("/blog-posts/"));
const services = pages.filter((p) => p.path.startsWith("/services/"));
const arrow = <ArrowUpRight size={19} strokeWidth={1.8} />;
function Button({
  children,
  href = "/#estimate",
  variant = "",
  className = "",
}) {
  return (
    <a className={`button ${variant} ${className}`} href={href}>
      {children}
    </a>
  );
}
function Brand() {
  return (
    <a className="brand" href="/" aria-label="Rudan Metal Roofing home">
      <span className="brand-mark">R</span>
      <span>
        RUDAN<small>METAL ROOFING</small>
      </span>
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="nav-wrap">
          <Brand />
          <nav
            aria-label="Main navigation"
            className={open ? "nav open" : "nav"}
          >
            <a
              href="/about-us"
              aria-current={
                window.location.pathname.replace(/\/$/, "") === "/about-us"
                  ? "page"
                  : undefined
              }
            >
              About
            </a>
            <a href="/roof-on-a-pallet">Roof on a Pallet</a>
            <a href="/do-it-yourself">DIY</a>
            <a href="/projects">Projects</a>
            <details className="nav-dropdown">
              <summary>
                Explore <ChevronDown size={12} />
              </summary>
              <div className="dropdown">
                <a href="/shop">Products</a>
                <a href="/services">Services</a>
                <a href="/areas">Areas we serve</a>
                <a href="/blog">Blog</a>
                <a href="/community-service">Community</a>
                <a href="/contact-us">Contact</a>
              </div>
            </details>
            <a className="mobile-dealer" href="/become-a-dealer">
              Become a dealer
            </a>
          </nav>
          <div className="nav-actions">
            <Button href="/become-a-dealer" variant="outline small dealer">
              Dealer Inquiry
            </Button>
            <Button className="small" href="/#estimate">
              Get an Estimate <ArrowUpRight size={15} />
            </Button>
            <button
              className="menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
function Estimate({ dealer = false }) {
  const [draft, setDraft] = useState(null);
  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const body = `Hello Rudan Roofing,\n\nI'd like ${dealer ? "to become a dealer" : "a free roofing estimate"}.\n\n${Object.entries(
      data,
    )
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}\n\nThank you.`;
    setDraft(
      "mailto:info@rudanroofing.com?subject=" +
        encodeURIComponent(
          dealer ? "Dealer inquiry" : "Roofing estimate request",
        ) +
        "&body=" +
        encodeURIComponent(body),
    );
  }
  return (
    <form className="estimate-card" onSubmit={submit}>
      <div className="form-title">
        <h3>{dealer ? "LET’S PARTNER UP." : "FREE ESTIMATE"}</h3>
        <ArrowUpRight size={26} />
      </div>
      <p>Tell us about your project. Let’s make it happen.</p>
      <div className="fields">
        <label>
          Full name
          <input
            required
            name="Full name"
            autoComplete="name"
            placeholder="Your full name"
          />
        </label>
        <div className="form-row">
          <label>
            Email address
            <input
              required
              name="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Phone number
            <input
              required
              name="Phone"
              type="tel"
              autoComplete="tel"
              placeholder="(416) 000-0000"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            {dealer ? "Company" : "City"}
            <input
              required
              name={dealer ? "Company" : "City"}
              autoComplete={dealer ? "organization" : "address-level2"}
              placeholder={dealer ? "Company name" : "Project location"}
            />
          </label>
          <label>
            Project type
            <select
              aria-label="Project type"
              required
              name="Project type"
              defaultValue=""
            >
              <option value="" disabled>
                Select a project type
              </option>
              <option>Residential installation</option>
              <option>Commercial & agricultural</option>
              <option>Materials only / DIY</option>
              <option>Roof on a Pallet</option>
              <option>Dealer inquiry</option>
            </select>
          </label>
        </div>
      </div>
      <button className="button submit" type="submit">
        {dealer ? "Prepare My Inquiry" : "Request My Estimate"}{" "}
        <ArrowUpRight size={18} />
      </button>
      <small className="form-note">
        No obligation. Your details open in an email draft.
      </small>
      {draft && (
        <div className="draft-result" role="status">
          <Check size={20} />
          <div>
            <strong>Your inquiry is ready.</strong>
            <p>
              Open your email app, review the details, then send it to our team.
            </p>
            <a href={draft}>
              Open email draft <ArrowUpRight size={15} />
            </a>
            <small>
              Or call <a href="tel:+14162998586">(416) 299 8586</a>.
            </small>
          </div>
        </div>
      )}
    </form>
  );
}
function EstimateSection() {
  return (
    <section className="section estimate-section wrap" id="estimate">
      <div>
        <span className="eyebrow">START A CONVERSATION</span>
        <h2>
          LET’S BUILD
          <br />A ROOF THAT
          <br />
          LASTS.
        </h2>
        <p className="muted">
          Big plans or just getting started? Share a few details and let’s find
          the right roof for you.
        </p>
        <a className="phone-link" href="tel:+14162998586">
          <Phone size={17} /> (416) 299 8586
        </a>
      </div>
      <Estimate />
    </section>
  );
}
function Ticker() {
  return (
    <div className="ticker" aria-label="Serving Toronto and surrounding areas">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div
            className="ticker-group"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {cities.slice(0, 6).map((c) => (
              <React.Fragment key={c}>
                <a href={cityPath(c)} tabIndex={copy === 1 ? -1 : undefined}>
                  {c}
                </a>
                <span>/</span>
              </React.Fragment>
            ))}
            <a href="/areas" tabIndex={copy === 1 ? -1 : undefined}>
              AND BEYOND {arrow}
            </a>
            <span>/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function ServiceCards() {
  return (
    <section className="section wrap">
      <div className="section-top">
        <div>
          <span className="eyebrow">MADE FOR EVERY PROJECT</span>
          <h2>WHAT WE DO</h2>
        </div>
        <a className="text-link" href="/services">
          Explore all services {arrow}
        </a>
      </div>
      <div className="service-grid">
        {[
          {
            n: "01",
            title: "Roof on a Pallet",
            text: "A complete modular roofing system. Compact, lightweight, and ready to ship. Your next roof, all in one place.",
            path: "/roof-on-a-pallet",
            cls: "dark",
          },
          {
            n: "02",
            title: "Residential Roofing",
            text: "Bring lasting strength and a sharper look to your home with premium Canadian-made metal roofing.",
            path: "/subcategories/residential",
            cls: "red",
          },
          {
            n: "03",
            title: "Commercial & DIY",
            text: "Hardworking metal roofing systems, materials, and guidance for builders, contractors, and hands-on homeowners.",
            path: "/subcategories/commercial-and-agricultural",
            cls: "yellow",
          },
        ].map((s) => (
          <article className={"service-card " + s.cls} key={s.n}>
            <div className="card-number">
              {s.n}
              <ArrowUpRight size={32} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <Button href={s.path} variant="light small">
              Explore <ArrowRight size={17} />
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
function ProjectFeature() {
  return (
    <section className="project-feature">
      <div className="wrap feature-grid">
        <div>
          <span className="eyebrow">REAL ROOFS. REAL CRAFTSMANSHIP.</span>
          <h2>
            A SHARPER
            <br />
            LINE FOR
            <br />
            EVERY HOME.
          </h2>
          <p>
            Beautiful profiles. Precise details. A roof that feels right at
            home—and is ready for whatever Ontario brings.
          </p>
          <Button variant="light" href="/projects">
            Explore Our Work {arrow}
          </Button>
          <div className="project-index">
            <span>01 / 05</span>
            <span>BUILT TO MAKE A DIFFERENCE</span>
          </div>
        </div>
        <a className="project-image" href="/projects/stellar-modular">
          <img
            src="/images/photo-5.webp"
            alt="Rudan Stellar red metal roof on a two-storey home in Mississauga"
            loading="lazy"
          />
          <div className="image-caption">
            <span>
              <small>MISSISSAUGA, ONTARIO</small>Stellar Modular
            </span>
            <span className="round-arrow">{arrow}</span>
          </div>
        </a>
      </div>
    </section>
  );
}
function ProductGrid({ items = products }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <a className="product-card" href={p.path} key={p.path}>
          <div className="product-photo">
            {p.images[0] && (
              <img src={p.images[0]} alt={p.title} loading="lazy" />
            )}
            <span>{arrow}</span>
          </div>
          <h3>{p.title}</h3>
          <small>VIEW PRODUCT & SPECIFICATIONS</small>
        </a>
      ))}
    </div>
  );
}
function Faq() {
  const faqs = [
    [
      "How long do metal roofs last?",
      "Metal roofs are designed to last 40–70 years, depending on the material. Explore individual products for their material and warranty details.",
    ],
    [
      "Are metal roofs noisy?",
      "When properly installed, metal roofs can be quieter than asphalt shingle roofs. The roof assembly and insulation help control sound.",
    ],
    [
      "Will a metal roof fit the style of my home?",
      "Absolutely. Rudan panels come in a variety of styles and colours to complement your home or building design.",
    ],
    [
      "Can I install a metal roof myself?",
      "Rudan’s modular Roof on a Pallet system is designed for contractors and DIY installers. Explore our DIY guides for installation resources and product information.",
    ],
  ];
  return (
    <section className="section wrap faq-section">
      <div>
        <span className="eyebrow">GOOD QUESTIONS. STRAIGHT ANSWERS.</span>
        <h2>
          A LITTLE
          <br />
          ROOFING
          <br />
          KNOW-HOW.
        </h2>
        <a href="/do-it-yourself" className="text-link">
          Explore DIY resources {arrow}
        </a>
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details className="faq" key={q}>
            <summary>
              {q}
              <Plus size={20} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Cta() {
  return (
    <section className="cta-section wrap">
      <div className="cta">
        <div>
          <span className="eyebrow">YOUR NEXT ROOF STARTS HERE</span>
          <h2>
            READY TO SEE IT
            <br />
            ON YOUR <em>ROOF?</em>
          </h2>
          <p>
            Find your profile. Pick your colour. Let’s build something that
            lasts.
          </p>
        </div>
        <div className="cta-buttons">
          <Button>Start an Estimate {arrow}</Button>
          <Button href="/shop" variant="outline">
            Find Your Roof <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              Metal roofing. Made for real life.
              <br />
              Proudly serving Toronto, the GTA, and beyond.
            </p>
            <a href="tel:+14162998586">(416) 299 8586</a>
            <a href="mailto:info@rudanroofing.com">info@rudanroofing.com</a>
          </div>
          <div>
            <h3>COMPANY</h3>
            <a href="/about-us">About Rudan</a>
            <a href="/projects">Our projects</a>
            <a href="/areas">Areas we serve</a>
            <a href="/blog">Journal & guides</a>
            <a href="/community-service">Community</a>
            <a href="/roofing-guide">Why metal roofing?</a>
          </div>
          <div>
            <h3>YOUR ROOF</h3>
            <a href="/shop">All products</a>
            <a href="/roof-on-a-pallet">Roof on a Pallet</a>
            <a href="/subcategories/residential">Residential</a>
            <a href="/subcategories/commercial-and-agricultural">Commercial</a>
            <a href="/do-it-yourself">DIY resources</a>
          </div>
          <div>
            <h3>LET’S CONNECT</h3>
            <a href="/contact-us">Contact us</a>
            <a href="/become-a-dealer">Become a dealer</a>
            <a href="/services">Manufacturing services</a>
            <a href="https://www.google.com/maps/search/?api=1&query=110+Milner+Avenue+Unit+8+Scarborough+ON">
              110 Milner Avenue, Unit 8<br />
              Scarborough, ON M1S 3R2
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Rudan Metal Roofing. Built to last.
          </span>
          <div>
            <a href="/terms-conditions">Terms & conditions</a>
            <a href="/site-map">Site map</a>
            <a href="#top" aria-label="Back to top">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-photo"
          src="/images/photo-5.webp"
          alt="Red metal roof installed by Rudan Roofing in Mississauga"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <span className="location-pill">
            <span /> TORONTO & GTA · RESIDENTIAL & COMMERCIAL
          </span>
          <h1>
            ROOFING,
            <br />
            <em>BUILT</em> TO
            <br />
            OUTLAST
            <br />
            YOU.
          </h1>
          <p>
            Premium metal roofing, manufactured for
            <br className="desktop-br" /> the place you call home. Bring on
            Ontario weather.
          </p>
          <div className="hero-buttons">
            <Button>
              Start Your Project <ArrowRight size={20} />
            </Button>
            <Button href="#our-work" variant="outline">
              Explore Our Work <ArrowDown size={18} />
            </Button>
          </div>
          <a className="hero-badge" href="/about-us">
            <span>
              10<span>+</span>
            </span>
            <small>
              YEARS STRONG
              <br />
              TORONTO & THE GTA
            </small>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <EstimateSection />
      <Ticker />
      <ServiceCards />
      <div id="our-work">
        <ProjectFeature />
      </div>
      <section className="section wrap products-preview">
        <div className="section-top">
          <div>
            <span className="eyebrow">A PROFILE FOR EVERY PERSONALITY</span>
            <h2>
              MEET YOUR
              <br />
              NEXT ROOF.
            </h2>
          </div>
          <a href="/shop" className="text-link">
            View all products {arrow}
          </a>
        </div>
        <ProductGrid
          items={products.filter((p) =>
            /stellar---|decora-panel|trapeze---/.test(p.path),
          )}
        />
      </section>
      <div className="benefits-strip wrap">
        <div>
          <ShieldCheck />
          <span>Strength for every season</span>
        </div>
        <div>
          <Leaf />
          <span>Recyclable. Responsible.</span>
        </div>
        <div>
          <Sun />
          <span>Made for Canadian weather</span>
        </div>
      </div>
      <Faq />
      <Cta />
    </>
  );
}
function PageHero({ title, eyebrow = "RUDAN METAL ROOFING", description }) {
  return (
    <section className="page-hero wrap">
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span>{eyebrow}</span>
      </div>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
function Cards({ items }) {
  return (
    <div className="content-grid">
      {items.map((p, i) => (
        <a className="content-card" href={p.path} key={p.path}>
          {p.images[0] ? (
            <img src={p.images[0]} alt={p.title} loading="lazy" />
          ) : (
            <div className="card-placeholder">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {arrow}
            </div>
          )}
          <div>
            <h2>{p.title}</h2>
            <span className="text-link">Explore {arrow}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const categories = [
    "All products",
    "Panels",
    "Flashing & trims",
    "Accessories",
  ];
  const categoryPaths = {
    Panels: "/category/panels",
    "Flashing & trims": "/category/flashing",
    Accessories: "/category/accessories",
  };
  const refs = categoryPaths[category]
    ? new Set(byPath[categoryPaths[category]]?.links.map((l) => l.href))
    : null;
  const found = products.filter(
    (p) =>
      (!refs || refs.has(p.path)) &&
      p.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow="THE PRODUCT COLLECTION"
        title={
          <>
            YOUR ROOF.
            <br />
            <em>YOUR WAY.</em>
          </>
        }
        description="Premium panels, precise flashings, and the finishing details. Everything you need to build a roof that lasts."
      />
      <section className="wrap catalog">
        <div className="catalog-controls">
          <div className="filter-buttons">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={category === c ? "active" : ""}
                aria-pressed={category === c}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={18} />
            <input
              aria-label="Search products"
              placeholder="Find your product…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="results-count" aria-live="polite">
          {found.length} products
        </p>
        <ProductGrid items={found} />
        {!found.length && (
          <div className="empty-state">
            <h2>No products found.</h2>
            <p>Try another search or choose a different category.</p>
            <button
              className="button"
              onClick={() => {
                setQuery("");
                setCategory("All products");
              }}
            >
              Show all products
            </button>
          </div>
        )}
      </section>
      <SourceDetails path="/shop" label="Product information & resources" />
      <Cta />
    </>
  );
}
function Block({ b }) {
  if (b.type === "h1") return null;
  if (b.type === "rich")
    return (
      <div
        className="rich-content"
        dangerouslySetInnerHTML={{ __html: b.html }}
      />
    );
  if (b.type === "a") {
    if (b.href === "#" || !b.href) return null;
    return (
      <a className="editorial-link" href={b.href}>
        {b.text} <ArrowUpRight size={14} />
      </a>
    );
  }
  if (/^h[2-6]$/.test(b.type)) return <h2>{b.text}</h2>;
  return <p>{b.text}</p>;
}
function Editorial({ page: summary }) {
  const page = useContent(summary.path);
  const [active, setActive] = useState(0);
  if (!page)
    return (
      <PageHero title={summary.title} description="Loading page details..." />
    );
  const isProduct = page.path.startsWith("/product/");
  const cleanSections = page.sections
    .map((s) =>
      s.filter(
        (b) =>
          b.type !== "h1" &&
          ![
            "Get a Free Estimate",
            "Request A FREE ESTIMATE",
            "Geta Free Estimate",
            "Request a free quote",
            "Thank you!",
            "Your submission has been received!",
            "Oops! Something went wrong while submitting the form.",
          ].includes(b.text),
      ),
    )
    .filter((s) => s.length);
  return (
    <>
      <PageHero
        title={page.title}
        eyebrow={
          isProduct
            ? "PRODUCT DETAILS"
            : page.path.startsWith("/blog-posts/")
              ? "THE RUDAN JOURNAL"
              : page.path.startsWith("/projects/")
                ? "OUR WORK"
                : "BUILT BY RUDAN"
        }
      />
      <div className="wrap editorial-layout">
        <article className="editorial">
          {page.images.length > 0 && (
            <div className={"gallery " + (isProduct ? "product-gallery" : "")}>
              <img
                className="gallery-main"
                src={page.images[active]}
                alt={page.title}
              />
              {page.images.length > 1 && (
                <div className="gallery-thumbs">
                  {page.images.map((src, i) => (
                    <button
                      key={src}
                      className={i === active ? "selected" : ""}
                      onClick={() => setActive(i)}
                      aria-label={`View image ${i + 1}`}
                      aria-pressed={i === active}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <VideoLinks page={page} />
          {page.options?.length > 0 && (
            <section className="product-options">
              <h2>Available options</h2>
              {page.options.map((o) => (
                <div key={o.label}>
                  <h3>{o.label}</h3>
                  <div className="option-chips">
                    {o.values.map((v) => (
                      <span key={v}>{v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
          {cleanSections.map((s, i) => (
            <section className="editorial-section" key={i}>
              {s.map((b, j) => (
                <Block b={b} key={j} />
              ))}
            </section>
          ))}
        </article>
        <aside className="article-aside">
          <span className="eyebrow">LET’S MAKE IT HAPPEN</span>
          <h2>
            A better roof
            <br />
            starts here.
          </h2>
          <p>
            Need help choosing a product or planning your project? Talk to the
            Rudan team.
          </p>
          <Button>Get a Free Estimate {arrow}</Button>
          <a className="phone-link" href="tel:+14162998586">
            <Phone size={16} />
            (416) 299 8586
          </a>
          <div className="aside-links">
            <h3>KEEP EXPLORING</h3>
            <a href="/shop">Our products {arrow}</a>
            <a href="/projects">Project inspiration {arrow}</a>
            <a href="/do-it-yourself">DIY resources {arrow}</a>
            <a href="/services">Manufacturing services {arrow}</a>
          </div>
        </aside>
      </div>
      <Cta />
    </>
  );
}
function Contact({ dealer = false }) {
  return (
    <>
      <PageHero
        eyebrow={dealer ? "GROW WITH RUDAN" : "LET’S TALK ROOFING"}
        title={
          dealer ? (
            <>
              STRONG ROOFS.
              <br />
              <em>STRONG PARTNERS.</em>
            </>
          ) : (
            <>
              GOOD THINGS
              <br />
              START WITH <em>HELLO.</em>
            </>
          )
        }
      />
      <section className="wrap contact-layout">
        <div>
          <h2>
            {dealer ? "Become a Rudan dealer." : "Here for your next project."}
          </h2>
          <p>
            Connect with our team for product information, project advice, and a
            free estimate.
          </p>
          <a href="tel:+14162998586">
            <Phone /> (416) 299 8586
          </a>
          <a href="mailto:info@rudanroofing.com">
            <Mail /> info@rudanroofing.com
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=110+Milner+Avenue+Unit+8+Scarborough+ON">
            <MapPin />
            <span>
              110 Milner Avenue, Unit 8<br />
              Scarborough, ON M1S 3R2
            </span>
          </a>
        </div>
        <Estimate dealer={dealer} />
      </section>
      <SourceDetails
        path={dealer ? "/become-a-dealer" : "/contact-us"}
        label={dealer ? "Dealer programme details" : "More contact information"}
      />
    </>
  );
}
function Listing({ type }) {
  const config = {
    projects: {
      eyebrow: "THE WORK SPEAKS FOR ITSELF",
      title: (
        <>
          BUILT WITH PRIDE.
          <br />
          <em>MADE TO LAST.</em>
        </>
      ),
      items: projects,
    },
    blog: {
      eyebrow: "THE RUDAN JOURNAL",
      title: (
        <>
          GOOD ROOFS START
          <br />
          WITH <em>GOOD ADVICE.</em>
        </>
      ),
      items: blogs,
    },
    services: {
      eyebrow: "PRECISION. FROM START TO FINISH.",
      title: (
        <>
          YOUR VISION.
          <br />
          <em>OUR CRAFT.</em>
        </>
      ),
      items: services,
    },
  }[type];
  return (
    <>
      <PageHero {...config} />
      <section className="wrap section listing-section">
        <Cards items={config.items} />
      </section>
      <SourceDetails path={"/" + type} label="More information & resources" />
      <Cta />
    </>
  );
}
function AreaPage() {
  return (
    <>
      <PageHero
        eyebrow="CLOSER THAN YOU THINK"
        title={
          <>
            LOCAL KNOW-HOW.
            <br />
            <em>LASTING IMPACT.</em>
          </>
        }
        description="Proudly serving Toronto and the GTA, with roofing solutions reaching communities across Canada and the United States."
      />
      <section className="wrap area-grid">
        {cities.map((c, i) => (
          <a key={c} href={cityPath(c)}>
            <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
            <h2>{c}</h2>
            {arrow}
          </a>
        ))}
      </section>
      <Cta />
    </>
  );
}
function SiteMap() {
  return (
    <>
      <PageHero title="EVERYTHING RUDAN." eyebrow="EXPLORE THE WEBSITE" />
      <section className="wrap site-map">
        <a href="/roofing-guide">Why metal roofing? {arrow}</a>
        {pages
          .filter((p) => p.path !== "/")
          .map((p) => (
            <a href={p.path} key={p.path}>
              {p.title}
              {arrow}
            </a>
          ))}
      </section>
    </>
  );
}

function useContent(path) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let live = true;
    setData(null);
    fetch(
      "/content/" + (path.slice(1) || "home").replaceAll("/", "__") + ".json",
    )
      .then((r) => {
        if (!r.ok) throw new Error("Page could not be loaded");
        return r.json();
      })
      .then((data) => {
        if (live) setData(data);
      })
      .catch(() => {
        if (live)
          setData({
            ...byPath[path],
            sections: [
              [
                {
                  type: "p",
                  text: "Page details could not be loaded. Please refresh the page or call (416) 299 8586.",
                },
              ],
            ],
            options: [],
            videos: [],
          });
      });
    return () => {
      live = false;
    };
  }, [path]);
  return data;
}
function VideoLinks({ page }) {
  return (
    page.videos?.length > 0 && (
      <section className="video-resources">
        <h2>Watch & learn</h2>
        {page.videos.map((v, i) => (
          <a
            className="video-link"
            key={v}
            href={v}
            target="_blank"
            rel="noreferrer"
          >
            <span className="video-play">
              <Play size={18} />
            </span>
            <span>
              Watch{" "}
              {page.path === "/do-it-yourself"
                ? "the installation guide"
                : "Rudan on YouTube"}
              {page.videos.length > 1 ? " / " + (i + 1) : ""}
            </span>
            <ArrowUpRight size={18} />
          </a>
        ))}
      </section>
    )
  );
}
function SourceDetails({ path, label }) {
  const page = useContent(path);
  return (
    page && (
      <section className="wrap source-details">
        <details>
          <summary>
            {label}
            <Plus size={20} />
          </summary>
          <div className="editorial">
            <VideoLinks page={page} />
            {page.sections.map((s, i) => (
              <section className="editorial-section" key={i}>
                {s.map((b, j) => (
                  <Block b={b} key={j} />
                ))}
              </section>
            ))}
          </div>
        </details>
      </section>
    )
  );
}

function About() {
  const page = useContent("/about-us");
  return page ? (
    <AboutPage page={page} />
  ) : (
    <PageHero
      title="BUILT ON BETTER WORK."
      description="Loading page details..."
    />
  );
}
function RoofOnAPallet() {
  const page = useContent("/roof-on-a-pallet");
  return page ? (
    <RoofOnAPalletPage page={page} />
  ) : (
    <PageHero
      title="ROOF ON A PALLET."
      description="Loading page details..."
    />
  );
}
function DIY() {
  const page = useContent("/do-it-yourself");
  return page ? (
    <DIYPage page={page} />
  ) : (
    <PageHero
      title="DO IT YOURSELF."
      description="Loading page details..."
    />
  );
}

function App() {
  const path = decodeURI(window.location.pathname).replace(/\/$/, "") || "/";
  useEffect(() => {
    const p = byPath[path];
    document.title =
      path === "/"
        ? "Rudan Metal Roofing — Built to Outlast"
        : p?.seoTitle || "Explore | Rudan Metal Roofing";
    if (p?.description)
      document.querySelector('meta[name="description"]').content =
        p.description;
  }, [path]);
  let content;
  if (path === "/") content = <Home />;
  else if (path === "/about-us") content = <About />;
  else if (path === "/roof-on-a-pallet") content = <RoofOnAPallet />;
  else if (path === "/do-it-yourself") content = <DIY />;
  else if (path === "/shop") content = <Catalog />;
  else if (["/projects", "/blog", "/services"].includes(path))
    content = <Listing type={path.slice(1)} />;
  else if (path === "/roofing-guide")
    content = <Editorial page={byPath["/"]} />;
  else if (path === "/areas") content = <AreaPage />;
  else if (path === "/site-map") content = <SiteMap />;
  else if (path === "/contact-us" || path === "/become-a-dealer")
    content = <Contact dealer={path === "/become-a-dealer"} />;
  else if (byPath[path]) content = <Editorial page={byPath[path]} />;
  else
    content = (
      <section className="wrap empty-state">
        <span className="eyebrow">404 / PAGE NOT FOUND</span>
        <h1>
          LET’S GET YOU
          <br />
          BACK HOME.
        </h1>
        <Button href="/">
          Back to home <ArrowRight />
        </Button>
      </section>
    );
  return (
    <div id="top">
      <Header />
      <main id="main">{content}</main>
      <Footer />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
