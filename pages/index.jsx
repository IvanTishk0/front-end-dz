import React from 'react'
import css from "./index.module.css"
import { Layout } from '../components/Layout/Layout'
import { Nav } from '../components/Header/Nav/Nav'
import { Button } from '../components/UI/Button/Button'
import { Card } from '../components/Cards/Card'
import { cardsMock } from '../constants/mock'
import { resourceUsage } from 'process'
import { useEffect } from 'react'
import { getFetch, postFetch } from '../utils/Fetch'
import { getCookie } from '../utils/setCokies'
import { setCookie } from '../utils/setCokies'
import { useState } from 'react'

const IndexPage = ({data}) => {
  const [userInfo, setUserInfo] = useState({email: "", name: ""});

  useEffect(() => {
    const sendUser = () => {
        getFetch("https://norma.nomoreparties.space/api/auth/user", getCookie("accessToken")).then(res => {
                setUserInfo({email: res.user.email, name: res.user.name});
                console.log(res);
            })
      }
    if (getCookie("refreshToken")) {
        if (!getCookie("accessToken")){
            postFetch("https://norma.nomoreparties.space/api/auth/token", {token: getCookie("refreshToken")}).then((res) => {
                setCookie("accessToken", res.accessToken, 1);
                setCookie("refreshToken", res.refreshToken);
                sendUser();
            })
            return;
        }
        sendUser();
    }
  }, [])
  return (
    <Layout title="Главная страница">
        <header>
            <Nav />
        </header>
        <main>
            <div className={css.main__header}>
                <h1 className={css.main__title}>Enter the Blog</h1>
                <div className={css.main__info}>
                    <span className={css.main__logo}>{userInfo.email}</span>
                    <span className={css.main__logo}>{userInfo.name}</span>
                </div>
                <p className={css.main__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                <Button>Read more</Button>
            </div>
        </main>
        <section className={css.cards}>
              {data.map((card, i) => (
                <Card key={i} id = {i}{...card} />
              )
              )}
        </section>
    </Layout>
  )
}

export async function getStaticProps(context) {
    let result = await fetch("https://leti.kzteams.ru/api/blog/page").then(res => {
        if(res.ok) return res.json();
        else throw Error(res.statusText);
    }).catch(err => console.error(err));

    result = result.map(a => ({ ...a, data: ""}));
    if (!Array.isArray(result)){
        return {
            props: {
                data: [],
            },
            revalidate: 100,
        };
    }
    return {
        props: {
            data: [...result],
        },
        revalidate: 100,
    };
}
export default IndexPage;