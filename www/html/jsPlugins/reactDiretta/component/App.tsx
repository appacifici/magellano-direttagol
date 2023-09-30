import React, { Component } from "react";

class App extends Component {


  componentDidMount(): void {
    
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    
  }

  render(): React.ReactNode {    
    const div = <div className='main'>
      <h1>Ciao2</h1>      
    </div>

    return(
      div
    );
  }
}

export default App; 