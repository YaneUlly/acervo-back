const Comment = require('../models/Comment.model');

const isCommentOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.payload._id;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to perform this action' });
    }

    next(); // If the user is the owner of the comment
  } catch (error) {
    console.log('Error in isCommentOwner middleware', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { isCommentOwner };
