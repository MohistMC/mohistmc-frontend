
// src/components/Carousel.tsx
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DefaultCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    const slides = [
        {
            id: 1,
            image: "/img/carousel/namehero.webp",
            alt: "NameHero Logo",
            link: "https://www.namehero.com/minecraft-server-hosting"
        },
        {
            id: 2,
            image: "/img/carousel/bisecthosting.webp",
            alt: "BisectHosting Logo",
            link: "https://www.bisecthosting.com/mohistmc"
        },
        {
            id: 3,
            image: "/img/carousel/devicloud.webp",
            alt: "DeviCloud Logo",
            link: "https://www.deviy.cn/"
        },
        {
            id: 4,
            image: "/img/carousel/yourkit.webp",
            alt: "YourKit Logo",
            link: "https://www.yourkit.com/"
        },
        {
            id: 5,
            image: "/img/carousel/jetbrains.svg",
            alt: "JetBrains Logo",
            link: "https://www.jetbrains.com"
        },
        {
            id: 6,
            image: "/img/carousel/elfidc.webp",
            alt: "ELFIDC Logo",
            link: "https://www.elfidc.com/aff.php?aff=24"
        }
    ];

    // 自动轮播
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setDirection('next');
            setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, slides.length]);

    // 切换到指定幻灯片
    const goToSlide = useCallback((index: number) => {
        setDirection(index > currentIndex ? 'next' : 'prev');
        setCurrentIndex(index);
    }, [currentIndex]);

    // 上一张
    const prevSlide = useCallback(() => {
        setDirection('prev');
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    }, [slides.length]);

    // 下一张
    const nextSlide = useCallback(() => {
        setDirection('next');
        setCurrentIndex(prevIndex =>
            (prevIndex + 1) % slides.length
        );
    }, [slides.length]);

    return (
        <div
            className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* 轮播内容 */}
            <div className="relative h-40 md:h-52">
                {slides.map((slide, index) => {
                    // 计算幻灯片位置
                    let position = 'hidden';
                    if (index === currentIndex) {
                        position = 'active';
                    } else if (
                        (direction === 'next' && index === (currentIndex + 1) % slides.length) ||
                        (direction === 'prev' && index === (currentIndex === 0 ? slides.length - 1 : currentIndex - 1))
                    ) {
                        position = 'next';
                    }

                    return (
                        <div
                            key={slide.id}
                            className={`
                                absolute inset-0 transition-all duration-700 ease-in-out
                                ${position === 'active' ? 'opacity-100 z-10 translate-x-0' : ''}
                                ${position === 'next' && direction === 'next' ? 'opacity-100 z-10 translate-x-full' : ''}
                                ${position === 'next' && direction === 'prev' ? 'opacity-0 z-0 translate-x-full' : ''}
                                ${position === 'hidden' ? 'opacity-0 z-0' : ''}
                                ${direction === 'next' && index === (currentIndex + 1) % slides.length ? 'translate-x-full' : ''}
                                ${direction === 'prev' && index === (currentIndex === 0 ? slides.length - 1 : currentIndex - 1) ? '-translate-x-full' : ''}
                            `}
                        >
                            <Link
                                href={slide.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <div className="flex items-center justify-center w-full h-full bg-base-100">
                                    <div className="flex items-center justify-center h-full w-full p-4 md:p-8">
                                        <Image
                                            className="object-contain max-h-full max-w-full transition-transform duration-700 hover:scale-125"
                                            src={slide.image}
                                            alt={slide.alt}
                                            width={500}
                                            height={260}
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* 轮播指示器 */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex
                                ? 'bg-primary w-6'
                                : 'bg-base-300 hover:bg-base-200'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* 导航按钮 */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/70 border-none hover:bg-base-100 z-20 transition-all duration-300"
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                ❮
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/70 border-none hover:bg-base-100 z-20 transition-all duration-300"
                onClick={nextSlide}
                aria-label="Next slide"
            >
                ❯
            </button>

            {/* 暂停指示器 */}
            {isPaused && (
                <div className="absolute top-4 right-4 badge badge-primary badge-sm z-20">
                    Paused
                </div>
            )}
        </div>
    );
}