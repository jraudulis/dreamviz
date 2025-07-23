import './App.css'
import Header from './components/header/Header.jsx';
import Input from './components/input/Input.jsx';
import Loader from './components/loader/Loader.jsx';
import Image from './components/image/Image.jsx';
import Footer from './components/footer/Footer.jsx';
import { useState } from 'react';


function App() {

  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);


  async function onBtnSubmit(input) {
  setIsLoading(true);
  
  try {
    const response = await fetch('http://localhost:5000/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({prompt: input})
    });
    
    const result = await response.json();
    setImage(result.image);
    setIsLoading(false);
  } catch (err) {
    console.error('Fetch error:', err);
    setIsLoading(false);
  }
}


  return (
    <>
      <Header />
      <Input onBtnSubmit={onBtnSubmit} />
      <Loader />
      <Image image={image} />
      <Footer />
    </>
  )
}

export default App;
