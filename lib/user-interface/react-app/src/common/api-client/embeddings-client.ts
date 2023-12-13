import { API } from "aws-amplify";
import { GraphQLQuery, GraphQLResult } from "@aws-amplify/api";
import {
  listEmbeddingModels,
  calculateEmbeddings,
} from "../../graphql/queries";
import { ListEmbeddingModelsQuery, CalculateEmbeddingsQuery } from "../../API";

export class EmbeddingsClient {
  async getModels(): Promise<
    GraphQLResult<GraphQLQuery<ListEmbeddingModelsQuery>>
  > {
    try {
      const result = await API.graphql<GraphQLQuery<ListEmbeddingModelsQuery>>({
        query: listEmbeddingModels,
      });
      return result;
    } catch (error: any) {
      return error;
    }
  }

  async getEmbeddings(
    provider: string,
    model: string,
    input: string[]
  ): Promise<GraphQLResult<GraphQLQuery<CalculateEmbeddingsQuery>>> {
    try {
      const result = API.graphql<GraphQLQuery<CalculateEmbeddingsQuery>>({
        query: calculateEmbeddings,
        variables: {
          input: {
            provider: provider,
            model: model,
            passages: input,
          },
        },
      });
      return result;
    } catch (error: any) {
      return error;
    }
  }
}
