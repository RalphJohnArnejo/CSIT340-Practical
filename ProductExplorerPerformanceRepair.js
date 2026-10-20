import React, { useState, useMemo, useCallback } from 'react';


const CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Home'];

const PRODUCTS = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: `${CATEGORIES[i % CATEGORIES.length]} Item #${i + 1}`,
    category: CATEGORIES[i % CATEGORIES.length],
    price: ((i * 13) % 400) + 10
}));


const ProductList = React.memo(function ProductList({ products, onSelectProduct, selectedId }) {
    console.log(`[ProductList Rendered] ${products.length} products`);

    return (
        <div style={{ maxHeight: '250px', overflowY: 'auto', border: '1px solid #ccc', marginTop: '10px' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {products.map(p => (
                    <li
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        style={{
                            padding: '6px 10px',
                            borderBottom: '1px solid #eee',
                            cursor: 'pointer',
                            background: p.id === selectedId ? '#e0f2fe' : 'transparent',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <span>{p.name} ({p.category})</span>
                        <strong>${p.price}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default function ProductExplorer() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('none');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [unrelatedCounter, setUnrelatedCounter] = useState(0);


    const filteredProducts = useMemo(() => {
        let list = PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'All' || p.category === category;
            return matchesSearch && matchesCategory;
        });

        if (sortOrder === 'asc') list = [...list].sort((a, b) => a.price - b.price);
        if (sortOrder === 'desc') list = [...list].sort((a, b) => b.price - a.price);

        return list;
    }, [searchTerm, category, sortOrder]);


    const handleSelectProduct = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginTop: 0 }}>Product Explorer (500 Records)</h2>

            {/* Unrelated counter in parent to test unnecessary work */}
            <div style={{ marginBottom: '12px' }}>
                <span>Parent Counter: {unrelatedCounter} </span>
                <button onClick={() => setUnrelatedCounter(c => c + 1)} style={{ padding: '2px 6px', cursor: 'pointer' }}>
                    Increment (Test Child Re-render)
                </button>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '6px' }}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '6px' }}>
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '6px' }}>
                    <option value="none">Sort: Default</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            {selectedProduct && (
                <p style={{ margin: '6px 0', fontSize: '14px' }}>
                    Selected: <strong>{selectedProduct.name}</strong> (${selectedProduct.price})
                </p>
            )}

            <ProductList
                products={filteredProducts}
                onSelectProduct={handleSelectProduct}
                selectedId={selectedProduct?.id}
            />
        </div>
    );
}