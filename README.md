Sydney Sunsets Frontend
=======================

Install [Yarn](https://yarnpkg.com/lang/en/) instead of sucky NPM.

## Setup
```
cd app
yarn
npm run dev
open http://localhost:8080
```

### Forked react-mapbox-gl
We use a forked version of react-mapbox-gl to support better popup UX. To setup this:

```
git clone https://github.com/liamzebedee/react-mapbox-gl app/vendor
cd app/vendor/react-mapbox-gl
yarn
npm run build
```

## Production
```
npm run build
npm start
```


Copyright Liam Edwards-Playne, Tom D'Netto 2017.

http://slides.com/sarasoueidan/building-better-interfaces-with-svg#/41
https://uxdesign.cc/top-three-ux-mobile-design-trends-82f6530e6cba
https://medium.com/google-design/redesigning-chrome-desktop-769aeb5ab987


