import React from 'react'
import RowBadge from '../RowBadge'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import './styles.scss'

export interface IProps {
   title: string
   icon?: string
   description?: string
   breadcrumb?: any[]
   onClick?: any
   version?: string
   styles?: 'wrap-green' | 'wrap-red' | 'wrap-yellow' | 'wrap-grey' | 'wrap-blue' | 'wrap-purple'
   template?: any
   action?: React.ReactNode
   showArrowBack?: boolean
}

function PageHeader(props: IProps) {
   const { showArrowBack = true, title, description, onClick, version = '', styles = 'wrap-blue', template, action } = props
   const router = useRouter()

   const onBack = () => {
      router.back()
   }

   return (
      <div className="pageHeader">
         <div className="headerWrapper">
            {showArrowBack && (
               <button className="btnBack" onClick={onClick ?? onBack} type="button">
                  <ArrowLeft size={18} />
               </button>
            )}
            <div className="headerContent">
               {title && <div className="title">{title}</div>}
               {description && <div className="description">{description}</div>}
            </div>
         </div>
         <div className="headerActions">
            {version && version !== '' && <RowBadge status={version} type={styles} className="headerBadge" />}
            {action}
            {template}
         </div>
      </div>
   )
}

export default PageHeader
