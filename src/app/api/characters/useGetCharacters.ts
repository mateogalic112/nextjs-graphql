import { Info } from "@/models/api";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";

interface Data {
  characters: {
    info: Info;
    results: [
      {
        id: string;
        name: string;
        image: string;
        species: string;
        origin: {
          id: string;
          name: string;
        };
        location: {
          id: string;
          name: string;
        };
      }
    ];
  };
}

interface Variables {
  page: number;
}

export const GET_CHARACTERS_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        species
        origin {
          id
          name
        }
        location {
          id
          name
        }
      }
    }
  }
`;

export const useGetCharacters = (page: number) => {
  return useQuery<Data, Variables>(GET_CHARACTERS_QUERY, {
    variables: { page },
    fetchPolicy: "cache-and-network",
  });
};
