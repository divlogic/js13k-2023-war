// @ts-ignore
import kontra from 'rollup-plugin-kontra'
/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      treeshake: true,
      // entry: 'main.js',
      // dest: 'bundle.js',
      output: { compact: true },
      plugins: [
        kontra({
          gameObject: {
            // enable only velocity and rotation functionality
            velocity: true,
            rotation: true,
            acceleration: true,
            ttl: true,
          },
          vector: {
            // enable vector length functionality
            length: true,
          },
          // turn on debugging
          debug: false,
        }),
      ],
    },
  },
}
