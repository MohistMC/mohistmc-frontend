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
            {onButton({setSelectedIssueType}, 'bug', strings['report.issue.type.bug'], strings['report.issue.type.bug.desc'])}
            {onButton({setSelectedIssueType}, 'feature', strings['report.issue.type.feature'], strings['report.issue.type.feature.desc'])}
            {onButton({setSelectedIssueType}, 'question', strings['report.issue.type.question'], strings['report.issue.type.question.desc'])}
            {onButton({setSelectedIssueType}, 'other', strings['report.issue.type.other'], strings['report.issue.type.other.desc'])}
        </div>
    )
}

export function onButton({setSelectedIssueType}: IssueTypesCardsProps, issueType: string, title: string, description: string) {
    return (
        <button onClick={() => setSelectedIssueType(issueType)} aria-label="Other"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-dark-100 dark:border-dark-200 dark:hover:bg-dark-150">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
            <p className="font-normal text-gray-700 dark:text-gray-300">
                {description}
            </p>
        </button>
    );
}

export default IssueTypesCards;