import { Router, Request, Response } from "express";

const cart = Router()

cart.get('/', (req:Request,res: Response)=>{
    res.json({
        msg:"todo bien"
    })
});

export default cart