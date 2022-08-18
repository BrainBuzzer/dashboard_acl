# Dashboard ACL

This is a dashboard creation app that provides functionality for access as per the user's permissions. It has two levels of permissions embedded. One is simple read, write, comment. And the other is to access specific sub-parts of the project. Such as user management, or dashboard settings. You can look for the API documentation here: <https://documenter.getpostman.com/view/14884387/VUqmwzZ3>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/14884387-84e7e407-7747-4df1-8a0e-6e5a3cffec6c?action=collection%2Ffork&collection-url=entityId%3D14884387-84e7e407-7747-4df1-8a0e-6e5a3cffec6c%26entityType%3Dcollection%26workspaceId%3D518bd8cf-3185-4d68-8bf7-43eb7dbb41a4)

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
