'use client'
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

interface CategoryData {
  _id: string;
  name: string;
  image: string;
  description: string;
}

interface CateGoryManagementProps {
  data: CategoryData[];
}

const ITEMS_PER_PAGE = 15;

export function CateGoryManagement({ data }: CateGoryManagementProps) {

  console.log(data)

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataList, setDataList] = useState<CategoryData[]>([]);
  const [dataToDelete, setDataToDelete] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setDataList([...data].reverse());
    }
  }, [data]);

  const totalPages = Math.ceil(dataList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedData = dataList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = useCallback(async () => {
    if (!dataToDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/category/${dataToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      setDataList((prev) => prev.filter((p) => p._id !== dataToDelete._id));

      toast.success("Category deleted", {
        description: `${dataToDelete.name} has been removed.`,
        duration: 3000,
      });

      setTimeout(() => {
        setDataToDelete(null);
      }, 3000);

    } catch (error) {
      toast.error("Error deleting data", {
        description: "There was a problem deleting the category.",
      });
    } finally {
      setLoading(false);
    }
  }, [dataToDelete]);

  const renderSkeletonLoader = () => {
    return (
      <TableBody>
        {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
          <TableRow key={index} className="animate-pulse hover:bg-gray-50">
            <TableCell>
              <div className="w-16 h-16 bg-gray-200 rounded-md" />
            </TableCell>
            <TableCell>
              <div className="w-full h-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="w-full h-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="w-20 h-8 bg-gray-200 rounded" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  if (loading || dataList.length === 0) {
    return (
      <div className="w-full p-4">
        <Table className="w-full border border-gray-200 shadow-md rounded-lg">
          <TableCaption className="text-lg font-semibold">A list of available categories.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {renderSkeletonLoader()}
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <Table className="w-full border border-gray-200 shadow-md rounded-lg">
        <TableCaption className="text-lg font-semibold">A list of available categories.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.map((category) => (
            <TableRow key={category._id} className="hover:bg-gray-50">
              <TableCell>
                <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded-md border" />
              </TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4 text-blue-600" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setDataToDelete(category)}>
                      <Trash className="w-4 h-4 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <strong>{category.name}</strong>.
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
