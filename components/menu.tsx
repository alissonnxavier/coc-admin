import React from 'react'
import NavigationMenuMain from './navigation-menu'
import UserButton from '@/app/features/auth/components/user-button'

interface MenuProps {
    clanName: string;
    clanDescription: string;
}

export const Menu = ({ clanName, clanDescription }: MenuProps) => {
  return (
    <div>
         <div className="flex justify-between p-5 h-20 w-4/6 m-auto">
        <div>
          <NavigationMenuMain
            clanName={clanName}
            clanDescription={clanDescription}
          />
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  )
}
