"use client"

import Image from 'next/image'

export default function Navbar() {

    return (
        <nav className="bg-gray-100 w-full fixed">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-20 items-center">
                <a href="/">
                    <Image
                        priority={true}
                        src={require("@/assets/images/sicredi-logo.png")}
                        className="h-10 w-auto"
                        alt="Logomarca"
                    />
                </a>
            </div>
        </nav>
    )
}