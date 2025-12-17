// src/pages/NewCollectionPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Scissors, Zap, Award, Check, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NewCollectionPage = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Designs' },
    { id: 'seasonal', label: 'Seasonal' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'sports', label: 'Sports' },
    { id: 'vintage', label: 'Vintage' }
  ];

  const newDesigns = [
    {
      id: 1,
      title: 'Floral Mandala',
      category: 'fashion',
      complexity: 'Advanced',
      stitchCount: '15,420',
      colors: 8,
      size: '4" x 4"',
      price: '$28',
      tag: 'New',
      featured: true
    },
    {
      id: 2,
      title: 'Winter Wonderland',
      category: 'seasonal',
      complexity: 'Intermediate',
      stitchCount: '12,350',
      colors: 6,
      size: '3.5" x 3.5"',
      price: '$25',
      tag: 'Trending'
    },
    // Add other designs as needed...
  ];

  const filteredDesigns = selectedCategory === 'all'
    ? newDesigns
    : newDesigns.filter(design => design.category === selectedCategory);

  const stats = [
    { label: 'New Designs', value: '50+', icon: <Sparkles className="w-6 h-6" /> },
    { label: 'Categories', value: '8', icon: <Scissors className="w-6 h-6" /> },
    { label: 'Monthly Updates', value: '20+', icon: <Zap className="w-6 h-6" /> },
    { label: 'Premium Quality', value: '100%', icon: <Award className="w-6 h-6" /> }
  ];

  return (
    <>
      <Helmet>
        <title>New Collection | StitchPro - Embroidery Digitizing</title>
        <meta
          name="description"
          content="Explore our latest embroidery digitizing collection. Premium designs, trending patterns, and seasonal artwork for your projects."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-[#FFF4E6] via-[#FFF4E6] to-[#D8A657]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-[#D8A657]/20 to-[#B7410E]/20 text-[#B7410E] px-6 py-3 rounded-full text-sm font-bold mb-6 border-2 border-[#D8A657]/30"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Fresh Designs Just Added
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#78866B] mb-6 leading-tight">
              New Collection <span className="text-[#D8A657]">2024</span>
            </h1>
            <p className="text-lg md:text-xl text-[#78866B]/80 max-w-3xl mx-auto leading-relaxed">
              Discover our latest embroidery designs featuring trending patterns, seasonal themes, and exclusive artwork. Premium quality digitizing ready for your projects.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border-2 border-[#FFF4E6]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#D8A657] to-[#B7410E] rounded-full flex items-center justify-center text-[#FFF4E6] mx-auto mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-[#78866B] mb-1">{stat.value}</div>
                <div className="text-sm text-[#78866B]/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-[#FFF4E6] sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#78866B]">Browse by Category</h2>
            <span className="text-[#78866B]/70 text-sm">{filteredDesigns.length} designs</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#D8A657] to-[#B7410E] text-[#FFF4E6] shadow-lg scale-105'
                    : 'bg-[#FFF4E6] text-[#78866B] hover:bg-[#D8A657]/10 border-2 border-[#FFF4E6]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-16 bg-gradient-to-br from-[#FFF4E6] via-white to-[#FFF4E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${
                  design.featured ? 'ring-4 ring-[#D8A657]/30' : ''
                }`}
              >
                {/* Image Placeholder */}
                <div className="relative aspect-square bg-gradient-to-br from-[#78866B]/10 to-[#D8A657]/10 flex items-center justify-center group">
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold text-[#FFF4E6] ${
                      design.tag === 'New' ? 'bg-[#B7410E]' :
                      design.tag === 'Trending' ? 'bg-[#D8A657]' :
                      design.tag === 'Premium' ? 'bg-[#78866B]' :
                      'bg-[#78866B]/70'
                    }`}>
                      {design.tag}
                    </span>
                  </div>
                  <div className="text-center p-8">
                    <Scissors className="w-24 h-24 text-[#78866B]/20 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                    <div className="inline-block bg-[#D8A657] text-[#FFF4E6] px-4 py-2 rounded-full text-sm font-semibold">
                      {design.category.charAt(0).toUpperCase() + design.category.slice(1)}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#78866B]/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button
                      onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}
                      className="w-full bg-[#FFF4E6] text-[#78866B] px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors flex items-center justify-center"
                    >
                      Order Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Design Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#78866B]">{design.title}</h3>
                    <span className="text-2xl font-bold text-[#D8A657]">{design.price}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#78866B]/70">Complexity:</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-xs ${
                        design.complexity === 'Basic' ? 'bg-green-100 text-green-700' :
                        design.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {design.complexity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#78866B]/70">
                      <span>Stitch Count:</span>
                      <span className="font-semibold text-[#78866B]">{design.stitchCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#78866B]/70">
                      <span>Colors:</span>
                      <span className="font-semibold text-[#78866B]">{design.colors}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#78866B]/70">
                      <span>Size:</span>
                      <span className="font-semibold text-[#78866B]">{design.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}
                    className="w-full bg-gradient-to-r from-[#78866B] to-[#D8A657] text-[#FFF4E6] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    Get This Design
                    <Check className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NewCollectionPage;
