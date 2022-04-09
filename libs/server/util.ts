export const joinStyleClass = (...args: string[]) => args.join(" ");

export const makeUrl = (
  url: string,
  params: { [key: string]: string | number }
) => {
  const query = new URLSearchParams();

  for (const key of Object.keys(params)) {
    query.append(key, params[key] + "");
  }

  return `${url}?${query.toString()}`;
};
