import React from 'react';
import { useState } from 'react';
import {getAuth, updateProfile} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlineHome } from 'react-icons/ai';


export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
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
    </div>
  )
}
