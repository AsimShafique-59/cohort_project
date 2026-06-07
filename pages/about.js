import Head from 'next/head';
import Link from 'next/link';
import StoreLayout from '../components/StoreLayout';

const values = [
  {
    title: 'Quality First',
    description:
      'Every product in our catalog is hand-picked and held to rigorous standards. We only carry items we would confidently use ourselves.',
  },
  {
    title: 'Radical Transparency',
    description:
      'No hidden fees, no confusing fine print. Pricing, shipping, and returns are straightforward so you always know what you are getting.',
  },
  {
    title: 'Sustainable Sourcing',
    description:
      'We work with suppliers who share our commitment to ethical production, fair wages, and reduced environmental impact.',
  },
  {
    title: 'Customer Obsessed',
    description:
      'Our support team is real people who care. From pre-purchase questions to post-delivery issues, we stand behind every order.',
  },
];

const team = [
  { name: 'Asim Shafique', role: 'Founder & CEO', initials: 'AS' },
  { name: 'Sara Khan', role: 'Head of Product', initials: 'SK' },
  { name: 'Omar Tariq', role: 'Lead Engineer', initials: 'OT' },
  { name: 'Mia Reyes', role: 'Design Director', initials: 'MR' },
];

const milestones = [
  { year: '2020', event: 'Brand Store founded with a catalog of 12 products.' },
  { year: '2021', event: 'Crossed 10,000 orders and launched our mobile-first experience.' },
  { year: '2022', event: 'Expanded to 4 major categories and introduced same-day dispatch.' },
  { year: '2023', event: 'Reached 50,000 happy customers across the region.' },
  { year: '2024', event: 'Launched our loyalty program and warehouse fulfillment centre.' },
  { year: '2025', event: 'Rebuilt on a modern full-stack platform for faster, smarter shopping.' },
];

export default function About() {
  return (
    <StoreLayout>
      <Head>
        <title>About Us | Brand Store</title>
        <meta
          name="description"
          content="Learn about Brand Store — our story, mission, values, and the team behind the products you love."
        />
      </Head>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow">Our story</p>
            <h1>Built for people who care about what they buy.</h1>
            <p>
              Brand Store started with a simple frustration: too many online stores buried great
              products under bad experiences. We set out to fix that — one carefully chosen item at
              a time.
            </p>
            <Link className="button primary" href="/products">
              Shop the catalog
            </Link>
          </div>
          <div className="about-hero-image" aria-hidden="true" />
        </section>

        {/* ── Mission ──────────────────────────────────────────── */}
        <section className="about-mission section">
          <div className="about-mission-inner">
            <p className="eyebrow">Mission</p>
            <h2>We exist to make quality accessible.</h2>
            <p>
              Premium does not have to mean expensive or exclusive. Our mission is to bring
              thoughtfully sourced, durable everyday products to everyone — with a shopping
              experience that respects your time and intelligence.
            </p>
          </div>
          <div className="about-mission-stat-grid">
            <div className="about-stat">
              <strong>50 K+</strong>
              <span>happy customers</span>
            </div>
            <div className="about-stat">
              <strong>30+</strong>
              <span>curated products</span>
            </div>
            <div className="about-stat">
              <strong>4</strong>
              <span>product categories</span>
            </div>
            <div className="about-stat">
              <strong>24 h</strong>
              <span>average dispatch</span>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────── */}
        <section className="section">
          <div className="section-heading compact">
            <p className="eyebrow">What we stand for</p>
            <h2>Our values</h2>
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <section className="section">
          <div className="section-heading compact">
            <p className="eyebrow">How we got here</p>
            <h2>Our journey</h2>
          </div>
          <ol className="timeline">
            {milestones.map((m) => (
              <li className="timeline-item" key={m.year}>
                <span className="timeline-year">{m.year}</span>
                <p className="timeline-event">{m.event}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Team ─────────────────────────────────────────────── */}
        <section className="section">
          <div className="section-heading compact">
            <p className="eyebrow">The people behind it</p>
            <h2>Meet the team</h2>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div className="team-card" key={member.name}>
                <div className="team-avatar" aria-hidden="true">
                  {member.initials}
                </div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="about-cta">
          <h2>Ready to find your next favourite thing?</h2>
          <p>Browse our full catalog and discover products built to last.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/products">
              Shop now
            </Link>
            <Link className="button secondary" href="/account">
              Create an account
            </Link>
          </div>
        </section>
      </main>
    </StoreLayout>
  );
}
