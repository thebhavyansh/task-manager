# Task Manager

Task Manager is a web application for managing tasks. It includes features for user signup and signin.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Endpoints](#endpoints)
## Introduction

Task Manager allows users to create, edit, and delete tasks. Users can sign up for an account and sign in to manage their tasks.

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Run the application using `npm start`.

## Usage

1. Open the app in your browser.
2. Sign up for an account using the provided form.
3. Log in with your credentials.
4. Create, edit, or delete tasks as needed.
5. Mark tasks as completed when done.

## Features

- **User Authentication**:
  - Sign up with a unique username and password.
  - Log in securely to access your tasks.
- **Task Management**:
  - Create new tasks.
  - Edit existing tasks.
  - Delete tasks when no longer needed. 
## EndPoints
**Task Creation:** POST `[https://localhost:3000/task]`.
**Task Retrieval:** GET `[https://localhost:3000/task/:id]`.
**Task Update:** PUT `[https://localhost:3000/task/:id]`.
**Task Deletion:** DELETE `[https://localhost:3000/task/:id]`.
**User Signup:** POST `[https://localhost:3000/auth/signup]`.
**User Signin:** POST `[https://localhost:3000/auth/signin]`.
**User Details Update:** PUT `[https://localhost:3000/users/signin]`.
