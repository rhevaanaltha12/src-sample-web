import { Themes, Size, ButtonType, ButtonStyle } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button as PrimeBtn } from 'primereact/button'
import './styles.scss'

interface IProps {
   className?: string
   id?: any
   label?: string
   icon?: any
   iconRight?: boolean
   theme?: Themes
   size?: Size
   isBlock?: boolean
   isDisabled?: boolean
   isLoading?: boolean
   type?: ButtonType
   btnStyle?: ButtonStyle
   onClick?: any
   style?: React.CSSProperties
}

const Button = (props: IProps) => {
   const {
      className,
      id,
      label,
      icon,
      iconRight,
      theme = 'primary',
      size = 'sm',
      isBlock,
      isDisabled,
      isLoading,
      type = 'button',
      style,
      onClick,
      btnStyle = 'solid',
   } = props

   return (
      <PrimeBtn
         id={id}
         type={type}
         label={label}
         className={cn(
            'ctm-btn shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl',
            theme,
            size,
            isBlock ? 'block' : '',
            btnStyle,
            className
         )}
         disabled={isDisabled}
         loading={isLoading}
         onClick={onClick}
         icon={icon}
         iconPos={iconRight ? 'right' : 'left'}
         style={style}
      >
         {iconRight && icon}
      </PrimeBtn>
   )
}

export default Button
