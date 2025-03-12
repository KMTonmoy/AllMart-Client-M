'use client';

import React from "react";
import {
    Folder,
    Settings,
    SquareTerminal,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

import Link from "next/link";
import { AuthContext } from "@/Provider/AuthProvider";
import Image from "next/image";

const data = {
    navMain: [
        {
            title: "/Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Shop",
            url: "/dashboard/adm/MGcategory",
            icon: Folder,
            items: [
                {
                    title: "Manage Products",
                    url: "/dashboard/adm/MGProducts",
                },
                {
                    title: "Manage Categories",
                    url: "/dashboard/adm/MGcategory",
                },
                {
                    title: "Manage Brands",
                    url: "/dashboard/adm/MGbrand",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
            items: [
                {
                    title: "Profile",
                    url: "/profile",
                },
            ],
        },
    ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = React.useContext(AuthContext);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex items-center justify-center">
                                    <Image
                                        className="w-[50px]"
                                        src="https://cdn-icons-png.flaticon.com/512/3225/3225209.png"
                                        alt="Logo"
                                        width={50} 
                                        height={50}
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <h2 className="font-bold text-xl">AllMart</h2>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {user?.displayName}
            </SidebarFooter>
        </Sidebar>
    );
}
