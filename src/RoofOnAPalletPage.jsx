import { ArrowUpRight } from "lucide-react";
import "./roof-on-a-pallet.css";

const features = [
  {
    title: "Roof In A Box",
    text: "A Ready to go Roof that can be purchased as a whole or individual components from the pallets that are ready to Ship and to Install anywhere around the world",
  },
  {
    title: "Handy sheets",
    text: "The modular roof system consists of many sheets that are pieced together like tiles on a floor or pieces of a puzzle. Easy to install!",
  },
  {
    title: "Safe material",
    text: "G90 275 Zinc coatings provide eye appealing aesthetics and protection with the highest quality.",
  },
  {
    title: "Roof on a pallet",
    text: "A standard roof fits on one pallet. It allows it to be transported with a regular truck anywhere.",
  },
  {
    title: "Guaranteed repeatability of colour and shape",
    text: "You can purchase even a single sheet from our distributor at any time without concerns about color consistency shades, as we match uniformity regardless of batch materials",
  },
  {
    title: "Easy transport and Organized shipping",
    text: "Organized packing for Faster installations! The sheets' lightweight and compact nature ensures that transporting and assembling them is thoroughly enjoyable.",
  },
  {
    title: "Uniform sheet fitting for fast installations",
    text: "Uniformity of sheets and Factory-made mounting holes (on certain styles) shorten the working time on the roof and allow for precise sheet connection.",
  },
  {
    title: "Fast and Efficient assembly",
    text: "The roof construction team can work in several roof areas at the same time.",
  },
  {
    title: "Set of essential accessories",
    text: "The modular roof is also a set of essential accessories. Will work with any gutter systems, soffits and fences.",
  },
  {
    title: "Reinforces sheet",
    text: "Vertical embossed areas reinforced with additional backward sheet curve make the roof even more rigid.",
  },
  {
    title: "Satisfaction for a Lifetime",
    text: "All Materials are warrantied for Lifetime (55 Years)",
  },
];

const benefits = [
  [
    "PRECISION",
    "Factory-made mounting holes and uniform sheets shorten working time and allow for precise connection.",
  ],
  [
    "LONGEVITY",
    "All materials are warrantied for a lifetime (55 years). Built beyond one season.",
  ],
  [
    "RECYCLABLE",
    "100% recyclable steel roofing. Minimal carbon footprint, maximum performance.",
  ],
  [
    "WEATHER-READY",
    "Withstands high winds, humidity, heat, rain, and hail. Fire, freeze/thaw, and earthquake resistant.",
  ],
];

