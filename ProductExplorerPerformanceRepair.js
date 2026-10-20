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