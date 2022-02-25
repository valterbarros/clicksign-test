import Dexie from 'dexie'

let dbConn = null;

async function getConn() {
  const db = new Dexie("clicksign")
  db.version(1).stores({
    contacts: "++id, name, email, phone",
  });

  dbConn = db;
}

async function insert(data) {
  await dbConn.contacts.add(data)
}

async function update(data) {
  await dbConn.contacts.put(data)
}

async function getAll() {
  return await dbConn.contacts.reverse().toArray()
}

async function deleteById(id) {
  return await dbConn.contacts.delete(id)
}

async function getById(id) {
  return await dbConn.contacts.get({id})
}

export {
  getConn,
  insert,
  getAll,
  getById,
  update,
  deleteById
}
