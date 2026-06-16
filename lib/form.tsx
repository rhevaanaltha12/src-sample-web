export const handleFormFieldErrMsg = (errors: any, fieldName: string) => {
   let result = ''
   result = errors?.[fieldName]?.message

   let altErr: any = ''

   const arrFieldName = fieldName.split('.')
   if (arrFieldName.length > 1) {
      arrFieldName.forEach((str: any) => {
         const key = Number.isNaN(str) ? str : Number.parseInt(str)
         altErr = altErr ? altErr[key] : errors[key]
      })
   }

   if (altErr) {
      result = altErr.message
   }

   return result
}
