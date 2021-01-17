import React from 'react';
import { ListBox, GlobalNominationsRow } from 'components';
import { useFirebaseState } from 'components/Firebase/FirebaseProvider';

/**
 * ListBox component with GlobalNominationsRow
 */
const GlobalNominationsBox = () => {
  const { globalNominations } = useFirebaseState();

  return (
    <ListBox
      titleText="Global Nominations"
      rows={Object.keys(globalNominations)
        .filter((key) => globalNominations[key].count !== 0)
        .sort((key1, key2) => globalNominations[key2].count - globalNominations[key1].count)
        .map((key) => (
          <GlobalNominationsRow
            key={key}
            title={globalNominations[key].title}
            year={globalNominations[key].year}
            count={globalNominations[key].count}
          />
        ))}
    />
  );
};

export default React.memo(GlobalNominationsBox);
