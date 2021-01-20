# The Shoppies

https://theshoppies.cameronshum.com/

## Design
The design for the web app is done in [Figma](https://www.figma.com/file/9Ov5HPPh6w6iuFjbSLPNHB/Shopify-Front-end-Challenge-2021). 

The design is made to be simple to be intuitive and unrestrictive to the user. The search bar is at the top to promote the apps primary functionality. It is also designed with mobile in mind, to allow for a near seamless transition. When possible a word is replaced with an icon, this allows the app to be more user friendly, by not relying on a person's native language.

All buttons and icons are designed custom. All the components are built custom as well. 

## Performance
To get better performance the app goes through a few perfomance optimizations. The rerender time for adding a component was reduced from ~30ms average per item to ~15ms average per item, measured with the React DevTools Flamegraph. 

<figure>
  <img src="https://imgur.com/WtI4hMQ.png">
  <figcaption>
    <em>
      React DevTools Flamegraph Comparison; Pre Optimization vs. Post Optimization
    </em>
  </figcaption>
</figure>

<figure>
  <img src="https://imgur.com/fMsvZyK.png">
  <figcaption>
    <em>
      React DevTools Current Flamegraph
    </em>
  </figcaption>
</figure>


### Memoization
Many components use `React.memo()` to prevent rerenders when a component gets the same prop.

### Lifting the state
To perform further optimizations the state of the nominations was lifted. The state changed from a `useState()` in the main component to a context provider with a dispatch.

### Why lift the state?
The component `<ListBox />` handles the logic of rendering each box. It is passed the rows to render as a prop. If the nominations object is in the Main component, each row must know of all the other rows to perform a state update (either nomination or removal). An example of this is:

```javascript
const handleNominate = () => {
  setNominations({
    ...prevNominations,
    ...newNominationsObject,
  });
}

// Later in the code

<ListRow setNomination={handleNominate}>
```
In this example, setNominations will change everytime the prevNominations state is updated. This will trigger a rerender of all the other rows. By subscribing to the changes we can do this instead.

```javascript
const ListRow = ({imdbId}) => {
  const dispatch = useFirebaseDispatch();
  // other logic
  dispatch({type: 'nominate', payload: {imdbId}});
}
```

This makes the reducer handle the logic (the reducer is aware of the previous state), and each individual `<ListRow />` will have props that don't change on an action; preventing rerenders.

### The Effect of Lifting the State

<figure>
  <img src="https://imgur.com/SYbPsUY.png">
  <figcaption>
    <em>
      Prior to lifting the state; Nominating the 5th item
    </em>
  </figcaption>
</figure>

<figure>
  <img src="https://imgur.com/6ZfcPg1.png">
  <figcaption>
    <em>
      Post lifting the state; Nominating the 5th item
    </em>
  </figcaption>
</figure>

<figure>
  <img src="https://imgur.com/Sccy3Wm.png">
  <figcaption>
    <em>
      Current Web App; Nominating the 5th item
    </em>
  </figcaption>
</figure>

## Database Schema
The database used in the app is Firebase Realtime Database. This allows for an easy authorization flow and a simple NoSql database.

The database is structured like follows:

```javascript
{
  globalNominations: {
    [imdbId: string]: (count: number)
    ...
  },
  items: {
    [imdbId: string]: {
      title:  (title: string),
      imdbId: (imdbId: string),
      year:   (year: string),
    },
    ...
  },
  users: {
    [uid: string]: {
      [imdbId: string]: true
    }
  }
}
```
Any user, regardless of authentication state, can read from the globalNominations path, and items path. This is how globalNominations is populated on app start. 

A user is only allowed to read and write to their own user uid. They may write to the globalNominations and they may also write to the items. This security is maintained with the firebase security rules.

The items are abstracted away from globalNominations and users to prevent data duplication and allow for easier querying.

imdbId is included in each item to allow for easier querying.  
