export abstract class BaseService {
    protected async sendRequestWithResponseAsync<TResponse>(url: string, request: RequestInit): Promise<TResponse | null> {
        try {
            const response = await fetch(url, {
                method: request.method,
                body: request.body,
                headers: {
                    ... request.headers,
                    "x-api-key": process.env.NEXT_PUBLIC_FRONTEND_API_KEY!,
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.content as TResponse;
            } 

            return null;
        }
        catch (error) {
            console.error(error);

            return null;
        }
    }

    protected async sendRequestWithoutResponseAsync(url: string, request: RequestInit): Promise<boolean> {
        try {
            const response = await fetch(url, {
                method: request.method,
                body: request.body,
                headers: {
                    ... request.headers,
                    "x-api-key": process.env.NEXT_PUBLIC_FRONTEND_API_KEY!,
                    "Content-Type": "application/json"
                }
            });

            return response.ok;
        }
        catch (error) {
            console.error(error);

            return false;
        }
    }
}