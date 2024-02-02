import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Database Connected`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}
export default dbConnect;