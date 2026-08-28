import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Home, Building2, Hotel, Armchair, 
  Layers, Hammer, Cpu, Paintbrush, ClipboardCheck, CheckCircle 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─────────────────────────────────────────────
   OFFICIAL 9 COMPANY SPECIALIZATIONS
───────────────────────────────────────────── */
const categories = [
  {
    name: 'Residential Interior Design',
    subtitle: 'Creating stunning, functional, and luxurious living spaces.',
    icon: Home,
    accentColor: 'amber',
    borderClass: 'border-amber-500/40 hover:border-amber-400',
    iconClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    glowClass: 'shadow-amber-500/30',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-yellow-600',
    ringClass: 'ring-amber-500/50',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    products: [
      'Luxury Home Interiors – High-end designs with bespoke furniture.',
      'Modern & Minimalist Spaces – Clean layouts and smart storage solutions.',
      'Traditional & Heritage Interiors – Timeless aesthetics with rich craftsmanship.',
      'Apartment & Condo Interiors – Maximizing small spaces with efficiency.',
      'Villa & Penthouse Designs – Grand layouts with customized luxury elements.',
      'Smart Home Integrations – Automated lighting, security, and climate control.'
    ],
    price: 'Bespoke Quote',
    leadTime: '30-45 Days',
  },
  {
    name: 'Commercial Interior Design',
    subtitle: 'Enhancing business spaces for productivity and brand identity.',
    icon: Building2,
    accentColor: 'cyan',
    borderClass: 'border-cyan-500/40 hover:border-cyan-400',
    iconClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    glowClass: 'shadow-cyan-500/30',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-sky-600',
    ringClass: 'ring-cyan-500/50',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    products: [
      'Corporate Office Design – Open workspaces & ergonomic furniture.',
      'Coworking & Business Hubs – Innovative dynamic layouts.',
      'Retail Store Interiors – Optimized customer engagement & merchandising.',
      'Showroom & Exhibition Spaces – Strategic product display layouts.',
      'Wellness & Healthcare Clinics – Modern, clean, and calming spaces.',
      'Banking & Financial Institutions – Professional and secure interiors.'
    ],
    price: 'Corporate Rates',
    leadTime: '30-60 Days',
  },
  {
    name: 'Hospitality & Leisure Design',
    subtitle: 'Crafting immersive experiences through design excellence.',
    icon: Hotel,
    accentColor: 'rose',
    borderClass: 'border-rose-500/40 hover:border-rose-400',
    iconClass: 'text-rose-400',
    bgClass: 'bg-rose-500/10',
    glowClass: 'shadow-rose-500/30',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-600',
    ringClass: 'ring-rose-500/50',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    products: [
      'Hotel & Resort Interiors – Elegant lobbies, suites, and guest rooms.',
      'Restaurant & Café Design – Ambient themed interiors.',
      'Bars & Nightclubs – Trendy, vibrant, and experience-driven setups.',
      'Spas & Wellness Centers – Serene, rejuvenating environments.',
      'Event & Banquet Spaces – Grand setups for special occasions.'
    ],
    price: 'Turnkey Resort',
    leadTime: '45-90 Days',
  },
  {
    name: 'Custom Furniture & Bespoke Solutions',
    subtitle: 'Personalized, high-quality furniture designs tailored to clients’ needs.',
    icon: Armchair,
    accentColor: 'yellow',
    borderClass: 'border-yellow-500/40 hover:border-yellow-400',
    iconClass: 'text-yellow-400',
    bgClass: 'bg-yellow-500/10',
    glowClass: 'shadow-yellow-500/30',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-amber-600',
    ringClass: 'ring-yellow-500/50',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    products: [
      'Luxury Custom Furniture – Sofas, beds, dining tables & statement pieces.',
      'Modular & Space-Saving Furniture – Smart storage & convertible designs.',
      'Office & Commercial Furniture – Workstations & ergonomic seating.',
      'Eco-Friendly & Sustainable Materials – Reclaimed Ceylon teak & hardwood.'
    ],
    price: 'Custom Built',
    leadTime: '21-35 Days',
  },
  {
    name: 'Smart Space Planning & 3D Visualization',
    subtitle: 'Visualizing spaces with precision before construction begins.',
    icon: Layers,
    accentColor: 'emerald',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400',
    iconClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    glowClass: 'shadow-emerald-500/30',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-green-600',
    ringClass: 'ring-emerald-500/50',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    products: [
      'Architectural Layout Optimization – Maximizing space efficiency.',
      '3D Rendering & Virtual Walkthroughs – Ultra-realistic project previews.',
      'Lighting & Ceiling Design – Custom LED, chandeliers & false ceilings.',
      'Flooring & Wall Finishes – Hardwood, marble, feature walls & wallpapers.'
    ],
    price: 'Free Consultation',
    leadTime: '7-14 Days',
  },
  {
    name: 'Renovation & Makeovers',
    subtitle: 'Transforming existing spaces into modern architectural masterpieces.',
    icon: Hammer,
    accentColor: 'orange',
    borderClass: 'border-orange-500/40 hover:border-orange-400',
    iconClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10',
    glowClass: 'shadow-orange-500/30',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-600',
    ringClass: 'ring-orange-500/50',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    products: [
      'Home & Apartment Renovations – Complete layout & interior updates.',
      'Office & Commercial Space Revamps – Enhancing aesthetics & functionality.',
      'Retail & Hospitality Upgrades – Modernizing customer engagement areas.',
      'Historic & Heritage Property Restoration – Preserving classic architecture.'
    ],
    price: '40 Days Package',
    leadTime: '30-40 Days',
  },
  {
    name: 'Home Automation & Smart Living Solutions',
    subtitle: 'Enhancing convenience and security through cutting-edge technology.',
    icon: Cpu,
    accentColor: 'sky',
    borderClass: 'border-sky-500/40 hover:border-sky-400',
    iconClass: 'text-sky-400',
    bgClass: 'bg-sky-500/10',
    glowClass: 'shadow-sky-500/30',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-blue-600',
    ringClass: 'ring-sky-500/50',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
    products: [
      'Smart Lighting & Climate Control – Automated ambient comfort.',
      'Voice-Controlled Home Systems – Alexa, Google Assistant & IoT integration.',
      'Security & Surveillance – Smart locks, IP cameras & motion sensors.',
      'Automated Curtains & Blinds – Remote & scheduled motor control.',
      'Entertainment & Media Rooms – High-tech home theaters & immersive audio.'
    ],
    price: 'Smart Tech',
    leadTime: '14-28 Days',
  },
  {
    name: 'Interior Branding & Concept Development',
    subtitle: 'Aligning interior spaces with brand identity and customer experience.',
    icon: Paintbrush,
    accentColor: 'violet',
    borderClass: 'border-violet-500/40 hover:border-violet-400',
    iconClass: 'text-violet-400',
    bgClass: 'bg-violet-500/10',
    glowClass: 'shadow-violet-500/30',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-600',
    ringClass: 'ring-violet-500/50',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800',
    products: [
      'Retail Store Branding & Concepts – Enhancing brand storytelling.',
      'Corporate Identity Integration – Office interiors reflecting core values.',
      'Hospitality Experience Design – Unique identities for hotels & cafes.',
      'Color Psychology & Signage Solutions – Immersive brand elements.'
    ],
    price: 'Brand Package',
    leadTime: '14-30 Days',
  },
  {
    name: 'Project Management & Consultation',
    subtitle: 'Ensuring seamless execution from initial concept to final handover.',
    icon: ClipboardCheck,
    accentColor: 'emerald',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400',
    iconClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    glowClass: 'shadow-emerald-500/30',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    ringClass: 'ring-emerald-500/50',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=800',
    products: [
      'End-to-End Project Coordination – Managing budgets, timelines & vendors.',
      'On-Site Supervision & Quality Control – Strict construction monitoring.',
      'Vendor & Supplier Management – Sourcing top-tier materials.',
      'Cost & Risk Management – Preventing overruns & optimizing efficiency.',
      'Sustainability Consulting – Eco-conscious construction advice.'
    ],
    price: 'Full Oversight',
    leadTime: 'Full Duration',
  },
];

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────
   HERO GRID CARD
