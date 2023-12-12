import { request } from "graphql-request";

export default async function graphQLRequest(query: string, variables: any) {
  const data: any = await request(
    process.env.HASURA_PROJECT_ENDPOINT!,
    query,
    variables,
    { "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET! }
  );

  return data;
}
