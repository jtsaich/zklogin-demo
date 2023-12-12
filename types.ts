// "types": [
//   "seafood_restaurant",
//   "restaurant",
//   "food",
//   "point_of_interest",
//   "establishment"
// ],
// "formattedAddress": "PIER 1 1/2 The Embarcadero N, San Francisco, CA 94105, USA",
// "websiteUri": "http://lamarsf.com/",
// "displayName": {
//   "text": "La Mar Cocina Peruana",
//   "languageCode": "en"
// }

export interface Place {
  id: string;
  types: string[];
  formattedAddress: string;
  websiteUri: string;
  displayName: {
    text: string;
    languageCode: string;
  };
}
