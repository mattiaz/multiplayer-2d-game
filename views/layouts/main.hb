<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="a server for hosting multiplayer 2D games">
        <meta name="author" content="Mattias Ajander <mattias@ajander.se>">

        <title>{{title}}</title>

        <link href="/public/css/bootstrap.css" rel="stylesheet">
        <link href="/public/css/narrow.css" rel="stylesheet">
        <link href="/public/css/style.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->

    </head>

    <body>

        <div class="container">

            <div class="header">
                {{#if show_nav}}
                    <ul class="nav nav-pills pull-right">
                        <li><a href="/">Home</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="/signup">Sign up</a></li>
                    </ul>
                {{/if}}
                <h3 class="text-muted">{{name}}</h3>
            </div>

            {{{body}}}

            <div class="footer">
                <p>&copy; Mattias Ajander 2014</p>
            </div>

        </div>

    </body>

</html>