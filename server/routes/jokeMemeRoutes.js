const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/authMiddleware")

const {
    createJokeMeme,
    // editJokeMeme,
    deleteJokeMeme,
} = require("../controllers/jokeMemeController")

const {
    laughJokeMeme,
    dislaughJokeMeme,
    likeJokeMeme,
    dislikeJokeMeme,
    createComment,
} = require("../controllers/jokeMemeReactionController")

const {
    getJokeMemeDetails,
    getFullJokeMemeDetails,
    getAllJokeMemes,
    getUserJokeMemes,
} = require("../controllers/jokeMemeDetailsController")


router.post("/create-joke-meme", auth, createJokeMeme)
// router.post("/edit-joke-meme", auth, editJokeMeme)

router.post("/laughs/laugh/:id", auth, laughJokeMeme)
router.delete("/laughs/dislaugh/:id", auth, dislaughJokeMeme)

router.post("/likes/like/:id", auth, likeJokeMeme)
router.delete("/likes/dislike/:id", auth, dislikeJokeMeme)

router.post("/comments/create-comment/:id", auth, createComment)

router.get("/get-joke-meme-details/:id", auth, getJokeMemeDetails)
router.get("/get-full-joke-meme-details/:id", auth, getFullJokeMemeDetails)
router.get("/get-all-joke-memes", auth, getAllJokeMemes)
router.get("/get-user-joke-memes", auth, getUserJokeMemes)

router.delete("/delete-joke-meme/:id", auth, deleteJokeMeme)

module.exports = router