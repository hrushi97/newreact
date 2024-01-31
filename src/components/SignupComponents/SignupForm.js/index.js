import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { auth, db,  } from "../../../firebase";
import {
    createUserWithEmailAndPassword,
    
} from "firebase/auth";
import { Await, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';


function SignupForm() {
    const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[Password, setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    console.log("Handling Signup...") ;
    setLoading(true);
    if(Password == confirmPassword && Password.length>=6 && fullName && email )
    
    try{
// Creating user account
        const userCredential = await createUserWithEmailAndPassword (
            auth,
            email,
            Password 
        );
        const user = userCredential.user;
        console.log("user", user);

        //Saving user details
        await setDoc(doc (db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
         });
        //save the data in the redux, call the redux action
        dispatch(
            setUser
            ({
            name: fullName,
          email: user.email,
          uid: user.uid,
        })
        );
        toast.success("User has been Created");
        setLoading(false);
        navigate("/profile");
    }
        catch(e) {
            console.log("error",e);
            toast.error(e.message);
            setLoading(false);
        }
      else{
        if(Password!= confirmPassword)
        {
          toast.error("Please Make Sure your Password and Confirm Password Matches");
        }
        else if(Password.length<6)
        {
          toast.error("Please Make Sure your password is more than 6 characters long!");
        }
        setLoading(false);
      }

    };
  return (
    <>

       <InputComponent 
        state={fullName}
         setState={setFullName} 
         placeholder="Full Name"
          type="text"
          required={true}
          />
          <InputComponent 
        state={email}
         setState={setEmail} 
         placeholder="Email"
          type="text"
          required={true}
          />
          <InputComponent 
        state={Password}
         setState={setPassword} 
         placeholder="Password"
          type="password"
          required={true}
          />
          <InputComponent 
        state={confirmPassword}
         setState={setConfirmPassword} 
         placeholder="Confirm Password"
          type="password"
          required={true}
          />
          < Button text={loading ? " Loading..." : "Signup"}
          disabled = {loading} 
          onClick={handleSignup}
          />
       
    </>

  );
}

export default SignupForm;
