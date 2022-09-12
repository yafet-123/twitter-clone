import {useState,Dispatch,MouseEvent,SetStateAction,MouseEvent, useRef} from 'react'
import {
	CalendarIcon,
	FaceSmileIcon,
	MapPinIcon,
	PhotoIcon,
	MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import {useSession} from 'next-auth/react'
import { Tweet , TweetBody } from '../../typing'
import {fetchTweets} from '../utils/fetchTweets'
const props ={
		settweets : Dispatch<SetStateAction<Tweet[]>>
}
import toast from 'react-hot-toast'

const TweetBox = ({settweets} : props) =>{
	const [input, setinput] = useState<string>('')
	const [image, setimage] = useState<string>('')
	// 1, by seeting the input we can get the value of input and by putting disabled in the button when 
	// there is no value change the color to the opacity-40 make it blurr
	const {data: session} = useSession()
	const [imageUrlBoxIsOpen, setimageUrlBoxIsOpen] = useState<boolean>(false)
	const ImageInputRef =useRef<HTMLInputElement>(null)
	const addImageToTweet = (e:React.MouseEvent<HTMLButtonElement,globalThis.MouseEvent>)=>{
		e.preventDefault()
		if(!ImageInputRef.current?.value) return

		setimage(ImageInputRef.current.value)
		ImageInputRef.current.value = ""
		setimageUrlBoxIsOpen(false)
	}
	const postTweet = async()=>{
		const tweetInfo : TweetBody = {
			text:input,
			username : session?.user?.name || "Unknow user",
			profileImg : session?.user?.image || 'https://links.papareact.com/gll',
			image:image
		}

		const result = await fetch('/api/addTweet',{
			body:JSON.stringify(tweetInfo),
			method:"POST",
		})

		const json= await result.json()

		const newTweets = await fetchTweets();
		settweets(newTweets)
		toast('Tweet Posted')

		return json
	}
	const handleSubmit = (e: MouseEvent<HTMLButtonElement,globalThis.MouseEvent>) =>{
		e.preventDefault()
		postTweet()
		setinput('')
		setimage('')
		setimageUrlBoxIsOpen(false)
	}
	return(
		<div className="flex space-x-2 p-5">
			<img 
				className="mt-4 h-14 w-14 object-cover rounded-full" 
				src={session?.user?.image || "https://links.papareact.com/gll" }
				alt="" 
			/>
			<div className="flex flex-1 flex-col pl-2">
				<form className="flex flex-1 flex-col">
					<input 
						className="h-24 w-full text-xl outline-none placeholder:text-xl" 
						type="text" 
						placeholder="what happening?"
						value={input}
						onChange={(e)=> setinput(e.target.value)}
					/>
					<div className="flex items-center">
						<div className="flex flex-1 space-x-2 text-twitter">
							<PhotoIcon onClick={()=> setimageUrlBoxIsOpen(!imageUrlBoxIsOpen)} 
								className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
							/>
							<MagnifyingGlassIcon className="h-5 w-5"/>
							<FaceSmileIcon className="h-5 w-5"/>
							<CalendarIcon className="h-5 w-5"/>
							<MapPinIcon className="h-5 w-5"/>
						</div>
						<button 
							onClick={handleSubmit}
							disabled={!input}
							className="bg-twitter px-5 font-bold py-2 text-white rounded-full disabled:opacity-40"
						>
							Tweet
						</button>
					</div>
					
				</form>

				{imageUrlBoxIsOpen && (
					<form className="mt-5 rounded-lg bg-twitter/80 py-2 px-4">
						<input 
							ref={ImageInputRef}
							className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
							type="text" 
							placeholder="Enter image url ..."
						/>
						<button 
							type="submit" 
							onClick={addImageToTweet} 
							className="font-bold text-white"
						>
							Add Image
						</button>
					</form>
				)}
				{ image && (
					<img 
						className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg" 
						src={image} 
					/>
				)}
			</div>
			
		</div>
	)
}

export default TweetBox