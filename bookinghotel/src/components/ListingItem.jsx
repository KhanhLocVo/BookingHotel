// import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import {GoLocation} from 'react-icons/go';
import {FaTrash} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi';


export default function ListingItem({listing, id, onDelete, onEdit}) {
    const navigate = useNavigate();
  return (
  <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
    <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img className="h-[200px] w-full object-cover hover:scale-105 transit-scale duration-200 ease-in" 
         loading="lazy"
         src={listing.imgUrls[0]}
        />
    
        <Moment className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>{listing.timestamp?.toDate()}</Moment>

        <div className="w-full p-[10px]">
            <div className=" items-center space-x-1">
                <GoLocation className="h-4 w-4 text-green-600" />
                <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{listing.address}</p>
                <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
                <p className="text-[#457b9d] mt-2 font-semibold">
                    ${listing.offer
                        ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") 
                        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
                    }
                    {listing.type === "rent" && " / Month"}
                </p>
                <div className="flex items-center mt-[10px] space-x-3">
                    <div className="flex items-center space-x-1">
                        <p className="font-bold text-xs">{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p className="font-bold text-xs">{listing.bathrooms >  1 ? `${listing.bathrooms} Baths` : "1 Bath"}</p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
    {onDelete && (
        <FaTrash className="absolute bottom-2 right-2 h-[20px] cursor-pointer text-red-500" 
            onClick={()=>onDelete(listing.id)}
        />
        
    )}

    {onEdit && (
        <FiEdit className="absolute bottom-2 right-8 h-5 cursor-pointer" 
            onClick={()=>onEdit(listing.id)}
        />
        
    )}
    
  </li>
  );
    
  
}
