import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10">
            <div className="container py-2 mx-auto px-6 md:px-0">
                <div className="flex flex-col justify-between items-center">
                    {/* Blog, About, Contact Section */}
                    <div className="w-full sm:w-2/3 lg:w-3/4 sm:flex justify-between gap-6">
                        {/* Blog Section */}
                        <div className="w-full sm:w-1/3 mb-6">
                            <h3 className="uppercase font-bold">Blog</h3>
                            <Link
                                href="#"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Resources
                            </Link>
                            <Link
                                href="#"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Document Services
                            </Link>
                            <Link
                                href="#"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Services
                            </Link>
                        </div>

                        {/* About Section */}
                        <div className="w-full sm:w-1/3 mb-6">
                            <h3 className="uppercase font-bold">About</h3>
                            <Link
                                href="#"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Company
                            </Link>
                            <Link
                                href="#"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Community
                            </Link>
                            <Link
                                href="#"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Careers
                            </Link>
                        </div>

                        {/* Contact Section */}
                        <div className="w-full sm:w-1/3 mb-6">
                            <h3 className="uppercase font-bold">Contact</h3>
                            <span className="block mt-2 font-semibold text-sm text-gray-400">
                                + 56985458965
                            </span>
                            <span className="block font-semibold mt-2 text-sm text-gray-400">
                                abc@email.com
                            </span>
                            <div className="flex space-x-4 cursor-pointer mt-3">
                                <i className="animate__animated animate__bounce animate__infinite text-3xl fab fa-facebook text-[#1877F2]"></i>
                                <i className="text-3xl fab fa-twitter text-[#1DA1F2]"></i>
                                <i className="text-3xl fab fa-instagram text-[#e92d6be1]"></i>
                                <i className="text-3xl fab fa-linkedin text-[#0077B5]"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Line */}
                <hr className="h-px my-0 bg-gray-700 border-none" />

                {/* Footer Bottom Content */}
                <div>
                    <p className="text-center text-gray-500">
                        © Body Build House 2024 - All rights reserved
                    </p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;