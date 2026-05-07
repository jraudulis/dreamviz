import './App.css';
import  Signin from './components/signin/Signin.jsx';
import  Register from './components/register/Register.jsx';
import Nav from './components/navigation/Nav.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import History from './components/history/History.jsx';
import Input from './components/input/Input.jsx';
import Loader from './components/loader/Loader.jsx';
import Image from './components/image/Image.jsx';
import Footer from './components/footer/Footer.jsx';
import ErrorMessage from './components/errormessage/ErrorMessage.jsx';
import SuccessMessage from './components/successmessage/SuccessMessage.jsx';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './components/confirmModal/ConfirmModal.jsx';


function App() {

  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch request for user details on the page refresh
  useEffect(()=> {

    setIsLoading(true);

    const fetchMe = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if(!res.ok) {
        setIsLoading(false);
        return;
      }

      const user = await res.json();
      setUser(user);
      setIsLoading(false);
      navigate('/home');
    } catch(err) {
      setIsLoading(false);
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

    fetchMe();
  }, []);

// Clear error state if there is any error displayed for longer than 7s
useEffect(()=> {
  if (!error) return;

  const timer = setTimeout(()=> setError(null), 5000);
  return ()=> clearTimeout(timer);
}, [error]);

// Clear success message state if there is any messge displayed longer than 7s
useEffect(()=> {
  if(!successMessage) return;

  const timer = setTimeout(()=> setSuccessMessage(null), 5000);
  return ()=> clearTimeout(timer);
}, [successMessage]);

// fetch history data
  const fetchHistory = async () => {

    setIsLoading(true);
    try{
      const res = await fetch(`${API_URL}/history`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    });

    if (!res.ok) {
      setError('History request faield');
      return;
    }

    const data = await res.json();
    setHistory(data);
    setIsLoading(false);
    } catch(err){
      setError('Network error - please try again later');
    } finally {
      setIsLoading(false);
    }
    
  }
  // Function to initiate delete modal and populate state with data
  const handleDeleteClick = (image) => {
    setConfirmData({
      message: 'Delete this image?',
      onConfirm: () => handleDelete(image)
    });
  };

  // Fetch request to delete selected image data from database
  const handleDelete = async (image) => {

    try{

      const res = await fetch(`${API_URL}/delete/${image.id}`,{
        method: 'delete',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });

      const data = await res.json();
      setSuccessMessage('Image Deleted');
      fetchHistory();

    } catch(err) {
      console.log('delete request error');
    }     
  }

// Function for logging out user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/landing-page");
  }
// Function to convert base64 data in to file
  const base64ToFile = (image) => {

      const base64String = image;
      const [metadata, data] = base64String.split(',');

      const mimeType = metadata.match(/:(.*?);/)?.[1] || 'image/webp';
      const extension = mimeType.split('/')[1];

      const binaryData = atob(data);
      
      const bytesData = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        bytesData[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([bytesData], {type: mimeType});
      return new File([blob], `image.${extension}`, {type: mimeType});
    }

  async function shareImage(image) {

    const file = base64ToFile(image);

   if(navigator.share)
    try {
      await navigator.share({
        files: [file]
      });
    }catch (err) {
      console.log(err);
    }
  }

    const downloadImage = (image) => {

      const dlink = document.createElement('a');
      dlink.download = 'dreamviz image'
      dlink.href = image;
      dlink.click();
    };

// Fetch image api
  async function onBtnSubmit(input) {

  setError(null);
  setIsLoading(true);
  
  try {
    const response = await fetch(`${API_URL}/generate-image`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
       },
        body: JSON.stringify({
        prompt: input, 
      })
    });
    
    const result = await response.json();

    if(!response.ok) {
    setError(result.error);
    setIsLoading(false);
    return;
    }
    
    setImage(result.image);
    setIsLoading(false);
  } catch (err) {
    console.error('Fetch error:', err);
    setIsLoading(false);
  }
}

if (isLoading) {
  return < Loader />
}

  return (
    <>

      {/* Global animated background decorations */}
      <div className="bg-decoration"></div>
      <div className="bg-decoration-2"></div>
    
      {successMessage && <SuccessMessage message={successMessage} />}
      {error && <ErrorMessage message={error} />}

      {/* Conditional rendering of modal to delete imnages */}
      {confirmData && (
        <ConfirmModal
          message={confirmData.message}
          onConfirm = { ()=> {confirmData.onConfirm();
          setConfirmData(null);
          }}
          onCancel={ ()=> setConfirmData(null)}
        />
      )}
      <Routes>
        {/* Default page when user opens website */}
        <Route path="/" element={<LandingPage />} />

        {/* Signing and register routes */}
        <Route path="/signin" element={<Signin setUser={setUser} setError={setError} setIsLoading={setIsLoading} />} />
        <Route path="/register" element={<Register setUser={setUser} setError={setError} setIsLoading={setIsLoading} />} />

        {/* Ternary operator with condition of user state, if it's not null to show main page else redirect to signin */}
        <Route path="/home" element={
        user ? (
          <>
            <Nav user={user} fetchHistory={fetchHistory} logout={logout} />
            <Image image={image} setImage={setImage} shareImage={shareImage} downloadImage={downloadImage} />
            <Input onBtnSubmit={onBtnSubmit} />
            <Footer />
          </>
          ) : ( <Navigate to="/" replace/> )
          }
        />
        
        <Route path="/history" element={
          user ? (
            <>
              <Nav user={user} fetchHistory={fetchHistory} logout={logout} />
              <History history={history} handleDeleteClick={handleDeleteClick} shareImage={shareImage} downloadImage={downloadImage} />
            </>
         ) : ( <Navigate to="/" replace /> )
         } 
         />
      </Routes>
    </>
  )
}

export default App;
