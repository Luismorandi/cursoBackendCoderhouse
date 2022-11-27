import Config from '../config/index.js'


const checkAdmin = (req, res, next)=> {
	if(!Config.admin)
	return res.status(401).json({
		msg: "No estas autorizado para ingresar"
	})

	next();
}

export default checkAdmin