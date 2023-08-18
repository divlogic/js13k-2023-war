import kontra from 'rollup-plugin-kontra';
export default {
  build: {
    rollupOptions: {
      entry: 'main.js',
      dest: 'bundle.js',
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
};
