// src/components/TitleContainer.tsx
import React from 'react'

interface TitleContainerProps {
    titleKey: string
    subtitleKey: string
    fromColor?: string
    toColor?: string
}

const TitleContainer: React.FC<TitleContainerProps> = ({
                                                           titleKey,
                                                           subtitleKey,
                                                           fromColor = 'from-primary',
                                                           toColor = 'to-secondary'
                                                       }) => {
    return (
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            {/* 主标题 */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                <span className={`bg-gradient-to-r ${fromColor} ${toColor} bg-clip-text text-transparent`}>
                    {titleKey}
                </span>
            </h1>

            {/* 副标题 */}
            <p className="mb-12 text-lg font-normal text-base-content/70 lg:text-xl sm:px-4 md:px-8 lg:px-16 xl:px-32">
                {subtitleKey}
            </p>
        </div>
    )
}

export default TitleContainer
