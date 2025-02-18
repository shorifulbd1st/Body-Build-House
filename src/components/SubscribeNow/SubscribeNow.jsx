import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const SubscribeNow = () => {
    const axiosPublic = useAxiosPublic();
    const { notify } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name')
        const email = form.get('email');
        const info = {
            name, email
        }
        // console.log(info)
        const res = await axiosPublic.post('/subscribe', info)
        // console.log(res.data)
        if (res.data.insertedId) {
            notify('success', 'your Subscribe successful')
            e.target.reset();
        }
    }
    return (
        <div className="w-11/12 mx-auto my-8">
            <header className="bg-white dark:bg-gray-900 ">
                <nav className="border-t-4 border-blue-500">
                    {/* <div className="container flex items-center justify-between px-6 py-3 mx-auto">
                        <a href="#">
                            <img
                                className="w-auto h-6 sm:h-7"
                                src="https://merakiui.com/images/full-logo.svg"
                                alt="Logo"
                            />
                        </a>

                        <a
                            href="#"
                            className="my-1 text-sm font-medium text-gray-500 rtl:-scale-x-100 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 lg:mx-4 lg:my-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div> */}
                </nav>

                <div className="container lg:px-8 mx-auto">
                    <div className="items-center lg:flex">
                        <div className="w-full lg:w-1/2">
                            <div data-aos="fade-left"
                                data-aos-duration="3000" className="lg:max-w-lg">
                                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                                    Subscribe To The <span className="text-[#C70039]">Newsletter</span>
                                </h1>
                                <p className="mt-3 text-gray-600 dark:text-gray-400">
                                    Stay updated with fitness tips, workout plans, and nutrition advice. Subscribe now and achieve your fitness goals faster!
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col mt-6 space-y-3 lg:space-y-0  gap-2">
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            className="px-4 py-2 border border-[#C70039]  text-gray-700 bg-white  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                                            placeholder="Enter your full name"
                                        /><input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="px-4 py-2  border border-[#C70039] text-gray-700 bg-white  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                                            placeholder="Email Address"
                                        />

                                        <button className="w-full  py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                            Subscribe
                                        </button>
                                    </div>
                                </form>


                            </div>
                        </div>

                        <div data-aos="fade-right"
                            data-aos-duration="3000" className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                            <img
                                className="w-full h-full max-w-md"
                                src="https://merakiui.com/images/components/Email-campaign-bro.svg"
                                alt="email illustration vector art"
                            />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default SubscribeNow;
