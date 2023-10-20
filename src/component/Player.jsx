// ui
import React, { useState } from "react";
import ReactPlayer from 'react-player/lazy';
import {
  Box, Container, SpaceBetween,
} from "@cloudscape-design/components";
import '../static/css/Videoplayer.css';

// apis
import { API, graphqlOperation } from 'aws-amplify';
import {
  createReward, updateReward,
  createProfile, updateProfile
} from '../graphql/mutations';
import {
  listRewards, listProfiles
} from '../graphql/queries';

// components
import { format } from './Duration'
import { Survey } from './Survey'

export function Player(props) {
  const [playtime, setPlaytime] = useState(0);

  return (
    <Container>
      <Box>
        <ReactPlayer
          className='react-player'
          url={props.url}
          width='100%'
          loop={true}
          playing={true}
          muted={true}
          controls={true}
          light={false}
          pip={false}
          onDuration={ (e) => {console.log(e)} }
          onProgress={ (e) => {
              var checkpoint = playtime + 10;
              if (e.playedSeconds > checkpoint) {
                console.log("checkpoint: " + e.playedSeconds);
                updateRewardApi(props.user, props.classId, checkpoint);
                setPlaytime(checkpoint);
              }
              console.log(e.playedSeconds);
            }
          }
          onPause={ () => {console.log("playing false, paused")} }
          onPlay={ () => {console.log("playing true")} }
        />
      </Box>
      <SpaceBetween direction="vertical" size="s">
        <SpaceBetween direction="vertical" size="xxs">
          <Box variant="h2">{props.title}</Box>
          <Box variant="small">{props.author}</Box>
        </SpaceBetween>
        {props.desc}
        <Survey classTitle={props.title} classId={props.classId} userId={props.user} />
      </SpaceBetween>
    </Container>
  );
}

// graphql apis
function fetchProfilesApi(user) {
  try {
    return API.graphql(graphqlOperation(listProfiles, {
      filter: { userId: { eq: user }}
    })).then(
      result => {
        return result.data.listProfiles.items;
    });
  }
  catch (e) {
    console.log({e});
  }
}

function updateProfileRewardApi(id, _version, user, point = 10) {
  try {
    var result = fetchProfilesApi(user);

    if (result.data.listProfiles.length > 0 && result.data.listProfiles) {
      API.graphql(graphqlOperation(updateProfile, {
        input: { id: id, _version: _version, userId: user, point: point }
      }));
    }
    else {
      API.graphql(graphqlOperation(createProfile, {
        input: { userId: user, point: point }
      }));
    }
  }
  catch (e) {
    console.log({e});
  }
}

function fetchRewardsApi(user, classId) {
  try {
    return API.graphql(graphqlOperation(listRewards, {
      filter: { and: {
        classId: { eq: classId },
        userId: { eq: user }
      }}
    })).then(
      result => {
        return result.data.listRewards.items;
    });
  }
  catch (e) {
    console.log({e});
  }
}

function updateRewardApi(user, classId, played, duration = 0, point = 10) {
  try {
    API.graphql(graphqlOperation(createReward, {
      input: { userId: user, classId: classId, duration: duration, played: played, point: point }
    }));
  }
  catch (e) {
    console.log({e});
  }
}
