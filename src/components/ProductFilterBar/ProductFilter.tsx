import React, { useState } from "react";

interface ProductFilterProps {
  minPrice: number;
  maxPrice: number;
}

const ProductFilter: React.FC<ProductFilterProps> = () => {
  const [price, setPrice] = useState<[number, number]>([0, 500]);
  const [rating, setRating] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <div className="w-72 relative h-[500px] p-6 space-y-6 bg-white rounded-lg shadow-lg overflow-y-auto">
      {/* Price Range Filter */}
      <div>
        <label className="block text-lg font-semibold">Price Range</label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={price[0]}
          onChange={(e) => setPrice([+e.target.value, price[1]])}
          className="w-full h-2 bg-gray-300 rounded-full"
        />
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={price[1]}
          onChange={(e) => setPrice([price[0], +e.target.value])}
          className="w-full h-2 bg-gray-300 rounded-full mt-2"
        />
        <div className="flex justify-between text-sm">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-lg font-semibold">Rating</label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`p-2 rounded-full ${rating >= star ? "bg-yellow-500" : "bg-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-lg font-semibold">Brand</label>
        <div className="space-y-2">
          {["Brand A", "Brand B", "Brand C", "Brand D"].map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="h-4 w-4"
              />
              <span className="ml-2">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <label className="block text-lg font-semibold">Gender</label>
        <div className="flex space-x-4">
          <button
            onClick={() => handleGenderChange("Men")}
            className={`py-2 px-4 rounded-lg ${selectedGender === "Men" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Men
          </button>
          <button
            onClick={() => handleGenderChange("Women")}
            className={`py-2 px-4 rounded-lg ${selectedGender === "Women" ? "bg-pink-500 text-white" : "bg-gray-200"}`}
          >
            Women
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
