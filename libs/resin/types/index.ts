import { PropertiesFallback, Pseudos } from "csstype";
import { JSX, VNode } from "preact";

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

export type Template<T> = CSSInterpolation | ((props: T) => CSSInterpolation);

export interface StyledProps {
  css?: CSSInterpolation;
}

export type StyledTags = {
  [K in keyof JSX.IntrinsicElements]: <T>(
    template: Template<T>
  ) => (
    props: JSX.IntrinsicElements[K] & StyledProps & T
  ) => VNode<JSX.IntrinsicElements[K] & StyledProps & T>;
};

interface BaseCreateStyled {
  (tag: keyof JSX.IntrinsicElements): <T>(
    template: Template<T>
  ) => (
    props: JSX.IntrinsicElements[typeof tag] & StyledProps & T
  ) => VNode<JSX.IntrinsicElements[typeof tag] & StyledProps & T>;

  <Props extends { class?: string }>(
    component: (props: Props) => VNode<Props>
  ): <T>(
    template: Template<T>
  ) => (props: Props & StyledProps & T) => VNode<Props & StyledProps & T>;
}

export interface CreateStyled extends BaseCreateStyled, StyledTags {}

export type InferProps<PropsType> = PropsType extends (
  props: infer P
) => VNode<infer P>
  ? P
  : never;
