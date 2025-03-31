import React from 'react'
import centerImage from '../assets/Group 84 1.png'
import '../styles/Home.css'
import { Link } from "react-router-dom";
import { Ellipsis, Search } from 'lucide-react';

export default function Home({ notes }) {


    return (
        <div className='wrapper wrapper-home'>
            <div className="menu">
                <Ellipsis strokeWidth={4} />
                <div className="title-home">{notes.length === 0 ? "All Notes" : "Recent Notes"}</div>
                <Search strokeWidth={4} />
            </div>


            {
                notes.length === 0 ? (
                    <>
                        <div className="center-image home-image"><img className='img' src={centerImage} alt="" /></div>

                        <div className="texts create-note-texts">
                            <span className="bold-text">Create Your First Note</span>
                            Add a note about everything (your thoughts on climate change, or your history essay) and share it with the world.
                        </div>




                    </>

                ) : (

                    <div className='note-wrapper'>
                        {notes.map((note, index) => (
                            <div key={index} className='note-container'>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                            </div>
                        ))}
                    </div>
                )
            }


            <div className="footer">
                <Link className='link create-note' to='/create-note'><button className="get-started create-btn">Create A Note</button></Link>
                <Link className="sign-in link import" to='login'>Import Notes</Link>
            </div>

        </div>
    )
}
