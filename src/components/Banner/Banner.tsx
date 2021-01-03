import React from 'react';
import styled from 'styled-components';

const TYPE_TO_COLOR = {
  info: {
    background: '#2962FF',
    text: '#ffffff',
  },
  warning: {
    background: '#ffd600',
    text: '#000000',
  },
  error: {
    background: '#d50000',
    text: '#ffffff',
  },
};

interface BannerProps {
  type: 'info' | 'warning' | 'error',
  message: string
}

/** Renders a banner at the top of the screen, with a message.
 *  @param type one of ['info', 'warning', 'error']; determines color
 *  @param message string for a message
 */
const Banner = ({ type, message }: BannerProps) => (
  <Container background={TYPE_TO_COLOR[type].background} textColor={TYPE_TO_COLOR[type].text}>
    {message}
  </Container>
);

export default Banner;

interface ContainerProps {
  background: string,
  textColor: string
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: 7px 0px;

  background-color: ${(props) => props.background};
  color: ${(props) => props.textColor};
  font-size: 18px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
