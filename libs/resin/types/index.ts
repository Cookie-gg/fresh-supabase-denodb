import { PropertiesFallback, Pseudos } from "csstype";

type CSSProperties = PropertiesFallback<number | string>;
type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]:
    | CSSProperties[K]
    | Array<Extract<CSSProperties[K], string>>;
};

type CSSPseudos = { [K in Pseudos]?: CSSObject };

// deno-lint-ignore no-empty-interface
interface ArrayCSSInterpolation extends Array<CSSInterpolation> {}

type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | CSSObject;

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation;

interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation;
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudos,
    CSSOthersObject {}

// deno-lint-ignore no-empty-interface
interface ArrayInterpolation<Props> extends Array<Interpolation<Props>> {}

interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>;
}

type Interpolation<Props> =
  | InterpolationPrimitive
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>;
