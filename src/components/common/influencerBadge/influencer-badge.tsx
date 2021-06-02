import * as React from 'react';
import { Link } from 'react-router-dom';

import { StyledText } from './influencer-badge.styled';

export type InfluencerBadgeTypes = {
  url?: string;
};

export const InfluencerBadge: React.FC<InfluencerBadgeTypes> = ({ url }) => {
  return url ? (
    <StyledText type="secondary">
      this FUQ has been influenced by <Link to={url}>this FUQ</Link>
    </StyledText>
  ) : null;
};
