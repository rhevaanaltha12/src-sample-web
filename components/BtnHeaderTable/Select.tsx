import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'

function Select(props: any) {
   const { data, className } = props

   const [value, setValue] = useState<any>(null)
   const [options, setOptions] = useState<any>([])
   const handleChange = (e: any) => {
      setValue(e.value)
      data.onChange && data.onChange(e.value)
   }
   const selectedTemplate = (option: { value: string; label: string }) => {
      if (option) {
         return <>{option.label}</>
      }

      return <span>{data.placeholder}</span>
   }

   useEffect(() => {
      data.value && setValue(data.value)
      setOptions(data.options)
   }, [data])

   return (
      <Dropdown
         className={className}
         value={value}
         valueTemplate={selectedTemplate}
         options={options}
         // dropdownIcon=""
         onChange={(e) => handleChange(e)}
         placeholder={data?.placeholder ?? 'Select option'}
      />
   )
}

export default Select
