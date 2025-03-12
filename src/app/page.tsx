import BabySection from '@/components/BabySection';
import Banner from '@/components/Banner';
import HelloSummer from '@/components/HelloSummer';
import MenSection from '@/components/MenSection';
import OurService from '@/components/OurService';
import Recommended from '@/components/Recommended';
import ShoppingByCategories from '@/components/ShoppingByCategories';
 import WomenSection from '@/components/WomenSection';
import React from 'react';

const page = () => {
  return (
    <div className='flex min-h-screen flex-col gap-10'>
      <Banner />
      <ShoppingByCategories />

      <div className='max-w-7xl mx-auto flex flex-col gap-10 md:p-0 px-10 '>
        <Recommended />
        <HelloSummer />
        <WomenSection />
        <MenSection />
        <BabySection />
  
        <OurService />

      </div>

    </div>
  );
};

export default page;