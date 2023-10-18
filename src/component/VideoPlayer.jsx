// ui
import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { useParams } from "react-router-dom";
import '../static/css/Videoplayer.css';
import {
  Box, Container, SpaceBetween,
} from "@cloudscape-design/components";

// api
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

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Videoplayer extends React.Component {
  interval;
  classID = this.props.classId;
  username = this.props.userName;
  state = {
    url: null,
    duration: 0,
    loaded: 0,
    played: 0,
    playing: true,
    _version: 0,
    v_data: null,
  }

  handleDuration = (duration) => {
    this.setState({ duration })
  }

  handleProgress = state => {
    //console.log('played', state.played)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking && this.state.playing) {
      this.setState(state)
    }
  }

  handlePause = () => {
    this.setState({ playing: false })
  }

  handlePlay = () => {
    this.setState({ playing: true })
  }

  handleEnd = () => {
    this.updatePlayHeader()
  }

  async CreateReward(data) {
    // video id 와 username 으로 검색해서 있는 레코드인지 확인
    var result = await API.graphql(graphqlOperation(listRewards, {
      filter: {
          and:{
          classId: {
              eq: this.classID
          },
          userId: {
              eq: this.username
          }
        }
      }
    }));

    // 없으면 신규 작업
    if (result.data.listRewards.items.length === 0) {
      await API.graphql(graphqlOperation(createReward, {
        input: {
          classId: this.classID,
          userId: this.username,
          timeDuration: format(data),
          lastedPlay: format(data),
          point: 0
        }}
      ));
    }
    else {
      var lastedPlay = result.data.listRewards.items[0]['lastedPlay']
      var a = lastedPlay.split(':'); 
      var b = format(data).split(':')
      var lastedPlay_seconds = (+a[0]) * 60 + (+a[1])
      var played_seconds = (+b[0]) * 60 + (+b[1])
      var lastedPlay_max = Math.max(lastedPlay_seconds,played_seconds)

      if (result.data.listRewards.items[0]['point'] === 0) {
        if (lastedPlay_max>=Math.floor(this.state.duration)) {
          await API.graphql(graphqlOperation(updateReward, {
            input: {
              id: result.data.listRewards.items[0]['id'],
              point: 10,
              _version: result.data.listRewards.items[0]['_version']
            }}
          ));

          // insert 
          var result_rewards = await API.graphql(graphqlOperation(listProfiles, {
            filter: {
              userId: {
                eq: this.username
              }
            }
          }));

          // later add this to user creation process
          if (result_rewards.data.listProfiles.items.length === 0) {
            await API.graphql(graphqlOperation(createProfile, {
              input: {
                userId: this.username,
                point: '0'
              }}
            ));
          }

          //update
          var result_rewards_update = await API.graphql(graphqlOperation(listProfiles, {
            filter: {
              userId: {
                eq: this.username
              }
            }}
          ));

          await API.graphql(graphqlOperation(updateProfile, {
            input: {
              id: result_rewards_update.data.listProfiles.items[0]['id'],
              userId: this.username,
              point: parseInt(result_rewards_update.data.listProfiles.items[0]['point'])+10,
              //_version: result_rewards_update.data.listProfiles.items[0]['_version']
            }}
          ));
        }
      }

      var lastedPlay_max_string;

      if (lastedPlay_max%60>=10) {
        lastedPlay_max_string = parseInt(lastedPlay_max / 60)+":"+lastedPlay_max%60
      }
      else {
        lastedPlay_max_string = parseInt(lastedPlay_max / 60)+":0"+lastedPlay_max%60
      }

      await API.graphql(graphqlOperation(updateReward, {
        input: {
          id: result.data.listRewards.items[0]['id'],
          timeDuration: format(data),
          lastedPlay: lastedPlay_max_string,
          _version: result.data.listRewards.items[0]['_version']
        }}
      ));
    }
  }

  test = state => {
    if (this.state.playing) {
      //this.state.actual_play = this.state.actual_play + 1
      this.CreateReward((this.state.played * this.state.duration))
    }
  }

  ref = player => {
    this.player = player
  }

  componentDidMount() {
    this.interval = setInterval(this.test, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <Container>
        <Box>
          <ReactPlayer
            className='react-player'
            url={this.props.videoUrl}
            width='100%'
            loop={true}
            playing={true}
            muted={true}
            controls={true}
            light={false}
            pip={false}
            onDuration={this.handleDuration}
            onProgress={this.handleProgress}
            onPause={this.handlePause}
            onPlay={this.handlePlay}
            onEnded={this.handleEnd}
          />
        </Box>
        <SpaceBetween direction="vertical" size="s">
          <SpaceBetween direction="vertical" size="xxs">
            <Box variant="h2">{this.props.videoName}</Box>
            <Box variant="small">{this.props.videoAuthor}</Box>
          </SpaceBetween>
          {this.props.videoDescription}
          <Survey classTitle={this.props.videoName} classId={this.props.classId} userId={this.props.userName} />
        </SpaceBetween>
      </Container>
    );
  }
}

export default withParams(Videoplayer);
