import { createConnection } from 'typeorm';

// creates a connection with the data base using the configs set on ormconfig.json
// we could pass it as an object inside createConnection, but the typeorm CLI needs to be aware
// of the config too.
createConnection();
