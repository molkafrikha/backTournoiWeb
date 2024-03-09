module.exports = class Controller_crud {
    constructor(meta) {
        const { service } = meta
        this.methods = {
            add: async (req, res) => {
                try {
                    const instance = await service.create(req.body)
                    res.status(201).send({ message: "Article created successfullys", instance })
                } catch (err) {
                    console.log(err)
                    res.status(400).send({ "error": err })
                }
            },
            update: async (req, res) => {
                try {
                    const { id } = req.params
                    const instance = await service.update(id, req.body)
                    res.status(200).send({ instance })
                } catch (err) {
                    console.log(err)
                    res.status(400).send({ "error": err })
                }
            },
            remove: async (req, res) => {
                try {
                    const { id } = req.params
                    await service.delete(id)
                } catch (err) {
                    console.log(err)
                    res.status(400).send({ "error": err })
                }
            },
            get_all: async (req, res) => {
                try {
                    const params = { ...req.query }
                    const docs = await service.get_all(params)
                    res.status(200).send({ ...docs})
                } catch (err) {
                    console.log(err)
                    res.status(400).send({ "error": err })
                }
            },
            get_all_put: async (req, res) => {
                try {
                    const { params, populate } = req.body
                    const docs = await service.get_all_put(params, populate)
                    res.status(200).send({ ...docs})
                } catch(err){
                    console.log(err)
                    res.status(400).send({ "error" : err})
                }
            },
            get_one: async (req, res) => {
                try {
                    const { id } = req.params
                    const params = { ...req.query }
                    const instance = await service.get_one(id, params)
                    res.status(200).send({ instance })
                } catch (err) {
                    console.log(err)
                    res.status(400).send({ "error": err })
                }
            },
            get_one_put: async (req, res) => {
                try {
                    const { id } = req.params
                    const { populate } = req.body
                    const instance = await service.get_one(id, populate)
                    res.status(200).send({ instance })
                } catch (err) {
                    console.log(err)
                    res.status(400).send({ "error": err })
                }
            },
            find_one: async (req, res) => {
                try {
                    const params = { ...req.query }
                    const instance = await service.find_one(params)
                    res.status(200).send({ instance })
                } catch(err){
                    console.log(err)
                    res.status(400).send({ "error" : err})
                }
            }
        }
    }
}