import {
	MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import {TwitterTimelineEmbed} from 'react-twitter-embed'

const Widgets = () =>{
	// col-span-2 hidden lg:inline in small screen it is hidden and large screen it have 2 column 
	return(
		<div className="mt-2 px-2 col-span-2 hidden lg:inline">
			<div className="flex items-center space-x-2 bg-gray-100 mt-2 rounded-full p-3">
				<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
				<input type="text" placeholder="search on Twitter" className="flex-1 bg-transparent outline-none"/>
			</div>

			<TwitterTimelineEmbed
  				sourceType="profile"
  				screenName="sonnysangha"
  				options={{height: 1000}}
			/>
		</div>
	)
}

export default Widgets