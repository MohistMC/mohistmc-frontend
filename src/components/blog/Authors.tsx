import { AuthorDetails } from '@/util/content/Team'
import { BlogAvatar } from '@/components/blog/BlogAvatar'

export function Authors({ authors }: { authors: Array<AuthorDetails> }) {
    return (
        <div className="w-full border-b border-gray-400 authors border-opacity-20">
            <div
                className={`flex flex-wrap justify-center py-8 mx-auto gap-7 ${authors.length > 4 && 'max-w-3xl'}`}
            >
                {authors.map((author) => (
                    <BlogAvatar key={author.name} {...author} />
                ))}
            </div>
        </div>
    )
}
