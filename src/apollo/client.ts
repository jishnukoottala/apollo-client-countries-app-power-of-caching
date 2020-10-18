import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          country: {
            read: (existing, { toReference, args }) => {
              // toREference is like a wildcard, one of the things it does is, function takes object - typename and returns referecne object
              const countryRef = toReference({
                __typename: "Country",
                code: args?.code,
              });
              return existing ?? countryRef;
            },
          },
        },
      },
      Country: {
        keyFields: ["code"],
        fields: {
          nameWithEmoji: {
            read: (_, { readField }) => {
              const name = readField("name");

              const emoji = readField("emoji");

              return `${name} ${emoji}`;
            },
          },
          newField() {
            return "****---****";
          },
        },
      },
    },
  }),
});
