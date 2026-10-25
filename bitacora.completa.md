# 🧠 Bitácora de programación con IA

Registro completo del uso de IA durante el desarrollo de **Buscador de canciones con la iTunes Search API**, una aplicación web hecha con HTML, CSS y JavaScript.

> 📄 Esta es la **versión completa** (prompts y respuestas íntegros). El resumen de 1 a 2 páginas se entrega en PDF.

## 📋 Datos del proyecto

| | |
|---|---|
| **Autor** | Iván Alí Rodriguez Arceo |
| **Materia** | Aplicaciones Web |
| **Fecha** | 24 de octubre del 2026 |
| **Repositorio** | https://github.com/XAN-730/Tarea2 |
| **API utilizada** | iTunes Search API (no requiere clave) |
| **Tecnologías** | HTML, CSS y JavaScript puro |

## 🛠️ Herramientas de IA utilizadas

| Herramienta | Para qué se usó | Prompts |
|---|---|---|
| Claude (claude.ai) | Resolver el error de Git al subir el primer commit | 1 |
| GitHub Copilot CLI | Generar y corregir el código de la aplicación | 2, 3, 4, 5, 7 |
| ChatGPT | Redactar el prompt para rediseñar el frontend | 6 |

## 🗂️ Índice de prompts

| # | Herramienta | Tema |
|---|---|---|
| 1 | Claude (claude.ai) | Error de Git: el `push` fue rechazado (non-fast-forward) |
| 2 | GitHub Copilot CLI | Estructura base de la app y petición a la API de iTunes con `fetch` |
| 3 | GitHub Copilot CLI | La búsqueda no mostraba resultados: manejo de errores |
| 4 | GitHub Copilot CLI | Hacer que funcione sin Live Server (`file://`) |
| 5 | GitHub Copilot CLI | Evitar que se reproduzcan varias canciones a la vez |
| 6 | ChatGPT | Generar un prompt para rediseñar el frontend |
| 7 | GitHub Copilot CLI | Aplicar el rediseño con el prompt generado (`prompt.md`) |

---

## Prompt 1 — Error de Git: el push fue rechazado (non-fast-forward)

**Herramienta:** Claude (claude.ai)

### 💬 Prompt (tal cual)

> Estoy presentando un error para hacer mi primer commit, no me está dejando porque me sale el siguiente error que te voy a poner (y eso que hice el git pull y lo volví a intentar, pero nada). El error es este:
>
> ```text
> git push origin -u main
> To https://github.com/XAN-730/Tarea2.git
> ! [rejected]        main -> main (non-fast-forward)
> error: failed to push some refs to 'https://github.com/XAN-730/Tarea2.git'
> hint: Updates were rejected because the tip of your current branch is behind
> hint: its remote counterpart. If you want to integrate the remote changes,
> hint: use 'git pull' before pushing again.
> hint: See the 'Note about fast-forwards' in 'git push --help' for details.
> ```

### 🤖 Respuesta de la IA

<details>
<summary>Ver respuesta completa</summary>

1. Revisa en qué estado estás:

```
git status
git log --oneline
```

Asegúrate de que ya hiciste tu commit local (git add . y git commit -m "Primer commit: estructura base"). Si no lo has hecho, hazlo primero.

2. Trae lo de GitHub y únelo con lo tuyo:

```
git pull origin main --rebase --allow-unrelated-histories
```

Esto pone tus commits encima de los que ya estaban en GitHub, así queda un historial limpio.

3. Sube:

```
git push -u origin main
```

(Nota: el orden correcto es git push -u origin main; tu comando tenía el -u después de origin, que funciona igual, pero conviene escribirlo así.)

**Si te sale un conflicto**

Lo más probable es que choque el .gitignore o el README.md, porque existen en los dos lados. Git te lo marcará en VS Code con las opciones “Accept Current”, “Accept Incoming” o “Accept Both”. Para el .gitignore, quédate con el que tiene la línea .env (si en tu local también tienes uno, usa “Accept Both” y revisa que no queden líneas duplicadas). Luego:

```
git add .
git rebase --continue
git push -u origin main
```

**Lo que NO debes hacer**

No uses git push --force para “pasar por encima”. Funcionaría, pero borraría el commit de GitHub y, lo más importante, te podría complicar tener un historial limpio, que es justo lo que el profe va a revisar

</details>

### ✅ ¿Funcionó a la primera?

