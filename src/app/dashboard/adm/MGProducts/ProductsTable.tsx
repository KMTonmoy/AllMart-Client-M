import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Image from "next/image";

interface Product {
  _id: string;
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  tags: string[];
  colors: string[];
  images: string[];
  gender: string;
}

interface TableDemoProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 15;

export function TableDemo({ products }: TableDemoProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productList, setProductList] = useState<Product[]>([]);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (products.length > 0) {
      setProductList([...products].reverse());
    }
  }, [products]);

  const totalPages = Math.ceil(productList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedProducts = productList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = useCallback(async () => {
    if (!productToDelete) return;

    setLoading(true);

    await fetch(`https://allmartserver.vercel.app/product/${productToDelete._id}`, {
      method: "DELETE",
    });

    setProductList((prev) => prev.filter((p) => p._id !== productToDelete._id));

    toast.success("Product deleted", {
      description: `Product ${productToDelete.name} has been removed.`,
      duration: 3000,
    });

    setTimeout(() => {
      setProductToDelete(null);
    }, 3000);
  }, [productToDelete]);

  const renderSkeletonLoader = () => {
    return (
      <TableBody>
        {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
          <TableRow key={index} className="animate-pulse hover:bg-gray-50">
            <TableCell>
              <div className="w-16 h-16 bg-gray-200 rounded-md" />
            </TableCell>
            <TableCell>
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="w-32 h-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="w-24 h-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="w-20 h-8 bg-gray-200 rounded" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <div className="w-full p-4">
      <Table className="w-full border border-gray-200 shadow-md rounded-lg">
        <TableCaption className="text-lg font-semibold">A list of available products.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[120px]">Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {loading || productList.length === 0 ? renderSkeletonLoader() : (
          <TableBody>
            {selectedProducts.map((product) => (
              <TableRow key={product._id} className="hover:bg-gray-50">
                <TableCell>
                  <Image src={product.images[0]} alt={product.name} width={64} height={64} className="object-cover rounded-md border" />
                </TableCell>
                <TableCell className="font-medium">{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-semibold">${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4 text-blue-600" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => setProductToDelete(product)}>
                        <Trash className="w-4 h-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete <strong>{productToDelete?.name}</strong>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={loading}>
                          {loading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}

        <TableFooter>
          <TableRow className="flex justify-between">
            <TableCell className="flex items-center">
              <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="mx-2 flex gap-2">
                <span>{currentPage}</span> <span>of</span> <span>{totalPages}</span>
              </span>
              <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
