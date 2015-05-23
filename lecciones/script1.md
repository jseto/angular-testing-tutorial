Hola, hoy vamos a hablar del proyecto en el que están basados los tutoriales de test unitarios de Angular. Esto nos permitirá manejarnos con soltura a la hora de hacer pruebas con los tests.

El tutorial, se ejecuta en un proyecto basado en js-seed. Para acceder a js-seed, podéis usar el enlace que se encuentra en el texto del tutorial.

Vamos a echar un pequeño vistazo. Aquí podéis ver todas las opciones que tiene este proyecto.

De todas formas, vamos a hacer un pequeño resumen para ver como podemos instalar todas las dependencias necesarias. Lo primero que hay que instalar es NodeJS y el control de versiones GIT. Existen multitud de guías en la red que os enseñaran como instalar estas dependencias. Una vez instalados estos requisitos, procederemos a instalar Gulp. Para ello, escribimos en la linea de comando `npm install -g gulp`.

Ahora, vamos a clonar el repositorio donde se encuentra el tutorial. El repositorio se llama `angular-testing-tutorial`. Además, indicamos que lo ponga en el directorio `demo`.

Una vez clonado el repositorio, vamos a instalar las dependencias. Para ello escribimos en la linea de comando `npm install`.

Una vez instaladas las dependencias, vamos a ver si nuestro proyecto se ha instalado correctamente. Para ello, escribimos `gulp` en la linea de comando. Gulp nos arranca Karma, que es la plataforma donde se van a ejecutar nuestros test. Cada vez que un fichero asociado a los test se modifique, Karma volverá a ejecutar la batería de tests automáticamente. También puedes ver que se ha ejecutado un test que viene de ejemplo en el proyecto base. También, como podéis observar, arranca un  servidor web en el puerto 3000 y un proxy que nos va a recargar la pagina cada vez que sea requerido.

Vamos a hacer un pequeño repaso de la estructura de directorios que tiene nuestro proyecto. Como podéis ver, tenemos un directorio `client` en el que podemos encontrar todo lo relativo al __front-end__, incluyendo todas las librerías de *angular*, *bootstrap* y *jQuery* necesarias para el proyecto. También tenemos una hoja de estilos y una aplicación base y el fichero `index.html`.

En el directorio `test` es donde reside, como su nombre indica, todo lo relacionado con los tests. Para separar los tests propiamente dichos de la configuración, tenemos el directorio `client`. Aqui tenemos test de ejemplo, tanto unitarios, como __end to end__. Aquí tenemos el fichero de configuración de *Karma* pero en nuestro proyecto, estas opciones de configuración, como la ruta base, los ficheros excluidos de los test o bien los que hay que incluir, están referidos al objeto `project` que cargamos desde el archivo de configuración centralizado `project.conf.js`.

En este fichero podemos configurar, por ejemplo, donde se encuentran los archivos de __front-end__, en nuestro caso en el directorio `client`. De la misma forma, podemos configurar donde se encuentran nuestros archivos de test, tanto la ruta base como los test unitarios o los __end to end__. También podemos definir donde se instalaran las librerías de __front-end__ y otros directorios adicionales.

Así mismo, podemos definir el puerto en el que estará escuchando el servidor web que el proyecto lleva incorporado, donde se encuentran los ficheros que deben activar la recarga de la pagina web de forma automática cuando son modificados, en nuestro caso, todos los que se encuentran en el directorio `client`, a excepción de las librerías, que se supone no cambian.

Bajo la entrada test, se encuentran los parámetros de configuración de *Karma*. Aquí definimos los ficheros que debe cargar, los que debe excluir de la carga y los pre-procesadores que se necesitan, que están definidos mas arriba. Los pre-procesadores permiten modificar el comportamiento de *Karma*, pero esto excede el ámbito de este tutorial.

Ya vimos que ejecutando `gulp`, este nos lanza un servidor web y *Karma*. Si ejecutamos `gulp test:unit`, esto nos ejecuta los test unitarios por una sola vez.

Y por ultimo, vamos a ver que contienen nuestro ficheros más importantes. `index.html` proporciona toda la parafernalia de tags necesarios para correr una __Single Page Aplication__ y nos carga por defecto las hojas de estilo de __bootstrap__ y la de la aplicación. Además nos carga *Angular* y el fichero principal de la aplicación de angular.

En `app.js` tenemos el esqueleto de una aplicación *Angular*, donde definimos el modulo y un controlador de aplicación. Por supuesto, podemos cambiar los identificadores a nuestro gusto.

En `app.spec.js` tenemos el esqueleto de un test, con su función `describe` donde damos una pequeña descripción de lo que va a hacer nuestro test, un `beforeEach` en donde especificamos lo que se tiene que ejecutar antes de ejecutar cada uno de los test, en nuestro caso cargamos el modulo correspondiente a la aplicación de *Angular*. Y una función `it` donde vamos a escribir la especificación que esperamos que se cumpla. En este caso, una especificación trivial en la que esperamos que 0 sea igual a 0.

Y hasta aquí nuestro pequeño repaso del proyecto en el que se basaran las siguientes lecciones sobre test unitarios en *AngularJS*.
