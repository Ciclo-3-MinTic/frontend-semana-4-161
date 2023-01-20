<template >

  <v-app id="menu" 
  >
    <v-app-bar app
    color="primary"
    dark
    font="bold"
    >
    <v-spacer></v-spacer>
    <v-icon style="font-size: 50px;" color ="green darken-3">mdi-apple-safari</v-icon>
    <v-spacer></v-spacer>
    <h2 style="font-size: 40px;font-family: 'Varela Round', sans-serif;" class="subheading .title">Mountain Gear</h2>
    <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-btn style="font-size: 20px;font-family: 'Varela Round', sans-serif;" href="#Catalogo" text color="green darken-3">
          Catalogo
        </v-btn>
        <v-divider vertical></v-divider>
        <v-divider vertical></v-divider>
        <v-btn style="font-size: 20px;font-family: 'Varela Round', sans-serif;" href="#Informacion" text color="green darken-3">
          Acerca de Nosotros
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn style="font-size: 20px;font-family: 'Varela Round', sans-serif;" href="#Services" text color="green darken-3">
          Servicios
        </v-btn>

        <v-divider vertical></v-divider>
        <v-btn style="font-size: 20px;" href="#footer" text color="green darken-3">
          <v-icon>mdi-page-layout-footer</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn  style="font-size: 20px;" text color="green darken-3" :to="{ name: 'HomeAdmin' }" >
          <v-icon>mdi-login</v-icon>
        </v-btn>
  </v-app-bar>
    <v-main class="blue-grey lighten-4">
        <v-carousel 
          hide-delimiters
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="scroll-x-transition"
            hide-on-leave="true"
            transition="scroll-x-transition"
          >
          </v-carousel-item>
        </v-carousel>      
        <v-divider id="Catalogo" class="green darken-4">Catalogo</v-divider>
    <v-container>
    <v-layout>
      <v-flex ml-5 class="text-center" style="font-size:27px">
            <h1 class="green--text" style="font-family: 'Varela Round', sans-serif;">Nuestro Catalogo</h1>
      </v-flex>
    </v-layout>
  </v-container>

  <div v-for="(value, key) in dataArticulos"
  :key= key>
  <v-container>
    <v-layout>
      <v-flex ma-5 style="font-size:20px">
          <h1 class="teal--text" style="font-family: 'Rubik', sans-serif;">{{value.nombre}}</h1>
      </v-flex>
    </v-layout>
  </v-container>
  <v-sheet
    class="mx-auto green lighten-1"
    elevation="8"
    width="1300"
  >
    <v-slide-group
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(item, key) in value.articulos"
        :key="key"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'while'"
          class="ma-4 text-center"
          height="400"
          width="300"
          @click="toggle"

        >
        <v-container>
          <v-layout>
            <v-flex ml-10>
            <v-img height="270"
            width="210" :src="`${item.img}`"></v-img>
            </v-flex>
          </v-layout>
        </v-container>
        <h3 style="font-family: 'Rubik', sans-serif"><b>{{item.codigo}}</b> {{item.nombre}}</h3>
        <h4 class="ml-5" style="font-family: 'Roboto', sans-serif">${{item.precio_venta}}</h4>
        <p class="ml-5">{{item.descripcion}}</p>
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-check-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
  </div>
  <br>
  <v-divider id="Informacion" mt-1 class="green darken-4">Informacion</v-divider>
  <v-container>
  <v-layout align-start justify-center row fill-height >
    <v-flex ma-3 pa-4 >
      <h1 class="text-center text-uppercase teal--text" style="font-family: 'Varela Round', sans-serif;" >Ropa especializada para montaña </h1>
    </v-flex>
    </v-layout>
    <v-layout align-start justify-center row fill-height >
    <v-flex class="text-center .display-4">
      <h2 class="text-left black--text" style="font-family: 'Rubik', sans-serif;"><v-icon>mdi-sprout</v-icon>
      Comodidad Facilidad y Medio ambiente</h2>
    </v-flex>
    </v-layout>
    <v-layout>
    <v-img
      pa-5
      contain
      class="d-line-block ma-2"
      src="https://cflvdg.avoz.es/default/2019/11/29/00121575039719765411213/Foto/e.jpg"
      height="400"
    ></v-img>
    </v-layout>
    <v-layout align-start justify-center row fill-height >
    <v-flex ma-3 class="text-center">
      <p style="font-size:20px; font-family: 'Roboto', sans-serif;" class="text-justify">Aqui encontraras productos para realizar todo tipo de hiking ademas de que todos nuestros productos se elaboran de materiales reutilizables que demuestran nuestro compromiso con el medio ambiente asi como con nuestros usuarios brindandoles todas las herramientas para que obtengan nuestros accesorios de excelente calidad y de un precio asequible para todo tipo de personas que quiera hallar en el hiking una gran oportunidad de observar el mundo de otra manera con todo su esplendor en todos los rincones de las grandes montañas Colombianas</p>
    </v-flex>
    </v-layout>
  </v-container>

      <v-divider id="Services" class="green darken-4">Servicios</v-divider>
  <v-container mt-6 mb-6>
    <v-layout align-start justify-center row fill-height >
      <v-flex>
          <v-card
            class="mx-auto"
            width="350"
            elevation="24"
          >
            <v-img
              class="white--text align-end"
              height="280px"
              src="https://intelectum.net/wp-content/uploads/2020/02/9-formas-de-mejorar-la-atenci%C3%B3n-al-cliente.jpg"
            >
              <v-card-title class="light-blue lighten-1" style="font-family: 'Rubik', sans-serif;">Centro de Atencion al cliente</v-card-title>
              <v-card-actions class="light-blue lighten-1">
              <v-row justify="center">
                <v-dialog
                  v-model="dialog"
                  width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="green"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="dialog = true, dialog2 = false ,dialog3 = false"
                    >
                      Mas..
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="pa-5 font-weight-bold" style="font-family: 'Rubik', sans-serif;">Medios de Comunicacion para el Cliente</span>
                    </v-card-title>
                    <v-card-text class="text--primary text-justify" style="font-size:20px; font-family: 'Roboto', sans-serif;">
                      Damos las distintas herramientas para la atencion de cualquier tipo de pregunta queja o reclamo con el fin de mejorar y darle la mejor experiencia al cliente en nuestra plataforma para que el cliente se sienta comodo con los servicios ofrecidos sin ningun tipo de descofianza
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-actions>
            </v-img>

          </v-card>
      </v-flex>
            <v-flex >
          <v-card
            class="mx-auto"
            width="350"
            elevation="24"
          >
            <v-img
              class="white--text align-end"
              height="280px"
              src="https://image.freepik.com/vector-gratis/seguimiento-entrega-pedidos-dispositivo-movil_7087-805.jpg"
            >
              <v-card-title class="light-blue lighten-1" style="font-family: 'Rubik', sans-serif;">Seguimiento de Pedidos</v-card-title>
              <v-card-actions class="light-blue lighten-1">
              <v-row justify="center">
                <v-dialog
                  v-model="dialog2"
                  width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="green"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="dialog2 = true, dialog = false ,dialog3 = false"
                    >
                      Mas..
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="pa-5 font-weight-bold" style="font-family: 'Rubik', sans-serif;">Proceso de envio de pedidos</span>
                    </v-card-title>
                    <v-card-text style="font-size:20px; font-family: 'Roboto', sans-serif;" class="text--primary text-justify">
                      Le damos la herramienta a nuestro clientes para mejorar su confianza en nosotros puedan hacer un seguimiento al envio de su pedido desde el momento de la compra hasta al entrega del mismo en la direccion dada por el usuario esto para respaldar nuestros productos y logistica brindando confianza al cliente
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog2 = false"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-actions>
            </v-img>
          </v-card>
      </v-flex>
            <v-flex>
          <v-card
            elevation="24"
            class="mx-auto"
            width="350"
          >
            <v-img
              class="white--text align-end"
              height="280px"
              src="https://image.freepik.com/vector-gratis/e-icono-web-dibujos-animados-compras-tienda-online-servicio-devolucion-dinero-devolucion-dinero-idea-reembolso-financiero-retorno-inversion-ingresos-internet_335657-745.jpg"
            >
            <v-card-title class="light-blue lighten-1 " style="font-family: 'Rubik', sans-serif;">Devolucion y reembolsos            
            </v-card-title>
            <v-card-actions class="light-blue lighten-1" ml-10>
              <v-row justify="center">
                <v-dialog
                  v-model="dialog3"
                  width="600px"
                  
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="green"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="dialog3 = true, dialog = false ,dialog2 = false"
                    >
                      Mas..
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="pa-5 font-weight-bold" style="font-family: 'Rubik', sans-serif;">Procesos agiles de devolucion y reembolso</span>
                    </v-card-title>
                    <v-card-text style="font-size:20px; font-family: 'Roboto', sans-serif;">
                      Contamos con una gran logistica administrativa y de software para en dado caso la devolucion de nuestros productos asi como una politica acomodada a la falicidad del usuario para gestionar reembolsos todo esto para mantener la confianza entre nuestra empresa y nuestros consumidores
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog3 = false"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-actions>
            </v-img>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>


      <v-divider id="Soluciones" class="green darken-4">Casos de exito</v-divider>
  
  
  <v-container mt-3>
    <v-layout>
      <v-flex>
        <h1 class="text-center light-green--text" style="font-size:40px; font-family: 'Varela Round', sans-serif;">La Felicidad de Nuestros Clientes lo es Todo!!!</h1>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container mt-5 mb-5>
    <v-layout v-layout align-center justify-space-around row fill-height>
      <v-flex>
        <v-hover v-slot="{ hover }">
        <v-card
          class="mx-auto"
          color="grey lighten-4"
          max-width="350"
          elevation="15"
        >
          <v-img
            :aspect-ratio="16/9"
            src="https://contents.mediadecathlon.com/p1652063/k$5d68dd5c87623276c124081e1a390eee/pantalon-corto-de-hiking-montana-mujer-mh500-negro.jpg?format=auto&f=800x800"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out teal darken-1 v-card--reveal body-1 white--text text-center font-italic"
                style="height: 100%;"
              >
                Compro nuestros productos para realizar hiking y vemos como fue una gran experiencia la paso muy bien y muy comoda gracias a la comodidad de nuestros productos
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text
            class="pt-6"
            style="position: relative;"
          >
            <h3 class="display-1 font-weight-light green--text mb-2">
              Estefania Mendoza
            </h3>
            <div class="font-weight-light title mb-2">
              "Fue una gran experiencia gracias a que me prepare y a la comodidad de las prendas y la gran confianza que deposite en Mountain Gear"              
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
      </v-flex>
      <v-flex> 
        <v-hover v-slot="{ hover }">
        <v-card
          class="mx-auto"
          color="grey lighten-4"
          max-width="350"
          elevation="15"
        >
          <v-img
            :aspect-ratio="16/9"
            src="https://c8.alamy.com/compes/w9r93n/ajuste-de-hombre-deportiva-mochila-para-un-trekking-de-vacaciones-sentado-en-una-tienda-de-campana-moda-joven-descansando-en-el-bosque-despues-de-un-senderismo-turismo-vacacional-adven-w9r93n.jpg"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out teal darken-1 v-card--reveal body-1 white--text text-center font-italic"
                style="height: 100%;"
              >
                Compro una carpa de nuestro catalogo y esta muy feliz de nuestros productos por su durabilidad y estetica 
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text
            class="pt-6"
            style="position: relative;"
          >
            <h3 class="display-1 font-weight-light green--text mb-2">
              Juan Estaban Estrada
            </h3>
            <div class="font-weight-light title mb-2">
              "Compre esta carpa y me encanto es muy hermosa y tiene una gran resistencia"                
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
      </v-flex>
      <v-flex>
        <v-hover v-slot="{ hover }">
        <v-card
          class="mx-auto"
          color="grey lighten-4"
          max-width="350"
          elevation="15"
        >
          <v-img
            :aspect-ratio="16/9"
            src="https://contents.mediadecathlon.com/p1632465/k$514e954c70274f763f78123bdca013e8/pantalon-corto-de-hiking-montana-mujer-mh500-negro.jpg?format=auto&f=800x800"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out teal darken-1 v-card--reveal body-1 white--text text-center font-italic"
                style="height: 100%;"
              >
                Gracias a nuestro sistema rapido de entrega de pedidos ella pudo ir a divertirse con su amiga antes de que ella se fuese de viaje
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text
            class="pt-6"
            style="position: relative;"
          >
            <h3 class="display-1 font-weight-light green--text mb-2"                       >
              Andrea Camila Pereira
            </h3>
            <div class="font-weight-light title mb-2">
              "Pude ir con mi amiga a divertirme gracias a que llego rapido mi pedido de Mountain Gear"             
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
  </v-main>
      <v-divider id="footer" class="green darken-4">Footer</v-divider>    
    <v-footer color="teal lighten-2">
      <v-container>
      <v-layout align-center justify-center row fill-height>
      <v-flex class="white--text" ma-7 xs2>
        <p color="primary d-inline"><v-icon mr-3>mdi-contacts-outline</v-icon>Andres Sneyder Castellanos</p><i>ascastellanosv@hotmail.com</i><br><b>Bogota,Colombia</b><br><i>Tel:8425029</i><br><i>Cel:3156748392</i>
      </v-flex>
      <v-flex class="white--text" ma-7 xs2>
        <p color="primary d-inline"><v-icon mr-3>mdi-contacts-outline</v-icon>Cristian Mauricio Arias Mayorga</p><i>Crmaurmay@hotmail.com</i><br><b>Bogota,Colombia</b><br><i>Tel:8507683</i><br><i>Cel:3234653718</i>
      </v-flex>
      <v-flex class="white--text" ma-7 xs2>
        <p color="primary d-inline"><v-icon mr-3>mdi-contacts-outline</v-icon>Ketty Pineda Angel</p><i>kpangel@hotmail.com</i><br><b>Bogota,Colombia</b><br><i>Tel:8706825</i><br><i>Cel:317826322</i>
      </v-flex>
      <v-flex class="white--text" ma-7 xs2>
        <p color="primary d-inline"><v-icon mr-3>mdi-contacts-outline</v-icon>Esperanza Margarita Palacios Vargas</p><i>empalaciosv@hotmail.com</i><br><b>Bogota,Colombia</b><br><i>Tel:8706538</i><br><i>Cel:3236078</i>
      </v-flex>
      </v-layout>
      </v-container>
      <v-col
        class="text-center white--text"
        cols="12"
        style="font-family: 'Roboto', sans-serif;"
      >
      <v-btn depressed
      href="https://github.com/Ciclo-3-MinTic" target="_blank">
          Git-Hub
        </v-btn>
        <br> 
        <br>
        <v-divider id="Footer" class="green darken-4">footer Final</v-divider>
        <br>
        {{ new Date().getFullYear() }} — <strong>Sprint 4 -MinTic</strong>
      </v-col>
    </v-footer>
    </v-app>
