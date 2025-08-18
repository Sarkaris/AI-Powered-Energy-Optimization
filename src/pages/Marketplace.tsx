import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ShoppingCart, Star, Leaf, DollarSign, Clock, Award, TrendingUp } from 'lucide-react';
// We don't need react-window anymore, so I've removed it.

// ============================================================================
// 1. TYPES, CONSTANTS, and UTILS (No changes here)
// ============================================================================

interface MarketplaceItem {
  id: string;
  name: string;
  category: 'hardware' | 'software' | 'service' | 'credits';
  price: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  savings: number;
  paybackPeriod: number;
  carbonReduction: number;
  vendor: string;
  image: string;
  inStock: boolean;
  trending: boolean;
}

type SortByType = 'price' | 'rating' | 'savings';

const MOCK_MARKETPLACE_ITEMS: MarketplaceItem[] = [
    {
        id: '1',
        name: 'AI-Powered Smart Grid Controller',
        category: 'hardware',
        price: 15999,
        rating: 4.8,
        reviews: 247,
        description: 'Advanced grid management system with machine learning optimization for industrial facilities.',
        features: ['Real-time load balancing', 'Predictive maintenance', 'Grid stability optimization', '99.9% uptime'],
        savings: 125000,
        paybackPeriod: 1.2,
        carbonReduction: 2500,
        vendor: 'GridTech Solutions',
        image: 'https://i.ibb.co/tM0hsDZr/gears-cogs-machine-machinery-159298.webp',
        // image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg',
        inStock: true,
        trending: true
    },
    {
        id: '2',
        name: 'Carbon Credit Portfolio - Verified',
        category: 'credits',
        price: 45,
        rating: 4.9,
        reviews: 1847,
        description: 'Premium verified carbon credits from renewable energy and reforestation projects.',
        features: ['Verified by Gold Standard', 'Immediate delivery', 'Blockchain tracked', 'ESG compliant'],
        savings: 0,
        paybackPeriod: 0,
        carbonReduction: 1,
        vendor: 'CarbonZero Exchange',
        // image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
        image: 'https://i.ibb.co/4nKYfDsV/pexels-photo-1108572.webp',
        inStock: true,
        trending: false
    },
    {
        id: '3',
        name: 'Energy Analytics Pro Suite',
        category: 'software',
        price: 2999,
        rating: 4.7,
        reviews: 892,
        description: 'Comprehensive energy analytics platform with AI-driven insights and automated reporting.',
        features: ['Multi-sector analytics', 'Custom dashboards', 'API integration', '24/7 support'],
        savings: 45000,
        paybackPeriod: 0.8,
        carbonReduction: 850,
        vendor: 'EnergyAI Corp',
        // image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
        image: 'https://i.ibb.co/zT28fw3R/pexels-photo-590022.webp',
        inStock: true,
        trending: true
    },
    {
        id: '4',
        name: 'Industrial IoT Sensor Network',
        category: 'hardware',
        price: 8499,
        rating: 4.6,
        reviews: 456,
        description: 'Wireless sensor network for comprehensive energy monitoring across industrial facilities.',
        features: ['100+ sensors included', 'Wireless mesh network', 'Real-time monitoring', '5-year warranty'],
        savings: 75000,
        paybackPeriod: 1.4,
        carbonReduction: 1200,
        vendor: 'IndustrialIoT Inc',
        image: 'https://i.ibb.co/gMYSd9GT/pexels-photo-2599244.webp',
        // image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
        inStock: true,
        trending: false
    },
    {
        id: '5',
        name: 'ESG Compliance Consulting',
        category: 'service',
        price: 12500,
        rating: 4.9,
        reviews: 234,
        description: 'Expert consulting services for ESG compliance and sustainability reporting.',
        features: ['ESG assessment', 'Compliance roadmap', 'Report generation', 'Ongoing support'],
        savings: 0,
        paybackPeriod: 0,
        carbonReduction: 0,
        vendor: 'Sustainability Partners',
        image: 'https://i.ibb.co/zhVTqVnv/pexels-photo-3184465.webp',
        // image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        inStock: true,
        trending: true
    },
    {
        id: '6',
        name: 'Smart Building Automation Kit',
        category: 'hardware',
        price: 5999,
        rating: 4.5,
        reviews: 678,
        description: 'Complete building automation solution for commercial properties with energy optimization.',
        features: ['HVAC control', 'Lighting automation', 'Occupancy sensing', 'Mobile app'],
        savings: 35000,
        paybackPeriod: 2.1,
        carbonReduction: 650,
        vendor: 'SmartBuild Tech',
        // image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
        image: 'https://i.ibb.co/DfWQDxj0/pexels-photo-2219024.webp',
        inStock: false,
        trending: false
    }
];

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'software', label: 'Software' },
  { id: 'service', label: 'Services' },
  { id: 'credits', label: 'Carbon Credits' }
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

