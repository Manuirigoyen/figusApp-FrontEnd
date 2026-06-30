<h1 align="center">📘 FigusApp – Aplicación de Figuritas</h1>
<p align="center">Una aplicación web para organizar, visualizar y gestionar figuritas.</p>

<p align="center">
  <img src="https://img.shields.io/badge/versión-1.1-blue.svg" />
  <img src="https://img.shields.io/badge/dependencias-React%20%7C%20Bootstrap%20%7C%20TypeScript%20%7C%20Vercel%20%7C%20Cloudflare%20Turnstile-yellow.svg" />
  <img src="https://img.shields.io/badge/actualización-2026--04--16-brightgreen" />
</p>

---

## 📚 Índice

1. [Descripción del proyecto](#1-descripción-del-proyecto)
2. [Características principales](#2-características-principales)
- [2.1 Tienda](#21-tienda)
- [2.2 Intercambios](#22-intercambios)
- [2.3 Ruleta de premios](#23-ruleta-de-premios)
- [2.4 Página del usuario](#24-página-del-usuario)
- [2.5 Álbum de figuritas](#25-álbum-de-figuritas)
- [2.6 Billetera de figuritas](#26-billetera-de-figuritas)
3. [Tutorial de pruebas locales](#3-tutorial-de-pruebas-locales)
6. [Documentación adicional](#5-documentación-adicional)
7. [Autores](#6-autores)

---

## 1. Descripción del proyecto

<p align="justify">
  <strong>FigusApp</strong> es una plataforma digital interactiva diseñada para revolucionar y democratizar la experiencia tradicional del coleccionismo de figuritas de fútbol. Al trasladar el álbum físico al entorno virtual, la aplicación ofrece una alternativa económica, accesible y global para aficionados de todo el mundo, eliminando las barreras de costo y distribución local.
  <br><br>
  El alcance del ecosistema abarca la digitalización completa de álbumes históricos y actuales de los mundiales, permitiendo a los usuarios gestionar sus inventarios personales (billeteras de figuritas) y abrir sobres digitales siempre disponibles. Para potenciar la interacción y la retención, la plataforma integra un sistema global de intercambio (trade) entre usuarios de diferentes regiones y mecánicas de gamificación, tales como ruletas de premios diarios, recompensas por completitud y una tienda virtual interna.
  <br><br>
  Desarrollada bajo una arquitectura cliente-servidor robusta, esta aplicación equilibra una experiencia de usuario dinámica y gamificada con un estricto control de calidad técnico, el cual queda respaldado por los requerimientos funcionales y no funcionales detallados en este documento.
</p>

---

## 2. Características principales

### 2.1 Álbum de figuritas

La página está centrada en la pantalla y comienza con un título **"Mis álbumes"** en color blanco, sobre un fondo de estadio con un overlay oscuro semitransparente, que indica que el usuario está viendo sus colecciones.

A continuación aparecen tres bloques rectangulares de color **azul marino oscuro translúcido** (`rgba(20, 29, 48, 0.8)`), que dejan apreciar el fondo de estadio detrás. Cada bloque corresponde a una selección (Argentina, Brasil y Francia) y contiene:

#### 🗂️ Elementos de cada bloque

* **Encabezado:** el nombre del país y una pequeña bandera al lado.
* **Barra de progreso:** muestra cuántas figuritas se han completado (inicia en 0%, color rojo que cambia según el avance).
* **Grid de figuritas:**
  * 15 tarjetas por selección, organizadas en una grilla de 5 columnas.
  * La mayoría muestran la foto del jugador.
  * Una tarjeta "especial" por selección muestra una imagen genérica de "jugador sorpresa" y, al obtener esa figurita, se revela la leyenda correspondiente (Maradona, Pelé o Zidane).
  * Las tarjetas están en escala de grises y se colorean (con un borde dorado) cuando se completan.
* **Bandera y descripción:**
  * A la derecha del grid se ubica la bandera correspondiente.
  * Encima de la bandera hay una breve reseña de la selección, en un recuadro claro.
  * Al completar ese álbum, la bandera recupera el color (deja de estar en escala de grises).

#### 🎁 Zona promocional

Al final de la página hay una sección con una imagen que invita a completar los álbumes para ganar un viaje. Cuando el usuario completó las tres selecciones, la imagen cambia a una versión de "premio ganado" y se vuelve clickeable, llevando a la pantalla de selección de viaje.

#### 📱 Responsividad

El diseño se adapta a distintas pantallas:

* En móviles, las tarjetas se reducen progresivamente de tamaño.
* La descripción y la bandera se giran 90° y se colocan por debajo de las figuritas.
* La barra de progreso ocupa todo el ancho disponible.
* Se mantiene la legibilidad y funcionalidad en cualquier dispositivo.

#### 🧭 Navegación

En esta sección también se puede navegar mediante el nav y el footer del sitio.

---

### 2.2 Billetera del usuario

En la ruta `/billetera`, el usuario ve todas sus figuritas repetidas dentro de un recuadro **azul marino oscuro translúcido**, centrado y con sombra, que destaca sobre el fondo de estadio de la página.

#### 🏷️ Título y subtítulo

* **"Mi billetera de figuritas repetidas"**
* Debajo, el subtítulo **"¡Intercámbialas con amigos!"**, en color blanco grisáceo (whitesmoke).

#### 🖼️ Contenedor de figuritas

* Las figus se insertan dinámicamente, en una grilla de hasta 4 columnas (se reduce en pantallas chicas).
* Cada tarjeta muestra:
  * La imagen de la figurita.
  * El nombre de la figurita.
  * Un contador en la **esquina superior izquierda** indicando cuántas repetidas hay (x stock).
* Al pasar el mouse (hover) sobre una figurita, aparecen dos botones superpuestos:
  * **Eliminar** (rojo)
  * **Intercambiar** (azul)

#### 📱 Responsive

* Los títulos y el contenedor se reducen según el tamaño de pantalla.
* La grilla pasa de 4 a 3, 2 y finalmente 1 columna en pantallas muy chicas.
* La imagen se adapta para ofrecer una mejor visualización en dispositivos pequeños.

#### 🧾 Síntesis

La Billetera es un espacio visual y funcional donde el usuario gestiona sus figuritas duplicadas, pudiendo eliminarlas o iniciar intercambios de forma sencilla.

---

### 3.1 Ruleta de premios 

La **Ruleta Dinámica de Premios** permite a los usuarios obtener recompensas aleatorias mediante distintas modalidades de giro: giros múltiples y giros automáticos.
La ruleta está compuesta por 8 secciones (una por cada premio) y dispone de controles para realizar paquetes de giros o giros consecutivos en modo automático.

## Controles de giro

### Botones laterales (giros múltiples)

- **5 giros**
- **10 giros**
- **15 giros**

Estos botones permiten ejecutar el número de giros seleccionado de forma consecutiva.

### Botón “Automático”

- Activa giros consecutivos automáticos hasta agotar los giros disponibles del usuario.
- El modo automático se detiene si el usuario se queda sin giros o si el usuario cancela la acción.

---

## Composición de la ruleta y premios

La ruleta contiene 8 secciones. Cada sección corresponde a un premio o resultado:

1. **Sobre Dorado**
   - Otorga un sobre dorado que contiene figuritas con altas probabilidades de ser **especiales** o **legendarias**.

2. **Sobre Gris**
   - Otorga un sobre gris que contiene figuritas **comunes**.

3. **Figurita Aleatoria**
   - Entrega una figurita aleatoria que puede ser **común**, **especial** o **legendaria**.

4. **Giro Gratis**
   - Añade un giro gratuito al total disponible del usuario.

5. **Nada**
   - Casilla intercalada entre premios para asegurar baja probabilidad y aleatoriedad de los premios especiales.

> **Nota:** Las 8 secciones incluyen casillas "Nada" intercaladas para balancear las probabilidades.

---

## Gestión de giros y recompensas

- Si un usuario se queda sin giros, puede adquirir más en la **Tienda** de la aplicación.
- Los usuarios también pueden recibir giros gratis como **recompensa diaria** por iniciar sesión con frecuencia.

--- 

### 4.1 Página del usuario

# Panel de Usuario y Panel de Administración

## Visión general

FigusApp distingue a los usuarios por su **rol** en el sistema:

- **Usuarios comunes**: Acceden a una página de configuración donde pueden ver y actualizar sus datos de perfil.
- **Administradores**: Acceden a un panel ABM (Alta, Baja, Modificación) para gestionar las entidades del sistema en la base de datos: **figuritas**, **sobres**, **álbumes** y **usuarios**.

Ambas interfaces cuentan con un **menú lateral** que facilita la navegación entre secciones.

---

## Menú lateral — Usuario común

El menú lateral para usuarios comunes incluye:

- Foto de perfil
- Correo electrónico
- Botón **Cerrar sesión**
- Sección **Mi cuenta**
  - Botón **Mis álbumes**
  - _(Próximamente)_ Botón **Historial de compras**

---

## Menú lateral — Administrador

El menú lateral para administradores incluye:

- Foto de perfil
- Correo electrónico
- Botón **Cerrar sesión**
- Sección **Administración** con las siguientes secciones y submenus asociados:

### Listar

- Listar figuritas
- Listar sobres
- Listar álbumes
- Listar usuarios

### Agregar

- Agregar figuritas
- Agregar sobres
- Agregar álbumes
- Agregar usuarios

### Modificar

- Modificar figuritas
- Modificar sobres
- Modificar álbumes
- Modificar usuarios

### Eliminar

- Eliminar figuritas
- Eliminar sobres
- Eliminar álbumes
- Eliminar usuarios

Cada botón despliega submenús con accesos a formularios específicos para cada entidad, permitiendo realizar operaciones de forma fluida.

---

## Formularios y operaciones

Los formularios del sistema trabajan con los **ID** de las entidades a tratar y aceptan parámetros adicionales (por ejemplo, límites numéricos para paginado y control de cantidad en los métodos de listado). Las operaciones soportadas por los formularios son:

- Crear (Alta) — agregar registros nuevos.
- Consultar (Listar) — obtener información disponible.
- Actualizar (Modificar) — cambiar datos existentes.
- Eliminar (Baja) — eliminar registros.

Los resultados de las operaciones se presentan como **tablas generadas dinámicamente** que muestran los datos asociados a las entidades tratadas.

---

### 5.1 Inicio de sesion

El **Inicio de sesion** sirve para que el usuario pueda vincular su correo electronico (lo puede hacer con Google, Facebook, Apple o Twitter). Al inicar sesion se llevara a la pantalla de inicio de la pagina con el usuario en su sesion, en caso de no tener cuenta, se tiene la opcion de registrarse con el bonton de "Registrate Aqui" el cual llevara a un formulario de registro. Si la contraseña y/o el correo electronico son incorrectos no se iniciara sesion de ninguna manera.

---

### 5.2 Formulario de registro

Al no tener un correo electronico vinculado para iniciar sesion el usuario debera registrarse, le aparecera un "Formulario de registro" con campos a rellenar como lo son:

- Nombre de Usuario (Invencion del usuario)
- Correo Electronico
- Contraseña (Inventada por el usuario)
- Confirmar contraseña
- Imagen de Perfil (Cargada desde el dispositivo del usuario)
- Pais de Origen
- Fecha de Nacimiento

Los campos a rellenar que lleven un (*) deben ser completados de manera obligatoria ya que estos son con los que se podra iniciar sesion cuando se cierra la sesion y/o quiera volver a ingresar del album.

---

### 6.1 Tienda

A la tienda se podra ingresar desde la pantalla de inicio del album , en esta apareceran algunas cosas para comprar como lo son:

- Sobres plateados
- Sobres Dorados
- Giros para la ruleta

Cada una de las opciones tienen precios distintos los cuales pueden variar por la cantidad de objetos que el usuario eliga (se mostrara la cantidad de obejtos seleccionados) una vez que el usuario haya termindo de elegir se debera ir a "Finalizar compra".

---
## 3. Tutorial de Pruebas Locales

Sigue estos pasos para configurar y ejecutar el entorno de desarrollo del front-end en tu máquina local.

### Pasos de instalación

### 1. Descargar o clonar el repositorio  
Clona el proyecto desde el repositorio oficial utilizando Git:

```bash
git clone https://github.com/Manuirigoyen/FigusApp
cd FigusApp
```

### 2. Abrir el proyecto en un IDE  
Abre la carpeta raíz del proyecto en tu editor de código preferido (se recomienda **Visual Studio Code**).

### 3. Instalar las dependencias del proyecto  
Abre la terminal integrada de tu IDE y ejecuta el siguiente comando para instalar React, Bootstrap, TypeScript y el resto de las librerías necesarias:

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo local  
Para levantar el proyecto en tu entorno local con Vite, ejecuta:

```bash
npm run dev
```

### 5. Abrir el proyecto en el navegador  
Una vez que la terminal indique que el servidor está listo, abre tu navegador web e ingresa a la siguiente dirección URL local:

> 🌐 **http://localhost:5173/**

*(Vite utiliza por defecto el puerto 5173. Si este puerto está ocupado, la misma terminal te indicará cuál se asignó automáticamente).*
---

## 5. Documentación adicional

📄 **Documentación general del proyecto**  
https://docs.google.com/document/d/1_eF8AOXlngM9HdVd5pbWEuztdrFrnYR4eiyztqgAXW8/edit?usp=drive_link

🖼️ **Canvas del proyecto**  
https://www.canva.com/design/DAHFpKzI-e8/wa1YyfrFXQhmx5k0m5sEOw/edit?utm_content=DAHFpKzI-e8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

---

## 6. Autores

Proyecto desarrollado por Martín Lorenzi y Manuel Irigoyen.

---

### Martín Lorenzi
<img src="/figusApp/public/assets/img/martin.png" width="120" style="border-radius: 50%;" />

📧 **Contacto:** [alexmartin9c@gmail.com](mailto:alexmartin9c@gmail.com)

---

### Manuel Irigoyen
<img src="/figusApp/public/assets/img/manuel.png" width="120" style="border-radius: 50%;" />

📧 **Contacto:** [manuirigoyen@hotmail.com](mailto:manuirigoyen@hotmail.com)

---
