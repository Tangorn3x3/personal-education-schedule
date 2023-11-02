<template>

      <v-container>
        <v-row>
          <v-tabs v-model="tab">
            <v-tab v-if="public || can('converters_epoch')">
              <v-icon>access_time</v-icon> &nbsp; Epoch UnixTime
            </v-tab>
            <v-tab v-if="public || can('converters_jwt')">
              <v-icon>code</v-icon> &nbsp; JWT Decode
            </v-tab>
            <v-tab v-if="public || can('converters_cron')">
              <v-icon>calendar_today</v-icon> &nbsp; Cron Explainer
            </v-tab>
            <v-tab v-if="public || can('converters_format_xml')">
              <v-icon>format_line_spacing</v-icon> &nbsp; Formatter
            </v-tab>
            <v-tab v-if="public || can('converters_hashids')">
              <v-icon>format_line_spacing</v-icon> &nbsp; HashIDs
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" style="width: 100%">
            <v-tab-item v-if="public || can('converters_epoch')">
              <v-card flat>
                <v-card-text>
                  <converter-epoch-time/>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="public || can('converters_jwt')">
              <v-card flat>
                <v-card-text>
                  <converter-jwt-parser/>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="public || can('converters_cron')">
              <v-card flat>
                <v-card-text>
                  <converter-cron-explainer/>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="public || can('converters_format_xml')">
              <v-card flat>
                <v-card-text>
                  <converter-xml-formatter/>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="public || can('converters_hashids')">
              <v-card flat>
                <v-card-text>
                  <converter-hash-ids/>
                </v-card-text>
              </v-card>
            </v-tab-item>

          </v-tabs-items>
        </v-row>
      </v-container>
</template>

<script>
import ConverterEpochTime from "@/components/converter/ConverterEpochTime";
import ConverterJwtParser from "@/components/converter/ConverterJwtParser";
import ConverterCronExplainer from "@/components/converter/ConverterCronExplainer";
import ConverterXmlFormatter from "./ConverterXmlFormatter";
import ConverterHashIds from "./ConverterHashIds";

export default {
  name: "ConverterList",
  components: {ConverterHashIds, ConverterXmlFormatter, ConverterCronExplainer, ConverterJwtParser, ConverterEpochTime},
  props: { public: { type: Boolean, default: false } },
  data() {
    return {
      tab: null
    }
  },
}
</script>

<style scoped>

</style>
