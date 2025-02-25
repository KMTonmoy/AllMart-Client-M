"use client";
import React from "react";
import { motion } from "framer-motion";
import { StarFilled } from "@ant-design/icons";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "Absolutely love the quality of the products! Fast shipping and great service.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Smith",
    review: "Amazing customer support and high-quality products. Highly recommended!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    review: "Best shopping experience ever! I will definitely buy again.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    review: "Great product selection and fast delivery. Love it!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Chris Brown",
    review: "Good quality products and a great shopping experience.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Anna White",
    review: "Customer service was very helpful and friendly. Highly recommended!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Daniel Lee",
    review: "Fantastic store with excellent products! Would buy again.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    review: "Loved the seamless shopping experience. 10/10!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "David Clark",
    review: "Affordable prices and great quality products. Will recommend to friends.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="py-12 bg-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">What Our Customers Say</h2>
        <p className="text-gray-600 mt-2">Real reviews from our happy customers</p>
      </div>

      <motion.div
        className="mt-8 flex w-full gap-6 overflow-x-scroll md:overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        whileHover={{ x: 0, transition: { duration: 0.5 } }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] w-[300px] hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full border-2 border-orange-500"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <div className="flex text-orange-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarFilled key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-3">{testimonial.review}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonial;
