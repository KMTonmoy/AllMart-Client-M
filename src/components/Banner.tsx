'use client'
import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('/banner.json')
            .then(response => response.json())
            .then(data => setBanners(data))
            .catch(error => console.error('Error loading banner data:', error));
    }, []);

    useEffect(() => {
        const interval = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 4000);

        return () => clearTimeout(interval);
    }, [currentIndex, banners.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            {banners.length > 0 && (
                <div className="w-full h-full flex transition-transform duration-500 ease-in-out">
                    {banners.map((banner, index) => (
                        <img
                            key={index}
                            src={banner.image}
                            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </div>
            )}

            {/* Left Button */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-orange-700 duration-300 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80">
                <LeftOutlined />
            </button>

            {/* Right Button */}
            <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-orange-700 duration-300 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80">
                <RightOutlined />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-orange-600' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
