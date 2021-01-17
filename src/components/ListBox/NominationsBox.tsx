import React from 'react';
import { ListBox, NominationsRow } from 'components';
import { useFirebaseState } from 'components/Firebase/FirebaseProvider';

const NominationsBox = () => {
  const { nominations } = useFirebaseState();

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
        />
        )))}
    />
  );
};

export default React.memo(NominationsBox);
