const JokeMeme = require("../models/JokeMeme");
const User = require("../models/User");
const Laugh = require("../models/Laugh")
const Like = require("../models/Like")
const Comment = require("../models/Comment")
const { uploadToCloudinary } = require("../utils/imageUploader");

// Function to create a new Joke/Meme
exports.createJokeMeme = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        // Get meme image from request files
        const memeImg = req.files?.memeImage;

        // Upload the memeImg to Cloudinary, if present
        let memeImage;
        if (memeImg) {
            const uploadResponse = await uploadToCloudinary(memeImg, process.env.FOLDER_NAME);
            memeImage = uploadResponse.secure_url; // Extract the secure URL
        }

        // Get all required fields from request body
        const { category, hindiJoke, englishJoke } = req.body;

        // Category not found
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is Mandatory",
            });
        }

        let newJokeMeme;

        // Handle each category
        switch (category) {
            case "Hindi Joke":
                if (!hindiJoke) {
                    return res.status(400).json({
                        success: false,
                        message: "Hindi Joke is Mandatory"
                    });
                }

                // console.log(hindiJoke)
                newJokeMeme = await JokeMeme.create({
                    category,
                    hindiJoke,
                    user: userId
                });
                break;

            case "English Joke":
                if (!englishJoke) {
                    return res.status(400).json({
                        success: false,
                        message: "English Joke is Mandatory"
                    });
                }

                // console.log(englishJoke)
                newJokeMeme = await JokeMeme.create({
                    category,
                    englishJoke,
                    user: userId
                });
                break;

            case "Meme":
                if (!memeImage) {
                    return res.status(400).json({
                        success: false,
                        message: "Meme Image is Mandatory"
                    });
                }

                // console.log(memeImage)
                newJokeMeme = await JokeMeme.create({
                    category,
                    memeImage,
                    user: userId
                });
                break;

            default:
                return res.status(400).json({
                    success: false,
                    message: "Invalid category"
                });
        }

        // Add the new Joke/Meme to the User Schema
        await User.findByIdAndUpdate(
            userId,
            { $push: { jokeMemes: newJokeMeme._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: `${category} created Successfully`,
            newJokeMeme
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal Server Error",
        });
    }
};



// // Function to edit an existing Joke/Meme
// exports.editJokeMeme = async (req, res) => {
//     try {
//         // Get the joke/meme ID from the request params
//         const { id } = req.params;

//         // Find the joke/meme by ID
//         const existingJokeMeme = await JokeMeme.findById(id);

//         // Check if the joke/meme exists
//         if (!existingJokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Get meme image from request files (if any)
//         const memeImg = req.files?.memeImage;

//         // Upload the new meme image to Cloudinary if it exists
//         let memeImage;
//         if (memeImg) {
//             memeImage = await uploadToCloudinary(memeImg, process.env.FOLDER_NAME);
//             console.log(memeImage);
//         }

//         // Get all the fields that can be updated from request body
//         const { category, hindiJoke, englishJoke } = req.body;

//         // Prepare the update object
//         const updateData = {};

//         if (category) {
//             updateData.category = category;
//         }

//         if (hindiJoke) {
//             updateData.hindiJoke = hindiJoke;
//         }

//         if (englishJoke) {
//             updateData.englishJoke = englishJoke;
//         }

//         if (memeImage) {
//             updateData.memeImage = memeImage;
//         }

//         // Update the joke/meme with the new data
//         const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
//             id,
//             { $set: updateData },
//             { new: true, runValidators: true }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Joke/Meme updated successfully",
//             data: updatedJokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// };




