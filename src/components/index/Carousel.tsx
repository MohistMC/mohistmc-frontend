import {Carousel, CustomFlowbiteTheme, Flowbite} from 'flowbite-react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";

const customTheme: CustomFlowbiteTheme = {
    carousel: {
        "root": {
            "base": "relative h-36 md:h-56 w-full mb-10",
            "leftControl": "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
            "rightControl": "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
        },
        "indicators": {
            "active": {
                "off": "bg-gray-300 hover:bg-gray-200 dark:bg-dark-100 dark:hover:bg-gray-800",
                "on": "bg-gray-200 dark:bg-dark-400"
            },
            "base": "h-3 w-3 rounded-full",
            "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
        },
        "item": {
            "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
            "wrapper": "w-full flex-shrink-0 transform cursor-grab snap-center"
        },
        "control": {
            "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 group-hover:bg-gray-400 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-dark-200 dark:group-hover:dark:bg-dark-100 dark:group-focus:dark:bg-dark-100 sm:h-10 sm:w-10",
            "icon": "h-5 w-5 text-white dark:text-gray-500 sm:h-6 sm:w-6"
        },
        "scrollContainer": {
            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
            "snap": "snap-x"
        }
    }
};

export default function DefaultCarousel() {
    const isDark = useSelector(selectTheme)

    return (
        <Flowbite theme={{theme: customTheme, dark: isDark}}>
            <Carousel>
                <Link href={`https://ci.codemc.io/`}><img
                    className={`md:w-1/6`}
                    alt="..."
                    src="/codemc.png"
                /></Link>
                <Link href={`https://www.bisecthosting.com/mohistmc`}><img
                    className={`md:w-1/4`}
                    alt="..."
                    src="/bisecthosting.png"
                /></Link>
                <Link href={`https://www.yourkit.com/`}><img
                    className={`md:w-1/6`}
                    alt="..."
                    src="/yourkit.png"
                /></Link>
            </Carousel>
        </Flowbite>
    )
}


