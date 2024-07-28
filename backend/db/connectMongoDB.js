import mongoose from "mongoose";

export default async function connectMongoDB(){
      try{
            await mongoose.connect(process.env.MONGO_URL);
            console.log("DB connected successfully")
      }catch(error){
            console.log("Error on connecting the database",error.message)
      }
}