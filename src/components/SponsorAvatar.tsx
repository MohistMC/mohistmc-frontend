import {getInitials} from "@/lib/String";
import React, {useEffect, useState} from "react";


interface Donor {
    name: string
    image: string
    totalAmountDonated: number
}

interface SecondDonor {
    Name: string;
    Total: string;
}

interface Patreon {
    Name: string;
    'Lifetime Amount': string;
}

const SponsorAvatar: React.FC = () => {

    // React states
    const [donors, setDonors] = useState<Donor[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    // React effect
    useEffect(() => {
        const fetchDonors = async () => {
            try {
                // 读取第一个 JSON 文件
                const response1 = await fetch('/json/sponsor/opencollective.json');
                const json1 = await response1.json();

                // 读取第二个 JSON 文件
                const response2 = await fetch('/json/sponsor/ko-fi.json');
                const json2: SecondDonor[] = await response2.json();

                // 读取第三个 JSON 文件
                const response3 = await fetch('/json/sponsor/patreon.json');
                const json3: Patreon[] = await response3.json();

                // 将第二个 JSON 文件的数据转换为与第一个 JSON 文件相同的格式
                const convertedDonors = json2.map((donor: SecondDonor) => ({
                    name: donor.Name,
                    image: '', // 假设第二个 JSON 文件没有图片
                    totalAmountDonated: parseFloat(donor.Total),
                }));

                // 将第三个 JSON 文件的数据转换为与第一个 JSON 文件相同的格式
                const patreon = json3.map((donor: Patreon) => ({
                    name: donor.Name,
                    image: '', // 假设第二个 JSON 文件没有图片
                    totalAmountDonated: parseFloat(donor["Lifetime Amount"]),
                }));

                // 合并两个 JSON 文件的数据
                const combinedDonors = [...json1, ...convertedDonors, ...patreon];

                // 过滤掉 totalAmountDonated 为 0 的捐赠者
                const filteredDonors = combinedDonors.filter((donor: Donor) => donor.totalAmountDonated !== 0);

                // 去重并合并金额
                const uniqueDonors = filteredDonors.reduce((acc: Donor[], donor: Donor) => {
                    const nameMapping: Record<string, string> = {
                        'GT': 'Galen Huang',
                        // 可以添加更多映射关系
                    };

                    // 获取标准化后的名字
                    const normalizedName = nameMapping[donor.name] || donor.name;

                    // 查找是否已存在相同名字的捐赠者
                    const existingDonor = acc.find((d: Donor) => d.name === normalizedName);
                    if (existingDonor) {
                        // 如果存在，累加捐赠金额
                        existingDonor.totalAmountDonated += donor.totalAmountDonated;
                    } else {
                        // 如果不存在，添加新的捐赠者，并使用标准化后的名字
                        acc.push({ ...donor, name: normalizedName });
                    }
                    return acc;
                }, []);

                // 按 totalAmountDonated 从大到小排序
                const sortedDonors = uniqueDonors.sort((a: Donor, b: Donor) => b.totalAmountDonated - a.totalAmountDonated);

                setDonors(sortedDonors);
                const total = uniqueDonors.reduce((sum: any, donor: { totalAmountDonated: any; }) => sum + donor.totalAmountDonated, 0);
                setTotalAmount(total);
            } catch (error) {
                console.error('Error fetching donors:', error);
            }
        };

        fetchDonors().then(() => '{}');
    }, []);



    return (
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-base-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full max-w-7xl">
                {donors.map((donor, index) => (
                    <div
                        key={index}
                        className="group flex flex-col space-y-4 p-4 items-center rounded-box shadow-md hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 border border-base-200 h-full active:scale-[0.98] bg-base-200"
                    >
                        {/* 头像 */}
                        {donor.image ? (
                            <a
                                href='/'
                                target="_blank"
                                className="block p-1 rounded-full"
                            >
                                <img
                                    src={donor.image}
                                    alt={donor.image + ' logo'}
                                    className="rounded-full w-14 h-14 object-cover"
                                />
                            </a>
                        ) : (
                            <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-base-300 rounded-full p-1">
                                <span className="font-medium text-base-content text-sm">{getInitials(donor.name)}</span>
                            </div>
                        )}

                        {/* 文字内容 */}
                        <div className="flex flex-col space-y-1.5 items-center">
                            <div className="flex items-center">
                                <h3 className={`font-semibold ${donor.name.length > 17 ? 'text-sm' : 'text-lg'} border-b-2 ${index === 0 ? 'border-red-500' : 'border-cyan-500'}`}>
                                    {donor.name}
                                </h3>
                            </div>
                            <p className={`text-base-content/70 text-sm leading-5 line-clamp-2 border-b-2 ${index === 0 ? 'border-red-500' : 'border-cyan-500'}`}>
                                Totals: ＄{donor.totalAmountDonated.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SponsorAvatar
