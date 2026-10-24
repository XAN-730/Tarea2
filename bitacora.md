* Primer prompt usado a la IA de Claude Code:
"Estoy presentando un error para hacer mi primer commit, no me está dejando porque me sale el siguiente error que te voy a poner (y eso que hice el git pull y lo volví a intentar, pero nada). El error es este:

git push origin -u main
To https://github.com/XAN-730/Tarea2.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/XAN-730/Tarea2.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. If you want to integrate the remote changes,
hint: use 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details. " 

    # Solución
        "Revisa en qué estado estás:

        git status
        git log --oneline

        Asegúrate de que ya hiciste tu commit local (git add . y git commit -m "Primer commit: estructura base"). Si no lo has hecho, hazlo primero.

        2. Trae lo de GitHub y únelo con lo tuyo:

        git pull origin main --rebase --allow-unrelated-histories

        Esto pone tus commits encima de los que ya estaban en GitHub, así queda un historial limpio.

        3. Sube:

        git push -u origin main

        (Nota: el orden correcto es git push -u origin main; tu comando tenía el -u después de origin, que funciona igual, pero conviene escribirlo así.)

        Si te sale un conflicto

        Lo más probable es que choque el .gitignore o el README.md, porque existen en los dos lados. Git te lo marcará en VS Code con las opciones “Accept Current”, “Accept Incoming” o “Accept Both”. Para el .gitignore, quédate con el que tiene la línea .env (si en tu local también tienes uno, usa “Accept Both” y revisa que no queden líneas duplicadas). Luego:

        git add .
        git rebase --continue
        git push -u origin main
        Lo que NO debes hacer

        No uses git push --force para “pasar por encima”. Funcionaría, pero borraría el commit de GitHub y, lo más importante, te podría complicar tener un historial limpio, que es justo lo que el profe va a revisar."

* Segundo prompt usado a la IA de Github Copilot CLI:
"Hola Copilot, quiero hacer una app web sencilla con HTML, CSS y JavaScript puro que busque canciones usando la iTunes Search API. Debe tener una barra de búsqueda y mostrar los resultados como tarjetas con portada, nombre de la canción, artista y un reproductor del preview. Por ahora solo quiero la estructura básica y la petición a la API con fetch, sin manejo de errores todavía. Al terminar, explícame paso a paso cada parte del código para que sepa qué hiciste." 
 
 # Solución
    "Implementado en:

    •  index.html : estructura de la página, formulario y contenedor de resultados.
    •  styles.css : diseño responsive con tarjetas, colores y reproductor.
    •  script.js : búsqueda mediante  fetch  a la iTunes Search API.

    Cómo funciona:

    1. El usuario escribe un término en el formulario.
    2. JavaScript evita que la página se recargue con  event.preventDefault() .
    3.  encodeURIComponent()  prepara el texto para enviarlo correctamente en la URL.
    4.  fetch()  consulta canciones usando:
    •  media=music 
    •  entity=song 
    •  limit=24 
    5. La respuesta se convierte a JSON.
    6. Se limpia el contenedor anterior y se recorren los resultados.
    7. Por cada canción se crea una tarjeta con:
    • Portada:  artworkUrl100 
    • Nombre:  trackName 
    • Artista:  artistName 
    • Preview:  previewUrl 
    8. El elemento  <audio controls>  permite reproducir la muestra.

    Para probarla, abre  index.html  en el navegador y busca un artista o canción. Todavía no incluye manejo de errores, como solicitaste."

