<template>
  <v-dialog :value="true" persistent max-width="900px">
    <v-card>
      <v-card-title>
        <span class="headline">Настройка изображения</span>
      </v-card-title>
      <v-card-text>
        <v-container class="pb-0">
          <v-row>
            <v-col cols="12" sm="7" md="7" class="pb-0 pt-0">
              <div>
                <span class="mr-4">
                  <v-btn @click.prevent="rotate(-90)" icon color="info"><v-icon>rotate_left</v-icon></v-btn>
                  <v-btn @click.prevent="rotate(90)" icon color="info"><v-icon>rotate_right</v-icon></v-btn>
                </span>

                <span class="mr-4">
                  <v-btn @click.prevent="move(-20, 0)" icon color="info"><v-icon>keyboard_arrow_left</v-icon></v-btn>
                  <v-btn @click.prevent="move(20, 0)" icon color="info"><v-icon>keyboard_arrow_right</v-icon></v-btn>
                  <v-btn @click.prevent="move(0, -20)" icon color="info"><v-icon>keyboard_arrow_up</v-icon></v-btn>
                  <v-btn @click.prevent="move(0, 20)" icon color="info"><v-icon>keyboard_arrow_down</v-icon></v-btn>
                </span>

                <v-btn @click.prevent="reset()" icon color="info">
                  <v-icon>cancel_presentation</v-icon>
                </v-btn>

              </div>
              <vue-cropper
                ref="cropper"
                :aspect-ratio="36.4 / 18"
                :src="imageSrc"
                :container-style="{borderRadius: '5px'}"
                preview=".cropper-preview"
              />
            </v-col>

            <v-col cols="12" sm="5" md="5" class="pb-0 pt-0">
              <div class="subtitle-1">
                Просмотр
              </div>
              <div class="cropper-preview elevation-2 mb-4" />

              <v-btn
                @click="cropAndConfirm"
                color="primary"
                class="mb-2"
                depressed
                block
                large
              >
                Подтвердить
              </v-btn>
              <v-btn @click="onClose" color="blue darken-3" text block>
                Закрыть
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'ImageCropperDialog',
  components: {
    VueCropper
  },
  props: {
    imageSrc: { type: String, default: '' }
  },
  data () {
    return {}
  },
  computed: {
    // ...mapGetters('NameStore', ['item'])
  },
  watch: {
    imageSrc (val) {
      this.replaceImage(val)
    }
  },
  mounted () {
    console.debug('ImageCropperDialog mounted.')
  },
  methods: {
    // ...mapActions('NameStore', ['fetchData'])
    cropAndConfirm () {
      const croppedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$emit('crop', croppedImage)
    },

    rotate (deg) {
      this.$refs.cropper.rotate(deg)
    },
    move (offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY)
    },
    reset () {
      this.$refs.cropper.reset()
    },

    replaceImage (img) {
      this.$refs.cropper.replace(img)
    },
    onClose () {
      this.$emit('close')
    }
  }

}
</script>

<style>
  .cropper-preview {
    width: 100%;
    height: calc(372px * (9 / 16));
    overflow: hidden;
    border-radius: 2px;
  }
  .cropper-container.cropper-bg {background-repeat: repeat}
  .cropper-drag-box.cropper-crop.cropper-modal {border-radius: 5px;}
</style>
