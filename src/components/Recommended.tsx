'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Skeleton } from 'antd';

interface Product {
    _id: string;
    name: string;
    gender: string;
    category: string;
    price: number;
    description: string;
    tags: string[];
    stock: number;
    colors: string[];
    images: string[];
}

const Recommended: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://allmartserver.vercel.app/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.slice(-4));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <>
                <div className='mb-5'>
                    <h1 className="font-bold text-2xl md:text-left text-center text-black">Recommended For You</h1>
                </div>
                <div className="flex justify-center items-center  ">
                    <div className="flex justify-center flex-wrap  gap-4 w-full">
                        {/* Skeleton loader */}
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="border w-full  md:w-[400px] rounded-lg p-4 shadow-md">
                                <Skeleton.Image active style={{ width: '100%', height: 150 }} />
                                <Skeleton active paragraph={{ rows: 2 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <div>
            <div className='mb-5'>
                <h1 className="font-bold text-2xl md:text-left text-center text-black">Recommended For You</h1>
            </div>

            <div className='flex justify-center flex-wrap gap-4 mt-4'>

                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}

            </div>
        </div>
    );
};

export default Recommended;
