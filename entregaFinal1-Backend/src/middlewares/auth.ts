import Config from '../config'
import {Request, Response, NextFunction } from 'express'

const checkAdmin = (req: Request, res: Response, next: NextFunction)=> {
	if(!Config.admin)
	return res.status(401).json({
		msg: "No estas autorizado para ingresar"
	})

	next();
}

export default checkAdmin