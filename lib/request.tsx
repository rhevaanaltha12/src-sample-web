import { RequestResponse } from './interfaces'

export const reqIsSuccess = (reqResult: any) => {
   if (!reqResult) {
      console.error('reqIsSuccess() cant take falsy arg')
      return
   }

   return (
      reqResult?.success === true ||
      reqResult.status === true ||
      reqResult?.success === 'Success' ||
      reqResult.status === 'Success' ||
      reqResult.status === 'Validate' ||
      reqResult.status == 'Valid' ||
      reqResult.status === 'Processed' ||
      reqResult.authenticated
   )
}

export const getReqErrMsg = (req: any, defaultMsg: string) => {
   return req?.data?.message ?? req?.message ?? defaultMsg
}

export const handlePost = async (url: string, body: any, options: { urlEncoded?: boolean; delay?: number } = {}) => {
   const { urlEncoded = false, delay }: any = options

   const bodyIsFormData = body instanceof FormData
   let reqBody = body
   let headers = {}

   if (urlEncoded) {
      reqBody = createUrlParam(body)

      headers = {
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
         Accept: 'application/json',
      }
   } else {
      if (!bodyIsFormData) {
         reqBody = JSON.stringify(body)
         headers = {
            'Content-Type': 'application/json',
         }
      }
   }

   const opts = {
      method: 'POST',
      headers,
      ...(body && { body: reqBody }),
   }

   try {
      const req: any = await fetch(url, opts)
      const result = await req.json()

      if (result?.authenticated === false) {
         console.error('Request is not authenticated !')
         return
      }

      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}

export const handleGet = async (url: string, options = {}) => {
   const { delay, signal }: { signal?: AbortSignal; delay?: number } = options

   try {
      const req: any = await fetch(url, { signal })
      const result = await req.json()

      if (result?.authenticated === false) {
         alert('Your session is over please re-login')

         console.error('Request is not authenticated !')
         return
      }

      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}

export const handleDelete = async (url: string, options = {}) => {
   const { delay }: { delay?: number } = options

   try {
      const req: any = await fetch(url, { method: 'DELETE' })
      const result = await req.json()

      if (result?.authenticated === false) {
         alert('Your session is over please re-login')

         console.error('Request is not authenticated !')
         return
      }

      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}

export const handlePut = async (url: string, body: any, options: { urlEncoded?: boolean; delay?: number } = {}) => {
   const { urlEncoded = false, delay }: any = options

   const bodyIsFormData = body instanceof FormData
   let reqBody = body
   let headers = {}

   if (urlEncoded) {
      reqBody = createUrlParam(body)

      headers = {
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
         Accept: 'application/json',
      }
   } else {
      if (!bodyIsFormData) {
         reqBody = JSON.stringify(body)
         headers = {
            'Content-Type': 'application/json',
         }
      }
   }

   const opts = {
      method: 'PUT',
      headers,
      ...(body && { body: reqBody }),
   }

   try {
      const req: any = await fetch(url, opts)
      const result = await req.json()

      if (result?.authenticated === false) {
         console.error('Request is not authenticated !')
         return
      }

      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}

export const handleMultiReqs = async (requests: any, options: any = {}): Promise<RequestResponse> => {
   const { delay } = options
   const requestQueue: any = []

   try {
      for (let i = 0; i < requests?.length; i++) {
         const row = requests[i]
         requestQueue.push(row?.method === 'POST' ? handlePost(row.url, row.body, row.options) : handleGet(row.url))
      }

      const result: RequestResponse = await Promise.all(requestQueue).then((values) => {
         let result: any = {}
         values.forEach((v, i) => {
            result[requests?.[i]?.name] = v
         })

         return {
            status: 'Success',
            data: result,
         }
      })
      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}

export const createUrlParam = (obj: any) => {
   return Object.keys(obj)
      .map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(obj[item])}`)
      .join('&')
}

export const multiReqIsSuccess = (reqs: Record<string, any> = {}) => {
   let result = true

   if (!reqs) return

   Object.keys(reqs).forEach((req: any) => {
      if (!reqIsSuccess(reqs[req])) {
         result = false
      }
   })

   return result
}

export const handleGetXml = async (url: string, options = {}) => {
   const { delay }: { delay?: number } = options

   try {
      const req = await fetch(url)
      const result = await req.text()

      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}

export const handleGetZip = async (url: string, options = {}) => {
   const { delay }: { delay?: number } = options

   try {
      const req = await fetch(url)
      const result = await req.blob()

      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}

export const handlePostTableau = async (url: string, body: any, options: { urlEncoded?: boolean; delay?: number } = {}) => {
   const { urlEncoded = false, delay }: any = options

   const bodyIsFormData = body instanceof FormData
   let reqBody = body
   let headers = {}

   if (urlEncoded) {
      reqBody = createUrlParam(body)

      headers = {
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
         Accept: 'text/plain',
      }
   } else {
      if (!bodyIsFormData) {
         reqBody = JSON.stringify(body)
         headers = {
            'Content-Type': 'text/plain',
         }
      }
   }

   const opts = {
      method: 'POST',
      headers,
      ...(body && { body: reqBody }),
   }

   try {
      const req: any = await fetch(url, opts)
      const result = await req.text()

      if (result?.authenticated === false) {
         console.error('Request is not authenticated !')
         return
      }

      return delay ? new Promise((resolve) => setTimeout(() => resolve(result), delay)) : result
   } catch (e: any) {
      return {
         status: 'Error',
         message: e?.message ?? 'Something went wrong',
      }
   }
}
