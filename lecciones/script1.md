Hola, hoy vamos a hablar del proyecto en el que estan basados los tutoriales de test unitarios de Angular. Esto nos permitira manejarnos con soltura a la hora de hacer pruebas con los tests.

El tutorial, se ejecuta en un proyecto basado en js-seed. Para acceder a js-seed, podeis usar el enlace que se encuentra en el texto del tutotial. 

Vamos a hechar un pequeño vistazo. Aqui podeis ver todas las opciones que tiene este proyecto.

De todas formas, vamos a hacer un pequeño resumen para ver como podemos instalar todas las dependencias necesarias. Lo primero que hay que instalar es NodeJS y el control de versiones GIT. Existen multitud de guias en la red que os enseñaran como instalar estas dependencias. Una vez instalados estos requisitos, procederemos a instalar Gulp. Para ello, escribimos en la linea de comandos `npm install -g gulp`.

Ahora, vamos a clonar el repositorio donde se encuentra el tutorial. El repositorio se llama `angular-testing-tutorial`. Además, indicamos que lo ponga en el directorio `demo`.

Una vez clonado el repositorio, vamos a instalar las dependencias. Para ello escribimos en la linea de comandos `npm install`.

Una vez instaladas las dependencias, vamos a ver si nuestro proyecto se ha instalado correctamente. Para ello, escribimos `gulp` en la linea de comandos. Gulp nos arranca Karma, que es la plataforma donde se van a ejecutar nuestros test. Cada vez que un fichero asociado a los test se modifique, Karma volvera a ejecutar la bateria de tests automaticamente. También puedes ver que se ha ejecutado un test que viene de ejemplo en el proyecto base. Tambien, como podeis observar, arranca un  servidor web en el puerto 3000 y un proxy que nos va a recargar la pagina cada vez que sea requerido.
