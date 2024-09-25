"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import "./Navbar.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#oE4749] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-28">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image src="/logo.jpeg" alt="Logo" width={1000} height={1000} className="h-20 w-20 " />
                        </Link>
                    </div>


                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-7">
                        <section>
                            <div className="flex flex-wrap justify-center  bg-gray-800 my-5">
                                <a
                                    href="!"
                                    className="button button--nina px-5 py-0 bg-[#002626] hover:bg-[#oE4749] text-gray-300 hover:text-[#FF6A00]  relative block focus:outline-none border-2 hover:border-[#FF6A00] border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden"
                                    data-text="Login"
                                >
                                    <span className="align-middle">L</span>
                                    <span className="align-middle">o</span>
                                    <span className="align-middle">g</span>
                                    <span className="align-middle">i</span>
                                    <span className="align-middle">n</span>
                                </a>
                            </div>
                        </section>
                        <section>
                            <div className="flex flex-wrap justify-center  bg-gray-800 my-5">
                                <a
                                    href="!"
                                    className="button button--nina px-5 py-0 bg-[#002626] hover:bg-[#oE4749] text-gray-300 hover:text-[#FF6A00] relative block focus:outline-none border-2 hover:border-[#FF6A00]  border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden"
                                    data-text="Sign up"
                                >
                                    <span className="align-middle">S</span>
                                    <span className="align-middle">i</span>
                                    <span className="align-middle">g</span>
                                    <span className="align-middle">n</span>
                                    <span className="align-middle">&nbsp;</span>
                                    <span className="align-middle">u</span>
                                    <span className="align-middle">p</span>
                                </a>
                            </div>
                        </section>

                    </div>



                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