───────────────────────────────────────────── */
function HeroGridCard({ category, index }) {
  const { setCategoryTheme } = useTheme?.() ?? {};

  return (
    <Link 
      to="/contact" 
      onClick={() => setCategoryTheme?.(category.name)}
      className="block"
    >
      <motion.div
        className={`relative group overflow-hidden rounded-2xl h-72 md:h-80 border ${category.borderClass} cursor-pointer transition-all duration-500`}
        variants={fadeUp}
        custom={index}
        whileHover={{ scale: 1.02, boxShadow: '0 20px 50px -10px rgba(0,0,0,0.6)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-500 group-hover:opacity-70" />
        <div className={`absolute inset-0 bg-gradient-to-t ${category.gradientFrom} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

        <div className={`absolute top-4 left-4 flex items-center px-3 py-1.5 rounded-full ${category.bgClass} backdrop-blur-sm border border-white/10`}>
          <span className="text-xs font-semibold text-white/90 tracking-wide">{category.name}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1.5">
          <h3 className="text-white font-extrabold text-lg sm:text-xl leading-tight drop-shadow-md">{category.name}</h3>
          <p className="text-neutral-300 text-xs leading-relaxed line-clamp-2">{category.subtitle}</p>
          <div className="pt-2 flex items-center justify-between">
            <span className={`text-xs font-bold ${category.iconClass} inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
              Consult Architect <ArrowRight size={13} />
            </span>
            <span className="text-[10px] text-neutral-400 font-semibold px-2 py-0.5 rounded bg-white/10">
              {category.leadTime}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   DETAIL CARD
───────────────────────────────────────────── */
function DetailCard({ category, index }) {
  const isEven = index % 2 === 0;

  const textContent = (
    <motion.div
      className="flex flex-col justify-center gap-5 py-4"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div>
        <p className={`text-xs font-bold uppercase tracking-widest ${category.iconClass} mb-0.5`}>
          Specialization 0{index + 1}
        </p>
        <h3 className="text-white text-2xl font-extrabold leading-tight">{category.name}</h3>
      </div>

      <p className="text-neutral-300 text-sm italic font-medium leading-relaxed">{category.subtitle}</p>

      <ul className="space-y-2.5">
        {category.products.map((product) => (
          <li key={product} className="flex items-start gap-2.5">
            <CheckCircle size={16} className={`${category.iconClass} mt-0.5 flex-shrink-0`} />
            <span className="text-neutral-300 text-sm leading-snug">{product}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${category.bgClass} ${category.iconClass} border border-white/10`}>
          {category.price}
        </span>
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-neutral-300 border border-white/10">
          ⏱ {category.leadTime}
        </span>
        <Link
          to="/contact"
          className={`ml-auto inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-all duration-300 group`}
        >
          Request Proposal
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      className="relative overflow-hidden rounded-2xl h-72 md:h-96 border border-white/10 shadow-2xl"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`} />
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 border-b border-white/10 last:border-none">
      {isEven ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden">

      {/* Decorative ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-64 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <section className="pt-36 lg:pt-40 pb-16 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-extrabold tracking-widest uppercase">Creative Living · Official Profile</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <span className="text-white">Our 9 Core Architectural</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              & Interior Specializations
            </span>
          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto text-neutral-300 text-base md:text-lg leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            From luxury residential villas and commercial offices to custom bespoke Ceylon teak furniture, smart home automation, and 3D space visualization — explore Creative Living's complete official service portfolio.
          </motion.p>
        </section>

        {/* 9 Grid Overview */}
        <section className="pb-24">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat, i) => (
              <HeroGridCard key={cat.name} category={cat} index={i} />
            ))}
          </motion.div>
        </section>

        {/* Comprehensive Breakdown */}
        <section className="pb-24">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Official Service Catalog</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              Comprehensive Service Breakdown
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {categories.map((cat, i) => (
              <DetailCard key={cat.name} category={cat} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-28">
          <motion.div
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center border border-amber-500/30 bg-neutral-900/90 shadow-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Bring Your Architectural Vision to Life
            </h2>
            <p className="text-neutral-300 text-sm md:text-base max-w-2xl mx-auto mb-8">
              Contact Creative Living's architects and interior design team today for free 3D space planning, consultations, and estimates.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 transition-all duration-300"
            >
              Get Free Architect Consultation
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
