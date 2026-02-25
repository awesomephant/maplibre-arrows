# maplibre-arrows

Simple [maplibre-gl-js](https://maplibre.org/maplibre-gl-js/docs/) plugin for drawing vector arrows with geographic coordinates. See [this blog post](https://www.maxkohler.com/posts/maplibre-arrows/) for a live demo and motivation.

[![NPM Version](https://img.shields.io/npm/v/%40awesomephant%2Fmaplibre-arrows)](https://www.npmjs.com/package/@awesomephant/maplibre-arrows)

<img width="952" height="488" alt="Screenshot of arrows on map" src="https://github.com/user-attachments/assets/244311ca-c1b0-405c-b288-796dda5f7518" />

## Installation

NPM

```bash
npm install --save @awesompehant/maplibre-arrows
```

Browser

```html
<script src="https://unpkg.com/@awesomephant/maplibre-arrows@latest/dist/index.js"></script>
```

## Usage

HTML

```html
<div id="map"></div>
```

Javasript

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
				[-82, 41]
			]
		}
	]
})
```

## Configuration

`maplibreArrows()` takes two parameters:

- `map` (required): [`Map`](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)
- `options` (required): configuration object of the following shape:
  - `ArrowSpec[]` (required): The initial set of arrows to render

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
