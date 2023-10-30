import React from "react";


export default function Media(props){
    const styles ={
        padding: "20px",
        //position: "fixed",
        //left: "0px",
        //bottom: 0px",
        //display: "block"

    }


    return(
        <div 
            className="media"
            style={styles}
        >
            <audio src={`https://arweave.net/${props.link}`} controls></audio>
            <h2>{props.desc}</h2>
        </div>
    )
}