import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, ShieldCheck, Clock, CheckCircle2, ArrowRight, 
  Trees, Gem, ChefHat, Hotel, Building2, Flower2, UserCheck 
} from 'lucide-react';

export default function AboutPage() {
  const [counts, setCounts] = useState({ years: 0, projects: 0, guarantee: 0, days: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        years: Math.min(27, Math.floor(progress * 27)),
        projects: Math.min(1500, Math.floor(progress * 1500)),
        guarantee: Math.min(100, Math.floor(progress * 100)),
        days: Math.min(40, Math.floor(progress * 40)),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const milestones = [
    { year: '1997', title: 'Established in Kiribathgoda', desc: 'Founded with a vision to merge traditional Sri Lankan wood joinery with precision engineering.' },
    { year: '2003', title: 'Colombo Showroom Opening', desc: 'Opened flagship luxury interior experience center on Galle Road, Colombo 03.' },
    { year: '2010', title: 'Resort & Hotel Expansion', desc: 'Began manufacturing custom resort furniture for top luxury hotel chains across Sri Lanka.' },
    { year: '2016', title: 'Italian CNC Machinery', desc: 'Imported state-of-the-art Italian CNC routers & automated vacuum drying kilns.' },
    { year: '2020', title: '40 Days Villa Build Package', desc: 'Pioneered turnkey 1750 sqft house construction on 10-perch plots with bank guarantee.' },
    { year: '2024+', title: '1,500+ Projects Completed', desc: 'Celebrated over 27 years of trust, delivering high-end joinery & architectural projects islandwide.' }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 lg:pt-36 pb-28 border-b border-amber-900/30 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&q=80&w=2000')`
          }}
        />

        {/* Ambient Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/95 to-neutral-950 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Established 1997 • Sri Lanka</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight"
          >
            Creative Living <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 font-sans">
              (Pvt) Ltd
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-amber-400/90 text-lg sm:text-xl font-serif italic max-w-2xl mx-auto"
          >
            "The Perfect Blend of Tradition & Technology"
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto font-light leading-relaxed"
          >
            For over 27 years, Creative Living has stood at the pinnacle of Sri Lankan interior manufacturing, architectural joinery, custom pantries, and luxury resort furniture. Supervised by certified Chartered Architects.
          </motion.p>
        </div>
      </section>


      {/* ANIMATED STATS BAR */}
      <section className="py-12 bg-neutral-900/60 border-b border-amber-900/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-amber-500/20 shadow-xl space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-amber-400 font-serif">
                {counts.years}+
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Years of Heritage</div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-amber-500/20 shadow-xl space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-amber-400 font-serif">
                {counts.projects}+
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Completed Projects</div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-emerald-500/30 shadow-xl space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-serif">
                {counts.guarantee}%
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Bank Money Back</div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-orange-500/30 shadow-xl space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-orange-400 font-serif">
                {counts.days} Days
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Guaranteed Delivery</div>
            </div>

          </div>
        </div>
      </section>


      {/* HERITAGE STORY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Craftsmanship Story</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
              27 Years of Ceylon Woodworking Heritage & Engineering
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Founded in 1997, Creative Living began with a singular vision: to combine traditional Sri Lankan wood craftsmanship with modern European precision woodworking technology.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Today, our state-of-the-art factory houses automated timber drying kilns, CNC wood routers, edge-banding machinery, and lacquer spraying booths. Every piece of furniture, pantry cabinet, or architectural balustrade undergoes rigorous quality assurance by Chartered Architects.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
                <span className="text-2xl font-black text-amber-400">1997</span>
                <span className="text-xs text-slate-400 block font-semibold">Established Year</span>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
                <span className="text-2xl font-black text-amber-400">1,500+</span>
                <span className="text-xs text-slate-400 block font-semibold">Completed Projects</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&q=80&w=1200"
              alt="Wood Workshop & Machinery"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-amber-500/40">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Creative Living Factory</span>
              <span className="text-sm font-semibold text-white">Advanced German & Italian Woodworking Machinery</span>
            </div>
          </motion.div>

        </div>
      </section>


      {/* 3 PILLARS OF TRUST */}
      <section className="py-20 bg-neutral-900/40 border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Financial Security & Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">Why Sri Lankans Choose Creative Living</h2>
            <p className="text-xs text-slate-400">Our core guarantees backed by financial security and chartered engineering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-neutral-950/90 border border-amber-500/30 shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all space-y-4"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Chartered Architects</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every home, pantry design, and commercial space is personally drawn and supervised by certified Chartered Architects to ensure flawless structural ergonomics and aesthetics.
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-neutral-950/90 border border-emerald-500/30 shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition-all space-y-4"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">100% Bank Guarantee</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We provide a 100% Money Back Bank Guarantee bond from leading Sri Lankan commercial banks, guaranteeing absolute safety for your advance payments.
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl bg-neutral-950/90 border border-orange-500/30 shadow-2xl relative overflow-hidden group hover:border-orange-400 transition-all space-y-4"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">40 Days Delivery Guarantee</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our 1750 sqft house construction and turnkey interior packages are delivered within 40 working days without compromising finish quality.
              </p>
            </motion.div>

          </div>

        </div>
      </section>


      {/* COMPANY TIMELINE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Our Journey</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">27 Years of Milestones</h2>
        </div>

        <div className="relative border-l-2 border-amber-500/30 ml-4 md:ml-1/2 space-y-8 pl-6 md:pl-8">
          {milestones.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="absolute -left-[31px] md:-left-[39px] top-6 w-4 h-4 rounded-full bg-amber-400 border-4 border-neutral-950 shadow-md"></div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30 inline-block">
                {m.year}
              </span>
              <h3 className="text-lg font-bold text-white">{m.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* FINAL CTA BOX */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-amber-950/60 to-neutral-900 border border-amber-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">Ready To Start Your Interior Dream Project?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-light">
            Contact our Colombo or Kiribathgoda showroom to consult with a Chartered Architect today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold text-sm shadow-xl hover:scale-105 transition-transform"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-neutral-900 text-slate-200 border border-amber-500/30 hover:border-amber-400 font-bold text-sm transition-all"
            >
              <span>View Portfolio Gallery</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
