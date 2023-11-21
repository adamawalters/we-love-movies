const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {

    const is_showing = req.query.is_showing;

    if(is_showing === "true") {
        res.json({data : await service.listShowing()}) 
    } else {
        res.json({data : await service.list()})
    }

}


/*Validations */

function movieExists(req, res, next) {
    
}



module.exports = {
    list: asyncErrorBoundary(list),
}