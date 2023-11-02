// ui
import {
  Box, Header, SpaceBetween,
  Pagination, Table,
} from "@cloudscape-design/components";
import { useCollection } from '@cloudscape-design/collection-hooks';

// components
import { useAsyncData } from './DataProvider'
import { API, graphqlOperation } from 'aws-amplify'
import { listRewards } from '../graphql/queries'

export const REWARDS_COLUMN_DEFINITIONS = [
  {
    id: 'event',
    header: 'Event',
    cell: item => item.id,
  },
  {
    id: 'point',
    header: 'Point',
    cell: item => item.point,
  },
  {
    id: 'date',
    header: 'Date',
    cell: item => new Date(item.createdAt).toLocaleString('en', { timeZone: 'America/Los_Angeles' }),
  },
];

export const getHeaderCounterText = (
  items: ReadonlyArray<unknown>
) => {
  return `(${items.length})`;
};

const TableEmptyState = () => {
  return (
    <SpaceBetween size="l">
      <Box
        margin={{ vertical: 'xs' }}
        fontSize="heading-s"
        textAlign="center"
        color="inherit"
      >
        No Contents
      </Box>
    </SpaceBetween>
  );
}

class DataProvider {
  fetchData(userId) {
    try {
      return API.graphql(graphqlOperation(listRewards, {filter: {userId: {eq: userId}}}))
        .then(result => {
          //if (result.ok) {}
          return result.data.listRewards.items;
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

function Rewards(user) {
  const [rewards, setRewards, loading] = useAsyncData(() => new DataProvider().fetchData(user.userId));
  const { items, collectionProps, paginationProps } = useCollection(rewards, {
    filtering: {
      empty: <TableEmptyState resourceName="Reward" />,
    },
    // pagination: { pageSize: 5 },
  });

  return (
    <Table
      {...collectionProps}
      loading={loading}
      loadingText="Loading rewards"
      columnDefinitions={REWARDS_COLUMN_DEFINITIONS}
      items={items}
      header={
        <Header
          counter={getHeaderCounterText(rewards)}
        >
          Rewards
        </Header>
      }
      // pagination={<Pagination {...paginationProps} />}
    />
  );
}

export { Rewards };
