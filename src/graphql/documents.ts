import { print } from "graphql";
import gql from "graphql-tag";

export const GetPublicAnimationsQuery = gql`
  query GetPublicAnimations($query: String!, $page: Int!) {
    getPublicAnimations(query: $query, page: $page) {
      items {
        id
        name
        lottieSource
        tags
        downloadCount
        user {
          id
          name
          avatarUrl
        }
      }
      pageInfo {
        page
        pageCount
        total
      }
    }
  }
`;

export const GetAnimationsQuery = gql`
  query GetAnimations(
    $nextCursor: String
    $limit: Int = 10
    $keyword: String!
  ) {
    getAnimations(nextCursor: $nextCursor, limit: $limit, keyword: $keyword) {
      items {
        id
        name
        url
        tags
        likes
      }
      pageInfo {
        hasNextPage
        nextCursor
      }
    }
  }
`;

export const GetAnimationQuery = gql`
  query GetAnimation($id: String!) {
    getAnimationById(id: $id) {
      id
      name
      url
      tags
      likes
    }
  }
`;

export const CreateAnimationMutation = gql`
  mutation CreateAnimation(
    $name: String!
    $tags: [String!]
    $likes: Int
    $file: Upload!
  ) {
    createAnimation(name: $name, tags: $tags, likes: $likes, file: $file)
  }
`;

export const UpdateAnimationMutation = gql`
  mutation updateAnimation(
    $id: String!
    $name: String
    $tags: [String!]
    $likes: Int
    $file: Upload
  ) {
    updateAnimation(
      id: $id
      name: $name
      tags: $tags
      likes: $likes
      file: $file
    ) {
      id
      name
      url
      tags
      likes
    }
  }
`;

const gqlDocuments = {
  GetPublicAnimationsQuery,
  GetAnimationQuery,
  GetAnimationsQuery,
  CreateAnimationMutation,
  UpdateAnimationMutation,
};

type GqlStrings = {
  GetPublicAnimationsQuery: string;
  GetAnimationQuery: string;
  GetAnimationsQuery: string;
  CreateAnimationMutation: string;
  UpdateAnimationMutation: string;
};

const gqlStrings = Object.fromEntries(
  Object.entries(gqlDocuments).map(([key, value]) => [key, print(value)])
) as GqlStrings;

export default gqlStrings;
