import { LogOut, Moon, UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import logo from "../public/logo.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavBar() {
    return (
        <nav className="p-4 flex items-center justify-between">
            {/* LEFT */}
            collapseButton

            {/* RIGHT */}
            <div className="flex items-center gap-4">
                <Link href="/">DashBoard</Link>
                <Moon />
                
                <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                    <AvatarImage src={logo.src} />
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
            </div>
        </nav>
    )
}