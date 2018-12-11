#PostCSS
Para nuestro proyecto utilizaremos [PostCSS](https://postcss.org/) para escribir nuestro codigo css. Su flexibilidad y nuestro conocimiento de la herramienta a través de lo que aprendimos de clase es lo que nos ha llevado a decidirnos por esta herramienta por encima de less, sass o stylus. 

###Instalación:
Para instalar postcss en nuestro proyecto lanzamos este comando en la terminal:

```bash
npm i --save-dev postcss postcss-cli
```

y añadimos un archivo .postcssrc a la raiz de nuestro proyecto en el que especificaremos los plugins que vamos a usar.

### Plugins
Los plugins de postcss que vamos a usar son los siguientes y para instalarlos seguimos los pasos indicados en los repositorios de cada uno:

| plugin | instalación | Notas
| :--- | :--- | :--- |
| [autoprefixer](https://github.com/postcss/autoprefixer) | npm i --save-dev autoprefixer | Ayuda a que no tengamos que poner todos los prefijos manualmente.
| [easy import](https://github.com/TrySound/postcss-easy-import) | npm i --save-dev postcss-easy-import | Facilita la importación. Los archivos que se importen deberían de tener un prefijo "_" |
|[postcss-mixins](https://github.com/postcss/postcss-mixins) | npm i --save-dev postcss-mixins | Habilita el uso de mixins en postcss
| [postcss-preset-env] (https://preset-env.cssdb.org/) | npm i --save-dev postcss-preset-env | Plugin para usar futuras caracteristicas de css
| [cssnano](https://cssnano.co/) | npm i --save-dev cssnano | Minificador de código |
	

