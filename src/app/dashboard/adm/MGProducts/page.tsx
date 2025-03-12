'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableDemo } from "./ProductsTable";
import { ProductFormDialog } from "@/components/AlertDialog/SecongDialog";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://allmartserver.vercel.app/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col p-4">
      <div className="mb-4 flex justify-end">
        <ProductFormDialog />
      </div>

      <TableDemo products={products} />
    </div>
  );
};

export default Page;
