const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = require('graphql');

const JobType = new GraphQLObjectType({
    name: 'Job',
    description: '...',

    fields: {
        id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
    }
});

module.exports = new GraphQLSchema({
   query: new GraphQLObjectType({
       name: 'Query',
       description: '...',
       fields: () => ({
           jobs: {
               type: GraphQLList(JobType),
               args: {
                   description: {
                       type: GraphQLString,
                   },
                   location: {
                       type: GraphQLString,
                   }
               },
               resolve: (root, args) => axios
                   .get(`https://jobs.github.com/positions.json`, {
                       params: args,
                   })
                   .then(response => response.data)
           }
       })
   })
});
