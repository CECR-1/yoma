// Array de mensajes: cada objeto representa un estado con 4 textos
const mensajes = [
    { texto: ["Te", "Quiero", "Mucho", "Mi Reina"] },
    { texto: ["Eres", "La", "Mejor", "Mi Reina"] },
    { texto: ["Estoy", "Muy", "Enamorado", "De Ti"] },
    { texto: ["Te", "Extraño", "Mucho", "Mi Princesa"] }
];

// Referencias al DOM
const element = document.getElementById("element");
if (!element) throw new Error('No se encontró el contenedor #element en el DOM');

// Crear 4 divs .item y añadirlos al DOM
const items = [];
for (let i = 0; i < 4; i++) {
    const d = document.createElement('div');
    d.className = 'item';
    // data-index para referencia si se necesita luego
    d.dataset.index = i;
    d.textContent = ''; // se llenará más abajo
    element.appendChild(d);
    items.push(d);
}

// Estado del ciclo
let index = 0;
const intervalMs = 2000; // 2 segundos

// Duración de la animación (coincide con CSS: 220ms)
const animMs = 240;

// Función que actualiza los textos de los 4 items según mensajes[index]
// Aplica fade-out, cambia texto y aplica fade-in para una transición suave
function actualizar() {
    const estado = mensajes[index];

    // Primero: aplicar fade-out a todos los items
    items.forEach(it => {
        it.classList.remove('fade-in');
        it.classList.add('fade-out');
    });

    // Después de la animación, cambiar el texto y hacer fade-in
    setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
            items[i].textContent = estado.texto[i] ?? '';
            items[i].classList.remove('fade-out');
            // forzar reflow para reiniciar la animación (safety)
            void items[i].offsetWidth;
            items[i].classList.add('fade-in');
        }
        // Avanzar índice (circular)
        index = (index + 1) % mensajes.length;
    }, animMs);
}

// Primera renderización y arranque del intervalo
actualizar();
const timer = setInterval(actualizar, intervalMs + animMs);

// Exportar ayuda para debugging en consola (opcional)
window.__mensajesTimer = {
    stop: () => clearInterval(timer),
    start: () => { actualizar(); }
};


