import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [signedIn, setSignedIn] = useState(false);
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         username: '',
    //         password: '',
    //         signedIn: false
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.signIn = this.signIn.bind(this);
    // }

    let navigate = useNavigate();

    const signIn = () => {
        if (process.env.REACT_APP_AMPLIFY === "true") {
            Auth.signIn({
                username: username,
                password: password
            })
                .then((data) => { window.sessionStorage.setItem('cognitoSession', JSON.stringify(data.signInUserSession)); console.log('successfully signed in', data); navigate('/dashboard', { state: { signedIn: true }, replace: true }) })
                .catch((err) => { console.log(`Error signing in: ${err}`); });
        } else {
            if (username === 'test' && password === 'test') {
                console.log('successfully signed in');
                navigate('/dashboard', { state: { signedIn: true }, replace: true })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        signIn();
        // this.setState({
        //     username: '',
        //     password: '',
        //     signedIn: signedIn
        // });
        // }).catch((error) => console.error(error));
        e.target.reset();
    }

    const handleChange = (e) => {
        if (e.target.id === 'username') {
            setUsername(e.target.value);
        } else if (e.target.id === 'password') {
            setPassword(e.target.value);
        }
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                        Sign in to Fovus Application
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="block text-md font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="mt-2 block text-md font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            className={`bg-blue py-2 px-4 text-sm text-white group relative w-full flex justify-center rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Signin
                        </button>
                    </div>
                </form>
                <h2 className="mt-2 text-center text-sm text-gray-600">New to Fovus? {' '}
                    <Link to="/signup" className='font-medium text-indigo-600 hover:text-indigo-500'>Register Now</Link>
                </h2>
            </div>
        </div>
    );
}

export default SignInForm;