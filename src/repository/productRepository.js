var ObjectId  = require('mongodb').ObjectId;
class ProductRepository{
    context;
    session;
    constructor(context, session= null){
        this.context = context;
        this.session = session;
    }
    async insertProduct(product){
        var session  = this.session;
        return await this.context.collection("product").insertOne(product,{session});
    }
    async updateProduct(product){
        var session  = this.session;
        return await this.context.collection("product").updateOne({"_id": new  ObjectId(product._id) }, {$set: product},{session});
    }
    async deleteProduct(id){
        var session  = this.session;
        return await this.context.collection("product").deleteOne({"_id": new ObjectId(id) },{session});
    }
    async getProduct(id){
        return await this.context.collection("product").findOne({"_id": new ObjectId(id) },{});
    }
    async getProductList(skip,take) {
        const cursor = await this.context.collection("product").find({}, {}).skip(skip).limit(take);
        return await cursor.toArray();
    }
}
module.exports = ProductRepository;
