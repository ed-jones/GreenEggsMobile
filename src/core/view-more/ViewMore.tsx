import React from 'react';
import { ListItem } from '@ui-kitten/components';
import { Down } from '../icons/Icons';

interface IViewMore {
  onPress: () => void;
}

const ViewMore = ({ onPress }: IViewMore) => (
  <ListItem
    style={{marginTop: 8, paddingLeft: 0, paddingRight: 0}}
    onPress={onPress}
    accessoryRight={Down}
    title="View More"
  />
);

export default ViewMore;