> Sí funcionó a la primera, esto funcionó porque el "error" sí era por parte del choque que había.

### 🔧 Qué corregí o ajusté

> Solo puse el git status primero, después git log --oneline, y por último, git pull origin main --rebase --allow-unrelated-histories. De ahí volví a intentar lo mismo y funcionó.

---

## Prompt 2 — Estructura base de la app y petición a la API de iTunes con fetch

**Herramienta:** GitHub Copilot CLI

### 💬 Prompt (tal cual)

> Hola Copilot, quiero hacer una app web sencilla con HTML, CSS y JavaScript puro que busque canciones usando la iTunes Search API. Debe tener una barra de búsqueda y mostrar los resultados como tarjetas con portada, nombre de la canción, artista y un reproductor del preview. Por ahora solo quiero la estructura básica y la petición a la API con fetch, sin manejo de errores todavía. Al terminar, explícame paso a paso cada parte del código para que sepa qué hiciste.

### 🤖 Respuesta de la IA

<details>
<summary>Ver respuesta completa</summary>

Implementado en:

- `index.html`: estructura de la página, formulario y contenedor de resultados.
- `styles.css`: diseño responsive con tarjetas, colores y reproductor.
- `script.js`: búsqueda mediante `fetch` a la iTunes Search API.

Cómo funciona:

1. El usuario escribe un término en el formulario.
2. JavaScript evita que la página se recargue con `event.preventDefault()`.
3. `encodeURIComponent()` prepara el texto para enviarlo correctamente en la URL.
4. `fetch()` consulta canciones usando:
   - `media=music`
   - `entity=song`
   - `limit=24`
5. La respuesta se convierte a JSON.
6. Se limpia el contenedor anterior y se recorren los resultados.
7. Por cada canción se crea una tarjeta con:
   - Portada: `artworkUrl100`
   - Nombre: `trackName`
   - Artista: `artistName`
   - Preview: `previewUrl`
8. El elemento `<audio controls>` permite reproducir la muestra.

Para probarla, abre `index.html` en el navegador y busca un artista o canción. Todavía no incluye manejo de errores, como solicitaste

</details>

### ✅ ¿Funcionó a la primera?

> No, porque hubo un error posterior por mi prompt.

### 🔧 Qué corregí o ajusté

> No corregí nada hasta el siguiente prompt, ya que todavía no había visto que tiraba resultados a la hora de buscar.

---

## Prompt 3 — La búsqueda no mostraba resultados: manejo de errores

**Herramienta:** GitHub Copilot CLI

### 💬 Prompt (tal cual)

> Ya ejecuté el index.html y a la hora de buscar a un artista no sale nada, revisa por qué sucede esto y arréglalo. Recuerda decirme paso a paso qué hiciste para solucionarlo.

### 🤖 Respuesta de la IA

<details>
<summary>Ver respuesta completa</summary>

Problema identificado y solucionado. La API sí responde correctamente: la prueba devolvió canciones de Daft Punk. El problema era que el código no manejaba errores; si `fetch()` fallaba, la pantalla quedaba vacía sin mostrar ninguna explicación.

Cambios realizados en `script.js`:

1. Convertí el evento del formulario en una función `async`.
2. Validé que el campo de búsqueda no esté vacío.
3. Añadí `country=US` a la consulta de iTunes.
4. Mostré el mensaje “Buscando canciones…” mientras llega la respuesta.
5. Verifiqué que la respuesta HTTP sea correcta mediante `response.ok`.
6. Convertí la respuesta a JSON y obtuve los resultados.
7. Añadí un mensaje cuando no existen canciones.
8. Añadí un bloque `try...catch` para mostrar errores visibles y registrarlos en la consola.
9. Conservé las tarjetas con portada, título, artista y reproductor.

También comprobé que:

- `script.js` no tiene errores de sintaxis.
- La API devuelve resultados correctamente.
- No existen errores de espacios o formato en los archivos modificados.

Si abres el archivo directamente y el navegador aún muestra un error de permisos o de origen, ejecútalo con Live Server en Visual Studio Code

</details>

### ✅ ¿Funcionó a la primera?

> Sí, pero después se presentó un error.

### 🔧 Qué corregí o ajusté

> Se ajustó el buscador, pero no se podía ingresar a la app sin el Live Server.

---

## Prompt 4 — Hacer que funcione sin Live Server (file://)

