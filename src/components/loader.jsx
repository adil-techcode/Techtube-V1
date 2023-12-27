import React from 'react';
import { CSSProperties } from 'react';
import { PulseLoader } from 'react-spinners';

const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
   }
  

const Loader = () => {



    return (
        <>

        <div  style={style} >  
            <PulseLoader
                color="#2eb62c"
                size={30}
            />
            </div>
        </>
    );
}

export default Loader;
