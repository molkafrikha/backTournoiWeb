const model = require("../models/participant")
const paths = Object.keys(model.schema.paths)

const crud_class = require("./default_crud")
const crud = new crud_class({ paths, model })

const service = {
    ...crud.methods
}

module.exports = service