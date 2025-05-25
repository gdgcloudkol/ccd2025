"use client";

import { CreditCard, LogOut, PlusCircle, Settings2, Ticket, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/Button";
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
  return <>
    <div className="inline-block lg:hidden w-full">
      <LoadLink href={'/profile'} className="flex items-center justify-between w-full">
        Profile
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
      </LoadLink>
    </div>
    <div className="hidden lg:inline-block">
      <DropdownMenu>
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
          <DropdownMenuItem>
            <LoadLink href={'/apply'} className="flex items-center justify-between">
              <Ticket className='mr-2 h-4 w-4' /> Apply for Ticket
            </LoadLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </>

}
