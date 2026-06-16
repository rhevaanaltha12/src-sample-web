import { handleFormFieldErrMsg } from '@/lib/form'
import { IField } from '@/lib/interfaces'
import { cn } from '@/lib/utils'
import { Dropdown } from 'primereact/dropdown'
import FieldErrMsg from '../FieldErrMsg'
import FieldLabel from '../FieldLabel'
import { Controller, useFormContext } from 'react-hook-form'

interface IProps extends IField {
   options: { label: string; value: string }[]
   onChange?: (val: any) => void
}

const FieldSelect = (props: IProps) => {
   const { label, name, className = '', showErrMsg = true, isRequired = false, placeholder = '', isDisabled, onChange } = props

   const {
      control,
      formState: { errors },
   } = useFormContext()

   return (
      <div className={cn(className, 'ctm-field')}>
         <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
               const errMsg: any = handleFormFieldErrMsg(errors, field.name)

               return (
                  <>
                     {label && (
                        <FieldLabel
                           className={cn(errors[name] && 'p-error')}
                           label={label}
                           isRequired={isRequired}
                           name={field.name}
                        />
                     )}

                     <Dropdown
                        id={field.name}
                        value={field.value ?? null}
                        options={props.options}
                        onChange={(e) => {
                           field.onChange(e.value)
                           onChange?.({ value: e.value })
                        }}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        className={cn('w-full', fieldState.error && 'p-invalid')}
                     />

                     {errMsg && showErrMsg && <FieldErrMsg msg={errMsg} />}
                  </>
               )
            }}
         />
      </div>
   )
}

export default FieldSelect
