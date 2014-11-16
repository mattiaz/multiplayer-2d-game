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
                        {{#if login}}
                            <li><a href="#">Sign out</a></li>
                        {{else}}
                            <li><a href="#" data-toggle="modal" data-target=".login-modal">Sign in</a></li>
                            <li><a href="/signup">Sign up</a></li>
                        {{/if}}
                    </ul>
                {{/if}}
                <h3 class="text-muted">{{name}}</h3>
            </div>

            {{{body}}}

            <div class="footer">
                <p>&copy; Mattias Ajander 2014</p>
            </div>

        </div>

        <div class="modal fade login-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h5 class="modal-title">Sign in</h5>
                </div>
                    <div class="padding">
                        <form role="form" action="./" method="POST">
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" placeholder="name@host.com">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="password">
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox">Stay signed in</a>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary">Sign in</button>
                            <input type="hidden" name="action" value="login">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
        <script src="/public/js/jq.js"></script>
        <script src="/public/js/bootstrap.min.js"></script>

    </body>

</html>