import React from 'react';
import { FaUtensils, FaShippingFast, FaThumbsUp, FaLeaf } from 'react-icons/fa';

function WhyChoose() {
    return (
        <>
            <div className='md:py-16 py-10 bg-gray-50'>
                <div className='container'>
                    {/* heading section */}
                    <h1
                        data-aos="fade"
                        data-aos-delay="300"
                        className='py-8 tracking-wide text-2xl font-semibold text-dark text-center'
                    >
                        Why Choose Us
                    </h1>

                    {/* card section */}
                    <div>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-14 sm:gap-4'>

                            {/* 1st card */}
                            <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className='text-center flex justify-center items-center flex-col gap-2 px-2'
                            >
                                <h2 className="text-xl font-semibold">Delicious Food</h2>
                                <p className='text-dark/70 text-sm'>
                                    Enjoy a variety of mouth-watering dishes made with fresh ingredients.
                                </p>
                                <p className='text-5xl rotate-90 text-primary text-center translate-x-5'>....</p>
                                <FaUtensils className='text-5xl text-primary' />
                            </div>

                            {/* 2nd card */}
                            <div
                                data-aos="fade-down"
                                data-aos-delay="300"
                                className='text-center flex justify-center items-center flex-col gap-1 px-3'
                            >
                                <FaShippingFast className='text-5xl text-secondary' />
                                <p className='text-5xl rotate-90 text-secondary text-center translate-x-5'>....</p>
                                <h2 className="text-xl font-semibold">Fast Delivery</h2>
                                <p className='text-dark/70 text-sm'>
                                    Get your food delivered hot and fresh in no time at your doorstep.
                                </p>
                            </div>

                            {/* 3rd card */}
                            <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className='text-center flex justify-center items-center flex-col gap-2 px-2'
                            >
                                <h2 className="text-xl font-semibold">Best Quality</h2>
                                <p className='text-dark/70 text-sm'>
                                    Our chefs prepare every dish with top-notch quality and hygiene standards.
                                </p>
                                <p className='text-5xl rotate-90 text-primary text-center translate-x-5'>....</p>
                                <FaThumbsUp className='text-5xl text-primary' />
                            </div>

                            {/* 4th card */}
                            <div
                                data-aos="fade-down"
                                data-aos-delay="300"
                                className='text-center flex justify-center items-center flex-col gap-1 px-3'
                            >
                                <FaLeaf className='text-5xl text-secondary' />
                                <p className='text-5xl rotate-90 text-secondary text-center translate-x-5'>....</p>
                                <h2 className="text-xl font-semibold">Fresh Ingredients</h2>
                                <p className='text-dark/70 text-sm'>
                                    We use only fresh and organic ingredients to bring the best flavors.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WhyChoose;
