"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

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

const initState: Product = {
  id: 0,
  category: "",
  description: "",
  price: 0,
  title: "",
  image: "",
  rating: {
    rate: 0,
    count: 0,
  },
};

export default function Product() {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const [product, setProduct] = useState<Product>(initState);
  const [quantity, setQuantity] = useState<number>(1);
  const [cartStatus, setcartStatus] = useState<Boolean>(false);
  const [cartText, setCartText] = useState<string>("Add item to cart");
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  useEffect(() => {
    getProduct();
    getProducts();
  },);

  const incrementQuantity = () => {
    if (quantity < 3) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    setcartStatus(!cartStatus);
    if (cartStatus) {
      setCartText("Add item to Card");
    } else {
      setCartText(`Item added to card (${quantity})`);
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${search}`
      );

      if (response.ok) {
        const product = await response.json();
        setProduct(product);
      } else {
        console.log("Error while fetching the product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products?limit=9");
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
    <div className="mx-auto justify-center min-h-screen items-center border-2 border-black">
      <div className="grid lg:grid-cols-2 row-span-2  m-8 p-16 md:grid-cols-1 md:gap-4">
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.title}
        />
        <div className="hero-text">
          <p className="text-xl block  font-bold">{product.title}</p>
          <p className="font-normal my-4">{product.description}</p>
          <p className="text-sm text-white rounded-md px-2 w-fit bg-slate-500">
            {product.category}
          </p>
          <h1 className="text-xl font-bold my-8">Price: ${product.price}</h1>
          <div className="flex space-x-2">
            <p className="font-bold">Quantity</p>
            <button className="border-2 px-1" onClick={decrementQuantity}>
              -
            </button>
            <p className="border-2 w-fit px-4">{quantity}</p>
            <button className="border-2 px-1" onClick={incrementQuantity}>
              +
            </button>
          </div>

          <div className="flex justify-between text-md my-8">
            <p className="font-bold">Reviews {product.rating.rate}</p>
            <p>
              Total Reviews:{" "}
              <span className="font-bold">{product.rating.count}</span>
            </p>
          </div>
          <button
            className={`w-full rounded-md  hover:bg-slate-200 p-3 
                    ${cartStatus === true ? "bg-slate-400" : "bg-slate-600"}`}
            onClick={addToCart}
          >
            {cartText}
          </button>
        </div>
        <div className="mx-auto text-center col-span-2 my-8">
          <p className="p-4">Shop More item</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-8 gap-4 px-4">
            {products
            .filter((product) => product.id !== Number(search))
            .map((product) => (
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
                    <p className="font-bold col-span-1 row-span-1 ">
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
        </div>
        <button
      className="text-xl text-slate-700 text-center col-span-2 underline mx-auto justify-center"
      onClick={() => router.push("/")}
      >
        Take me Home
      </button>
      </div>
     
    </div>
  );
}
