import mongoos, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    handle: string;
    description: string;
    image: string;
    links: string;
}

const  userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    image: {
        type: String,
        default: '',
        trim: true,
    },
    links: {
        type: String,
        default: '[]',
    }
})

const User = mongoos.model<IUser>("User", userSchema);
export default User;
