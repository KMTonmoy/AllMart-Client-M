"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import JoditEditor from "jodit-react";

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
    const [loading, setLoading] = useState<boolean>(false);
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
        fetch("http://localhost:8000/category")
            .then((res) => res.json())
            .then((data: Category[]) => setCategories(data));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
        setProduct((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " && e.currentTarget.value.trim()) {
            const value = e.currentTarget.value.trim();
            if (!product.tags.includes(value)) {
                setProduct((prev) => ({ ...prev, tags: [...prev.tags, value] }));
            }
            e.currentTarget.value = "";
        }
    };

    const handleColorInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " && e.currentTarget.value.trim()) {
            const color = e.currentTarget.value.trim();
            if (!product.colors.includes(color)) {
                setProduct((prev) => ({ ...prev, colors: [...prev.colors, color] }));
            }
            e.currentTarget.value = "";
        }
    };

    const removeItem = (field: keyof Product, itemToRemove: string) => {
        setProduct((prev) => ({ ...prev, [field]: prev[field].filter((item) => item !== itemToRemove) }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        if (files.length + product.images.length > 4) return;

        setLoading(true);

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
        setLoading(false);
    };

    const removeImage = (index: number) => {
        setProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        if (!product.images.length) {
            Swal.fire("Error", "Please upload at least one image!", "error");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:8000/postProduct", product);
            setLoading(false);
            Swal.fire("Success", "Product added successfully!", "success");
            closeDialog();
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "Failed to add product. Try again!", "error");
        }
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
                                <label key={gender} className="flex items-center gap-2">
                                    <input type="radio" name="gender" value={gender} checked={product.gender === gender}
                                        onChange={(e) => handleInputChange(e, "gender")} />
                                    {gender}
                                </label>
                            ))}
                        </div>



                        <Label>Images</Label>
                        <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.images.map((image, index) => (
                                <div key={index} className="relative w-20 h-20">
                                    <img src={image} alt="Preview" className="w-full h-full rounded" />
                                    <button onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Button onClick={() => setStep(2)} disabled={!isStep1Valid || !isImageValid}>Next</Button>
                    </div>
                )}

                {step === 2 && (
                    <div>

                        <div className="mb-20">
                            <Label>Tags</Label>
                            <Input
                                onKeyDown={handleTagInput}
                                placeholder="Add a tag"
                            />
                            <div className="flex gap-2 mt-2">
                                {product.tags.map((tag, index) => (
                                    <div key={index} className="flex items-center bg-gray-200 p-2 rounded">
                                        {tag}
                                        <button onClick={() => removeItem("tags", tag)} className="ml-2 text-red-500">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <Label>Colors</Label>
                            <Input
                                onKeyDown={handleColorInput}
                                placeholder="Add a color"
                            />

                            <div className="flex gap-2 mt-2">
                                {product.colors.map((color, index) => (
                                    <div key={index} className="flex items-center bg-gray-200 p-2 rounded">
                                        {color}
                                        <button onClick={() => removeItem("colors", color)} className="ml-2 text-red-500">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Label>Description</Label>
                        <JoditEditor value={product.description} onBlur={(newContent) => setProduct({ ...product, description: newContent })} />

                        <div className="flex justify-between mt-4">
                            <Button onClick={() => setStep(1)}>Back</Button>
                            <AlertDialogAction onClick={handleSubmit} disabled={loading}>Submit</AlertDialogAction>
                        </div>
                    </div>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
}
