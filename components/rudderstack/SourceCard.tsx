import React from 'react';

import styled from '@emotion/styled';

import { Box, Card, CardHeader, Text, Heading } from '@chakra-ui/react';

interface SourceCard {
  name: string;
  id: number;
  onClick: (id: number) => void;
}

const StyledCard = styled(Card)(() => ({
  ':hover': {
    'cursor': 'pointer'
  }
}))

export function SourceCard(props: SourceCard) {
  return (
    <StyledCard width={300} onClick={() => props.onClick(props.id)}>
      <CardHeader>
        <Heading size="sm">{props.name}</Heading>
      </CardHeader>
    </StyledCard>
  );
}