/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import NavigationMenuMain from './navigation-menu'
import UserButton from '@/app/features/auth/components/user-button'
import { SidebarTrigger } from './ui/sidebar'

interface MenuProps {
  clanName: string;
}

export const Menu = ({ clanName = "" }: MenuProps) => {
  return (
    <div>
      <div className="flex justify-between p-5 h-20 w-4/6 m-auto">
        <div>
          {/*  <NavigationMenuMain
            clanName={clanName}
          />  */}
          <SidebarTrigger />
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  )
}
