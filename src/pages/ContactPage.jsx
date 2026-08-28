import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  PhoneCall, ShieldCheck, User, MessageSquare, ArrowRight, Monitor, Building2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Wood & Timber',
    location: 'Colombo',
    budgetLakhs: '20-40 Lakhs',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({
          loading: false,
          success: true,
          message: 'Your inquiry has been submitted successfully to our MongoDB database! A Chartered Architect will call you shortly.'
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          category: 'Wood & Timber',
          location: 'Colombo',
          budgetLakhs: '20-40 Lakhs',
          message: ''
        });
      } else {
        setStatus({ loading: false, success: false, message: data.error || 'Failed to send inquiry.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, message: 'Server connection error. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden pt-32 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative">

        {/* HERO HEADER */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30 uppercase tracking-widest inline-block"
          >
            Connect With Creative Living
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black font-serif tracking-tight"
          >
            Let's Build Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 font-sans">
              Dream Interior
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
          >
            Book a FREE consultation with our Chartered Architects today. Backed by a <strong className="text-amber-400 font-semibold">100% Bank Guarantee</strong>.
          </motion.p>
        </div>


        {/* MAIN CONTENT (2 COL GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-neutral-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-xl space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold font-serif text-white">Send Us Your Project Inquiry</h2>
              <p className="text-xs text-slate-400 mt-1">Fill in the form below to receive a call back within 24 hours.</p>
            </div>

            {status.success ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-300">Inquiry Received!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{status.message}</p>
                <button
                  onClick={() => setStatus({ loading: false, success: false, message: '' })}
                  className="px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruwan Perera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +94 77 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. ruwan@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Interior Specialty</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option>Wood & Timber</option>
                      <option>Glass & Mirror</option>
                      <option>Pantry & Kitchen</option>
                      <option>Hotel Furniture</option>
                      <option>Construction & Architecture</option>
                      <option>Outdoor Furniture</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">District / Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option>Colombo</option>
                      <option>Kandy</option>
                      <option>Galle</option>
                      <option>Jaffna</option>
                      <option>Kurunegala</option>
                      <option>Gampaha / Kiribathgoda</option>
                      <option>Other Sri Lanka District</option>
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Estimated Budget Range</label>
                  <select
                    value={formData.budgetLakhs}
                    onChange={(e) => setFormData({ ...formData, budgetLakhs: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option>10 - 20 Lakhs</option>
                    <option>20 - 40 Lakhs</option>
                    <option>40 - 80 Lakhs</option>
                    <option>80+ Lakhs (Luxury Package)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Project Details & Requirements</label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                    <textarea
                      rows="4"
                      required
                      placeholder="Tell us about your home, pantry, or villa build..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {status.message && !status.success && (
                  <p className="text-rose-400 text-xs font-semibold">{status.message}</p>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                >
                  {status.loading ? (
                    <span>Sending to Architect Team...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry to Architect</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </motion.div>


          {/* RIGHT SHOWROOMS & INFO */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Showroom Locations</span>
              <h2 className="text-2xl font-bold font-serif text-white">Visit Creative Living Centers</h2>
            </div>

            {/* Colombo Showroom */}
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-3 hover:border-amber-400 transition-colors">
              <div className="flex items-center space-x-3 text-amber-400">
                <Building2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Colombo Flagship Showroom</h3>
              </div>
              <p className="text-xs text-slate-300 flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>124/B Galle Road, Colombo 03, Sri Lanka</span>
              </p>
              <div className="text-xs text-slate-400 space-y-1 pl-6">
                <p>Hotline: +94 (0) 11 234 5678</p>
                <p>Hours: Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Kiribathgoda Showroom */}
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-3 hover:border-amber-400 transition-colors">
              <div className="flex items-center space-x-3 text-amber-400">
                <Building2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Kiribathgoda Factory & Showroom</h3>
              </div>
              <p className="text-xs text-slate-300 flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Kandy Road, Kiribathgoda, Sri Lanka</span>
              </p>
              <div className="text-xs text-slate-400 space-y-1 pl-6">
                <p>Hotline: +94 (0) 77 123 4567</p>
                <p>Hours: Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
              <span className="text-amber-400 font-bold block uppercase tracking-wider">Client Guarantee Promises</span>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Bank Performance Money Back Guarantee</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Supervised by Certified Chartered Architects</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>40 Days Guaranteed Delivery for Turnkey Builds</span>
                </li>
              </ul>
            </div>

          </motion.div>

        </div>


        {/* WHY CONTACT US PROCESS */}
        <div className="pt-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif text-white">What Happens After You Contact Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-white">Free Architect Call</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A Chartered Architect calls you to discuss floor plans, material preferences, and budget.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-white">3D Design & Quotation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive custom 3D architectural renders and a transparent itemized quotation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-white">Bank Guarantee Issued</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive 100% bank performance bond security before manufacturing begins.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
