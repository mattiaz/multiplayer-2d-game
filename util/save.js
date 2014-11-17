//
//  HELPER FUNCTIONS
//

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

module.exports = {

    import_users: function(db_users){



    },
    add_user: function(db_users, name){

        var id = guid();

        console.log('ADDING USER: ' + id);

        db_users.push('/' + id, {
            name: name,
            id: id,
            joined: new Date().getTime()
        });

        db_users.save();

    }

};