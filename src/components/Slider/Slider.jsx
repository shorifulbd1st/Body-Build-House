

import { useRef, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Slider = () => {
    const sliderRef = useRef(null);
    const thumbnailRef = useRef(null);

    // const sliderItems = [
    //     {
    //         img: 'https://images.pexels.com/photos/6740821/pexels-photo-6740821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

    //     },
    //     {
    //         img: 'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

    //     },
    //     {
    //         img: 'https://images.pexels.com/photos/3917659/pexels-photo-3917659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

    //     },
    //     {
    //         img: 'https://images.pexels.com/photos/28636779/pexels-photo-28636779/free-photo-of-pair-of-kettlebells-on-artificial-grass-gym-floor.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

    //     },
    // ];

    // Function to move slider
    const sliderItems = [
        {
            img: 'https://images.pexels.com/photos/6740821/pexels-photo-6740821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Focused Workout Session',
            description: 'A dedicated athlete training intensely in the gym, pushing limits for peak performance.',
        },
        {
            img: 'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Outdoor Running Exercise',
            description: 'A fit individual jogging on a scenic road, promoting a healthy and active lifestyle.',
        },
        {
            img: 'https://images.pexels.com/photos/3917659/pexels-photo-3917659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Strength Training Routine',
            description: 'A determined woman lifting dumbbells, demonstrating dedication to fitness and strength training.',
        },
        {
            img: 'https://images.pexels.com/photos/28636779/pexels-photo-28636779/free-photo-of-pair-of-kettlebells-on-artificial-grass-gym-floor.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Essential Gym Equipment',
            description: 'A pair of kettlebells placed on artificial grass, symbolizing strength and endurance training.',
        },
    ];

    const moveSlider = (direction) => {
        const sliderList = sliderRef.current.querySelector(".list");
        const thumbnailList = thumbnailRef.current;
        const sliderItems = sliderList.querySelectorAll(".item");
        const thumbnailItems = thumbnailList.querySelectorAll(".item");

        if (direction === "next") {
            sliderList.appendChild(sliderItems[0]);
            thumbnailList.appendChild(thumbnailItems[0]);
            sliderRef.current.classList.add("next");
        } else {
            sliderList.prepend(sliderItems[sliderItems.length - 1]);
            thumbnailList.prepend(thumbnailItems[thumbnailItems.length - 1]);
            sliderRef.current.classList.add("prev");
        }

        // Clean up the animation class after animation ends
        sliderRef.current.addEventListener(
            "animationend",
            () => {
                sliderRef.current.classList.remove(direction);
            },
            { once: true }
        );
    };

    // Auto-Play Functionality
    useEffect(() => {
        const interval = setInterval(() => {
            moveSlider("next");
        }, 4000); // Change slide every 3 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider " ref={sliderRef}>
            {/* Slider List */}
            <div className="list">
                {sliderItems.map((item, index) => (
                    <div className="item" key={index}>
                        <img src={item.img} alt={item.type} />
                        <div className="content">
                            <div className="title text-xl text-[#C70039] lg:text-4xl">{item.title}</div>
                            <div className="type text-xl ">{item.description}</div>
                            <div className="mt-10">
                                <Link to="/all-classes" className="px-4 w-full text-center py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 sm:mt-0 sm:mx-2">SEE MORE</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Thumbnails */}
            <div className="thumbnail" ref={thumbnailRef}>
                {sliderItems.map((item, index) => (
                    <div className="item" key={index}>
                        <img src={item.img} alt={`Thumbnail ${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="nextPrevArrows mt-5">
                <button className="prev" onClick={() => moveSlider("prev")}>
                    &lt;
                </button>
                <button className="next" onClick={() => moveSlider("next")}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Slider;
