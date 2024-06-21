import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "src/components/ui/sheet"

const Card = ({ product }) => {
    return (
        <div>
            <div>
                {/* <Sheet className='text-white'>
                    <SheetTrigger>View Products</SheetTrigger>
                    <SheetContent className='bg-black'>
                        <SheetHeader>
                            <SheetTitle className='text-white'>Products on the current screen:</SheetTitle>
                            <SheetDescription> */}
                                {/* <Card /> */}
                                <div style={cardStyle}>
                                    <img src={product.image_url} alt={product.title} style={imageStyle} />
                                    <h3><a href={product.product_url} target="_blank" rel="noopener noreferrer">{product.title}</a></h3>
                                    <p>Price: {product.price}</p>
                                </div>
                            {/* </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet> */}
            </div>

        </div>

    )
}
const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px',
    maxWidth: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
};
export default Card