import { lifecycle, compose, withState } from './inferno-fp';

const renderShoppingList = (props) => {
	const { name, items } = props;

	return (
    <div className="shopping-list">
      <h1>Shopping List for {name}</h1>
      <ul>
        {items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const lifecycleSpec = {
	componentDidMount(props) {
    props.setItems(["Avocado", "Pineapple"])
	}
}

const ShoppingList = compose(
  withState('items', 'setItems', []),
	lifecycle(lifecycleSpec),
)(renderShoppingList);

export default ShoppingList