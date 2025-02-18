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
                            <a
                                href="https://www.bodybuilding.com/fun/beginning_training_guide.htm"
                                target="_blank"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Resources
                            </a>
                            <a
                                href="https://www.bodybuilding.com/category/build-muscle"
                                target="_blank"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Document Services
                            </a>
                            <a
                                href="https://www.bodybuilding.com/content/one-tip-to-transform-your-bench-press.html"
                                target="_blank"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Services
                            </a>
                        </div>

                        {/* About Section */}
                        <div className="w-full sm:w-1/3 mb-6">
                            <h3 className="uppercase font-bold">About</h3>
                            <a
                                href="https://shop.bodybuilding.com/"
                                target="_blank"

                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Company
                            </a>
                            <a
                                href="https://shop.bodybuilding.com/pages/podcasts"
                                target="_blank"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Community
                            </a>
                            <a
                                href="https://shop.bodybuilding.com/pages/join-the-team"
                                target="_blank"
                                className="block mt-2 text-sm font-semibold text-gray-400 hover:underline"
                            >
                                Careers
                            </a>
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
                                <a href="https://www.facebook.com" target="_blank" className="text-3xl fab fa-facebook text-[#1877F2]"></a>
                                <a href="https://x.com" target="_blank" className="text-3xl fab fa-twitter text-[#1DA1F2]"></a>
                                <a href="https://linkedin.com" target="_blank" className="text-3xl fab fa-linkedin text-[#0077B5]"></a>
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