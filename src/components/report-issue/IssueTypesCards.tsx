import React from "react";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";

interface IssueTypesCardsProps {
    setSelectedIssueType: (issueType: string) => void
}

export const IssueTypesCards = ({setSelectedIssueType}: IssueTypesCardsProps) => {
    const strings = useAppSelector(selectTranslations);

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 flex flex-row gap-4 flex-wrap">
            <button onClick={() => setSelectedIssueType('bug')} aria-label="Report a bug"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bug</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">You have bugs with one of our software? Click on this card.</p>
            </button>

            <button onClick={() => setSelectedIssueType('feature')} aria-label="Request a feature"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Feature / Suggestion</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">You want to make our software better? Click on this card.</p>
            </button>

            <button onClick={() => setSelectedIssueType('question')} aria-label="Ask a question"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Question</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">Any question about? Click on this card.</p>
            </button>

            <button onClick={() => setSelectedIssueType('other')} aria-label="Other"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Other</h2>
                <p className="font-normal text-gray-700 dark:text-gray-300">If you don&apos;t see what you want to do above, click on this card.</p>
            </button>
        </div>
    )
}

export default IssueTypesCards;