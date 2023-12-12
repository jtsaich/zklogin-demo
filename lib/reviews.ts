import graphQLRequest from "./graphql";

type ReviewInput = {
  user_id: string;
  rating: number;
  review: string;
  transaction_id: string;
  place_id: string;
};

export async function createReview(review: ReviewInput) {
  const query = `
  mutation CreateReview($review: reviews_insert_input!) {
    insert_reviews_one(object: $review) {
      id
      user_id
      rating
      review
      transaction_id
      place_id
      created_at
    }
  }
  `;

  const variables = { review };
  const data = await graphQLRequest(query, variables);
  return data.insert_reviews_one;
}
