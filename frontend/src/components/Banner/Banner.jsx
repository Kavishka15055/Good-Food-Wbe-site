import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';
import { assets } from '../../assets/assets';

function Banner() {
    return (
        <div className='container relative py-14 px-4 sm:px-8 '>
            <div className='relative z-20 pl-0'>
                {/* Heading */}
                <h1
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className='py-8 tracking-wide text-2xl md:text-3xl font-semibold text-dark text-center'
                >
                    Taste the Healthy Difference
                </h1>

                {/* Content blocks */}
                <div className='space-y-16 '>

                    {/* Block 1 */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="500"
                        className='grid grid-cols-1 sm:grid-cols-2 gap-8'
                    >
                        <div className='text-base sm:text-lg text-gray-800 leading-relaxed'>
                            At <span className='text-primary'>Good Food</span>, we believe that food 
                            should not only be delicious but also nourishing. Our chefs carefully 
                            craft each meal using fresh, organic ingredients to bring you the perfect 
                            balance of taste and health. Whether you're looking for a quick, wholesome 
                            meal or a gourmet dining experience, we ensure that every bite is packed 
                            with nutrients and flavor. Our commitment to quality and sustainability 
                            means you can enjoy our meals guilt-free, knowing they are made with the 
                            best ingredients and utmost care.
                        </div>
                        <div className='hidden sm:block'></div>
                    </div>

                    {/* Block 2 */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="500"
                        className='grid grid-cols-1 sm:grid-cols-2 gap-8'
                    >
                        <div className='hidden sm:block'></div>
                        <div className='text-base sm:text-lg text-gray-800 leading-relaxed'>
                            We understand that life can get busy, and finding the time to prepare 
                            healthy meals isn't always easy. That's why we offer convenient meal 
                            plans tailored to fit your lifestyle. With our healthy meal delivery 
                            service, you can enjoy chef-prepared dishes delivered straight to your 
                            door, saving you time without compromising on quality. Join us on a 
                            journey of flavorful, nutritious eating and experience the difference 
                            that fresh, thoughtfully prepared food can make in your life.
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className='flex justify-center mt-10 sm:mt-14'
                >
                    <PrimaryButton />
                </div>
            </div>

            {/* Decorative Fruits */}
            <img
                data-aos="fade-right"
                src={assets.leaf}
                alt="leaf"
                className='absolute top-5 left-2 sm:bottom-0 sm:left-0 opacity-40 sm:opacity-100 max-w-[120px] sm:max-w-[160px]'
            />

            <img
                data-aos="fade-right"
                src={assets.tomato}
                alt="tomato"
                className='absolute -bottom-12 -left-12 sm:bottom-0 sm:left-0 opacity-40 sm:opacity-100 max-w-[180px] sm:max-w-[280px]'
            />

            <img
                data-aos="fade-left"
                src={assets.lemon}
                alt="lemon"
                className='absolute top-10 -right-10 sm:right-20 opacity-40 sm:opacity-100 max-w-[150px] sm:max-w-[220px]'
            />

            <img
                data-aos="fade-left"
                src={assets.apple}
                alt="apple"
                className='hidden sm:block absolute bottom-0 right-0 max-w-[200px]'
            />

            <img
                data-aos="fade-right"
                src={assets.kiwi}
                alt="kiwi"
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 sm:opacity-100 max-w-[140px] sm:max-w-[180px]'
            />
        </div>
    );
}

export default Banner;
