# Registro de Implementación — NexoSegur Web

## Propósito

Este documento registra las principales decisiones técnicas adoptadas durante
la implementación del sitio institucional de NexoSegur Seguridad Privada.

Su objetivo es complementar la documentación del proyecto registrando el
razonamiento detrás de las decisiones de implementación, los refactors
realizados, las dificultades encontradas y las mejoras incorporadas durante
el desarrollo.

No reemplaza al DDR, PS, DRQ ni DDS. Su función consiste en documentar la
evolución técnica de la solución y las decisiones tomadas durante su
implementación.

---

# Día 1 — Estructura e implementación inicial

## Objetivos

- Iniciar la implementación del sitio.
- Definir la estructura base del proyecto.
- Establecer el sistema visual inicial.
- Implementar Header y Hero.
- Comenzar la sección de Información institucional.

---

## Organización del proyecto

Se adoptó una estructura simple para una solución estática:

```text
assets/
    css/
    js/
    images/
    documents/

docs/

index.html
```

La estructura busca mantener una separación clara entre código, recursos
visuales y documentación sin introducir herramientas o capas innecesarias.

---

## Organización del CSS

Se separaron las responsabilidades principales del CSS.

Durante la implementación se trabajó con archivos destinados a:

- reset y normalización;
- tokens de diseño;
- estilos base;
- componentes reutilizables;
- estilos específicos de las distintas secciones.

Esta separación permitió modificar cada parte del sitio sin concentrar toda
la implementación visual en un único archivo.

---

## Sistema de diseño

Se creó `design-system.md` y una colección de tokens CSS para registrar y
centralizar las principales decisiones visuales.

Se definieron:

- colores institucionales;
- superficies;
- colores de texto;
- tipografía;
- escala de espaciado;
- radios;
- sombras;
- capas mediante `z-index`;
- velocidades de transición;
- colores para contenido sobre fondos oscuros.

Los tokens constituyen la fuente principal para los valores reutilizados por
la interfaz.

---

## Convención de nombres

Se adoptó una convención inspirada en BEM.

Ejemplos:

```text
hero
hero__title
button
button--primary
```

Los nombres buscan describir responsabilidades y componentes en lugar de
características puramente visuales.

---

## Responsive

Se adoptó un enfoque responsive basado en las necesidades del contenido y
los componentes.

Durante la implementación se incorporaron diferentes puntos de adaptación
cuando cada composición lo requirió, evitando depender de un único breakpoint
global.

---

## Accesibilidad

La accesibilidad se incorporó desde el comienzo de la implementación.

Entre las decisiones iniciales se incluyeron:

- estructura semántica;
- jerarquía de encabezados;
- navegación mediante teclado;
- estados `focus-visible`;
- atributos ARIA cuando resultan necesarios;
- enlace de salto al contenido principal.

---

## Git

Se decidió utilizar commits pequeños y coherentes.

Cada commit debe representar una unidad lógica terminada y no una cantidad
determinada de líneas o tiempo de trabajo.

Durante el proyecto se comenzó a utilizar Git como registro de decisiones y
evolución real de la implementación.

---

# Día 2 — Consolidación visual y secciones principales

## Header

Se implementó inicialmente el encabezado siguiendo la estructura prevista en
el diseño.

Durante las iteraciones visuales se decidió integrar el Header con el Hero,
utilizando:

- posicionamiento absoluto en escritorio;
- gradiente oscuro;
- navegación alineada a la derecha;
- identidad textual de NexoSegur.

Se eliminó el CTA independiente del Header al comprobar que duplicaba la
acción principal disponible en el Hero.

### Identidad

El logo gráfico disponible no resultó adecuado para su integración directa en
el Header.

Se adoptó un wordmark textual compuesto por:

```text
NexoSegur
Seguridad Privada
```

utilizando el color de acento para diferenciar visualmente `Segur`.

El escudo se conservó como recurso gráfico para otros usos, pero no como parte
del encabezado principal.

---

## Navegación responsive

Se implementó un menú hamburguesa para resoluciones menores.

La navegación móvil utiliza:

- botón con `aria-expanded`;
- actualización dinámica de `aria-label`;
- apertura y cierre mediante JavaScript;
- cierre automático al seleccionar un enlace;
- cierre al volver a una resolución de escritorio;
- panel de navegación de ancho completo.

La solución evita mantener dos navegaciones distintas y reutiliza la misma
estructura HTML.

---

## Hero

La composición inicial del Hero fue refactorizada.

Se descartó una composición separada en columnas y se adoptó una fotografía
full-bleed como fondo, con contenido textual superpuesto.

Para mantener legibilidad se utilizaron diferentes gradientes según el tamaño
del viewport.

El Hero incluye:

- título principal;
- divisor visual;
- descripción;
- CTA principal;
- acción secundaria.

La posición de la fotografía y la intensidad de los gradientes se ajustan en
tablet y móvil.

---

## Información institucional

