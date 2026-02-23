import Product from "../Model/productModel.js"


// get all product  with pagination
export const getProductController = async(req,res)=>{
    const page = parseInt(req.query.page) || 10
    const limit = parseInt(req.query.limit) || 8
    const skip = (page-1)*limit
    // console.log("pagination", page,limit)
    try {
        const data = await Product.find().limit(limit).skip(skip)
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



