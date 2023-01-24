import { css as resin, cx } from "resin";
import unitless from "@emotion/unitless";
import { camelToKebab } from "~/utils/string/index.ts";
import { tags, validateTag } from "~/libs/resin/tags.ts";
import { createElement, cloneElement, JSX, VNode } from "preact";
import {
  CreateStyled,
  CSSInterpolation,
  CSSObject,
  StyledProps,
  Template,
} from "~/libs/resin/types/index.ts";

const PARENT_SELECTOR_REGEXP = /^&\s*\>/;

const createNestedSelector = (selector: string) => {
  if (selector.startsWith(":")) return `&${camelToKebab(selector)}`;
  if (selector.match(PARENT_SELECTOR_REGEXP))
    `> ${camelToKebab(selector.replace(PARENT_SELECTOR_REGEXP, ""))}`;
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

// deno-lint-ignore no-explicit-any
const createStyled: any = <Props extends { class?: string }>(
  arg: keyof JSX.IntrinsicElements | ((props: Props) => VNode<Props>)
) => {
  if (typeof arg === "function") {
    return <T>(template: Template<T>) => {
      return (props: Props & StyledProps & T) => {
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
    (props: JSX.IntrinsicElements[typeof arg] & StyledProps & T) => {
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
