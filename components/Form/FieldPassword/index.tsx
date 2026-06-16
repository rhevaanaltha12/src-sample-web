import FieldLabel from '../FieldLabel'
import { classNames } from 'primereact/utils'
import { useFormContext, Controller } from 'react-hook-form'
import { Password } from 'primereact/password'
import FieldErrMsg from '../FieldErrMsg'
import { IField } from '@/lib/interfaces'

interface IProps extends IField {
   toggleMask?: boolean
   feedback?: boolean
}

function FieldPassword(props: Readonly<IProps>) {
   const {
      label,
      name,
      className = '',
      showErrMsg = true,
      isRequired = false,
      placeholder = '',
      toggleMask = true,
      feedback = false,
      isReadonly = false,
      isDisabled,
   } = props

   const {
      control,
      formState: { errors },
   } = useFormContext()

   return (
      <div className={`${className} ctm-field`}>
         <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
               const errMsg = (errors?.[field.name]?.message || '') as string
               const hasError = fieldState?.error || errMsg

               return (
                  <>
                     {label && (
                        <FieldLabel
                           className={classNames({ 'p-error': hasError })}
                           label={label}
                           isRequired={isRequired}
                           name={field.name}
                        />
                     )}

                     <Password
                        id={field.name}
                        {...field}
                        disabled={isReadonly || isDisabled}
                        toggleMask={toggleMask}
                        feedback={feedback}
                        value={field.value ?? ''}
                        invalid={!!hasError}
                        placeholder={placeholder}
                     />

                     {hasError && showErrMsg && <FieldErrMsg msg={errMsg} />}
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldPassword
