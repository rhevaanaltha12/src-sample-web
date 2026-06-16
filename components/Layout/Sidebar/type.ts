export interface IMenuItem {
  id: string
  mn_name: string
  mn_link: string
  mn_icon: string
  mn_acl: string
  mn_parentid: string
  mn_order: string
  mn_source: string
  mn_source_react: string
  mn_breadcrumb: string
  child: IMenuItem[]
  active: boolean
}

export interface ISidebarMenuClickArgs {
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  href: string
  id: string
  menuLevel: number
  parentId: string
  source?: string
}

export interface IMenuLevelOneProps {
  menu: IMenuItem
  handleClick: (args: ISidebarMenuClickArgs) => void
  visibleSidebar: boolean
}

export interface ISubMenuProps {
  subMenu: IMenuItem[]
  handleClick: (args: ISidebarMenuClickArgs) => void
  className?: string
}
