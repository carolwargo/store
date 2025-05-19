// ./src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Lazy-loaded pages
const Homepage = lazy(() => import("./pages/Homepage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage"));



function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/blog">
        <ErrorBoundary>
          <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
       
              <Route path="*" element={<NotFound />} />
           {/** <Route path="/home" element={<HomeLayout />}>
                <Route index element={<UserHome />} />
                <Route path="newsfeed" element={<Newsfeed />} />
                <Route path="explore" element={<Explore />} />
              </Route>
              */}   
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

function NotFound() {
  console.error("Page not found!");
  return <h1 className="text-center mt-5">404 - Not Found</h1>;
}

export default App;
