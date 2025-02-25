import React from 'react';

const OurService = () => {
    return (
        <div className='flex flex-wrap justify-center items-center gap-10 py-10 bg-gray-100'>
            {services.map((service, index) => (
                <div key={index} className='text-center flex flex-col items-center w-[350px] p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300'>
                    <h1 className='font-extrabold text-[28px] text-gray-800'>{service.title}</h1>
                    <h4 className='font-semibold text-[16px] text-gray-600'>{service.subtitle}</h4>
                    <img className='w-[100px] my-4' src={service.image} alt={service.title} />
                    <p className='font-medium text-[13px] text-gray-500 leading-relaxed'>
                        {service.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

const services = [
    {
        title: 'WORLDWIDE',
        subtitle: 'Delivery',
        image: 'https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/p-1_120x.png?v=1614331007',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget tempus enim. Suspendis nec tristique turpis. Cras lectus enim, semper sed sapien id suscipit rutrum augue. Sed convallis nulla nec sodales.'
    },
    {
        title: 'FREE SHIPPING',
        subtitle: 'From over order $ 250',
        image: 'https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/p-2_120x.png?v=1614331007',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget tempus enim. Suspendis nec tristique turpis. Cras lectus enim, semper sed sapien id suscipit rutrum augue. Sed convallis nulla nec sodales.'
    },
    {
        title: 'Money Back',
        subtitle: 'Guarantee',
        image: 'https://mediamart-vinovatheme.myshopify.com/cdn/shop/files/p-3_120x.png?v=1614331007',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget tempus enim. Suspendis nec tristique turpis. Cras lectus enim, semper sed sapien id suscipit rutrum augue. Sed convallis nulla nec sodales.'
    }
];

export default OurService;
