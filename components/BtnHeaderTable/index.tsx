import { BTN_HEADER_TYPE } from '@/lib/types'
import Select from './Select'
import { InputSwitch } from 'primereact/inputswitch'
import React from 'react'
import Button from '../Button'
import { Plus, Eye, FileSpreadsheet, Download, UploadCloud, Upload, FileDown, ThumbsUp, ThumbsDown } from 'lucide-react'

export interface IBtnHeader {
   type: BTN_HEADER_TYPE
   onClick?: () => any
   value?: any
   options?: any[]
   placeholder?: string
   onChange?: any
   switchState?: boolean
   switchCaption?: string
   title?: string
   icon?: React.ReactNode | string
   theme?: any
   selectedCell?: any
   iconType?: any
   btnStyle?: any
   isLoading?: boolean
   isDisabled?: boolean
}

interface IProps {
   buttons: IBtnHeader[]
}

function BtnHeaderTable(props: IProps) {
   const { buttons } = props

   const checkBtn = (type: BTN_HEADER_TYPE) => {
      return buttons.find((button) => button.type === type)
   }

   const undefinedAction = () => {
      console.log('Action not set')
   }

   const handleRenderButton = (param: IBtnHeader) => {
      if (param?.type === BTN_HEADER_TYPE.SELECT) {
         return <Select className="dataTableFilter" data={checkBtn(BTN_HEADER_TYPE.SELECT)} />
      } else if (param?.type === BTN_HEADER_TYPE.CREATE) {
         return (
            <Button
               icon={param?.icon ?? <Plus size={16} />}
               label={param?.title ?? 'Create'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type == BTN_HEADER_TYPE.SHOW) {
         return (
            <Button
               isDisabled={param?.selectedCell?.length == 0}
               icon={param?.icon ?? <Eye size={16} />}
               label={param?.title ?? `View Comparation ${param?.title != '' ? `(${param?.title})` : ''}`}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.EXCEL) {
         return (
            <Button
               icon={param?.icon ?? <FileSpreadsheet size={16} />}
               label={param?.title ?? 'Excel'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.DOWNLOAD) {
         return (
            <Button
               icon={param?.icon ?? <Download size={16} />}
               label={param?.title ?? 'Download'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.NEW_UPLOAD) {
         return (
            <Button
               icon={param?.icon ?? <UploadCloud size={16} />}
               label={param?.title ?? 'New Upload'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.UPLOAD_PMML) {
         return (
            <Button
               icon={param?.icon ?? <Upload size={16} />}
               label={param?.title ?? 'Upload PMML'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.IMPORT) {
         return (
            <Button
               icon={param?.icon ?? <Upload size={16} />}
               label={param?.title ?? 'Import'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'normal'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'stroke'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.DOWNLOAD_EXCEL) {
         return (
            <Button
               icon={param?.icon ?? <FileDown size={16} />}
               label={param?.title ?? 'Download Excel'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.SWITCH) {
         return (
            <div className="switchTableHeader mb--2 flex items-center gap-2">
               <span className="text-sm font-medium">{param?.switchCaption}</span>
               <InputSwitch checked={param?.switchState ?? false} onChange={param?.onClick} />
            </div>
         )
      } else if (param?.type === BTN_HEADER_TYPE.BULK_APPROVE) {
         return (
            <Button
               icon={param?.icon ?? <ThumbsUp size={16} />}
               label={param?.title ?? 'Approve Multiple'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.BULK_DECLINE) {
         return (
            <Button
               icon={param?.icon ?? <ThumbsDown size={16} />}
               label={param?.title ?? 'Decline Multiple'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="xs"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      } else if (param?.type === BTN_HEADER_TYPE.EXPORT) {
         return (
            <Button
               icon={param?.icon ?? <Download size={16} />}
               label={param?.title ?? 'Export'}
               onClick={param?.onClick ?? undefinedAction}
               theme={param?.theme ?? 'primary'}
               size="sm"
               btnStyle={param?.btnStyle ?? 'solid'}
               isLoading={param?.isLoading ?? false}
               isDisabled={param?.isDisabled ?? false}
            />
         )
      }
   }

   return (
      <div className="flex flex-wrap items-center gap-2">
         {buttons?.map((btn: any) => (
            <React.Fragment key={btn?.type}>{handleRenderButton(btn)}</React.Fragment>
         ))}
      </div>
   )
}

export default BtnHeaderTable
