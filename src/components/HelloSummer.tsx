import React from 'react';

const HelloSummer = () => {
    return (
        <div className="flex flex-col  items-center gap-5">
            <img
                className="w-full"
                src="https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-7_1920x1920.jpg?v=1614331007"
                alt=""
            />
            <div className="md:flex gap-5 flex-wrap  justify-center items-center">
                <div className="relative group">
                    <img
                        className="w-full rounded-lg shadow-lg transform transition duration-300 ease-in-out group-hover:rotate-3"
                        src="https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-8_1920x1920.jpg?v=1614331007"
                        alt=""
                    />
                    <button className="absolute bg-white w-[150px] h-[50px] bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-sm">
                        Shop Now
                    </button>
                </div>
                <div className="relative group">
                    <img
                        className="w-full rounded-lg shadow-lg transform transition duration-300 ease-in-out group-hover:rotate-3"
                        src="https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-9_1920x1920.jpg?v=1614331007"
                        alt=""
                    />
                    <button className="absolute bg-white w-[150px] h-[50px] bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-sm">
                        Shop Now
                    </button>
                </div>
                <div className="relative group">
                    <img
                        className="w-full rounded-lg shadow-lg transform transition duration-300 ease-in-out group-hover:rotate-3"
                        src="https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/bn-1-10_1920x1920.jpg?v=1614331007"
                        alt=""
                    />
                    <button className="absolute bg-white w-[150px] h-[50px] bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-sm">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelloSummer;
