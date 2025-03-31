import { ChevronLeft, Check } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/CreateNote.css'

export default function CreateNote({setNotes}) {
    const[title, setTitle] = useState("")
    const[content, setContent] = useState("")
    const navigate = useNavigate()

    const save =() => {
        if(!title.trim()) return
        setNotes(prevNotes => [...prevNotes, {title, content}])
        navigate('/home')
    }

  return (
    <div className='wrapper'>
        <div className="menu">
            <Link to='/home'><ChevronLeft  strokeWidth={4}/></Link>
            <div className="title-home">Create Note</div>
            <Check onClick={save}  strokeWidth={4}/>
        </div>
        <textarea
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Add a Title' className='textarea1' name="" id=""></textarea>
        <textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder='Your note...' className='textarea2'  name="" id=""></textarea>
    
    </div>
  )
}
