
import {useEffect, useState} from 'react'
import Link from 'next/link'

type Comment = {
    id: number
    author: string
    content: string
    date: string
}

type Props = {
    jsonPath: string // Custom JSON path
}

export default function CommentSection({ jsonPath }: Props) {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState('')
    const [userId, setUserId] = useState<string>('')

    // Generate or get user ID
    useEffect(() => {
        // Check if user ID already exists in localStorage
        let id = localStorage.getItem('commentUserId')
        if (!id) {
            // If not exists, generate a new ID
            id = 'user_' + Math.random().toString(36).substring(2, 9)
            localStorage.setItem('commentUserId', id)
        }
        setUserId(id)
    }, [])

    // Load JSON data from specified path
    useEffect(() => {
        fetch(jsonPath)
            .then((res) => res.json())
            .then((data) => setComments(data))
    }, [jsonPath])

    const handleAddComment = () => {
        if (!newComment.trim() || !userId) return

        // Check if user has submitted a comment within 10 seconds
        const userLastCommentTime = localStorage.getItem(`lastCommentTime_${userId}`)
        const currentTime = Date.now()

        if (userLastCommentTime) {
            const timeDiff = currentTime - parseInt(userLastCommentTime)
            if (timeDiff < 10000) { // Cannot submit repeatedly within 10 seconds
                const remainingTime = Math.ceil((10000 - timeDiff) / 1000)
                alert(`Please wait ${remainingTime} seconds before submitting a new comment`)
                return
            }
        }

        const newCommentObj = {
            id: Date.now(),
            author: '@Guest',
            content: newComment,
            date: new Date().toISOString().split('T')[0],
        }

        setComments([newCommentObj, ...comments])
        setNewComment('')
        // Save user's last comment time
        localStorage.setItem(`lastCommentTime_${userId}`, currentTime.toString())
    }

    return (
        <section className="mb-24">
            <h2 className="mb-6 text-3xl font-bold">
                User Comments
            </h2>

            {/* Comment Form */}
            <div className="mb-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                ></textarea>
                <button
                    onClick={handleAddComment}
                    className="mt-2 px-6 py-2 bg-primary text-primary-content font-medium rounded-lg hover:bg-primary/90 transition"
                >
                    Submit Comment
                </button>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="p-4 bg-base-200 rounded-box"
                    >
                        <div className="flex justify-between items-center">
                            <Link
                                href=""
                                className="font-semibold text-base-content hover:text-primary transition"
                            >
                                {comment.author}
                            </Link>
                            <span className="text-sm text-base-content/60">
                                {comment.date}
                            </span>
                        </div>
                        <p className="mt-2 text-base-content/80">
                            {comment.content}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}