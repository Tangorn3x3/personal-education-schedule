<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" icon class="mr-2" @click.stop="" v-on="on"><v-icon>phone_iphone</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Информация</span>
        <v-spacer/>
        <v-btn icon dark @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>

            <v-col cols="12" sm="12" md="10">
                <v-text-field v-model="number" label="Номер" outlined dense filled required clearable hide-details
                              @keyup.enter="onSearch"/>
            </v-col>
            <v-col cols="12" sm="12" md="2">
              <v-btn color="success" @click="onSearch"><v-icon>compare_arrows</v-icon></v-btn>
            </v-col>

            <v-simple-table v-if="!!info.id">
              <template v-slot:default>
                <tbody>
                <tr>
                  <td>BAN</td><td><info-chip :text="info.ban"/></td>
                  <td>Msisdn</td><td><info-chip :text="info.msisdn"/></td>
                </tr>
                <tr>
                  <td>Subs-ID</td><td><info-chip :text="info.id"/></td>
                  <td>IMSI</td><td><info-chip :text="info.imsi"/></td>
                </tr>
                <tr>
                  <td>Lang</td><td><info-chip :text="info.billinglanguage"/></td>

                </tr>
                </tbody>
              </template>
            </v-simple-table>

          </v-row>
        </v-container>

        <div class="overline">
          Для нормальной работы: simple-proxy локально
        </div>
        <small>Если выдает ошибку, то может не принимать самоподписанный сертификат. Зайти на <a href="https://simple-proxy:9595/actuator" target="_blank">https://simple-proxy:9595</a> и доверить сертификату </small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="dialog = false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    //import { mapGetters, mapActions } from 'vuex'
    import NurSubscriber from "@/models/nur/NurSubscriber";
    import InfoChip from "@/components/common/InfoChip";
    import * as platformClient from "@/utils/api/platformClient"
    import {ProxyApiType} from "../../utils/api/platformClient";

    export default {
      name: "NurSubscriberInfo",
      components: { InfoChip},
      props: {},
        data() {
            return {
              dialog: false,
              number: '996700896920',
              info: new NurSubscriber({})
            }
        },
        computed: {
            //...mapGetters('NameStore', ['item'])
        },
        methods: {
          async onSearch() {
            try {
              let data =  await platformClient.get(ProxyApiType.SUBSCRIBER, '/getSubscriberByMsisdn/online/'+this.number)
              this.info = _.cloneDeep(data[0])
            } catch (e) {}
          }

        },

    }
</script>

<style scoped>

</style>
