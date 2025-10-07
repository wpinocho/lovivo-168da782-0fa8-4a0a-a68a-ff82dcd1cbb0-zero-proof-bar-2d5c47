import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, BookOpen, Package } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    searchTerm,
    selectedCollectionId,
    filteredProducts,
    setSearchTerm,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const naSpiritsCollection = collections.find(c => c.handle === 'na-spirits');
  const bundlesCollection = collections.find(c => c.handle === 'starter-bundles');

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section - Mocktails */}
      <section className="relative y2k-hero-gradient py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-y2k-cyan rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-y2k-mint rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full y2k-glossy mb-6">
              <Sparkles className="h-4 w-4 text-y2k-cyan" />
              <span className="text-sm font-medium text-y2k-mint">Zero-Proof. Full Flavor.</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 y2k-chrome leading-tight">
              MOCKTAILS
              <br />
              REIMAGINED
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Premium non-alcoholic spirits for the modern mixologist. 
              <span className="text-y2k-cyan font-semibold"> Zero alcohol. Zero compromise.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="y2k-button text-y2k-black font-bold text-lg px-8 py-6 rounded-full"
                onClick={() => {
                  const spiritsSection = document.getElementById('na-spirits');
                  spiritsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discover Flavors
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-y2k-cyan text-y2k-cyan hover:bg-y2k-cyan/10 font-bold text-lg px-8 py-6 rounded-full"
                onClick={() => {
                  const bundlesSection = document.getElementById('bundles');
                  bundlesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Bundles
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-y2k-cyan h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search zero-proof spirits..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-12 py-6 bg-black/40 border-y2k-cyan/30 text-white placeholder:text-gray-500 rounded-full text-lg y2k-glossy"
              />
            </div>
          </div>

          {/* Hero Images - Mocktail Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop'
            ].map((img, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-2xl overflow-hidden y2k-border-glow animate-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <img 
                  src={img} 
                  alt={`Mocktail ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NA Spirits Grid */}
      <section id="na-spirits" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="y2k-chrome">NON-ALCOHOLIC</span> SPIRITS
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Craft cocktails without the alcohol. Premium botanicals, zero proof.
            </p>
          </div>

          {!loadingCollections && naSpiritsCollection && (
            <div className="mb-8">
              <CollectionCard 
                collection={naSpiritsCollection}
                onViewProducts={handleViewCollectionProducts}
              />
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="y2k-card rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 y2k-card rounded-2xl">
              <p className="text-gray-400 text-lg">
                {searchTerm 
                  ? 'No spirits found. Try a different search.' 
                  : 'Loading our zero-proof collection...'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20 y2k-gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full y2k-glossy mb-6">
              <BookOpen className="h-5 w-5 text-y2k-cyan" />
              <span className="text-sm font-medium text-y2k-mint">Mix It Up</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              FEATURED <span className="y2k-chrome">RECIPES</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Bartender-approved mocktail recipes for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Zero-Proof Negroni',
                image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop',
                time: '5 min',
                difficulty: 'Easy'
              },
              {
                name: 'Botanical G&T',
                image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop',
                time: '3 min',
                difficulty: 'Easy'
              },
              {
                name: 'Citrus Spritz',
                image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&h=400&fit=crop',
                time: '4 min',
                difficulty: 'Medium'
              }
            ].map((recipe, i) => (
              <div key={i} className="y2k-card rounded-2xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-2 y2k-glow-text">{recipe.name}</h3>
                    <div className="flex gap-3 text-sm">
                      <span className="px-3 py-1 rounded-full bg-y2k-cyan/20 text-y2k-cyan border border-y2k-cyan/30">
                        {recipe.time}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-y2k-mint/20 text-y2k-mint border border-y2k-mint/30">
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Bundles */}
      <section id="bundles" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full y2k-glossy mb-6">
              <Package className="h-5 w-5 text-y2k-cyan" />
              <span className="text-sm font-medium text-y2k-mint">Best Value</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              STARTER <span className="y2k-chrome">BUNDLES</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build your zero-proof bar
            </p>
          </div>

          {!loadingCollections && bundlesCollection && (
            <div className="mb-8">
              <CollectionCard 
                collection={bundlesCollection}
                onViewProducts={handleViewCollectionProducts}
              />
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="y2k-card rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.slice(6, 9).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 y2k-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-y2k-cyan rounded-full blur-3xl animate-glow"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            READY TO <span className="y2k-chrome">DISCOVER</span>
            <br />
            YOUR FLAVOR?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands mixing up zero-proof cocktails. Premium spirits, zero alcohol, infinite possibilities.
          </p>
          <Button 
            size="lg" 
            className="y2k-button text-y2k-black font-bold text-xl px-12 py-7 rounded-full y2k-glow"
            onClick={() => {
              const spiritsSection = document.getElementById('na-spirits');
              spiritsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Discover Flavors
          </Button>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};