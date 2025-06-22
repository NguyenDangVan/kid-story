"use client"
import React, { useState } from 'react'
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@heroui/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {
    const {user,isSignedIn} = useUser();
    const MenuList = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Create Story',
            path: '/create-story',
        },
        {
            name: 'Explore Stories',
            path: '/explore-stories',
        },
        {
            name: 'Contact Us',
            path: '/contact-us',
        },
    ]

    const [isMenuOpen, setIsMenuOpen]=useState(false);

  return (
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle 
            aria-label={isMenuOpen?"Close menu":"Open menu"}
            className='sm:hidden'
            />
            <NavbarBrand>
                    <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
                    <h2 className='font-bold text-2xl text-primary-50 ml-3'>KidStory</h2>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify='center' className='hidden sm:flex'>
            {MenuList.map((item,index)=>(
                <NavbarItem className='text-xl text-primary font-medium hover:underline'>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>

        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
                <Button color="primary">
                    {isSignedIn ? 'Dashboard': 'Get Started'}
                </Button>
            </Link>
            <UserButton/>
        </NavbarContent>

        <NavbarMenu>
            {MenuList.map((item,index)=> (
                <NavbarMenuItem>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header