// ui
import React, { useEffect, useState } from "react";
import {
  Alert, Box, Button, Container,
  Form, Flashbar, Grid, Header,
  Link, Modal, SpaceBetween, Textarea
} from "@cloudscape-design/components";

// apis
import { useAsyncData } from './DataProvider'
import { API, graphqlOperation } from 'aws-amplify'
import { listChannels, listMessages } from '../graphql/queries'
import {
  createMessage, updateMessage, deleteMessage
} from '../graphql/mutations'
import {
  onCreateMessage, onUpdateMessage, onDeleteMessage
} from '../graphql/subscriptions';

// utils
import moment from "moment";

export function Chat(props) {
  const [channels] = useAsyncData(() => fetchChannelApi());
  const [activeChannel, setActiveChannel] = useState(null);
  const [alerts, setAlerts] = useState([]);

  return (
    <SpaceBetween size="s">
      <Flashbar
        items={alerts}
        i18nStrings={{
          ariaLabel: "Notifications",
          notificationBarAriaLabel: "View all notifications",
          notificationBarText: "Notifications",
          errorIconAriaLabel: "Error",
          warningIconAriaLabel: "Warning",
          successIconAriaLabel: "Success",
          infoIconAriaLabel: "Info",
          inProgressIconAriaLabel: "In progress"
        }}
        stackItems
      />
      <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
        <Container>
          {
            channels.map(channel =>
              <Channel
                key={channel.id}
                channel={channel}
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
              />
            )
          }
        </Container>
        <Messages
          activeChannel={activeChannel}
          alerts={alerts}
          setAlerts={setAlerts}
        />
      </Grid>
    </SpaceBetween>
  );
}

const Channel = ({
  channel,
  activeChannel,
  setActiveChannel,
}) => {
  if (!activeChannel) { setActiveChannel({id: channel.id, name: channel.name}) }
  const switchChannelHandler = () => {
    setActiveChannel({id: channel.id, name: channel.name})
  }

  return (
    <Box>
      <Link onFollow={switchChannelHandler}>{channel.name}</Link>
    </Box>
  );
}

const Messages = ({
  activeChannel,
  alerts,
  setAlerts,
}) => {
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await API.graphql(graphqlOperation(listMessages, {filter: {channelId: {eq: activeChannel.id}}}))
      setMessages(result.data.listMessages.items.filter(item => item._deleted !== true))
    }
    fetchMessages()

    const createSub = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
      next: ({ value }) => { setMessages((messages) => [...messages, value.data.onCreateMessage]) }
    })

    const updateSub = API.graphql(graphqlOperation(onUpdateMessage)).subscribe({
      next: ({ value }) => {
        setMessages(messages => {
          const toUpdateIndex = messages.findIndex(item => item.id === value.data.onUpdateMessage.id)
          if (toUpdateIndex === - 1) { // If the message doesn't exist, treat it like an "add"
            return [...messages, value.data.onUpdateMessage]
          }
          return [...messages.slice(0, toUpdateIndex), value.data.onUpdateMessage, ...messages.slice(toUpdateIndex + 1)]
        })
      }
    })

    const deleteSub = API.graphql(graphqlOperation(onDeleteMessage)).subscribe({
      next: ({ value }) => {
        setMessages(messages => {
          const toDeleteIndex = messages.findIndex(item => item.id === value.data.onDeleteMessage.id)
          return [...messages.slice(0, toDeleteIndex), ...messages.slice(toDeleteIndex + 1)]
        })
      }
    })

    return () => {
      createSub.unsubscribe()
      updateSub.unsubscribe()
      deleteSub.unsubscribe()
    }
  }, [activeChannel])

  return (
    <>
    {
      (!activeChannel && activeChannel == null) ? <NoMessage /> : (
      <SpaceBetween size="s">
        <Container
          header={<Header variant='h3'>{activeChannel.name}</Header>}
        >
          <Box float='center'>
            <div style={{maxHeight:'360px',overflow:'auto',}}>
            <SpaceBetween size="xs">
            {
              messages.length > 0 ? (messages.sort((b, a) => b.createdAt.localeCompare(a.createdAt)).map(message =>
                <Message
                  key={message.id}
                  message={message}
                  activeMessage={activeMessage}
                  setActiveMessage={setActiveMessage}
                  alerts={alerts}
                  setAlerts={setAlerts}
                />
              )) : <NoMessage />
            }
            </SpaceBetween>
            </div>
          </Box>
        </Container>
        <Container>
          <MessageForm channelId={activeChannel.id} />
        </Container>
      </SpaceBetween>
      )
    }
    </>
  );
}

function NewLineToBr({children = ""}) {
  return children.split('\n').reduce(function (arr, line) {
    return arr.concat(line, <br />);
  },[]);
}

