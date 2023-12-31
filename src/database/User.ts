import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true, // não pode ser vazio
        select: false, // não retorna a senha
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});
User.pre("save", async function (next) {
    const hashPassword = await bcrypt.hash(this.password, 12);
    this.password = hashPassword;
    next();
})

export default mongoose.model("User", User);