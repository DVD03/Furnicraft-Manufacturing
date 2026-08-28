import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trees, Gem, ChefHat, Hotel, Building2, Flower2, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─────────────────────────────────────────────
   CATEGORIES DATA
───────────────────────────────────────────── */
const categories = [
  {
    name: 'Wood & Timber',
    icon: Trees,
    accentColor: 'amber',
    borderClass: 'border-amber-500/40 hover:border-amber-400',
    iconClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    glowClass: 'shadow-amber-500/30',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-yellow-600',
    ringClass: 'ring-amber-500/50',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    desc: 'Handcrafted Ceylon Teak & Mahogany furniture with traditional Sri Lankan craftsmanship',
    products: ['Ceylon Teak Furniture', 'Mahogany Wardrobes', 'Custom Teak Pantry', 'Timber Wall Paneling'],
    price: 'From 15 Lakhs',
    leadTime: '30-45 Days',
  },
  {
    name: 'Glass & Mirror',
    icon: Gem,
    accentColor: 'cyan',
    borderClass: 'border-cyan-500/40 hover:border-cyan-400',
    iconClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    glowClass: 'shadow-cyan-500/30',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-sky-600',
    ringClass: 'ring-cyan-500/50',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    desc: '12mm tempered glass balustrades, mirror walls, and glass partition systems',
    products: ['Tempered Glass Balustrades', 'Mirror Feature Walls', 'Glass Partitions', 'Shower Enclosures'],
    price: 'From 8 Lakhs',
    leadTime: '21-30 Days',
  },
  {
    name: 'Pantry & Kitchen',
    icon: ChefHat,
    accentColor: 'yellow',
    borderClass: 'border-yellow-500/40 hover:border-yellow-400',
    iconClass: 'text-yellow-400',
    bgClass: 'bg-yellow-500/10',
    glowClass: 'shadow-yellow-500/30',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-500',
    ringClass: 'ring-yellow-500/50',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    desc: 'Italian quartz countertops, acrylic cabinet fronts, and modular kitchen systems',
    products: ['Italian Quartz Tops', 'Acrylic Cabinet Fronts', 'Modular Kitchen Systems', 'Custom Island Units'],
    price: 'From 20 Lakhs',
    leadTime: '35-45 Days',
  },
  {
    name: 'Hotel Furniture',
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
    desc: 'Luxury resort villa and suite furniture for boutique hotels and resorts',
    products: ['Resort Villa Furniture', 'Suite Wardrobes & Beds', 'Lobby Fit-outs', 'Restaurant Seating'],
    price: 'From 50 Lakhs',
    leadTime: '45-60 Days',
  },
  {
    name: 'Construction & Architecture',
    icon: Building2,
    accentColor: 'orange',
    borderClass: 'border-orange-500/40 hover:border-orange-400',
    iconClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10',
    glowClass: 'shadow-orange-500/30',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-600',
    ringClass: 'ring-orange-500/50',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800',
    desc: '40 Days / 40 Lakhs signature villa build package on 10-perch land plots (1750 sqft)',
    products: ['40 Days Villa Build (1750 sqft)', 'Architectural 3D Drawings', 'Interior Fit-out Packages', 'Bank Guarantee Included'],
    price: 'From 40 Lakhs',
    leadTime: '40 Days',
  },
  {
    name: 'Outdoor Furniture',
    icon: Flower2,
    accentColor: 'emerald',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400',
    iconClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    glowClass: 'shadow-emerald-500/30',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-green-600',
    ringClass: 'ring-emerald-500/50',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    desc: 'All-weather teak patio sets, garden decking, and pergola structures',
    products: ['Teak Patio Dining Sets', 'Garden Decking', 'Pergola Structures', 'Outdoor Loungers'],
    price: 'From 10 Lakhs',
    leadTime: '21-30 Days',
  },
];

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -72 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 72 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────────
   HERO GRID CARD
