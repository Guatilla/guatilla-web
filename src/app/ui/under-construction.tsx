// components/UnderConstruction.js

import Facebook from "./icons/facebook-icon";
import Instagram from "./icons/instagram-icon";
import Linkedin from "./icons/linkedin-icon";
import X from "./icons/x-icon";
import YouTube from "./icons/youtube-icon";

export default function UnderConstruction() {
    return (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-blue-700">Página en Construcción 👷🏼</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-blue-700">Estamos trabajando arduamente para traerte algo increíble. ¡Vuelve pronto!</p>
            <div className="flex flex-col items-center sm:items-center">
                <span className="md:text-2xl text-lg text-gray-600 font-semibold dark:text-blue-700">FOLLOW US</span>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 sm:mt-0 pt-4">
                    <a href="https://www.facebook.com/WilkinsRuGo?locale=es_LA" className="flex justify-center items-center gap-2 dark:text-white py-2 px-2 rounded bg-[#1877f2] hover:opacity-75">
                        <Facebook />
                        Facebook
                    </a>
                    <a href="https://x.com/Wilkins_Ruiz" className="flex justify-center items-center gap-2 dark:text-white py-2 px-2 rounded bg-[#000000] hover:opacity-75">
                        <X />
                        X
                    </a>
                    <a href="https://www.instagram.com/wilkinsruizgomez/" className="flex justify-center items-center gap-2 dark:text-white py-2 px-2 rounded bg-gradient-to-r from-[#FED372] via-[#F86F2F] via-[#D43089] via-[#9E37B8] to-[#5F4BC6] hover:opacity-75">
                        <Instagram />
                        Instagram
                    </a>
                    <a href="https://www.linkedin.com/in/wilkins-ruiz-gomez-a18208234/" className="flex justify-center items-center gap-2 dark:text-white py-2 px-2 rounded bg-[#0073b1] hover:opacity-75">
                        <Linkedin />
                        Linkedin
                    </a>
                    <a href="https://www.youtube.com/@wilkinsruizgomez7851" className="flex justify-center items-center gap-2 dark:text-white py-2 px-2 rounded bg-[#FF0000] hover:opacity-75">
                        <YouTube />
                        YouTube
                    </a>
                </div>
            </div>
        </div>
    );
}
