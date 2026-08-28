import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Furnicraft Manufacturing (Pvt) Ltd  –  Luxury Dark Footer
───────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'Gallery',     to: '/gallery' },
  { label: 'Categories',  to: '/categories' },
  { label: 'About Us',    to: '/about' },
  { label: 'Contact Us',  to: '/contact' },
  { label: 'Admin Panel', to: '/admin' },
];

const SERVICES = [
  'Luxury Bedroom Furniture',
  'Living Room Collections',
  'Dining Sets & Sideboards',
  'Custom Upholstery',
  'Office & Study Furniture',
  'Outdoor & Garden Pieces',
  'Bespoke Joinery & Carpentry',
];

const GUARANTEE_ITEMS = [
  {
    Icon: Award,
    iconColor:  'text-amber-400',
    ringColor:  'ring-amber-400/30',
    bgColor:    'bg-amber-400/10',
    title: 'Since 1997 Heritage',
    desc:  'Nearly three decades of master craftsmanship, trusted by thousands of discerning homes.',
  },
  {
    Icon: ShieldCheck,
    iconColor:  'text-orange-400',
    ringColor:  'ring-orange-400/30',
    bgColor:    'bg-orange-400/10',
    title: '100% Bank Guarantee',
    desc:  'Every order is fully secured through verified bank guarantees for your complete peace of mind.',
  },
  {
    Icon: Clock,
    iconColor:  'text-emerald-400',
    ringColor:  'ring-emerald-400/30',
    bgColor:    'bg-emerald-400/10',
    title: '40 Days Delivery',
    desc:  'From workshop to your doorstep in 40 days — on time, every time, or we make it right.',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-950 text-neutral-300 overflow-hidden">

      {/* ── Gold gradient top border ── */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      {/* ── Subtle radial glow overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #f59e0b 0%, transparent 70%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          GUARANTEE RIBBON  (3 cols)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative border-b border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800/60">
          {GUARANTEE_ITEMS.map(({ Icon, iconColor, ringColor, bgColor, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 py-6 sm:py-0 sm:px-8 first:pt-0 first:pl-0 last:pr-0"
            >
              <div className={`shrink-0 w-12 h-12 rounded-full ${bgColor} ring-1 ${ringColor} flex items-center justify-center`}>
                <Icon size={22} className={iconColor} strokeWidth={1.8} />
              </div>
              <div>
                <p className={`font-semibold text-sm tracking-wide ${iconColor}`}>{title}</p>
                <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN FOOTER  (4 cols)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ── Col 1 · Brand ── */}
        <div className="lg:col-span-1 space-y-5">
          {/* F emblem + name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neutral-950 p-1 border border-amber-500/40 shadow-lg flex items-center justify-center overflow-hidden">
              <img src={logoImg} onError={(e) => { e.target.src = '/logo.png'; }} alt="Furnicraft Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-amber-400 uppercase leading-tight">
                Furnicraft
              </p>
              <p className="text-[9px] tracking-[0.12em] text-neutral-500 uppercase leading-tight">
                Manufacturing (Pvt) Ltd
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-base font-semibold text-white leading-snug">
            Crafting Excellence,{' '}
            <span className="text-amber-400">Delivering Elegance</span>
          </p>

          {/* Description */}
          <p className="text-xs text-neutral-500 leading-relaxed">
            Furnicraft has been Sri Lanka's benchmark for premium furniture manufacturing since 1997 —
            blending timeless artisanship with contemporary design for the modern home.
          </p>

          {/* Reg No badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-700/40 bg-amber-500/5">
            <CheckCircle2 size={13} className="text-amber-500 shrink-0" />
            <span className="text-[10px] tracking-widest text-amber-500/80 font-medium uppercase">
              Reg No: PV&nbsp;12345
            </span>
          </div>
        </div>

        {/* ── Col 2 · Navigation ── */}
        <div className="space-y-5">
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400">
            Navigation
            <span className="block mt-2 w-8 h-px bg-amber-600" />
          </h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-400 transition-colors duration-200"
                >
                  <ChevronRight
                    size={13}
                    className="text-neutral-700 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3 · Services ── */}
        <div className="space-y-5">
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400">
            Our Specialties
            <span className="block mt-2 w-8 h-px bg-amber-600" />
          </h3>
          <ul className="space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service} className="flex items-start gap-2.5 text-sm text-neutral-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 4 · Contact ── */}
        <div className="space-y-5">
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400">
            Get In Touch
            <span className="block mt-2 w-8 h-px bg-amber-600" />
          </h3>

          <ul className="space-y-4">
            {/* Address */}
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-amber-500 mt-0.5 shrink-0" />
              <span className="text-sm text-neutral-400 leading-relaxed">
                No. 24, Industrial Estate,<br />
                Ekala, Ja-Ela,<br />
                Sri Lanka 11350
              </span>
            </li>

            {/* Phone */}
            <li>
              <a
                href="tel:+94112345678"
                className="flex items-center gap-3 group text-sm text-neutral-400 hover:text-amber-400 transition-colors duration-200"
              >
                <Phone size={15} className="text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
                +94 11 234 5678
              </a>
            </li>

            {/* Email */}
            <li>
              <a
                href="mailto:info@furnicraft.lk"
                className="flex items-center gap-3 group text-sm text-neutral-400 hover:text-amber-400 transition-colors duration-200"
              >
                <Mail size={15} className="text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
                info@furnicraft.lk
              </a>
            </li>

            {/* Hours */}
            <li className="flex items-start gap-3">
              <Clock size={15} className="text-amber-500 mt-0.5 shrink-0" />
              <div className="text-sm text-neutral-400 leading-relaxed">
                <span className="text-neutral-300 font-medium">Mon – Sat</span>&ensp;8:00 AM – 6:00 PM<br />
                <span className="text-neutral-300 font-medium">Sunday</span>&emsp;&ensp;9:00 AM – 1:00 PM
              </div>
            </li>
          </ul>

          {/* Gold CTA button */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-1 px-5 py-2.5 rounded-lg
              bg-gradient-to-r from-amber-500 to-amber-600
              text-neutral-950 text-xs font-bold tracking-widest uppercase
              shadow-md shadow-amber-900/40
              hover:from-amber-400 hover:to-amber-500
              hover:shadow-amber-700/50 hover:shadow-lg
              transition-all duration-300 group"
          >
            Request a Quote
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM COPYRIGHT BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-600">
            &copy; {year}&nbsp;
            <span className="text-neutral-500 font-medium">Furnicraft Manufacturing (Pvt) Ltd.</span>
            &nbsp;All rights reserved.
          </p>
          <p className="text-[11px] text-neutral-600 italic tracking-wide">
            &ldquo;Where Craftsmanship Meets{' '}
            <span className="text-amber-600 not-italic font-semibold">Luxury</span>&rdquo;
          </p>
        </div>
      </div>

    </footer>
  );
}
