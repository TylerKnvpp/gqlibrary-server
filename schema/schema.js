const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const _ = require("lodash");

// seed data

let booksCollection = [
  {
    title: "Musashi",
    genre: "Historical Fiction",
    id: "1",
    authorID: "1"
  },
  {
    title: "FM:02: Leadership Strategy and Tactics",
    genre: "Business",
    id: "2",
    authorID: "2"
  },
  {
    title: "FM:01: Disclipline Equals Freedom",
    genre: "Business",
    id: "3",
    authorID: "2"
  }
];

let authorsCollection = [
  { id: "1", name: "Eiji Yoshikawa", age: 87 },
  { id: "2", name: "Jocko Willink", age: 50 }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authorsCollection, { id: parent.authorID });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(booksCollection, { authorID: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // dont have to worry about the order here, so no function
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return booksCollection;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authorsCollection;
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //   code to get data from db/other source
        return _.find(booksCollection, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authorsCollection, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
