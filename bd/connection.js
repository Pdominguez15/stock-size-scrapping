import * as Realm from "realm-web";

export const connectionBD = async (env) => {
  const app = new Realm.App(env.REALM_APP_NAME);

  const credentials = Realm.Credentials.apiKey(env.REALM_APP_API_KEY);

  const user = await app.logIn(credentials);

  return user;
};

export const getDataFromBD = async (user) => {
  const client = user.mongoClient("mongodb-atlas");
  const bd = client.db("cloudflare").collection("todos");

  return bd.find({});
};

export const insertProduct = async (user, product) => {
  const client = user.mongoClient("mongodb-atlas");
  const bd = client.db("cloudflare").collection("todos");

  return bd.insertOne(product);
};

export const deleteProduct = async (user, product) => {
  const client = user.mongoClient("mongodb-atlas");
  const bd = client.db("cloudflare").collection("todos");

  return bd.deleteOne(product);
};

export const disconnectBD = async (user) => {
  await user.logOut();
};

export const saveProduct = async (env, product) => {
  const user = await connectionBD(env);
  await insertProduct(user, product);
  await disconnectBD(user);
};

export const deleteProductAlert = async (env, id) => {
  const user = await connectionBD(env);
  const client = user.mongoClient("mongodb-atlas");
  const bd = client.db("cloudflare").collection("todos");

  const result = await bd.deleteOne({ _id: Realm.BSON.ObjectId(id) });

  await disconnectBD(user);

  return result;
};

export const getProducts = async (env, notification) => {
  const user = await connectionBD(env);
  const client = user.mongoClient("mongodb-atlas");
  const bd = client.db("cloudflare").collection("todos");

  const result = await bd.aggregate([
    {
      $match: {
        notification,
      },
    },
    {
      $project: {
        _id: 1,
        url: 1,
        size: 1,
        store: 1,
        name: 1,
        notification: 1,
      },
    },
  ]);

  await disconnectBD(user);

  return result;
};
