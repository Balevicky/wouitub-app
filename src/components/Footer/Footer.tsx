/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/04/2025 09:20:31
*/
import React, { FC, useEffect } from 'react';
import './Footer.css';


interface FooterProps {
 
}


const Footer : FC<FooterProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="Footer">
          Footer Component
      </div>
  );
}

export default Footer;