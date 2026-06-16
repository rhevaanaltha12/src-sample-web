'use client'

import { Circle } from 'lucide-react'
import { ISubMenuProps } from './type'
import { usePathname } from 'next/navigation'

function SubMenu({ subMenu, handleClick, className }: ISubMenuProps) {
   const pathname = usePathname()

   return (
      <div className={`subMenuContainer ${className ?? ''}`}>
         {subMenu.map((item) => (
            <div key={item.id} className={`subMenuItem ${pathname === item.mn_link ? 'active-href' : ''}`}>
               <a
                  href={item.mn_link}
                  onClick={(e) => handleClick({ e, href: item.mn_link, id: item.id, menuLevel: 2, parentId: item.mn_parentid })}
               >
                  <Circle size={6} className="subDot" />
                  <span className="menuLabel">{item.mn_name}</span>
               </a>
            </div>
         ))}
      </div>
   )
}

export default SubMenu
