import { redirect } from "next/navigation";

// Esta sección ahora vive dentro de la página principal (una sola página).
// Mantenemos la ruta para que los enlaces antiguos sigan funcionando.
export default function FaqRedirect() {
  redirect("/#faq");
}
