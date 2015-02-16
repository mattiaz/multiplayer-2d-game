<h1>Sign up</h1>
<div class="row marketing">
    <div class="col-lg-6">
        <form role="form" action="" method="POST">
            <div class="form-group" id="userform">
                <label class="control-label" for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="username" name="username" maxlength="10" autocomplete="off" autofocus="off">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="password">
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
    </div>
    <div class="col-lg-6">
        
    </div>
</div>
<script>
    if(location.hash != ""){
        var userform = document.getElementById("userform");
        var username = document.getElementById("username");

        userform.className += " has-error";
        username.value = location.hash.slice(1);
    }
</script>