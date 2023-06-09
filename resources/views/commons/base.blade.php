<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('commons.head')
</head>
<body class="">
    @include('tools.separator-color')

    <div class="container">
        <div class="main">
            @include('commons.menu')

            @yield('content_alone')

            @include('commons.footer')
        </div>
        <div class="siderbar-right">
            @include('commons.settings')
        </div>
    </div>


    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JL3E4GVZR0"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JL3E4GVZR0');
    </script>
</body>
</html>