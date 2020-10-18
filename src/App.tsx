import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import {
  Flex,
  View,
  TextField,
  Heading,
  Header,
  Content,
  Well,
} from "@adobe/react-spectrum";
import { isTemplateExpression } from "typescript";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      code
      emoji
      nameWithEmoji @client
      newField @client
      languages {
        name
        rtl
      }
    }
  }
`;

const COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
      nameWithEmoji @client
    }
  }
`;

function App() {
  const [code, setCode] = useState("");

  const { data, loading, error } = useQuery(COUNTRY, {
    variables: { code },
    skip: code.length !== 2,
  });

  const {
    data: countriesData,
    loading: countriesLoading,
    error: countriesError,
  } = useQuery(COUNTRIES);

  return (
    <Flex minHeight="100vh" direction="column">
      <Heading level={1} margin="1rem">
        Countries Data{" "}
      </Heading>
      <div>
        {error && (
          <div>
            <h3>Error !!{error.message}</h3>
          </div>
        )}
        {loading && code.length < 2 && (
          <div>
            <h3>Loading....</h3>
          </div>
        )}
        <View padding="1rem">
          <TextField
            label="Country"
            type="text"
            placeholder="enter country code"
            value={code}
            onChange={setCode}
          />
        </View>

        {data && (
          <Content>
            {" "}
            <View
              borderWidth="thin"
              borderColor="dark"
              borderRadius="medium"
              padding="size-250"
              margin="1rem"
            >
              <Header>
                <b>Country</b>: {data?.country?.nameWithEmoji}
              </Header>
              <p>new field:m{data?.country?.newField}</p>
              <Header>
                Languages:{" "}
                {data?.country?.languages
                  .map((it: { name: string }) => it.name)
                  .join(",")
                  .toString()}
              </Header>
            </View>
          </Content>
        )}
      </div>
      <View padding="1rem">
        {countriesError && (
          <div>
            <h3>Error !!{countriesError.message}</h3>
          </div>
        )}
        {countriesLoading && (
          <div>
            <h3>Loading....</h3>
          </div>
        )}

        <Content>
          {" "}
          <View
            borderWidth="thin"
            borderColor="dark"
            borderRadius="medium"
            padding="size-250"
            margin="1rem"
          >
            <Well>
              {countriesData &&
                countriesData.countries.map(
                  (country: { nameWithEmoji: string; code: string }) => (
                    <p key={country.code}>Country: {country?.nameWithEmoji}</p>
                  )
                )}
            </Well>
          </View>
        </Content>
      </View>
    </Flex>
  );
}

export default App;
