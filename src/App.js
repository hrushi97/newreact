
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import SignUpPage from './pages/SignUp';
import Profile from './pages/Profile';  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { setUser } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/common/Button/PrivateRoutes';
import CreateAPodcastPage from './pages/CreateAPodcast';
import PodcastsPage from './pages/Podcasts';
import PodcastDetailsPage from './pages/PodcastDetails';
import CreateAnEpisodePage from './pages/CreateAnEpisode';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if(user){
        const unsubscripeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) =>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name : userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return() =>{
          unsubscripeSnapshot();
        };
      }
    });
    return() => {
      unsubscribeAuth();
    }
  }, 
  []);
  return (
  <div className="App">
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element ={<SignUpPage />} />
        <Route element ={<PrivateRoutes />} >
        <Route path="/profile" element ={<Profile />} />
        <Route path="/create-a-podcast" element ={<CreateAPodcastPage />} />
        <Route path="/podcasts" element ={<PodcastsPage />} />
        <Route path="/podcasts/:id" element ={<PodcastDetailsPage />} />
        <Route path="/podcast/:id/create-episode" element ={< CreateAnEpisodePage />} />
        </Route>
       </Routes>
          
       </Router>
     </div>
  );
}
export default App;