**Herramienta:** GitHub Copilot CLI

### 💬 Prompt (tal cual)

> Funciona usando el Live Server, pero me gustaría que funcione sin esta extensión. Ya que si intento hacerlo directamente, no funciona. Arregla esto y dime paso a paso qué hiciste

### 🤖 Respuesta de la IA

<details>
<summary>Ver respuesta completa</summary>

Solucionado. Ahora la aplicación funciona tanto con Live Server como abriendo directamente `index.html`.

**Qué sucedía**

Cuando abrías el archivo directamente, el navegador lo ejecutaba usando el protocolo:

```
file://
```

En ese contexto, algunos navegadores bloquean o restringen las peticiones realizadas con `fetch()` hacia dominios externos por seguridad.

**Qué cambié**

1. Conservé `fetch()` para cuando la página se ejecute desde Live Server u otro servidor web.
2. Añadí una función llamada `searchWithJsonp()`.
3. Cuando la página detecta que está abierta con `file://`, utiliza JSONP.
4. JSONP crea dinámicamente una etiqueta `<script>` que carga la respuesta de iTunes.
5. La API devuelve los datos mediante una función temporal.
6. Al recibir la respuesta:
   - Se elimina la función temporal.
   - Se elimina el elemento `<script>`.
   - Se muestran las canciones normalmente.
7. Si la conexión falla, se muestra el mensaje de error existente.

La selección del método ocurre aquí:

```
if (window.location.protocol === "file:") {
  data = await searchWithJsonp(apiUrl);
} else {
  const response = await fetch(apiUrl);
  data = await response.json();
}
```

También comprobé que:

- El archivo JavaScript mantiene una sintaxis válida.
- La API de iTunes responde correctamente mediante JSONP.
- La respuesta contiene resultados de canciones.

Ahora puedes abrir `index.html` directamente con doble clic, sin usar Live Server

</details>

### ✅ ¿Funcionó a la primera?

> Sí.

### 🔧 Qué corregí o ajusté

> No ajusté nada después de eso, el código que me generó me pareció óptimo (sin muchos cambios) y funcional.

---

## Prompt 5 — Evitar que se reproduzcan varias canciones a la vez

**Herramienta:** GitHub Copilot CLI

### 💬 Prompt (tal cual)

> Bien, ahora, quiero que me hagas un arreglo con respecto a la lógica. Hazle cuenta que cuando reproduzco una canción, me la deja reproducir al mismo tiempo que se está reproduciendo otra; no quiero que eso pase, así que pon una restricción para que eso no suceda.

### 🤖 Respuesta de la IA

<details>
<summary>Ver respuesta completa</summary>

Arreglo realizado. Ahora solo una canción puede reproducirse a la vez.

**Qué hice**

1. Añadí un listener global para detectar cuándo inicia un audio:

```
document.addEventListener("play", ..., true);
```

2. Verifiqué que el evento corresponda a un elemento `<audio>`.
3. Busqué todos los reproductores de la página con:

```
document.querySelectorAll("audio")
```

4. Cuando comienza una canción, pausé todos los demás reproductores:

```
if (audio !== event.target) {
  audio.pause();
}
```

5. Usé `true` para capturar correctamente el evento `play`, incluso en los reproductores creados dinámicamente después de una búsqueda.

También validé que `script.js` no tenga errores de sintaxis.

</details>

### ✅ ¿Funcionó a la primera?

> Sí.

### 🔧 Qué corregí o ajusté

> No se corregió nada debido a que un vez implementado esto, me funcionó a la primera.

---

## Prompt 6 — Generar un prompt para rediseñar el frontend

**Herramienta:** ChatGPT

### 💬 Prompt (tal cual)

> Me gustaría que me generes un prompt para rediseñar el frontend de la siguiente aplicación que estoy haciendo. Quisiese que se añadiese ondas de audio animadas, lo que viene siendo microanimaciones, detalles de exploración, algún tipo de resplandor controlado, reproductor personalizado. A su vez, quiero que con respecto a los colores se varié entre colores oscuros y morados. Por último me gustaría cambiar la tipografía con el Space Grotesk Bold para los títulos e implementar el Inter para el contenido.

### 🤖 Respuesta de la IA

<details>
<summary>Ver respuesta completa (prompt generado)</summary>

