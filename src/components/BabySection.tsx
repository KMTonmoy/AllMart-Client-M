'use client';
import React, { useEffect, useState } from 'react';
import { Skeleton, Button } from 'antd';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';
import { buttonVariants } from "@/components/ui/button"

interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    tags: string[];
    description: string;
    stock: number;
    colors: string[];
    images: string[];
    gender: string;
}

const BabySection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://allmartserver.vercel.app/products');
                const data = await response.json();
                const babyProducts = data.filter((product: Product) => product.gender === 'baby');
                setProducts(babyProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSeeMore = () => {
        router.push('/shop/baby');
    };

    return (
        <div>
            <div className="text-center mb-6">
                <h1 className="font-bold text-2xl text-black">SHOPPING FOR BABY</h1>
                <p className="text-sm font-medium text-[#C2C2C2]">
                    Teemax store, all the t-shirts, sweatshirts, hoodies, tank tops, mugs that you could be looking for
                </p>
            </div>




            {products.length == 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 shadow-md w-full">
                            <Skeleton.Image active style={{ width: '100%', height: 150 }} />
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 shadow-md w-full">
                            <Skeleton.Image active style={{ width: '100%', height: 150 }} />
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <div className='flex justify-center'>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {products.slice(0, 9).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                    {products.length > 9 && (
                        <div className="text-center mt-6">
                            <Button className={buttonVariants({ variant: "outline" })} onClick={handleSeeMore}>
                                See More
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BabySection;
