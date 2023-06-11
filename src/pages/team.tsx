import Mgazul from "../../public/profile/Mgazul.webp";
import Shawiizz from "../../public/profile/Shawiiz_z.webp"
import Romaindu35 from "../../public/profile/romaindu35.webp"
import InkerBot from "../../public/profile/inkerbot.webp"
import Wdog5 from "../../public/profile/wdog5.webp"
import KR33PY from "../../public/profile/KR33PY.webp"
import Terrainwax from "../../public/profile/Terrainwax.webp"
import Aceman from "../../public/profile/aceman.webp"
import SkyBai from "../../public/profile/skybai.webp"
import Spark from "../../public/profile/spark.webp"
import TeamCard from "@/components/Team/TeamCard";

export default function Team() {
    return (
        <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-50">
            <h1 className="md:mt-20 text-center w-3/4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Meet
                our <span className="text-blue-600 dark:text-blue-500">team!</span></h1>

            <div className={`flex flex-wrap md:w-full justify-center pt-12 pb-12 gap-7`}>
                <TeamCard name={`Mgazul`} image={Mgazul} role={`Admin & Developer`} pageUrl={`https://github.com/Mgazul`}/>
                <TeamCard name={`Shawiiz_z`} image={Shawiizz} role={`Admin & Developer`} pageUrl={`https://github.com/Shawiizz`}/>
                <TeamCard name={`Romaindu35`} image={Romaindu35} role={`Developer`} pageUrl={`https://github.com/romaindu35`}/>
                <TeamCard name={`InkerBot`} image={InkerBot} role={`Developer`} pageUrl={`https://github.com/InkerBot`}/>
                <TeamCard name={`Wdog5`} image={Wdog5} role={`Developer`} pageUrl={`https://github.com/wdog5`}/>
                <TeamCard name={`KR33PY`} image={KR33PY} role={`Contributor`} pageUrl={`https://github.com/KR33PY`}/>
                <TeamCard name={`Terrainwax`} image={Terrainwax} role={`Contributor`} pageUrl={`https://github.com/Terrainwax`}/>
                <TeamCard name={`Aceman`} image={Aceman} role={`Contributor`} pageUrl={`https://github.com/aceman1209`}/>
                <TeamCard name={`Sky_Bai`} image={SkyBai} role={`Contributor`} pageUrl={`https://github.com/a1640727878`}/>
                <TeamCard name={`Spark`} image={Spark} role={`Community Support`} pageUrl={`https://github.com/SparkGNRK`}/>
            </div>
        </section>
    )
}