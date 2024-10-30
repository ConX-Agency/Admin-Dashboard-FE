import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import Image from 'next/image'

const PendingServicesContent = () => {
  return (
    <div className='flex flex-col gap-3'>
      <PendingServicesFilter />
      <PendingServicesAccordion />
    </div>
  )
}

const PendingServicesFilter = () => {
  return (
    <div>Filter</div>
  )
}

const PendingServicesAccordion = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className='text-xl font-bold xxxs:text-[16px] xxs:text-[18px] xs:text-[20px]'>
              80th Korean Independence Day
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className='px-4 mt-3 flex flex-row w-full gap-3 items-center'>
              <div className='w-[75px] h-[75px] flex justify-center items-center bg-neutral-600 rounded-full flex-shrink-0'>
                <Image src="/images/logo/red.svg" width={40} height={40} alt='tiktok.svg' className='invert'/>
              </div>
              <div className='flex justify-start flex-row w-full flex-wrap gap-2'>
                <div className='rounded-xl bg-neutral-700 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
                <div className='rounded-xl bg-neutral-600 h-[35px] px-4 flex justify-center items-center'>test</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const PendingServicesCard = () => {

}

export default PendingServicesContent