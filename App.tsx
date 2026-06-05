import React, { useState, useMemo, useEffect } from 'react';
import { ActiveTab, CartItem, Product, UserAddress, PaymentMethodId, ActiveOrder } from './types';
import { PRODUCTS, INITIAL_ADDRESSES } from './data';
import MobileFrame from './components/MobileFrame';
import SplashView from './components/SplashView';
import HomeView from './components/HomeView';
import CatalogView from './components/CatalogView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import TrackingView from './components/TrackingView';
import ProfileView from './components/ProfileView';

// Preset standard predefined cart items matching the reference Cart screenshot exactly
// Bayam Organik (quantity 1), Wortel Berastagi (quantity 2)
const PRESET_CART_PRODUCTS = [
  { item: PRODUCTS.find(p => p.id === 'bayam-organik') || PRODUCTS[0], qty: 1 },
  { item: PRODUCTS.find(p => p.id === 'wortel-berastagi-super') || PRODUCTS[2], qty: 2 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('splash');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sayur' | 'buah' | 'daging' | 'sembako'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Addresses and Payments settings
  const [selectedAddress, setSelectedAddress] = useState<UserAddress>(INITIAL_ADDRESSES[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>('ovo');

  // Initializing active shopping cart with presets so they see a full responsive cart right away
  const [cart, setCart] = useState<CartItem[]>(() => {
    return PRESET_CART_PRODUCTS.map(preset => ({
      product: preset.item,
      quantity: preset.qty
    }));
  });

  // Track active placed order for driver live tracking simulator
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);

  // Auto skip splash state helper
  const handleBypassSplash = () => {
    setActiveTab('home');
  };

  // Math totals
  const cartCount = useMemo(() => {
    return cart.reduce((add, item) => add + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    const sub = cart.reduce((add, item) => add + (item.product.price * item.quantity), 0);
    // Add shipping Rp 10.000, discount Rp 5.000 if not empty
    return sub > 0 ? (sub + 10000 - 5000) : 0;
  }, [cart]);

  // Cart action triggers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleAddToCartWithQty = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Return back to list after adding
    setActiveTab('categories');
  };

  const handleIncreaseQty = (pId: string) => {
    setCart((prev) => 
      prev.map((item) => 
        item.product.id === pId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQty = (pId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === pId);
      if (existing && existing.quantity <= 1) {
        return prev.filter((item) => item.product.id !== pId);
      }
      return prev.map((item) => 
        item.product.id === pId 
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // Checkout order submission trigger to order tracking simulator!
  const handleCheckout = () => {
    const sub = cart.reduce((add, item) => add + (item.product.price * item.quantity), 0);
    const newOrder: ActiveOrder = {
      id: 'SG-99201', // matched reference tracking ID
      items: [...cart],
      subtotal: sub,
      deliveryFee: 10000,
      discount: 5000,
      total: sub + 10000 - 5000,
      address: selectedAddress,
      paymentMethod: selectedPayment,
      status: 'received',
      createdAt: new Date().toLocaleTimeString(),
      etaTime: '12:45',
      etaDurationMinutes: 12
    };

    setActiveOrder(newOrder);
    setCart([]); // reset active cart contents after ordering harian
    setActiveTab('orders'); // land on tracking order directly!
  };

  const handleResetOrder = () => {
    setActiveOrder(null);
  };

  const handleNavigateToTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
  };

  const currentEmail = "jerjyriferra2007@gmail.com";

  // Navigation tab menu items
  const navItems = [
    { tab: 'home', label: 'Beranda', icon: 'home' },
    { tab: 'categories', label: 'Kategori', icon: 'grid_view' },
    { tab: 'cart', label: 'Keranjang', icon: 'shopping_cart', badge: cartCount },
    { tab: 'orders', label: 'Pesanan', icon: 'receipt_long' },
    { tab: 'profile', label: 'Profil', icon: 'person' }
  ];

  return (
    <MobileFrame activeTab={activeTab} onSetTab={setActiveTab} cartCount={cartCount}>
      {/* Switch renderer for navigation routes */}
      <div className="flex-1 flex flex-col h-full animate-fade-in relative">
        {activeTab === 'splash' && (
          <SplashView onBypass={handleBypassSplash} />
        )}

        {activeTab === 'home' && (
          <HomeView
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('categories');
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onNavigate={handleNavigateToTab}
          />
        )}

        {activeTab === 'categories' && (
          <CatalogView
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onNavigate={handleNavigateToTab}
          />
        )}

        {activeTab === 'product-detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => {
              setActiveTab('categories');
            }}
            onAddToCartWithQty={handleAddToCartWithQty}
            onNavigate={handleNavigateToTab}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'cart' && (
          <CartView
            cartItems={cart}
            onIncreaseQty={handleIncreaseQty}
            onDecreaseQty={handleDecreaseQty}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            selectedPayment={selectedPayment}
            onSelectPayment={setSelectedPayment}
            onCheckout={handleCheckout}
            onNavigate={handleNavigateToTab}
          />
        )}

        {activeTab === 'orders' && (
          <TrackingView
            activeOrder={activeOrder}
            onNavigate={handleNavigateToTab}
            onResetOrder={handleResetOrder}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            userEmail={currentEmail}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            onNavigate={handleNavigateToTab}
          />
        )}

        {/* Global Bottom Navigation Shell (except splash which has full canvas) */}
        {activeTab !== 'splash' && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-around items-center px-4 py-3 pb-safe bg-white/95 backdrop-blur-md border-t border-zinc-150 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-40 rounded-t-2xl font-sans text-[11px] font-bold">
            {navItems.map((item) => {
              // Active status checker
              const isActive = activeTab === item.tab || (item.tab === 'orders' && activeTab === 'orders');
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab as ActiveTab)}
                  className={`flex flex-col items-center justify-center transition-all duration-250 cursor-pointer relative ${
                    isActive 
                      ? 'text-[#006d37] scale-105 active-press' 
                      : 'text-zinc-400 hover:text-emerald-500'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[23px] ${isActive ? 'material-symbols-fill text-[#006d37]' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-extrabold tracking-wide mt-0.5">{item.label}</span>
                  
                  {/* Badge counter */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <div className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm leading-none">
                      {item.badge}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </MobileFrame>
  );
}
<button onClick={() => window.open(
  "https://docs.google.com/document/xxxxx",
  "_blank"
)}>
  Panduan
</button>
