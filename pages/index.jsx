import React from 'react'
import css from "./index.module.css"
import { Layout } from '../components/Layout/Layout'
import { Nav } from '../components/Header/Nav/Nav'
import { Button } from '../components/UI/Button/Button'
import { Card } from '../components/Cards/Card'
import { cardsMock } from '../constants/mock'
import { resourceUsage } from 'process'

const IndexPage = ({data}) => {
  return (
    <Layout title="Главная страница">
        <header>
            <Nav />
        </header>
        <main>
            <div className={css.main__header}>
                <h1 className={css.main__title}>Enter the Blog</h1>
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
    const result = await fetch("https://leti.kzteams.ru/api/blog/page").then(res => {
        if(res.ok) return res.json();
        else throw Error(res.statusText);
    }).catch(err => console.error(err));
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