Se implementó una composición de dos columnas:

- fotografía institucional;
- contenido textual.

La sección incorpora información sobre NexoSegur y valores asociados a su
forma de trabajo.

En móvil la composición se reorganiza en una única columna.

La fotografía utiliza `object-fit` y ajustes específicos de `object-position`
para conservar correctamente el sujeto principal en diferentes proporciones.

---

# Día 3 — Servicios y comportamiento interactivo

## Evolución de Servicios

La primera implementación planteaba una cuadrícula estática de tarjetas.

Durante la evaluación visual se determinó que esta solución producía una
sección demasiado extensa y repetitiva.

Se descartó la cuadrícula y se implementó un slider horizontal.

### Composición final

El slider muestra:

- tres tarjetas en escritorio;
- dos tarjetas en tablet;
- una tarjeta en móvil.

Cada tarjeta combina:

- fotografía;
- categoría;
- título;
- descripción;
- características;
- CTA.

Las imágenes se aplican mediante propiedades CSS específicas de cada servicio.

---

## Slider

Se implementó el slider utilizando JavaScript nativo, sin incorporar una
biblioteca externa.

La implementación incluye:

- cálculo dinámico de tarjetas visibles;
- cálculo del desplazamiento según ancho y `gap`;
- paginación generada mediante JavaScript;
- navegación mediante indicadores;
- adaptación automática ante cambios de tamaño;
- `ResizeObserver` cuando está disponible;
- fallback mediante evento `resize`.

---

## Drag mediante Pointer Events

Se incorporó navegación mediante arrastre utilizando Pointer Events.

Esto permite utilizar una única implementación para mouse, touch y otros
dispositivos compatibles.

Se incorporaron:

- captura del puntero;
- umbral mínimo de desplazamiento;
- resistencia visual en los extremos;
- prevención de clicks accidentales después de un drag;
- reposicionamiento automático al finalizar el gesto.

No se incorporó una dependencia externa para esta funcionalidad.

---

## Interacciones de las tarjetas

En dispositivos que soportan hover real se incorporaron efectos visuales para
reforzar la tarjeta activa:

- elevación;
- escala moderada;
- aumento de luminosidad;
- sombra;
- reducción visual de las tarjetas no activas.

Los efectos se limitan mediante:

```css
@media (hover: hover) and (pointer: fine);
```

y respetan:

```css
@media (prefers-reduced-motion: reduce);
```

---

# Día 4 — Respaldo, Contacto y Footer

## Respaldo institucional

La sección de respaldo institucional atravesó varias iteraciones visuales.

Inicialmente se utilizó una gran superficie azul oscura con tres elementos
separados.

La composición generaba demasiado peso visual y una sección
desproporcionadamente grande respecto del resto del sitio.

### Solución final

Se adoptó:

- fondo general claro;
- tres tarjetas institucionales oscuras;
- disposición horizontal en escritorio;
- disposición vertical en móvil;
- contenido centrado en móvil;
- interacción de elevación únicamente en dispositivos con hover.

Los tres elementos presentados son:

1. Habilitación formal.
2. Dirección Técnica.
3. Experiencia previa.

Esta solución mantiene la importancia institucional del contenido sin
convertir la sección en un segundo Hero.

---

## Contacto

Se implementó una sección dividida entre fotografía y contenido.

En escritorio:

- fotografía en el sector izquierdo;
- panel de contenido en el sector derecho;
- separación diagonal mediante `clip-path`.

En móvil:

- la composición pasa a una única columna;
- se elimina `clip-path`;
- el CTA utiliza todo el ancho disponible;
- se simplifica parte de la información secundaria.

El CTA principal inicia contacto mediante WhatsApp.

---

## Footer

Se implementó un Footer institucional con cuatro bloques principales:

- identidad;
- navegación;
- contacto;
- información de la empresa.

La composición utiliza:

- cuatro columnas en escritorio;
- dos columnas en tablet;
- una columna en móvil.

Se incorporaron enlaces funcionales para navegación y medios de contacto.

---

# Día 5 — Auditoría y preparación para producción

## Auditoría HTML

Se revisó la estructura final del documento para detectar:

- errores semánticos;
- atributos innecesarios;
- enlaces;
- jerarquía de encabezados;
- atributos ARIA;
- referencias a recursos.

Se realizaron correcciones antes de la publicación.

---

## Auditoría CSS

Se revisaron los estilos globales y los correspondientes a cada sección.

Se eliminaron o corrigieron:

- reglas redundantes;
- estilos heredados de iteraciones descartadas;
- inconsistencias responsive;
- duplicaciones;
- selectores que habían dejado de tener utilidad.

También se consolidaron los tokens utilizados por la versión final.

---

## Auditoría JavaScript

Se revisaron por separado:

- navegación responsive;
- slider de servicios.

Se mantuvo JavaScript nativo y se evitó incorporar dependencias para
funcionalidades que podían resolverse con APIs del navegador.

---

## Iconografía

