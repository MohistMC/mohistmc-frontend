import ChineseColorsContent from "@/components/tools/ChineseColorsContent";
import {Suspense} from "react";
import Loading from "@/app/tools/ctc/loading";

export default function ChineseColorsPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ChineseColorsContent />
        </Suspense>
    );
}