import Tools from "@/components/tools/Tools";
import TitleContainer from "@/components/TitleContainer";


export default function Tool() {
    return (
        <div>
            <section className="flex flex-col min-h-screen pt-10 sm:pt-20">
                <TitleContainer
                    titleKey="MohistMC common tools"
                    subtitleKey="Some of the tools that you will use in your daily development and work"
                    fromColor="from-warning"
                    toColor="to-secondary"
                />
                {/* 内容区域 */}
                <main className="flex-1">
                    <div className="container mx-auto px-4 py-8">
                        <Tools />
                    </div>
                </main>
            </section>
        </div>
    )
}
