<!-- Settings -->
<meta charset="utf-8">
<meta name="robots" content="INDEX,FOLLOW" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSRF -->
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Infos -->
<title>AI-Driven Autonomous Virtual World | G-Recursive</title>
<meta name="title" content="G Recursive" />
<meta name="description" content="Experience the power of AI in our interactive virtual world where autonomous characters intelligently work together to achieve your set goals. Watch the AI come to life and transform the world around them." />
<meta name="keywords" content="AI, artificial intelligence, virtual world, interactive environment, autonomous characters, AI-powered, goal-oriented, AI simulation">
<meta name="author" content="g-prompter">
<meta name="copyright" content="g-prompter" />

<!-- SOCIALS META -->
<meta property="og:type" content="website" />
<meta property="og:title" content="AI-Driven Autonomous Virtual World | G-Recursive" />
<meta property="og:description" content="Experience the power of AI in our interactive virtual world where autonomous characters intelligently work together to achieve your set goals. Watch the AI come to life and transform the world around them." />
<meta property="og:url" content="https://recursive.g-prompter.com/" />
<meta property="og:site_name" content="G Recursive" />
<meta property="og:image" content="<?= $imageShare; ?>" />
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="AI-Driven Autonomous Virtual World | G-Recursive">
<meta name="twitter:description" content="Experience the power of AI in our interactive virtual world where autonomous characters intelligently work together to achieve your set goals. Watch the AI come to life and transform the world around them.">
<meta name="twitter:image" content="<?= $imageShare; ?>">


<!-- Favicon -->
<link rel="apple-touch-icon" sizes="180x180" href="{{ Vite::asset('resources/images/fav/apple-touch-icon.png') }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ Vite::asset('resources/images/fav/favicon-32x32.png') }}">
<link rel="icon" type="image/png" sizes="16x16" href="{{ Vite::asset('resources/images/fav/favicon-16x16.png') }}">
<link rel="manifest" href="{{ Vite::asset('resources/images/fav/site.webmanifest') }}">

<!-- URLS -->
<link rel="canonical" href="https://recursive.g-prompter.com/" />

<!-- Fonts - DEFER -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Raleway:100,300,600,800,900&display=swap" onload="this.rel='stylesheet'">

<!-- Styles - DEFER -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.3/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.4/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.7.0/pptxgen.min.js"></script>



@vite(['resources/sass/app.scss', 'resources/js/app.js'])