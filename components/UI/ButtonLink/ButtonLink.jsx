import React from 'react'
import css from "./ButtonLink.module.css"
import Link from "next/link"
import {clx} from "../../../utils/clx"

export const ButtonLink = ({children, className, ...props}) => {
  return (
    <Link className={clx(className, css.link)} {...props}>{children}</Link>
  )
}
