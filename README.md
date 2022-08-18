# Dashboard ACL

This is a dashboard creation app that provides functionality for access as per the user's permissions. It has two levels of permissions embedded. One is simple read, write, comment. And the other is to access specific sub-parts of the project. Such as user management, or dashboard settings.

## Description

This app has three different modules.

1. `db_setup` - This contains all the necessary steps required to setup the database tables.
2. `authentication` - Contains authentication server that allows users to login and signup. For authentication it produces JWT.
3. `dashboard_controller` - Any actions that are specific to the dashboard of the user, such as creating new dashboard, adding new users, or changing the name are all done through here.

> NOTE: `read` permission is set by default to any new user that is added. Even if the user specified access to other parts, read is added explicitly.

## Getting Started

### Dependencies

* NodeJS
* PostgreSQL

### Installing

1. Create a `.env` file in the root of the project. You can borrow the contents from `.env.example` file.
2. Run the command `npm run setup` to create all the necessary database migrations.

### Executing program

Once you have completed the installation process, you can just run the following command. It will start all the servers that are required.

```
npm run start
```

> Alternatively, you can skip over running two commands and run `npm run all`.

## Authors

Aditya Giri - dtrg21@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
