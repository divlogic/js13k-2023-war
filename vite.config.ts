import {
  advzipPlugin,
  ectPlugin,
  googleClosurePlugin,
  defaultViteBuildOptions,
  roadrollerPlugin,
} from 'js13k-vite-plugins'
import { defineConfig } from 'vite'

/**
 * Closure is useful but easily the most finicky of the bunch.
 * Breaks if I import all of kontra, but switching to a named import
 * has fixed it so far as well as bring it down by around 6 kB.
 */
export default defineConfig({
  build: defaultViteBuildOptions,
  plugins: [
    googleClosurePlugin(),
    roadrollerPlugin(),
    ectPlugin(),
    advzipPlugin(),
  ],
})
