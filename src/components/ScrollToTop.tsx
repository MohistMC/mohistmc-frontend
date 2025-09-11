"use client";

import {useEffect, useState} from 'react';
import {FaArrowUp} from "react-icons/fa";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // 监听滚动事件
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // 平滑滚动到顶部
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 transition-opacity duration-300">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="返回顶部"
                    className="btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-all hover:scale-110"
                >
                    <FaArrowUp className="text-lg" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
