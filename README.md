# FovusCodingChallenge
Author: Sai Surya Kaushik Punyamurthula

Graduate Student at Arizona State University

Email: spunyam2@asu.edu

Steps for setting up amplify application for hosting the react application

Step 1: Install node packages

`npm install`

Step 2: Install Amplify CLI globally

`npm install -g @aws-amplify/cli@9.1.0`

**Please run the bellow commands after deploying the cdk application, as there are dependency resources created using aws cdk**

Step 2: Initialize amplify

`amplify init`

(environment: dev, editor: Visual Studio Code, type: javascript, framework: react, source directory: src, distribution directory: build, build command: npm run build, start command: npm run start, Authentication Method: AWS access keys - Enter you access key and secret key)

Step 3: Import Authentication from User Pool created using Fovus CDK Application

`amplify import auth`

(Type of Auth resource to import: Cognito User Pool and Identity Pool, User Pool to import: FovusUserPool)

Step 4: Host react web application in github repository on amplify

`amplify add hosting`

(Plugin: Hosting with Amplify Console, Type: Continuous deployment)

**Following Steps are in Amplify Console (opened automatically)**

Step 4.1: Add Repository Branch

Step 4.1.1: Select Git Hub in Hosting Environments

Step 4.1.2: Connect to GitHub

Step 4.1.3: Select Repository

Step 4.1.4: Select Branch

Step 4.2: Configure Build Settings

Step 4.2.1: Select App Name (Default)

Step 4.2.2: Select Environment (dev)

Step 4.2.3: Create Service Role for Amplify Backend (Default configuration)

Step 4.2.4: Reload and Select Newly Created Service Role

Step 4.2.5: Add Environment Variables

Following are the environment variables required for the application:

REACT_APP_ACCESS: {{AWS Access Key}}

REACT_APP_BASE_URL: {{API Link from CDK Output Console}}

REACT_APP_BUCKET_NAME: {{File Info Bucket Name}}

REACT_APP_REGION: us-east-1

REACT_APP_SECRET: {{AWS Secret Key}}

REACT_APP_AMPLIFY: true

Step 4.3: Review, Save and Deploy

Step 4.4: Finish deployment and Get the Amplify Hosting URL

Step 5: Push changes to Amplify cloud

`amplify push`

Step 6: Commit your changes to git repository into the branch with which Amplify was integrated (Step 4.1.4)

Open the Amplify Hosting URL ensure the App works as expected. Thank you.