'use client'

import React from 'react'
import { Button } from './ui/button'
import { PanelLeftOpen, PanelRightOpen, SkipBack } from 'lucide-react'
import { useSidebar } from './ui/sidebar';
import UserButton from '@/app/features/auth/components/user-button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const HeaderBar = () => {
    const { toggleSidebar, open, } = useSidebar();
    const path = usePathname();

    return (
        <>
            <div className=' p-4 h-[7rem]'>
                <div className="flex items-center justify-around my-auto w-full">
                    <div className='w-full flex justify-center xl:mr-5 xl:justify-center md:justify-end md:mr-36'>
                         <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => { toggleSidebar() }}
                            className='transition-all'
                        >
                            {!open ? <PanelLeftOpen /> : <PanelRightOpen />}
                        </Button>
                    </div>
                    <div className='flex justify-center w-full'>
                        {path != "/auth" ?
                            <div className=''>
                                <UserButton />
                            </div>
                            :
                            <div className='pr-10 w-[70px]'>
                                <Link href='/'>
                                    <Button
                                        size='icon'
                                        variant='ghost'
                                    >
                                        <SkipBack />
                                    </Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
