'use client'
import { UserOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CreditCard,
    LifeBuoy,
    LogOut,
    Settings,
    User
} from "lucide-react";
import { AuthContext } from '@/Provider/AuthProvider';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { usePathname } from 'next/navigation';
import useRole from '@/hook/useRole';

const womenCategories = [
    { id: '1', label: 'Dresses' },
    { id: '2', label: 'Tops & Tees' },
    { id: '3', label: 'Skirts' },
    { id: '4', label: 'Jackets & Coats' },
    { id: '5', label: 'Sweaters' },
    { id: '6', label: 'Swimwear' },
    { id: '7', label: 'Boots' },
    { id: '8', label: 'T-shirt' },
    { id: '9', label: 'Shoes' },
];

const menCategories = [
    { id: '15', label: 'T-Shirts' },
    { id: '25', label: 'Tanks' },
    { id: '35', label: 'Polos' },
    { id: '45', label: 'Leather' },
    { id: '55', label: 'Janeiro Stores' },
    { id: '65', label: 'Necessary Clothing' },
    { id: '75', label: 'Express Clothes' },
    { id: '85', label: 'Spark Pretty' },
    { id: '95', label: 'Warm' },
];

const generateMenuItems = (items: { id: string; label: string }[]): MenuProps['items'] => {
    return items.map(({ id, label }) => ({
        key: id,
        label: <a href={`/shop/${label}`}>{label}</a>,
    }));
};

const Navbar = () => {
    const { role } = useRole();
    const pathname = usePathname();
    const isDashboardPage = pathname?.startsWith('/dashboard');
    const authContext = useContext(AuthContext);

    if (isDashboardPage) {
        return null;
    }

    const user = authContext?.user;
    const logOut = authContext?.logOut;

    return (
        <div>
            <div className='pb-5'>
                <div className="border-b">
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-5">
                        <Link href="/">
                            <div className="flex items-center gap-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/3225/3225209.png" className="w-[50px] h-[50px]" alt="Logo" />
                                <h1 className="md:block hidden">All Mart</h1>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-3">
                            <input type="text" className="md:w-[700px] w-[250px] outline-none border p-[15px] rounded-full" placeholder="WHAT ARE YOU LOOKING FOR ?" />
                            <button className="relative bg-orange-500 rounded-full w-[40px] h-[40px] -left-[50px]">
                                <SearchOutlined />
                            </button>
                        </div>
                        <div>
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src={user?.photoURL || 'https://cdn-icons-gif.flaticon.com/8717/8717910.gif'} alt="User" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={`/profile/${user?.uid}`}>
                                                <DropdownMenuItem><User /><span>Profile</span></DropdownMenuItem>
                                            </Link>
                                            {role === 'admin' ? (
                                                <Link href={'/dashboard'}>
                                                    <DropdownMenuItem><CreditCard /><span>Dashboard</span></DropdownMenuItem>
                                                </Link>
                                            ) : (
                                                <Link href={'/MyOrders'}>
                                                    <DropdownMenuItem><CreditCard /><span>My Orders</span></DropdownMenuItem>
                                                </Link>
                                            )}
                                            <Link href={'/settings'}>
                                                <DropdownMenuItem><Settings /><span>Settings</span></DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                        <Link href={'/support'}>
                                            <DropdownMenuItem><LifeBuoy /><span>Support</span></DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <button className='flex items-center gap-2' onClick={logOut}>
                                                <LogOut /><span>Log out</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex gap-3 items-center">
                                    <Link href={'/login'}>
                                        <p className="text-[20px] md:text-[26px]"><UserOutlined /></p>
                                        <p className="text-[7px] md:text-[10px] font-[600]">LOG IN</p>
                                    </Link>
                                    <button>
                                        <p className="text-[20px] md:text-[26px]"><ShoppingCartOutlined /></p>
                                        <p className="text-[7px] md:text-[10px] font-[600]">MY CART</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl px-5 mt-2 mx-auto">
                    <Space direction="vertical">
                        <Space wrap className="flex gap-4">
                            <Dropdown menu={{ items: generateMenuItems(womenCategories) }} placement="bottomLeft">
                                <p className="cursor-pointer font-[600]">Women</p>
                            </Dropdown>
                            <Dropdown menu={{ items: generateMenuItems(menCategories) }} placement="bottomLeft">
                                <p className="cursor-pointer font-[600]">Men</p>
                            </Dropdown>
                            <Link href="shop/baby"><p className="cursor-pointer font-[600]">Youth & Baby</p></Link>
                            <Link href="shop/home"><p className="cursor-pointer font-[600]">Home & Living</p></Link>
                            <Link href="shop/accessories"><p className="cursor-pointer font-[600]">Accessories</p></Link>
                            <Link href="shop/mugs"><p className="cursor-pointer font-[600]">Mugs</p></Link>
                            <Link href="shop/jewelry"><p className="cursor-pointer font-[600]">Jewelry</p></Link>
                            <Link href="contact"><p className="cursor-pointer font-[600]">Contact Us</p></Link>
                        </Space>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
