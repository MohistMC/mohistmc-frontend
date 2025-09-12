import Image, {StaticImageData} from 'next/image'
import Link from 'next/link'
import {FaArrowRight} from 'react-icons/fa'

interface FeatureCardProps {
    imageSrc: StaticImageData | string
    imageAlt?: string
    title: string
    subtitle?: string
    description: string
    id: string
    buttonText?: string
}

const FeatureCard = ({
                         imageSrc,
                         imageAlt,
                         title,
                         subtitle,
                         description,
                         id,
                         buttonText = 'Read more',
                     }: FeatureCardProps) => {
    return (
        <article className="mx-5 md:mx-0 max-w-sm p-6 border border-base-300 rounded-box shadow-md bg-base-200">
            <div className="flex items-start gap-4 mb-4">
                <figure className="relative h-16 w-16 min-w-[4rem] rounded-box overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={imageAlt || `${title} Logo`}
                        fill
                        sizes="(max-width: 768px) 64px, 96px"
                        className="object-cover"
                        priority
                    />
                </figure>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-base-content">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-1.5 text-sm font-medium tracking-tight text-base-content/80">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            <p className="mb-4 line-clamp-3 text-base-content/90">
                {description}
            </p>
            <div className="flex">
                <Link
                    href={`/download/${id}`}
                    className="btn btn-primary"
                    aria-label={`Read more about ${title}`}
                >
                    Download
                    <FaArrowRight className="ml-2 -mr-1 w-4 h-4" />
                </Link>
                <Link
                    href={`/resources/${id}`}
                    className="btn ml-auto"
                    aria-label={`Read more about ${title}`}
                >
                    {buttonText}
                    <FaArrowRight className="ml-2 -mr-1 w-4 h-4" />
                </Link>
            </div>
        </article>
    )
}

export default FeatureCard
