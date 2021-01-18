# The Shoppies

## Design
The design for the web app is done in [Figma](https://www.figma.com/file/9Ov5HPPh6w6iuFjbSLPNHB/Shopify-Front-end-Challenge-2021). 

The design is made to be simple to be intuitive and unrestrictive to the user. The search bar is at the top to promote the apps primary functionality. It is also designed with mobile in mind, to allow for a near seamless transition. When possible a word is replaced with an icon, this allows the app to be more user friendly, by not relying on a person's native language.

All buttons and icons are designed custom. All the components are built custom as well. 

## Performance
To get better performance the app goes through a few perfomance optimizations.

### Memoization
Many components use `React.memo()` to prevent rerenders when a component gets the same prop.

### Lifting the state
To perform further optimizations the state of the nominations was lifted. The state changed from a `useState()` in the main component to a context provider with a dispatch.

### Why lift the state?
The component `<ListBox />` handles the logic of rendering each box. It is passed the rows to render as a prop. If the nominations object is in the Main component, each row must know of all the other rows to perform a state update (either nomination or removal). An example of this is:

``` JS
const setNominations = () => {
  setNominations({
    ...prevNominations,
    ...newNominations,
  })
}

// Later in the code

<ListRow setNominations={setNominations}>
```
In this example, setNominations will change everytime the prevNominations state is updated. This will trigger a rerender of all the other rows. By subscribing to the changes we can do this instead.

```JS
const ListRow = ({imdbId}) => {
  const dispatch = useFirebaseDispatch();
  // other logic
  dispatch({type: 'nominate', payload: {imdbId}})
}
```

This makes the reducer handle the logic (and the reducer is aware of the previous state), and each individual `<ListRow />` will have props that don't change on a action; preventing rerenders.