const NoMessage = () => {
  return (
    <Box
      padding={{ bottom: "s" }}
      fontSize="heading-s"
      textAlign="center"
      color="inherit"
    >
      <b>No Message</b>
    </Box>
  );
}

const Message = ({
  message,
  activeMessage,
  setActiveMessage,
  alerts,
  setAlerts,
}) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const isEditing = activeMessage && activeMessage.type === "edit" && activeMessage.id === message.id
  const deleteHandler = () => {
    deleteMessageApi(message.id, message._version, alerts, setAlerts);
    setConfirmVisible(false);
  }

  return (
    isEditing ?
    <MessageForm
      initText={message.content}
      channelId={message.channelId}
      messageId={message.id}
      messageVersion={message._version}
      activeMessage={activeMessage}
      setActiveMessage={setActiveMessage}
     /> : <>
    <Header
      variant="h5"
      actions={
        <Box>
          <SpaceBetween direction="horizontal" size="xxs">
            <Button iconName="edit" variant="icon" onClick={() => setActiveMessage({ id: message.id, type: "edit"})} />
            <Button iconName="remove" variant="icon" onClick={() => setConfirmVisible(true)} />
          </SpaceBetween>
        </Box>
      }
    >
      <Box variant="h4">{message.owner}</Box>
      <Box color="text-body-secondary">{moment(message.createdAt).fromNow()}</Box>
    </Header>
    <Box>
      <NewLineToBr>{message.content}</NewLineToBr>
    </Box>
    <Modal
      onDismiss={() => setConfirmVisible(false)}
      visible={confirmVisible}
      closeAriaLabel="Close modal"
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setConfirmVisible(false)}>Cancel</Button>
            <Button variant="primary" onClick={deleteHandler}>OK</Button>
          </SpaceBetween>
        </Box>
      }
    >
      Are you sure you want to delete this message? This cannot be undone.
      <Alert statusIconAriaLabel="Info">
        Proceeding with this action will delete the message and can affect related resources.{' '}
        <Link external={true} href="https://cloudscape.design/" ariaLabel="Learn more about this, opens in new tab">
          Learn more
        </Link>
      </Alert>
    </Modal>
    </>
  );
}

const MessageForm = ({
  initText = '',
  channelId,
  messageId,
  messageVersion,
  activeMessage,
  setActiveMessage,
}) => {
  const [post, setPost] = useState(initText);

  const sendMessage = () => {
    if (post.replace(/\s/g,'').length > 0) {
      if (activeMessage && activeMessage.type === "edit") {
        editMessageApi(messageId, messageVersion, post);
        setActiveMessage(null);
      }
      else {
        createMessageApi(post, channelId);
        setPost("");
      }
    }
  };
  const keyUpHandler = (e) => {
    if (e.detail.keyCode === 13 && !e.detail.shiftKey) {
      sendMessage();
      setPost("");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    sendMessage();
  };
  const cancelHandler = () => {
    activeMessage && activeMessage.type === "edit" ? setActiveMessage(null) : setPost("")
  };

  return (
    <form onSubmit={submitHandler}>
    <Form
      actions={
        <Box>
          <SpaceBetween direction="horizontal" size="xxs">
            <Button formAction="none" iconName="undo" variant="icon" onClick={cancelHandler} />
            <Button formAction="submit" iconName="caret-right-filled" variant="icon" />
          </SpaceBetween>
        </Box>
      }
    >
      <Textarea
        onChange={({detail}) => setPost(detail.value)}
        onKeyUp={keyUpHandler}
        value={post}
        rows={post.split(/\r\n|\r|\n/).length}
      />
    </Form>
    </form>
  );
}

// graphql apis
function fetchChannelApi() {
  try {
    return API.graphql(graphqlOperation(listChannels)).then(
      result => {
        return result.data.listChannels.items;
    });
  }
  catch (e) {
    console.log({e});
  }
}

function createMessageApi(post, channelId) {
  try {
    API.graphql(graphqlOperation(createMessage, {
      input: { content: post, channelId: channelId }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function editMessageApi(messageId, messageVersion, post) {
  try {
    API.graphql(graphqlOperation(updateMessage, {
      input: { id: messageId, content: post, _version: messageVersion }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

async function deleteMessageApi(messageId, messageVersion, alerts, setAlerts) {
  try {
    const result = await API.graphql(graphqlOperation(deleteMessage, {
      input: { id: messageId, _version: messageVersion }
    }));

    return result.data.deleteMessage;
  }
  catch (e) {
    console.log({e});

    if ("Unauthorized" === e.errors[0].errorType) {
      setAlerts([].concat(alerts, {
          type: "error",
          dismissible: true,
          dismissLabel: "Dismiss message",
          header: ("Failed to delete the message id: " + messageId),
          content: e.errors[0].message,
          id: alerts.length + 1,
          onDismiss: () => setAlerts(items => items.filter(item => item.id !== alerts.length + 1))
        })
      );
    }
  }
}
