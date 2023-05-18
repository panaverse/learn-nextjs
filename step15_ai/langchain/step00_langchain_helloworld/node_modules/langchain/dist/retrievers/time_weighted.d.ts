import { VectorStore } from "../vectorstores/base.js";
import { Document } from "../document.js";
import { BaseRetriever } from "../schema/index.js";
export interface TimeWeightedVectorStoreRetrieverFields {
    vectorStore: VectorStore;
    searchKwargs?: number;
    memoryStream?: Document[];
    decayRate?: number;
    k?: number;
    otherScoreKeys?: string[];
    defaultSalience?: number;
}
export declare const LAST_ACCESSED_AT_KEY = "last_accessed_at";
export declare const BUFFER_IDX = "buffer_idx";
/**
 * TimeWeightedVectorStoreRetriever retrieves documents based on their time-weighted relevance.
 * ref: https://github.com/hwchase17/langchain/blob/master/langchain/retrievers/time_weighted_retriever.py
 */
export declare class TimeWeightedVectorStoreRetriever extends BaseRetriever {
    /**
     * The vectorstore to store documents and determine salience.
     */
    private vectorStore;
    /**
     * The number of top K most relevant documents to consider when searching.
     */
    private searchKwargs;
    /**
     * The memory_stream of documents to search through.
     */
    private memoryStream;
    /**
     * The exponential decay factor used as (1.0-decay_rate)**(hrs_passed).
     */
    private decayRate;
    /**
     * The maximum number of documents to retrieve in a given call.
     */
    private k;
    /**
     * Other keys in the metadata to factor into the score, e.g. 'importance'.
     */
    private otherScoreKeys;
    /**
     * The salience to assign memories not retrieved from the vector store.
     */
    private defaultSalience;
    /**
     * Constructor to initialize the required fields
     * @param fields - The fields required for initializing the TimeWeightedVectorStoreRetriever
     */
    constructor(fields: TimeWeightedVectorStoreRetrieverFields);
    /**
     * Get relevant documents based on time-weighted relevance
     * @param query - The query to search for
     * @returns The relevant documents
     */
    getRelevantDocuments(query: string): Promise<Document[]>;
    /**
     * NOTE: When adding documents to a vector store, use addDocuments
     * via retriever instead of directly to the vector store.
     * This is because it is necessary to process the document
     * in prepareDocuments.
     *
     * @param docs - The documents to add to vector store in the retriever
     */
    addDocuments(docs: Document[]): Promise<void>;
    /**
     * Get memory documents and their scores
     * @returns An object containing memory documents and their scores
     */
    private getMemoryDocsAndScores;
    /**
     * Get salient documents and their scores based on the query
     * @param query - The query to search for
     * @returns An object containing salient documents and their scores
     */
    private getSalientDocuments;
    /**
     * Compute the final result set of documents based on the combined scores
     * @param docsAndScores - An object containing documents and their scores
     * @param now - The current timestamp
     * @returns The final set of documents
     */
    private computeResults;
    /**
     * Prepare documents with necessary metadata before saving
     * @param docs - The documents to prepare
     * @param now - The current timestamp
     * @returns The prepared documents
     */
    private prepareDocuments;
    /**
     * Calculate the combined score based on vector relevance and other factors
     * @param doc - The document to calculate the score for
     * @param vectorRelevance - The relevance score
     * from the vector store
  @param nowMsec - The current timestamp in milliseconds
  @returns The combined score for the document
  */
    private getCombinedScore;
    /**
  
    Calculate the hours passed between two time points
    @param time - The current time in seconds
    @param refTime - The reference time in seconds
    @returns The number of hours passed between the two time points
    */
    private getHoursPassed;
}
