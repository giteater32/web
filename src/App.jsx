import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronLeft
} from 'lucide-react'
import { logo } from './logo.js'
import './App.css'

const navigation = ['Maison', 'Cloth', 'Tailoring', 'Atelier', 'Business']

const menuColumns = [
  ['The House', 'Bhilwara', 'The Terroir', 'The Disciplines'],
  ['The Cloth', 'Suiting', 'Shirting', 'Ceremonial Weaves'],
  ['The Atelier', 'Private Appointment', 'Institutional Trade', 'Global Architecture'],
]

const productsData = [
  { id: 'mehrangarh-charcoal', title: 'Mehrangarh Charcoal Cloth', meta: 'Technical suiting', price: 450, category: 'Suiting' },
  { id: 'dhoti-ivory', title: 'Dhoti Ivory Shirting', meta: 'Soft performance cotton', price: 280, category: 'Shirting' },
  { id: 'haveli-earth', title: 'Haveli Earth Ceremony Cloth', meta: 'Evening tailoring', price: 850, category: 'Ceremonial Weaves' },
  { id: 'indigo-travel', title: 'Textile Indigo Travel Jacket', meta: 'Seasonless form', price: 1200, category: 'Suiting' },
  { id: 'vindhya-wool', title: 'Vindhya Heavy Wool Coat', meta: 'Structured winter layer', price: 1650, category: 'Suiting' },
  { id: 'thar-linen', title: 'Thar Desert Linen Trousers', meta: 'Breathable lightweight form', price: 340, category: 'Suiting' },
  { id: 'bhilwara-silk', title: 'Bhilwara Silk Blend Scarf', meta: 'Ceremonial neckwear', price: 180, category: 'Ceremonial Weaves' },
  { id: 'jodhpur-breeches', title: 'Jodhpur Riding Breeches', meta: 'Traditional articulated knee', price: 420, category: 'Suiting' },
]

const observations = [
  ['A Study in Shadow', 'Film placeholder'],
  ['The Hand of Cloth', 'Film placeholder'],
  ['The Jaipur Line', 'Film placeholder'],
]

const disciplines = [
  'Material quietude',
  'Tailored proportion',
  'Desert-light restraint',
  'Institutional precision',
]

