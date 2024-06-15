import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/graphql",
  documents: "./src/graphql/documents.ts",
  ignoreNoDocuments: true,
  config: {
    skipTypeNameForRoot: true,
    useTypeImports: true,
  },
  generates: {
    "src/graphql/gql/": {
      preset: "client",
      plugins: ["typescript-resolvers"],
    },
  },
};

export default config;
