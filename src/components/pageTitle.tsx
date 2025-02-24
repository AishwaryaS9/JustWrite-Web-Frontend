import Head from 'next/head'
import React from 'react'

const PageTitle = () => {
    return (
        <>
            <Head>
                <title>JustWrite</title>
                <meta property="og:title" content="JustWrite" key="title" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}

export default PageTitle