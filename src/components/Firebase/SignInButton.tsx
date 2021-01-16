import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { useUidDispatch } from './FirebaseProvider';

const SignInButton = () => {
  const [uid, setUid] = useState('');
  const dispatch = useUidDispatch();

  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          dispatch(result.user.uid);
          setUid(result.user.uid || 'Signed In');
        }
      });
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatch('');
    setUid('');
  };

  return (
    <ButtonContainer onClick={uid ? handleSignOut : handleSignIn}>
      {uid ? 'Sign Out' : 'Sign In'}
    </ButtonContainer>
  );
};

export default SignInButton;

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;

  background-color: #00897B;
  color: white;
`;