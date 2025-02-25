'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableDemo } from "./ProductsTable";
import { Button } from "@/components/ui/button";
import { ProductFormDialog } from "@/components/AlertDialog/SecongDialog";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col p-4">
      {/* Add New Product Button */}
      <div className="mb-4 flex justify-end">
        <ProductFormDialog />
      </div>

      {/* Product Table */}
      <TableDemo products={products} />
    </div>
  );
};

export default Page;
