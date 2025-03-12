"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    AlertDialog,
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
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import Image from "next/image";

interface Category {
    name: string;
}

interface Product {
    name: string;
    category: string;
    price: string;
    stock: string;
    description: string;
    tags: string[];
    colors: string[];
    images: string[];
    gender: string;
}

export function ProductFormDialog() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [step, setStep] = useState<number>(1);
    const [product, setProduct] = useState<Product>({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        tags: [],
        colors: [],
        images: [],
        gender: "",
    });

    useEffect(() => {
        fetch("https://allmartserver.vercel.app/category")
            .then((res) => res.json())
            .then((data: Category[]) => setCategories(data));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
        setProduct((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        if (files.length + product.images.length > 4) return;

        const uploadedImages = await Promise.all(
            files.map(async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                const { data } = await axios.post(
                    "https://api.imgbb.com/1/upload?key=19c9072b07556f7849d6dea75b7e834d",
                    formData
                );
                return data.data.display_url;
            })
        );

        setProduct((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
    };

    const removeImage = (index: number) => {
        setProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const isStep1Valid = product.name && product.category && product.price && product.stock && product.gender;
    const isImageValid = product.images.length >= 2 && product.images.length <= 4;

    const closeDialog = () => {
        setStep(1);
        setProduct({
            name: "",
            category: "",
            price: "",
            stock: "",
            description: "",
            tags: [],
            colors: [],
            images: [],
            gender: "",
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Add Product</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="flex justify-between items-center">
                    <AlertDialogTitle>Add New Product</AlertDialogTitle>
                    <AlertDialogCancel onClick={closeDialog}>
                        <X size={20} />
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Fill in the details below to add a new product to the catalog.
                </AlertDialogDescription>

                <div className="overflow-x-auto">
                    {step === 1 && (
                        <div className="grid gap-4">
                            <Label>Product Name</Label>
                            <Input value={product.name} onChange={(e) => handleInputChange(e, "name")} />
                            <Label>Category</Label>
                            <Select onValueChange={(value) => setProduct({ ...product, category: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category, index) => (
                                        <SelectItem key={index} value={category.name}>{category.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Label>Price ($)</Label>
                            <Input type="number" value={product.price} onChange={(e) => handleInputChange(e, "price")} />
                            <Label>Stock</Label>
                            <Input type="number" value={product.stock} onChange={(e) => handleInputChange(e, "stock")} />
                            <Label>Gender</Label>
                            <div className="flex gap-4">
                                {["Men", "Women", "Baby", "Anyone"].map((gender) => (
                                    <label key={gender}>
                                        <input type="radio" name="gender" value={gender} checked={product.gender === gender} onChange={(e) => handleInputChange(e, "gender")} />
                                        {gender}
                                    </label>
                                ))}
                            </div>
                            <Label>Images</Label>
                            <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.images.map((image, index) => (
                                    <div key={index} className="relative w-20 h-20">
                                        <Image src={image} alt="Preview" className="w-full h-full rounded" width={80} height={80} />
                                        <button onClick={() => removeImage(index)}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Button onClick={() => setStep(2)} disabled={!isStep1Valid || !isImageValid}>Next</Button>
                        </div>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
