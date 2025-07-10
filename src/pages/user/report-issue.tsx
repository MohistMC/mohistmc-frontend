import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import React, { useEffect, useState } from 'react'
import ProductCards from '@/components/report-issue/ProductCards'
import IssueTypesCards from '@/components/report-issue/IssueTypesCards'
import { selectUser } from '@/features/user/UserSlice'
import { useRouter } from 'next/router'
import LoginModal from '@/components/modals/LoginModal'
import { ToastLogger } from '@/util/Logger'
import IssueForm from '@/components/report-issue/IssueForm'

enum Product {
    Mohist = 'mohist',
    Website = 'website',
    Other = 'other',
}

enum IssueType {
    Bug = 'bug',
    Feature = 'feature',
    Question = 'question',
    Other = 'other',
}

export default function ReportIssue() {
    const router = useRouter()

    const strings = useAppSelector(selectTranslations)
    const user = useAppSelector(selectUser)

    const [openLoginModal, setOpenLoginModal] = useState<string | undefined>()

    const { product, issueType } = router.query as {
        product: Product
        issueType: IssueType
    }

    // Force the modal to open if the user is not logged in
    useEffect(() => {
        if (!user.isBeingLogged && !user.isLogged && !openLoginModal) {
            ToastLogger.error(
                `You need to be logged in to access ${router.pathname} page.`,
                5000,
            )
            setOpenLoginModal('dismissible')
        }
    }, [openLoginModal, user.isBeingLogged, user.isLogged, router.pathname])

    const setSelectedProduct = (product: string) => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    product: product,
                },
            },
            undefined,
            { shallow: true },
        )
    }

    const setSelectedIssueType = (issueType: string) => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    issueType: issueType,
                },
            },
            undefined,
            { shallow: true },
        )
    }

    useEffect(() => {
        if (product && !Object.values(Product).includes(product as Product)) {
            ToastLogger.error(`The product ${product} doesn't exist.`, 5000)
            router.push(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        product: undefined,
                    },
                },
                undefined,
                { shallow: true },
            )
        }
    }, [product, router])

    useEffect(() => {
        if (
            issueType &&
            !Object.values(IssueType).includes(issueType as IssueType)
        ) {
            ToastLogger.error(
                `The issue type ${issueType} doesn't exist.`,
                5000,
            )
            router.push(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        issueType: undefined,
                    },
                },
                undefined,
                { shallow: true },
            )
        }
    }, [issueType, router])

    return (
        <>
            {openLoginModal && (
                <LoginModal
                    openModal={openLoginModal}
                    setOpenModal={setOpenLoginModal}
                    mustLogin={true}
                />
            )}
            <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-50">
                <div className="px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        {strings['report.issue.title']}
                    </h1>
                    <p className="mb-5 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-300">
                        {strings['report.issue.desc']}
                    </p>
                </div>

                {!product && (
                    <ProductCards setSelectedProduct={setSelectedProduct} />
                )}
                {product && !issueType && (
                    <IssueTypesCards
                        setSelectedIssueType={setSelectedIssueType}
                    />
                )}
                {product && issueType && <IssueForm />}
            </section>
        </>
    )
}