function Action({ children, href = "/#estimate", outline = false }) {
  return (
    <a className={`button ${outline ? "outline" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

export default function RoofOnAPalletPage({ page }) {
  const faqBlocks =
    page?.sections.find((s) =>
      s.some((b) => b.text === "Got questions? We have The answers"),
    ) || [];
  const faqs = [];
  for (const block of faqBlocks) {
    if (block.type === "h6") faqs.push({ question: block.text, answers: [] });
    else if (block.type === "p" && faqs.length)
      faqs.at(-1).answers.push(block.text);
  }

  return (
    <div className="rop-page">
      <section className="rop-hero">
        <div className="rop-hero-copy rop-grid-paper">
          <span className="eyebrow">READY TO GO</span>
          <h1>
            ROOF ON
            <br />A <em>PALLET.</em>
          </h1>
          <p>
            A complete modular roofing system. Compact, lightweight, and ready
            to ship. Your next roof, all in one place.
          </p>
          <span className="rop-location">
            TORONTO & THE GREATER TORONTO AREA
          </span>
          <div className="rop-hero-buttons">
            <Action>Get a Free Estimate</Action>
            <Action outline href="/do-it-yourself">
              Explore DIY Resources
            </Action>
          </div>
        </div>
        <div className="rop-hero-photo">
          {page?.images[0] && (
            <img
              src={page.images[0]}
              alt="Rudan Roof on a Pallet modular roofing system"
              fetchPriority="high"
            />
          )}
          <div className="rop-photo-label">
            <strong>MODULAR.</strong>
            <span>BUILT TO LAST</span>
          </div>
        </div>
      </section>

      <section className="rop-intro">
        <div className="rop-intro-left">
          <span className="eyebrow">THE SYSTEM</span>
          <h2>
            DURABLE, ECO-FRIENDLY,
            <br />
            AND <em>EASY TO INSTALL.</em>
          </h2>
          <span className="rop-small-note">
            MANUFACTURED FOR CANADIAN WEATHER.
          </span>
        </div>
        <div className="rop-intro-right">
          <p>
            We manufacture your steel roof from the most durable and
            eco-friendly materials on Earth. Our Modular roofing system consists
            of tile like sheets that are pieced together to fit like a puzzle on
            the roof.
          </p>
          <p>
            Roof in a box/pallet comes with a complete roofing system and
            everything you need for a complete metal roofing installation. The
            roof sheets are compact and lightweight which makes it easy to
            transport and install for any contractor and DIY'er. The
            installation will save you time and money.
          </p>
          <a className="text-link" href="/shop">
            Explore our products <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="rop-features wrap rop-section">
        <div className="rop-heading-row">
          <div>
            <span className="eyebrow">WHY ROOF ON A PALLET</span>
            <h2>
              BUILT FOR
              <br />
              EVERY <em>BUILD.</em>
            </h2>
          </div>
          <p>
            Every component arrives organized, lightweight, and ready for fast
            installation anywhere in the world.
          </p>
        </div>
        <div className="rop-feature-grid">
          {features.map((f, i) => (
            <article className="rop-feature-card" key={f.title}>
              <span className="rop-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rop-gallery">
        <div className="rop-gallery-strip wrap">
          {page?.images.slice(0, 4).map((src, i) => (
            <div className="rop-gallery-item" key={src}>
              <img
                src={src}
                alt={`Roof on a Pallet ${i + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rop-benefits wrap rop-section">
        <div className="rop-heading-row">
          <div>
            <span className="eyebrow">WHAT MAKES IT DIFFERENT</span>
            <h2>
              LESS WASTE.
              <br />
              MORE <em>LIFE.</em>
            </h2>
          </div>
        </div>
        <div className="rop-benefit-list">
          {benefits.map(([title, text], i) => (
            <article className="rop-benefit-row" key={title}>
              <span className="rop-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rop-cta-banner">
        <div className="wrap rop-cta-inner">
          <div>
            <span className="eyebrow">YOUR NEXT ROOF STARTS HERE</span>
            <h2>
              READY TO BUILD
              <br />
              SOMETHING <em>LASTS?</em>
            </h2>
            <p>
              Tell us what you're planning. We'll help you understand the right
              system, finish, and next step for your property.
            </p>
          </div>
          <div className="rop-cta-buttons">
            <Action>Start Your Estimate</Action>
            <Action outline href="/projects">
              Explore Our Work
            </Action>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="rop-faq wrap rop-section">
          <div className="rop-faq-left">
            <span className="eyebrow">
              GOOD QUESTIONS. STRAIGHT ANSWERS.
            </span>
            <h2>
              LET'S GET
              <br />
              INTO THE
              <br />
              <em>DETAILS.</em>
            </h2>
            <p>
              Everything you've been wondering about the Roof on a Pallet
              system, from everyday performance to the finer details.
            </p>
            <a className="text-link" href="/contact-us">
              Ask the Rudan team <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="rop-faq-list">
            {faqs.map((f, i) => (
              <details className="faq" key={f.question} open={i === 0}>
                <summary>
                  <span>
                    <small>{String(i + 1).padStart(2, "0")}</small>
                    {f.question}
                  </span>
                  <ArrowUpRight size={20} />
                </summary>
                {f.answers[0] === "PRODUCT" ? (
                  <div className="rop-weight-table">
                    <table>
                      <caption>Roofing material weight comparison</caption>
                      <thead>
                        <tr>
                          <th scope="col">{f.answers[0]}</th>
                          <th scope="col">{f.answers[1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[2, 4, 6].map((j) => (
                          <tr key={j}>
                            <th scope="row">{f.answers[j]}</th>
                            <td>{f.answers[j + 1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  f.answers.map((answer, j) => <p key={j}>{answer}</p>)
                )}
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="rop-final rop-grid-paper">
        <div className="wrap">
          <span className="eyebrow">YOUR ROOF. OUR RESPONSIBILITY.</span>
          <h2>
            LET'S BUILD
            <br />
            SOMETHING THAT
            <br />
            <em>LASTS.</em>
          </h2>
          <p>
            Tell us what you're planning. We'll help you understand the right
            system, finish, and next step for your property.
          </p>
          <div className="rop-final-buttons">
            <Action>Start Your Estimate</Action>
            <Action outline href="/projects">
              Explore Our Work
            </Action>
          </div>
          <p className="rop-dealer-note">
            Authorized dealer: <strong>Four Seasons Metal Roofing</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
