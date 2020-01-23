const db = require('../data/db-config.js');
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where('schemes.id', id)
    .first()
}

function findSteps(id) {
    return db('steps as s')
    .orderBy('s.step_number')
    .join('schemes', 's.scheme_id', 'schemes.id')
    .where('scheme_id', id )
}

function add(scheme) {
    return db('schemes')
        .insert(scheme, "id")
        .then(([id]) => this.findById(id));
}

function update(changes, id) {
    return db('schemes')
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.findById(id) : null))
}

function remove(id) {
    return db('schemes')
    .where("id", id)
    .del();
}
