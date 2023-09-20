import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerClass = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Class, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name: string;
  readonly Description?: string | null;
  readonly Image: string;
  readonly class_flag?: number | null;
  readonly courseID: string;
  readonly url?: string | null;
  readonly comments?: (Comment | null)[] | null;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClass = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Class, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name: string;
  readonly Description?: string | null;
  readonly Image: string;
  readonly class_flag?: number | null;
  readonly courseID: string;
  readonly url?: string | null;
  readonly comments: AsyncCollection<Comment>;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Class = LazyLoading extends LazyLoadingDisabled ? EagerClass : LazyClass

export declare const Class: (new (init: ModelInit<Class>) => Class) & {
  copyOf(source: Class, mutator: (draft: MutableModel<Class>) => MutableModel<Class> | void): Class;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly classID: string;
  readonly content?: string | null;
  readonly owners?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly classID: string;
  readonly content?: string | null;
  readonly owners?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name: string;
  readonly Classes?: (Class | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name: string;
  readonly Classes: AsyncCollection<Class>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Course = LazyLoading extends LazyLoadingDisabled ? EagerCourse : LazyCourse

export declare const Course: (new (init: ModelInit<Course>) => Course) & {
  copyOf(source: Course, mutator: (draft: MutableModel<Course>) => MutableModel<Course> | void): Course;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly classID: string;
  readonly content?: string | null;
  readonly owners?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly classID: string;
  readonly content?: string | null;
  readonly owners?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerplayHeader = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<playHeader, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ClassID: string;
  readonly UserID: string;
  readonly TimeDuration?: string | null;
  readonly LastedPlay?: string | null;
  readonly Point?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyplayHeader = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<playHeader, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ClassID: string;
  readonly UserID: string;
  readonly TimeDuration?: string | null;
  readonly LastedPlay?: string | null;
  readonly Point?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type playHeader = LazyLoading extends LazyLoadingDisabled ? EagerplayHeader : LazyplayHeader

export declare const playHeader: (new (init: ModelInit<playHeader>) => playHeader) & {
  copyOf(source: playHeader, mutator: (draft: MutableModel<playHeader>) => MutableModel<playHeader> | void): playHeader;
}

type EagerReward = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reward, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly point?: number | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReward = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reward, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly point?: number | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reward = LazyLoading extends LazyLoadingDisabled ? EagerReward : LazyReward

export declare const Reward: (new (init: ModelInit<Reward>) => Reward) & {
  copyOf(source: Reward, mutator: (draft: MutableModel<Reward>) => MutableModel<Reward> | void): Reward;
}