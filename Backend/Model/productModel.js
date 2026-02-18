import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    id:Number,
    title:String,
    description:String

})

export default mongoose.model("Product",ProductSchema)