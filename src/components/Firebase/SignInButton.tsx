import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { useUidDispatch } from './FirebaseProvider';

const SignInButton = () => {
  const [name, setName] = useState('');
  const dispatch = useUidDispatch();
  const processSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          dispatch(result.user.uid);
          setName(result.user.displayName || 'Signed In');
        }
      });
  };

  return (
    <ButtonContainer onClick={processSignIn} disabled={name !== ''}>
      {name || 'Sign In'}
    </ButtonContainer>
  );
};

export default SignInButton;

const ButtonContainer = styled.div<{disabled: boolean}>`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 30px;
  border-radius: 5px;

  pointer-events: ${(props) => props.disabled && 'none'};
  cursor: pointer;

  background-color: #00897B;
  color: white;
`;
