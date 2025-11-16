import React from 'react';
import { assets } from '../../assets/assets';
import PrimaryButton from '../Shared/PrimaryButton';

const BgStyle = {
    backgroundImage: `url(${assets.heroBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
};

function Hero() {
    return (
        <div id='hero' style={BgStyle} className='relative z-[-1]'>
            <div className='container mx-auto px-4 py-16 sm:py-20'>
                <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-10'>

                    {/* Text Section */}
                    <div
                        className='space-y-8 text-dark order-2 sm:order-1 text-left sm:text-left  w-[700px]'
                        data-aos="fade-up"
                    >
                        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold leading-tight '>
                            Diverse Flavors, One Delivery.
                        </h1>
                        <h1 className='text-xl md:text-1xl lg:text-2xl font-bold leading-tight mt-[-35px]'>
                            <span className='text-secondary text-2xl md:text-3xl'>Fresh meals</span>{" "}
                            from our kitchen to your home
                        </h1>

                        <p className='text-lg md:text-xl text-gray-700 mt-[-35px]'>
                            Gourmet delivery experience <br />
                            From <span className='font-semibold'>LKR 2,500</span>/week
                        </p>

                        {/* Button - Removed data-aos from wrapper div */}
                        {/* <div>
                            <PrimaryButton />
                        </div> */}
                    </div>

                    {/* Image Section */}
                    <div
                        className='order-1 sm:order-2 relative flex justify-center'
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <img
                            src={assets.hero}
                            alt='Hero'
                            className='w-[80%] sm:w-[100%] md:scale-110 sm:translate-y-8 max-w-[500px]'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;