import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Link, Navigate } from 'react-router-dom';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            confirmationCode: '',
            verified: false,
            confirmed: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
    }

    signUp() {
        const { username, password, name, email } = this.state;
        Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email,
                name: name
            }
        })
            .then(() => {
                console.log('Successfully signed up');
            })
            .catch((err) => console.log(`Error signing up: ${err}`))
    }

    confirmSignUp() {
        const { username, confirmationCode } = this.state;
        Auth.confirmSignUp(username, confirmationCode)
            .then(() => {
                console.log('Successfully confirmed signed up');
                this.setState({ ...this.state, confirmed: true });
            })
            .catch((err) => console.log(`Error confirming sign up - ${err}`))
    }

    handleSubmit(e) {
        const { verified } = this.state;

        e.preventDefault();

        if (verified) {
            this.confirmSignUp();
            this.setState({
                confirmationCode: '',
                username: ''
            });
        } else {
            this.signUp();
            this.setState({
                password: '',
                email: '',
                verified: true
            });
        }
        e.target.reset();
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        if (this.state.confirmed) {
            return (<Navigate to="/signin" />);
        } else {
            if (this.state.verified) {
                return (
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="name" className="block text-md font-medium text-gray-700">
                                            Confirmation Code
                                        </label>
                                        <input
                                            id="confirmationCode"
                                            name="confirmationCode"
                                            type="text"
                                            // autoComplete="name"
                                            required
                                            className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="ConfirmationCode"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className={`mt-2 bg-blue py-2 px-4 text-sm text-white group relative w-full flex justify-center rounded border border-blue hover:bg-blue-dark focus:outline-none focus:border-blue-dark`}
                                        >
                                            Confirm Sign up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                                    Register to Fovus now..
                                </h2>
                                <h2 className="mt-2 text-center text-sm text-gray-600">Already have an account? {<Link to="/signin" className='font-medium text-gray-600 hover:text-gray-dark-500'>Sign in</Link>} instead.
                                </h2>
                            </div>
                            <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="name" className="block text-md font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            // autoComplete="name"
                                            required
                                            className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Name"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mt-2 block text-md font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            // autoComplete="email"
                                            required
                                            className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="username" className="mt-2 block text-md font-medium text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            // autoComplete="username"
                                            required
                                            className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Username"
                                            onChange={this.handleChange}
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
                                            // autoComplete="current-password"
                                            required
                                            className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className={`bg-blue py-2 px-4 text-sm text-white group relative w-full flex justify-center rounded border border-blue hover:bg-blue-dark focus:outline-none focus:border-blue-dark`}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default SignUpForm;