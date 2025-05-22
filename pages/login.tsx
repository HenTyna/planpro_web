import LoginForm from '@/components/ui/layout/LoginForm'
import Head from 'next/head'
import React from 'react'

const Login = () => {
  return (
    <>
        <div>
            <Head>
                <title>Smarter PMS | Login</title>
                <meta name="description" content="Login to your account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <LoginForm />
            </main>
        </div>
    </>
  )
}

export default Login;
Login.getLayout = (page: any) => page;