# FigusPlay Frontend

Frontend de **FigusPlay**, desarrollado como una aplicación web para la gestión y visualización de álbumes de figuritas.

Este proyecto corresponde a la rama `album` y utiliza React + Vite + TypeScript + Tailwind CSS.

## Stack tecnológico

| Tecnología | Versión |
|---|---:|
| Node.js | 24.20.0 |
| npm | 11.19.0 |
| React | 19.3.0 |
| React DOM | 19.3.0 |
| Vite | 8.3.1 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.0 |
| @tailwindcss/vite | 4.3.0 |
| @vitejs/plugin-react | 6.1.1 |
| ESLint | 10.10.0 |
| typescript-eslint | 8.70.1 |

## Requisitos

Antes de iniciar el proyecto se recomienda contar con las siguientes versiones:

- Node.js `24.20.0`
- npm `11.19.0`

Verificar las versiones instaladas:

```bash
node -v
npm -v
```

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Manuirigoyen/figusApp-FrontEnd.git
cd figusApp-FrontEnd
```

Cambiar a la rama del álbum:

```bash
git switch album
```

Instalar las dependencias:

```bash
npm install
```

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la URL local de la aplicación.

## Build de producción

Para generar una compilación de producción:

```bash
npm run build
```

El proceso ejecuta TypeScript y posteriormente Vite:

```text
tsc -b
↓
vite build
```

## Preview

Para visualizar localmente la build de producción:

```bash
npm run preview
```

## Lint

Para ejecutar ESLint:

```bash
npm run lint
```

## Estructura tecnológica

El proyecto utiliza:

```text
React
  └── TypeScript
       └── Vite
            └── Tailwind CSS
```

React se utiliza para la construcción de la interfaz, TypeScript para tipado estático, Vite como herramienta de desarrollo y build, y Tailwind CSS para los estilos.

## Tailwind CSS

El proyecto utiliza **Tailwind CSS 4**, integrado mediante `@tailwindcss/vite`.

No se utiliza la configuración tradicional de Tailwind CSS 3 basada en `tailwind.config.js` y `postcss.config.js`.

La integración se realiza directamente mediante el plugin de Vite.

## Scripts disponibles

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Descripción:

| Comando | Función |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run preview` | Sirve localmente la build generada |

## Versiones y dependencias

Las versiones principales del proyecto deben mantenerse documentadas y sincronizadas con `package.json` y `package-lock.json`.

Para comprobar las versiones reales instaladas:

```bash
npm list react react-dom vite typescript tailwindcss @tailwindcss/vite
```

Resultado esperado:

```text
react@19.3.0
react-dom@19.3.0
vite@8.3.1
typescript@6.0.3
tailwindcss@4.3.0
@tailwindcss/vite@4.3.0
```

## Convenciones

- TypeScript para todo el código de aplicación.
- Componentes desarrollados con React.
- Estilos mediante Tailwind CSS.
- Evitar agregar dependencias sin necesidad.
- Mantener las versiones principales documentadas.
- Utilizar `npm install` respetando el `package-lock.json`.
- No modificar las versiones del stack principal sin evaluar previamente su compatibilidad.

## Estado del proyecto

Actualmente el proyecto se encuentra en etapa de desarrollo/prototipado del álbum de figuritas.

La rama `album` está destinada al desarrollo de esta funcionalidad.

---

**FigusPlay Frontend**
