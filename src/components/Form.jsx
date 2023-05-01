import React, { useEffect, useState } from "react";
import { Link, useLocation, } from "react-router-dom";
import { uploadFile, updateFile } from '../service/Helper'

const Form = () => {
    const [formData, setFormData] = useState({
        inputFile: '',
        inputText: ''
    });
    const location = useLocation();

    useEffect(() => {
        if (formData.inputFile !== '' && formData.inputText !== '') {
            const uploadData = async () => {
                console.log(formData.inputFile);
                let s3Params = {
                    Bucket: process.env.REACT_APP_BUCKET_NAME,
                    Key: formData.inputFile.name,
                    Body: formData.inputFile
                };
                let inputText = formData.inputText;
                uploadFile(s3Params).then(function (s3Response) {
                    console.log(s3Response);
                    if (s3Response !== undefined && s3Response !== null) {
                        let payload = {
                            inputText: inputText,
                            s3FilePath: s3Response.Bucket + '/' + s3Response.Key
                        };
                        updateFile(payload).then((updateResponse) => { console.log(updateResponse); })
                            .catch((err) => console.error(err));
                    }
                })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
            if (formData.inputText.length > 0)
                uploadData();
        }
    }, [formData]);

    console.log(location)
    if (location.state === null) {
        return (
            <div>
                <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                    You haven't Signed In yet.
                </h2>
                <h2 className="mt-2 text-center text-sm text-gray-600"> {' '}
                    <Link to="/signin" className='font-medium text-indigo-600 hover:text-indigo-500'>Sign in</Link>
                </h2>
            </div>
        );
    } else {
        return (
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-4">
                <h1 className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl dark:text-white">
                    Fovus Application
                </h1>
                <div className="hidden sm:block sm:ml-6">
                    <div className="space-x-4 text-right">
                        <Link
                            to="/signin"
                            className="text-gray-700 py-2 rounded-md text-md font-medium"
                            aria-current={'page'}
                        >
                            Sign out
                        </Link>
                    </div>
                </div>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <form className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="password" className="mt-2 block text-md font-medium text-gray-700">
                                        File
                                    </label>
                                    <input
                                        id="inputFile"
                                        name="inputFile"
                                        type="file"
                                        required
                                        className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Input File"
                                        onChange={(e) => setFormData({ ...formData, inputFile: e.target.files[0] })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-md font-medium text-gray-700 mt-4">
                                        Text
                                    </label>
                                    <input
                                        id="inputText"
                                        name="inputText"
                                        type="text"
                                        value={formData.inputText}
                                        required
                                        className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Input Text"
                                        onChange={(e) => setFormData({ ...formData, inputText: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    className={`bg-blue py-2 px-4 text-sm text-white group relative w-full flex justify-center rounded border border-gray hover:bg-gray-dark focus:outline-none focus:border-gray-dark`}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;