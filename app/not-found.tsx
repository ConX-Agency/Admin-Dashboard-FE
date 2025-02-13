import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';

export default function NotFound() {
    return (
        <>
            <div className="flex h-full flex-col items-center justify-center z-[999]">
                <div className="flex flex-row items-center">
                    <h1 className='xxxs:text-[125px] sm:text-[150px] md:text-[225px]'>4</h1>
                    <Image
                        src="/images/logo/logo.png"
                        width={100}
                        height={100}
                        alt="404"
                        className='rounded-full flex-shrink-0 xxxs:h-24 xxxs:w-24 sm:w-32 sm:h-32 md:h-44 md:w-44 dark:invert'
                    />
                    <h1 className='xxxs:text-[125px] sm:text-[150px] md:text-[225px] ml-3'>4</h1>
                </div>
                <div className='flex flex-wrap flex-col items-center justify-center'>
                    <span className='text-center xxxs:text-md md:text-xl text-wrap'>
                        This page didn't get enough engagement to stick around. Try heading back to the dashboard or starting a new campaign.
                    </span>
                    <Link href="/">
                        <Button
                            className='w-56 h-14 mt-5 text-xl font-bold transition-all duration-300 hover:translate-y-1'
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
            <ShootingStars />
            <StarsBackground />
        </>
    );
}
