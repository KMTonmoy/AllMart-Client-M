'use client'
import Bann from '@/components/PageBanner/Bann';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilterBar/ProductFilter';
import React, { useEffect, useState } from 'react';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Track filter sidebar state

    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <div className="container mx-auto p-6">
            <Bann data={'Shop'} />

            {/* Hamburger Icon for Mobile */}
            <div className="block lg:hidden mb-4">
                <button onClick={toggleFilter} className="text-2xl">
                    {isFilterOpen ? "✖" : "☰"} {/* Display X if open, hamburger if closed */}
                </button>
            </div>

            <div className="flex mt-5 max-w-7xl mx-auto   gap-5 justify-center sm:justify-center relative">
                {/* Product Filter (Fixed on Scroll) */}


                <div
                    className={`sticky top-0 md:w-72 bg-white h-[500px] transition-transform transform ${isFilterOpen ? '-translate-x-0' : 'hidden'} lg:translate-x-0 lg:block z-50 `}
                >
                    <ProductFilter />
                </div>


                {/* Product Grid */}
                <div className='flex justify-center'>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 w-full">
                        {products.map(product => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
