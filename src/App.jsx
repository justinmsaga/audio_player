import React, { useEffect } from "react";
import Play from "./Player"
import Media from "./Media";
import Display from "./Display Recording";


//loading placeholder
let template = [{
    id: 0,
    name: "loading",
    location : null,
    description: "loading",
    display: false,
    type: "wind"
}
] 

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

    },
    {
        id: 2,
        name: "echo chamber",
        display: false
    }
]

let defaultMedia ={
            fileLinkTo: "https://arweave.net/B2nYw9URD4fYF_CSCLdMKWA5_CCjnRrDdC95cMogaUk",
            fileDesctiption: "select audio"

}

export default function App(){
    //add state to select file type
    const [display, setDisplay] = React.useState(recordType)
    const [showType, setShowType] = React.useState("field recording")

    //add state to files and media
    const [field, setField] = React.useState(template)
    const [wind, setWind] = React.useState(template)
    const [echo, setEcho] = React.useState(template)
    const [playMedia, setPlayMedia] = React.useState(defaultMedia)

    //get files
    const fetchJson = () =>{
        fetch('https://msaga.cloud/archive/recording.json')
            .then(response => {return response.json()})
            .then(data =>{
                setField(data["wood_recordings"].tracks.map(track =>{
                    return {...track, display: false, type: "field"}
                }))
                setWind(data["wind_recording"].tracks.map(track =>{
                    return {...track, display: false, type: "wind"}
                }))
                setEcho(data["echo_chamber"].series_1.vol_1.map(track =>{
                    return {...track, display: false, type: "echo"}
                }))
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() =>{
        fetchJson()
    }, [])


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
        switch(type){
            case 'field':
                setField(prevFile => {
                    return prevFile.map((file) => {
                        updateMedia(link, des)
                        return file.location === link ? {...file, display: !file.display} : file
                    })
                })
                break

            case 'wind':
                setWind(prevFile => {
                    return prevFile.map((file) => {
                        updateMedia(link, des)
                        return file.location === link ? {...file, display: !file.display} : file
                    })
                })
                break

            case 'echo':
                setEcho(prevFile =>{
                    return prevFile.map((file) => {
                        updateMedia(link,des)
                        return file.location === link ? {...file, display: !file.display} : file
                    })
                })
                break
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

    //array of audio files to be displayed from data
    function updatePlay(files){
        return files.map(file =>{
            return <Play
                    key={file.id}
                    name={file.name}
                    curLink={playMedia.fileLinkTo}
                    location={file.location}
                    length={file.length}
                    setFiles={() => updateColor(file.location, file.description, file.type)}
                />
        })
    }

    let show = (sT) => {
        if(sT === "field recording")
                return updatePlay(field)

        if(sT === "wind recording")
                return updatePlay(wind)

        if(sT === "echo chamber")
                return updatePlay(echo)
    }


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
            <div style = {style}>
                <p>*January sessions</p>
                <h1 class="title">jukebox</h1>
                {recType}
                <Media
                    link={playMedia.fileLinkTo}
                    desc={playMedia.fileDesctiption}
                />
                <a href="https://baked.cloud/about/who.html">recorded by bushsk8r</a>
                <p class="subheading">[this is a prototype...also why war?]</p>
             </div>

             <div style={mediaStl}>
                {show(showType)}
            </div>
        </div>
    )
}