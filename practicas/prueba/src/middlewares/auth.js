import Config from '../config'


const checkAdmin = (req, res, next)=> {
	if(!Config.admin)
	return res.status(401).json({
		msg: "No estas autorizado para ingresar"
	})

	next();
}

export default checkAdmin