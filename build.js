#!/usr/bin/env node

const path = require("path");

require("esbuild")
    .build({
        logLevel: "info",
        entryPoints: ["src/index.ts"],
        bundle: true,
        outdir: path.resolve(__dirname, "dist"),
        target: "es6",
        loader: { [".html"]: "text" },
    })
    .catch(() => process.exit(1));
