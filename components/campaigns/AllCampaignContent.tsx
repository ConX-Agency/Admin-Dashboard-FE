import { CampaignCardsProps, dummyCampaignsData, FiltersProps, IconWithToolTipProps } from '@/data/campaign'
import { formatURL } from '@/lib/urlFormatter'
import { Calendar, Clock, Filter, FilterX, Globe, MapPinned } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { AnimatePresence, motion } from 'framer-motion'

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  // Example filter logic (you can replace this with actual filter conditions)
  const filterCampaigns = () => {
    const filteredData = dummyCampaignsData.filter((campaign) => {
      // Apply your filtering logic here (e.g., filter by status or date)
      return campaign.status === 'Active';
    });

    // Pass the filtered data to the parent component
    onFilterChange(filteredData);
    setIsFiltered(true);
  };

  const unfilterCampaigns = () => {
    onFilterChange(dummyCampaignsData);
    setIsFiltered(false);
  }

  return (
    <div className='flex flex-row flex-wrap justify-between w-full'>
      <AnimatePresence>
        {!isFiltered && (
          <Button
            variant='ghost'
            className='h-[40px] w-[40px] p-2 flex justify-center items-center cursor-default hover:bg-transparent'
          >
            <motion.div
              initial={{ translateX: -20, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: 20, opacity: 0 }}
            >
              <Filter className='h-[20px] w-[20px]' />
            </motion.div>
          </Button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFiltered && (
          <Button
            variant='outline'
            className='h-[40px] w-[40px] p-2 flex justify-center items-center'
            onClick={unfilterCampaigns}
          >
            <motion.div
              initial={{ translateX: -20, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: 20, opacity: 0 }}
            >
              <FilterX className='h-[20px] w-[20px]' />
            </motion.div>
          </Button>
        )}
      </AnimatePresence>
    </div >
  );
};

const CampaignCards: React.FC<CampaignCardsProps> = ({ campaigns }) => {

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
      {campaigns.map((data, idx) => (
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
          <div className='mt-4 bg-black p-2 px-3 rounded-b-md w-full flex flex-row items-center justify-between'>
            <div className='flex flex-col justify-center'>
              <span className='text-[11px] text-neutral-200 font-semibold tracking-[.3px]'>Due Date</span>
              <span className='text-[14px] text-neutral-50'>{data.end_date}</span>
            </div>
            <div className='flex flex-row flex-wrap gap-2 justify-end items-center'>
              <IconWithTooltip
                IconComponent={MapPinned}
                popoverText={data.location}
              />
              <IconWithTooltip
                IconComponent={Calendar}
                popoverText={`${data.start_date} - ${data.end_date}`}
              />
              <IconWithTooltip
                IconComponent={Globe}
                popoverText={`${data.influencers.length} Active Influencer(s)`}
              />
              <IconWithTooltip
                IconComponent={Clock}
                popoverText={`${data.activities_remaining} Activities Left`}
              />
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

const IconWithTooltip: React.FC<IconWithToolTipProps> = ({ IconComponent, popoverText }) => (
  <Popover>
    <PopoverTrigger asChild>
      <div
        className='flex items-center justify-center bg-neutral-50 rounded-full w-[30px] h-[30px] transition-all duration-300 
      text-black hover:bg-neutral-200'
      >
        <IconComponent className='w-[15px] h-[15px]' />
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-full px-2 py-1" side='top' align='center'>
      <span className='text-[12px]'>
        {popoverText}
      </span>
    </PopoverContent>
  </Popover>
);

export { Filters, CampaignCards }