# The Shoppies

https://theshoppies.cameronshum.com/

## Design
The design for the web app is done in [Figma](https://www.figma.com/file/9Ov5HPPh6w6iuFjbSLPNHB/Shopify-Front-end-Challenge-2021). 

The design is made to be simple to be intuitive and unrestrictive to the user. The search bar is at the top to promote the apps primary functionality. It is also designed with mobile in mind, to allow for a near seamless transition. When possible a word is replaced with an icon, this allows the app to be more user friendly, by not relying on a person's native language.

All buttons and icons are designed custom. All the components are built custom as well. 

## Performance
To get better performance the app goes through a few perfomance optimizations. The rerender time for nominating a movie was reduced from ~30ms average per movie to ~15ms average per movie, measured with the React DevTools Flamegraph. The current web app has additional rerenders for better user feedback, although many of these rerenders are <5ms. 

<figure>
  <figcaption>
    <em>
      React DevTools Flamegraph Comparison; Pre Optimization vs. Post Optimization
    </em>
  </figcaption>
  <img src="https://imgur.com/WtI4hMQ.png">
</figure>

<figure>
  <figcaption>
    <em>
      React DevTools Current Flamegraph
    </em>
  </figcaption>
  <img src="https://imgur.com/fMsvZyK.png">
</figure>


### Memoization
Many components use `React.memo()`. This prevents rerenders when a component gets passed the same props.

### Lifting the state
To perform further optimizations, the state of the nominations was lifted. The nominations object changed from a `useState()` in `<MainPage />` to a context provider with a dispatch.

### Why lift the state?
The component `<ListBox />` handles the logic for rendering each box. It is passed the rows to render as children. If the nominations object is in the Main component, each row must know of all the other rows to perform a state update (either nomination or removal). An example of this is:

```javascript
const handleNominate = (nomination) => {
  setNominations({
    ...prevNominations,
    ...nomination,
  });
}

// Later in the code
<ListBox 
  rows={nominations.map(nomination => <ListRow setNomination={() => handleNominate(nomination)} contents={nomination}/>)}
/>
```
In this example, setNomination in `<ListRow />` will change every time the prevNominations state is updated. This will trigger a rerender of all the other rows because none of the previous setNomination will have the same memory address as the newly created setNomination. There is no way to avoid this problem with state management in `<MainPage />`. If each component subscribes to the changes in the state, this can be done:

```javascript
const ListRow = ({contents}) => {
  const dispatch = useFirebaseDispatch();
  // other logic
  dispatch({type: 'nominate', payload: {...contents}});
}
```
In this example, the state management is moved from the `<MainPage />` component to a reducer. The reducer handles the logic for creating the new state, and each individual `<ListRow />` will be able to dispatch their own contents to the reducer. The `<ListRow />` has become a pure component and will have its rerender prevented by `React.memo()`.

### The Effect of Lifting the State

<figure>
  <figcaption>
    <em>
      Prior to lifting the state; Nominating the 5th item
    </em>
  </figcaption>
  <img src="https://imgur.com/SYbPsUY.png">
</figure>

In this image, all rows are rerendered causing the component to take 24.3ms to rerender completely. 

<figure>
  <figcaption>
    <em>
      Post lifting the state; Nominating the 5th item
    </em>
  </figcaption>
  <img src="https://imgur.com/6ZfcPg1.png">
</figure>

In the optimized app, only the needed rows are rerendered. The two ListBox components are reduced from 11.2ms to 5.2ms and 10.3ms to 4.3ms respectively. Here, additional rerenders are needed for the provider, this is a side effect of introducing the provider as a parent of `<MainPage />`. There is a small overhead (<1ms) to achieve double the speed in ListBox.

<figure>
  <figcaption>
    <em>
      Current Web App; Nominating the 5th item
    </em>
  </figcaption>
  <img src="https://imgur.com/Sccy3Wm.png">
</figure>

The performance of the current application is similar to that of the one above. 

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

A user is only allowed to read and write to their own user uid. They may write to the globalNominations and they may also write to the items. This security is ensured by the firebase security rules.

The movies (called items in the database) are abstracted from globalNominations and users to prevent data duplication and allow for easier querying.

imdbId is also included in each item to allow for easier querying.  

## What's next
- Tackling additional instances of unnecessary rerenders and building a React architecture that abstracts rerender optimization from the developer.
- Database planning and migrations to allow for daily, monthly, yearly, and all nominations.
- Custom authorization flow.
- Creating a backend to sign omdb api requests with a uid, to remove the api key from the build package.