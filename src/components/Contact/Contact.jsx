import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

function Contact() {
    return (
        <>
            <div id="contact" className='text-white mt-20'>
                {/* Full width pink background */}
                <div className='w-[100%] mx-auto bg-gradient-to-b from-primary to-primaryDark rounded-t-3xl mr-150'>

                    
                    {/* Centered content inside full-width section */}
                    <div className='max-w-screen-xl mx-auto px-4'>
                        {/* heading */}
                        <h1 className='py-10 text-3xl font-bold text-yellow text-center'>
                            Contact Us
                        </h1>

                        {/* Contact grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 border-b-2 border-white pb-6'>
                            {/* Address */}
                            <div className='text-center space-y-4'>
                                <div className='flex justify-center'>
                                    <IoLocationSharp className='text-5xl' />
                                </div>
                                <p>
                                    #110, Y junction, Belihuloya,<br />
                                    Sri Lanka
                                </p>
                            </div>

                            {/* Email */}
                            <div className='text-center space-y-4'>
                                <div className='flex justify-center'>
                                    <MdEmail className='text-5xl' />
                                </div>
                                <div>
                                    <p>info@goodfood.com</p>
                                    <p>hr@goodfood.com</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className='text-center space-y-4'>
                                <div className='flex justify-center'>
                                    <FaPhone className='text-5xl' />
                                </div>
                                <div>
                                    <p>+91 964325789 - Sales and Services</p>
                                    <p>+91 487951587 - Hiring Queries</p>
                                    <p>+91 987458632 - Whatsapp</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer bottom */}
                        <div className='flex flex-col md:flex-row justify-between items-center text-sm p-4'>
                            <p>@ 2022 TCJ. All rights reserved</p>
                            <div className='flex gap-6 mt-2 md:mt-0'>
                                <a href="#">Privacy Policy</a>
                                <a href="#">Terms & Conditions</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