`````markdown
Te dejo un prompt listo para copiar y pegar. Está pensado para que analice tu proyecto actual y aplique los cambios directamente al código.

Rediseño visual futurista para mi aplicación de búsqueda musical

Quiero rediseñar la interfaz de mi aplicación web que consulta la API de iTunes y permite buscar canciones y reproducir una muestra de audio de hasta 30 segundos.

El objetivo es transformar el diseño actual en una experiencia musical futurista, inmersiva, moderna y visualmente atractiva, con una identidad propia. **El morado debe ser el color predominante**, y quiero evitar que el resultado parezca una copia de Spotify o de otros servicios musicales convencionales.

## 1. Antes de comenzar

Primero, analiza la estructura actual del proyecto, identifica las tecnologías utilizadas, los componentes de la interfaz, las hojas de estilos y la lógica de integración con la API de iTunes.

Después, implementa los cambios directamente en los archivos existentes, reutilizando los componentes y la arquitectura cuando sea posible.

No reemplaces toda la aplicación ni generes un proyecto nuevo si no es necesario. No modifiques funcionalidades que ya están funcionando, salvo los cambios necesarios para integrar el nuevo diseño.

## 2. Identidad visual y paleta de colores

Quiero una estética futurista basada en un universo de tonos morados, con profundidad, contrastes elegantes y efectos luminosos sutiles.

Utiliza estas variables CSS como punto de partida:

- Fondo principal: `#10091F`
- Fondo de tarjetas: `#191126`
- Superficies secundarias: `#24113F`
- Superficies al pasar el cursor: `#28183F`
- Morado eléctrico principal: `#7138F5`
- Violeta claro para detalles luminosos: `#B99AFF`
- Texto principal: `#F7F2FF`
- Texto secundario: `#B6A9CC`

Puedes utilizar un degradado morado en el encabezado, combinando tonos como `#4920C8`, `#7138F5` y `#853BFA`.

Requisitos visuales:
- El morado debe dominar claramente la identidad visual.
- Utiliza fondos oscuros con diferentes matices para crear profundidad.
- Emplea degradados en lugares estratégicos, especialmente en el encabezado y algunos elementos destacados.
- Utiliza bordes violetas sutiles y resplandores controlados.
- Mantén un contraste suficiente para que los textos y controles sean legibles.
- Evita abusar del neón, las sombras intensas, los degradados en todos los elementos o los efectos visuales innecesarios.
- Conserva los colores originales de las portadas de los álbumes para que destaquen sobre las superficies oscuras.

## 3. Tipografía

Implementa una combinación de dos familias tipográficas principales:

**Space Grotesk**
- Utilízala en títulos, encabezados y elementos textuales que deban destacar.
- Emplea principalmente el peso 700 (Bold) para los títulos principales.
- Utiliza pesos 500 o 600 para los nombres de canciones y encabezados secundarios.

**Inter**
- Utilízala para el contenido general, nombres de artistas, descripciones, controles, botones y textos auxiliares.
- Prioriza la legibilidad y una jerarquía tipográfica consistente.

Opcionalmente, utiliza IBM Plex Mono en pequeños detalles técnicos, como etiquetas de reproducción, identificadores de pistas o contadores.

Puedes cargar las fuentes desde Google Fonts si el proyecto no dispone de ellas. Evita añadir familias tipográficas innecesarias.

## 4. Encabezado y buscador

Rediseña el encabezado actual para que transmita una sensación de exploración musical futurista.

- Conserva un título principal atractivo y de gran presencia visual.
- Puedes utilizar una frase como «Encuentra tu próxima frecuencia» o mantener el texto actual si encaja mejor con la estructura existente.
- Destaca una palabra del título con un tono lavanda o un degradado violeta sutil.
- Incorpora un texto secundario breve que explique la función de la aplicación.
- Mantén el campo de búsqueda visible y fácil de utilizar.
- Actualiza el campo y el botón de búsqueda con la nueva paleta.
- Añade un icono de búsqueda si encaja con las tecnologías ya utilizadas.
- Incluye estados visuales de hover, focus y active.
- Si utilizas un resplandor, debe ser sutil y aparecer principalmente en los elementos interactivos.

El encabezado debe conservar una jerarquía clara y adaptarse correctamente a diferentes tamaños de pantalla.

## 5. Tarjetas de resultados musicales

Conserva la funcionalidad y los datos que actualmente se muestran en cada resultado de iTunes.

Cada tarjeta debe seguir mostrando, cuando los datos estén disponibles:

