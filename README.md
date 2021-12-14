# Code Overview
Sample social media app built with the React+ReactDOM+Redux framework.

## User Stories

As a user registered on the website, I want the ability to show, add, change and delete posts, so that I may share and review posts.

As an admin user, I want to show and delete a users and their posts and comments.

## Getting started

First clone this repository.
```bash
$ git clone https://github.com/SaharAlassaf/W09D05.git
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.
```bash
$ npm install
```

Run it
```bash
$ npm start
```


## React Router Routes 

| Path              | Component            | Permissions                | Behavior                                                     |
| ----------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`               | Landing              | anyone                     | Home page                                                    |
| `/Signup`         | Signup               | anyone                     | Signup form, link to posts if user or to dashboard if admin  |
| `/Signin`         | Signin               | anyone                     | Signin form, link to posts if user or to dashboard if admin  |
| `/SigninGoogle`   | SigninGoogle         | anyone have google account | Signin form, link to post                                    |
| `/forgotPassword` | forgotPassword       | anyone                     | Forgot password form, user enter an email                    |
| `/resetPassword`  | resetPassword        | user who received an email | Reset password form, user enter a new password               |
| `/activateAccount`| activateAccount      | user who received an email | Activate user account                                        |
| `/Dashboard`      | Dashboard            | admin only                 | Shows all users                                              |
| `/Posts`          | Posts                | user and admin             | Shows user's posts                                           |
| `/Post`           | Post                 | user and admin             | Shows singal post                                            |

## Reducers

| Reducers         | action                                                               | Default                               |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------- |
| sign             | set role and token if type`"LOGIN"` and reset if type`"LOGOUT"`      | `{ role: "", token: "", userId: "}`   |
| auth             | set token if type`"RESET"` and reset if type`"ACTIVE"`               | `{  token: ""}`                       |

## Components

- Landings
- Signup
- Signin
- SigninGoogle
- forgotPassword
- resetPassword
- activateAccount
- Dashboard
- Posts
- Post

## UML diagram


## Back end 
[Back-end repository](https://github.com/SaharAlassaf/W08D04)
