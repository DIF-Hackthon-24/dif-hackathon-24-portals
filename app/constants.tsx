export const serviceProviderKeyInfo = {
  kms: "Local",
  keyId:
    "did:key:z6MkuDqbwjZVchAEYrGB3j8meWemiMVyVNYcYovVSn4YbxDj#z6MkuDqbwjZVchAEYrGB3j8meWemiMVyVNYcYovVSn4YbxDj",
  privateJwk: {
    crv: "Ed25519",
    d: "Omf8eBsTq0xO-3mds8lX4bUftsif9TvW0sVDh-3qcnA",
    kty: "OKP",
    x: "228d05s8en-Msmw2NeLDBBAen7D2MtuD4ZCa0lzjAn4",
    kid: "hjVvUaRe21E2xqh0X7dza4Jw6tH73HbDn37iCQOcJXU",
    alg: "EdDSA"
  }
};

export const hotelSearchPreferencesTabAttributes = [
  { query: "roomType", display: "Room Type" },
  { query: "smoking", display: "Smoking" },
  { query: "wheelchairAccessible", display: "Wheelchair Accessible" },
  { query: "breakfastIncluded", display: "Breakfast Included" }
];

export const hotelStayPreferencesTabAttributes = [
  { query: "roomTemp", display: "Room Temperature" },
  { query: "ordersRoomService", display: "Orders room service" },
  { query: "numExtraPillows", display: "Extra pillows count" },
  { query: "lateCheckout", display: "Late checkout" },
  { query: "valetParking", display: "Valet parking" },
  { query: "roomMicrowave", display: "Room microwave" }
];

export const diningPreferencesTabAttributes = [
  { query: "diet", display: "Diet" },
  { query: "allergies", display: "Allergies" },
  { query: "childFriendlyOptions", display: "Child Friendly Options" },
  { query: "cuisines", display: "Cuisines" }
];
