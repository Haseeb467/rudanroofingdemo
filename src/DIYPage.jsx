import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import "./diy.css";

const measureList = [
  "All Eave Lengths",
  "All Valley Lengths",
  "All Hip Lengths",
  "All Wall Intersections (including around dormers)",
  "All Transition Lengths (with the pitch change - ex. 4/12 to 8/12)",
  "Lengths around all sides of chimneys and skylights",
  "The position of all pipes and roof venting",
  "Will this product be installed on top of shingles or onto strapping? If on shingles, how many layers?",
  "Note the pitch of the roof & specify for all sections if the pitch varies",
];

const installPoints = [
  ["Exceeding Expectations", "Our courteous and professional staff will ensure your metal roof installation surpasses expectations."],
  ["Quick Response & Quality", "Stellar guarantees prompt responses, delivering top-quality products and services every time with well-trained, dedicated staff."],
  ["Expert Knowledge & Craftsmanship", "We provide quality solutions for all roofing needs using the latest technology for steel and aluminum preparation."],
  ["Safety & Efficiency", "Our constantly updated tools, trucks, and equipment ensure safe and efficient work, meeting industry standards."],
  ["Top-Quality Materials", "We use the best Swedish steel, offering competitive prices."],
  ["Versatile Applications", "Suitable for new construction and re-roofing. Recommended installation over existing shingles with vapor permeable membrane and wood strapping."],
  ["Condensation Prevention", "For spaced framing (e.g., barns, churches), use a moisture membrane like Drip Stop to prevent condensation."],
  ["Installation Process", "Prepare roof deck with vapor permeable membrane and wood strapping. Install starting flashing, inside hip, gables, and valleys. Fasten custom cut steel panels to wood strapping. Install outside gable, wall flashing, ridge caps, end caps, and snow guards for a watertight seal."],
  ["Customized Projects", "Discuss with your Stellar sales representative and project supervisor for a customized installation plan."],
  ["How-To Video", "Watch our new video illustrating the correct steps to install your metal roof."],
];

const roofTypes = [
  "A-FRAME ROOF", "BONNET ROOF", "BUTTERFLY ROOF", "FRONT GABLE ROOF", "GABLE ROOF 3",
  "GABLE & VALLEY ROOF", "FLAT ROOF", "GABLE ROOF 3", "HEXAGONAL", "JERKINHEAD ROOF",
  "PYRAMID HIP ROOF", "MANSARD", "HIP ROOF", "BOX GABLE ROOF", "CLERESTORY",
];

function Action({ children, href = "/#estimate", outline = false }) {
  return (
    <a className={`button ${outline ? "outline" : ""}`} href={href}>
      {children} <ArrowUpRight size={18} />
    </a>
  );
}

function DiyTab({ page }) {
  return (
    <div className="diy-tab-content">
      <div className="diy-tab-text">
        <h2>DO IT YOURSELF</h2>
        <p>Our modular Stellar & Decora steel tile systems provides all the benefits of our full-length panels but due to its low waste factor offer significant savings.</p>
        <p>This stylish and durable product will not only look good once installed, but it will be affordable and easy on your budget as well. Commonly called <strong>"roof in a box"</strong> or <strong>"roof on the pallet"</strong>. The standard sized 47" x 28", 25 gauge tiles are easy to transport, store and handle, making it ideal for do-it-yourself market, DIY.</p>
        <p>The panels can quickly install over existing shingles, on 1/2" plywood or over 1" x 3" horizontal &amp; 1" x 2" vertical strapping, always check your local building codes. The tiles are installed in similar pattern as ordinary asphalt shingles, making the project easy and simple to install.</p>
        <p>Easy &amp; simple to use &amp; being only 1/3 the weight of regular asphalt shingles, it can be tackled by anyone with basic DIY skills.</p>
      </div>
      <div className="diy-tab-image">
        {page?.images[1] && <img src={page.images[1]} alt="Modular steel tiles stacked on pallet" loading="lazy" />}
        <p className="diy-tab-image-note">Stellar &amp; Decora steel tiles are ideal for gazebos, sheds, garages, homes, cottages, boat houses and roofs with high pitch.</p>
        <p className="diy-tab-image-note">Ordering the "roof in a box" is convenient as it is always readily available &amp; stocked in our warehouse.</p>
        <p className="diy-tab-image-note">From time of placing the order it will be ready for pick up or delivery within 24 hours. Steel tiles are sold separately, <strong>"purchase only what you need"</strong> for the project. If you run out, no problem, just come and get some more, as these items are always in stock.</p>
      </div>
    </div>
  );
}

