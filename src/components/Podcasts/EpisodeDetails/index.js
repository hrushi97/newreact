import React from 'react'
import Button from '../../common/Button'

function EpisodeDetails({index, title, description, audioFile, onClick}) {
  return (
    <div style={{width:"100%"}}>
       <h2  style={{ textAlign: "left", marginBottom: 0 }}>{index}.{title}</h2>
       <p style={{marginLeft: "1.5rem"}} className="podcast-description">
        {description}</p>
       <Button text={"Play"} onClick={ () =>   onClick(audioFile)} width={"30px"}/>
    </div>
  )
}

export default EpisodeDetails;
