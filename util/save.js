//
//  HELPER FUNCTIONS
//

function _info(msg){
    var date = new Date();
    console.log('INFO'.cyan + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}
function _warning(msg){
    var date = new Date();
    console.log('WARNING'.yellow + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}
function _danger(msg){
    var date = new Date();
    console.log('DANGER'.red + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}
function _system(msg){
    var date = new Date();
    console.log('SYSTEM'.yellow + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

//
//  EXPORTS
//

var db_users;

module.exports = {

    import_users: function(users){
    db_users = users;
    _system('Importing users');
    },
    add_user: function(name, password, salt){

        var id = guid();

        _system('Adding user: ' + name);

        db_users.push('/' + name, {
            name: name,
            pass: password,
            id: id,
            salt: salt,
            coorinates: {
                x: 0,
                y: 0
            },
            joined: new Date().getTime()
        });

        db_users.save();

    },
    get_user: function(name){

        try{
            return db_users.getData("/" + name);
        }
        catch(error){
            return null;
        }

    },
    get_user_uid: function(uid){

        var users = db_users.getData("/");

        for(user in users){
            var user = db_users.getData("/" + user);
            if(user.id == uid){
                return user.name;
            }
        }

        return null;

    }

};