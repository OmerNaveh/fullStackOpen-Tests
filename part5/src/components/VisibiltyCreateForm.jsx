import { useState } from "react"
import React from "react";

export default function VisiblityCreateForm(props){
    const [visible,setVisible]= useState(false)
    const showForm = ()=>{
        setVisible(!visible);
    }
    if(visible)
        return(
            <div>
                {/* used to pass prop to the child element */}
                {React.cloneElement(props.children,{setVisible:setVisible})}
                <button onClick={()=>showForm()}>cancel</button>
            </div>
        )
    else return(
        <div>
            <button id='addBlog' onClick={()=>showForm()}>Add Blog</button>
        </div>
    )
}