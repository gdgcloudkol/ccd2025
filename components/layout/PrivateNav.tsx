"use client";

import { CreditCard, LogOut, PlusCircle, Settings2, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button  from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadLink from "@/components/blocks/LoadLink";
import { UserData, UserProfileData } from "@/types/login";
import { DEFAULT_FIRST_NAME, DEFAULT_LAST_NAME } from "@/lib/constants/generic";

import { extractGithubUsername } from "@/lib/utils";


export default function PrivateNav({
  user,
}: {
  user: UserData | undefined;
}) {
    return <DropdownMenu>
    <DropdownMenuTrigger>
    <Avatar className='h-10 w-10'>
            <AvatarImage
              src={
                (user?.profile?.socials?.github &&
                  `https://github.com/${extractGithubUsername(
                    user?.profile?.socials?.github
                  )}.png`) ||
                "/assets/images/mascot.webp"
              }
              alt={
                (user?.profile?.socials?.github &&
                  extractGithubUsername(user?.profile?.socials?.github)) ||
                "avatar"
              }
            />
            <AvatarFallback>{user?.profile?.first_name[0]}</AvatarFallback>
          </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="z-[1000]">
      <DropdownMenuItem> 
        <LoadLink href={'/profile'} className="flex items-center justify-between">
        <User className='mr-2 h-4 w-4' /> Profile
        </LoadLink>
        </DropdownMenuItem>
      <DropdownMenuSeparator />
         <DropdownMenuItem onClick={() => signOut()}>
           <LogOut className='mr-2 h-4 w-4' />
           <span>Log out</span>
         </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
//   return (
//     <DropdownMenu defaultOpen={true}>
//       <DropdownMenuTrigger asChild>
//         <Button    
//           className='relative h-11 w-11 p-1 rounded-full bg-secondary z-[90]'
//          onClick={()=>{console.log("open")}}
//         >
//           <Avatar className='h-10 w-10'>
//             <AvatarImage
//               src={
//                 (user?.profile?.socials?.github &&
//                   `https://github.com/${extractGithubUsername(
//                     user?.profile?.socials?.github
//                   )}.png`) ||
//                 "/assets/images/mascot.webp"
//               }
//               alt={
//                 (user?.profile?.socials?.github &&
//                   extractGithubUsername(user?.profile?.socials?.github)) ||
//                 "avatar"
//               }
//             />
//             <AvatarFallback>{user?.profile?.first_name[0]}</AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className='w-56 border-border-dashboard'
//         align='end'
//         forceMount
//       >
//         <DropdownMenuLabel className='font-normal'>
//           <div className='flex flex-col space-y-1'>
//             <p className='text-sm font-medium leading-none'>
//               {user?.profile?.first_name || DEFAULT_FIRST_NAME}{" "}
//               {user?.profile?.last_name || DEFAULT_LAST_NAME}
//             </p>
//             <p className='text-xs leading-none text-muted-foreground'>
//               {user?.email}
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//          <LoadLink href={"/profile"}>Profile</LoadLink>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => signOut()}>
//           <LogOut className='mr-2 h-4 w-4' />
//           <span>Log out</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
}
