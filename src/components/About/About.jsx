import React from 'react'
import { assets } from '../../assets/assets';
import { FaCaretDown, FaUser } from "react-icons/fa";
import WhyChoose from '../WhyChoose/WhyChoose';

const BgStyle = {
    backgroundImage: `url(${assets.polygon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    position: "relative",
};

function About({ HandlePopup }) {
    return (
        <>
            <div
                id="about"
                style={BgStyle}
                className="py-1 pt-30  scroll-mt-[100px] flex items-center justify-center min-h-screen"
            >
                <div className="container relative z-10 p-5">
                    <h1
                        data-aos="fade"
                        className="tracking-wider text-4xl font-semibold text-white text-center mb-8"
                    >
                        About Us
                    </h1>

                    {/* Card section */}
                    <div
                        data-aos="fade"
                        data-aos-delay="300"
                        className="bg-white/80 p-5 my-10"
                    >
                        At Good Food, we believe that great food brings people together.
                        Our passion for culinary excellence drives us to serve delicious, high-quality
                        meals made from the freshest ingredients. Whether you're here for a casual bite,
                        a family gathering, or a special celebration, we ensure a warm and welcoming atmosphere.
                        Our chefs craft each dish with love, blending traditional flavors with modern creativity
                        to satisfy every palate. Join us for an unforgettable dining experience where taste meets
                        tradition, and every meal feels like home."
                        <br />
                        <br />
                        Let me know if you'd like any changes! 😊🍕
                        <div className="pt-10 flex justify-center">
                            <button
                                onClick={HandlePopup}
                                className="flex justify-center items-center gap-2 bg-primary text-xl h-[40px] text-white px-5 py-2 hover:scale-105 duration-300 cursor-pointer"
                            >
                                <FaUser />
                                My Account
                            </button>
                        </div>
                    </div>

                    <WhyChoose />
                </div>

                {/* wave vector */}
                <div className="absolute top-0 right-0 w-full">
                    <img src={assets.vector} alt="" className="mx-auto" />
                </div>
            </div>
        </>
    );
}

export default About;
