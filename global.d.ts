// just solve the problem of typescript not recognizing the fromNow method
// source: https://github.com/iamkun/dayjs/issues/297#issuecomment-464058065

import { Dayjs } from "dayjs";
type DateType = string | number | Date | Dayjs;

declare module "dayjs" {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string;
    from(compared: DateType, withoutSuffix?: boolean): string;
    toNow(withoutSuffix?: boolean): string;
    to(compared: DateType, withoutSuffix?: boolean): string;
  }
}
