import React, { useState } from 'react';

interface Product {
    _id: string;
    name: string;
    gender: string;
    category: string;
    price: number;
    description: string;
    stock: number;
    tags: string[];
    colors: string[];
    images: string[];
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div>
            <a href={`shop/${product._id}`}>
                <div
                    className=' w-[300px] duration-300 hover:cursor-pointer flex flex-col p-2 border-2 relative group'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ transition: 'transform 0.3s ease' }} // Adding smooth transition on transform
                >
                    <div style={{ height: '300px', overflow: 'hidden' }}>
                        <img
                            src={isHovered ? product.images[1] : product.images[0]}
                            alt={product.name}
                            className="w-full h-auto object-cover"
                            style={{ minHeight: '100%', minWidth: '100%' }}
                        />
                    </div>

                    <div className='mt-5'>
                        <p>{product.name}</p>
                        <p className='font-bold text-orange-600'>Price: {product.price}</p>
                    </div>

                    <button className={`absolute inset-0 h-[50px] top-[89%] hover:bg-orange-600 bg-black text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'translate-y-0' : '-translate-y-full'}`}>
                        Add to Cart
                    </button>
                </div>
            </a>
        </div>
    );
};

export default ProductCard;
