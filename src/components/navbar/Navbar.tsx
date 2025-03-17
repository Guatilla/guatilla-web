'use client'

import { useState } from 'react';
import Link from "next/link"

import { LuCoffee, LuGlobe } from "react-icons/lu";
import { IoArrowForward, IoChevronDownOutline, IoClose, IoMenu } from 'react-icons/io5';


// const navItems = [
//     { path: '/hjem', text: 'About' },
//     { path: '/om-oss', text: 'Om oss' },
//     { path: '/produkter', text: 'Produkter' },
//     { path: '/kontakt', text: 'Kontakt' },
// ]

export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isLenguaMenuOpen, setIsLenguaMenuOpen] = useState(false);


    return (
        <div>
            <header className='fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg border-gray-200 dark:border-gray-600"'>
                <p className="flex h-10 items-center justify-center bg-white px-4 text-sm font-medium text-[#5D3A1A] sm:px-6 lg:px-8">
                    Side under konstruksjon 👷🏼
                </p>
                <nav>
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                        <Link href="/" className="flex items-center text-xl font-bold text-gray-800 bg-white px-4 py-2 rounded-full shadow-md">
                            <LuCoffee className="h-6 w-6 mr-2 text-[#5D3A1A]" />
                            <span className="text-[#5D3A1A]">Guatilla</span>
                        </Link>
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            type="button" 
                            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-800 hover:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white/80 shadow-sm hover:bg-white transition-all duration-200" 
                            aria-controls="mega-menu-full-image" 
                            aria-expanded={isOpen}>
                            <span className="sr-only">Open main menu</span>
                            {
                                isOpen? (
                                    <IoClose className='h-8 w-8' />
                                    
                                ) : (
                                    <IoMenu className='h-8 w-8' />
                                )
                            }
                            
                        </button>
                        <div 
                            id="mega-menu-full-image" 
                            className={`w-full md:flex md:w-auto transition-all duration-300 ease-in-out ${
                                isOpen ? "block" : "hidden"
                            }`}>
                            <ul className="flex flex-col gap-2 mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                                <li>
                                    <Link href="#" className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-white/80 shadow-sm hover:bg-white transition-all duration-200" aria-current="page">About</Link>
                                </li>
                                <li>
                                    <button
                                        id="mega-menu-full-cta-image-button" 
                                        data-collapse-toggle="mega-menu-full-image-dropdown" 
                                        className="flex items-center justify-between w-full text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-white/80 shadow-sm hover:bg-white transition-all duration-200">Company
                                        <IoChevronDownOutline className='h-5 w-5 ml-2' />
                                    </button>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-white/80 shadow-sm hover:bg-white transition-all duration-200">Om oss</a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-white/80 shadow-sm hover:bg-white transition-all duration-200">Produkter</a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-white/80 shadow-sm hover:bg-white transition-all duration-200">Kontakt</a>
                                </li>
                            </ul>
                        </div>
                        <div className={`pt-2 md:pt-0 w-full md:flex md:w-auto transition-all duration-300 ease-in-out ${
                                isOpen ? "block" : "hidden"
                            }`}>
                            <button
                                className='flex items-center justify-center gap-2 w-full text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-white/80 shadow-sm hover:bg-white transition-all duration-200'
                            >
                                <LuGlobe className='h-5 w-5' />
                                Norsk (NO)
                            </button>
                            {
                                isLenguaMenuOpen && (
                                    <div className='p-2 fixed z-50 my-2 md:my-11 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm'>
                                        <ul>
                                            <li>
                                                <a href="#" className='text-gray-800 hover:text-gray-600'>Norsk (NO)</a>
                                            </li>
                                            <li>
                                                <a href="#" className='text-gray-800 hover:text-gray-600'>Eglish (US)</a>
                                            </li>
                                            <li>
                                                <a href="#" className='text-gray-800 hover:text-gray-600'>Español (ES)</a>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        isMegaMenuOpen && (
                            <div id="mega-menu-full-image-dropdown" className="mt-1 bg-white border-gray-200 shadow-xs border-y">
                                <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-sm text-gray-500 md:grid-cols-3 md:px-6">
                                    <ul className="hidden mb-4 space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                Online Stores
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                Segmentation
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                Marketing CRM
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                Online Stores
                                            </a>
                                        </li>
                                    </ul>
                                    <ul className="mb-4 space-y-4 md:mb-0">
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                Our Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                Terms & Conditions
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                License
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline hover:text-blue-600">
                                                Resources
                                            </a>
                                        </li>
                                    </ul>
                                    <a href="#" className="p-8 bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken">
                                        <p className="max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, est.</p>
                                        <button 
                                            type="button" 
                                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700"
                                        >
                                            Get started
                                            <IoArrowForward className='h-5 w-5 ml-2' />
                                        </button>
                                    </a>
                                </div>
                            </div>
                        )
                    }
                </nav>
            </header>
        </div>
    )
}