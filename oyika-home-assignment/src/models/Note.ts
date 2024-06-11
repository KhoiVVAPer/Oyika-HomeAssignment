import { Realm } from "realm";

export class Note extends Realm.Object<Note> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;

  static clone(note: any[]) {
    return note.map((itm) => ({
      _id: itm.id,
      title: itm.title,
      description: itm.description,
      createdAt: itm.createdAt,
    }));
  }

  static generate(title: string, description: string) {
    return {
      title,
      description,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: "Note",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      title: "string",
      description: "string",
      isComplete: { type: "bool", default: false },
      createdAt: "date",
    },
  };
}
