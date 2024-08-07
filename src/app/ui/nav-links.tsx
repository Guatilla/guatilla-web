import Link from "next/link";

const links = [
    {name: 'Hjem', url: '#', title: 'Hjem'},
    {name: 'Om', url: '#', title: 'Om'},
    {name: 'Kontakt', url: '#', title: 'Kontakt'},
    {name: 'Blogg', url: '#', title: 'Blogg'},
];

export default function NavLinks(){
    return (
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {links.map((link) => {
                return (
                    <li key={link.name}>
                        <Link 
                            href={link.url}
                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" 
                            aria-current="page">
                                {link.name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}