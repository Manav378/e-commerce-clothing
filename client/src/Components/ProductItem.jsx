import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, price, name }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`}>
            <div className="rounded-md overflow-hidden bg-slate-50 shadow-sm my-4 hover:shadow-lg transition-all duration-300">
                <div className="hover:scale-105 transition-transform duration-300">

                    {/* Image */}
                    <img
                        className="w-full h-[230px] md:h-[300px] object-cover rounded-t-md"
                        src={image[0]}
                        alt={name}
                    />

                    {/* Name */}
                    <div className="cormorant text-center text-gray-800 my-2 text-lg font-medium line-clamp-1 h-6">
                        {name}
                    </div>

                    {/* Price */}
                    <div className="cormorant text-center text-gray-700 mb-3 text-sm md:text-base">
                        {currency}{price}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
