export default defineEventHandler(async event => {
    const body = await readBody(event);
    const token = getHeader(event, 'authorization');
    const runtimeConfig = useRuntimeConfig();

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    const requestUrl = runtimeConfig.public.apiBaseUrl + 'purchase';
    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.json();
});
