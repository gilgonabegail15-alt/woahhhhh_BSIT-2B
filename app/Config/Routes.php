<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Auth::index');
$routes->get('/login', 'Auth::index');
$routes->post('/auth', 'Auth::auth');
$routes->get('/dashboard', 'Dashboard::index');
$routes->get('/logout', 'Auth::logout');

// User Acounts routes

$routes->get('/users', 'Users::index');
$routes->post('users/save', 'Users::save');
$routes->get('users/edit/(:segment)', 'Users::edit/$1');
$routes->post('users/update', 'Users::update');
$routes->delete('users/delete/(:num)', 'Users::delete/$1');
$routes->post('users/fetchRecords', 'Users::fetchRecords');

// Student routes
$routes->get('/student', 'Student::index');
$routes->post('student/save', 'Student::save');
$routes->get('student/edit/(:segment)', 'Student::edit/$1');
$routes->post('student/update', 'Student::update');
$routes->delete('student/delete/(:num)', 'Student::delete/$1');
$routes->post('student/fetchRecords', 'Student::fetchRecords');

// Profiling Acounts routes

$routes->get('/profiling', 'Profiling::index');
$routes->post('profiling/save', 'Profiling::save');
$routes->get('profiling/edit/(:segment)', 'Profiling::edit/$1');
$routes->post('profiling/update', 'Profiling::update');
$routes->delete('profiling/delete/(:num)', 'Profiling::delete/$1');
$routes->post('profiling/fetchRecords', 'Profiling::fetchRecords');


// Teacher routes
$routes->get('/teacher', 'Teacher::index');
$routes->post('teacher/save', 'Teacher::save');
$routes->get('teacher/edit/(:segment)', 'Teacher::edit/$1');
$routes->post('teacher/update', 'Teacher::update');
$routes->delete('teacher/delete/(:num)', 'Teacher::delete/$1');
$routes->post('teacher/fetchRecords', 'Teacher::fetchRecords');

//Parents

// Parents Routes
$routes->get('/parents', 'Parents::index');
$routes->get('/parents/create', 'Parents::create');
$routes->post('/parents/save', 'Parents::save');
$routes->get('/parents/edit/(:num)', 'Parents::edit/$1');
$routes->post('/parents/update/(:num)', 'Parents::update/$1');
$routes->get('/parents/delete/(:num)', 'Parents::delete/$1');

// Profiling Acounts routes

$routes->get('/students', 'Students::index');
$routes->post('/students/save', 'Stusdents::save');
$routes->get('students/(:segment)', 'Students::edit/$1');
$routes->post('students/update', 'Students::update');
$routes->delete('students/delete/(:num)', 'Students::delete/$1');
$routes->post('students/fetchRecords', 'Students::fetchRecords');

// Logs routes for admin
$routes->get('/log', 'Logs::log');
