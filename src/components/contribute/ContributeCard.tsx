import { Button, Card } from 'flowbite-react'
import React from 'react'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslationsByString } from '@/features/i18n/TranslatorSlice'
import { Contributes } from '@/util/content/Contributes'

export default function ContributeCard({
    imgSrc,
    name,
    button_href,
    button,
}: Contributes) {
    const translations = useAppSelector(selectTranslationsByString)

    return (
        <Card imgSrc={imgSrc} className="max-w-sm">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {translations[`contribute.cards.${name}.title`]}
            </h2>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {translations[`contribute.cards.${name}.desc`]}
            </p>
            <Button href={button_href}>{translations[button]}</Button>
        </Card>
    )
}
