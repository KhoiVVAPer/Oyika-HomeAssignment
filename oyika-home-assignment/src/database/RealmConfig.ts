import Realm from "realm";
import { Note } from "@/models/Note";

const app = new Realm.App({ id: "oyika-assignment-vomheie" });

const OpenRealmBehaviorConfiguration = {
  type: "openImmediately",
};

const getRealm = async () => {
  // MongoDB RealmConfiguration
  const credentials = Realm.Credentials.emailPassword({
    email: "anhkhoi592014@gmail.com",
    password: "Password@12345",
  });

  try {
    const user = await app.logIn(credentials);
    if (user) {
      const configuration = {
        schema: [Note],
        sync: {
          user: user,
          flexible: true,
          newRealmFileBehavior: OpenRealmBehaviorConfiguration,
          existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
          partitionValue: `user=${user.id}`,
        },
      };
      return Realm.open(configuration);
    }
  } catch (err) {
    console.error("Failed to log in", err);
  }
};

export default getRealm;
