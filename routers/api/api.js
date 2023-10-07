const express = require("express");
const HomeController = require("../../controllers/home.controller");
const CommentController = require("../../controllers/comment.controller")
const NewsController = require("../../controllers/news.controller")
const api = express.Router();

const homeController = new HomeController
api.get('/v1/news', homeController.getNews);
api.post('/v1/news', homeController.storeNews);

const newsController = new NewsController
// News Detail
api.get('/v1/news/:id', newsController.getNewsById);
// Edit News
api.get("/v1/edit_news/:id",newsController.editNews)
api.post("/v1/edit_news/:id",newsController.editNewsSubmit)


const commentController = new CommentController
api.post('/v1/comments', commentController.storeComment)
api.post('/v1/delete_comments', commentController.deleteComment)

module.exports = api;