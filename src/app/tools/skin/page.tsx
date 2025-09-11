
"use client";

import React, {useEffect, useState} from 'react'

const MinecraftSkinViewer = () => {
    const [username, setUsername] = useState('')
    const [skinUrl, setSkinUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Default to Steve skin
    useEffect(() => {
        fetchSkin('Mgazul').catch(err => console.error('Error fetching default skin:', err))
    }, [])

    const fetchSkin = async (name: string) => {
        setIsLoading(true)

        try {
            // Check if username is valid
            if (!name || name.trim() === '') {
                throw new Error('Please enter a valid username')
            }

            // Mojang API has changed, now using third-party service or direct Minecraft skin URL
            const skinURL = `https://mc-heads.net/skin/${encodeURIComponent(name)}`

            // Verify if skin exists
            const response = await fetch(skinURL)
            if (!response.ok) {
                throw new Error('Unable to fetch skin - Player may not exist or network error')
            }

            setSkinUrl(skinURL)
            setUsername(name)
        } catch (err) {
            console.error('Error fetching skin:', err)
            // Can add user-friendly error message here
        } finally {
            setIsLoading(false)
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await fetchSkin(username)
        } catch (err) {
            // Can add global error message here, or keep internal handling in fetchSkin
            console.error('Error on submit:', err)
        }
    }

    const renderSkinAvatar = () => {
        if (!skinUrl) return null
        return (
            <div
                key="head"
                className={`cursor-pointer`}
                style={{
                    backgroundImage: `url(${skinUrl})`,
                    width: `64px`,
                    height: `64px`,
                    imageRendering: 'pixelated',
                    scale: 2,
                }}
            />
        )
    }

    const handleDownload = () => {
        if (!skinUrl) return

        const link = document.createElement('a')
        link.href = skinUrl
        link.download = `${username || 'minecraft'}_skin.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <section className="flex flex-col min-h-screen pt-20">
            <div className="pt-10 px-4 mx-auto max-w-screen-xl text-center">
                <p className="mb-5 relative inline-block text-lg font-semibold text-gray-700 lg:text-xl dark:text-gray-200 group transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                    Minecraft Skin Viewer
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                >
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Minecraft username"
                        disabled={isLoading}
                        className="px-4 py-2 w-full sm:w-auto rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : 'View Skin'}
                    </button>
                </form>
                <div className="pt-10 flex flex-col justify-center items-center gap-14">
                    {renderSkinAvatar()}
                    <button
                        onClick={handleDownload}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!skinUrl}
                    >
                        Download Skin
                    </button>
                </div>
            </div>
        </section>
    )
}

export default MinecraftSkinViewer