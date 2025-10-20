module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '5s', // 🔥 Token 24 hours me expire ho jayega
      },
      providers: [
        {
          uid: 'google',
          displayName: 'Google',
          icon: 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
          createUser: true,
          clientId: env('GOOGLE_CLIENT_ID'),
          clientSecret: env('GOOGLE_CLIENT_SECRET'),
          redirectUri: 'http://localhost:1337/api/connect/google',
        },
      ],
    },
  },
});
