import Link from "next/link";
import { ModeToggle } from "./custom-ui/ModeToggle";
import { AvatarDropDown } from "./custom-ui/AvatarDropDown";

export default function NavBar() {
  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-10 bg-background shadow-md">
      {/* LEFT */}
      collapseButton
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Link href="/">DashBoard</Link>
        <ModeToggle />

        <AvatarDropDown />
      </div>
    </nav>
  );
}
