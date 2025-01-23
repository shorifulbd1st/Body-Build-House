import React from 'react'

const SocialButtons = () => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-8">
            {/* Find With Me Section */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-wide uppercase text-gray-800">
                    Find With Me
                </h2>

                <div className="flex flex-wrap gap-4">
                    <a href="https://www.facebook.com/shafiq1st" target="_blank" className="w-12 h-12  bg-white rounded-md px-4 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.08),0px_0px_0px_0px_rgba(255,255,255,0.8)] hover:bg-[#FF014F] hover:text-white transition-all duration-300 flex items-center justify-center">
                        <i className=" text-3xl fab fa-facebook text-[#1877F2] hover:text-white"></i>
                    </a>
                    <a href='https://github.com/shafiqbd1st?tab=repositories' target='_blank' className="w-12 h-12  bg-white rounded-md px-4 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.08), 0px_0px_0px_0px_rgba(255,255,255,0.8)] hover:bg-[#FF014F] hover:text-white transition-all duration-300 flex items-center justify-center">
                        <i className=" text-3xl fab fa-github "></i>
                    </a>
                    <a href='https://www.linkedin.com/' target='_blank' className="w-12 h-12  bg-white rounded-md px-4 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.08), 0px_0px_0px_0px_rgba(255,255,255,0.8)] hover:bg-[#FF014F] hover:text-white transition-all duration-300 flex items-center justify-center">
                        <i className="text-3xl fab fa-linkedin text-[#0077B5] hover:text-white"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SocialButtons
