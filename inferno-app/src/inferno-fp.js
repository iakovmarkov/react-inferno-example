import { Component } from 'inferno';

/**
 * Lazy implementation of lifecycle HoC 
 * TODO: Add more lifecycle methods
 */
const lifecycle = spec => Enhanced => (props = {}) => (
	<Enhanced
		{...props}
		onComponentDidMount={() => spec.componentDidMount(props)}
	/>
);

const compose = (...functors) =>
	functors.reduce(
		(s, c) => (...args) => s(c(...args))
	);

const withState = (
	stateName,
	stateUpdaterName,
	initialState
) => Enhanced => {
	class WithState extends Component {
		state = {
			stateValue: initialState,
		}

		updateStateValue = (value) =>
			this.setState(
				({ stateValue }) => ({
					stateValue: value
				})
			)

		render() {


			const extraProps = {
				[stateName]: this.state.stateValue,
				[stateUpdaterName]: this.updateStateValue,
			}

			return (
				<Enhanced {...this.props} {...extraProps} />
			)
		}
	}

	return WithState
}

export {
	compose,
	lifecycle,
	withState,
};