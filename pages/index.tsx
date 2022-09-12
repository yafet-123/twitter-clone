import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import { GetServerSideProps } from 'next'
import {fetchTweets} from '../utils/fetchTweets'
import { Tweet } from '../typing'
interface tweetsProps{
    tweets:Tweet[]
}
import Toaster from 'react-hot-toast'

const Home = ({tweets}: tweetsProps) => {
    // 1, we do max-h-screen overflow-hideen is to set all the component height:100% and only the feed 
    // incease in content it will scrollable not sidebar and widgets the same true for widgets
    // 2, grid-cols-9 set the all column to 9 and sidebar have 2 , feed have 5 and widgets have 2
    return (
        <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
            <Head>
                <title>Twitter</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Toaster />
            <main className="grid grid-cols-9">
                <Sidebar />
                <Feed tweets={tweets}/>
                <Widgets />
            </main>
        </div>
    )
}

export default Home
export const getServerSideProps: GetServerSideProps = async (context) => {
    const tweets = await fetchTweets()    
    return {
        props: {
            tweets:tweets,
        }, // will be passed to the page component as props
    }
}
