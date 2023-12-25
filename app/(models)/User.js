import mongoose, { Schema } from "mongoose"

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO);
        console.log("Connected MONGODb", connection);
    } catch (err) {
        console.log("Error in connecting");
    }
}

connectDb();

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;