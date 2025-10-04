# AI Rules for this Application

This document outlines the technical stack and guidelines for using libraries within this project.

## Tech Stack

*   **React:** The core library for building user interfaces.
*   **React Three Fiber:** A powerful React renderer for Three.js, enabling declarative 3D scenes within React components.
*   **Three.js:** The underlying 3D graphics library, used for creating and manipulating 3D objects and scenes.
*   **React Three Drei:** A collection of useful helpers and abstractions for `react-three-fiber`, providing ready-to-use components and effects (e.g., `Image`, `ScrollControls`).
*   **Valtio:** A proxy-based state management library for creating reactive and simple global state.
*   **Maath:** A small utility library for mathematical operations, specifically used for easing functions in animations.
*   **JavaScript (ES6+):** The primary programming language for application logic.
*   **CSS:** Used for global styling, defined in `src/styles.css`.
*   **Styled Components:** Available as a dependency for component-scoped styling, though not extensively used in the current main application logic.

## Library Usage Guidelines

*   **UI Components:** All user interface components should be built using **React**.
*   **3D Rendering:** Use **`@react-three/fiber`** to integrate and render 3D scenes within your React application.
*   **3D Helpers & Abstractions:** Leverage **`@react-three/drei`** for common 3D components, controls, and effects (e.g., `Image`, `ScrollControls`, `Scroll`). For more custom or low-level 3D operations, interact directly with **`three.js`**.
*   **State Management:** For global or shared application state, use **`valtio`**.
*   **Animations:** Utilize **`maath`** for easing functions and other mathematical utilities in animations.
*   **Styling:**
    *   For global styles, update the existing `src/styles.css` file.
    *   For component-specific styling, `styled-components` is available, or inline styles can be used for simple cases.
    *   To maintain consistency with the existing codebase, avoid introducing new styling frameworks like Tailwind CSS or Shadcn/UI unless explicitly requested.
*   **Language:** Adhere to **JavaScript (`.js` files)** for all new and existing application logic, consistent with the current project structure.
*   **File Structure:**
    *   New components should ideally reside in `src/components/`.
    *   New pages should go into `src/pages/`.
    *   Utility functions should be placed in `src/utils/`.