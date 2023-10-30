import React from "react";

export default function Play(props){
    
    const styles = {
        position: "relative",
        //left: "60px",
        //width: "75%",
        backgroundColor: (props.curLink === props.location) ? "#26a5cb" : "#228b22"
    }
    //return player component
    return(
        <div
            className="box"
            style={styles}
            onClick={props.setFiles}
        >
            <p>{props.name}</p>
        </div>
)}