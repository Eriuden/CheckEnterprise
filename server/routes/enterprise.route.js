const router = require("express").Router()

const enterpriseController = require ("../controllers/enterprise.controller")
const multer = require("multer")
const upload = multer

router.get("/", enterpriseController.getEnterprise)
router.post("/", upload.single("file"), enterpriseController.createEnterprise)
router.put("/:id", enterpriseController.updateEnterprise)
router.delete("/:id", enterpriseController.deleteEnterprise)
router.patch("/like-enterprise/:id", enterpriseController.likeEnterprise)
router.patch("/unlike-enterprise/:id", enterpriseController.unlikeEnterprise)
router.patch("/dislike-enterprise/:id", enterpriseController.dislikeEnterprise)
router.patch("/undislike-enterprise/:id", enterpriseController.undislikeEnterprise)

router.patch("/comment-enterprise/:id", enterpriseController.commentEnterprise)
router.patch("/edit-comment/:id", enterpriseController.editComment)
router.patch("/delete-comment/:id", enterpriseController.deleteComment)

module.exports = router