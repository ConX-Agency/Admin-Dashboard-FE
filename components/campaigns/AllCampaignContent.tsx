import { dummyCampaignsData, IconWithToolTipProps } from '@/data/campaign'
import { formatURL } from '@/lib/urlFormatter'
import { Calendar, Clock, Globe, MapPinned } from 'lucide-react'
import React, { useRef } from 'react'

const Filters = () => {
  return (
    <div className='flex flex-row flex-wrap justify-between w-full'>
      Filters
    </div>
  )
}

const CampaignCards = () => {

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]); // Store refs in an array

  const handleWheel = (e: React.WheelEvent, index: number) => {
    if (scrollRefs.current[index]) {
      e.preventDefault();

      const container = scrollRefs.current[index];
      const scrollAmount = e.deltaY * 2; // Adjust this multiplier for faster/slower scroll

      if (container) {
        let start = container.scrollLeft;
        const target = start + scrollAmount;

        const smoothScroll = () => {
          start += (target - start) * 0.2; // Control speed here by changing 0.2 (smoothing factor)
          container.scrollLeft = start;

          if (Math.abs(target - start) > 1) {
            window.requestAnimationFrame(smoothScroll); // Continue animation until target is reached
          }
        };

        window.requestAnimationFrame(smoothScroll);
      }
    }
  };

  function directToCampaign(campaign: string) {
    console.log(formatURL(campaign));
  }

  return (
    <div className='grid xxxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 h-full'>
      {dummyCampaignsData.map((data, idx) => (
        <div className='shadow-md rounded-md cursor-pointer group bg-neutral-50 hover:bg-neutral-200/25 dark:bg-neutral-800 
          dark:hover:bg-neutral-700 transition-all duration-300 relative max-h-[300px]'
          key={data.id} onClick={() => directToCampaign(data.campaign)}>
          <div className='pt-3 px-3 w-full text-ellipsis text-nowrap overflow-hidden'>
            <span className='font-semibold text-[17px] text-black hover:text-black/50
              transition-all duration-300 dark:text-white dark:hover:text-white/75' title={data.campaign}>
              {data.campaign}
            </span>
            <div className='w-full'>
              <span className='text-[12px]'>
                {data.name}
              </span>
            </div>
          </div>
          {/* Tags */}
          <div
            className='mt-6 flex flex-row flex-nowrap w-full px-3 gap-2 overflow-x-scroll scroll-smooth scrollbar-hide'
            ref={(el) => { scrollRefs.current[idx] = el; }}
            onWheel={(e) => handleWheel(e, idx)}
          >
            {data.tags.map((tag, tagIdx) => (
              <div className='rounded-3xl px-2 py-[2px] bg-neutral-300 text-black dark:bg-neutral-600 dark:text-white
                text-[13px] text-nowrap' key={tagIdx}>
                {tag}
              </div>
            ))}
          </div>
          {/* Bottom Half */}
          <div className='mt-4 bg-blue-500 p-2 px-3 rounded-b-md w-full flex flex-row items-center justify-between'>
            <div className='flex flex-col justify-center'>
              <span className='text-[11px] text-neutral-200 font-semibold tracking-[.3px]'>Due Date</span>
              <span className='text-[14px] text-neutral-50'>{data.end_date}</span>
            </div>
            <div className='flex flex-row flex-wrap gap-2 justify-end items-center'>
              <IconWithTooltip
                IconComponent={MapPinned}
                tooltip={data.location}
              />
              <IconWithTooltip
                IconComponent={Calendar}
                tooltip={`${data.start_date} - ${data.end_date}`}
              />
              <IconWithTooltip
                IconComponent={Globe}
                tooltip={`${data.influencers.length} Active Influencer(s)`}
              />
              <IconWithTooltip
                IconComponent={Clock}
                tooltip={`${data.activities_remaining} Activities Left`}
              />
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

const IconWithTooltip: React.FC<IconWithToolTipProps> = ({ IconComponent, tooltip }) => (
  <div
    className='flex items-center justify-center bg-neutral-50 rounded-full w-[30px] h-[30px] transition-all duration-300 
      text-blue-500 hover:bg-neutral-200'
    title={tooltip}
  >
    <IconComponent className='w-[15px] h-[15px]' />
  </div>
);

export { Filters, CampaignCards }