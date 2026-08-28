import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, ShieldCheck, X, Eye, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  const { activeCategory, setCategoryTheme, currentTheme } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Quotation Modal State
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    location: 'Colombo',
    areaSqft: 1000,
    woodPreference: 'Ceylon Teak',
    notes: ''
  });
  const [quoteStatus, setQuoteStatus] = useState({ loading: false, success: false, message: '' });

  const categories = [
    'All',
    'Wood & Timber',
    'Glass & Mirror',
    'Pantry & Kitchen',
    'House Furniture',
    'Hotel Furniture',
    'Construction & Architecture',
    'Flooring Products',
    'Outdoor Furniture',
    'Accessories & Art'
  ];

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'All' ? '/api/projects' : `/api/projects?category=${encodeURIComponent(activeCategory)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load gallery projects:', err);
        setLoading(false);
      });
  }, [activeCategory]);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateEstimate = () => {
    if (!selectedProject) return 0;
    const base = selectedProject.estimatedLakhs || 20;
    const multiplier = (quoteForm.areaSqft || 1000) / 1000;
    return (base * multiplier).toFixed(1);
  };

  const handleOpenQuotationModal = (proj) => {
    setSelectedProject(proj);
    setQuoteStatus({ loading: false, success: false, message: '' });
    setShowQuoteModal(true);
  };

  const handleSubmitQuotation = async (e) => {
    e.preventDefault();
    setQuoteStatus({ loading: true, success: false, message: '' });

    try {
      const estimatedPrice = calculateEstimate();
      const payload = {
        projectTitle: selectedProject.title,
        category: selectedProject.category,
        basePriceLakhs: selectedProject.estimatedLakhs,
        customerName: quoteForm.customerName,
        customerPhone: quoteForm.customerPhone,
        customerEmail: quoteForm.customerEmail,
        location: quoteForm.location,
        areaSqft: Number(quoteForm.areaSqft),
        woodPreference: quoteForm.woodPreference,
        notes: quoteForm.notes,
        calculatedEstimateLakhs: Number(estimatedPrice)
      };

      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setQuoteStatus({
          loading: false,
          success: true,
          message: `Official Quotation #${data.data._id.slice(-6).toUpperCase()} generated! Your estimated price is ~${estimatedPrice} Lakhs (LKR). Creative Living team will contact you.`
        });
      } else {
        setQuoteStatus({ loading: false, success: false, message: data.error || 'Failed to submit quotation' });
      }
    } catch (err) {
      setQuoteStatus({ loading: false, success: false, message: 'Server connection error.' });
    }
  };

  return (
    <div className="min-h-screen pt-32 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Gallery Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span 
          className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border transition-all duration-500"
          style={{ 
            backgroundColor: `${currentTheme.primary}20`, 
            color: currentTheme.primary, 
            borderColor: `${currentTheme.primary}40`,
            boxShadow: `0 0 15px ${currentTheme.primary}30`
          }}
        >
          {currentTheme.badge || 'Creative Living Portfolio Showcase'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
          {activeCategory === 'All' ? 'Interior & Engineering Gallery' : `${activeCategory} Portfolio`}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Browse our bespoke joinery, pantries, glass balustrades, and architectural builds. Click any project to request an **Instant Official Price Quotation**!
        </p>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div 
        className="space-y-6 bg-neutral-900/80 backdrop-blur-xl p-6 rounded-2xl border shadow-2xl transition-all duration-500"
        style={{ borderColor: `${currentTheme.primary}30` }}
      >
        
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by title, teak wood, glass, quartz..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
            style={{ focusBorderColor: currentTheme.primary }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white">
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryTheme(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isSelected
                    ? 'text-black shadow-lg scale-105'
                    : 'bg-neutral-950 text-slate-300 border border-neutral-800 hover:text-white'
                }`}
                style={isSelected ? {
                  backgroundColor: currentTheme.primary,
                  color: '#000',
                  boxShadow: `0 0 20px ${currentTheme.primary}60`
                } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-neutral-900 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-3">
          <p className="text-slate-400 text-base">No interior projects found matching your search query.</p>
          <button 
            onClick={() => { setCategoryTheme('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="wood-card-gradient rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 group flex flex-col justify-between"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800'}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800';
                    }}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <span className="px-3 py-1.5 rounded-full bg-neutral-950/90 text-amber-400 font-bold text-xs flex items-center space-x-1 border border-amber-500/40 shadow-xl">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase">
                    {project.category}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => setSelectedProject(project)}
                      className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-neutral-800">
                    <div className="flex items-center text-xs text-slate-400 space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{project.material}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400 font-medium">{project.durationDays} Days Build</span>
                      <span className="text-amber-400 font-black text-sm">~ {project.estimatedLakhs} Lakhs</span>
                    </div>

                    {/* Request Instant Quotation Button */}
                    <button
                      onClick={() => handleOpenQuotationModal(project)}
                      className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-400 text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Get Instant Quotation</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* LIGHTBOX DETAIL MODAL */}
      {selectedProject && !showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-neutral-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-slate-400 hover:text-white border border-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 rounded-2xl overflow-hidden border border-neutral-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-neutral-950/80 px-3 py-1 rounded text-xs font-bold text-amber-400 uppercase border border-amber-500/30">
                {selectedProject.category}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white font-serif">{selectedProject.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs">
              <div>
                <span className="text-slate-400 block">Material & Joinery</span>
                <strong className="text-amber-300 font-semibold">{selectedProject.material}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Project Duration</span>
                <strong className="text-slate-100 font-semibold">{selectedProject.durationDays} Working Days</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Estimated Base Budget</span>
                <strong className="text-amber-400 font-bold">{selectedProject.estimatedLakhs} Lakhs (LKR)</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Warranty Security</span>
                <strong className="text-emerald-400 font-semibold">100% Bank Guarantee</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-neutral-900 text-slate-300 text-xs font-bold"
              >
                Close Window
              </button>

              <button
                onClick={() => handleOpenQuotationModal(selectedProject)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-extrabold flex items-center space-x-2 shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span>Get Official Quotation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER QUOTATION REQUEST MODAL */}
      {showQuoteModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-xl w-full bg-neutral-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Instant Price Calculator</span>
                <h3 className="text-xl font-bold text-white font-serif">Request Project Quotation</h3>
              </div>
              <button onClick={() => setShowQuoteModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Project Card Summary */}
            <div className="flex items-center space-x-4 p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs">
              <img src={selectedProject.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <strong className="text-white block font-bold text-sm">{selectedProject.title}</strong>
                <span className="text-amber-400 font-semibold">{selectedProject.category}</span>
                <span className="text-slate-400 block text-[10px]">Base Cost: ~{selectedProject.estimatedLakhs} Lakhs</span>
              </div>
            </div>

            {quoteStatus.success ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs space-y-3">
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Quotation Generated & Submitted!</span>
                </div>
                <p className="leading-relaxed">{quoteStatus.message}</p>
                <button
                  onClick={() => { setShowQuoteModal(false); setSelectedProject(null); }}
                  className="w-full py-2 rounded-xl bg-emerald-500 text-black font-extrabold text-xs"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuotation} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Fernando"
                      value={quoteForm.customerName}
                      onChange={(e) => setQuoteForm({ ...quoteForm, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+94 77 123 4567"
                      value={quoteForm.customerPhone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, customerPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="kasun@example.com"
                      value={quoteForm.customerEmail}
                      onChange={(e) => setQuoteForm({ ...quoteForm, customerEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Location / District</label>
                    <input
                      type="text"
                      placeholder="e.g. Colombo, Kandy, Galle"
                      value={quoteForm.location}
                      onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Approx Area (Sqft)</label>
                    <input
                      type="number"
                      required
                      min={100}
                      max={10000}
                      value={quoteForm.areaSqft}
                      onChange={(e) => setQuoteForm({ ...quoteForm, areaSqft: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Material Preference</label>
                    <select
                      value={quoteForm.woodPreference}
                      onChange={(e) => setQuoteForm({ ...quoteForm, woodPreference: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Ceylon Teak">Ceylon Teak Wood</option>
                      <option value="Mahogany Wood">Mahogany Wood</option>
                      <option value="Tempered Glass">Tempered Glass & Steel</option>
                      <option value="Italian Quartz">Italian Quartz & Acrylic</option>
                      <option value="Marine Ply">Waterproof Marine Ply</option>
                    </select>
                  </div>
                </div>

                {/* Instant Calculated Quote Preview */}
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Estimated Price Calculation</span>
                    <span className="text-xs text-slate-200">Based on {quoteForm.areaSqft} Sqft & {quoteForm.woodPreference}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-400 font-serif">~ {calculateEstimate()} Lakhs</span>
                    <span className="text-[10px] text-slate-400 block">LKR (Approximate)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={quoteStatus.loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-sm shadow-xl"
                >
                  {quoteStatus.loading ? 'Calculating & Saving...' : 'Submit Quotation to Creative Living Admin'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
