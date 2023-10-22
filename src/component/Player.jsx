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
  listRewards, listProfiles, getProfile
} from '../graphql/queries';

// components
import { format } from './Duration';
import { Survey } from './Survey';

export function Player(props) {
  const [playtime, setPlaytime] = useState(0);

  return (
    <Container>
      <Box>
        <ReactPlayer
          className='react-player'
          url={props.url}
          width='100%'
          loop={false}
          playing={true}
          muted={true}
          controls={true}
          light={false}
          pip={false}
          onEnded={ () => {
              updateRewardApi(props.user, props.classId, true, 20);
            }
          }
          onDuration={ (e) => {console.log(e)} }
          onProgress={ (e) => {
              var checkpoint = playtime + 10;
              if (e.playedSeconds > checkpoint) {
                console.log("checkpoint: " + e.playedSeconds);
                updateRewardApi(props.user, props.classId, checkpoint);
                updateProfileRewardApi(props.uid, props.user);
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
function updateProfileRewardApi(id, user, point = 10) {
  try {
    API.graphql(graphqlOperation(getProfile, { id: id })).then(
      (result) => {
        if (result.data.getProfile == null) {
          API.graphql(graphqlOperation(createProfile, {
            input: { id: id, userId: user, point: point }
          }));
        }
        else {
          var item = result.data.getProfile;
          API.graphql(graphqlOperation(updateProfile, {
            input: { id: item.id, _version: item._version, point: (point + item.point) }
          }));
        }
    });
  }
  catch (e) {
    console.log({e});
  }
}

function updateRewardApi(user, classId, played, complete = false, point = 10) {
  try {
    API.graphql(graphqlOperation(createReward, {
      input: { userId: user, classId: classId, completion: complete, played: played, point: point }
    }));
  }
  catch (e) {
    console.log({e});
  }
}