// Function to delete a specific Joke/Meme
exports.deleteJokeMeme = async (req, res) => {
    try {
        // Get the joke/meme ID from request parameters
        const jokeMemeId = req.params.id;

        // Find the joke/meme by ID
        const jokeMeme = await JokeMeme.findById(jokeMemeId);

        // Check if the joke/meme exists
        if (!jokeMeme) {
            return res.status(404).json({
                success: false,
                message: "Joke/Meme not found",
            });
        }

        // Check if the user requesting deletion is the owner
        if (jokeMeme.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this joke/meme",
            });
        }

        // Delete the joke/meme
        const deletedJokeMeme = await JokeMeme.findByIdAndDelete(jokeMemeId);
        // console.log("deletedJokeMeme:", deletedJokeMeme)

        // // Remove the joke/meme reference from the user's profile
        // const pullJokeMemeDetails = await User.findByIdAndUpdate(
        //     req.user.id,
        //     // {
        //     //     $pull: { jokeMemes: jokeMemeId },
        //     // },
        //     {
        //         $pull: {
        //             jokeMemes: jokeMemeId,
        //             laughs: { jokeMeme: jokeMemeId },
        //             likes: { jokeMeme: jokeMemeId },
        //             comments: { jokeMeme: jokeMemeId },
        //         },
        //     },
        //     { new: true }
        // );
        // console.log("pullJokeMemeDetails", pullJokeMemeDetails)


        // // Delete associated laughs, likes and comments
        // const deletedDetails = await Promise.all([
        //     Laugh.deleteMany({ jokeMeme: jokeMemeId }),
        //     Like.deleteMany({ jokeMeme: jokeMemeId }),
        //     Comment.deleteMany({ jokeMeme: jokeMemeId }),
        // ]);
        // console.log("deletedDetails", deletedDetails)


        // Find and delete all associated laughs, likes, and comments
        const [deletedLaughs, deletedLikes, deletedComments] = await Promise.all([
            Laugh.find({ jokeMeme: jokeMemeId }),
            Like.find({ jokeMeme: jokeMemeId }),
            Comment.find({ jokeMeme: jokeMemeId }),
        ]);

        // Collect all related IDs
        const laughIds = deletedLaughs.map(laugh => laugh._id);
        const likeIds = deletedLikes.map(like => like._id);
        const commentIds = deletedComments.map(comment => comment._id);

        // Remove the joke/meme, laughs, likes, and comments from the user's profile
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $pull: {
                    jokeMemes: jokeMemeId,
                    laughs: { $in: laughIds },
                    likes: { $in: likeIds },
                    comments: { $in: commentIds },
                },
            },
            { new: true }
        );

        // Delete associated laughs, likes, and comments from their respective collections
        await Promise.all([
            Laugh.deleteMany({ _id: { $in: laughIds } }),
            Like.deleteMany({ _id: { $in: likeIds } }),
            Comment.deleteMany({ _id: { $in: commentIds } }),
        ]);



        return res.status(200).json({
            success: true,
            message: "Joke/Meme deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};












































































// // Laugh a JokeMeme
// exports.laughJokeMeme = async (req, res) => {
//     try {
//         // Get user ID from request object
//         const userId = req.user.id;

//         // Get the joke/meme ID from the request params
//         const { id } = req.params;

//         // Find the joke/meme by ID
//         const existingJokeMeme = await JokeMeme.findById(id);

//         // Check if the joke/meme exists
//         if (!existingJokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Check if the user has already laughed at this JokeMeme
//         const existingLaugh = await Laugh.findOne({ jokeMeme: id, user: userId });
//         if (existingLaugh) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You have already laughed at this Joke/Meme",
//             });
//         }

//         const laugh = new Laugh({
//             jokeMeme: id,
//             user: userId,
//         });
//         const savedLaugh = await laugh.save();
//         // console.log("Saved Laugh:", savedLaugh);

//         // Update JokeMeme Collection basis on this
//         const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
//             id,     // Use the jokeMeme ID from the request params
//             { $push: { laughs: savedLaugh._id } },
//             { new: true }
//         )
//             .populate("laughs")
//             .exec();

//         // console.log("Updated JokeMeme:", updatedJokeMeme);

//         // Respond with the updated JokeMeme
//         return res.status(200).json({
//             success: true,
//             message: "Laughed at the Joke/Meme successfully",
//             jokeMeme: updatedJokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error While Laughing at Joke/Meme",
//             error: error.message,
//         });
//     }
// };


// // Dislaugh a JokeMeme
// exports.dislaughJokeMeme = async (req, res) => {
//     try {
//         // Get user ID from the authenticated request
//         const userId = req.user.id;

//         // Extract jokeMeme ID from the request params
//         const { id } = req.params;

//         // Find the joke/meme by ID to ensure it exists
//         const existingJokeMeme = await JokeMeme.findById(id);
//         if (!existingJokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Find and delete the laugh document for the given user and jokeMeme
//         const deletedLaugh = await Laugh.findOneAndDelete({ jokeMeme: id, user: userId });
//         if (!deletedLaugh) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Laugh not found for this user and Joke/Meme",
//             });
//         }

//         // Update the JokeMeme to remove the laugh reference
//         const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
//             id,   // Use the jokeMeme ID from the request params
//             { $pull: { laughs: deletedLaugh._id } },
//             { new: true }
//         )
//             .populate("laughs")
//             .exec();

//         // Respond with the updated JokeMeme
//         return res.status(200).json({
//             success: true,
//             message: "Dislaughed the Joke/Meme successfully",
//             jokeMeme: updatedJokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error While Dislaughing Joke/Meme",
//             error: error.message,
//         });
//     }
// };



// // Like a JokeMeme
// exports.likeJokeMeme = async (req, res) => {
//     try {
//         // Get user ID from request object
//         const userId = req.user.id;

//         // Get the joke/meme ID from the request params
//         const { id } = req.params;

//         // Find the joke/meme by ID
//         const existingJokeMeme = await JokeMeme.findById(id);

//         // Check if the joke/meme exists
//         if (!existingJokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Check if the user has already laughed at this JokeMeme
//         const existingLike = await Like.findOne({ jokeMeme: id, user: userId });
//         console.log("existingLike; ", existingLike)
//         if (existingLike) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You have already liked at this Joke/Meme",
//             });
//         }
//         // console.log("existingLike; ", existingLike)

//         const like = new Like({
//             jokeMeme: id,
//             user: userId,
//         });
//         const savedLike = await like.save();
//         // console.log("Saved Like:", savedLike);

//         // Update JokeMeme Collection basis on this
//         const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
//             id,     // Use the jokeMeme ID from the request params
//             { $push: { likes: savedLike._id } },
//             { new: true }
//         )
//             .populate("likes")
//             .exec();

//         console.log("Updated JokeMeme:", updatedJokeMeme);

//         // Respond with the updated JokeMeme
//         return res.status(200).json({
//             success: true,
//             message: "Liked at the Joke/Meme successfully",
//             jokeMeme: updatedJokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error While Laughing at Joke/Meme",
//             error: error.message,
//         });
//     }
// };



// // Dislike a JokeMeme
// exports.dislikeJokeMeme = async (req, res) => {
//     try {
//         // Get user ID from the authenticated request
//         const userId = req.user.id;

//         // Extract jokeMeme ID from the request params
//         const { id } = req.params;

//         // Find the joke/meme by ID to ensure it exists
//         const existingJokeMeme = await JokeMeme.findById(id);
//         if (!existingJokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Find and delete the like document for the given user and jokeMeme
//         const deletedLike = await Like.findOneAndDelete({ jokeMeme: id, user: userId });
//         if (!deletedLike) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Like not found for this user and Joke/Meme",
//             });
//         }

//         // Update the JokeMeme to remove the laugh reference
//         const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
//             id,     // Use the jokeMeme ID from the request params
//             { $pull: { likes: deletedLike._id } },
//             { new: true }
//         )
//             .populate("likes")
//             .exec();

//         // Respond with the updated JokeMeme
//         return res.status(200).json({
//             success: true,
//             message: "Disliked the Joke/Meme successfully",
//             jokeMeme: updatedJokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error While Disliking Joke/Meme",
//             error: error.message,
//         });
//     }
// };


// // Create a Comment on a JokeMeme
// exports.createComment = async (req, res) => {
//     try {
//         // Get user ID from the authenticated request
//         const userId = req.user.id;

//         // Extract jokeMeme ID from the request params
//         const { id } = req.params;

//         // Extract comment text from the request body
//         const { text } = req.body;

//         // Ensure comment text is provided
//         if (!text || text.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Comment text is required",
//             });
//         }

//         // Find the joke/meme by ID to ensure it exists
//         const existingJokeMeme = await JokeMeme.findById(id);
//         if (!existingJokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Create a new comment
//         const comment = new Comment({
//             jokeMeme: id,
//             user: userId,
//             text,
//         });

//         // Save the comment
//         const savedComment = await comment.save();

//         // Update the JokeMeme to include the new comment
//         const updatedJokeMeme = await JokeMeme.findByIdAndUpdate(
//             id,     // Use the jokeMeme ID from the request params
//             { $push: { comments: savedComment._id } },
//             { new: true }
//         )
//             .populate("comments") // Optionally populate comments
//             .exec();

//         // Respond with the updated JokeMeme
//         return res.status(200).json({
//             success: true,
//             message: "Comment added successfully",
//             jokeMeme: updatedJokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error While Adding Comment to Joke/Meme",
//             error: error.message,
//         });
//     }
// };


// // Function to get the details of a specific Joke/Meme
// exports.getJokeMemeDetails = async (req, res) => {
//     try {
//         // Get the joke/meme ID from the request params
//         const { id } = req.params;

//         // Find the joke/meme by ID
//         const jokeMeme = await JokeMeme.findById(id);

//         // Check if the joke/meme exists
//         if (!jokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Return the joke/meme details
//         return res.status(200).json({
//             success: true,
//             data: jokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// };



// // Function to get the full details of a specific Joke/Meme along with user details
// exports.getFullJokeMemeDetails = async (req, res) => {
//     try {
//         // Get the joke/meme ID from the request params
//         const { id } = req.params;

//         // Find the joke/meme by ID and populate the associated user information
//         const jokeMeme = await JokeMeme.findById(id)
//             .populate('user', 'username firstName lastName email profilePhoto bio');

//         console.log(jokeMeme)
//         // Check if the joke/meme exists
//         if (!jokeMeme) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Joke/Meme not found",
//             });
//         }

//         // Return the joke/meme details along with user information
//         return res.status(200).json({
//             success: true,
//             data: jokeMeme,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// };




// // Function to get all Joke/Memes
// exports.getAllJokeMemes = async (req, res) => {
//     try {
//         // Get query parameters for pagination, filtering, or sorting
//         const { page = 1, limit = 10, category } = req.query;

//         // Create a filter object based on the category if provided
//         let filter = {};
//         if (category) {
//             filter.category = category;
//         }

//         // Get the total number of joke/memes
//         const totalJokesMemes = await JokeMeme.countDocuments(filter);

//         // Retrieve the joke/memes with pagination, filtering, and sorting
//         const jokesMemes = await JokeMeme.find(filter)
//             .sort({ createdAt: -1 }) // Sort by most recent
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit))
//             .populate('user', 'username firstName lastName email profilePhoto bio');

