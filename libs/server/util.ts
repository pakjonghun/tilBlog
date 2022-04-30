export const joinStyleClass = (...args: string[]) => args.join(" ");

export const makeUrl = (
  url: string,
  params: { [key: string]: string | number }
) => {
  if (!Object.keys(params).length) return;

  const query = new URLSearchParams();

  for (const key of Object.keys(params)) {
    query.append(key, params[key] + "");
  }

  return `${url}?${query.toString()}`;
};
