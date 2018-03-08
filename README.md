# Draw <--> Sound

## About This Boilerplate

Sound><Art is an application that allows users to either perform, or watch the performance of, a user who draws music and sound. That is, they create a sound performance by doing art and drawing with their mouse. Our digital space is inspired by Soundspace at Durham Science Museum (https://www.lifeandscience.org/soundspace), which merges movement, sound, and visual art. 

The app provides an endless participatory experience in which performers interact with the canvas DOM. They have a canvas on the screen--an instrument--which allows them to manipulate a sound track and generate sound based on input events (eg. mouse location, direction, velocity) which is seen both seen and heard by viewers. Each movement is drawn and viewable. The underlying rules are not explicit to the users. Simply, they are sketching “music”.

Viewers can rate and comment on the performance. Performers stats (eg. # of performances, ratings) are displayed.

## Components
### Okta Signin
We decided to use Okta for for a simple authentication scheme.  Okta provides a sign-in widget that makes this process pretty easy.  Users are managed from the Okta website dashboard.

#### References:
[Okta] https://developer.okta.com
[NPM Okta-Signin-Widget] https://www.npmjs.com/package/@okta/okta-signin-widget




## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
yarn install
cd client
yarn install
cd ..
``

After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
yarn build
```
> Note: A yarn build will be required to register any new Post requests from any front-end JavaScript to to prevent any proxy server errors.

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!
