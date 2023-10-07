const NewsService = require("../services/news.service");
const newsService = new NewsService

class NewsController {
    async pageCreateNews(req, res) {
        res.render(
            'news/news-create',
            {
                pageTitle : "Crete NEws",
                layout: 'layouts/layouts'
            }
        )
    }

    async getNewsById(req,res){
        const id = req.params.id
        const data = await newsService.getNews(id)
        res.status(200).json(data)
    }

    async editNews(req,res){
        const id = req.params.id
        const data = await newsService.getNews(id)
        res.render("news/news-edit",{data})
    }

    async editNewsSubmit(req,res){
        try {
            const id = req.params.id
            const data = req.body
            const edit = await newsService.edit(id,data)
            res.status(200).json({
                message : "SUCCESS update data",
                statusCode : 200
            })
        } catch (error) {
            res.status(400).json({
                message : "FAILED update data",
                statusCode : 400
            })
        }

    }
}

module.exports = NewsController;