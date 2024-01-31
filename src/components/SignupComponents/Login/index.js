import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import{ auth, db } from "../../../firebase";
import { and, doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';


function LoginForm() {
    
  const[email, setEmail] = useState("");
  const[Password, setPassword] = useState("");
  const[loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogin = async() => {
    console.log("Handling Login")
    setLoading(true);
    if(email && Password) {
      try {

        const userCredential = await signInWithEmailAndPassword (
            auth,
            email,
            Password
        );
        const user= userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData)

        dispatch(
            setUser({
            name: userData.name,
          email: user.email,
          uid: user.uid,
          
        })
        );
        toast.success("Login Successful");
      setLoading(false);
        navigate("/profile");

    }catch (error){
            console.error("Error signing in:", error);
            setLoading(false);
            toast.error(error.message);
        }
    }
    
    else{
      toast.error("Make Sure email and password are not empty");
      setLoading(false);
    }
  

  try {

            const userCredential = await signInWithEmailAndPassword (
                auth,
                email,
                Password
            );
            const user= userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            console.log("userData", userData)

            dispatch(
                setUser({
                name: userData.name,
              email: user.email,
              uid: user.uid,
              
            })
            );
            toast.success("Login Successful");
          setLoading(false);
            navigate("/profile");

        }catch (error){
                console.error("Error signing in:", error);
                setLoading(false);
                toast.error(error.message);
            }
        };
     return (
    <>

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
          <Button text={loading ? "Loading..." : "LogIn"} onClick={handleLogin} disabled={loading}/>
       
    </>

  )
}


export default LoginForm;