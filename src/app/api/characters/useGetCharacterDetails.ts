import { Character } from "@/models/character";
import { gql, TypedDocumentNode, useLazyQuery, useQuery } from "@apollo/client";

interface Data {
  character: Character;
}

interface Variables {
  id: string;
}

export const GET_CHARACTER_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      episode {
        id
        name
      }
    }
  }
`;

const useGetCharacterDetails = (id: string) => {
  return useLazyQuery<Data, Variables>(GET_CHARACTER_QUERY, {
    variables: { id },
  });
};

export default useGetCharacterDetails;
