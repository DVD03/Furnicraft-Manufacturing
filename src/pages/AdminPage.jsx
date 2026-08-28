import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import { 
  Plus, Trash2, Edit3, Database, RefreshCw, Mail, CheckCircle2, 
  X, Image as ImageIcon, Layers, DollarSign, Clock, ShieldCheck,
  FileText, Lock, LogOut, Search, UserCheck, Phone, MapPin, Calculator, TrendingUp
} from 'lucide-react';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('furnicraft_admin_auth') === 'true';
  });
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'quotations' | 'inquiries'
  const [projects, setProjects] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('Checking...');
  
  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Form State for Projects
  const [formData, setFormData] = useState({
    title: '',
    category: 'Wood & Timber',
    image: '',
    description: '',
    material: 'Ceylon Teak Wood',
    durationDays: 30,
    estimatedLakhs: 25,
    featured: true,
    themeKey: 'wood',
    badgeText: 'Custom Crafted'
  });

  const categories = [
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginCreds.username === 'admin' && loginCreds.password === 'furnicraft1997') {
      setIsAuthenticated(true);
      sessionStorage.setItem('furnicraft_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password. Hint: admin / furnicraft1997');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('furnicraft_admin_auth');
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchQuotations = async () => {
    try {
      const res = await fetch('/api/quotations');
      const data = await res.json();
      if (data.success) setQuotations(data.data);
    } catch (err) {
      console.error('Error fetching quotations:', err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    }
  };

  const checkDB = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setDbStatus(data.status === 'Online' ? 'Connected to Atlas' : 'Offline');
    } catch (err) {
      setDbStatus('Local Fallback');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      Promise.all([fetchProjects(), fetchQuotations(), fetchInquiries(), checkDB()]).then(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const handleSeed = async () => {
    if (!window.confirm('Re-seed database with default Creative Living sample projects?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      alert(data.message);
      fetchProjects();
    } catch (err) {
      alert('Failed to seed database');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Wood & Timber',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=1000',
      description: '',
      material: 'Ceylon Teak Wood',
      durationDays: 30,
      estimatedLakhs: 25,
      featured: true,
      themeKey: 'wood',
      badgeText: 'Custom Crafted'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      category: proj.category,
      image: proj.image,
      description: proj.description,
      material: proj.material || 'Ceylon Teak Wood',
      durationDays: proj.durationDays || 30,
      estimatedLakhs: proj.estimatedLakhs || 25,
      featured: proj.featured || false,
      themeKey: proj.themeKey || 'wood',
      badgeText: proj.badgeText || 'Custom Crafted'
    });
    setShowModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this gallery project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const handleUpdateQuotationStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/quotations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setQuotations(quotations.map(q => q._id === id ? { ...q, status: newStatus } : q));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteQuotation = async (id) => {
    if (!window.confirm('Delete this quotation request?')) return;
    try {
      const res = await fetch(`/api/quotations/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setQuotations(quotations.filter(q => q._id !== id));
    } catch (err) {
      alert('Failed to delete quotation');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this customer inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setInquiries(inquiries.filter(i => i._id !== id));
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        fetchProjects();
      } else {
        alert(data.error || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving project');
    }
  };

  // IF NOT AUTHENTICATED -> SHOW LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center bg-transparent">
        <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-900/90 border border-amber-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-950 p-1.5 border border-amber-500/50 flex items-center justify-center overflow-hidden shadow-xl">
              <img 
                src={logoImg} 
                onError={(e) => { e.target.src = '/logo.png'; }}
                alt="Creative Living Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(223,167,50,0.6)]" 
              />
            </div>
            <h2 className="text-2xl font-extrabold text-white font-serif">Creative Living Admin Portal</h2>
            <p className="text-xs text-slate-400">Restricted Management Console for Creative Living Officers</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs text-center font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Username</label>
              <input
                type="text"
                required
                placeholder="admin"
                value={loginCreds.username}
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Login to Creative Living Admin</span>
            </button>

            <p className="text-[10px] text-slate-500 text-center pt-2">
              Default Credentials: Username <code className="text-amber-400">admin</code> | Password <code className="text-amber-400">furnicraft1997</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Overview Totals
  const totalPortfolioLakhs = projects.reduce((sum, p) => sum + (p.estimatedLakhs || 0), 0);
  const totalQuotationsLakhs = quotations.reduce((sum, q) => sum + (q.calculatedEstimateLakhs || 0), 0);
  const pendingQuotations = quotations.filter(q => q.status === 'Pending').length;

  return (
    <div className="min-h-screen pt-32 lg:pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Admin Top Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-neutral-900/90 border border-amber-500/30 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 p-1.5 border border-amber-500/40 shadow-lg flex items-center justify-center overflow-hidden">
            <img src={logoImg} onError={(e) => { e.target.src = '/logo.png'; }} alt="Creative Living Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Creative Living (Pvt) Ltd</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">Management Console</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Database className="w-3.5 h-3.5 mr-1.5" />
            MongoDB: {dbStatus}
          </span>

          <button
            onClick={handleSeed}
            className="px-4 py-2 rounded-xl bg-neutral-950 text-slate-300 hover:text-amber-400 border border-neutral-800 text-xs font-bold transition-colors flex items-center space-x-1.5"
            title="Seed default projects"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Seed DB</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs shadow-lg flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-950/60 text-red-400 border border-red-900/40 hover:bg-red-900/80 transition-colors"
            title="Logout Admin Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-2">
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'projects', label: `Projects Portfolio (${projects.length})` },
          { id: 'quotations', label: `Customer Quotations (${quotations.length})` },
          { id: 'inquiries', label: `General Inquiries (${inquiries.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 0: DASHBOARD OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Total Gallery Projects</span>
              <div className="text-3xl font-extrabold text-white font-serif">{projects.length}</div>
              <span className="text-[10px] text-amber-400 block font-semibold">Active in MongoDB Atlas</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Quotation Requests</span>
              <div className="text-3xl font-extrabold text-amber-400 font-serif">{quotations.length}</div>
              <span className="text-[10px] text-amber-300 block font-semibold">{pendingQuotations} Pending Action</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Contact Inquiries</span>
              <div className="text-3xl font-extrabold text-orange-400 font-serif">{inquiries.length}</div>
              <span className="text-[10px] text-slate-400 block">Form Submissions</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Requested Pipeline Value</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-serif">~ {totalQuotationsLakhs} Lakhs</div>
              <span className="text-[10px] text-emerald-300 block font-semibold">LKR Customer Quotations</span>
            </div>

          </div>

          {/* Recent Quotation Requests Preview */}
          <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-serif">Recent Customer Quotation Requests</h3>
              <button onClick={() => setActiveTab('quotations')} className="text-xs text-amber-400 hover:underline">
                View All Quotations &rarr;
              </button>
            </div>

            {quotations.length === 0 ? (
              <p className="text-slate-500 text-xs py-4 text-center">No quotation requests submitted yet.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {quotations.slice(0, 4).map(q => (
                  <div key={q._id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div>
                      <strong className="text-white font-bold text-sm block">{q.customerName} ({q.customerPhone})</strong>
                      <span className="text-slate-400">{q.projectTitle} • {q.areaSqft} Sqft ({q.woodPreference})</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-amber-400 font-bold">~ {q.calculatedEstimateLakhs} Lakhs</span>
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        q.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj._id} className="wood-card-gradient rounded-2xl p-5 border border-neutral-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-amber-400 font-bold">
                      {proj.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base line-clamp-1">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{proj.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-300">
                    <span className="text-amber-400 font-bold">{proj.estimatedLakhs} Lakhs</span> • {proj.durationDays} Days
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(proj)}
                      className="p-2 rounded-lg bg-neutral-900 text-amber-400 hover:bg-neutral-800"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj._id)}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900/80"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: QUOTATION REQUESTS INBOX */}
      {activeTab === 'quotations' && (
        <div className="bg-neutral-900/90 rounded-3xl p-6 border border-neutral-800 space-y-4">
          <h3 className="text-xl font-bold text-white font-serif">Customer Project Quotations Inbox</h3>

          {quotations.length === 0 ? (
            <p className="text-slate-400 text-xs py-8 text-center">No customer quotation requests submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {quotations.map((q) => (
                <div key={q._id} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-neutral-900">
                    <div>
                      <strong className="text-white text-base font-bold">{q.customerName}</strong>
                      <span className="text-slate-400 text-xs block">{q.customerEmail} • {q.customerPhone} • Location: {q.location}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <select
                        value={q.status}
                        onChange={(e) => handleUpdateQuotationStatus(q._id, e.target.value)}
                        className="px-3 py-1 rounded-lg bg-neutral-900 text-amber-400 text-xs font-semibold border border-neutral-800 focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Quotation Sent">Quotation Sent</option>
                        <option value="Approved">Approved</option>
                        <option value="Declined">Declined</option>
                      </select>

                      <button
                        onClick={() => handleDeleteQuotation(q._id)}
                        className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-950"
                        title="Delete Quotation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Project</span>
                      <strong className="text-slate-200">{q.projectTitle}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Area / Material</span>
                      <strong className="text-slate-200">{q.areaSqft} Sqft ({q.woodPreference})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Calculated Price</span>
                      <strong className="text-amber-400 font-bold">~ {q.calculatedEstimateLakhs} Lakhs (LKR)</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Date</span>
                      <strong className="text-slate-300">{new Date(q.createdAt).toLocaleDateString()}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GENERAL INQUIRIES INBOX */}
      {activeTab === 'inquiries' && (
        <div className="bg-neutral-900/90 rounded-3xl p-6 border border-neutral-800 space-y-4">
          <h3 className="text-xl font-bold text-white font-serif">Customer Inquiries Inbox</h3>

          {inquiries.length === 0 ? (
            <p className="text-slate-400 text-xs py-8 text-center">No customer inquiries submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq._id} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <strong className="text-white text-sm">{inq.name}</strong>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">
                        {inq.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{inq.message}</p>
                    <div className="text-[10px] text-slate-500 space-x-3">
                      <span>Phone: {inq.phone}</span>
                      <span>Email: {inq.email}</span>
                      <span>Date: {new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteInquiry(inq._id)}
                    className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-950"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PROJECT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-xl w-full bg-neutral-950 border border-amber-500/40 rounded-3xl p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-xl font-bold text-white font-serif">
                {editingProject ? 'Edit Gallery Project' : 'Add New Interior Project'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Teak Pantry Cupboards"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Cost (Lakhs)</label>
                  <input
                    type="number"
                    value={formData.estimatedLakhs}
                    onChange={(e) => setFormData({ ...formData, estimatedLakhs: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Materials Used</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-slate-400 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 text-black font-extrabold shadow-md"
                >
                  Save Project to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
