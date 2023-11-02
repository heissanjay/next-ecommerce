"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
export default function Header() {
    const [categories, setCategories] = useState<[]>([]);
    useEffect(
        () => {
            fetchCategories()
        }, []
    )
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            if (response.ok) {
                const categories = await response.json();
                setCategories(categories);
            } else {
                console.log("Error while fetching Categories");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="sticky top-0 border-b-2 flex bg-white bg-opacity-70 backdrop-blur-lg  min-h-20 max-w-full justify-between items-center max-md:block">
            <h3 className="p-4 text-lg font-bold">E-Commerce</h3>
            <ul className="flex space-x-8 p-4">
                {
                    categories.map(
                        (category) => (
                            <Link
                             href={`/${category}`}
                            >
                                {category}
                            </Link>
                        )
                    )
                }
            </ul>
        </div>
    )
}