const footerColumns = [
  ['House', 'Origin', 'Terroir', 'Chronicle'],
  ['Cloth', 'Suiting', 'Shirting', 'Ceremony'],
  ['Atelier', 'Appointments', 'Trade', 'Care'],
  ['Client', 'Account', 'Orders', 'Contact'],
]

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  const handleNav = (item) => {
    setMenuOpen(false)
    if (item === 'Business') {
      navigate('/business')
    } else {
      const id = item.toLowerCase()
      if (location.pathname !== '/') {
        navigate(`/#${id}`)
      } else {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleMenuNav = (item) => {
    setMenuOpen(false)
    const categoryMatch = ['Suiting', 'Shirting', 'Ceremonial Weaves'].find(c => c === item)
    if (categoryMatch) {
      navigate(`/category/${categoryMatch.toLowerCase().replace(' ', '-')}`)
      return
    }
    
    if (item.includes('Trade') || item === 'The Atelier') {
      if (location.pathname !== '/') navigate('/#atelier')
      else document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      if (location.pathname !== '/') navigate('/#maison')
      else document.getElementById('maison')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header" aria-label="Primary">
        <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={18} strokeWidth={1} />
        </button>

        <button className="brand-mark" onClick={() => navigate('/')} aria-label="Anirudh Synthetics home">
          Anirudh Synthetics
        </button>

        <nav className="desktop-nav" aria-label="Sections">
          {navigation.map((item) => (
            <button key={item} onClick={() => handleNav(item)}>
              {item}
            </button>
          ))}
        </nav>

        <div className="header-tools">
          <button className="icon-button" aria-label="Search">
            <Search size={18} strokeWidth={1} />
          </button>
          <button className="icon-button" aria-label="Account">
            <User size={18} strokeWidth={1} />
          </button>
          <button className="icon-button" aria-label="Bag" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={18} strokeWidth={1} />
          </button>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={handleMenuNav} />
      <OrderPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero onEnter={() => {
                if (location.pathname !== '/') navigate('/#maison')
                else document.getElementById('maison')?.scrollIntoView({ behavior: 'smooth' })
              }} />
              <Origin />
              <Disciplines />
              <Cloth />
              <Tailoring />
              <Observations />
              <Atelier />
            </>
          } />
          <Route path="/business" element={<Business />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage onAddToCart={() => setCartOpen(true)} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

function MenuPanel({ open, onClose, onNavigate }) {
  return (
    <aside className={open ? 'menu-panel open' : 'menu-panel'} aria-hidden={!open}>
      <div className="menu-panel-top">
        <span>Menu</span>
        <button className="icon-button dark" onClick={onClose} aria-label="Close menu">
          <X size={18} strokeWidth={1} />
        </button>
      </div>
      <div className="menu-panel-grid">
        {menuColumns.map((column) => (
          <div key={column[0]}>
            <h2>{column[0]}</h2>
            {column.slice(1).map((item) => (
              <button key={item} onClick={() => onNavigate(item)}>
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </aside>
  )
}

function OrderPanel({ open, onClose, quantity, setQuantity }) {
  return (
    <aside className={open ? 'order-panel open' : 'order-panel'} aria-hidden={!open}>
      <div className="menu-panel-top">
        <span>Private Order</span>
        <button className="icon-button dark" onClick={onClose} aria-label="Close bag">
          <X size={18} strokeWidth={1} />
        </button>
      </div>
      <div className="order-content">
        <MediaBlock label="Selected cloth placeholder" />
        <h2>Mehrangarh Charcoal Cloth</h2>
        <p>Private order structure for cloth length, tailoring notes, appointment status, and trade terms.</p>
        <div className="quantity-control">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
            <Minus size={16} strokeWidth={1} />
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
            <Plus size={16} strokeWidth={1} />
          </button>
        </div>
        <button className="text-action">Proceed privately <ArrowRight size={16} strokeWidth={1} /></button>
      </div>
    </aside>
  )
}

function Hero({ onEnter }) {
  return (
    <section className="hero" id="hero">
      <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src="/media/anirudh-hero-fabric.mp4" type="video/mp4" />
      </video>
      <div className="gradient-field" aria-hidden="true" />
      <img className="hero-emblem" src={logo} alt="Anirudh Synthetics emblem" />
      <p className="micro-label">Bhilwara, Rajasthan. Est. 2005.</p>
      <h1>The Terroir of Master Weaving</h1>
      <button className="text-action light" onClick={onEnter}>
        Enter the house <ArrowRight size={16} strokeWidth={1} />
      </button>
    </section>
  )
}

function Origin() {
  return (
    <section className="origin-section section-space" id="maison">
      <div aria-hidden="true" />
      <div className="origin-copy">
        <p className="eyebrow">Origin</p>
        <h2>
          Anirudh Synthetics began in Bhilwara in 2005, in a region where textile knowledge is not decoration but
          inheritance. The house now translates that industrial memory into a quieter language: cloth with technical
          intelligence, tailoring with restraint, and luxury grounded in place rather than spectacle.
        </h2>
      </div>
    </section>
  )
}

function Disciplines() {
  return (
    <section className="disciplines section-space">
      <p className="eyebrow">The Disciplines</p>
      <div>
        {disciplines.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}

function Cloth() {
  const navigate = useNavigate();
  return (
    <section className="cloth-section section-space" id="cloth">
      <div className="section-heading">
        <p className="eyebrow">The Cloth</p>
        <h2>Measured fabrics for a wardrobe that does not perform its wealth.</h2>
      </div>
      <div className="product-grid">
        {productsData.slice(0, 4).map((product) => (
          <article key={product.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
            <MediaBlock label="Image placeholder" />
            <div>
              <h3>{product.title}</h3>
              <p>{product.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Tailoring() {
  return (
    <section className="tailoring-section" id="tailoring">
      <div className="tailoring-media">
        <MediaBlock label="Portrait campaign placeholder" />
      </div>
      <div className="tailoring-copy">
        <p className="eyebrow">The Tailored Form</p>
        <h2>Structure is the luxury. The line, the fall, the quietness of a shoulder.</h2>
        <button className="text-action">View the edit <ArrowRight size={16} strokeWidth={1} /></button>
      </div>
    </section>
  )
}

function Observations() {
  return (
    <section className="observations section-space">
      <div className="section-heading">
        <p className="eyebrow">Observations</p>
        <h2>Material studies, field notes, and films of cloth in changing light.</h2>
      </div>
      <div className="observation-grid">
        {observations.map(([title, label]) => (
          <article key={title}>
            <MediaBlock label={label} />
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

function Atelier() {
  return (
    <section className="atelier-section section-space" id="atelier">
      <p className="eyebrow">The Private Atelier</p>
      <h2>Appointments, institutional trade, and global architecture are held in a slower register.</h2>
      <div className="atelier-actions">
        <button className="text-action">Request an appointment <ArrowRight size={16} strokeWidth={1} /></button>
        <button className="text-action">Institutional Trade & Global Architecture <ArrowRight size={16} strokeWidth={1} /></button>
      </div>
    </section>
  )
}

function Business() {
  const navigate = useNavigate();
  return (
    <section className="business-section section-space" style={{ minHeight: '100vh', paddingTop: '160px' }}>
      <div className="section-heading">
        <p className="eyebrow">Marketplace</p>
        <h2>The Complete Collection</h2>
        <p className="business-subtitle" style={{ maxWidth: '600px', marginTop: '20px' }}>Explore our full range of tailored garments, raw cloth, and bespoke accessories available for immediate order.</p>
      </div>
      <div className="product-grid business-grid">
        {productsData.map((product) => (
          <article key={product.id} className="business-product" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
            <MediaBlock label="Product Image" />
            <div className="product-info" style={{ marginTop: '20px' }}>
              <h3>{product.title}</h3>
              <p>{product.meta}</p>
              <div className="product-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <span className="price" style={{ fontSize: '18px', fontFamily: 'var(--font-serif)' }}>${product.price}</span>
                <button className="icon-button add-to-cart" aria-label="Add to cart" style={{ border: '1px solid var(--text-primary)', borderRadius: '50%' }} onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
                  <Plus size={16} strokeWidth={1} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const categoryName = categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const categoryProducts = productsData.filter(p => p.category.toLowerCase() === categoryName.toLowerCase() || (categoryId === 'ceremonial-weaves' && p.category === 'Ceremonial Weaves'));

  return (
    <section className="business-section section-space" style={{ minHeight: '100vh', paddingTop: '160px' }}>
      <div className="section-heading">
        <button onClick={() => navigate(-1)} className="text-action" style={{ marginBottom: '40px' }}>
          <ChevronLeft size={16} strokeWidth={1} /> Back
        </button>
        <p className="eyebrow">Category</p>
        <h2>{categoryName}</h2>
        <p className="business-subtitle" style={{ maxWidth: '600px', marginTop: '20px' }}>Our curated collection of {categoryName.toLowerCase()} fabrics and garments.</p>
      </div>
      
      {categoryProducts.length > 0 ? (
        <div className="product-grid business-grid">
          {categoryProducts.map((product) => (
            <article key={product.id} className="business-product" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
              <MediaBlock label="Product Image" />
              <div className="product-info" style={{ marginTop: '20px' }}>
                <h3>{product.title}</h3>
                <p>{product.meta}</p>
                <div className="product-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <span className="price" style={{ fontSize: '18px', fontFamily: 'var(--font-serif)' }}>${product.price}</span>
                  <button className="icon-button add-to-cart" aria-label="Add to cart" style={{ border: '1px solid var(--text-primary)', borderRadius: '50%' }} onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
                    <Plus size={16} strokeWidth={1} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: '40px', fontSize: '18px', opacity: 0.7 }}>No products found in this category.</p>
      )}
    </section>
  )
}

function ProductPage({ onAddToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  
  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return (
      <section className="section-space" style={{ minHeight: '100vh', paddingTop: '160px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-action" style={{ marginTop: '30px' }}>
          <ChevronLeft size={16} strokeWidth={1} /> Go Back
        </button>
      </section>
    );
  }

  return (
    <section className="section-space" style={{ minHeight: '100vh', paddingTop: '160px', background: 'var(--canvas-dark)' }}>
      <button onClick={() => navigate(-1)} className="text-action" style={{ marginBottom: '40px' }}>
        <ChevronLeft size={16} strokeWidth={1} /> Back
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 8vw, 120px)' }}>
        <div style={{ position: 'relative', aspectRatio: '3/4', background: '#111111', display: 'grid', placeItems: 'center' }}>
          <span style={{ color: 'rgba(249, 246, 240, 0.45)', fontFamily: 'var(--font-serif)', fontSize: '22px' }}>Product Image</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p className="eyebrow">{product.category}</p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: '1.1', marginBottom: '20px' }}>{product.title}</h2>
          <p style={{ fontSize: '18px', marginBottom: '40px', opacity: '0.8' }}>{product.meta}</p>
          
          <div style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', marginBottom: '40px' }}>
            ${product.price}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
            <div className="quantity-control" style={{ margin: 0, border: '1px solid rgba(249,246,240,0.2)', padding: '8px 16px', borderRadius: '30px' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                <Minus size={14} strokeWidth={1} />
              </button>
              <span style={{ fontSize: '18px', padding: '0 16px' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                <Plus size={14} strokeWidth={1} />
              </button>
            </div>
          </div>
          
          <button className="text-action light" style={{ border: '1px solid var(--text-primary)', padding: '16px 32px', borderRadius: '4px', letterSpacing: '0.1em' }} onClick={onAddToCart}>
            Add to Bag <ArrowRight size={16} strokeWidth={1} />
          </button>
          
          <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(249,246,240,0.1)' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Product Details</h3>
            <p>Private order structure for cloth length, tailoring notes, appointment status, and trade terms. This piece requires a consultation to properly assign the necessary weaving parameters.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="chronicle">
        <h2>Register for the Chronicle</h2>
        <label>
          Email address
          <input placeholder="client@example.com" />
        </label>
        <button className="text-action light">Register <ArrowRight size={16} strokeWidth={1} /></button>
      </div>
      <div className="footer-columns">
        {footerColumns.map((column) => (
          <div key={column[0]}>
            <h3>{column[0]}</h3>
            {column.slice(1).map((item) => (
              <button key={item}>{item}</button>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-mark">
        <img src={logo} alt="" />
        <strong>ANIRUDH SYNTHETICS</strong>
      </div>
    </footer>
  )
}

function MediaBlock({ label }) {
  return (
    <div className="media-block">
      <span>{label}</span>
    </div>
  )
}

export default App