//         // Return the joke/memes along with pagination info
//         return res.status(200).json({
//             success: true,
//             count: jokesMemes.length,
//             totalPages: Math.ceil(totalJokesMemes / limit),
//             currentPage: page,
//             data: jokesMemes,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// };



// // Function to get all Joke/Memes created by a specific user
// exports.getUserJokeMemes = async (req, res) => {
//     try {
//         // Get the user ID from the request params or authenticated user
//         const userId = req.params.userId || req.user.id;

//         // Get query parameters for pagination, filtering, or sorting
//         const { page = 1, limit = 10, category } = req.query;

//         // Create a filter object for the user's jokes/memes
//         let filter = { user: userId };
//         if (category) {
//             filter.category = category;
//         }

//         // Get the total number of joke/memes for the user
//         const totalUserJokesMemes = await JokeMeme.countDocuments(filter);

//         // Retrieve the joke/memes with pagination, filtering, and sorting
//         const userJokesMemes = await JokeMeme.find(filter)
//             .sort({ createdAt: -1 }) // Sort by most recent
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit))
//             .populate('user', 'username firstName lastName email profilePhoto bio');

//         // Return the user's joke/memes along with pagination info
//         return res.status(200).json({
//             success: true,
//             count: userJokesMemes.length,
//             totalPages: Math.ceil(totalUserJokesMemes / limit),
//             currentPage: page,
//             data: userJokesMemes,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// };










































































