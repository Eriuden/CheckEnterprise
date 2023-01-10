const userModel = require("../models/user.model")
const enterpriseModel = require("../models/enterprise.model")
const ObjectId = require("mongoose").Types.ObjectId
const fs = require("fs")
const {promisify} = require("util")
const { uploadErrors } = require("../utils/errors.utils")
const pipeline = promisify(require("stream").pipeline)

module.exports.getEnterprise = async(req,res) => {
    let fileName

    if (req.file != null) {
        try {
            if (
                req.file.detectedMimeType != "image.jpg" &&
                req.file.detectedMimeType != "image.png" &&
                req.file.detectedMimeType != "image.jpeg" 
            )
                throw Error("invalid file")
            if (req.file.size > 500000) throw Error("taille maximale dépassée")
        } catch (err) {
            const errors = uploadErrors(err)
            return res.status(201).json({errors})
        }
        fileName = req.body.posterId + Date.now() + "jpg"

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/enterpriseImage/${fileName}`
            )
        )
    }

    const newEnterprise = new enterpriseModel({
        enterpriseName: req.body.enterpriseName,
        socialSiege : req.body.socialSiege,
        capital: req.body.capital,
        likers:[],
        dislikers:[],
        comments:[],
    })

    try {
        const enterprise = await newEnterprise.save()
        return res.status(201).json(enterprise)
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.updateEnterprise = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknwon:" + req.params.id)

    const updatedRecord = {
        enterpriseName: req.body.enterpriseName,
        socialSiege: req.body.socialSiege,
        capital: req.body.capital
    }

    enterpriseModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord},
        { new:true },
        (err,docs) => {
            if (!err) res.send(docs)
            else console.log("update errors:" + err)
        }
    )
}

module.exports.deleteEnterprise = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    enterpriseModel.findByIdAndRemove(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log("delete error:" + err)
    })
}

module.exports.likeEnterprise = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.staus(400).send("ID unknown :" + req.params.id)
    
        try {
            await enterpriseModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likers: req.body.id}
                },
                { new : true},
                (err,docs) => {
                    if (err) return res.status(400).send(err)
                }
            )
            await userModel.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: { likes: req.params.id},
                },
                { news: true },
                (err,docs) => {
                    if (!err) res.send(docs)
                    return res.status(400).send(err)
                }
            )
        } catch(err) {
            return res.status(400).send(err)
        }
}

module.exports.dislikeEnterprise = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.staus(400).send("ID unknown :" + req.params.id)
    
        try {
            await enterpriseModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { dislikers: req.body.id}
                },
                { new : true},
                (err,docs) => {
                    if (err) return res.status(400).send(err)
                }
            )
            await userModel.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: { dislikes: req.params.id},
                },
                { news: true },
                (err,docs) => {
                    if (!err) res.send(docs)
                    return res.status(400).send(err)
                }
            )
        } catch(err) {
            return res.status(400).send(err)
        }
}

module.exports.unlikeEnterprise = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(" ID unknown : " + req.params.id)

    try {
        await enterpriseModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers : req.body.id},
            },
            { new : true},
            (err,docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            res.body.id,
            {
                $pull: { likes: req.params.id},
            },
            {news : true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.undislikeEnterprise = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(" ID unknown : " + req.params.id)

    try {
        await enterpriseModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { dislikers : req.body.id},
            },
            { new : true},
            (err,docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            res.body.id,
            {
                $pull: { dislikes: req.params.id},
            },
            {news : true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.comment = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)

    try {
        return enterpriseModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterName: req.body.commenterName,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editComment = (req,res) => {
    if (ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    
        try {
            return enterpriseModel.findById(req.params.id, (err,docs) => {
                const theComment = docs.comment.find((comment) =>
                    comment._id.equals(req.body.commentId)
                )
            
                if (!theComment) return res.status(404).send("commentaire introuvable")

                theComment.text = req.body.text

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs)
                    return res.status(500).send(err)
                })
            })
        } catch {
            return res.send(400).send(err)
        }
}

module.exports.deleteComment = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    try {
        return enterpriseModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },

            { new: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        res.status(400).send(err)
    }
}



