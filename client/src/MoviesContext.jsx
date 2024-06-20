import React, { createContext, useContext } from 'react';

const MoviesContext = createContext();

export const MoviesProvider = ({ children, movies }) => {
    return (
        <MoviesContext.Provider value={movies}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => {
    return useContext(MoviesContext);
};
