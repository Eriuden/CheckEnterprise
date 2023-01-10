const userModel = require ("../models/user.model")
const ObjectId = require("mongoose").Types.ObjectId

//-password permet d'éviter d'afficher le password, on l'exclut
//on peut dire qu'on le soustrait, donc -

module.exports.getAllUsers = async(res) => {
    const users = await userModel.find().select("-password")
    res.status(200).json(users)
}

module.exports.getUser = (req,res) => {
    console.log(req.params)
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)

    userModel.findById(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log("id unknown:" + err)
    }).select("-password")
}

module.exports.updateUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    try {
        await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    bio: req.body.bio,
                }
            },
            { new:true, upsert:true, setDefaultsOnInsert:true},

            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({message: err})
            }
        )
    } catch(err){
        return res.status(500).json({message: err})
    }
}

/*Si c'est pas objectId, et on lui précise en paramètre l'id
il nous renvoie une erreur 400 en nous indiquant qu'il ne connait l'id
*/
module.exports.deleteUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    try{
        await userModel.remove({ _id: req.params.id}).exec()
        res.status(200).json({ message: "Vous êtes viré !"})
    } catch(err) {
        return res.status(500).json({message: err})
    }
}