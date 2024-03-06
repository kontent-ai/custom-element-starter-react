export type Value = Readonly<{
  valueKey: string;
}>;

export const parseValue = (input: string | null): Value | null | "invalidValue" => {
  if (input === null) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(input);

    return isValidValue(parsedValue) ? parsedValue : "invalidValue";
  }
  catch (e) {
    return "invalidValue";
  }
};

const isValidValue = (obj: Readonly<Record<string, unknown>>) =>
  "valueKey" in obj;
