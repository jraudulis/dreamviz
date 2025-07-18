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
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);


  function onBtnSubmit () {
    fetch('http://localhost:5000/generate-image')
    .then(response => response.json())
    .then(result)
  }


  return (
    <>
      <Header />
      <Input />
      <Loader />
      <Image />
      <Footer />
    </>
  )
}

export default App;
