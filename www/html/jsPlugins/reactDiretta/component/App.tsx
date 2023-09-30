import React, { Component } from "react";

class App extends React.Component {

	componentDidMount(): void {

	}

	componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {

	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {

	}

	render(): React.ReactNode {
		const div = <div className='main'>
			<h1>Ciao5</h1>
		</div>

		return (
			div
		);
	}
}

export default App; 