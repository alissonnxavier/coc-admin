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
            <div>
                <div className="flex items-center justify-around py-5">
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => { toggleSidebar() }}
                        className='transition-all'
                    >
                        {!open ? <PanelLeftOpen /> : <PanelRightOpen />}
                    </Button>
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
        </>
    )
}
