import graphQLRequest from "./graphql";

export async function getPlacesByGoogleIds(googlePlaceIds: string[]) {
  const query = `
  query GetPlacesByGoogleIds($goolgePlaceIds: String_comparison_exp) {
    places(where: {goolge_place_id: $goolgePlaceIds}) {
      id
      metadata
      rating
      goolge_place_id
      created_at
    }
  }
  `;

  const list = {
    _in: googlePlaceIds,
  };

  const variables = { goolgePlaceIds: list };
  const data = await graphQLRequest(query, variables);
  return data.places;
}

export async function getPlaceByGoogleId(id: string) {
  const query = `
  query GetPlaceById($id: uuid!) {
    places_by_pk(id: $id) {
      id
      metadata
      rating
      goolge_place_id
      created_at
    }
  }
  `;

  const variables = { id };
  const data = await graphQLRequest(query, variables);
  return data.places_by_pk;
}

type PlaceInput = {
  metadata: any;
  rating: number;
  goolge_place_id: string;
};

export async function createPlace(place: PlaceInput) {
  const query = `
  mutation CreatePlace($place: places_insert_input!) {
    insert_places_one(object: $place) {
      id
      metadata
      rating
      goolge_place_id
      created_at
    }
  }
  `;

  const variables = { place };
  const data = await graphQLRequest(query, variables);
  return data.insert_places_one;
}
