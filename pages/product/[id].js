import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StoreLayout from '../../components/StoreLayout';
import { currency, fallbackProducts, getStoredAuth, requestApi } from '../../lib/store';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    requestApi(`/api/products/${id}`)
      .then((data) => { setProduct(data); setActiveImg(0); })
      .catch(() => {
        const fallback = fallbackProducts.find((p) => String(p.id) === String(id));
        if (fallback) setProduct(fallback);
        else setMessage('Product not found.');
      });
  }, [id]);

  async function addToCart() {
    const { token } = getStoredAuth();
    if (!token) { setMessage('Please sign in to add items to cart.'); return; }
    setAdding(true);
    setMessage('');
    try {
      await requestApi('/api/cart', { method: 'POST', body: JSON.stringify({ product_id: product.id, quantity: qty }) }, token);
      setMessage(`${product.name} added to cart.`);
    } catch (e) { setMessage(e.message); }
    finally { setAdding(false); }
  }

  if (!product) return (
    <StoreLayout>
      <main><section className="section">
        {message
          ? <div className="status-message">{message}</div>
          : <p style={{ color: 'var(--muted)' }}>Loading…</p>}
      </section></main>
    </StoreLayout>
  );

  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.image_url || 'https://placehold.co/900x675/e8f5e9/0d6b57?text=No+Image'];

  return (
    <StoreLayout>
      <Head><title>{product.name} | Brand Store</title></Head>
      <main>
        <section className="section">
          <Link href="/products" className="back-link">← Back to catalog</Link>

          <div className="product-detail">
            {/* Image column */}
            <div className="detail-images">
              <div className="detail-main-img">
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/900x675/e8f5e9/0d6b57?text=No+Image'; }}
                />
                {product.category && <span className="category-badge">{product.category}</span>}
              </div>
              {images.length > 1 && (
                <div className="detail-thumbs">
                  {images.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`thumb${activeImg === i ? ' active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img
                        src={url}
                        alt={`${product.name} ${i + 1}`}
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x150/e8f5e9/0d6b57?text=img'; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info column */}
            <div className="detail-info">
              <p className="eyebrow">{product.category || 'Product'}</p>
              <h1 className="detail-title">{product.name}</h1>
              <p className="detail-price">{currency(product.price)}</p>
              <p className="detail-stock">
                {product.stock > 0
                  ? <span className="in-stock">✓ {product.stock} in stock</span>
                  : <span className="out-stock">Out of stock</span>}
              </p>
              <p className="detail-desc">{product.description}</p>

              <div className="detail-actions">
                <div className="qty-control">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button type="button" onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}>+</button>
                </div>
                <button
                  className="button primary"
                  style={{ flex: 1 }}
                  onClick={addToCart}
                  disabled={adding || product.stock === 0}
                >
                  {adding ? 'Adding…' : 'Add to cart'}
                </button>
              </div>

              {message && (
                <div className={`status-message${message.includes('added') ? ' success' : ''}`}>
                  {message}
                </div>
              )}

              <div className="detail-meta">
                <div><span>Category</span><strong>{product.category || '—'}</strong></div>
                <div><span>In stock</span><strong>{product.stock} units</strong></div>
              </div>

              <div className="detail-cta-row">
                <Link href="/cart" className="button secondary">View cart</Link>
                <Link href="/checkout" className="button secondary">Checkout</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </StoreLayout>
  );
}
