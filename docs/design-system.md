# Sistema de diseño — NexoSegur Web

## 1. Propósito

Este documento registra las decisiones visuales y los componentes reutilizables
adoptados durante la implementación del sitio institucional de NexoSegur.

Su propósito es mantener consistencia entre las distintas secciones del sitio,
facilitar la reutilización de estilos y permitir que la solución evolucione sin
introducir diferencias visuales innecesarias.

El sistema se desarrollará progresivamente. Solo se incorporarán componentes
que respondan a necesidades reales de la implementación.

---

## 2. Principios

El sistema visual deberá mantener coherencia con los principios definidos para
la solución:

- Claridad y simplicidad.
- Coherencia institucional.
- Profesionalismo y confianza.
- Fidelidad de la información.
- Adaptabilidad a diferentes dispositivos.
- Accesibilidad.
- Evolución progresiva.

---

## 3. Colores

Los colores se definen mediante variables CSS globales.

| Variable             | Uso                                                   |
| -------------------- | ----------------------------------------------------- |
| `--color-primary`    | Identidad principal, títulos y acciones destacadas    |
| `--color-accent`     | Acentos, estados interactivos y elementos secundarios |
| `--color-text`       | Texto general                                         |
| `--color-background` | Fondo principal                                       |
| `--color-surface`    | Fondos secundarios y separación de secciones          |
| `--color-border`     | Bordes y divisores                                    |

Los valores podrán ajustarse cuando el kit visual definitivo sea aprobado,
sin modificar los selectores que utilizan estas variables.

---

## 4. Tipografía

La tipografía actual utiliza fuentes del sistema mientras se define si resulta
necesario incorporar una fuente externa.

Variables previstas:

- `--font-family-primary`

Jerarquía actual:

- `h1`: encabezado principal de la página.
- `h2`: encabezado principal de cada sección.
- `h3`: encabezado de componentes internos.
- Párrafos: contenido descriptivo.

---

## 5. Layout

### Container

Clase:

```css
.container
```
