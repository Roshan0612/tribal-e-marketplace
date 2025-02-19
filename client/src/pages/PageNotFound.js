import React from 'react'
import Layouts from '../components/Layout/Layouts'
import { Link } from "react-router-dom"; // Add this import

const PageNotFound = () => {
  return (
    <Layouts title={"goback-page not found"}>
        <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="go-home-link">Go Back to Home</Link>
      </div>
    </div>
    
    </Layouts>
  )
}

export default PageNotFound