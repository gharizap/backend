# Backend

This is Backend application built using Node.js. Make sure you have already installed Node.js in your system.
This service using MYSQL as the database, so you need to run MYSQL and Apache using XAMPP before run this code.

## How to run this Application
1. Clone the repository after that opet it using your code editor
2. In the root directory of this project, make a new file named .env to provide the configurations needed.
3. Copy these details into .env file:
```
# No need to change
ACCESS_TOKEN_SECRET = jsjdsahdasdiquwudh321321u0dqklqsjdmqwkdjqjdi83210
REFRESH_TOKEN_SECRET = ji1jd12ju9ddkjon1idj1d1jpjd1pjwd19jud19dj1jdm1ijd
DATABASE_NAME = "aiang_db"
DATABASE_PASS = ""
DATABASE_HOST = "localhost"
PORT = 8080
# Fill with the url of the ml-task-api
ML_HOST_TASK = ""
# Fill with the url of the ml-activity-api
ML_HOST_ACTIVITY = ""
```
4. Open terminal in the project root directory, then run `npm install` to install the application dependencies.
5. Open your browser then go to [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/).
6. Click import then in the choose file field you can click it and select aiang_db.sql file in this project directory.
7. After import the database, run the application using this command in your terminal: `npm run start`.
8. The server will run in localhost with the port 8080, open [http://localhost:8080](http://localhost:8080) in your browser.
9. if it doesn't show any errors and pop up `Cannot GET /` then you successfully run the service.

For the public API documentation that we used for the mobile app you can check from this link:
- [auth](https://github.com/daffaYuharshu/task-api)
- [activity](https://github.com/daffaYuharshu/activity-api)
- [task](https://github.com/daffaYuharshu/task-api)
