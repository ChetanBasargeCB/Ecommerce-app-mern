import express from 'express'
import { addProductController, getProductController } from '../Controller/ProductController.js'

export const productRouter = express.Router()

productRouter.post("/product",addProductController)

productRouter.get("/product",getProductController)