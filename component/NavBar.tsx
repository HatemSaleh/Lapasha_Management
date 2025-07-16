import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
    return (
        <nav className="bg-white shadow-md py-4 border-gray-200">
            <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
                <Link href="#">
                    <Image src="/logo.png" alt="Logo" width={100} height={100}/>
                </Link>


            </div>
        </nav>
    )
}