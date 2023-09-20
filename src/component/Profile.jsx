// ui
import React from "react";
import peccy from "../static/images/peccy.png"
import "../static/css/ProfileCard.css"
import {
  Box, Container,
  Grid, Header, SpaceBetween
} from "@cloudscape-design/components";

// api
import { useAsyncData } from './DataProvider'
import { API, graphqlOperation } from 'aws-amplify'
import { listProfiles } from '../graphql/queries'

// component
import { Rewards } from "./Rewards";

export const Profile = (props) => {
  const [profile, setProfile, loading] = useAsyncData(() => new DataProvider().fetchData(props.user));

  // need to change the fixed width to be responsible
	return (
    <>
      <SpaceBetween size="s">
        <Container header={<Header variant="h2">Profile</Header>}>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box>
              <img src={ peccy } alt={ props.user } width="100px" id="avatar" /><br/>
              <b>User:</b> { props.user }<br/>
              <b>Points:</b> { profile && profile.length > 0 && !loading ? profile[0]['point'] : "0" }
            </Box>
          </Grid>
        </Container>
        <Rewards userId={props.user} />
      </SpaceBetween>
    </>
	);
};

class DataProvider {
  fetchData(userId) {
    try {
      return API.graphql(graphqlOperation(listProfiles, {filter: {userId: {eq: userId}}}))
        .then(result => {
          return result.data.listProfiles.items;
      });
    }
    catch (e) {
      console.log({e});
    }
  }
}
