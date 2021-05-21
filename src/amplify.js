import gql from "graphql-tag";
import Amplify, { Auth, Storage, API } from "aws-amplify";

import AWSAppSyncClient from "aws-appsync";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);
Amplify.register(Auth);
Amplify.register(API);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  disableOffline: true,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
    fetchPolicy: "network-only",
  },
});

export { Auth, gql, client, Storage };
