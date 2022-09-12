export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile image',
      type: 'string',
    },
    {
      name: 'tweet',
      title: 'Tweet',
      type: 'reference',
      description: 'Reference the Tweet the comment is associated to:',
      to:{
        type:"tweet",
      }
    },
  ],
  
}
