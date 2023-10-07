const {comments} = require("../models")

class CommentService {
    constructor(){
        this.commentModel = comments
    }

    async store(payload){
        const {name,comment,news_id} = payload
        const date = new Date()

        const commentNew = this.commentModel.create({
            name,comment,news_id,
            createdAt : date,
            updateAt : date
        })
        return commentNew
    }
    async delete(payload){
        const idComment = payload.id
        this.commentModel.destroy({
            where : {id:idComment}
        })
    }
}

module.exports = CommentService