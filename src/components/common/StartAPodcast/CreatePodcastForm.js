import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../Input';
import { toast } from 'react-toastify';
import Button from '../Button';
import FileInput from '../Input/FileInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function CreatePodcastForm() {
    
    const[title, setTitle] = useState("");
  const[desc, setDesc] = useState("");
  const[displayImage, setDislayImage] = useState();
  const[bannerImage, setBannerImage] = useState();
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    toast.success("Handling Form");
    if(title && desc && displayImage && bannerImage){
      setLoading(true);
        //1. Upload files --> get downloadable links
        try{
            const bannerImageRef = ref(storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`);
           await uploadBytes(bannerImageRef, bannerImage);
         const bannerImageUrl =  await getDownloadURL(bannerImageRef);

         const displayImageRef = ref(storage,
            `podcasts/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(displayImageRef, displayImage);
            const displayImageUrl = await getDownloadURL(displayImageRef);

            const podcastData = {
              title: title,
              description : desc,
              bannerImage: bannerImageUrl,
              displayImage: displayImageUrl,
              createdBy : auth.currentUser.uid,
             };

             const docRef = await addDoc(collection(db, "podcasts"), podcastData);
             setTitle("");
             setDesc("");
             setBannerImage(null);
             setDislayImage(null);
          
             toast.success("Podcast Created Successfully!");
             setLoading(false);
           
         } catch(e){
            toast.error(e.message);
            console.log(e);
            setLoading(false);
         }
        
        } else{
            toast.error("Please Enter all values");
            setLoading(false);
        }
    };

  const displayImageHandle=(file) =>{
setDislayImage(file);
  }

  const bannerImageHandle=(file) =>{
    setBannerImage(file);
      }
  return (
    <>
    <InputComponent
     state={title}
      setState={setTitle} 
      placeholder="Title"
       type="text"
       required={true}
       />
       <InputComponent 
     state={desc}
      setState={setDesc} 
      placeholder="Description"
       type="text"
       required={true}
      />

<FileInput accept={"image/*"}
 id="display-image-input"
  fileHandleFnc={displayImageHandle}
  text = {"Display Image Upload"} />

      <FileInput accept={"image/*"}
       id="banner-image-input"
        fileHandleFnc={bannerImageHandle} 
        
  text = {"Banner Image Upload"} />
        


      <Button
       text={loading ? " Loading..." : "Create Podcast"}
          disabled = {loading} 
          onClick={handleSubmit}
          />
       </>
  );
}

export default CreatePodcastForm
