/* eslint-disable */
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Author = {
  __typename?: 'Author';
  avatarUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnimation: Scalars['String']['output'];
  updateAnimation: PrivateAnimationType;
};


export type MutationCreateAnimationArgs = {
  file: Scalars['Upload']['input'];
  likes?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationUpdateAnimationArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  id: Scalars['String']['input'];
  likes?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PrivateAnimationResponseType = {
  __typename?: 'PrivateAnimationResponseType';
  items: Array<PrivateAnimationType>;
  pageInfo: PrivatePageInfoType;
};

export type PrivateAnimationType = {
  __typename?: 'PrivateAnimationType';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTimeISO']['output'];
  url: Scalars['String']['output'];
};

export type PrivatePageInfoType = {
  __typename?: 'PrivatePageInfoType';
  hasNextPage: Scalars['Boolean']['output'];
  nextCursor: Scalars['String']['output'];
};

export type PublicAnimationResponseType = {
  __typename?: 'PublicAnimationResponseType';
  items: Array<PublicAnimationType>;
  pageInfo: PublicPageInfoType;
};

export type PublicAnimationType = {
  __typename?: 'PublicAnimationType';
  createdAt: Scalars['DateTimeISO']['output'];
  downloadCount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lottieSource?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: Author;
};

export type PublicPageInfoType = {
  __typename?: 'PublicPageInfoType';
  page: Scalars['Float']['output'];
  pageCount: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAnimationById?: Maybe<PrivateAnimationType>;
  getAnimations: PrivateAnimationResponseType;
  getPublicAnimations: PublicAnimationResponseType;
};


export type QueryGetAnimationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAnimationsArgs = {
  keyword: Scalars['String']['input'];
  limit?: Scalars['Int']['input'];
  nextCursor?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPublicAnimationsArgs = {
  page?: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  PrivateAnimationResponseType: ResolverTypeWrapper<PrivateAnimationResponseType>;
  PrivateAnimationType: ResolverTypeWrapper<PrivateAnimationType>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  PrivatePageInfoType: ResolverTypeWrapper<PrivatePageInfoType>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  PublicAnimationResponseType: ResolverTypeWrapper<PublicAnimationResponseType>;
  PublicAnimationType: ResolverTypeWrapper<PublicAnimationType>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  PublicPageInfoType: ResolverTypeWrapper<PublicPageInfoType>;
  Query: ResolverTypeWrapper<{}>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  String: Scalars['String']['output'];
  DateTimeISO: Scalars['DateTimeISO']['output'];
  Mutation: {};
  Int: Scalars['Int']['output'];
  PrivateAnimationResponseType: PrivateAnimationResponseType;
  PrivateAnimationType: PrivateAnimationType;
  ID: Scalars['ID']['output'];
  PrivatePageInfoType: PrivatePageInfoType;
  Boolean: Scalars['Boolean']['output'];
  PublicAnimationResponseType: PublicAnimationResponseType;
  PublicAnimationType: PublicAnimationType;
  Float: Scalars['Float']['output'];
  PublicPageInfoType: PublicPageInfoType;
  Query: {};
  Upload: Scalars['Upload']['output'];
};

export type OneOfDirectiveArgs = { };

export type OneOfDirectiveResolver<Result, Parent, ContextType = any, Args = OneOfDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAnimation?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateAnimationArgs, 'file' | 'likes' | 'name' | 'tags'>>;
  updateAnimation?: Resolver<ResolversTypes['PrivateAnimationType'], ParentType, ContextType, RequireFields<MutationUpdateAnimationArgs, 'id'>>;
};

export type PrivateAnimationResponseTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrivateAnimationResponseType'] = ResolversParentTypes['PrivateAnimationResponseType']> = {
  items?: Resolver<Array<ResolversTypes['PrivateAnimationType']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PrivatePageInfoType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrivateAnimationTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrivateAnimationType'] = ResolversParentTypes['PrivateAnimationType']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrivatePageInfoTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrivatePageInfoType'] = ResolversParentTypes['PrivatePageInfoType']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicAnimationResponseTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicAnimationResponseType'] = ResolversParentTypes['PublicAnimationResponseType']> = {
  items?: Resolver<Array<ResolversTypes['PublicAnimationType']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PublicPageInfoType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicAnimationTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicAnimationType'] = ResolversParentTypes['PublicAnimationType']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  downloadCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lottieSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicPageInfoTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicPageInfoType'] = ResolversParentTypes['PublicPageInfoType']> = {
  page?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pageCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAnimationById?: Resolver<Maybe<ResolversTypes['PrivateAnimationType']>, ParentType, ContextType, RequireFields<QueryGetAnimationByIdArgs, 'id'>>;
  getAnimations?: Resolver<ResolversTypes['PrivateAnimationResponseType'], ParentType, ContextType, RequireFields<QueryGetAnimationsArgs, 'keyword' | 'limit'>>;
  getPublicAnimations?: Resolver<ResolversTypes['PublicAnimationResponseType'], ParentType, ContextType, RequireFields<QueryGetPublicAnimationsArgs, 'page' | 'query'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  DateTimeISO?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PrivateAnimationResponseType?: PrivateAnimationResponseTypeResolvers<ContextType>;
  PrivateAnimationType?: PrivateAnimationTypeResolvers<ContextType>;
  PrivatePageInfoType?: PrivatePageInfoTypeResolvers<ContextType>;
  PublicAnimationResponseType?: PublicAnimationResponseTypeResolvers<ContextType>;
  PublicAnimationType?: PublicAnimationTypeResolvers<ContextType>;
  PublicPageInfoType?: PublicPageInfoTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  oneOf?: OneOfDirectiveResolver<any, any, ContextType>;
};
