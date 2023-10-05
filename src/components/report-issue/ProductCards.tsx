import React from "react";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";

interface ProductCardsProps {
    setSelectedProduct: (product: string) => void
}

export const ProductCards = ({setSelectedProduct}: ProductCardsProps) => {
    const strings = useAppSelector(selectTranslations);

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 flex flex-row gap-4 flex-wrap">
            <button onClick={() => setSelectedProduct('mohist')} aria-label="Choose Mohist"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mohist</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">{strings['index.cards.mohist.description']}</p>
            </button>

            <button onClick={() => setSelectedProduct('banner')} aria-label="Choose Banner"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Banner</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">{strings['index.cards.banner.description']}</p>
            </button>

            <button onClick={() => setSelectedProduct('website')} aria-label="Choose Website"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Website</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">Our website is there to allow any user to discover our software and download them easily and for free!</p>
            </button>

            <button onClick={() => setSelectedProduct('other')} aria-label="Choose Other"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Other</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">You don&apos;t want to ask something about any of the 3 software above? No problem, click here.</p>
            </button>
        </div>
    )
}

export default ProductCards;