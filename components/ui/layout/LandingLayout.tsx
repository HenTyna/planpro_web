import Head from "next/head";

function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Smarter PSM | Home</title>
                <link href="favicon.png" rel="shortcut icon" type="image/png" />
            </Head>
            <div >
                {children}
            </div>
        </>
    );
}

export default LandingLayout;