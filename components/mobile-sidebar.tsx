"use client";

import { Menu } from 'lucide-react';
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './sidebar';
import { Button } from './ui/button';

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
            <Button className='md:hidden' variant="ghost" size="icon">
                <Menu/>
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className='p-0'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar