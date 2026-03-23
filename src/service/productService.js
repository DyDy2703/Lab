var DatabaseConnection = require(global.__basedir +  '/apps/Database/Database');
var Config = require( global.__basedir + "/config/setting.json");
var ProductRepository = require(global.__basedir + "/apps/Repository/ProductRepository");
var CategoryRepository = require(global.__basedir + "/apps/Repository/CategoryRepository");

class ProductService{
    productRepository;
    categoryRepository;
    session;
    constructor(){
        this.client = DatabaseConnection.getMongoClient();
        this.session = this.client.startSession();
        this.database =  this.client.db(Config.mongodb.database);
        this.session.startTransaction();
        this.productRepository = new ProductRepository(this.database,this.session);
        this.categoryRepository = new CategoryRepository(this.database,this.session);
    }
    async insertProduct(product,category){
        try{
            var categoryResult = await this.categoryRepository.insertCategory(category);
            product.CategoryId = categoryResult.insertedId;
            var result =  await this.productRepository.insertProduct(product);
            this.session.commitTransaction();
            this.session.endSession();
            return true;
        }catch(error){
            await this.session.abortTransaction();
            this.session.endSession();
            return false;
        }
    }


    async deleteProduct(id){
        var result =  await this.productRepository.deleteProduct(id);
        this.session.commitTransaction();
        this.session.endSession();
        return result;
    }
    async updateProduct(product){
        var result =  await this.productRepository.updateProduct(product);
        this.session.commitTransaction();
        this.session.endSession();
        return result;
    }


    async getProduct(id){
        return await this.productRepository.getProduct(id);
    }
    async getProductList() {
        var productList = await this.productRepository.getProductList(0,100);
        return productList;
    }
}
module.exports = ProductService;
