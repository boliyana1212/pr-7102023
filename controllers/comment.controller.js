const CommentService = require("../services/comment.service")

const commentService = new CommentService()
class CommentController{
    async storeComment(req,res){
        try {
            const comment = await commentService.store(req.body)
            res.status(201).json(comment)
        } catch (error) {
            console.error(error)
            res.status(500).json({error : 'Gagal menyimpan komentar,'})
        }
    }
    async deleteComment(req,res){
        try {
            await commentService.delete(req.body)
            res.status(201).json({
                message : "SUCCESS delete comment",
                statusCode : 201
            })
        } catch (error) {
            res.status(400).json({
                message : "FAILED delete comment",
                statusCode : 400
            })
        }
    }
}

module.exports = CommentController