import {Avatar} from "flowbite-react";
import {AuthorList} from "@/util/content/CommunityTeam";

export default function CommunityTeamCard({pageUrl}: AuthorList) {
    return (
        <div className="flex flex-wrap gap-2">
            <a href={pageUrl}>
                <Avatar img={pageUrl + `.png`} rounded/>
            </a>
        </div>
    );
}
