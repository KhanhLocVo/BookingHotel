import React, { useEffect } from 'react';
import { useState } from 'react';
import {getAuth, updateProfile} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateDoc, doc, collection, query, orderBy, where, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlineHome } from 'react-icons/ai';
import { async } from '@firebase/util';
import ListingItem from '../components/ListingItem';


export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName : auth.currentUser.displayName,
    email : auth.currentUser.email,
  });
  const {fullName, email} = formData;

  function onLogout(){
    auth.signOut();
    navigate("/sign-in")
  }

  function onChange(e){
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id] : e.target.value,
    }));
  }

  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== fullName){
        await updateProfile(auth.currentUser, {
          displayName : fullName,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          fullName,
        
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }

  useEffect(() => {
    async function fetchUserListings(){
      setLoading(true);
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef","==",auth.currentUser.uid),
        orderBy("timestamp", "desc")
        );
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  return (
    <div>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form action="">
            <div className="flex">
              <p className="w-full md:w-[25%] text-xl pt-2">Full Name: </p>
              <input type="text" id="fullName" value={fullName} disabled={!changeDetail} onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
              />
            </div>
            
            <div className="flex">
              <p className="w-full md:w-[25%] text-xl pt-2">Email: </p>
              <input type="text" id="email" value={email} disabled
              className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              />
            </div>
            

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Do you want to change your name ? 
                <span onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState );
                } } 
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer"
                >
                  {changeDetail ?  "Apply Change" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer">Sign out</p>
            </div>

          </form>
          <button type="submit" className="w-full bg-lime-300 text-red-500 uppercase px-7 py-3 text-sm font-medium rounded shadow-sm hover:bg-blue-300 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-300">
            <Link to="/create-listing" className="flex justify-center items-center">
              <AiOutlineHome className="mr-2 text-3xl bg-red-300 rounded-full p-1 border-2 " />
              Sell or rent your home
            </Link>
            
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">My Listings</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6">
              {listings.map((listing) => (
                <ListingItem
                 key={listing.id} 
                 id={listing.id} 
                 listing={listing.data}
                 />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
