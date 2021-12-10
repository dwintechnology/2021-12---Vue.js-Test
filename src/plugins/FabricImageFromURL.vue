<script>
import fabricObject from './fabricObject';
export default {
  name: 'fabric-image-from-URL',
  mixins: [fabricObject],
  props: {
    id: { type: String },
    url: { type: String },
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    text: { type: String },
  },
  data() {
    return {
      image: null,
      type: 'image',
      customWatch: ['url'],
    };
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
  watch: {
    parentItem: {
      handler(newValue) {
        if (newValue) {
          this.createImage();
        }
      },
      immediate: true,
    },
    url(newValue) {
      if (this.parentItem) {
        if (this.image) {
          this.destroyImage();
        }
        this.createImage();
      }
    },
  },
  methods: {
    createImage() {
      this.fabric.Image.fromURL(
        this.url,
        img => {
          if (this.text) {
            var text = new fabric.Text(this.text, {
              fontSize: img.height / 2,
              fontWeight: 'bold',
              fontFamily: 'Arial',
              fill: this.definedProps.textColor || 'balck',
              ...this.definedProps,
            });

            text.top =
              this.definedProps.top + ((img.height - text.height) / 2) * this.definedProps.scaleY ||
              1;
            text.left =
              this.definedProps.left + ((img.width - text.width) / 2) * this.definedProps.scaleX ||
              1;

            var group = new fabric.Group([img, text], {});
            this.image = group;
          } else {
            this.image = img;
          }

          const self = this;
          this.image.on('scaled', function(e) {
            self.scaledHandler(self.id, {
              scaleX: self.image.scaleX,
              scaleY: self.image.scaleY,
              width: self.image.width,
              height: self.image.height,
            });
          });

          this.image.on('moved', function(e) {
            self.scaledHandler(self.id, {
              top: self.image.top,
              left: self.image.left,
            });
          });

          this.$emit('image-loaded', img);
          if (this.parentType == 'group') {
            this.parentItem.addWithUpdate(this.image);
          } else {
            this.canvas.add(this.image);
          }
          this.createEvents();
          this.createWatchers();
        },
        { ...this.definedProps }
      );
    },
    destroyImage() {
      this.destroyEvents();
      if (this.parentType == 'group') {
        if (this.group) {
          this.group.removeWithUpdate(this.image);
        }
      } else {
        if (this.canvas) {
          this.canvas.remove(this.image);
        }
        this.image = null;
      }
    },
    scaledHandler(id, params) {
      this.$emit('setDesk', { id, params });
    },
  },
};
</script>
