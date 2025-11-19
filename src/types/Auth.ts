export type JwtPayload = {
  exp: number;
  sub: string;
  [key: string]: any;
};
