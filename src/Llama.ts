import { Document, SimpleDirectoryReader, VectorStoreIndex } from "llamaindex";
const apiKey = process.env.OPENAPI_KEY;

const documents = await new  SimpleDirectoryReader().loadData({directoryPath : "./data"})

const index = await VectorStoreIndex.fromDocuments(documents)

const queryEngine = index.asQueryEngine()

const response = await queryEngine.query({
    query:"What did the author do in college"
})
console.log(response.toString())

