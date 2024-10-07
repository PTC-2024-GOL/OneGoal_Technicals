import * as Constantes from './constantes';
 
// Función que maneja las peticiones fetch
export default async function fetchData(filename, action, form = null) {
    // URL base del servidor
    const SERVER_URL = Constantes.SERVER_URL;
 
    // Construcción de la URL con los parámetros necesarios
    const PATH = new URL(SERVER_URL + filename);
    PATH.searchParams.append('action', action);
 
    // Opciones para la petición fetch
    const OPTIONS = {
        method: form ? 'POST' : 'GET', // Usa POST si se proporciona un formulario, de lo contrario usa GET
        ...(form && { body: form }), // Añade el cuerpo si se proporciona un formulario
        headers: {
            'Content-Type': 'multipart/form-data', // Establece el tipo de contenido para formularios
        },
    };
 
    try {
        // Realización de la petición fetch
        const RESPONSE = await fetch(PATH.href, OPTIONS);
 
        // Verificación del estado de la respuesta
        if (!RESPONSE.ok) {
            const errorText = await RESPONSE.text(); // Obtener el texto de la respuesta
            throw new Error(`HTTP error! status: ${RESPONSE.status}, body: ${errorText}`);
        }
 
        // Parseo del JSON de la respuesta
        const DATA = await RESPONSE.json();
        console.log('RESPONSE: ', action, ' ', DATA);
        return DATA;
 
    } catch (error) {
        // Manejo de errores, incluyendo errores de red
        console.log('Fetch error:', error);
 
        try {
            const RESPONSE = await fetch(PATH.href, OPTIONS);
            const errorText = await RESPONSE.text();
            console.log('Server response on error:', errorText);
           
            // Intentar parsear el cuerpo de error como JSON
            const errorData = JSON.parse(errorText);
 
            // Si el cuerpo de error indica éxito, lo manejamos aquí
            if (errorData.status === 1) {
                // Aquí puedes lanzar un mensaje indicando que la acción fue exitosa
                return errorData; // Devolvemos el objeto de éxito para su manejo
            }
 
            throw new Error(`Server returned error: ${errorData.error || "Unknown error"}`);
        } catch (responseError) {
            console.log('Failed to fetch error response:', responseError);
        }
 
        throw error; // Lanza el error para que useEffect pueda manejarlo
    }
}