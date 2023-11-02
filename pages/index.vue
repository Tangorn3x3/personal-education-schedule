<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">

      </v-col>
      <v-col cols="12" md="8">

        <VCard class="position-relative">
          <v-card-title>Congratulations John! 🎉</v-card-title>
          <v-card-subtitle>Best seller of the month</v-card-subtitle>

          <VCardText>
            <h5 class="text-2xl font-weight-medium text-primary">
              $42.8k
            </h5>
            <p>78% of target 🚀</p>
            <VBtn size="small">View Sales</VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg :src="triangleBg" class="triangle-bg flip-in-rtl"/>
          <!-- Trophy -->
          <VImg :src="trophy" class="trophy"/>
        </VCard>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import triangleDark from '@/assets/images/triangle-dark.png'
import trophy from '@/assets/images/trophy.png'
  export default {
    data() {
      return {
        triangleBg: triangleDark,
        trophy: trophy
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
