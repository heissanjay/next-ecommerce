"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface Product {
  id: number;
  category: string;
  description: string;
  price: number;
  title: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

export default function ProductOnCategories() {
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      getProducts();
    }, []);
  
    const getProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category${pathname}`);
        if (response.ok) {
          const products = await response.json();
          setProducts(products);
        } else {
          console.log("Error while fetching data");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
        <div>
        <h2 className="text-center p-4 m-4">{decodeURIComponent(pathname.replace(/^\//, ''))}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-8 gap-4 px-4">
        {products.map((product) => (
          <div key={product.id}>
            <div className="border-2 p-4 min-h-full rounded-md min-w-full">
              <div>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="h-72 w-64 overflow-hidden object-contain"
                />
              </div>
              <p className="text-md p-2 h-16 truncate">{product.title}</p>
              <span className="grid grid-rows-1 grid-cols-2 ">
                <p className="font-bold col-span-1 row-span-1 px-2">
                  ${product.price}
                </p>
                <p className="text-md col-span-1 row-span-1">
                  Ratings {product.rating.rate} ({product.rating.count})
                </p>
                <button
                  className="border-2 col-span-2 w-full row-span-2 p-3 m-1 bg-slate-400 hover:bg-slate-100 rounded-md"
                  onClick={() => router.push(`/product?id=${product.id}`)}
                >
                  view product
                </button>
              </span>
            </div>
          </div>
        ))}    
      </div>
      <div className="mx-auto text-center items-center m-4 p-4">
      <button
      className="text-xl text-slate-700 text-center col-span-2 underline mx-auto justify-center"
      onClick={() => router.push("/")}
      >
        Take me Home
      </button>
      </div>
      
    </div>
    
    )
}