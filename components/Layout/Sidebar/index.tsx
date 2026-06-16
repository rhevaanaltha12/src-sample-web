'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { setMenu, setActive } from '@/store/reducers/menuSlice'
import { setVisibleSidebar } from '@/store/reducers/sidebarSlice'
import { LayoutDashboard, ChevronsLeft, ChevronsRight } from 'lucide-react'
import MenuLevelOne from './MenuLevelOne'
import { DUMMY_MENUS } from './menuData'
import { ISidebarMenuClickArgs } from './type'
import './styles.scss'
import { useRouter } from 'next/navigation'

function Sidebar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const menus = useAppSelector((state) => state.menuReducer)
  const { visibleSidebar } = useAppSelector((state) => state.sidebarReducer)

  useEffect(() => {
    if (!menus.length) {
      dispatch(setMenu(DUMMY_MENUS))
    }
  }, [])

  const handleClick = ({ e, href, id, menuLevel, parentId }: ISidebarMenuClickArgs) => {
    e.preventDefault()
    if (href === '#') {
      dispatch(setActive({ id, menuLevel, parentId, isSidebarVisible: visibleSidebar }))
      return
    }
    router.push(href)
  }

  return (
    <div className={`sidebar ${visibleSidebar ? '' : 'collapsed'}`}>
        <div className="sidebarTop">
          <div className="sidebarBrand">
            <div className="brandIcon">
              <LayoutDashboard size={18} />
            </div>
            {visibleSidebar && <span className="brandName">MyApp</span>}
          </div>
          <button
            className="collapseBtn"
            onClick={() => dispatch(setVisibleSidebar(!visibleSidebar))}
          >
            {visibleSidebar ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
          </button>
        </div>

        <nav className="sidebarMain">
          {menus.map((menu: any) => (
            <MenuLevelOne
              key={menu.id}
              menu={menu}
              handleClick={handleClick}
              visibleSidebar={visibleSidebar}
            />
          ))}
        </nav>

        <div className="sidebarBottom">
          <div className="avatarCircle">A</div>
          {visibleSidebar && (
            <div className="userInfo">
              <div className="userName">Admin User</div>
              <div className="userRole">Administrator</div>
            </div>
          )}
        </div>
      </div>
  )
}

export default Sidebar