- Portada del álbum.
- Título de la canción.
- Nombre del artista.
- Controles de reproducción.
- Progreso y tiempo de reproducción.
- Duración máxima de la muestra: 30 segundos.

Rediseña las tarjetas con las siguientes características:

- Fondo oscuro en tonos morados.
- Bordes discretos y esquinas redondeadas.
- Espaciado consistente entre la portada y la información de la canción.
- Tipografía Space Grotesk para los títulos e Inter para el contenido secundario.
- Transiciones suaves al pasar el cursor.
- Un pequeño desplazamiento vertical o cambio de borde al interactuar.
- Un resplandor violeta tenue para la tarjeta seleccionada o cuya canción se esté reproduciendo.
- Indicadores visuales de reproducción que no interfieran con la lectura.

Evita que las tarjetas se vean excesivamente recargadas. La portada y el título de la canción deben seguir siendo los elementos protagonistas.

Conserva una cuadrícula adaptable: varias columnas en pantallas grandes, menos columnas en tabletas y una columna en móviles cuando sea necesario.

## 6. Reproductor de audio personalizado

Quiero sustituir los controles nativos del navegador por un reproductor personalizado que se integre visualmente con la interfaz futurista.

Debe incluir:

- Botón de reproducir y pausar con iconos claros.
- Barra de progreso interactiva.
- Tiempo actual de reproducción y duración máxima de 30 segundos.
- Control de volumen.
- Posibilidad de silenciar y restaurar el sonido.
- Estados visuales para reproducción, pausa, carga y errores.
- Indicador visual de la canción activa.
- Un diseño adaptable a móviles y escritorio.

Requisitos funcionales importantes:

- Conserva la URL de muestra de audio que proporciona la API de iTunes.
- Respeta el límite de 30 segundos de reproducción.
- Al llegar al límite, detén la reproducción y actualiza los controles y el temporizador.
- Permite reanudar la muestra desde el inicio al volver a reproducirla.
- Evita que varias canciones se reproduzcan simultáneamente.
- Si comienza a reproducirse otra canción, pausa la anterior.
- Gestiona correctamente los errores de carga y reproducción.
- Mantén sincronizados el tiempo, la barra de progreso y el estado del botón.
- Evita crear múltiples listeners, intervalos o instancias de audio innecesarias.
- Si ya existe una implementación de audio funcional, reutilízala y adapta su lógica en lugar de duplicarla.

El reproductor debe seguir siendo funcional, no solamente una representación visual.

## 7. Ondas de audio animadas

Añade una visualización de audio con barras verticales, una onda estilizada o una forma de onda que complemente el reproductor.

Comportamiento esperado:

- Cuando una canción esté reproduciéndose, la visualización debe animarse.
- Cuando esté pausada, debe detenerse o quedar en un estado visual estático.
- Utiliza principalmente violeta y lavanda, con pequeñas variaciones de luminosidad.
- La animación debe ser fluida, ligera y discreta.
- Si es posible, sincroniza el movimiento con la reproducción.
- No simules una visualización de frecuencias reales si no tienes acceso a los datos necesarios del audio.
- Si el proyecto no permite analizar el audio de manera fiable, utiliza una animación decorativa claramente independiente de las frecuencias reales.

Prioriza CSS o las tecnologías de animación que ya existan en el proyecto. No incorpores dependencias pesadas solo para crear una onda sencilla.

Respeta `prefers-reduced-motion` para usuarios que prefieren reducir las animaciones.

## 8. Microanimaciones e interacciones

Añade microanimaciones que hagan que la aplicación se sienta viva sin perjudicar su rendimiento.

Incluye, cuando corresponda:

- Transiciones suaves en botones y campos de búsqueda.
- Elevación ligera de las tarjetas al pasar el cursor.
- Cambios sutiles de color en los bordes.
- Animaciones al iniciar y detener la reproducción.
- Aparición progresiva de los resultados cuando se cargan.
- Indicadores animados de carga.
- Transiciones entre los estados de reproducción y pausa.

Las animaciones deben ser breves, consistentes y discretas. Evita rebotes exagerados, movimientos constantes de toda la interfaz o efectos que distraigan al usuario.

Asegúrate de que los controles sigan respondiendo inmediatamente.

## 9. Resplandor controlado y efectos futuristas

Implementa efectos luminosos en elementos seleccionados:

