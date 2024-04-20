module.exports = class Crud {
    constructor(meta) {
        const { paths, model } = meta
        this.methods = {
            create: async (inputs) => {
                const fields = Object.keys(inputs).reduce((acc, i) => {
                    if (paths.includes(i)) {
                        acc[i] = inputs[i]
                    }
                    return acc
                }, {})
                return await model.create({ ...fields })
            },
            update: async (search, inputs) => {
                const fields = Object.keys(inputs).reduce((acc, i) => {
                    if (paths.includes(i)) {
                        acc[i] = inputs[i]
                    }
                    return acc
                }, {})
                console.log(fields)
                return await model.findOneAndUpdate(search, fields)
            },
            update_id: async (id, inputs) => {
                const fields = Object.keys(inputs).reduce((acc, i) => {
                    if (paths.includes(i)) {
                        acc[i] = inputs[i]
                    }
                    return acc
                }, {})
                console.log(fields)
                return await model.findByIdAndUpdate(id, fields)
            },
            delete: async (id) => {
                return await model.findByIdAndDelete(id)
            },
            get_all: async (params) => {
                const selected_params = params ? Object.keys(params).reduce((acc, key) => {
                    if (paths.includes(key)) {
                        acc[key] = params[key]
                    }
                    return acc
                }, {}) : {}
                const populate_arr = (params && Object.prototype.hasOwnProperty.call(params, 'populate'))
                    ? params.populate.split("|") : []
                console.log(params)
                return await model.find(selected_params).then(async (docs) => {
                    let res = {}
                    for (const field of populate_arr) {
                        let i = 0
                        for (const doc of docs) {
                            res[i] = await doc.populate(field)
                            i++
                            console.log(res[i], i)
                        }
                    }
                    return (res[0] != null) ? res : docs
                })
            },
            get_all_put: async (params, populate) => {
                const selected_params = params ? Object.keys(params).reduce((acc, key) => {
                    if (paths.includes(key)) {
                        acc[key] = params[key]
                    }
                    return acc
                }, {}) : {}
                const docs = await model.find(selected_params)
                if(populate){
                    const populate_arr = Object.values(populate)
                    const populatedDocs = await Promise.all(populate_arr.map(field => {
                        return model.populate(docs, { path: field });
                    }))
                    return populatedDocs.flat()
                }
                return docs
            },
            find_id: async (id, params) => {
                const populate_arr = (params && Object.prototype.hasOwnProperty.call(params, 'populate'))
                    ? params.populate.split("|") : []
                return await model.findById(id).then(async (doc) => {
                    let res = null
                    for (const field of populate_arr) {
                        res = await doc.populate(field)
                    }

                    return res ? res : doc
                })
            },
            find_one: async (params) => {
                const selected_params = params ? Object.keys(params).reduce((acc, key) => {
                    if (paths.includes(key)) {
                        acc[key] = params[key]
                    }
                    return acc
                }, {}) : {}
                console.log(selected_params)
                return await model.findOne(selected_params)
            },
            insert_many: async (arr) => {
                return await model.insertMany(arr)
            }
        }
    }
}