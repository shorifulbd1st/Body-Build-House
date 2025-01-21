

import { useRef, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Slider = () => {
    const sliderRef = useRef(null);
    const thumbnailRef = useRef(null);
    const sliderItems = [
        {
            img: 'https://images.pexels.com/photos/5327551/pexels-photo-5327551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: "Strength Training",
            type: "Workout Program"
        },
        {
            img: 'https://images.pexels.com/photos/2261483/pexels-photo-2261483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: "Doing Barbell",
            type: "Wellness Routine"
        },
        {
            img: 'https://images.pexels.com/photos/13885346/pexels-photo-13885346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: "Weight Loss ",
            type: "Workout Program"

        },
        {
            img: 'https://images.pexels.com/photos/685531/pexels-photo-685531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: "HIIT Power Session",
            type: "Endurance Program"
        },
        {
            img: 'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: "Pilates Core Workout",
            type: "Fitness Class"
        },
    ];


    // Function to move slider
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
                            <div className="title text-xl">{item.title}</div>
                            <div className="type text-xl">{item.type}</div>
                            <div className="mt-5">
                                <Link to="/rooms" className="px-4 w-full text-center py-2.5 mt-5 text-sm font-medium tracking-wide  text-white capitalize transition-colors duration-300 transform bg-[#C70039] rounded-md hover:bg-[#C70039] focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 sm:mt-0 sm:mx-2">SEE MORE</Link>
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
