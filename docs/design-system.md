# Sistema de diseño — NexoSegur Web

## 1. Propósito

Este documento registra el sistema visual implementado en el sitio institucional
de NexoSegur Seguridad Privada.

Su propósito es mantener consistencia entre las distintas secciones del sitio,
documentar las decisiones visuales adoptadas durante la implementación,
facilitar la reutilización de estilos y permitir que la solución evolucione
sin introducir diferencias visuales innecesarias.

El sistema se mantiene deliberadamente acotado. Solo se incorporan tokens,
patrones y componentes que responden a necesidades reales de la solución.

---

## 2. Principios

El sistema visual mantiene coherencia con los principios definidos para la
solución:

- Claridad y simplicidad.
- Coherencia institucional.
- Profesionalismo y confianza.
- Fidelidad de la información.
- Adaptabilidad a diferentes dispositivos.
- Accesibilidad.
- Evolución progresiva.
- Reutilización sin sobreabstracción.

---

## 3. Identidad visual

La identidad visual utiliza una combinación de azules institucionales,
superficies neutras y alto contraste.

La interfaz evita una estética excesivamente tecnológica o militar y prioriza
una presentación institucional, profesional y cercana.

### Paleta principal

| Variable               | Valor     | Uso                                                 |
| ---------------------- | --------- | --------------------------------------------------- |
| `--color-primary`      | `#14396f` | Identidad principal, títulos y elementos destacados |
| `--color-primary-dark` | `#081d3f` | Fondos oscuros y superficies institucionales        |
| `--color-accent`       | `#1677e8` | CTA, estados interactivos y elementos destacados    |
| `--color-accent-light` | `#8fc5ff` | Acentos sobre superficies oscuras                   |

### Neutros y superficies

| Variable             | Valor     | Uso                              |
| -------------------- | --------- | -------------------------------- |
| `--color-white`      | `#ffffff` | Blanco principal                 |
| `--color-white-soft` | `#f8fafc` | Superficie clara auxiliar        |
| `--color-surface-1`  | `#f4f7fb` | Fondo general y secciones claras |
| `--color-surface-2`  | `#e9f0f8` | Superficie secundaria            |
| `--color-border`     | `#d5dde7` | Bordes y divisores               |

### Texto

| Variable             | Valor     | Uso              |
| -------------------- | --------- | ---------------- |
| `--color-text`       | `#1f2937` | Texto general    |
| `--color-text-light` | `#ffffff` | Texto claro      |
| `--color-text-muted` | `#5f6b7a` | Texto secundario |

### Texto sobre superficies oscuras

| Variable                 | Valor                    | Uso                            |
| ------------------------ | ------------------------ | ------------------------------ |
| `--color-on-dark`        | `#ffffff`                | Texto principal                |
| `--color-on-dark-muted`  | `rgb(255 255 255 / 86%)` | Texto secundario               |
| `--color-on-dark-subtle` | `rgb(255 255 255 / 68%)` | Información de menor jerarquía |

---

## 4. Tipografía

La familia tipográfica principal es:

```css
--font-family-base: "Inter", Arial, Helvetica, sans-serif;
```
