import React from 'react';
import { ListItem, ListItemProps } from '@ui-kitten/components';
import { Down } from '../icons/Icons';

const ViewMore = (props: ListItemProps) => (
  <ListItem
    accessoryRight={Down}
    title="View More"
    {...props}
  />
);

export default ViewMore;
