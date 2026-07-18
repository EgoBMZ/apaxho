# 🌸 Apaxho — Tu espacio íntimo diario

**Apaxho** es un diario y jardín digital compartido creado para conectar diariamente con tu persona favorita (pareja, mejor amigo/a, o familiar). A través del intercambio de notas y detalles de afecto diarios, los usuarios cultivan un jardín virtual conjunto, mantienen viva su racha y ven florecer su diario de recuerdos.

---

## ✨ Características Principales

* **🌱 Jardín Virtual Dinámico:** Un lienzo interactivo que evoluciona en tiempo real. Cada nota que plantas se convierte en una flor única en el jardín.
* **🔥 Racha Diaria (Streak):** El clima del jardín reacciona a su constancia. Si ambos envían su nota diaria, el jardín se vuelve brillante y soleado; si falta alguna nota, el cielo se vuelve nublado y gris hasta que vuelvan a plantar un "apapacho".
* **⏳ Fotos Efímeras (Expiración de 24h):** Puedes adjuntar imágenes a tus notas, las cuales expiran automáticamente después de 24 horas para mantener los momentos frescos y espontáneos.
* **🌓 Modo Día y Noche:** Un diseño adaptativo que cambia con hermosos degradados interactivos, incluyendo estrellas animadas en el modo oscuro.
* **🌐 Multilingüe:** Soporte nativo para Español e Inglés, detectando automáticamente la preferencia del navegador del usuario.
* **📱 Diseño Móvil Primero (Mobile-First):** Completamente responsivo, con ordenamiento optimizado para que en teléfonos móviles el jardín siempre esté visible en la parte superior.

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** [Next.js 16](https://nextjs.org/) (con soporte experimental para Turbopack y SSR)
* **Estilado:** [Tailwind CSS v4](https://tailwindcss.com/) para estilos rápidos y responsivos con variables CSS avanzadas
* **Animaciones:** [Framer Motion](https://www.framer.com/motion/) para transiciones suaves y estados de carga juguetones
* **Base de Datos y Auth:** [Firebase](https://firebase.google.com/) (Firestore para notas y perfiles, Authentication para el flujo de usuarios con Google/Email, y Storage para guardar las fotos efímeras)
* **Iconografía:** [react-doodle-icons](https://github.com/doodle-icons) para dar una estética de dibujo a mano alzada muy acogedora

---

## 🚀 Comenzando (Desarrollo Local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/i_love_notes.git
cd i_love_notes
```

### 2. Instalar dependencias
El proyecto incluye un script de post-instalación automático para resolver advertencias de compatibilidad de SVGs en React:
```bash
npm install
```

### 3. Configurar Firebase
Asegúrate de tener un proyecto en Firebase con los siguientes servicios activos:
* **Authentication:** Proveedor de Correo/Contraseña y Proveedor de Google habilitados.
* **Cloud Firestore:** En modo producción o prueba.
* **Firebase Storage:** Para el almacenamiento de las fotos de los apapachos.

### 4. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

### 5. Correr el servidor de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando.

---

## 🏗️ Producción y Despliegue en Vercel

El proyecto está optimizado y validado para ser subido a Vercel sin complicaciones.

### Pasos para desplegar:

1. Crea un nuevo proyecto en **Vercel** conectado a tu repositorio de GitHub.
2. En la sección de **Environment Variables** (Variables de Entorno), añade todas las variables definidas en tu archivo `.env.local`.
3. Vercel detectará la configuración de Next.js automáticamente. Haz clic en **Deploy**.
4. ¡Listo! Tu jardín compartido estará en línea.

---

## 📜 Reglas de Seguridad de Firebase (Recomendadas)

### Firestore Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    match /notes/{noteId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules (`storage.rules`)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /notes/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🌸 Hecho con amor.
