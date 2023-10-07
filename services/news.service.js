const { news,comments, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class NewsService {
    constructor() {
        this.newsModel = news;
    }

    async getNews(id) {
        let data;
        if (id) {
            console.log(id);
            data = await this.newsModel.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model:comments
                    }
                ]
            })
        } else {
            data = await this.newsModel.findAll();
        }

        return data;
    }

    async getNewsWithRawQuery() {
        const data = await sequelize.query("SELECT * FROM news", { type: QueryTypes.SELECT })
        return data;
    }

    async store(payload) {
        const date = new Date();
        const { title, cover, content, author, isPublic } = payload;
        
        const news = this.newsModel.create({
            title, cover, content, author,
            createdAt :date, updatedAt: date, isPublic
        });
        
        return news;
    }

    async edit(id,data){
        const {title,cover,author,content} = data
        const edit = this.newsModel.update({title,cover,author,content},{
            where : {id}
        })
        return edit
    }
}

module.exports = NewsService;