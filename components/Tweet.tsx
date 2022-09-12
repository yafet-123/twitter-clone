import { Tweet } from '../typing'
interface tweetsProps{
    tweet:Tweet
}
import TimeAgo from 'react-timeago'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import { urlFor } from '../sanity';
import {
	ChatBubbleBottomCenterIcon,
	ChatBubbleLeftRightIcon,
	HeartIcon,
	ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { Comment } from '../../typing'
import {fetchComments} from '../utils/fetchComments'
import {useSession} from 'next-auth/react'

const TweetComponent = ({tweet}:tweetsProps) =>{
	const {data: session} = useSession()
	const [comments, setcomments] = useState<Comment[]>([])
	const [CommentboxVisible, setcommentboxvisible] = useState<boolean>(false)
	const [input,setinput] = useState<string>('')
	const refreshComments = async()=>{
		const comment:Comment[] = await fetchComments(tweet._id)
		setcomments(comment)
	}

	useEffect(()=>{
		refreshComments()
	},[])

	const addComment = (e: React.formEvent<HTMLFormElement>)=>{
		e.preventDefault()
		
	}
	return(
		<div className="flex flex-col border-y p-5 border-gray-100">
			<div className="flex space-x-3">
				<img src={urlFor(tweet.profileImg.asset._ref)} width={50} height={50} alt="" className="h-10 w-10 rounded-full object-cover" />
				<div>
					<div className="flex items-center space-x-1">
						<p className="mr-1 font-bold">{tweet.username}</p>
						<p className="hidden text-sm text-gray-500 sm:inline">@{tweet.username.toLowerCase()}</p>
						<TimeAgo className="text-sm text-gray-500" date={tweet._createdAt} /> .
					</div>
					<p>{tweet.text}</p>
					{tweet.image && (
						<img className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm" src={urlFor(tweet.image.asset._ref)} alt="" />
					)}
				</div>
			</div>	
			<div onClick={()=> session && setcommentboxvisible(!CommentboxVisible)} className="flex justify-between mt-5">
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ChatBubbleBottomCenterIcon
						className="h-5 w-5"/>
					<p>{comments.length}</p>
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ChatBubbleLeftRightIcon className="h-5 w-5"/>
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<HeartIcon className="h-5 w-5"/>
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ArrowUpTrayIcon className="h-5 w-5"/>
				</div>
			</div>
			{CommentboxVisible && (
				<form submit={addComment} className="mt-3 flex space-x-3">
					<input 
						value={input}
						onChange={e => setinput(e.target.value)}
						className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
						type="text"
						placeholder="Write Comment ..."
					/>
					<button 
						type="submit" 
						disabled={!input} 
						className="text-twitter disabled:text-gray-200 "
					>
						Post
					</button>
				</form>
			)}
			{comments?.length > 0 && (
				<div className="my-2  mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100">
					
					{comments.map((comment)=>(
						<div key={comment._id} className="relative flex space-x-2 ">
							<hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
							<img src={urlFor(comment.profileImg.asset._ref)} alt="" className="mt-2 ssh-7 w-7 rounded-full object-cover" />
							<div>
								<div className="flex items-center space-x-1">
									<p className="mr-1 font-bold">{comment.username}</p>
									<p className="hidden text-sm text-gray-500 lg:inline">@{comment.username.toLowerCase()}</p>
									<TimeAgo className="text-sm text-gray-500" date={tweet._createdAt} /> .
								</div>
								<p>{comment.comment}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default TweetComponent