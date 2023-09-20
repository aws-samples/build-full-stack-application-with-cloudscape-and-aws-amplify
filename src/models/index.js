// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Class, Course, Comment, playHeader, Reward } = initSchema(schema);

export {
  Class,
  Comment,
  playHeader,
  Reward
};