// const JokeMeme = require("../models/JokeMeme")
// const User = require("../models/User")
// const { uploadToCloudinary } = require("../utils/imageUploader")


// // Function to create a new Joke/Meme
// exports.createJokeMeme = async (req, res) => {
//     try {
//         // Get user ID from request object
//         const userId = req.user.id

//         // Get meme image from request files
//         const memeImg = req.files.memeImage

//         // Upload the memeImg to Cloudinary
//         const memeImage = await uploadToCloudinary(
//             memeImg,
//             process.env.FOLDER_NAME
//         )
//         console.log(memeImage)

//         // Get all required fields from request body
//         let { category, hindiJoke, englishJoke } = req.body

//         // Category not found
//         if (!category) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Category is Mandatory",
//             })
//         }

//         // Category is Hindi Joke
//         if (category === "Hindi Joke") {
//             try {
//                 // Hindi Joke is missing
//                 if (!hindiJoke) {
//                     return res.status(400).json({
//                         success: false,
//                         message: "Hindi Joke is Mandatory"
//                     })
//                 }

//                 // Create a new Hindi Joke
//                 const newHindiJoke = await JokeMeme.create({
//                     hindiJoke: hindiJoke,
//                 })

//                 // Add the new Hindi Joke to the User Schema
//                 await User.findByIdAndUpdate(
//                     {
//                         _id: userId._id,
//                     },
//                     {
//                         $push: {
//                             jokeMemes: newHindiJoke._id,
//                         },
//                     },
//                     { new: true }
//                 )
//                 return res.status(200).json({
//                     success: true,
//                     message: "Hindi Joke created Successfully"
//                 })
//             } catch (error) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Failed to create Hindi Joke",
//                     error: error.message,
//                 })
//             }
//         }


