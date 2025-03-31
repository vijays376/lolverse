const User = require("../models/User");
const JokeMeme = require("../models/JokeMeme");
const Laugh = require("../models/Laugh");
const Like = require("../models/Like");
const Comment = require("../models/Comment");


// Laugh a JokeMeme
exports.laughJokeMeme = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        // Get the joke/meme ID from the request params
        const { id } = req.params;

        // Find the joke/meme by ID
        const existingJokeMeme = await JokeMeme.findById(id);

        // Check if the joke/meme exists
        if (!existingJokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Check if the user has already laughed at this JokeMeme
        const existingLaugh = await Laugh.findOne({ jokeMeme: id, user: userId });
        if (existingLaugh) {
            return res.status(409).json({
                success: false,
                message: "You have already laughed at this Joke/Meme",
            });
        }

        const laugh = new Laugh({
            jokeMeme: id,
            user: userId,
        });
        const savedLaugh = await laugh.save();
        // console.log("Saved Laugh:", savedLaugh); 

        // Update JokeMeme Collection basis on this
        const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
            id,     // Use the jokeMeme ID from the request params
            { $push: { laughs: savedLaugh._id } },
            { new: true }
        )
            .populate("laughs")
            .exec();

        // console.log("Updated JokeMeme:", updatedJokeMeme);

        // Update User model: add the laugh reference to the user's laughs array
        await User.findByIdAndUpdate(
            userId,
            { $push: { laughs: savedLaugh._id } },
            { new: true }
        );

        // Respond with the updated JokeMeme
        return res.status(200).json({
            success: true,
            message: "Laughed at the Joke/Meme successfully",
            jokeMeme: updatedJokeMeme,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while laughing at Joke/Meme",
        });
    }
};


// Dislaugh a JokeMeme
exports.dislaughJokeMeme = async (req, res) => {
    try {
        // Get user ID from the authenticated request
        const userId = req.user.id;

        // Extract jokeMeme ID from the request params
        const { id } = req.params;

        // Find the joke/meme by ID to ensure it exists
        const existingJokeMeme = await JokeMeme.findById(id);
        if (!existingJokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Find and delete the laugh document for the given user and jokeMeme
        const deletedLaugh = await Laugh.findOneAndDelete({ jokeMeme: id, user: userId });
        if (!deletedLaugh) {
            return res.status(404).json({
                success: false,
                message: "Laugh not found for this user and Joke/Meme",
            });
        }

        // Update the JokeMeme to remove the laugh reference
        const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
            id,   // Use the jokeMeme ID from the request params
            { $pull: { laughs: deletedLaugh._id } },
            { new: true }
        )
            .populate("laughs")
            .exec();

        // Update User model: remove the laugh reference from the user's laughs array
        await User.findByIdAndUpdate(
            userId,
            { $pull: { laughs: deletedLaugh._id } },
            { new: true }
        );

        // Respond with the updated JokeMeme
        return res.status(200).json({
            success: true,
            message: "Dislaughed the Joke/Meme successfully",
            jokeMeme: updatedJokeMeme,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while dislaughing Joke/Meme",
        });
    }
};



// Like a JokeMeme
exports.likeJokeMeme = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        // Get the joke/meme ID from the request params
        const { id } = req.params;

        // Find the joke/meme by ID
        const existingJokeMeme = await JokeMeme.findById(id);

        // Check if the joke/meme exists
        if (!existingJokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Check if the user has already laughed at this JokeMeme
        const existingLike = await Like.findOne({ jokeMeme: id, user: userId });
        console.log("existingLike; ", existingLike)
        if (existingLike) {
            return res.status(409).json({
                success: false,
                message: "You have already liked at this Joke/Meme",
            });
        }
        // console.log("existingLike; ", existingLike)

        const like = new Like({
            jokeMeme: id,
            user: userId,
        });
        const savedLike = await like.save();
        // console.log("Saved Like:", savedLike);

        // Update JokeMeme Collection basis on this
        const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
            id,     // Use the jokeMeme ID from the request params
            { $push: { likes: savedLike._id } },
            { new: true }
        )
            .populate("likes")
            .exec();

        // console.log("Updated JokeMeme:", updatedJokeMeme);

        // Update User model: add the like reference to the user's likes array
        await User.findByIdAndUpdate(
            userId,
            { $push: { likes: savedLike._id } },
            { new: true }
        );

        // Respond with the updated JokeMeme
        return res.status(200).json({
            success: true,
            message: "Liked the Joke/Meme successfully",
            jokeMeme: updatedJokeMeme,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while laughing at Joke/Meme",
        });
    }
};



// Dislike a JokeMeme
exports.dislikeJokeMeme = async (req, res) => {
    try {
        // Get user ID from the authenticated request
        const userId = req.user.id;

        // Extract jokeMeme ID from the request params
        const { id } = req.params;

        // Find the joke/meme by ID to ensure it exists
        const existingJokeMeme = await JokeMeme.findById(id);
        if (!existingJokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Find and delete the like document for the given user and jokeMeme
        const deletedLike = await Like.findOneAndDelete({ jokeMeme: id, user: userId });
        if (!deletedLike) {
            return res.status(404).json({
                success: false,
                message: "Like not found for this user and Joke/Meme",
            });
        }

        // Update the JokeMeme to remove the laugh reference
        const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
            id,     // Use the jokeMeme ID from the request params
            { $pull: { likes: deletedLike._id } },
            { new: true }
        )
            .populate("likes")
            .exec();

        // Update User model: remove the like reference from the user's likes array
        await User.findByIdAndUpdate(
            userId,
            { $pull: { likes: deletedLike._id } },
            { new: true }
        );

        // Respond with the updated JokeMeme
        return res.status(200).json({
            success: true,
            message: "Disliked the Joke/Meme successfully",
            jokeMeme: updatedJokeMeme,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while disliking Joke/Meme",
        });
    }
};


// Create a Comment on a JokeMeme
exports.createComment = async (req, res) => {
    try {
        // Get user ID from the authenticated request
        const userId = req.user.id;

        // Extract jokeMeme ID from the request params
        const { id } = req.params;

        // Extract commentText from the request body
        const { commentText } = req.body;

        // Ensure commentText is provided
        if (!commentText || commentText.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Comment Text is required",
            });
        }

        // Find the joke/meme by ID to ensure it exists
        const existingJokeMeme = await JokeMeme.findById(id);
        if (!existingJokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Create a new comment
        const comment = new Comment({
            jokeMeme: id,
            user: userId,
            commentText,
        });

        // Save the comment
        const savedComment = await comment.save();

        // Update the JokeMeme to include the new comment
        const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
            id,     // Use the jokeMeme ID from the request params
            { $push: { comments: savedComment._id } },
            { new: true }
        )
            .populate("comments") // Optionally populate comments
            .exec();

        // Update User model: add the comment reference to the user's comments array
        await User.findByIdAndUpdate(
            userId,
            { $push: { comments: savedComment._id } },
            { new: true }
        );

        // Respond with the updated JokeMeme
        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            jokeMeme: updatedJokeMeme,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while adding comment to Joke/Meme",
        });
    }
};

