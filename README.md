# Green Eggs (Mobile)

## Dev Setup

Create a .env file in the root directory with the following contents (obviously substituting with the host IP address running the green-eggs-api):

```
API_URI=http://your-host-ip:4000/
```

Then run:

```
docker-compose run expo yarn install
docker-compose up -d --remove-orphans
```

Scan the QR code with Expo Go (Android) or Camera (iOS)

## Production Setup (wip)

Android: `yarn android`

iOS: `yarn ios`

Web: `yarn web`

## Testing

Run tests: `yarn test`
