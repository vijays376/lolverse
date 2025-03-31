const JokeMeme = require("../models/JokeMeme");


// Function to get the details of a specific Joke/Meme
exports.getJokeMemeDetails = async (req, res) => {
    try {
        // Get the joke/meme ID from the request params
        const { id } = req.params;

        // Find the joke/meme by ID
        const jokeMeme = await JokeMeme.findById(id);

        // Check if the joke/meme exists
        if (!jokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Return the joke/meme details
        return res.status(200).json({
            success: true,
            data: jokeMeme,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};



// Function to get the full details of a specific Joke/Meme along with user details
exports.getFullJokeMemeDetails = async (req, res) => {
    try {
        // Get the joke/meme ID from the request params
        const { id } = req.params;

        // Find the joke/meme by ID and populate the associated user information
        const jokeMeme = await JokeMeme.findById(id)
            .populate('user', 'username firstName lastName email profilePhoto bio');

        // console.log(jokeMeme)
        // Check if the joke/meme exists
        if (!jokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Return the joke/meme details along with user information
        return res.status(200).json({
            success: true,
            data: jokeMeme,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};



// Function to get all Joke/Memes created by a specific user
exports.getUserJokeMemes = async (req, res) => {
    try {
        // Get the user ID from the request params or authenticated user
        const userId = req.params.userId || req.user.id;

        // Get query parameters for pagination, filtering, or sorting
        const { page = 1, limit = 10, category } = req.query;

        // Create a filter object for the user's jokes/memes
        let filter = { user: userId };
        if (category) {
            filter.category = category;
        }

        // Get the total number of joke/memes for the user
        const totalUserJokesMemes = await JokeMeme.countDocuments(filter);

        // Retrieve the joke/memes with pagination, filtering, and sorting
        const userJokesMemes = await JokeMeme.find(filter)
            .sort({ createdAt: -1 }) // Sort by most recent
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('user', 'username firstName lastName email profilePhoto bio');

        // Return the user's joke/memes along with pagination info
        return res.status(200).json({
            success: true,
            count: userJokesMemes.length,
            totalPages: Math.ceil(totalUserJokesMemes / limit),
            currentPage: page,
            data: userJokesMemes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};



// Function to get all Joke/Memes
exports.getAllJokeMemes = async (req, res) => {
    try {
        // Get query parameters for pagination, filtering, or sorting
        const { page = 1, limit = 10, category } = req.query;

        // Create a filter object based on the category if provided
        let filter = {};
        if (category) {
            filter.category = category;
        }

        // Get the total number of joke/memes
        const totalJokesMemes = await JokeMeme.countDocuments(filter);

        // Retrieve the joke/memes with pagination, filtering, and sorting
        const jokesMemes = await JokeMeme.find(filter)
            .sort({ createdAt: -1 }) // Sort by most recent
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('user', 'username firstName lastName email profilePhoto bio');

        // Return the joke/memes along with pagination info
        return res.status(200).json({
            success: true,
            count: jokesMemes.length,
            totalPages: Math.ceil(totalJokesMemes / limit),
            currentPage: page,
            data: jokesMemes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};

