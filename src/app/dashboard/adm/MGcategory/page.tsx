'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CateGoryManagement } from "./CategoryManagement";
import { CategoryFormDialog } from "@/components/AlertDialog/CategoryAddingAlert";

const Page = () => {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get("https://allmartserver.vercel.app/category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <div className="w-full flex flex-col p-4">
            <div className="mb-4 flex justify-end">
                <CategoryFormDialog />
            </div>

            <CateGoryManagement data={categories} />
        </div>
    );
};

export default Page;
