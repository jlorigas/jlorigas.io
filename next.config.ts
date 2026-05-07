import type { NextConfig } from "next";

function normalizeBasePath(path?: string) {
  if (!path) {
    return "";
  }

  const normalized = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  return normalized === "/" ? "" : normalized;
}

function getBasePath() {
  const explicitBasePath =
    process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH;

  if (explicitBasePath !== undefined) {
    return normalizeBasePath(explicitBasePath);
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
  const isUserOrOrgPagesRepo = repoName?.endsWith(".github.io");

  if (isGithubPagesBuild && repoName && !isUserOrOrgPagesRepo) {
    return `/${repoName}`;
  }

  return "";
}

const basePath = getBasePath();

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
