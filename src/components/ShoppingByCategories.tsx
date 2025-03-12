'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Men", image: "https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-1_1920x1920.jpg?v=1614331006", link: "/shop/men" },
  { name: "Women", image: "https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-2_1920x1920.jpg?v=1614331006", link: "/shop/women" },
  { name: "Phone Case", image: "https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-3_1920x1920.jpg?v=1614331006", link: "/shop/phone-case" },
  { name: "Home & Living", image: "https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-4_1920x1920.jpg?v=1614331006", link: "/shop/home-living" },
  { name: "Youth & Baby", image: "https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-5_1920x1920.jpg?v=1614331006", link: "/shop/youth-baby" },
  { name: "Pillow Case", image: "https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-6_1920x1920.jpg?v=1614331006", link: "/shop/pillow-case" }
];

const ShoppingByCategories = () => {
  return (
    <div className="px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl text-black">SHOPPING BY CATEGORIES</h1>
        <p className="text-sm font-medium text-[#C2C2C2]">
          Teemax store, all the t-shirts, sweatshirts, hoodies, tank tops, mugs that you could be looking for
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="relative group">
            <Image
              src={category.image}
              alt={category.name}
              width={320}
              height={320}
              className="w-full h-auto object-cover rounded-md transition duration-300 hover:scale-105"
            />
            <Link href={category.link} passHref>
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 text-sm font-medium rounded shadow-md transition duration-300 hover:bg-gray-200">
                {category.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingByCategories;
