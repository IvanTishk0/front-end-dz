import React from 'react'
import css from "./Button.module.css"
import {clx} from '../../../utils/clx'

export const Button = ({children, className, ...props}) => {
  return (
    <button className={clx(className, css.button)} {...props}>{children}</button>
  )
}
