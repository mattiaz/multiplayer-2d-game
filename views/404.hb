<div class="jumbotron not-found-page">
    <h1>Page not found</h1>
    <h2>The page {{page}} cannot be found.</h2>
    {{#if login}}
        <a class="btn btn-lg btn-success signup-btn" href="/play" role="button">Play for free</a>
    {{else}}
        <a class="btn btn-lg btn-success signup-btn" href="/signup" role="button">Play for free</a>
    {{/if}}
</div>