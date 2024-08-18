import {AuthorList} from "@/util/content/CommunityTeam";

export default function CommunityTeamCard({pageUrl}: AuthorList) {
    return (
        <div className="flex flex-wrap gap-4">
            <a href={pageUrl}>
                <img className={`w-20 h-20 rounded-full`} src={pageUrl + `.png`} alt={`Rounded avatar`}/>
            </a>
        </div>
    );
}
