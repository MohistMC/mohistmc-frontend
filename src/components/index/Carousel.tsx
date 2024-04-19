import {Carousel, Flowbite} from 'flowbite-react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectTheme} from "@/features/theme/ThemeSlice";
import {customTheme} from "@/util/Theme";
import Image from "next/image";
import bisecthosting from "../../../public/bisecthosting.webp"
import codemcDark from "../../../public/codemc_dark.webp"
import codemcWhite from "../../../public/codemc_white.webp"
import yourkit from "../../../public/yourkit.webp"
import jetbrains from "../../../public/jetbrains.svg"
import elfidc from "../../../public/elfidc.webp"

export default function DefaultCarousel() {
    const mode = useSelector(selectTheme)

    return (
        <Flowbite theme={{theme: customTheme, mode}}>
            <Carousel>
                <Link href={`https://ci.codemc.io/`}><Image
                    className={`md:w-1/6`}
                    alt="CodeMC Logo"
                    src={mode === 'dark' ? codemcWhite : codemcDark}
                /></Link>
                <Link href={`https://www.bisecthosting.com/mohistmc`}><Image
                    className={`md:w-1/4`}
                    alt="BisectHosting Logo"
                    src={bisecthosting}
                /></Link>
                <Link href={`https://www.yourkit.com/`}><Image
                    className={`md:w-1/6`}
                    alt="YourKit Logo"
                    src={yourkit}
                /></Link>
                <Link href={`https://www.jetbrains.com`}><Image
                    className={`md:w-1/6`}
                    alt="JetBrains Logo"
                    src={jetbrains}
                /></Link>
                <Link href={`https://www.elfidc.com/aff.php?aff=24`}><Image
                    className={`md:w-1/4`}
                    alt="ELFIDC Logo"
                    src={elfidc}
                /></Link>
            </Carousel>
        </Flowbite>
    )
}


