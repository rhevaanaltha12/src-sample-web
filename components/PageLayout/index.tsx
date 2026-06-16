'use client'
import { Breadcrumb } from '@/lib/interfaces'
import { useAppDispatch } from '@/store/hook'
import { useEffect } from 'react'
import './styles.scss'
import { setApp } from '@/store/reducers/appSlice'

export interface IPageLayout {
   breadcrumbs?: Breadcrumb[]
   pageTitle?: string
   children?: any
   title?: string
}

function PageLayout(props: IPageLayout) {
   const { breadcrumbs, pageTitle, children, title } = props
   const dispatch = useAppDispatch()

   useEffect(() => {
      console.log('breadcrumbs', breadcrumbs)
      console.log('pageTitle', pageTitle)
      dispatch(setApp({ breadcrumb: breadcrumbs ?? [], pageTitle: pageTitle }))
   }, [breadcrumbs, pageTitle])

   useEffect(() => {
      const displayTitle = title ?? pageTitle
      if (displayTitle) {
         document.title = `${displayTitle} | Sample Web`
      }
   }, [title, pageTitle])

   return <div className="slideIn">{children}</div>
}

export default PageLayout
