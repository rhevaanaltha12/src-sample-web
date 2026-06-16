'use client'

import { usePathname } from 'next/navigation'

function SubMenu(props: any) {
   const { label, handleClick, id, parentId, isActive, subMenu, acl, to } = props
   const pathname = usePathname()
   const hasLevel3 = subMenu?.length > 0
   const href = hasLevel3 ? '#' : (to || label)
   
   const isActiveHref = pathname === href

   return (
      <div className={`menuItemLvl_2 ${isActive ? 'active' : ''} ${isActiveHref ? 'active-href' : ''}`}>
         <a onClick={(e) => handleClick({ e, href, id, menuLevel: 2, parentId })} href={href} className={isActiveHref ? 'active-href' : ''}>
            {label}
         </a>

         {hasLevel3 && <div className="sidebarCaretDown"></div>}

         {subMenu.map((menuLvl2: any, i: number) => {
            return (
               <SubMenu
                  key={i}
                  to={menuLvl2.mn_link}
                  handleClick={handleClick}
                  subMenu={menuLvl2.sub_menu}
                  parentId={menuLvl2.mn_parentid}
                  id={menuLvl2.id}
                  isActive={menuLvl2.active}
                  label={menuLvl2.mn_name}
                  acl={menuLvl2.mn_acl}
               />
            )
         })}
      </div>
   )
}

export default SubMenu
