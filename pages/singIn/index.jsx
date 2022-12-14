import React from 'react'
import { Input } from '../../components/UI/Input/Input';
import {Button} from "../../components/UI/Button/Button";
import Link from 'next/link';
import css from './singIn.module.css';
import { postFetch } from "../../utils/Fetch";
import { useState } from 'react';
import { setCookie } from '../../utils/setCokies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '../../components/Layout/Layout';


const singIn = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, [])
  function formHandler(e) {
    e.preventDefault();
    setLoading(true);
    postFetch("https://norma.nomoreparties.space/api/auth/login", {
      email,
      password,
    }).then(res => {
      setLoading(false);
      setCookie("accessToken", res.accessToken, 1);
      setCookie("refreshToken", res.refreshToken);
      router.push("/");
    });
  }
  return (
    <Layout title="Sing in" onlyUnAuth>
      <form className={css.form} onSubmit={formHandler}>
        <fieldset className={css.form__input}>
          <legend>Sing in account:</legend>
          <Input onChange={e => setEmail(e.target.value)} placeholder="Mail" required type="email" value={email}>Email</Input>
          <Input onChange={e => setPassword(e.target.value)} placeholder="Password" reauired type="password" value={password}>Password</Input>
        </fieldset>
        <Link href="/register">Registration</Link>
        <Button type = "submit" disabled = {isLoading}>
          {isLoading ? "..." : "Sing-in"}
        </Button>
      </form>
    </Layout>
  )
}

export default singIn;