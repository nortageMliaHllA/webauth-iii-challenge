exports.up = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.string('user');
      });
};

exports.down = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.dropColumn;
    });
};
