import {ReactNode} from "react";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {useSelector} from "react-redux";

function Date({
                  children,
                  update,
              }: {
    children: ReactNode;
    update?: string;
}) {

    const strings = useSelector(selectTranslations);

    return (
        <div className="text-sm mt-2 text-center text-gray-500 dark:text-gray-400 font-space-grotesk">
            {children}

            {update != null && (
                <div className="text-xs mt-1 text-center">{strings['blog.lastupdated']}</div>
            )}
        </div>
    );
}

export default Date;
