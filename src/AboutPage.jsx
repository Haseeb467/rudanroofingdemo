import { ArrowUpRight, Plus, Play } from "lucide-react";
import "./about.css";

const servicePaths = [
  "coil-for-sale",
  "custom-bending-trim",
  "custom-roll-forming",
  "cut-to-length-flat-sheets",
  "slit-coil-program",
];
const values = [
  [
    "Craft without compromise",
    "Quality materials and workmanship belong together. We bring care to the products we manufacture and the roofing projects we help bring to life.",
  ],
  [
    "Clear, honest guidance",
    "The right style. The right colour. A fair price. Our goal is to simplify your roofing project with quality products, installation, and customer service to match.",
  ],
  [
    "Responsibility built in",
    "A family business with a commitment to sustainable Canadian materials—and to making a positive difference in the communities we serve.",
  ],
];

function Pairs({ blocks }) {
  return blocks.map((b, i) => <p key={i}>{b.text}</p>);
}
function Action({ children, href = "/#estimate", outline = false }) {
  return (
    <a className={`button ${outline ? "outline" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

export default function AboutPage({ page }) {
  const section = (text) =>
    page.sections.find((s) => s.some((b) => b.text === text)) || [];
  const story = section("The main values of the company").filter(
    (b) => b.type === "p" && b.text !== "About Us",
  );
  const leadership = section(
    "Led by Passionate Experts, Committed to Excellence and Community Engagement",
  ).filter((b) => b.type === "p" && b.text !== "Rudan Roofing");
  const benefitBlocks = section(
    "Forget Shingles - Here's Why Metal Roofing is the #1 Choice For Smart Home Owners in Toronto",
  );
  const benefits = benefitBlocks
    .filter((b) => b.type === "a")
    .map((b) => ({
      title: b.text,
      text: benefitBlocks[benefitBlocks.indexOf(b) + 1]?.text,
    }));
  const serviceBlocks = section(
    "Protect Your Property with Rudan Roofing Services",
  );
  const services = serviceBlocks
    .filter((b) => b.type === "h3")
    .map((b, i) => ({
      title: b.text,
      text: serviceBlocks[serviceBlocks.indexOf(b) + 1]?.text,
      href: `/services/${servicePaths[i]}`,
    }));
  const faqBlocks = section("Got questions? We have The answers");
  const faqs = [];
  for (const block of faqBlocks) {
    if (block.type === "h6") faqs.push({ question: block.text, answers: [] });
    else if (block.type === "p" && faqs.length)
      faqs.at(-1).answers.push(block.text);
  }
  const reviewBlocks = section("Hear From Our Customers");
  const reviewers = [
    ["Roger Dutton", "New Hampshire, USA"],
    ["Biniam Bedada", "Toronto, ON"],
    ["D Montes", "Ontario"],
    ["VIR DAVE", ""],
    ["Jennifer Anglin", ""],
    ["Francis Valpy", ""],
    ["Adam Worman", ""],
  ];
  const reviews = reviewers.map(([name, location]) => ({
    name,
    location,
    text: reviewBlocks[reviewBlocks.findIndex((b) => b.text === name) + 1]
      ?.text,
  }));
  const companyQuote = section("The main values of the company").find(
    (b) => b.type === "h2" && b.text.startsWith('"'),
  )?.text;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy about-grid-paper">
          <span className="eyebrow">THE PEOPLE BEHIND THE STEEL</span>
          <h1>
            BUILT ON
            <br />
            <em>BETTER</em>
            <br />
            WORK.
          </h1>
          <p>
            Premium metal roofing starts with people who care how every detail
            performs—today, and decades from now.
          </p>
          <span className="about-location">
            TORONTO & THE GREATER TORONTO AREA
          </span>
        </div>
        <div className="about-hero-photo">
          <img
            src="/images/photo-5.webp"
            alt="Rudan red metal roofing on a home in Mississauga"
            fetchPriority="high"
          />
          <div className="about-photo-label">
            <strong>MADE HERE.</strong>
            <span>MADE FOR ONTARIO</span>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-manifesto">
          <span className="eyebrow">OUR POINT OF VIEW</span>
          <h2>
            A ROOF
            <br />
            ISN’T A<br />
            SHORT-TERM
            <br />
            DECISION.
          </h2>
          <span className="about-small-note">
            NEITHER IS OUR COMMITMENT TO YOU.
          </span>
        </div>
        <div className="about-story-body">
          <span className="eyebrow">WHY RUDAN</span>
          <h2>
            WE MAKE THE
            <br />
            COMPLEX FEEL
            <br />
            STRAIGHTFORWARD.
          </h2>
          <p className="about-story-intro">
            Premium quality work & materials.
            <br />
            At wallet-friendly prices.
          </p>
          <div className="about-story-columns">
            <Pairs blocks={story} />
          </div>
          <a className="text-link" href="/shop">
            Find your roofing profile <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="about-values wrap about-section">
        <span className="eyebrow">WHAT GUIDES US</span>
        <h2>OUR VALUES, IN PRACTICE.</h2>
        <p className="about-section-intro">
          Not statements for a wall. Standards for every conversation,
          measurement, and installation.
        </p>
        <div className="about-value-list">
          {values.map(([title, text], i) => (
            <article className="about-value-row" key={title}>
              <span className="about-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-team">
        <div className="about-team-portrait">
          <span className="eyebrow">FAMILY OWNED. PERSONALLY INVESTED.</span>
          <img
            src="/images/8878af4ce6b6.webp"
            alt="The three Rudan brothers, the team behind Rudan Roofing"
            loading="lazy"
          />
          <div className="about-team-caption">
            <span>THE RUDAN BROTHERS</span>
            <ArrowUpRight size={23} />
          </div>
        </div>
        <div className="about-team-copy">
          <span className="eyebrow">EXPERIENCE MEETS PURPOSE</span>
          <h2>
            REAL PEOPLE.
            <br />
            SHARED PRIDE.
            <br />
            <em>BETTER ROOFS.</em>
          </h2>
          <h3>
            Led by passionate experts, committed to excellence and community
            engagement.
          </h3>
          <Pairs blocks={leadership} />
          <a className="text-link" href="/community-service">
            See our community work <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="about-endure">
        <div className="about-endure-photo">
          <img
            src="/images/photo-4.webp"
            alt="Detailed Rudan metal roof installation in the evening light"
            loading="lazy"
          />
          <div className="about-experience">
            <strong>10+ YEARS</strong>
            <span>OF ROOFING EXPERIENCE</span>
          </div>
        </div>
        <div className="about-endure-copy">
          <span className="eyebrow">DESIGNED TO ENDURE</span>
          <h2>
            LESS WASTE.
            <br />
            MORE LIFE.
            <br />
            <span>BETTER VALUE.</span>
          </h2>
          <p>
            Metal roofing offers a longer view: durable performance, recyclable
            material, and fewer replacement cycles. Quality materials and
            careful workmanship make the difference.
          </p>
          <div className="about-endure-details">
            <div>
              <h3>PRECISION</h3>
              <p>Quality in every detail</p>
            </div>
            <div>
              <h3>LONGEVITY</h3>
              <p>Built beyond one season</p>
            </div>
          </div>
          <a href="/roof-on-a-pallet" className="text-link">
            Discover Roof on a Pallet <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="about-benefits wrap about-section">
        <div className="about-heading-row">
          <div>
            <span className="eyebrow">FORWARD THINKING. LONG LASTING.</span>
            <h2>
              FORGET SHINGLES.
              <br />
              THINK <em>METAL.</em>
            </h2>
          </div>
          <p>
            Why metal roofing is the #1 choice for smart homeowners in Toronto.
          </p>
        </div>
        <div className="about-benefit-grid">
          {benefits.map((b, i) => (
            <article key={b.title}>
              <span className="about-number">0{i + 1}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-services">
        <div className="wrap about-section">
          <div className="about-heading-row">
            <div>
              <span className="eyebrow">
                FROM THE COIL TO THE FINISHING TOUCH
              </span>
              <h2>
                GOOD WORK.
                <br />
                AT EVERY STEP.
              </h2>
            </div>
            <p>
              Protect your property with Rudan Roofing services. Materials,
              manufacturing, and the details that bring your project together.
            </p>
          </div>
          <div className="about-service-list">
            {services.map((s, i) => (
              <a className="about-service-row" href={s.href} key={s.title}>
                <span className="about-number">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ArrowUpRight size={24} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="about-community wrap about-section">
        <span className="eyebrow">MORE THAN THE ROOFS WE BUILD</span>
        <blockquote>{companyQuote}</blockquote>
        <div className="about-community-bottom">
          <p>
            Family, craft, and community.
            <br />
            That’s the Rudan way.
          </p>
          <div className="about-social-links">
            <a
              href="https://www.youtube.com/@RUDANBROTHERS/featured"
              target="_blank"
              rel="noreferrer"
            >
              <Play size={17} /> Watch our stories <ArrowUpRight size={16} />
            </a>
            <a
              href="https://www.instagram.com/rudan_brothers/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight size={16} />
            </a>
            <a
              href="https://www.facebook.com/rudanroofing1/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="about-reviews">
        <div className="wrap about-section">
          <div className="about-heading-row">
            <div>
              <span className="eyebrow">THE WORD ON OUR WORK</span>
              <h2>
                GOOD PEOPLE.
                <br />
                KIND WORDS.
              </h2>
            </div>
            <a
              className="text-link"
              href="https://g.page/r/CeZzzKw9pt2YEAI/review"
              target="_blank"
              rel="noreferrer"
            >
              Place your review <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="about-review-grid">
            {reviews.map((r, i) => (
              <figure
                className={`about-review ${i === 0 ? "featured" : ""}`}
                key={r.name}
              >
                <span className="about-quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className="about-review-initial" aria-hidden="true">
                    {r.name[0]}
                  </span>
                  <div>
                    <strong>{r.name}</strong>
                    {r.location && <small>{r.location}</small>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="about-faq wrap about-section">
        <div className="about-faq-heading">
          <span className="eyebrow">GOOD QUESTIONS. STRAIGHT ANSWERS.</span>
          <h2>
            LET’S GET
            <br />
            INTO THE
            <br />
            <em>DETAILS.</em>
          </h2>
          <p>
            Everything you’ve been wondering about metal roofing, from everyday
            performance to the finer details.
          </p>
          <a className="text-link" href="/contact-us">
            Ask the Rudan team <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="about-faq-list">
          {faqs.map((f, i) => (
            <details className="faq" key={f.question} open={i === 0}>
              <summary>
                <span>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {f.question}
                </span>
                <Plus size={20} />
              </summary>
              {f.answers[0] === "PRODUCT" ? (
                <div className="about-weight-table">
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

      <section className="about-final about-grid-paper">
        <div className="wrap">
          <span className="eyebrow">YOUR ROOF. OUR RESPONSIBILITY.</span>
          <h2>
            LET’S BUILD
            <br />
            SOMETHING THAT
            <br />
            <em>LASTS.</em>
          </h2>
          <p>
            Tell us what you’re planning. We’ll help you understand the right
            system, finish, and next step for your property.
          </p>
          <div>
            <Action>Start Your Estimate</Action>
            <Action outline href="/projects">
              Explore Our Work
            </Action>
          </div>
          <p className="about-dealer-note">
            Authorized dealer: <strong>Four Seasons Metal Roofing</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
