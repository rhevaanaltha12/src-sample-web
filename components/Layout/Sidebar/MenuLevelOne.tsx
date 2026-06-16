'use client'

import * as Icons from 'lucide-react'
import { ChevronDown, ChevronUp, Circle } from 'lucide-react'
import SubMenu from './SubMenu'
import { IMenuLevelOneProps } from './type'
import { usePathname } from 'next/navigation'

function MenuLevelOne({ menu, handleClick, visibleSidebar }: IMenuLevelOneProps) {
   const pathname = usePathname()
   const hasChild = menu.child.length > 0
   const href = hasChild ? '#' : menu.mn_link
   
   // Check if active URL
   const isActiveHref = pathname === href || (hasChild && menu.mn_link !== '#' && pathname.startsWith(menu.mn_link))
   
   const IconComponent = (Icons as any)[menu.mn_icon] ?? Circle

   const innerContent = (
      <>
         <div className="menuIconWrap">
            <IconComponent size={17} />
         </div>
         {visibleSidebar && (
            <>
               <span className="menuLabel">{menu.mn_name}</span>
               {hasChild &&
                  (menu.active ? (
                     <ChevronUp size={13} className="chevronIcon" />
                  ) : (
                     <ChevronDown size={13} className="chevronIcon" />
                  ))}
            </>
         )}
      </>
   )

   return (
      <div className={`mainMenuItem ${menu.active ? 'active' : ''}`}>
         {hasChild ? (
            <button
               title={menu.mn_name}
               className={isActiveHref ? 'active-href' : ''}
               onClick={(e) => handleClick({ e, href, id: menu.id, menuLevel: 1, parentId: menu.mn_parentid })}
            >
               {innerContent}
            </button>
         ) : (
            <a
               href={href}
               title={menu.mn_name}
               className={isActiveHref ? 'active-href' : ''}
               onClick={(e) => handleClick({ e, href, id: menu.id, menuLevel: 1, parentId: menu.mn_parentid })}
            >
               {innerContent}
            </a>
         )}

         {menu.active && visibleSidebar && hasChild && (
            <SubMenu subMenu={menu.child} handleClick={handleClick} className="level2" />
         )}
      </div>
   )
}

export default MenuLevelOne
