'use client'
import React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle, Info, RotateCcw, Copy } from 'lucide-react'
import { confirmDialog as Dialog } from 'primereact/confirmdialog'
import { MESSAGES } from '@/lib/messages'
import { notificationToast } from '@/components/Toast'

const TITLES = {
   TOAST_ROLLBACK: 'Rollback',
   ROLLBACK_FAILED: 'Rollback Failed',
   ROLLBACK_SUCCESS: 'Rollback Success',
   COPY: 'Copy Data',
}

const confirmLabel = (label: string) => (label ? ` "${label}"` : '')

const THEME_ICON: Record<string, React.ReactNode> = {
   danger: <AlertCircle size={48} />,
   warning: <AlertTriangle size={48} />,
   success: <CheckCircle size={48} />,
   info: <Info size={48} />,
}

interface IDialog {
   theme: 'success' | 'danger' | 'warning' | 'info'
   icon?: React.ReactNode
   title?: string
   message?: any
   accept?: any
   reject?: any
   footer?: any
   rejectLabel?: any
   acceptLabel?: any
   rejectClassName?: any
   acceptClassName?: any
}

interface IConfirm {
   toast: any
   label?: string
   method: any
   direct?: any
   message?: any
   summarySuccess?: any
   detailSuccess?: any
}

export const confirmDialog = (props: IDialog) => {
   const {
      theme,
      icon,
      title,
      message,
      accept,
      reject,
      footer = null,
      rejectLabel,
      acceptLabel,
      rejectClassName,
      acceptClassName,
   } = props
   return Dialog({
      className: theme,
      message: (
         <>
            <div className="iconWrapper">
               {icon ?? THEME_ICON[theme]}
            </div>
            {title && <div className="title">{title}</div>}
            {message && <div className="description">{message}</div>}
         </>
      ),
      defaultFocus: 'accept',
      rejectLabel,
      acceptLabel,
      rejectClassName,
      acceptClassName,
      accept,
      reject,
      footer: footer,
   })
}

export const confirmDelete = (options: IConfirm) => {
   const { label = '', method, toast, direct, message, summarySuccess, detailSuccess } = options

   confirmDialog({
      theme: 'danger',
      title: `Delete${confirmLabel(label)}?`,
      message: message ?? MESSAGES.CONFIRM_DELETE_NEW,
      acceptLabel: 'Delete',
      acceptClassName: 'p-button-danger',
      rejectLabel: 'Cancel',
      accept: async () => {
         notificationToast({
            toast,
            severity: 'info',
            summary: 'Deleting Data',
            closable: false,
            sticky: true,
            detail: MESSAGES.DELETING + confirmLabel(label) + '...',
         })

         const reqDelete = await method()
         toast?.clear()
         if (reqDelete?.error) {
            setTimeout(() => {
               notificationToast({
                  toast,
                  severity: 'error',
                  summary: 'Failed to Delete',
                  detail:
                     typeof reqDelete?.payload === 'string'
                        ? reqDelete.payload
                        : reqDelete?.payload?.message || MESSAGES.DELETE_ERROR,
                  life: 5000,
               })
            }, 800)
            return
         }
         setTimeout(() => {
            notificationToast({
               toast,
               severity: 'success',
               summary: summarySuccess ?? 'Data Deleted',
               detail: detailSuccess ?? (
                  <div>
                     <span style={{ fontWeight: 600 }}>{label}</span> has been deleted
                  </div>
               ),
            })
            if (direct) direct()
         }, 500)
      },
   })
}

export const confirmRollback = (options: IConfirm) => {
   const { label = '', method, toast, direct, message } = options

   confirmDialog({
      theme: 'success',
      icon: <RotateCcw size={48} />,
      title: 'Rollback',
      message: message ?? MESSAGES.CONFIRM_ROLLBACK,
      acceptClassName: 'p-button-success',
      accept: async () => {
         notificationToast({
            toast,
            severity: 'info',
            summary: TITLES.TOAST_ROLLBACK,
            closable: false,
            sticky: true,
            detail: MESSAGES.ROLLBACK_PROGRESS,
         })

         const req = await method()
         toast?.clear()

         if (req?.error) {
            setTimeout(() => {
               notificationToast({
                  toast,
                  severity: 'error',
                  summary: TITLES.ROLLBACK_FAILED,
                  detail: typeof req?.payload === 'string' ? req.payload : req?.payload?.message || MESSAGES.ROLLBACK_ERROR,
                  life: 5000,
               })
            }, 800)
            return
         }
         setTimeout(() => {
            notificationToast({
               toast,
               severity: 'success',
               summary: TITLES.ROLLBACK_SUCCESS,
               detail: (
                  <div>
                     Rolled back to version <span style={{ fontWeight: 600 }}>{label}</span>
                  </div>
               ),
            })
            if (direct) direct()
         }, 500)
      },
   })
}

export const confirmCopy = (options: IConfirm) => {
   const { label = '', method, toast, direct, message } = options

   confirmDialog({
      theme: 'warning',
      icon: <Copy size={48} />,
      title: TITLES.COPY,
      message: message ?? MESSAGES.COPY_CONFIRM + confirmLabel(label),
      accept: async () => {
         notificationToast({
            toast,
            severity: 'info',
            summary: TITLES.COPY,
            closable: false,
            sticky: true,
            detail: MESSAGES.COPY_LOADING + confirmLabel(label) + `...`,
         })

         const req = await method()
         toast?.clear()
         if (req?.error) {
            setTimeout(() => {
               notificationToast({
                  toast,
                  severity: 'error',
                  summary: TITLES.COPY,
                  detail: typeof req?.payload === 'string' ? req.payload : req?.payload?.message || MESSAGES.COPY_ERROR,
                  life: 5000,
               })
            }, 800)
            return
         }

         setTimeout(() => {
            notificationToast({
               toast,
               severity: 'success',
               summary: TITLES.COPY,
               detail: MESSAGES.COPY_SUCCESS,
            })
            if (direct) direct()
         }, 800)
      },
   })
}
