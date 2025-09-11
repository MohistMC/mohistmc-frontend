"use client"

import CommunityTeamCard, {AuthorList,} from '@/components/team/CommunityTeamCard'
import React, {useEffect, useState} from 'react'
import TitleContainer from '@/components/TitleContainer'
import TeamCard, {AuthorDetails} from "@/components/team/TeamCard";

interface TeamData {
    [key: string]: AuthorDetails
}

interface CommunityTeamData {
    [key: string]: AuthorList
}

const Team: React.FC = () => {
    const [teamData, setTeamData] = useState<TeamData>({})
    const [communityTeamData, setCommunityTeamData] =
        useState<CommunityTeamData>({})

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch('/json/mohistmc_team.json')
                const data = await response.json()
                const response_ = await fetch('/json/community_team.json')
                const data_ = await response_.json()
                setTeamData(data)
                setCommunityTeamData(data_)
            } catch (error) {
                console.error('Error fetching team data:', error)
            }
        }

        fetchTeamData()
    }, [])

    return (
            <section className="flex flex-col min-h-screen pt-20">
                <TitleContainer
                    titleKey="MohistMC成员"
                    subtitleKey=""
                />

                <div
                    className={`flex flex-wrap md:w-full justify-center pt-12 pb-12 gap-7`}
                >
                    {Object.values(teamData).map((author) => (
                        <TeamCard key={author.name} {...author} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <h2 className="text-3xl font-black">
                        社区贡献者
                    </h2>
                </div>

                <div className="flex flex-wrap w-full md:w-3/5 justify-center pt-12 pb-12 gap-3 mx-auto">
                    {Object.values(communityTeamData).map((author) => (
                        <CommunityTeamCard
                            key={author.name}
                            id={author.id}
                            name={author.name}
                        />
                    ))}
                </div>
            </section>
    )
}

export default Team