</template>

<script>
    import axios from "axios";
  export default {
    data () {
      return {
        dataArticulos:{},
        items: [
          {
            src: 'https://www.exploresquamish.com/files/dmo_experience/lead/Hiking%202224%20x%20800_0.jpg',
          },
          {
            src: 'https://www.banfflakelouise.com/sites/default/files/styles/l_1600_12x6/public/hiking_sentinel_pass_jake_dyson_2_horizontal.jpg?itok=jsU6BajR',
          },
          {
            src: 'https://meccms.imgix.net/wp-content/uploads/2018/04/three-hikers-rocky-landscape-scaled.jpg?v=1592427036&w=1500&h=599&auto=format&q=30&bg=FFF',
          },
          {
            src: 'https://www.japan-guide.com/thumb/XYZeXYZe2427_1680.jpg',
          },
        ],
        dialog: false,
        dialog2: false,
        dialog3: false,

      }
    },
    created(){
      this.listar();
    },
    methods: {    
      listar() {
      let me = this;
      axios
        .get("articulo/listByCategorias")
        .then(function (response) {
          me.dataArticulos = response.data;
          me.isloading = false;
          console.log(me.dataArticulos)
        })
        .catch(function (error) {
          me.isloading = false;
          console.log(error);
        });
    },
    
    }
  }
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
</style>