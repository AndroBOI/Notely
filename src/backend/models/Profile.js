import mongoose from "mongoose"

const ProfileSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {timestamps: true})



const Profile = mongoose.model("Profile", ProfileSchema)

export default Profile