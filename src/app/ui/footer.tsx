import Image from "next/image"
import Facebook from './icons/facebook-icon';
import X from './icons/x-icon';
import Instagram from "./icons/instagram-icon";
import Linkedin from "./icons/linkedin-icon";
import YouTube from "./icons/youtube-icon";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <Image width={32} height={33} src="" className="h-8 me-3" alt="Guatilla Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Guatilla</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-1">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Pages</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-2">
                                    <a href="#" className="hover:underline">Home</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="hover:underline">About</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="hover:underline">Contact</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Guatilla</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="https://www.facebook.com/WilkinsRuGo?locale=es_LA" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Facebook />
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="https://x.com/Wilkins_Ruiz" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <X />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="https://www.instagram.com/wilkinsruizgomez/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <Instagram />
                            <span className="sr-only">Instagram page</span>
                        </a>
                        <a href="https://www.linkedin.com/in/wilkins-ruiz-gomez-a18208234/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <Linkedin />
                            <span className="sr-only">Linkedin page</span>
                        </a>
                        <a href="https://www.youtube.com/@wilkinsruizgomez7851" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <YouTube />
                            <span className="sr-only">YouTube page</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}