import React from 'react';
import signupselection from "../../assets/Login&signup/signupselection.jpg"
import OutlineButton from '../Shared/Button/OutlineButton';

const UserType = () => {
    return (
        <div className="card w-full md:w-3/4 lg:w-3/4 mt-10 mx-auto lg:card-side bg-base-100 shadow-xl">
        <figure><img src={signupselection} alt="Album"/></figure>
        <div className="card-body my-auto">
          <h2 className=" text-center text-3xl font-bold"> Select Your type</h2>
          <OutlineButton link="/signup"  text="Signup as Reader"></OutlineButton>
          <OutlineButton link="/writersignup" text="Signup as Writer"></OutlineButton>
          <OutlineButton link="/publishersignup" text="Signup as Publisher"></OutlineButton>
        
            
        </div>
      </div>
    );
};

export default UserType;