export interface IField {
   label?: string
   name: string
   className?: string
   placeholder?: string
   isDisabled?: boolean
   isReadonly?: boolean
   showErrMsg?: boolean
   isRequired?: boolean
   minLength?: number
   maxLength?: number
}

export interface ISelectOpts {
   label: string
   value?: any
   items?: {
      label: string
      value: string
   }[]
}
export enum FETCH_METHOD {
   GET = 'GET',
   POST = 'POST',
}

export type AppName =
   | 'core-ims'
   | 'los-ims'
   | 'de-ims'
   | 'ua-ims'
   | 'parm-ims'
   | 'fraud-ims'
   | 'kaml-ims'
   | 'lms-ims'
   | 'form-ims'
   | 'derl-ims'
   | 'tableau-ims'
   | 'collection-ims'
   | 'poc-report-ims'
   | 'rpt-ims'

export interface RequestResponse {
   status: RequestStatus
   message?: string
   data?: any
}

export type ButtonHeaderType = 'CREATE' | 'EXCEL' | 'SELECT' | 'QUEUE_REPORT' | 'SHOW' | 'DOWNLOAD'

export type Themes =
   | 'info'
   | 'error'
   | 'primary'
   | 'danger'
   | 'dark'
   | 'success'
   | 'light'
   | 'secondary'
   | 'transparent'
   | 'warning'
   | 'normal'

export type Toast = Record<
   string,
   {
      severity: Themes
      summary: string
      detail: string
   }
>

export interface Page {
   title?: string
}

export enum REQ_STATUS {
   INVALID = 'Invalid',
   FULFILLED = 'fulfilled',
   REJECTED = 'rejected',
   ERROR = 'Error',
   SUCCESS = 'Success',
   LOADING = 'Loading',
}

export interface ObjApiResponse {
   data?: any
   message?: 'string'
   status: boolean | 'Error' | 'Success' | REQ_STATUS
}

export interface Api {
   name?: string
   method?: RequestMethod
   url: string
   body?: any
}

export interface IPreload {
   url: string
   name: string
   method?: FETCH_METHOD
   body?: any
   options?: Object
}

export interface RequestResponse {
   status: RequestStatus
   message?: string
   data?: any
}

export type RequestType = 'preload' | 'activate' | 'preform' | 'filter' | 'delete' | 'copy' | 'create' | 'detail' | 'others'
export type LogModuleType = 'TableReference' | 'ua'
export type NotifType = 'success' | 'error'
export type RequestMethod = 'GET' | 'POST'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'custom-back-btn'
export type ButtonStyle = 'solid' | 'link' | 'stroke' | 'text' | 'icon-only'
export type FormAction = 'CREATE' | 'EDIT'
export type ButtonType = 'button' | 'submit'
export type RequestStatus = 'fulfilled' | 'rejected' | 'Error' | 'Success' | 'Loading'
export interface RejectType {
   type?: RequestType
   status: RequestStatus
   message: string
}

export interface Field {
   label?: string
   name: string
   className?: string
   placeholder?: string
   isDisabled?: boolean
   isReadonly?: boolean
   showErrMsg?: boolean
   isRequired?: boolean
   readOnlyInput?: boolean
   minLength?: number
   maxLength?: number
}

export type DateFormat = 'YMD' | 'DMY' | 'DMYHIS' | 'My' | 'YMDHIS' | 'YMDHI' | 'MDY' | 'DMYHI'
export enum DATEFORMAT {
   'YMD' = 'YMD',
   'DMY' = 'DMY',
   'DMYHIS' = 'DMYHIS',
   'My' = 'My',
   'YMDHIS' = 'YMDHIS',
   'YMDHI' = 'YMDHI',
   'MDY' = 'MDY',
   'DMYHI' = 'DMYHI',
}

export interface Request {
   url: string
   method?: FETCH_METHOD
   body?: any
   options?: {
      delay?: number
      urlEncoded?: boolean
   }
}

export interface Breadcrumb {
   label: string
   url?: string
}

export interface PreRequest extends Request {
   name: string
}

export interface ISelectOpts {
   label: string
   value?: any
   items?: {
      label: string
      value: string
   }[]
}

export interface Notification {
   severity: NotifType
   summary?: string
   detail: string
   closeable?: boolean
   life?: number
}

export interface CookieConfig {
   domain: string
   http_only: boolean
   max_age: number
   name: string
   path: string
   secure: boolean
}
