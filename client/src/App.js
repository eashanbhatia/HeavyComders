import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Carousel from './components/Carousel';

import Video from './components/Video';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { createContext, useContext } from 'react';
import { MoviesProvider } from './MoviesContext';  //Context created for movies

import { ClickedProductsProvider } from './ClickedProductsContext';
import Viewed from './components/Viewed';

function App() {

  const moviesList = [
    {
      id: '1',
      imageUrl:
        'https://m.media-amazon.com/images/S/pv-target-images/a11e1b2ce890227c2e167b8c6263833890f48c5319d6e4f1c161d7525c7103fc.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
    },
    {
      id: '2',
      imageUrl:
        'https://www.adgully.com/img/800/202302/khatija-lokhandwala-2023-02-13t132749-383.png.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
    },
    {
      id: '3',
      imageUrl:
        'https://m.media-amazon.com/images/S/pv-target-images/a11e1b2ce890227c2e167b8c6263833890f48c5319d6e4f1c161d7525c7103fc.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
    },
    {
      id: '4',
      imageUrl:
        'https://m.media-amazon.com/images/S/pv-target-images/a11e1b2ce890227c2e167b8c6263833890f48c5319d6e4f1c161d7525c7103fc.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=iW4AzQUqHYY'
    }
  ]

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <BrowserRouter>
      <ClickedProductsProvider>
          <MoviesProvider movies={moviesList}>
            <Navbar />
            {/* <Banner /> */}
            {/* <Carousel /> */}

            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/viewed' element={<Viewed />}></Route>
              <Route path='/video/:id' element={<Video />}></Route>
              
              {/* <Route path='/carousel' element={<Carousel moviesList={moviesList} />}></Route> */}
              {/* <Route path='/Carousel' element={<Carousel moviesList={moviesList}>}</Route> */}
            </Routes>
          </MoviesProvider>
          </ClickedProductsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
