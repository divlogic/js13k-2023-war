import kontra from 'rollup-plugin-kontra'
export default {
  build: {
    rollupOptions: {
      treeshake: true,
      // entry: 'main.js',
      // dest: 'bundle.js',
      output: {
        compact: true,
        format: 'iife',
      },
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
}
