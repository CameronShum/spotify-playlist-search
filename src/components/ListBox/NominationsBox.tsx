import React from 'react';
import firebase from 'firebase';
import { ListBox, NominationsRow } from 'components';
import { useFirebaseState } from 'components/Firebase/FirebaseProvider';

/**
 * ListBox component with NominationsRow
 */
const NominationsBox = () => {
  const { nominations } = useFirebaseState();
  const uid = firebase.auth().currentUser?.uid;

  return (
    <ListBox
      titleText="Nominations"
      rows={Object.keys(nominations).map((key) => (
        nominations[key].nominated && (
        <NominationsRow
          key={key}
          title={nominations[key].title}
          year={nominations[key].year}
          imdbId={key}
          signedIn={uid !== undefined}
        />
        )))}
    />
  );
};

export default React.memo(NominationsBox);
