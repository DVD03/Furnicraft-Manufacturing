import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, PhoneCall, LayoutDashboard, Award, ChevronRight, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Categories', path: '/categories' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll Progress Hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const opacityProgress = useTransform(scrollYProgress, [0, 0.005], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ══════════════════════ HEADER ══════════════════════ */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 flex flex-col',
          'transition-all duration-500 ease-in-out',
          'border-b border-white/5 backdrop-blur-xl',
          scrolled ? 'bg-neutral-950/95 shadow-2xl' : 'bg-neutral-950/80',
        ].join(' ')}
      >
        {/* ── Top micro-bar (desktop only, hidden when scrolled) ── */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              key="microbar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex overflow-hidden bg-gradient-to-r from-amber-900/30 via-neutral-900/50 to-amber-900/30 border-b border-amber-500/10"
            >
              <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-1 text-xs text-neutral-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-amber-400/80">
                    <ShieldCheck size={12} />
                    10-Year Craftsmanship Guarantee
                  </span>
                  <span className="text-neutral-600">|</span>
                  <span className="flex items-center gap-1.5">
                    <Award size={12} className="text-amber-500/70" />
                    ISO 9001:2015 Certified Manufacturer
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400/80">
                  <PhoneCall size={12} />
                  <span>+94 11 234 5678</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main nav row ── */}
        <nav className="flex-1 flex items-center px-4 md:px-6 max-w-7xl mx-auto w-full gap-4 py-3">

          {/* Logo with official logo.png */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 p-1 border border-amber-500/40 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
              <img 
                src={logoImg} 
                onError={(e) => { e.target.src = '/logo.png'; }}
                alt="Furnicraft Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(223,167,50,0.6)]" 
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-extrabold text-sm sm:text-base tracking-[0.18em] uppercase font-serif">FURNICRAFT</span>
              <span className="text-amber-400/90 text-[9px] tracking-[0.22em] uppercase font-bold">Engineering & Interior</span>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Desktop nav links in glass pill ── */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/[0.08] rounded-full px-2 py-1.5 gap-1 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 group"
                >
                  {/* Framer Motion animated active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md shadow-amber-500/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={[
                      'relative z-10 transition-all duration-200',
                      isActive
                        ? 'text-neutral-950 font-semibold'
                        : 'text-neutral-300 group-hover:text-white group-hover:scale-105 inline-block',
                    ].join(' ')}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA buttons ── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Admin Panel – glass style */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              <LayoutDashboard size={13} />
              Admin Panel
            </Link>

            {/* Free Architect Consultation – gold gradient */}
            <Link
              to="/contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 shadow-md shadow-amber-500/25 hover:shadow-amber-400/40 transition-all duration-200 group"
            >
              <PhoneCall size={13} />
              Free Architect Consultation
              <ChevronRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Animated Scroll Progress Line directly along Navbar bottom edge */}
        <motion.div 
          className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 origin-left shadow-[0_0_12px_rgba(245,158,11,0.8)]"
          style={{ scaleX, opacity: opacityProgress }}
        />
      </header>

      {/* ══════════════════════ MOBILE DRAWER ══════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-14 left-0 right-0 z-40 lg:hidden bg-neutral-950/[0.98] border-b border-white/[0.08] backdrop-blur-2xl shadow-2xl shadow-black/60"
            >
              <div className="flex flex-col px-5 py-5 gap-1 max-w-7xl mx-auto">
                {/* Nav links */}
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.22 }}
                    >
                      <Link
                        to={link.path}
                        className={[
                          'flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-400 border border-amber-500/25'
                            : 'text-neutral-300 hover:bg-white/5 hover:text-white border border-transparent',
                        ].join(' ')}
                      >
                        <span>{link.name}</span>
                        {isActive && <ChevronRight size={14} className="text-amber-400" />}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider */}
                <div className="my-2 border-t border-white/[0.06]" />

                {/* Mobile CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.055 + 0.05 }}
                  className="flex flex-col gap-2"
                >
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200"
                  >
                    <LayoutDashboard size={15} />
                    Admin Panel
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-md shadow-amber-500/25 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 transition-all duration-200"
                  >
                    <PhoneCall size={15} />
                    Free Architect Consultation
                  </Link>
                </motion.div>

                {/* Micro-bar info (mobile footer) */}
                <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500 px-1">
                  <ShieldCheck size={11} className="text-amber-600/70" />
                  <span>10-Year Craftsmanship Guarantee · ISO 9001:2015 Certified</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
