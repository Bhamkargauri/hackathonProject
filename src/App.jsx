import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRecipeAdded = () => {
    setRefresh(!refresh);
  };
  return (
    <>
      <Navbar />
      <Outlet context={{ handleRecipeAdded, refresh }} />
      <Footer />
    </>
  );
}

export default App