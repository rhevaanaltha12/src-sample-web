import { CheckCircle, XCircle, AlertTriangle, Info, HelpCircle } from 'lucide-react'
import React, { ReactNode } from 'react'

export type ToastSeverity = 'success' | 'info' | 'error' | 'warning' | 'question'

export interface IToast {
   toast: any // Consider typing this to Toast from primereact/toast if possible
   severity: ToastSeverity
   summary?: ReactNode
   detail?: ReactNode
   life?: number
   sticky?: boolean
   closable?: boolean
}

// Map logical severity to PrimeReact's native severity (PrimeReact toast only supports 'success', 'info', 'warn', 'error')
const SEVERITY_MAP: Record<ToastSeverity, 'success' | 'info' | 'error' | 'warn'> = {
   success: 'success',
   error: 'error',
   warning: 'warn', // Natively, prime uses 'warn', but our typings use 'warning'
   info: 'info',
   question: 'info', // Map question to info visually
}

// Map severity to Lucide icons
const ICON_MAP: Record<ToastSeverity, ReactNode> = {
   success: <CheckCircle className="w-5 h-5" />,
   error: <XCircle className="w-5 h-5" />,
   warning: <AlertTriangle className="w-5 h-5" />,
   info: <Info className="w-5 h-5" />,
   question: <HelpCircle className="w-5 h-5" />,
}

const getSummary = (summary: ReactNode, severity: ToastSeverity) => {
   if (summary) return summary
   return severity.charAt(0).toUpperCase() + severity.slice(1)
}

export const notificationToast = ({ toast, severity, summary, detail, life = 3000, sticky = false, closable = true }: IToast) => {
   toast?.clear?.()
   toast?.show?.({
      severity: SEVERITY_MAP[severity],
      summary: getSummary(summary, severity),
      detail: detail ?? null,
      icon: ICON_MAP[severity],
      life,
      sticky,
      closable,
   })
}

const showToast = (toast: any, severity: ToastSeverity, summary: ReactNode, detail: ReactNode) => {
   notificationToast({ toast, severity, summary, detail })
}

export const successToast = (toast: any, summary: string, message: string) => showToast(toast, 'success', summary, message)
export const errorToast = (toast: any, summary: string, message: string) => showToast(toast, 'error', summary, message)
export const infoToast = (toast: any, summary: string, message: string) => showToast(toast, 'info', summary, message)
export const warningToast = (toast: any, summary: string, message: string) => showToast(toast, 'warning', summary, message)
export const questionToast = (toast: any, summary: string, message: string) => showToast(toast, 'question', summary, message)
