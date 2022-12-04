import React from 'react'
import { ButtonLink } from '../../UI/ButtonLink/ButtonLink'
import css from "./Nav.module.css"

export const Nav = () => {
  return (
    <nav className={css.nav}>
        <h1 className={css.nav__logo}>My_Blog</h1>
        <ul className={css.nav__list}>
            <li>
                <ButtonLink href ="/profile">Профиль</ButtonLink>
            </li>
            <li>
                <ButtonLink href ="/sing-in">Вход</ButtonLink>
            </li>
            <li>
                <ButtonLink href ="/contacts">Контакты</ButtonLink>
            </li>
            <li>
                <ButtonLink href ="/about">О нас</ButtonLink>
            </li>
        </ul>
    </nav>
  )
}
