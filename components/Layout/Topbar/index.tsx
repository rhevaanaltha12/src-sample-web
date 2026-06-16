'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hook'
import { Bell, ChevronRight, LogOut, KeyRound } from 'lucide-react'
import { OverlayPanel } from 'primereact/overlaypanel'
import './styles.scss'

function Topbar() {
   const router = useRouter()
   const userMenuRef = useRef<OverlayPanel>(null)
   const { user } = useAppSelector((state) => state.authReducer)
   const { breadcrumb, pageTitle } = useAppSelector((state) => state.appReducer)
   const initials = user?.usrname
      ? user.usrname
           .split(' ')
           .map((w: string) => w[0])
           .join('')
           .substring(0, 2)
           .toUpperCase()
      : 'A'

   return (
      <header className="sticky top-0 z-20 flex h-18 shrink-0 items-center justify-between border-b border-c-neutral-30 bg-white/70 px-6 backdrop-blur-xl shadow-sm transition-all duration-300">
         {/* Left: Title + Breadcrumb */}
         <div className="flex flex-1 items-center gap-3 overflow-hidden">
            {pageTitle && <div className="h-7 w-0.75 shrink-0 rounded-full bg-linear-to-b from-c-primary-50 to-c-primary-70" />}
            <div className="flex flex-col justify-center gap-0.5 overflow-hidden min-w-0">
               {pageTitle && <h1 className="truncate text-[17px] font-bold text-c-neutral-90 tracking-tight">{pageTitle}</h1>}
               {breadcrumb?.length > 0 && (
                  <nav className="flex items-center gap-1.5 text-[11.5px] font-medium">
                     {breadcrumb.map((bc: any, i: number) => (
                        <span key={`${bc.label}-${i}`} className="flex items-center gap-1.5">
                           {i === breadcrumb.length - 1 ? (
                              <span className="font-semibold text-c-neutral-60">{bc.label}</span>
                           ) : (
                              <button className="transition-colors text-c-neutral-50 hover:text-c-primary-60" onClick={() => bc.url && router.push(bc.url)} type="button">
                                 {bc.label}
                              </button>
                           )}
                           {i < breadcrumb.length - 1 && <ChevronRight size={12} className="text-c-neutral-40" />}
                        </span>
                     ))}
                  </nav>
               )}
            </div>
         </div>

         {/* Right: Actions */}
         <div className="flex items-center gap-3 sm:gap-4">
            {/* Notification Bell */}
            <button className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-c-neutral-30 bg-white/50 shadow-sm transition-all text-c-neutral-60 hover:border-c-primary-30 hover:bg-white hover:text-c-primary-60 hover:shadow-md" title="Notifications" aria-label="Notifications">
               <Bell size={18} className="transition-transform group-hover:scale-110" />
               <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-c-destructive-60" />
            </button>

            {/* User Avatar */}
            <button className="flex items-center gap-3 rounded-full border border-c-neutral-30 bg-white/50 p-1 pr-4 shadow-sm transition-all hover:border-c-primary-30 hover:bg-white hover:shadow-md" onClick={(e) => userMenuRef.current?.toggle(e)} title="User menu">
               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-c-primary-50 to-c-primary-70 text-[11px] font-bold text-white shadow-inner">
                  {initials}
               </div>
               <div className="hidden text-left md:block">
                  <span className="block text-xs font-bold leading-none text-c-neutral-80">{user?.usrname ?? 'Admin'}</span>
                  <span className="mt-1 block text-[10px] font-medium leading-none text-c-neutral-50">Administrator</span>
               </div>
            </button>

            {/* User Dropdown */}
            <OverlayPanel ref={userMenuRef} className="userDropdown">
               <div className="flex items-center gap-3 bg-c-neutral-20/80 p-4 backdrop-blur-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-c-primary-50 to-c-primary-70 text-sm font-bold text-white shadow-md">
                     {initials}
                  </div>
                  <div>
                     <div className="text-sm font-bold text-c-neutral-90">{user?.usrname ?? 'Admin'}</div>
                     <div className="mt-0.5 text-xs font-medium text-c-neutral-60">{user?.usremail ?? ''}</div>
                  </div>
               </div>
               <div className="h-px w-full bg-c-neutral-30" />
               <div className="flex flex-col gap-1 p-2">
                   <button
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-c-neutral-70 hover:bg-c-neutral-20 hover:text-c-neutral-100"
                      onClick={() => {
                         userMenuRef.current?.hide()
                         router.push('/dashboard/change-password')
                      }}
                   >
                      <KeyRound size={16} /> Change Password
                   </button>
                   <button
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-c-destructive-60 hover:bg-c-destructive-10 hover:text-c-destructive-80"
                      onClick={() => {
                         userMenuRef.current?.hide()
                         router.push('/')
                      }}
                   >
                      <LogOut size={16} /> Logout
                   </button>
               </div>
            </OverlayPanel>
         </div>
      </header>
   )
}

export default Topbar
