import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ShieldCheck, Award, ArrowRight, CheckCircle, 
  Compass, Trees, Gem, ChefHat, Hotel, Building2, Flower2, 
  Star, ChevronDown, Users, Clock, Play
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MarqueeSection = () => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 overflow-hidden py-3">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]" style={{ width: '200%' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 flex items-center justify-around text-black font-bold text-sm md:text-base px-4">
            <span>◆ Ceylon Teak Joinery</span>
            <span>◆ 100% Bank Guarantee</span>
            <span>◆ 40 Days Delivery</span>
            <span>◆ 27 Years Heritage</span>
            <span>◆ Chartered Architects</span>
            <span>◆ 1750 sqft Villa Builds</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Counter = ({ end, duration, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { setCategoryTheme } = useTheme() || { setCategoryTheme: () => {} };

  // Scroll Progress Hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden relative">

      {/* Floating Interactive Scroll Progress & Quick Jump Badge */}
      <AnimatePresence>
        {scrollPercent > 5 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => {
              setCategoryTheme('All');
              navigate('/gallery');
            }}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-52 z-40 flex items-center space-x-3 p-2 sm:p-2.5 rounded-full bg-neutral-950/90 border border-amber-500/40 shadow-2xl backdrop-blur-xl group hover:border-amber-400 transition-all cursor-pointer"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
              <svg className="w-9 h-9 sm:w-10 sm:h-10 transform -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-neutral-800 sm:hidden"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={100}
                  strokeDashoffset={100 - scrollPercent}
                  className="text-amber-400 transition-all duration-150 sm:hidden"
                  fill="transparent"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-neutral-800 hidden sm:block"
                  fill="transparent"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={100}
                  strokeDashoffset={100 - scrollPercent}
                  className="text-amber-400 transition-all duration-150 hidden sm:block"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-[9px] sm:text-[10px] font-black text-amber-300">{scrollPercent}%</span>
            </div>

            <div className="hidden sm:flex flex-col pr-2">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                {scrollPercent >= 95 ? '100% Completed!' : 'Scroll Progress'}
              </span>
              <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center space-x-1">
                <span>{scrollPercent >= 95 ? 'Explore Full Gallery' : 'Click to View Gallery'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Wood grain background */}
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1546484475-7f7bd55792da")' }}
        />
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-[100px] -z-10 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] -z-10 mix-blend-screen" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariant}
            className="space-y-5 sm:space-y-6 lg:space-y-8"
          >
            {/* Pill tag */}
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md bg-neutral-900/60 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-medium tracking-wider max-w-full">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
              <span className="truncate sm:whitespace-normal">Perfect Blend of Tradition & Technology | SINCE 1997</span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUpVariant} className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              Architectural <br className="hidden xs:inline"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 animate-pulse">
                Interior Design
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={fadeUpVariant} className="flex items-center gap-3">
              <div className="w-8 sm:w-12 h-1 bg-amber-500 rounded-full shrink-0" />
              <h2 className="text-lg sm:text-2xl md:text-3xl font-light text-neutral-300">
                & Engineering Excellence
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUpVariant} className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Furnicraft Manufacturing brings 27 years of Sri Lankan heritage into modern luxury spaces. We deliver premium interiors with unmatched guarantees.
            </motion.p>

            {/* Stats Cards */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { label: 'DELIVERY', value: '40 DAYS', color: 'border-amber-500/50' },
                { label: 'BUDGET', value: '40 LAKHS', color: 'border-orange-500/50' },
                { label: 'ASSURANCE', value: '100% BANK GUARANTEE', color: 'border-emerald-500/50' }
              ].map((stat, idx) => (
                <div key={idx} className={`p-2 sm:px-5 sm:py-3 rounded-xl backdrop-blur-xl bg-neutral-900/60 border ${stat.color} text-center sm:text-left`}>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium mb-0.5 sm:mb-1 truncate">{stat.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">{stat.value}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link to="/projects" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-sm sm:text-base rounded-full hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2">
                Explore Projects <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all font-medium text-sm sm:text-base text-center justify-center flex items-center">
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] h-[400px] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200" 
              alt="Luxury Interior" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Glass Overlay Specs */}
            <div className="absolute bottom-6 left-6 right-6 z-20 backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-white">Signature Villa</h3>
                <p className="text-sm text-neutral-300">Colombo 07</p>
              </div>
              <div className="text-right">
                <div className="text-amber-400 font-bold">1750 sq.ft</div>
                <div className="text-xs text-neutral-400">Completed in 40 days</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 hover:text-amber-400 cursor-pointer transition-colors p-2"
          title="Scroll Down"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* SECTION 2: INFINITE MARQUEE */}
      <MarqueeSection />

      {/* SECTION 3: CATEGORIES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Mastercraft <span className="text-amber-500">Divisions</span></h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">Specialized departments delivering bespoke solutions for every architectural requirement.</p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariant}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { name: 'Wood & Timber', desc: 'Premium Ceylon teak and custom joinery' },
            { name: 'Glass & Mirror', desc: 'Architectural glazing and bespoke mirrors' },
            { name: 'Pantry & Kitchen', desc: 'Ergonomic layouts with luxury finishes' },
            { name: 'Hotel Furniture', desc: 'Commercial-grade boutique hospitality' },
            { name: 'Construction & Architecture', desc: 'End-to-end turnkey build solutions' },
            { name: 'Outdoor Furniture', desc: 'Weather-resistant exterior landscapes' }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/gallery"
              onClick={() => setCategoryTheme && setCategoryTheme(cat.name)}
              className="block"
            >
              <motion.div 
                variants={fadeUpVariant}
                className="cursor-pointer group backdrop-blur-xl bg-neutral-900/60 border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-800/80 transition-all hover:border-amber-500/50 hover:-translate-y-1 h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">{cat.name}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{cat.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mt-6 group-hover:translate-x-1 transition-transform">
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS */}
      <section className="py-24 bg-neutral-900 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-amber-500">Works</span></h2>
              <p className="text-neutral-400">A glimpse into our portfolio of excellence.</p>
            </div>
            <Link 
              to="/gallery" 
              onClick={() => setCategoryTheme('All')}
              className="hidden md:flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium pb-2 border-b border-amber-500/30 hover:border-amber-400"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariant}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', title: 'Modern Zen Villa', cat: 'Wood & Timber' },
              { img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', title: 'Corporate HQ', cat: 'Glass & Mirror' },
              { img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3', title: 'Boutique Resort', cat: 'Pantry & Kitchen' }
            ].map((proj, idx) => (
              <Link 
                key={idx} 
                to="/gallery" 
                onClick={() => setCategoryTheme(proj.cat)}
                className="block"
              >
                <motion.div variants={fadeUpVariant} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/30 mb-3 inline-block">
                      {proj.cat}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{proj.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      View Details <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: STATS COUNTER */}
      <section className="py-20 border-y border-white/5 relative z-10 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { num: 27, label: 'Years Heritage', suffix: '+' },
              { num: 1500, label: 'Projects Completed', suffix: '+' },
              { num: 100, label: 'Bank Guarantee', suffix: '%' },
              { num: 40, label: 'Days Delivery', suffix: '' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                  <Counter end={stat.num} duration={2000} suffix={stat.suffix} />
                </div>
                <div className="text-neutral-400 text-sm md:text-base font-medium uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PROCESS STEPS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-amber-500">Process</span></h2>
          <p className="text-neutral-400">A streamlined journey from concept to reality.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-neutral-800 -translate-y-1/2 z-0" />
          <div className="hidden md:block absolute top-1/2 left-0 w-3/4 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 -translate-y-1/2 z-0 opacity-50 blur-[2px]" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
            {[
              { icon: <Compass />, title: 'Choose Design', desc: 'Select from our catalog or custom.' },
              { icon: <Award />, title: 'Meet Architect', desc: 'Consult with our chartered professionals.' },
              {icon: <ShieldCheck />, title: 'Bank Guarantee', desc: '100% financial security upfront.' },
              { icon: <Building2 />, title: 'Manufacturing', desc: 'Precision crafting in our facility.' },
              { icon: <CheckCircle />, title: '40 Days Delivered', desc: 'On-time completion, guaranteed.' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-neutral-900 border-2 border-amber-500/30 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300 relative shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full border border-amber-500 animate-ping opacity-20" />
                  {React.cloneElement(step.icon, { className: 'w-8 h-8' })}
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-sm border-2 border-neutral-900">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="py-24 bg-neutral-900/50 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Client <span className="text-amber-500">Experiences</span></h2>
            <p className="text-neutral-400">Don't just take our word for it.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariant}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { name: 'Dr. Ramesh Fernando', role: 'Villa Owner', quote: 'The 40-day promise seemed impossible, but they delivered flawlessly. The Ceylon teak finish is breathtaking.' },
              { name: 'Ayesha Perera', role: 'Restaurateur', quote: 'Furnicraft transformed our commercial space. Their chartered architects truly understood our vision and executed it with 100% bank guarantee.' },
              { name: 'Sanjaya Silva', role: 'Corporate Client', quote: 'The level of professionalism and the quality of the joinery work is unmatched in Sri Lanka. Highly recommended.' }
            ].map((test, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="backdrop-blur-xl bg-neutral-900/80 border border-white/5 p-8 rounded-2xl relative">
                <div className="flex text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-neutral-300 mb-8 italic text-lg leading-relaxed">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black font-bold text-xl">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{test.name}</h4>
                    <p className="text-sm text-neutral-400">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: 100% SCROLL COMPLETION GALLERY JUMP BANNER */}
      <section className="py-20 bg-neutral-900 border-t border-amber-500/30 text-center space-y-6 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>100% Page Scroll Completed</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
            You've Explored The Entire Showcase!
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Ready to explore our complete portfolio of 1,500+ handcrafted Teak interiors, 12mm tempered glass balustrades, custom quartz pantries, and 40-day villa builds?
          </p>
          
          <div className="pt-4 flex justify-center">
            <Link
              to="/gallery"
              onClick={() => setCategoryTheme && setCategoryTheme('All')}
              className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-black text-base shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-3 uppercase tracking-wider"
            >
              <span>Enter Full Gallery Portfolio</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546484475-7f7bd55792da')] bg-cover mix-blend-overlay opacity-30" />
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Ready to Build Your Dream Interior?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Experience the perfect blend of tradition and technology with Furnicraft. Secure your project today with our 100% bank guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-10 py-5 bg-white text-orange-600 font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all text-lg">
              Get Free Estimate
            </Link>
            <Link to="/projects" className="px-10 py-5 bg-black/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/40 hover:scale-105 transition-all text-lg">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Adding custom keyframes to global styles within the component for simplicity */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default HomePage;
