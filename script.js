const products = [
  { id: 1, name: 'Yara Moi', category: 'Árabes', type: 'Eau de Parfum · 100 ml', price: 58000, notes: ['Dulce', 'Cremoso', 'Floral'], tone: '#d5a5a7', mark: 'YM' },
  { id: 2, name: 'Khamrah', category: 'Árabes', type: 'Eau de Parfum · 100 ml', price: 68500, notes: ['Canela', 'Ámbar', 'Vainilla'], tone: '#8d542c', mark: 'K' },
  { id: 3, name: 'Born In Roma Intense', category: 'Diseñador', type: 'Decant · 5 ml', price: 22900, notes: ['Vainilla', 'Lavanda', 'Ámbar'], tone: '#352b42', mark: 'VR' },
  { id: 4, name: 'Le Beau', category: 'Diseñador', type: 'Decant · 5 ml', price: 16900, notes: ['Coco', 'Maderas', 'Dulce'], tone: '#4c8a79', mark: 'JPG' },
  { id: 5, name: 'Set Noches Doradas', category: 'Sets', type: '4 decants · 5 ml', price: 74900, notes: ['Intenso', 'Dulce', 'Ámbar'], tone: '#9b7538', mark: 'OL' },
  { id: 6, name: 'Erba Pura', category: 'Decants', type: 'Decant · 5 ml', price: 26400, notes: ['Cítrico', 'Frutal', 'Almizcle'], tone: '#b8a15b', mark: 'XP' },
  { id: 7, name: 'Club de Nuit Intense', category: 'Árabes', type: 'Decant · 5 ml', price: 14500, notes: ['Cítrico', 'Ahumado', 'Amaderado'], tone: '#222', mark: 'CDN' },
  { id: 8, name: 'Set Descubrimiento', category: 'Sets', type: '5 decants · 2 ml', price: 38900, notes: ['Para explorar', 'A medida'], tone: '#a57545', mark: 'OL' }
];
let selectedCategory = 'Todos';
let selectedOccasion = 'Todos';
let cart = [];
const money = value => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
const grid = document.querySelector('#product-grid');
const total = document.querySelector('#product-total');

function renderProducts() {
  const query = document.querySelector('#search').value.toLowerCase().trim();
  const occasions = { 1: ['Tarde', 'Citas'], 2: ['Noche', 'Citas'], 3: ['Noche', 'Citas'], 4: ['Tarde', 'Citas'], 5: ['Noche', 'Citas'], 6: ['Mañana', 'Tarde', 'Versátil'], 7: ['Noche', 'Versátil'], 8: ['Versátil', 'Mañana', 'Tarde'] };
  const shown = products.filter(p => (selectedCategory === 'Todos' || p.category === selectedCategory) && (selectedOccasion === 'Todos' || occasions[p.id].includes(selectedOccasion)) && `${p.name} ${p.category} ${p.notes.join(' ')}`.toLowerCase().includes(query));
  total.textContent = `${shown.length} fragancias seleccionadas`;
  grid.innerHTML = shown.map(p => `<article class="product"><div class="product-image" style="--card:${p.tone}22"><div class="mini-bottle" style="--tone:${p.tone}">${p.mark}</div></div><div class="product-info"><span class="badge">${p.type}</span><h3>${p.name}</h3><div class="notes">${p.notes.map(note => `<span>${note}</span>`).join('')}</div><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add" data-id="${p.id}">Agregar +</button></div></div></article>`).join('');
  document.querySelector('#empty-state').hidden = shown.length > 0;
}
function renderCart() {
  const items = cart.map(id => products.find(p => p.id === id));
  document.querySelector('#cart-count').textContent = items.length;
  document.querySelector('#cart-items').innerHTML = items.length ? items.map((p, index) => `<div class="cart-line"><div><p>${p.name}</p><span>${p.type}</span></div><div><p>${money(p.price)}</p><button class="remove" data-index="${index}">Quitar</button></div></div>`).join('') : '<p class="cart-empty">Todavía no agregaste fragancias.</p>';
  document.querySelector('#cart-total').textContent = money(items.reduce((sum, p) => sum + p.price, 0));
}
function openCart() { document.querySelector('#cart-panel').classList.add('open'); document.querySelector('#overlay').classList.add('open'); }
function closeCart() { document.querySelector('#cart-panel').classList.remove('open'); document.querySelector('#overlay').classList.remove('open'); }
document.querySelector('#search').addEventListener('input', renderProducts);
document.querySelector('#category-pills').addEventListener('click', event => { if (!event.target.dataset.category) return; selectedCategory = event.target.dataset.category; document.querySelectorAll('.category-pills button').forEach(b => b.classList.toggle('active', b === event.target)); renderProducts(); });
document.querySelector('#occasion-pills').addEventListener('click', event => { if (!event.target.dataset.occasion) return; selectedOccasion = event.target.dataset.occasion; document.querySelectorAll('.occasion-pills button').forEach(b => b.classList.toggle('active', b === event.target)); renderProducts(); });
grid.addEventListener('click', event => { const id = Number(event.target.dataset.id); if (!id) return; cart.push(id); renderCart(); openCart(); });
document.querySelector('#cart-items').addEventListener('click', event => { const index = event.target.dataset.index; if (index === undefined) return; cart.splice(Number(index), 1); renderCart(); });
document.querySelector('#open-cart').addEventListener('click', openCart); document.querySelector('#close-cart').addEventListener('click', closeCart); document.querySelector('#overlay').addEventListener('click', closeCart);
document.querySelector('#whatsapp-order').addEventListener('click', () => { if (!cart.length) return; const items = cart.map(id => products.find(p => p.id === id)); const detail = items.map(p => `• ${p.name} — ${money(p.price)}`).join('\n'); const message = `Hola Oro Líquido, quiero consultar por este pedido:%0A%0A${encodeURIComponent(detail)}%0A%0ATotal estimado: ${encodeURIComponent(money(items.reduce((sum,p) => sum + p.price, 0)))}%0A%0A¿Tienen disponibilidad?`; window.open(`https://wa.me/5491124900292?text=${message}`, '_blank', 'noopener'); });
renderProducts(); renderCart();
