
import React from 'react'
import UserButton from '@/app/features/auth/components/user-button'
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from './ui/button';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';


export const Menu = () => {
  const {
    toggleSidebar,
    open,
  } = useSidebar();

  return (
    <div>
      <div className="flex justify-between p-5 h-20 w-4/6 m-auto">
        <div className='pl-10'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => { toggleSidebar() }}
            className='transition-all'
          >
            {!open ? <PanelLeftOpen /> : <PanelRightOpen />}
          </Button>
        </div>
        <div className='pr-10'>
          <UserButton />
        </div>
      </div>
    </div>
  )
}
