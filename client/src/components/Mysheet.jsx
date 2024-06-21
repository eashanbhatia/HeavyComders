import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "src/components/ui/sheet"
import Card from './Card'

const Mysheet = () => {
    return (
        <div>
            <Sheet >
                <SheetTrigger>View Products</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Products on the current screen</SheetTitle>
                        <SheetDescription>
                            {/* <Card /> */}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Mysheet