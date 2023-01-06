import React from 'react'
import Head from 'next/head'
import { getCookie } from '../../utils/setCokies'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

export const Layout = ({children, title, onlyUnAuth }) => {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    if (onlyUnAuth && getCookie("refreshToken")) {
      router.push("/").then(() => {
        setChecked(true);
      });
     } else {
      setChecked(true);
     }
  }, []);
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        {isChecked && children}
    </>
  )
}
