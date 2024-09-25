"use client"
import Link from 'next/link';
import React from 'react'
const NotFound = () => {
    return (
      <main
        className="text-center w-screen h-screen"
        style={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "28px",
          }}
        >
          Sorry, the page you requested could not be found
        </h1>
        <h4 style={{ fontSize: "24px", color: "purple" }}>
          you can add antyhing here with your own styles and languages as i
          mentioned in the article.
        </h4>
        <p style={{ fontSize: "20px" }}>
          please visit <Link href={"/"}>Home page</Link>
        </p>
      </main>
    );
  };
  export default NotFound;  


