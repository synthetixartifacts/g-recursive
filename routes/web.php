<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\GoogleSearchController;
use App\Http\Controllers\BrowseUrlController;


// Experience
Route::view('/', 'base');



// TODO - Remove this
Route::get('/googleSearchResult', [GoogleSearchController::class, 'googleSearchResult']);
Route::get('/browseUrl', [BrowseUrlController::class, 'browseUrl']);