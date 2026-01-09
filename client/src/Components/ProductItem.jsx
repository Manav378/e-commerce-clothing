import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, price, name }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`}>
            <div className="rounded-md overflow-hidden bg-slate-50 shadow-sm my-2 sm:my-4 hover:shadow-lg transition-all duration-300">
                <div className="hover:scale-105 transition-transform duration-300">
                   
                    <img
                        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-t-md"
                        src={image[0]}
                        alt={name}
                    />

                  
                    <div className="cormorant text-center text-gray-800 my-1 text-base sm:text-lg font-medium line-clamp-1">
                        {name}
                    </div>

                 
                    <div className="cormorant text-center text-gray-700 mb-2 text-sm sm:text-base">
                        {currency}{price}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
