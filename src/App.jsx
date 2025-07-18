import './App.css'
import Header from './components/header/Header.jsx';
import Input from './components/input/Input.jsx';
import Loader from './components/loader/Loader.jsx';
import Image from './components/image/Image.jsx';
import Footer from './components/footer/Footer.jsx';

import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const response = await axios.post('')


function App() {

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
