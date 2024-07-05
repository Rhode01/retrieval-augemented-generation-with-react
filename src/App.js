import { useEffect, useState } from "react";
import { Document, SimpleDirectoryReader, VectorStoreIndex } from "llamaindex";

function App() {
   const [queryResponse, setQueryResponse] = useState("");

   const loadRag = async () => {
      try {
         const apiKey = process.env.OPENAPI_KEY;
         const documents = await new SimpleDirectoryReader().loadData({ directoryPath: "./data" });
         const index = await VectorStoreIndex.fromDocuments(documents);
         const queryEngine = index.asQueryEngine();
         const response = await queryEngine.query({
            query: "What did the author do in college"
         });
         setQueryResponse(response.toString());
      } catch (error) {
         console.error("Error loading RAGA:", error);
      }
   }

   useEffect(() => {
      loadRag();
   }, []);

   return (
      <div className="App">
         <h3>Using RAG with React</h3>
         <div>{queryResponse}</div>
      </div>
   );
}

export default App;
