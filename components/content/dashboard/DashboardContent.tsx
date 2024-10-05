import { dummyDashboardCardData } from '@/data/dashboard';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'
import { SalesAnalyticsChart } from './Charts';
import { calculateChanges } from '@/lib/calculateChanges';

const DashboardContent = () => {

    return (
        <div className='flex lg:flex-row xxxs:flex-col gap-5'>
            {/* Left-Hand-Container */}
            <div className='lhc flex flex-col xxxs:w-[100%] lg:w-[70%] gap-3'>
                {/* Cards' Container */}
                <div className='flex flex-row justify-between w-full flex-wrap xxxs:gap-3 xs:gap-2 xl:gap-3'>
                    {/* Cards */}
                    <StatsCard />
                </div>
                <div className='flex flex-col w-full'>
                    <SalesAnalyticsChart />
                </div>
                <div className='flex flex-col w-full'>

                </div>
            </div>
            {/* Right-Hand-Container */}
            <div className='rhc flex flex-col xxxs:w-[100%] lg:w-[30%] bg-red-400 h-max'>
                <Image src="https://static.wikia.nocookie.net/meme-cats/images/c/ca/El_Gato_Original.png"
                    width={298}
                    height={317}
                    alt='cat.kpg'
                    className='w-full h-[400px]'
                />
            </div>
        </div>
    )
}




const StatsCard = () => {

    function updateDashboardData(dataArray: typeof dummyDashboardCardData) {
        return dataArray.map(item => ({
            ...item,
            changes: calculateChanges(item.previous, item.current) // Calculate and update the 'changes'
        }));
    }

    const updatedDashboardCardData = updateDashboardData(dummyDashboardCardData);
    
    return (
        updatedDashboardCardData.slice(0, 4).map((cardData, cardDataId) => (
            <div className='rounded-md bg-neutral-50 drop-shadow-md dark:bg-neutral-800 
                                xxxs:w-[100%] xs:w-[49%] h-[150px] p-4 justify-between flex flex-col' key={cardDataId}>
                <div className='flex flex-row justify-between w-full items-center'>
                    <div className='rounded-full bg-neutral-200 dark:bg-neutral-900 w-[40px] h-[40px] flex justify-center items-center'>
                        {cardData.icon}
                    </div>
                    <div className='flex flex-row text-sm'>
                        <span className={parseFloat(cardData.changes) >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {cardData.changes}
                        </span>
                        {parseFloat(cardData.changes) >= 0 ? (
                            <IconArrowUpRight className="text-green-600 h-4 w-4 flex-shrink-0 ml-1" />
                        ) : (
                            <IconArrowDownRight className="text-red-600 h-4 w-4 flex-shrink-0 ml-1" />
                        )}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-semibold tracking-[0.5px]'>{cardData.current}</span>
                    <span className='text-sm text-neutral-600 dark:text-neutral-400'>{cardData.label}</span>
                </div>
            </div>
        ))
    )
}

export default DashboardContent