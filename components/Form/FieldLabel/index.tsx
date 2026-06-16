import { cn } from '@/lib/utils'
interface IProps {
   label: string
   isRequired?: boolean
   name: string
   className?: string
}

function FieldLabel(props: Readonly<IProps>) {
   const { label, isRequired = false, className } = props

   return (
      <div className={cn('flex ctm-label', className)}>
         {label}
         {isRequired && (
            <span data-requiredlabel={label} style={{ color: 'red' }}>
               *
            </span>
         )}
      </div>
   )
}

export default FieldLabel
