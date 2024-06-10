export default async function fetchData(filename, action, form = null) {
    
    let ip = `192.168.1.6`;
    const SERVER_URL = `http://${ip}/sitio_gol_sv/api/`;
    const OPTIONS = {
        method: form ? 'POST' : 'GET',
        ...(form && { body: form })
    };

    try {
        const PATH = new URL(SERVER_URL + filename);
        PATH.searchParams.append('action', action);
        const RESPONSE = await fetch(PATH.href, OPTIONS);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! status: ${RESPONSE.status}`);
        }

        const DATA = await RESPONSE.json();
        console.log('RESPONSE', DATA); // Para ver el JSON recibido
        return DATA;

    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Lanza el error para que useEffect pueda manejarlo
    }
};