const getCategoryStyles = (category: MarketplaceItem['category']) => {
    const styles: Record<typeof category, string> = {
        hardware: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
        software: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
        service: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
        credits: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    };
    return styles[category];
};


// ============================================================================
// 2. CHILD COMPONENT (Perfected Card)
// ============================================================================

interface ProductCardProps {
  item: MarketplaceItem;
  isItemInCart: boolean;
  onAddToCart: (itemId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ item, isItemInCart, onAddToCart }) => {
    const canAddToCart = item.inStock && !isItemInCart;
    const buttonText = isItemInCart ? 'Added' : item.inStock ? 'Add to Cart' : 'Out of Stock';

    return (
        // ✅ Set h-full and flex-col to ensure the card takes up the full grid cell height
        // and the footer stays at the bottom. REMOVED overflow-hidden.
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <div className="relative h-48 flex-shrink-0">
                <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover rounded-t-xl" />
                {item.trending && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">🔥 Trending</div>
                )}
                {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-xl">
                        <span className="text-white font-medium">Out of Stock</span>
                    </div>
                )}
            </div>
            
            {/* ✅ Added flex-grow to this wrapper to push the footer down */}
            <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{item.name}</h3>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full capitalize flex-shrink-0 ${getCategoryStyles(item.category)}`}>
                        {item.category}
                    </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.round(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.rating} ({item.reviews} reviews)</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                    {item.savings > 0 && (
                        <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto" />
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Savings/yr</div>
                            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(item.savings)}</div>
                        </div>
                    )}
                    {item.carbonReduction > 0 && (
                        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <Leaf className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto" />
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">CO₂ Reduction</div>
                            <div className="text-sm font-bold text-green-600 dark:text-green-400">{item.carbonReduction} kg/yr</div>
                        </div>
                    )}
                </div>

                {/* ✅ Added mt-auto to this div to push it to the bottom of the flex container */}
                <div className="mt-auto">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2 pt-3 border-t border-gray-100 dark:border-gray-700">Key Features</div>
                    <ul className="space-y-1.5">
                        {item.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* ✅ This part is now always visible */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(item.price)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">by {item.vendor}</div>
                    </div>
                    <button
                        onClick={() => onAddToCart(item.id)}
                        disabled={!canAddToCart}
                        className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold transition-colors text-sm ${canAddToCart ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
});


// ============================================================================
// 3. MAIN COMPONENT (Perfected & Responsive)
// ============================================================================

export const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortByType>('rating');
  const [cart, setCart] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    const items = MOCK_MARKETPLACE_ITEMS.filter(
      (item) => selectedCategory === 'all' || item.category === selectedCategory
    );
    return [...items].sort((a, b) => { // Use spread to create a new array to avoid mutating the original
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'rating': return b.rating - a.rating;
        case 'savings': return b.savings - a.savings;
        default: return 0;
      }
    });
  }, [selectedCategory, sortBy]);

  const addToCart = useCallback((itemId: string) => {
    setCart((prevCart) => [...prevCart, itemId]);
  }, []);

  const cartItemSet = useMemo(() => new Set(cart), [cart]);

  return (
    <div className="space-y-6">
        {/* Header - Made responsive */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                    <ShoppingCart className="w-7 h-7 md:w-8 md:h-8 mr-3 text-emerald-500" />
                    Energy Solutions Marketplace
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Discover cutting-edge solutions to optimize your energy performance</p>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg">
                    <span className="font-medium">{cart.length} items in cart</span>
                </div>
            </div>
        </div>

        {/* Filters and Sort - Made responsive */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                    <div className="flex space-x-1 mt-2 overflow-x-auto pb-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors flex-shrink-0 ${selectedCategory === category.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto flex-shrink-0">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortByType)}
                        className="w-full md:w-auto px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                    >
                        <option value="rating">Top Rated</option>
                        <option value="price">Price</option>
                        <option value="savings">Top Savings</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Featured Banner - No changes needed */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 md:p-8 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2">🚀 Limited Time: AI Revolution Sale</h2>
                    <p className="text-emerald-100 mb-4 text-sm md:text-base">Get 30% off all AI-powered energy solutions.</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-2xl md:text-3xl font-bold">30% OFF</div>
                    <div className="text-emerald-200 text-sm">Ends in 5 days</div>
                </div>
            </div>
        </div>
        
        {/* ✅ Products Grid - REPLACED virtualization with a simple, responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                    isItemInCart={cartItemSet.has(item.id)}
                />
            ))}
        </div>
        
        {/* Bottom CTA - No changes needed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need Custom Solutions?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">Our team of energy experts can design custom solutions tailored to your specific needs.</p>
            <div className="flex items-center justify-center space-x-4">
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">Schedule Consultation</button>
            </div>
        </div>
    </div>
  );
};