const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path) {
  if (!path || /^(https?:|mailto:|#)/.test(path)) {
    return path;
  }

  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
