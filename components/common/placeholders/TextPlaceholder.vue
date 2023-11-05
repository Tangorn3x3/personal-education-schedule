<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <h3 :class="{ 'headline': !small, 'title': small }" class="grey--text font-weight-light" style="text-align: center">
        {{ title }} <br v-if="title">
        <small>
          {{ subtitle }}
        </small>

        <br v-if="link">
        <v-btn v-if="link && !injected" :to="link" color="primary" text>
          {{ linkText ? linkText : 'Перейти' }}
        </v-btn>
      </h3>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TextPlaceholder',
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    link: { type: String, default: null },
    linkText: { type: String, default: null },
    small: { type: Boolean, default: false },
    injected: { type: Boolean, default: false }
  }
}
</script>
