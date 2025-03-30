import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Profile from "./models/Profile.js";

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/NotelyDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.error("Error connecting to Database",err))

app.post('/add-profile', async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if(!fullName || !email || !password) {  
            return res.status(400).json({error: "All fields are required"})
        }



        const newProfile = new Profile({fullName, email, password})
        await newProfile.save()
        res.status(201).json({msg: "Your Profile is registered successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})


app.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body
        const profile = await Profile.findOne({email})

        if(!profile) return res.status(404).json({ error: "User not found"})

        if(profile.password !== password) return res.status(401).json({ error: "Invalid password" });

        res.status(200).json({ msg: "Login successful", user: { fullName: profile.fullName, email: profile.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


app.listen(3000, ()=> console.log("Server is running on port 3000"))