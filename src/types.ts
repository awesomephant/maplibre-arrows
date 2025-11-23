import type { Color, LngLatLike } from "maplibre-gl";

interface Config {
	id: string;
	arrows: ArrowSpec[];
	attribution?: string;
	placeBelow?: string;
	layerIdPrefix?: string;
	sourceId: string;
}

interface ArrowSpec {
	points: LngLatLike[];
	layout: "straight" | "quadratic" | "cubic" | "square";
	lineWidth?: number;
	lineColor?: string;
	lineFillStyle?: "solid" | "gradient";
	headScale?: [number, number];
}

interface JsonArrow {
	width: number;
	points: LngLatLike[];
	headScale: [number, number];
	color: string;
}

export { Config, ArrowSpec, JsonArrow };
