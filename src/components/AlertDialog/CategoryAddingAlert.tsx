"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export function CategoryFormDialog() {
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<{ name: string; description: string; image: string | null }>({
        name: "",
        description: "",
        image: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof typeof category) => {
        setCategory((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setLoading(true);
        try {
            const { data } = await axios.post("https://api.imgbb.com/1/upload?key=19c9072b07556f7849d6dea75b7e834d", formData);
            setCategory((prev) => ({ ...prev, image: data.data.display_url }));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "Failed to upload image. Try again!", "error");
        }
    };

    const handleSubmit = async () => {
        if (!category.name || !category.description || !category.image) {
            Swal.fire("Error", "Please fill out all fields including image upload!", "error");
            return;
        }

        setLoading(true);

        try {
            await axios.post("https://allmartserver.vercel.app/Postcategory", category);
            setLoading(false);
            Swal.fire("Success", "Category added successfully!", "success");
            closeDialog();
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "Failed to add category. Try again!", "error");
        } 
    };

    const closeDialog = () => {
        setCategory({ name: "", description: "", image: null });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Add Category</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="flex justify-between items-center">
                    <AlertDialogTitle>Add New Category</AlertDialogTitle>
                    <AlertDialogCancel onClick={closeDialog}>
                        <X size={20} />
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Fill in the details below to add a new category to the catalog.
                </AlertDialogDescription>

                <div className="grid gap-4">
                    <Label>Category Name</Label>
                    <Input
                        value={category.name}
                        onChange={(e) => handleInputChange(e, "name")}
                    />

                    <Label>Description</Label>
                    <Input
                        value={category.description}
                        onChange={(e) => handleInputChange(e, "description")}
                    />

                    <Label>Category Image</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    {category.image && (
                        <div className="mt-2">
                            <img src={category.image} alt="Category" className="w-20 h-20 rounded" />
                            <button
                                onClick={() => setCategory((prev) => ({ ...prev, image: null }))}
                                className="ml-2 text-red-500"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        <AlertDialogAction onClick={handleSubmit} disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </AlertDialogAction>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
