# Rediseño visual futurista para mi aplicación de búsqueda musical

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