"use server";

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Aquí puedes enviar el mensaje a un email, guardar en DB, etc.
  // Ejemplo: solo validación simple
  if (!name || !email || !message) {
    return { success: false, error: "Veuillez remplir tous les champs." };
  }

  // Simulación de éxito
  return { success: true };
}
