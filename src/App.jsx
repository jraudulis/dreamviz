import './App.css';
import Header from './components/header/Header.jsx';
import History from './components/history/History.jsx';
import Input from './components/input/Input.jsx';
import Loader from './components/loader/Loader.jsx';
import Image from './components/image/Image.jsx';
import Footer from './components/footer/Footer.jsx';
import ErrorMessage from './components/errormessage/ErrorMessage.jsx';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  const [description, setDescription] = useState('');
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  function addToHistory(input, image){
    setHistory(history =>[{input, image}, ...history]);
    console.log(history);
  }

  function handleDelete(itemToDelete, afterDeleteCallBack ) {
    if( confirm('Delete this item?') === true ){
      setHistory(prevHistory => prevHistory.filter(item => item !==itemToDelete));
      afterDeleteCallBack();
    }
    
  }

  const base64ToUrl = (image) => {
      const base64String = image;
      const [metadata, data] = base64String.split(',');

      const binaryData = atob(data);
      
      const bytesData = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        bytesData[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([bytesData], {type: 'image/png'});
      return new File([blob], '.png', {type: 'image/png'});
    }

  async function shareImage(image) {

    const file = base64ToUrl(image);

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

      const blob = base64ToUrl(image);

      const dlink = document.createElement('a');
      dlink.download = 'downloaded-image.png';
      dlink.href = window.URL.createObjectURL(blob);
      dlink.onclick = function(e) {
        const that = this;
        setTimeout(function(){
          window.URL.revokeObjectURL(that.href);
        }, 1500);
      }

      dlink.click();
    }

  useEffect(()=> {
    if(history.length > 0) {
      localStorage.setItem('History', JSON.stringify(history));
    }
  }, [history]);

  useEffect(()=>{
  try {
    const savedHistory = JSON.parse(localStorage.getItem('History'));
    if (savedHistory) {
      setHistory(savedHistory);
    }
  } catch (error) {
    console.error('Failed to load history from localStorage:', error);
  }
}, []);

  async function onBtnSubmit(input) {

  setError(null);
  setIsLoading(true);
  
  try {
    const response = await fetch('http://localhost:5000/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({prompt: input})
    });
    
    const result = await response.json();

    if(!response.ok) {
    setError(result.error);
    setIsLoading(false);
    return;
    }
    
    setImage(result.image);
    addToHistory(input, result.image)
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
    <Router>
      <Routes>
        <Route path="/" element={
        <>
          <Header />
          <Image image={image} />
          <Input onBtnSubmit={onBtnSubmit} />
          {error && <ErrorMessage message={error} />}
          <Footer />
        </>
        }
        />
        <Route path="/history" element={< History history={history} handleDelete={handleDelete} shareImage={shareImage} downloadImage={downloadImage} />} />
      </Routes>
    </Router>
  )
}

export default App;
