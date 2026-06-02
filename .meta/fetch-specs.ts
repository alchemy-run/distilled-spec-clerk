#!/usr/bin/env bun
/**
 * Fetches the Clerk API specs to ../specs/.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/spec-{index}.json   (one per URL)
 *   ../specs/openapi.json        (first spec, for primary use)
 */

const SPEC_URLS: string[] = [
  "https://raw.githubusercontent.com/clerk/openapi-specs/main/platform/beta.yml",
  "https://raw.githubusercontent.com/clerk/openapi-specs/main/bapi/2025-11-10.yml"
];

const SPECS_DIR = "../specs";

import { existsSync, mkdirSync } from "fs";

// Ensure the specs directory exists
if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

import YAML from "yaml";

function parseSpec(body: string): unknown {
  try {
    return JSON.parse(body);
  } catch {
    return YAML.parse(body);
  }
}

async function fetchSpec(url: string, outputPath: string) {
  console.log(`Fetching spec from ${url}...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch spec from ${url}: ${response.status} ${response.statusText}`,
    );
  }
  const spec = parseSpec(await response.text());
  console.log(`Writing spec to ${outputPath}...`);
  await Bun.write(outputPath, JSON.stringify(spec, null, 2));
}

async function main() {
  for (let i = 0; i < SPEC_URLS.length; i++) {
    const filename = i === 0 ? "openapi.json" : `spec-${i}.json`;
    await fetchSpec(SPEC_URLS[i], `${SPECS_DIR}/${filename}`);
  }
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
