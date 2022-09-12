export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in twitte',
      type: 'string',
    },
    {
      name: 'blocktweet',
      title: 'Block Tweet',
      type: 'boolean',
      description: 'Admin controls: Toggle if tweet deemed inappropriate',
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
      name: 'image',
      title: 'Tweet image',
      type: 'string',
    },
  ],

}
