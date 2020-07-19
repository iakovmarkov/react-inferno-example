import React from 'react';
import createClass from 'create-react-class';

const compose = (...functors) =>
	functors.reduce(
		(s, c) => (...args) => s(c(...args))
	);

const lifecycle = spec => Enhanced =>
	createClass({
		...spec,
		render() {
			return <Enhanced {...this.props} />
		}
	})

const withState = (
	stateName,
	stateUpdaterName,
	initialState
) => Enhanced => {
	class WithState extends React.Component {
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
