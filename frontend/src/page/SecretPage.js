
import React from "react";
import angelina from "../img/angelina.jpg"

export const SecretPage = () => {
    return (
       <div style={{backgroundImage: `url(${angelina})`,
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat',
           width: '100vw',
           height: '140vh',}}/>
    )
}