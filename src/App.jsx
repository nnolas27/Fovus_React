import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

// const navigate = useNavigate();

class App extends Component {
  // handleSignup() {
  //     this.setState({
  //         signedUp: true
  //     });
  // }

  render() {
    // return (this.state.signedUp ? <SignInForm navigate /> : <SignUpForm handleSignup={this.handleSignup} navigate />);
    // return (
    //   <div className="App">
    //     <Form />
    //   </div>
    // );
    return (
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<App />} /> */}
          <Route path="/" element={<SignInForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm handleSignup={this.handleSignup} />} />
          <Route path="/dashboard" element={<Form />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
