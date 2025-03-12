import React from 'react';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">CUSTOMER SERVICE</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400">Contact us</a></li>
                        <li><a href="#" className="hover:text-gray-400">Help and advice</a></li>
                        <li><a href="#" className="hover:text-gray-400">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-gray-400">Terms and conditions</a></li>
                        <li><a href="#" className="hover:text-gray-400">Refund Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">INFORMATION</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400">Testimonials</a></li>
                        <li><a href="#" className="hover:text-gray-400">My Account</a></li>
                        <li><a href="#" className="hover:text-gray-400">Payments & Returns</a></li>
                        <li><a href="#" className="hover:text-gray-400">View Catalogues Online</a></li>
                        <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-400">Who We Are?</a></li>
                        <li><a href="#" className="hover:text-gray-400">Corporate Responsibility</a></li>
                        <li><a href="#" className="hover:text-gray-400">California Laws</a></li>
                        <li><a href="#" className="hover:text-gray-400">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">NEWSLETTER</h3>
                    <p className="mb-4">Sign up for the newsletter to receive special offers and exclusive news about TEE products.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 text-black rounded-l-md outline-none"
                        />
                        <button className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-10 border-t border-gray-700 pt-5 text-gray-400">
                <p>Copyright © {currentYear} Vinovathemes. All rights reserved.</p>
                <Image
                    src="https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/payment_240x25.png?v=1614331012"
                    alt="Payment Methods"
                    className="mt-4 mx-auto"
                    width={240}
                    height={25}
                />
            </div>
        </footer>
    );
};

export default Footer;
