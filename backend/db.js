import mongoose from "mongoose";

export const Connection = async () => {
    const URL =
        "mongodb+srv://anjali:anjali1829@stackoverflow-clone.tj2fnii.mongodb.net/?retryWrites=true&w=majority&appName=StackOverFlow-clone";
    try {
        await mongoose.connect(URL);
        console.log("database connected");
    } catch (error) {
        console.log("Error while connecting to db", error.message);
    }
};

export default Connection;
