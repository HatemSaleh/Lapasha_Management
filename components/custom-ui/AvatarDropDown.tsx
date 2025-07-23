"use client"
import { LogOut, UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import logo from "../../public/logo.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AvatarDropDown() {

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
            <AvatarImage src={logo.src}/>
            <AvatarFallback>LP</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><UserPen className="h-[1rem] w-[1rem] mr-2"/>Profile</DropdownMenuItem>
            <DropdownMenuItem variant="destructive"><LogOut className="h-[1rem] w-[1rem] mr-2"/>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
