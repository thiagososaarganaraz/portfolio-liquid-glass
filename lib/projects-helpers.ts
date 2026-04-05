import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

/**
 * Agrega un nuevo proyecto a la colección de Firestore
 * @param project - Datos del proyecto
 * @returns ID del documento creado
 */
export async function addProject(project: ProjectData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "proyectos"), project);
    console.log("Proyecto agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar proyecto:", error);
    throw error;
  }
}

/**
 * Obtiene todos los proyectos de Firestore
 * @returns Array de proyectos
 */
export async function getAllProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, "proyectos"));
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Proyectos obtenidos:", projects);
    return projects;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    throw error;
  }
}

/**
 * Elimina un proyecto de Firestore
 * @param projectId - ID del proyecto a eliminar
 */
export async function deleteProject(projectId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "proyectos", projectId));
    console.log("Proyecto eliminado:", projectId);
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    throw error;
  }
}

/**
 * Proyectos de ejemplo para agregar a la base de datos
 */
export const EXAMPLE_PROJECTS: ProjectData[] = [
  {
    title: "Portfolio Liquid Glass",
    description:
      "Un portafolio moderno con diseño liquid glass, tema oscuro y sistema bilingüe (español/inglés). Construido con Next.js 16 y Tailwind CSS.",
    image: "https://via.placeholder.com/600x400?text=Portfolio+Liquid+Glass",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://portfolio.example.com",
    github: "https://github.com/example/portfolio",
  },
  {
    title: "E-commerce Platform",
    description:
      "Plataforma de comercio electrónico con carrito de compras, sistema de pagos integrado y gestión de inventario en tiempo real.",
    image: "https://via.placeholder.com/600x400?text=E-commerce+Platform",
    tags: ["React", "Firebase", "Stripe", "Node.js"],
    link: "https://ecommerce.example.com",
    github: "https://github.com/example/ecommerce",
  },
  {
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con colaboración en tiempo real, sistema de notificaciones y sincronización en múltiples dispositivos.",
    image: "https://via.placeholder.com/600x400?text=Task+Management",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    link: "https://tasks.example.com",
    github: "https://github.com/example/tasks",
  },
];
