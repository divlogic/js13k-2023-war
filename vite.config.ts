import { js13kViteConfig } from 'js13k-vite-plugins'
import { defineConfig } from 'vite'
import kontra from 'rollup-plugin-kontra'

export default defineConfig(
  js13kViteConfig({
    // closureOptions: { preserveOutput: true }, // WIP still not working
    closureOptions: false,
    viteOptions: {
      rollupOptions: {
        plugins: [
          kontra({
            gameObject: {
              // enable only velocity and rotation functionality
              velocity: true,
              rotation: true,
              acceleration: true,
              ttl: true,
              group: true,
            },
            vector: {
              // enable vector length functionality
              length: true,
              clamp: true,
            },
            // turn on debugging
            debug: false,
          }),
        ],
      },
    },
  })
)
