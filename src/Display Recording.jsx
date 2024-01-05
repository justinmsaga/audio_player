import React from "react";

export default function Display(props){
    const styles = {
        backgroundColor: (props.curDisp === props.name) ? "#26a5cb" : "#228b22",
        //position: "fixed",
    }

    return(
        <div
            className="box"
            style={styles}
            onClick={props.setDisp}
            >
                <h3>{props.name}</h3>
                <p>{props.length}</p>

        </div>
    )

}