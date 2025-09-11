export default function Loading() {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <div className="text-center">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="mt-4">加载颜色数据中...</p>
            </div>
        </div>
    );
}