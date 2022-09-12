import { 
	HashtagIcon,
	BookmarkIcon,
	CircleStackIcon,
	ArrowDownCircleIcon,
	EnvelopeIcon,
	UserIcon,
	HomeIcon,
	BellIcon
 } from '@heroicons/react/24/outline'
import SidebarRow from './SideBarRow'
import {useSession,signIn, signOut} from 'next-auth/react'
const Sidebar = () =>{
	// 1, col-span-2 grid column have 2 items-center p-4 md:items-startthis is for responsive when the mobile 
	// size it will have items center and butstart from middle it will have items start
	const {data: session} = useSession()
	return(
		<div className="flex flex-col col-span-2 items-center p-4 md:items-start">
			<img className="m-3 h-10 w-10" src="https://links.papareact.com/drq" alt="" />
			<SidebarRow Icon={HomeIcon} title="Home" />
			<SidebarRow Icon={HashtagIcon} title="Explore" />
			<SidebarRow Icon={BellIcon} title="Notification" />
			<SidebarRow Icon={EnvelopeIcon} title="Messages" />
			<SidebarRow Icon={BookmarkIcon} title="BookMarks" />
			<SidebarRow Icon={CircleStackIcon} title="Lists" />

			<SidebarRow onClick={session ? signOut : signIn }Icon={UserIcon} title={ session ? "Sign out" : "Signin" } />
			<SidebarRow Icon={ArrowDownCircleIcon} title="More" />
		</div>
	)
}

export default Sidebar