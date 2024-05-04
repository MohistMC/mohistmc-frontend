import {AuthorDetails} from "@/util/content/Team";
import ProfileImage from "@/components/ProfileImage";

export const BlogAvatar = ({name, role, pageUrl}: AuthorDetails) => (
    <div className="flex items-center flex-shrink-0 md:justify-start">
        <ProfileImage name={name} githubUrl={pageUrl} size={12}/>
        <dl className="ml-2 text-sm font-medium leading-4 text-left whitespace-no-wrap">
            <dt className="sr-only">Name</dt>
            <dd className="text-gray-900 dark:text-white">{name}</dd>
            {pageUrl?.split('/')?.pop() && (
                <>
                    <dt className="sr-only">GitHub</dt>
                    <dd>
                        <a
                            href={pageUrl}
                            className="text-xs text-blue-500 no-underline betterhover:hover:text-blue-600 betterhover:hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {`@${pageUrl.split('/').pop()}`}
                        </a>
                    </dd>
                </>
            )}
        </dl>
    </div>
);
