// ui
import React, { useEffect, useState } from "react";
import {
  Box, Button, Header, Input, Modal,
  SpaceBetween, Table
} from "@cloudscape-design/components";

// apis
import { useAsyncData } from './DataProvider'
import { API, graphqlOperation } from 'aws-amplify'
import {
  createChannel, updateChannel, deleteChannel
} from '../graphql/mutations'
import {
  listChannels
} from '../graphql/queries'
import {
  onCreateChannel
} from '../graphql/subscriptions';

const CHANNELS_COLUMN_DEFINITIONS = [
  {
    id: 'name',
    header: 'Name',
    cell: item => item.name,
    isRowHeader: true,
  },
  {
    id: 'owner',
    header: 'Channel owner',
    cell: item => item.owner,
  },
];

export function ChannelsTable() {
  const [channels, setChannels, loading] = useAsyncData(() => fetchChannelApi());
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [channelName, setChannelName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (channelName.replace(/\s/g,'').length > 0) {
      createChannelApi(channelName, "icon");
      setChannelName("");
      setConfirmVisible(false);
    }
  };

  useEffect(() => {
    const createSub = API.graphql(graphqlOperation(onCreateChannel)).subscribe({
      next: ({value}) => {setChannels((channels) => [...channels, value.data.onCreateChannel])}
    })

    return () => {
      createSub.unsubscribe()
    }
  }, [])

  return (
    <>
    <Table
      className="channels-table"
      columnDefinitions={CHANNELS_COLUMN_DEFINITIONS}
      loading={loading}
      loadingText="Loading channels"
      items={channels}
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={event => setSelectedItems(event.detail.selectedItems)}
      header={
        <Header
          counter={!loading && getHeaderCounterText(channels, selectedItems)}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!atLeastOneSelected}>Delete</Button>
              <Button onClick={() => setConfirmVisible(true)}>Create channel</Button>
            </SpaceBetween>
          }
        >
          Channels
        </Header>
      }
    />
    <Modal
      onDismiss={() => setConfirmVisible(false)}
      visible={confirmVisible}
      size="small"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setConfirmVisible(false)}>Cancel</Button>
            <Button variant="primary" onClick={submitHandler}>OK</Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Input
        onChange={({detail}) => setChannelName(detail.value)}
        value={channelName}
      />
    </Modal>
    </>
  );
}

const getHeaderCounterText = (
  items: ReadonlyArray<unknown>,
  selectedItems: ReadonlyArray<unknown> | undefined
) => {
  return selectedItems && selectedItems?.length > 0 ? `(${selectedItems.length}/${items.length})` : `(${items.length})`;
};


export function Admin(props) {
  return (
    <Box>
     <SpaceBetween size="l">
        <ChannelsTable />
      </SpaceBetween>
    </Box>
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

function createChannelApi(name, icon='') {
  try {
    API.graphql(graphqlOperation(createChannel, {
      input: { name: name, icon: icon }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function editChannelApi(id, version, name) {
  try {
    API.graphql(graphqlOperation(updateChannel, {
      input: { id: id, _version: version, name: name }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function deleteChannelApi(id, version) {
  try {
    API.graphql(graphqlOperation(deleteChannel, {
      input: { id: id, _version: version }
    }));
  }
  catch (e) {
    console.log({e});
  }
}
