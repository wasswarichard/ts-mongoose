import { createSchema, Type, typedModel, ExtractDoc } from '../src';

const AddressSchema = createSchema({
  city: Type.string(),
  country: Type.optionalString(),
  zip: Type.optionalString(),
});
const PhoneSchema = createSchema({
  city: Type.string(),
  name: Type.optionalString(),
  number: Type.number(),
});

const UserSchema = createSchema({
  title: Type.string(),
  author: Type.string(),
  body: Type.string(),
  comments: Type.array().of({
    body: Type.string(),
    date: Type.date(),
  }),
  date: Type.date({ default: Date.now as any }),
  hidden: Type.boolean(),
  meta: Type.object().of({
    votes: Type.number(),
    favs: Type.number(),
  }),
  m: Type.mixed(),
  otherId: Type.objectId(),
  address: Type.schema().of(AddressSchema),
  phones: Type.documentArray().of(PhoneSchema),
});

const User = typedModel('User', UserSchema);
User.findById('123').then(user => {
  if (user) {
    // user.
  }
});

type UserDoc = ExtractDoc<typeof User>;

function blockUser(user: UserDoc) {}
