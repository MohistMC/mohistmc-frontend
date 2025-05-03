import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

interface FeatureCardProps {
    imageSrc: StaticImageData | string
    imageAlt?: string
    title: string
    subtitle?: string
    description: string
    buttonLink: string
    buttonText?: string
}

const FeatureCard = ({
    imageSrc,
    imageAlt,
    title,
    subtitle,
    description,
    buttonLink,
    buttonText = 'Read more',
}: FeatureCardProps) => {
    return (
        <article className="mx-5 md:mx-0 max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-dark-100 dark:border-dark-200">
            <div className="flex items-start gap-4 mb-4">
                <figure className="relative h-16 w-16 min-w-[4rem] rounded-lg overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={imageAlt || `${title} Logo`}
                        fill
                        sizes="(max-width: 768px) 64px, 96px"
                        className="object-cover"
                        priority
                    />
                </figure>

                <header className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 tracking-tight">
                            {subtitle}
                        </p>
                    )}
                </header>
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300 line-clamp-3">
                {description}
            </p>

            <Link
                href={buttonLink}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-100 transition-colors duration-300"
                aria-label={`Read more about ${title}`}
            >
                {buttonText}
                <FaArrowRight className="ml-2 -mr-1 w-4 h-4" />
            </Link>
        </article>
    )
}

export default FeatureCard
