"use client";

import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
    const params = useParams();
    const category = Array.isArray(params.id) ? params.id[0] : params.id;
    const decodedCategory = category ? decodeURIComponent(category) : '';

    return (
        <div>
            <h1>This is Page</h1>
            <p>Category: {decodedCategory}</p>
        </div>
    );
};

export default Page;
