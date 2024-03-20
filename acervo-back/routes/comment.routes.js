const router = require('express').Router();
const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { isCommentOwner } = require('../middleware/comment.middleware');
const UserAuth = require('../models/UserAuth.model');
const CoffeeHub = require('../models/CoffeeHub.model');

// Create a new comment
router.post(
  '/coffeehub/:id/comments',
  isAuthenticated,
  async (req, res, next) => {
    const { id } = req.params;
    const userId = req.payload._id;
    const { content } = req.body;

    try {
      const user = await UserAuth.findById(userId).select('name photoUrl');
      const coffeeId = id;

      const comment = await Comment.create({
        coffeeTaste: coffeeId,
        user: userId,
        content,
      });
      console.log('New Comment', comment);
      res.status(200).json({
        _id: comment._id,
        coffeeTaste: coffeeId,
        user: {
          name: user.name,
          photoUrl: user.photoUrl,
        },
        content: comment.content,
        createdAt: comment.content,
      });
    } catch (error) {
      console.log('An error occured creating the comment', error);
      next(error);
    }
  }
);

// Get all comments
router.get(
  '/coffeehub/:id/comments',
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comments = await Comment.find({ coffeeTaste: id }).populate({
        path: 'user',
        select: 'name photoUrl',
      });
      res.status(200).json(comments);
    } catch (error) {
      console.log('Error getting the comment', error);
      next(error);
    }
  }
);

// Updated a comment
router.put(
  '/coffeehub/comments/:id',
  isCommentOwner,
  async (req, res, next) => {
    try {
      const userId = req.payload._id;
      const { content } = req.body;

      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Id is not valid' });
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.json(updatedComment);
    } catch (error) {
      console.log('Error updating comment', error);
      next(error);
    }
  }
);

// Delete a comment by id
router.delete(
  '/coffeehub/comments/:id',
  isCommentOwner,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Id is not valid' });
      }
      await Comment.findByIdAndDelete(id);

      res.json({ message: 'Comment deleted' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
