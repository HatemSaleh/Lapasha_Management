import Link from "next/link";
import { ModeToggle } from "./custom-ui/ModeToggle";
import { AvatarDropDown } from "./custom-ui/AvatarDropDown";

export default function NavBar() {
    return (
        <nav className="p-4 flex items-center justify-between">
            {/* LEFT */}
            collapseButton

            {/* RIGHT */}
            <div className="flex items-center gap-4">
                <Link href="/">DashBoard</Link>
                <ModeToggle />
                
                <AvatarDropDown />
            </div>
        </nav>
    )
}