───────────────────────────────────────────── */
function HeroGridCard({ category, index }) {
  const { setCategoryTheme } = useTheme?.() ?? {};

  return (
    <Link 
      to="/gallery" 
      onClick={() => setCategoryTheme?.(category.name)}
      className="block"
    >
      <motion.div
        className={`relative group overflow-hidden rounded-2xl h-72 md:h-80 border ${category.borderClass} cursor-pointer transition-all duration-500`}
        variants={fadeUp}
        custom={index}
        whileHover={{ scale: 1.03, boxShadow: '0 25px 60px -10px rgba(0,0,0,0.6)' }}
        style={{ willChange: 'transform' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${category.image})` }}
        />

        {/* Default dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-60" />

        {/* Hover color tint */}
        <div className={`absolute inset-0 bg-gradient-to-t ${category.gradientFrom} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Colored border glow on hover */}
        <div className={`absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ${category.ringClass} transition-all duration-500`} />

        {/* Category Pill Tag */}
        <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${category.bgClass} backdrop-blur-sm border border-white/10`}>
          <span className="text-xs font-semibold text-white/90 tracking-wide">{category.name}</span>
        </div>

        {/* Bottom content — always visible title, description on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{category.name}</h3>

          {/* Revealed on hover */}
          <p className="text-white/75 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out">
            {category.desc}
          </p>
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${category.iconClass} hover:underline`}
            >
              View Projects <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   DETAIL CARD (alternating layout)
───────────────────────────────────────────── */
function DetailCard({ category, index }) {
  const isEven = index % 2 === 0; // even → image left, text right

  const textContent = (
    <motion.div
      className="flex flex-col justify-center gap-6 py-4"
      variants={isEven ? slideRight : slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4">
        <div className={`p-3.5 rounded-2xl ${category.bgClass} border border-white/10 shadow-lg ${category.glowClass} shadow-lg`}>
          <category.icon size={28} className={category.iconClass} />
        </div>
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest ${category.iconClass} mb-0.5`}>Category 0{index + 1}</p>
          <h3 className="text-white text-2xl font-bold leading-tight">{category.name}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-400 text-sm leading-relaxed">{category.desc}</p>

      {/* Products list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {category.products.map((product) => (
          <li key={product} className="flex items-start gap-2">
            <CheckCircle size={15} className={`${category.iconClass} mt-0.5 flex-shrink-0`} />
            <span className="text-neutral-300 text-sm">{product}</span>
          </li>
        ))}
      </ul>

      {/* Price + Lead Time + CTA */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${category.bgClass} ${category.iconClass} border border-white/10`}>
          {category.price}
        </span>
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-neutral-300 border border-white/10">
          ⏱ {category.leadTime}
        </span>
        <Link
          to="/gallery"
          onClick={() => setCategoryTheme?.(category.name)}
          className={`ml-auto inline-flex items-center gap-1.5 text-xs font-bold ${category.iconClass} hover:underline group`}
        >
          Explore Gallery
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      className="relative overflow-hidden rounded-2xl h-64 md:h-80"
      variants={isEven ? slideLeft : slideRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
      {/* gradient tint */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradientFrom}/10 ${category.gradientTo}/5`} />
      {/* subtle border glow */}
      <div className={`absolute inset-0 rounded-2xl ring-1 ${category.ringClass}`} />
    </motion.div>
  );

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center py-10 border-b border-white/5 last:border-none`}
    >
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
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">

      {/* ── Decorative ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute top-1/3 -right-64 w-[700px] h-[700px] rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════════════════════════════════════
            SECTION 1 — PAGE HERO
        ══════════════════════════════════════════ */}
        <section className="pt-36 lg:pt-40 pb-16 text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Furnicraft Manufacturing · Specializations</span>
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <span className="text-white">Explore Our</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Specializations
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            From bespoke teak masterpieces to full villa builds — six world-class categories crafted for Sri Lanka's finest residences, hotels, and commercial spaces.
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-500/60" />
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-500/60" />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — HERO IMAGE GRID (3×2)
        ══════════════════════════════════════════ */}
        <section className="pb-24">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat, i) => (
              <HeroGridCard key={cat.name} category={cat} index={i} />
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — DETAIL CARDS (alternating)
        ══════════════════════════════════════════ */}
        <section className="pb-24">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">In Depth</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              What We Craft for You
            </h2>
            <p className="mt-3 text-neutral-500 text-sm max-w-lg mx-auto">
              Every category represents years of mastery, premium materials, and a commitment to uncompromising quality.
            </p>
          </motion.div>

          {/* Alternating detail cards */}
          <div className="divide-y divide-white/5">
            {categories.map((cat, i) => (
              <DetailCard key={cat.name} category={cat} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 — FINAL CTA
        ══════════════════════════════════════════ */}
        <section className="pb-28">
          <motion.div
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center border border-amber-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(217,119,6,0.15) 0%, rgba(161,98,7,0.08) 40%, rgba(10,10,10,0.9) 100%)',
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Decorative glow spots */}
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-amber-500/20 pointer-events-none" />

            {/* Gold shimmer line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            <div className="relative z-10">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Limited Project Slots Available
              </span>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Ready to Begin Your{' '}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  Dream Project?
                </span>
              </h2>
              <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                Connect with Furnicraft's design consultants today. Get a detailed quote, 3D visualization, and project timeline — completely free.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-sm shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300"
                >
                  Get an Instant Quote
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-amber-400/50 hover:text-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  Browse Gallery
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Trust row */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-neutral-500 text-xs">
                {['Bank Guarantee Included', 'ISO Certified Materials', '15+ Years Experience', 'Free 3D Design'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-amber-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
