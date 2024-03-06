export type Config = Readonly<{
  textElementCodename: string;
}>;

export const isConfig = (value: Readonly<Record<string, unknown>> | null) =>
  value !== null; // use better check