Durante la implementación se evaluó el uso de Lucide para iconografía del
Footer.

La dependencia se probó mediante CDN y posteriormente se revisó su necesidad
dentro de la solución final.

La iconografía se mantuvo limitada a elementos donde aporta comprensión y no
como decoración generalizada.

---

## Optimización de imágenes

Se realizó una auditoría de los recursos gráficos del proyecto.

Se detectaron:

- imágenes PNG de gran tamaño;
- versiones duplicadas;
- recursos WebP con pesos excesivos.

Se eliminaron recursos innecesarios y se conservaron únicamente las versiones
utilizadas por la interfaz.

Las imágenes principales fueron:

- redimensionadas;
- convertidas o mantenidas en WebP;
- comprimidas;
- ajustadas buscando equilibrio entre calidad visual y rendimiento.

La optimización tuvo un impacto significativo en las métricas de producción.

---

## Accesibilidad y movimiento

Se verificaron:

- estados de foco;
- navegación mediante teclado;
- contraste;
- objetivos interactivos;
- comportamiento responsive;
- reducción de movimiento.

Los componentes con animaciones incorporan tratamiento para
`prefers-reduced-motion`.

---

# Día 6 — SEO técnico y despliegue

## Metadata

Se completó el `<head>` del documento con metadata orientada a producción.

Se incorporaron o revisaron:

- `title`;
- `meta description`;
- directivas para robots;
- autor;
- favicon;
- URL canónica;
- Open Graph;
- configuración regional.

La imagen social utiliza provisionalmente uno de los recursos visuales
existentes del sitio.

Una imagen Open Graph específica podrá incorporarse como mejora futura.

---

## robots.txt

Se creó:

```text
robots.txt
```

permitiendo el rastreo del sitio e indicando la ubicación del sitemap.

---

## sitemap.xml

Se creó:

```text
sitemap.xml
```

Como el sitio utiliza una arquitectura One Page, el sitemap contiene
únicamente la URL principal.

Las anclas internas no se registran como páginas independientes.

---

## Despliegue

La primera versión pública se desplegó mediante Netlify.

URL temporal de producción:

```text
https://nexosegur.netlify.app/
```

El despliegue se encuentra conectado al repositorio Git, permitiendo que los
cambios publicados mediante `push` generen nuevos deploys.

---

## Dominio propio

Se registró:

```text
nexosegur.com.ar
```

y se agregó como dominio personalizado del proyecto en Netlify.

Al momento de esta actualización, el dominio se encuentra pendiente de
completar su validación y propagación DNS.

Hasta que el dominio propio funcione correctamente mediante HTTPS, la URL de
Netlify continúa siendo utilizada como referencia canónica de producción.

Una vez completada la configuración deberán actualizarse:

- `canonical`;
- `og:url`;
- `og:image`;
- `robots.txt`;
- `sitemap.xml`.

---

# Validación de producción

## Lighthouse

Se realizaron auditorías sobre la versión desplegada.

Resultados obtenidos:

### Mobile

- Performance: entre `92` y `100` según ejecución.
- Accessibility: `100`.
- Best Practices: `100`.
- SEO: `100`.

### Desktop

- Performance: `100`.
- Accessibility: `100`.
- Best Practices: `100`.
- SEO: `100`.

La variación observada en Performance móvil se considera normal para este
tipo de medición.

No se considera justificado degradar la calidad visual o aumentar la
complejidad de la solución con el único objetivo de perseguir una puntuación
perfecta en todas las ejecuciones.

---

# Estado actual

La implementación funcional y visual correspondiente a la primera versión del
sitio se encuentra terminada.

Se encuentran completados:

- estructura One Page;
- Header;
- Hero;
- Información institucional;
- Servicios;
- Respaldo institucional;
- Contacto;
- Footer;
- navegación responsive;
- slider de servicios;
- CTA de contacto;
- optimización de imágenes;
- accesibilidad;
- SEO técnico básico;
- publicación en producción.

## Pendiente para cierre de v1.0.0

- completar validación y propagación del dominio `nexosegur.com.ar`;
- verificar HTTPS sobre el dominio propio;
- establecer el dominio propio como URL principal;
- actualizar las referencias SEO desde el dominio temporal de Netlify;
- realizar comprobación final de producción;
- crear el tag `v1.0.0`.

---

# Criterio para mejoras futuras

Las mejoras posteriores a `v1.0.0` deberán responder a una necesidad
identificada y no incorporarse únicamente por disponibilidad técnica.

Entre las mejoras posibles, sin considerarlas requisitos actuales, se
encuentran:

- imagen Open Graph específica;
- evolución del catálogo de servicios;
- incorporación de nuevas fotografías institucionales;
- ajustes derivados de métricas reales de uso;
- nuevas funcionalidades justificadas por necesidades comerciales futuras.

Estas mejoras deberán evaluarse respetando el alcance definido en el DRQ y el
principio de no anticipar necesidades sin justificación.
