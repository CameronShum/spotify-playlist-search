import { XIcon } from 'icons';
import React from 'react';
import styled from 'styled-components/macro';

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
  message: string,
  setBannerVisible: React.Dispatch<boolean>
}

/** Renders a banner at the top of the screen, with a message.
 *  @param type one of ['info', 'warning', 'error']; determines color
 *  @param message string for a message
 *  @param setBannerVisible handles visibilitie of the banner
 */
const Banner = ({ type, message, setBannerVisible }: BannerProps) => (
  <Container
    background={TYPE_TO_COLOR[type].background}
    textColor={TYPE_TO_COLOR[type].text}
  >
    {message}
    <CloseContainer
      background={TYPE_TO_COLOR[type].background}
      textColor={TYPE_TO_COLOR[type].text}
      onClick={() => setBannerVisible(false)}
    >
      <XIcon />
    </CloseContainer>
  </Container>
);

export default Banner;

interface ContainerProps {
  background: string,
  textColor: string
}

const CloseContainer = styled.div<ContainerProps>`
  width: 16px;
  height: 16px;
  margin-left: 20px;
  border-radius: 100%;
  cursor: pointer;
  background-color: ${(props) => props.textColor};

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 16px;
    height: 16px;

    > path {
      stroke: ${(props) => props.background};
    }
  }
`;

const Container = styled.div<ContainerProps>`
  position: sticky;
  top: 0px;
  width: 100%;
  padding: 7px 0px;

  background-color: ${(props) => props.background};
  color: ${(props) => props.textColor};
  font-size: 18px;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
`;
