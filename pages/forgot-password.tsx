import ForgotPasswordPage from '@/components/ui/layout/ForgotPassword'
import Head from 'next/head'
import React from 'react'

const ForgotPassword = () => {
  return (
    <>
        <div>
            <Head>
                <title>PlanPro | Forgot Password</title>
                <meta name="description" content="Login to your account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <ForgotPasswordPage />
            </main>
        </div>
    </>
  )
}

export default ForgotPassword
ForgotPassword.getLayout = (page: any) => page;