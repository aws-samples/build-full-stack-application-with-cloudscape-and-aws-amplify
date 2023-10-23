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
  createProfile, updateProfile,
  createTrack, updateTrack
} from '../graphql/mutations';
import {
  listRewards, listProfiles, getProfile, getTrack
} from '../graphql/queries';

// components
import { format } from './Duration';
import { Survey } from './Survey';

export function Player(props) {
  const [played, setPlayed] = useState(0);
  const [marker, setMarker] = useState(0);
  const [duration, setDuration] = useState(0);
  const interval = 30;

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
          onPlay={ () => {
            setMarker(played + interval);
          }}
          onEnded={ () => {
            if (Math.round(played) >= Math.floor(duration)) {
              updateTrackApi(props.user, props.classId, props.uid, -1, true);
            }
          }}
          onDuration={ (e) => {
            setDuration(Math.floor(e));
          }}
          onProgress={ (e) => {
            var checkpoint = marker + interval;
            setPlayed(e.playedSeconds);

            if (played > checkpoint) {
              updateTrackApi(props.user, props.classId, props.uid, checkpoint);
              setMarker(checkpoint);
            }
          }}
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
function updateProfileRewardApi(id, user, classId, point = 10) {
  try {
    API.graphql(graphqlOperation(getProfile, { id: id })).then(
      (result) => {
        var item = result.data.getProfile;
        if (item == null) {
          API.graphql(graphqlOperation(createProfile, {
            input: { id: id, userId: user, point: point }
          }));
        }
        else {
          API.graphql(graphqlOperation(updateProfile, {
            input: { id: item.id, _version: item._version, point: (point + item.point) }
          }));
        }

        API.graphql(graphqlOperation(createReward, {
          input: { userId: user, classId: classId, point: point }
        }));
    });
  }
  catch (e) {
    console.log({e});
  }
}

function updateTrackApi(user, classId, uid, played, complete = false) {
  try {
    API.graphql(graphqlOperation(getTrack, { classId: classId, userId: user })).then(
      (result) => {
         var item = result.data.getTrack;
         if (item == null) {
           API.graphql(graphqlOperation(createTrack, {
             input: { classId: classId, userId: user, completion: complete, played: played }
           }));
           updateProfileRewardApi(uid, user, classId);
         }
         else {
           if (!item.completion) {
              API.graphql(graphqlOperation(updateTrack, {
                input: {
                  classId: item.classId,
                  userId: item.userId,
                  _version: item._version,
                  completion: complete,
                  played: (played + item.played)
                }
              }));
              updateProfileRewardApi(uid, user, classId);
         }}
    });
  }
  catch (e) {
    console.log({e});
  }
}
