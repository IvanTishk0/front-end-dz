import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout/Layout';
import { Input } from '../../components/UI/Input/Input';
import { Button } from "../../components/UI/Button/Button";
import { postFetch } from "../../utils/Fetch";
import { setCookie } from '../../utils/setCokies';
import Link from 'next/link';
import css from '../singIn/singIn.module.css';

const register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, [])
  function formHandler(e) {
    e.preventDefault();
    setLoading(true);
    postFetch("https://norma.nomoreparties.space/api/auth/register", {
      name,
      email,
      password,
    }).then(res => {
      setCookie("accessToken", res.accessToken, 1);
      setCookie("refreshToken", res.refreshToken);
      setLoading(false);
      router.push("/");
    });
  }

  return (
    <Layout title="Registration" onlyUnAuth>
      <form className={css.form} onSubmit={formHandler}>
        <fieldset className={css.form__input}>
          <legend>Create an account:</legend>
          <Input onChange={e => setName(e.target.value)} placeholder="Name" required type="name" value={name}>Name</Input>
          <Input onChange={e => setEmail(e.target.value)} placeholder="Mail" required type="email" value={email}>Email</Input>
          <Input onChange={e => setPassword(e.target.value)} placeholder="Password" reauired type="password" value={password}>Password</Input>
        </fieldset>
        <Link href="/singIn">Sing in</Link>
        <Button type = "submit" disabled = {isLoading}>
          {isLoading ? "..." : "Registration"}
        </Button>
      </form>
    </Layout>
  )
}

export default register