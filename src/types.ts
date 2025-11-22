import type { Color, Point, PointLike } from "maplibre-gl";

interface Config {
	id: string;
	arrows: ArrowSpec[];
	attribution?: string;
	placeBelow?: string;
	layerIdPrefix?: string;
	sourceId: string;
}

interface ArrowSpec {
	points: [PointLike, PointLike, PointLike?, PointLike?];
	layout: "straight" | "quadratic" | "cubic" | "square";
	lineWidth?: number;
	lineColor?: Color;
	lineFillStyle?: "solid" | "gradient";
	headScale?: [number, number];
}

interface JsonArrow {
	width: number;
	points: PointLike[];
	headScale?: [number, number];
}

export { Config, ArrowSpec, JsonArrow };
