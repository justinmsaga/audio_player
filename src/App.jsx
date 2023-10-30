import React from "react";
import Play from "./Player"
import Media from "./Media";
import Display from "./Display Recording";
import field from "./Field Recording.js"
import wind from "./Wind Recording.js"

//const data = require('./field.json')
//console.log(data)

//add display to data
let inAppField = field.map(file => {
    return {...file, display: false, type: "field"}
})

let inAppWind = wind.map(file => {
    return {...file, display: false, type: "wind"}
})

let recordType =[
    {
        id: 0,
        name: "field recording",
        display: false

    },
    {
        id: 1,
        name: "wind recording",
        display: false

    }
]

let defaultMedia ={
            fileLinkTo: "B2nYw9URD4fYF_CSCLdMKWA5_CCjnRrDdC95cMogaUk",
            fileDesctiption: "select audio"

}

export default function App(){
    //add state to select file type
    const [display, setDisplay] = React.useState(recordType)
    const [showType, setShowType] = React.useState("field recording")

    //add state to files and media
    const [field, setField] = React.useState(inAppField)
    const [wind, setWind] = React.useState(inAppWind)
    const [playMedia, setPlayMedia] = React.useState(defaultMedia)

    //update display type

    //update media link
    function updateMedia(link,des){
        setPlayMedia(prevMedia => {
            return { fileLinkTo: link, fileDesctiption: des}
        })
    }
    function updateTypeColor(name){
            setDisplay(prevDisp =>{
                return prevDisp.map((disp)=>{
                    setShowType(name)
                    setPlayMedia(defaultMedia)
                    return disp.name === name ? {...disp, display: !disp.display} : disp
                })
            })
    }

    //update display color
    function updateColor(link, des, type){
        if(type === "field"){
         setField(prevFile => {
                return prevFile.map((file) => {
                            updateMedia(link, des)
                            return file.location === link ? {...file, display: !file.display} : file
                })
            })
        } else{
            setWind(prevFile => {
                return prevFile.map((file) => {
                            updateMedia(link, des)
                            return file.location === link ? {...file, display: !file.display} : file
                })
            })
        }
    }

    const recType = display.map(disp =>{
        return<Display
                key={disp.id}
                name={disp.name}
                curDisp={showType}
                setDisp={() => updateTypeColor(disp.name)}
            />
    })

    //array of audio files from data
    const soundFile = field.map(file => {
        return <Play 
                    key={file.id}
                    name={file.name}
                    curLink={playMedia.fileLinkTo}
                    location={file.location}
                    setFiles= {() => updateColor(file.location, file.description, file.type)}
                />
    })

    const windFile = wind.map(file =>{
        return <Play
                    key={file.id}
                    name={file.name}
                    curLink={playMedia.fileLinkTo}
                    location={file.location}
                    setFiles= {() => updateColor(file.location, file.description, file.type)}
                />


    } )

    let show = (showType === "field recording" ? soundFile : windFile)

     const style = {
        position: "fixed",
        height: "100%",
        width: "40%",
        backgroundColor: "white"
    }

    const mediaStl ={
        position: "relative",
        left: "40%",
        width: "60%"
    }

    //return file and media
    return(
        <div>
            <div
                style = {style}
            >
            <a href="https://baked.cloud/about/who.html">recorded by bushsk8r</a>
            <p class="subheading">[this is a prototype...also free Palestine]</p>
            <h1 class="title">jukebox</h1>
            {recType}
            <Media
                link={playMedia.fileLinkTo}
                desc={playMedia.fileDesctiption}
             />
             </div>
             <div style={mediaStl}>
            {show}
            </div>
        </div>
    )
}