import RegisterPage from '@/components/ui/layout/SignUpForm'
import Head from 'next/head'
import React from 'react'

const register = () => {
    return (
        <>
            <div>
                <Head>
                    <title>PlanPro | Register</title>
                    <meta name="description" content="Login to your account" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <RegisterPage />
                </main>
            </div>
        </>
      )
}

export default register
register.getLayout = (page: React.ReactElement) => page;