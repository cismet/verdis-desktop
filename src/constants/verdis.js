import { gql } from "graphql-request";

import queries from "./queries";
export const REST_SERVICE = "https://verdis-cloud.cismet.de/verdis/api/";
export const REST_SERVICE_WUNDA = "https://wunda-cloud.cismet.de/wunda/api";
export const DOMAIN = "VERDIS_GRUNDIS";
export const WUNDA_DOMAIN = "WUNDA_BLAU";
export const ENDPOINT = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";
export const WUNDA_ENDPOINT =
  REST_SERVICE_WUNDA + "/graphql/" + WUNDA_DOMAIN + "/execute";
export const APP_KEY = "verdis-desktop";
export const STORAGE_PREFIX = "1";
export const STORAGE_POSTFIX = "1";

export const query = gql`
  ${queries.kassenzeichenD}
`;
export const pointquery = gql`
  ${queries.kassenzeichenForPoint}
`;

export const geoFieldsQuery = gql`
  ${queries.geoFields}
`;

export const jwtTestQuery = gql`
  ${queries.jwtTestQuery}
`;

export const vccPasswd = "---";
export const flurStueckQuery = gql`
  ${queries.flurstuecke}
`;

export const buchungsblattQuery = gql`
  ${queries.buchblatt}
`;

export const kassenzeichenForBuchungsblattQuery = gql`
  ${queries.kassenzeichenForBuchungsblatt}
`;
