export class GitHubLink {
    static as(id: string): string {
        return `https://github.com/${id}`
    }

    static asPng(id: string): string {
        return `https://github.com/${id}.png`
    }
}
