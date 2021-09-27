# Green Eggs (Mobile)

![Build Status](https://github.com/ed-jones/green-eggs-mobile/actions/workflows/actions.yml/badge.svg)

## About

Green Eggs is a recipe sharing app created in React Native for our UOW Major Project (CSIT321). Users can create a recipe with photos in simple steps and optionally share them. Users can also search a large database of recipes, finding recipes that suit their dietary and allergy requirements.

## Dev Setup

Create a `.env` file in the root directory with the following contents:

```
API_URI=http://<Host IP>:4000/
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
