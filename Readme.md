# maplibre-arrows

[Maplibre]() plugin for drawing vector arrows with geographic coordinates.

![NPM Version](https://img.shields.io/npm/v/%40awesomephant%2Fmaplibre-arrows)

## Installation

### NPM

```bash
npm install --save @awesompehant/maplibre-arrows
```
### Yarn

```bash
yarn add @awesompehant/maplibre-arrows
```

### Browser

```html
<script src="https://unpkg.com/@awesomephant/maplibre-arrows@latest/dist/index.js"></script>
```

## Usage


```html
<div id="map"></div>
```


```js
// Initialise maplibregl
const map = new maplibregl.Map({
	container: 'map',
	style: 'https://demotiles.maplibre.org/style.json',
	center: [-96, 35],
	zoom: 3.3,
})

// Initialise maplibreArrows with the map object and a configuration object
const arrows = new maplibreArrows(map, {
	arrows: [
		{
			layout: 'straight',
			lineColor: '#bf3a1a',
			lineWidth: 38,
			points: [
				[-81, 35],
				[-88, 43],
				[-82, 41],
			],
		},
		{
			layout: 'quadratic',
			lineColor: '#bf3a1a',
			lineWidth: 22,
			points: [
				[-95, 43],
				[-109, 38],
				[-105, 44],
			],
		},
	],
})
```

## Options

`maplibreArrows()` takes two parameters:

- `map` (required): [`Map`](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)
- `options` (required): `ArrowSpec[]`

`ArrowSpec` is an object of the following shape:

- `points` (required): Array of points in geographic coordinates.
- `layout`: `"quadratic"` | `"straight"`
- `lineColor`: [`color`](https://maplibre.org/maplibre-style-spec/types/#color)
- `lineWidth`: [`number`](https://maplibre.org/maplibre-style-spec/types/#color)


## Contributing

This project uses [esbuild](https://esbuild.github.io/) and Node's [built-in test runner](https://nodejs.org/api/test.html).

- `npm i` to install dependencies
- `npm run test` to run unit tests
- `npm version {patch, minor, major}`
- `npm publish --access public`