function EstimatingTab() {
  return (
    <div className="diy-tab-content">
      <div className="diy-tab-text">
        <h2>ESTIMATING</h2>
        <h3>Total Square Footage</h3>
        <p>Here are sample drawings of some common roof types. Determine your roof type and provide an aerial drawing with all required measurements.</p>
        <p>To estimate how many shingles, you will need, you will need to know the total square footage of your roof surface.</p>
        <p>Find this number by measuring the length and width of each plane/section on the roof (including dormers), then multiply length by widths.</p>
        <p>To find/ calculate the roof's total square footage, simply add the square footage of each of the measured sections together.</p>
        <p>If you do not need drawing and quotation and you know exactly what you need, just come to our Rudan Metal Roofing "factory outlet" and place an order with one of our sales consultants.</p>
        <p>We will prepare the order for your immediate pick up and you are good to go!</p>
      </div>
      <div className="diy-tab-image">
        <p>Below you will find pictures of some common roof types. Determine your roof type and provide an aerial drawing with all required measurements. Please see below for some examples of what your drawing should include:</p>
        <div className="diy-roof-types">
          {roofTypes.map((type) => (
            <div className="diy-roof-type" key={type}>
              <div className="diy-roof-icon">
                <svg viewBox="0 0 80 60" fill="none"><path d="M10 50 L40 15 L70 50" stroke="#c8d8e4" strokeWidth="2" fill="#e8f0f6" /></svg>
              </div>
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MeasureTab() {
  return (
    <div className="diy-tab-content">
      <div className="diy-tab-text">
        <h2>HOW TO MEASURE</h2>
        <h3>Total Square Footage</h3>
        <p>First foremost you will need to complete a bird's eye view drawing of the roof. Our in-house technicians require that this diagram is completed with measurements on all straight lines on the roof. This information together with information listed next enables them to generate the accurate a quote. Please provide the measurements in feet and inches format.</p>
        <ul className="diy-check-list">
          {measureList.map((item) => (
            <li key={item}><Check size={18} /><span>{item}</span></li>
          ))}
        </ul>
        <p>Once a drawing with all measurements is complete, have it submitted to the Rudan Metal Roofing team, and we will send you a quote for all of the materials. The quote will show the required materials to complete your project.</p>
      </div>
      <div className="diy-tab-image">
        <div className="diy-diagrams">
          <div className="diy-diagram"><div className="diy-diagram-drawing"><svg viewBox="0 0 120 80" fill="none"><rect x="10" y="30" width="100" height="45" stroke="#333" strokeWidth="1.5" fill="white" /><path d="M10 30 L60 5 L110 30" stroke="#333" strokeWidth="1.5" fill="white" /></svg></div><div className="diy-diagram-label"><strong>Gable Roof</strong><ul><li>Measure and mark all eave lengths</li><li>Measure and mark all slope lengths</li><li>Measure and mark all ridge lengths</li></ul></div></div>
          <div className="diy-diagram"><div className="diy-diagram-drawing"><svg viewBox="0 0 120 80" fill="none"><rect x="10" y="30" width="100" height="45" stroke="#333" strokeWidth="1.5" fill="white" /><path d="M10 30 L60 5 L110 30" stroke="#333" strokeWidth="1.5" fill="white" /><path d="M60 5 L10 30" stroke="#333" strokeWidth="1" strokeDasharray="3" /><path d="M60 5 L110 30" stroke="#333" strokeWidth="1" strokeDasharray="3" /></svg></div><div className="diy-diagram-label"><strong>Hip Roof</strong><ul><li>Measure and mark all eave lengths</li><li>Measure and mark all slope lengths</li><li>Measure and mark all ridge lengths</li><li>Measure and mark all hip lengths</li></ul></div></div>
          <div className="diy-diagram"><div className="diy-diagram-drawing"><svg viewBox="0 0 120 80" fill="none"><rect x="10" y="30" width="100" height="45" stroke="#333" strokeWidth="1.5" fill="white" /><path d="M10 30 L60 5 L110 30" stroke="#333" strokeWidth="1.5" fill="white" /><path d="M60 5 L10 30" stroke="#333" strokeWidth="1" strokeDasharray="3" /><path d="M60 5 L110 30" stroke="#333" strokeWidth="1" strokeDasharray="3" /><path d="M40 55 L60 30" stroke="#333" strokeWidth="1" strokeDasharray="3" /><path d="M80 55 L60 30" stroke="#333" strokeWidth="1" strokeDasharray="3" /></svg></div><div className="diy-diagram-label"><strong>Hip gable and dormer roof</strong><ul><li>Measure and mark all eave lengths</li><li>Measure and mark all slope lengths</li><li>Measure and mark all ridge lengths</li><li>Measure and mark all hip lengths</li><li>Measure and mark all valley lengths</li></ul></div></div>
        </div>
      </div>
    </div>
  );
}

function OrderTab() {
  return (
    <div className="diy-tab-content diy-tab-full">
      <div className="diy-tab-text diy-tab-wide">
        <h2>HOW TO ORDER</h2>
        <p>Thank you for your inquiry <strong>Rudan Metal Roofing</strong> products. We are here to assist you and advise you on how best to place an order for the all the roofing materials-for the last roof you will ever need!</p>
        <p>Our team of technicians and estimators is aware that making a big purchase like this, can sometimes be overwhelming, so no worries, we are here to guide you along. We will require some information from you, to determine how best we can help you facilitate the purchase of the last roof you will ever need. We provide detailed quotations free of charge, on timely basis and provide competitive prices, the metal roofing is more affordable that you think.</p>
        <p>In order to get going we need to know whether this is DIY project, you will hire the contractor yourself, or do you need our installation services, knowing this will or have a contractor complete the installation for you. Knowing the answer, we can help make you the right choice and properly advise you on your next steps.</p>
        <p>Kindly tell us which profile you are interested in, as each profile entails slightly different estimating method, sometimes changing profiles can affect your quote amount.</p>
        <p>Please follow the instructions below, based on your answer to the previous preference.</p>
        <div className="diy-order-section">
          <h3>I Want My Project To Install My New Metal Roof Done By Hired Contractor...</h3>
          <p>1) Please call <strong>Rudan Metal Roofing</strong> at <a href="tel:1-647-535-1103"><strong>1-647-535-1103</strong></a> or <a href="tel:1-647-745-6455"><strong>1-647-745-6455</strong></a> and we can send the list of our approved &amp; preferred metal roofing installation contractors for your area.</p>
          <p>2) Once you choose a contractor.</p>
        </div>
        <div className="diy-order-section">
          <h3>New build project...</h3>
          <p>Provide your contractor with your roof architectural drawings-plans.</p>
          <p>The contractor will then provide you with an estimate based on the roof drawings-plans. Contractor will proceed with a site measure, establish material requirements and provide a final contract price on the materials and installation of your <strong>Rudan Metal Roof</strong>.</p>
        </div>
        <div className="diy-order-section">
          <h3>Retrofit project...</h3>
          <p>Make the arrangements for the contractor to visit your home and to perform a site measurement. Upon determining the material requirements and installation costs he will provide you with an estimate. The estimates are based of the profile chosen, required amount of material and the complexity and difficulty of the project.</p>
          <p>After proceeding with hiring the contractor you set the timelines of the installation of your new Stellar Metal Roofing.</p>
        </div>
        <div className="diy-order-section">
          <h3>DIY PROJECT...</h3>
          <p>First foremost you will need to complete a bird's eye view drawing of the roof. Our in-house technicians require that this diagram is completed with measurements on all straight lines on the roof. This information together with information listed next enables them to generate the accurate a quote. Please provide the measurements in feet and inches format.</p>
          <ul className="diy-check-list">
            {["All Ridge Lengths","All Eave to Ridge Lengths","All Eave Lengths","All Valley Lengths","All Hip Lengths","All Wall Intersections (including around dormers)","All Transition Lengths (with the pitch change - ex. 4/12 to 8/12)","Lengths around all sides of chimneys and skylights","The position of all pipes and roof venting","Will this product be installed on top of shingles or onto strapping? If on shingles, how many layers?","Note the pitch of the roof & specify for all sections if the pitch varies"].map((item) => (
              <li key={item}><Check size={18} /><span>{item}</span></li>
            ))}
          </ul>
          <p>Once a drawing with all measurements is complete, have it submitted to the Rudan Metal Roofing team, and we will send you a quote for all the materials. The quote will show the required materials to complete your project.</p>
        </div>
        <div className="diy-order-note">
          <h4>NOTE</h4>
          <p>When picking up the materials, please ensure that your vehicle and trailer is in good working order has the capacity to handle your load. The size of the roofing materials can vary, underestimating the vehicle size could possibly prevent our loading department to load materials into or onto vehicles deemed to be unsafe.</p>
          <p>When decision to proceed has been made, please contact <strong>Rudan Metal Roofing</strong> <a href="mailto:info@rudanroofing.com">via email</a> or phone and provide your quote number #. <strong>Rudan Metal Roofing</strong> will commence with production of the required materials and notify you once the materials are ready to be picked up. If you will have materials shipped, please advise of carrier details. If you wish to have us deliver your product, kindly advise and we will make the arrangements.</p>
        </div>
      </div>
    </div>
  );
}

function InstallTab({ videoUrl }) {
  const videoId = videoUrl ? videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1] : null;
  return (
    <div className="diy-tab-content diy-tab-full">
      <div className="diy-tab-text diy-tab-wide">
        <h2>HOW TO INSTALL A METAL ROOF</h2>
        <p>At <strong>Rudan Metal Roofing</strong>, we are dedicated to providing exceptional service and superior products for all your roofing needs. Our expert team is committed to delivering quality craftsmanship and ensuring your complete satisfaction with every project.</p>
        <ul className="diy-check-list diy-install-list">
          {installPoints.map(([title, text]) => (
            <li key={title}><Check size={18} /><span><strong>{title}:</strong> {text}</span></li>
          ))}
        </ul>
        {videoId && (
          <div className="diy-video-embed">
            <div className="diy-video-container">
              <iframe src={`https://www.youtube.com/embed/${videoId}`} title="DIY Metal Roof Installation Guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DIYPage({ page }) {
  const [activeTab, setActiveTab] = useState("diy");
  const videoUrl = page?.videos?.[0] || null;

  const tabs = [
    { id: "diy", label: "DIY", icon: "🛠" },
    { id: "estimating", label: "Estimating", icon: "📋" },
    { id: "measure", label: "How to Measure", icon: "✕" },
    { id: "order", label: "How to Order", icon: "↗" },
    { id: "install", label: "How to Install", icon: "🏠" },
  ];

  const tabContent = {
    diy: <DiyTab page={page} />,
    estimating: <EstimatingTab />,
    measure: <MeasureTab />,
    order: <OrderTab />,
    install: <InstallTab videoUrl={videoUrl} />,
  };

  return (
    <div className="diy-page">
      <section className="diy-hero">
        <div className="diy-hero-copy">
          <span className="eyebrow">DO IT YOURSELF</span>
          <h1>YOUR ROOF.<br /><em>YOUR WAY.</em></h1>
          <p>Expert tips and step-by-step instructions for installing your own metal roof. Watch our detailed video for a smooth DIY project.</p>
          <span className="diy-location">TORONTO & THE GREATER TORONTO AREA</span>
          <div className="diy-hero-buttons">
            <Action>Get a Free Estimate</Action>
            <Action outline href="/roof-on-a-pallet">Roof on a Pallet</Action>
          </div>
        </div>
        <div className="diy-hero-photo">
          {page?.images[0] && <img src={page.images[0]} alt="DIY metal roofing installation" fetchPriority="high" />}
          <div className="diy-photo-label"><strong>DIY.</strong><span>BUILD IT YOURSELF</span></div>
        </div>
      </section>

      <section className="diy-guide">
        <div className="diy-guide-inner wrap">
          <nav className="diy-sidebar" aria-label="DIY guide navigation">
            {tabs.map((tab) => (
              <button key={tab.id} className={`diy-sidebar-btn ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)} aria-pressed={activeTab === tab.id}>
                <span className="diy-sidebar-icon">{tab.icon}</span>
                <span className="diy-sidebar-label">{tab.label}</span>
                {activeTab === tab.id && <span className="diy-sidebar-line" />}
              </button>
            ))}
          </nav>
          <div className="diy-content">
            {tabContent[activeTab]}
          </div>
        </div>
      </section>

      <section className="diy-roap">
        <div className="wrap diy-roap-inner">
          <div>
            <span className="eyebrow">ROOF ON A PALLET</span>
            <h2>READY TO GO<br /><em>ROOF.</em></h2>
            <p>A Ready to go Roof that can be purchased as a whole or individual components from the pallets that are ready to Ship and to Install anywhere around the world.</p>
          </div>
          <div className="diy-roap-buttons">
            <Action href="/roof-on-a-pallet">Explore Roof on a Pallet</Action>
          </div>
        </div>
      </section>

      <section className="diy-final diy-grid-paper">
        <div className="wrap">
          <span className="eyebrow">YOUR ROOF. OUR RESPONSIBILITY.</span>
          <h2>LET'S BUILD<br />SOMETHING THAT<br /><em>LASTS.</em></h2>
          <p>Ready to start your DIY roofing project? Get in touch and we'll help you plan the right system for your property.</p>
          <div className="diy-final-buttons">
            <Action>Start Your Estimate</Action>
            <Action outline href="/projects">Explore Our Work</Action>
          </div>
          <p className="diy-dealer-note">Authorized dealer: <strong>Four Seasons Metal Roofing</strong>.</p>
        </div>
      </section>
    </div>
  );
}
