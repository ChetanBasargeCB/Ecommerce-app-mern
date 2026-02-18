import Product from "../Model/productModel.js"


// get all product 
export const getProductController = async(req,res)=>{
    try {
        const data = await Product.find().limit(20).skip(20)
        if(!data) return res.status(500).json({message:"Server error"})

        return res.json({data})
        
    } catch (error) {
        console.log("Product fetching error",error)
    }
}


// add new product
export const addProductController = async(req,res)=>{
    const{id,title,description} = req.body
    console.log(id,title,description)
    await Product.create({
        id,
        title,
        description
    })

  return  res.status(200).json({message:"Product added"})

}