- Resplandor violeta suave en el botón principal.
- Borde luminoso en la tarjeta activa.
- Halo sutil alrededor del indicador de reproducción.
- Efectos de hover en botones e iconos.
- Degradados y sombras difuminadas en el encabezado.

Utiliza `box-shadow` y pseudo-elementos CSS cuando resulte apropiado.

Evita sombras demasiado intensas, efectos de neón generalizados y animaciones luminosas continuas que puedan cansar la vista.

La estética debe sentirse como un producto digital premium, no como un panel de administración ni como una interfaz de videojuego recargada.

## 10. Detalles de exploración musical

Añade pequeños detalles visuales que refuercen el concepto de exploración de frecuencias y descubrimiento de canciones.

Puedes incorporar etiquetas discretas como:

- `MUSIC DISCOVERY`
- `AUDIO PREVIEW`
- `TRACK 001`
- `24 TRACKS`

Estos son ejemplos: adapta los textos al idioma de la aplicación y utiliza datos reales cuando estén disponibles.

Si muestras el número de resultados, debe corresponder al total real recibido o filtrado, según el comportamiento actual.

No inventes metadatos musicales ni alteres la información devuelta por iTunes. Evita llenar todas las tarjetas de etiquetas técnicas; úsalas únicamente donde aporten valor visual o funcional.

## 11. Estados de la aplicación

Asegúrate de que el nuevo diseño también cubra:

- Estado inicial antes de buscar.
- Campo de búsqueda vacío.
- Carga de resultados.
- Resultados encontrados.
- Búsqueda sin coincidencias.
- Errores de conexión o de la API.
- Error de reproducción de una muestra.
- Reproducción activa y pausada.

Los mensajes de error y los estados vacíos deben respetar la identidad visual morada y ser comprensibles para el usuario.

No muestres resultados ficticios para rellenar la interfaz.

## 12. Accesibilidad y diseño adaptable

- Conserva una navegación accesible mediante teclado.
- Añade indicadores visibles de foco.
- Utiliza etiquetas accesibles en los botones de reproducción, volumen y búsqueda.
- Mantén un contraste adecuado entre el texto y el fondo.
- No dependas únicamente del color para comunicar los estados.
- Respeta la preferencia de movimiento reducido del sistema.
- Evita que los controles sean demasiado pequeños en dispositivos táctiles.
- Comprueba la presentación en escritorio, tabletas y móviles.
- Evita el desbordamiento horizontal.

## 13. Restricciones técnicas

- Conserva la integración existente con la API de iTunes.
- No elimines funcionalidades actuales de búsqueda, resultados o reproducción.
- No cambies innecesariamente el stack tecnológico.
- No añadas librerías si las herramientas actuales son suficientes.
- No dupliques la lógica del reproductor.
- Mantén el código organizado y reutilizable.
- Evita modificar archivos no relacionados con el rediseño.
- No incluyas credenciales, secretos ni configuraciones sensibles en el código.
- Si hay pruebas existentes, ejecútalas y corrige los errores que introduzcan tus cambios.

## 14. Orden de implementación

Trabaja en este orden:

1. Analiza el proyecto y localiza los componentes y estilos existentes.
2. Define la paleta de colores, las fuentes y las variables globales.
3. Rediseña el fondo, el encabezado, el buscador y las tarjetas.
4. Implementa el reproductor personalizado conservando la lógica funcional.
5. Añade las ondas animadas y los indicadores de reproducción.
6. Incorpora las microanimaciones y los resplandores controlados.
7. Adapta los estados de carga, error y resultados vacíos.
8. Comprueba la accesibilidad y el diseño adaptable.
9. Ejecuta las comprobaciones disponibles y corrige los problemas encontrados.

## 15. Resultado esperado

Quiero una aplicación visualmente coherente, moderna y futurista, con predominio del morado, tipografía Space Grotesk e Inter, tarjetas musicales oscuras, un reproductor personalizado, ondas de audio animadas, microinteracciones y efectos luminosos discretos.

El resultado debe conservar la funcionalidad de búsqueda y reproducción de muestras de 30 segundos de iTunes.

**Prioridad principal:** conseguir una identidad visual propia, elegante y futurista, sin sacrificar la legibilidad, el rendimiento ni el funcionamiento de la aplicación.

