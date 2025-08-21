import { FC } from "react"

interface Props extends Omit<React.ComponentProps<'input'>,'onChange'> {
  isSubmitting:boolean,
  onChange:(value:string) => void
}

export const Input:FC<Props> = ({isSubmitting,onChange,...props}) => {
  return(
    <input
      {...props}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-xl p-4 w-full"
      readOnly={isSubmitting}
    />
  )
}