//         // Category is English Joke
//         if (category === "English Joke") {
//             try {
//                 // English Joke is missing
//                 if (!englishJoke) {
//                     return res.status(400).json({
//                         success: false,
//                         message: "English Joke is Mandatory"
//                     })
//                 }

//                 // Create a new English Joke
//                 const newEnglishJoke = await JokeMeme.create({
//                     englishJoke: englishJoke,
//                 })

//                 // Add the new English Joke to the User Schema
//                 await User.findByIdAndUpdate(
//                     {
//                         _id: userId._id,
//                     },
//                     {
//                         $push: {
//                             jokeMemes: newEnglishJoke._id,
//                         },
//                     },
//                     { new: true }
//                 )
//                 return res.status(200).json({
//                     success: true,
//                     message: "English Joke created Successfully"
//                 })
//             } catch (error) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Failed to create English Joke",
//                     error: error.message,
//                 })
//             }
//         }


//         // Category is Meme
//         if (category === "Meme") {
//             try {
//                 // Meme is missing
//                 if (!memeImage) {
//                     return res.status(400).json({
//                         success: false,
//                         message: "Meme Image is Mandatory"
//                     })
//                 }

//                 // Create a new Meme
//                 const newMeme = await JokeMeme.create({
//                     memeImage: memeImage,
//                 })

//                 // Add the new Meme to the User Schema
//                 await User.findByIdAndUpdate(
//                     {
//                         _id: userId._id,
//                     },
//                     {
//                         $push: {
//                             jokeMemes: newMeme._id,
//                         },
//                     },
//                     { new: true }
//                 )
//                 return res.status(200).json({
//                     success: true,
//                     message: "Meme created Successfully"
//                 })
//             } catch (error) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Failed to create Meme",
//                     error: error.message,
//                 })
//             }
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong.",
//             error: error.message,
//         })
//     }
// }