Al finalizar, resume los archivos modificados, los cambios realizados, las funcionalidades nuevas y las comprobaciones ejecutadas. Si alguna funcionalidad no pudo implementarse completamente, indícalo explícitamente en lugar de presentarla como terminada.
`````

</details>

### ✅ ¿Funcionó a la primera?

> Sí.

### 🔧 Qué corregí o ajusté

> Nada, ya que el prompt tenía lo que necesitaba; con los cambios de frontend y algunas restricciones. 

---

## Prompt 7 — Aplicar el rediseño con el prompt generado (prompt.md)

**Herramienta:** GitHub Copilot CLI

### 💬 Prompt (tal cual)

> Analiza el archivo /tarea2Ivanrodriguez/prompt.md y realiza lo que se te indica.

### 🤖 Respuesta de la IA

<details>
<summary>Ver respuesta completa</summary>

**Archivos modificados**

- `index.html`
  - Añadí identidad visual futurista.
  - Incorporé fuentes Space Grotesk e Inter.
  - Añadí estados iniciales, carga, vacío y error.
  - Mejoré la estructura semántica y accesible.
- `styles.css`
  - Implementé la paleta morada oscura solicitada.
  - Añadí tarjetas responsivas, bordes luminosos y degradados.
  - Incorporé animaciones de entrada, hover e indicadores de reproducción.
  - Añadí diseño adaptable para móviles.
  - Respeté `prefers-reduced-motion`.
  - Agregué estados visibles de foco para teclado.
- `script.js`
  - Reemplacé los controles nativos por un reproductor personalizado.
  - Añadí botones de reproducir/pausar y silenciar.
  - Añadí barra de progreso y control de volumen.
  - Limité cada muestra a 30 segundos.
  - Al llegar al límite, la reproducción se detiene y el contador se actualiza.
  - Al reproducir otra canción, la anterior se pausa y reinicia.
  - Añadí estados de carga, reproducción, pausa y error.
  - Añadí indicadores de ondas animadas para la tarjeta activa.
  - Conservé `fetch` y JSONP para permitir ejecución con Live Server y mediante `file://`.
  - Oculté el elemento técnico `<audio>` y dejé visible únicamente el reproductor personalizado.

**Comprobaciones realizadas**

- Sintaxis de JavaScript validada correctamente.
- Formato de `index.html`, `styles.css` y `script.js` validado.
- Respuesta de la API de iTunes comprobada.
- Lógica del límite de 30 segundos y reproducción única verificada mediante comprobaciones estáticas.

El chequeo global de Git detecta espacios finales preexistentes en `bitacora.md`, un archivo que no forma parte del rediseño.

</details>

### ✅ ¿Funcionó a la primera?

> Sí.

### 🔧 Qué corregí o ajusté

> Nada, ya que se me dio lo que imaginé.

---

## 🐞 Un error de la IA que detecté

- **Error:** en el Prompt 3, Copilot diagnosticó la pantalla vacía como falta de manejo de errores y dijo que la API respondía bien, pero en realidad el error ocurría porque `fetch` no funcionaba al abrir el archivo directamente (`file://`).
    - **¿Cómo lo detecté?:** al terminar el Prompt 3, Copilot CLI mencionó que, si abría el archivo directo y fallaba, usara Live Server. Cuando intenté ejecutar `index.html` directamente, no funcionó hasta que usé Live Server, tal como indicó la IA.
    - **¿Cómo lo resolví?:** en el siguiente prompt le señalé este error para que lo solucionara. Se resolvió con JSONP, aunque cabe aclarar que es una técnica antigua y menos segura que `fetch`, porque ejecuta un script externo. Para no complicar más los cambios, se dejó `fetch` para cuando la app corre con servidor y JSONP solo para `file://`.

## 🎓 Qué aprendí

> Aprendí a usar diversas IAs para realizar distintos trabajos a la vez, y a usar APIs a un nivel básico.

## 🔄 Qué haría distinto la próxima vez

> Pedir el manejo de errores desde el primer prompt, en vez de dejarlo para después, probar la app de las dos formas (con Live Server y con doble clic) antes de dar un arreglo por bueno y preguntarle a las IAs por qué pasa un error antes de pedirle que lo arregle.

## 🙋 Lo que hice sin ayuda de IA

> Subir los commits al repositorio de GitHub, realizar las pruebas manuales, y decidir la paleta de los nuevos colores (los códigos de color salieron del prompt de ChatGPT) y la tipografía.
