# Job Application Tracker

A Chrome extension that opens up a side panel to help you track your job applications

## Getting Started

Install the extension from manually on Chrome using dev mode

The extension build can be found [here](https://github.com/FatahChan/Job-Application-Tracker/releases)

### Dev environment

#### Setup Database

This project is built on Appwrite, so you need to create an account and setup a project and a database

Then create a collection with the show attribute.

<img width="941" alt="image" src="https://github.com/FatahChan/Job-Application-Tracker/assets/30260221/75f092a4-32f9-4dd6-8e1c-6a57e5fd81c4">

copy the `.env.template` to `.env` and fill the missing environment variable from appwrite 

#### Run Project
I use [Bun](bun.dev) for this project, so I recommend doing the same.

Run the command 
```
bun install
bun dev
```

#### Install the extension

Enable developer mode on your browser extension page

Click on Load unpacked extension 

Select the dist dir from the project
