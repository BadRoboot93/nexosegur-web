# Registro de Implementación

## Propósito

Este documento registra las principales decisiones técnicas adoptadas durante la implementación del sitio institucional de NexoSegur.

Su objetivo es complementar la documentación del proyecto registrando el razonamiento detrás de las decisiones de implementación, los refactors realizados, las dificultades encontradas y las mejoras incorporadas durante el desarrollo.

No reemplaza al DDS ni al DRQ. Su función consiste en documentar la evolución técnica de la solución.

---

# Día 1

## Objetivos

- Iniciar la implementación del sitio.
- Definir la estructura base del proyecto.
- Implementar el encabezado.
- Implementar la presentación inicial.
- Comenzar la implementación de la información institucional.

## Decisiones adoptadas

### Organización del proyecto

Se definió una estructura de carpetas simple y escalable:

```text
assets/
    css/
    js/
    images/
    documents/

docs/

index.html
```

---

### Organización del CSS

Se decidió separar las responsabilidades del CSS en cuatro archivos:

- reset.css
- base.css
- components.css
- layout.css

Esta organización permite mantener una clara separación entre:

- normalización;
- configuración global;
- componentes reutilizables;
- organización de las secciones.

---

### Sistema de componentes

Se adoptó una estrategia basada en componentes reutilizables.

Componentes implementados:

- Container
- Button
- Section Header
- Card
- Value Card

Las nuevas implementaciones deberán reutilizar estos componentes siempre que resulte técnicamente apropiado.

---

### Convención de nombres

Se adoptó una convención inspirada en BEM.

Ejemplos:

- hero
- hero\_\_title
- button
- button--primary

Los nombres describen responsabilidades y no características visuales.

---

### Responsive

Se adoptó un enfoque responsive basado en el contenido.

Breakpoint inicial:

48rem.

---

### Accesibilidad

Desde el inicio del proyecto se incorporaron:

- navegación mediante teclado;
- focus visible;
- estructura semántica;
- encabezados jerárquicos;
- atributos aria donde corresponden.

---

### Git

Se decidió utilizar commits pequeños y coherentes.

Cada commit representa una unidad lógica terminada.

No se realizarán commits por cantidad de líneas modificadas.

---

## Problemas detectados

### Logo institucional

El logo disponible inicialmente no resulta adecuado para su utilización directa en la web.

Se decidió desarrollar un kit gráfico específico en un trabajo paralelo, sin detener la implementación del sitio.

---

## Próximo objetivo

Finalizar la sección de Información institucional y continuar con la implementación de Servicios.
