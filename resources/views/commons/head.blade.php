<!-- Settings -->
<meta charset="utf-8">
<meta name="robots" content="INDEX,FOLLOW" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSRF -->
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Infos -->
<title></title>
<meta name="title" content="" />
<meta name="description" content="" />
<meta name="keywords" content="">
<meta name="author" content="">
<meta name="copyright" content="" />

<!-- SOCIALS META -->
<meta property="og:type" content="website" />
<meta property="og:title" content="" />
<meta property="og:description" content="" />
<meta property="og:url" content="" />
<meta property="og:site_name" content="" />
<meta property="og:image" content="<?= $imageShare; ?>" />
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="">
<meta name="twitter:description" content="">
<meta name="twitter:image" content="<?= $imageShare; ?>">


<!-- Favicon -->
<link rel="apple-touch-icon" sizes="180x180" href="{{ Vite::asset('resources/images/fav/apple-touch-icon.png') }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ Vite::asset('resources/images/fav/favicon-32x32.png') }}">
<link rel="icon" type="image/png" sizes="16x16" href="{{ Vite::asset('resources/images/fav/favicon-16x16.png') }}">
<link rel="manifest" href="{{ Vite::asset('resources/images/fav/site.webmanifest') }}">

<!-- URLS -->
<link rel="canonical" href="" />

<!-- Fonts - DEFER -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Raleway:100,300,600,800,900&display=swap" onload="this.rel='stylesheet'">

<!-- Styles - DEFER -->
@vite(['resources/sass/app.scss', 'resources/js/app.js'])