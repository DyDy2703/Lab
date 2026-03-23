class CategoryRepository{
    context;
    session;
    constructor(context, session= null){
        this.context = context;
        this.session = session;
    }
    async insertCategory(category){
        var session  = this.session;
        return await this.context.collection("category").insertOne(category,{session});
    }
}
module.exports = CategoryRepository;
