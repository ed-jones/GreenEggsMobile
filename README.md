# Green Eggs (Mobile)

![Build Status](https://github.com/ed-jones/green-eggs-mobile/actions/workflows/actions.yml/badge.svg)

## Dev Setup

Create a .env file in the root directory with the following contents (obviously substituting with the host IP address running the green-eggs-api):

```
API_URI=http://your-host-ip:4000/
```

After updating this enviornment variable it may need updating in the expo cache, so when starting run `yarn start --clear`.

Then run:

```
yarn install
yarn start
```

Scan the QR code with Expo Go (Android) or Camera (iOS)

## Testing

Run tests: `yarn test`
