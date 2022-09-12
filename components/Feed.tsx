import {
	ArrowPathIcon
} from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'
import { Tweet } from '../typing'
import TweetComponent from './Tweet'
import {useState } from 'react'
import toast from 'react-hot-toast'

interface tweetsProps{
    tweets:Tweet[]
}
import {fetchTweets} from '../utils/fetchTweets'

const Feed = ({tweets:props}:tweetsProps) =>{
	// 1, col-span-7 lg:col-span-5 mobile it have column 7 and small it have 5
	const [tweets, settweets] = useState<Tweet[]>(props)
	const handleRefresh = async()=>{
		const refreshtoast = toast.loading("Refreshing...")
		const tweets = await fetchTweets()
		settweets(tweets)
		toast.success("Feed Upload",{
			id:refreshtoast
		})
	}
	return(
		<div className="col-span-7 max-h-screen overflow-scroll lg:col-span-5 ">
			<div className="flex items-center justify-between">
				<h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
				<ArrowPathIcon 
					onClick={handleRefresh}
					className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"/>
			</div>
			<div>
				<TweetBox settweets={settweets}/>
			</div>

			<div>
				{ tweets.map((tweet)=>(
					<TweetComponent key={tweet._id} tweet={tweet}/>
				))}
			</div>
			
		</div>
	)
}

export default Feed