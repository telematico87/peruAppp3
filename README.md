Problem 3

# Srequired

- PHP 7.3
- Composer 2.1.6,

# Framework  used

- laravel/lumen-framework: 8.3.1,
- tymon/jwt-auth: dev-develop,
- fruitcake/laravel-cors: 2.0


# to run our backend

```
cd backend/
```
1. create database and copy file .env.examplet to .env and add the database variables.

2. Install packages and dependencies

```
composer install
```

3. Generate token secret

```
php artisan jwt:secret
```

4. Run migrations and seeders

```
php artisan migrate:refresh --seed
```

5. Run backend

```
php -S localhost:8000 -t public
```

# Frontend 

# Stack required

- NodeJs 10.13
- Angular CLI 10.1.3

# Framework and libraries used

- angular: 10.2.4
- angular/material: 10.1.7

#  run our frontend

```
cd frontend/
```

1. Install packages

```
npm install
```
2.- run
```
ng serve


3. Log In with test credentials

```
Correo: telematico28@gmail.com
Password: 123456
```
