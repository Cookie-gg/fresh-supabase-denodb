import { css as resin, cx } from "resin";
import unitless from "@emotion/unitless";
import { camelToKebab } from "~/utils/string/index.ts";
import { tags, validateTag } from "~/libs/resin/tags.ts";
import { createElement, cloneElement, JSX, VNode } from "preact";
import { CSSInterpolation, CSSObject } from "~/libs/resin/types/index.ts";

const createNestedSelector = (selector: string) => {
  if (selector.startsWith(":")) return `&${camelToKebab(selector)}`;
  if (selector.match(/^&\s*\>/))
    `> ${camelToKebab(selector.replace(/^&\s*\>/, ""))}`;
  return camelToKebab(selector);
};

const nestedObjToStr = (obj: CSSObject) => {
  let output = "{";

  const objToStr = (obj: CSSObject | null) => {
    if (!obj) return;

    Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) return objToStr(Object.assign({}, ...value));

      if (typeof value === "object") {
        output += `${createNestedSelector(key)} {`;
        return objToStr(value);
      }

      if (typeof value === "number") {
        output += `${createNestedSelector(key)}:${value}${
          Object.keys(unitless).includes(key) ? "" : "px"
        };`;
        return;
      }

      if (!value) return;

      output += `${createNestedSelector(key)}:${value};`;
    });
    output += "}";
  };

  objToStr(obj);

  return output;
};

const getCssStrTemplate = (template: CSSInterpolation): string => {
  if (!template) return "";

  if (Array.isArray(template))
    return getCssStrTemplate(Object.assign({}, ...template));

  if (typeof template === "object") return nestedObjToStr(template);

  return `${template}`;
};

export const css = (template: CSSInterpolation) =>
  resin`${getCssStrTemplate(template)}`;

type Template<T> = CSSInterpolation | ((props: T) => CSSInterpolation);

export type StyledTags = {
  [K in keyof JSX.IntrinsicElements]: <T>(
    template: Template<T>
  ) => (
    props: JSX.IntrinsicElements[K] & InlineCss & T
  ) => VNode<JSX.IntrinsicElements[K] & InlineCss & T>;
};

export interface BaseCreateStyled {
  (tag: keyof JSX.IntrinsicElements): <T>(
    template: Template<T>
  ) => (
    props: JSX.IntrinsicElements[typeof tag] & InlineCss & T
  ) => VNode<JSX.IntrinsicElements[typeof tag] & InlineCss & T>;

  <Props extends { class?: string }>(
    component: (props: Props) => VNode<Props>
  ): <T>(
    template: Template<T>
  ) => (props: Props & InlineCss & T) => VNode<Props & InlineCss & T>;
}

export interface CreateStyled extends BaseCreateStyled, StyledTags {}

interface InlineCss {
  css?: CSSInterpolation;
}

export type InferProps<PropsType> = PropsType extends (
  props: infer P
) => VNode<infer P>
  ? P
  : never;

// deno-lint-ignore no-explicit-any
const createStyled: any = <Props extends { class?: string }>(
  arg: keyof JSX.IntrinsicElements | ((props: Props) => VNode<Props>)
) => {
  if (typeof arg === "function") {
    return <T>(template: Template<T>) => {
      return (props: Props & InlineCss & T) => {
        const { type: originType, props: originProps } = arg(props);
        const tag = validateTag(originType);
        const tmp = typeof template === "function" ? template(props) : template;

        return cloneElement(createElement(tag, {}), {
          ...props,
          class: cx(
            css(tmp),
            originProps.class || undefined,
            props?.css ? resin`${css(props?.css)}` : undefined,
            props?.class || undefined
          ),
        });
      };
    };
  }
  return <T>(template: Template<T>) =>
    (props: JSX.IntrinsicElements[typeof arg] & InlineCss & T) => {
      const tmp = typeof template === "function" ? template(props) : template;
      return cloneElement(createElement(arg, {}), {
        ...props,
        class: cx(
          css(tmp),
          props?.css ? resin`${css(props?.css)}` : undefined,
          props?.class || undefined
        ),
      });
    };
};

const newStyled = createStyled.bind();

tags.map((tag) => (newStyled[tag] = newStyled(tag)));

export const styled: CreateStyled = newStyled;
