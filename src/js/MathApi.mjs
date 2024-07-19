export default class MathApi {
    constructor(baseURL = 'https://api.mathjs.org/v4/') {
        this.baseURL = baseURL;
    }

    async evaluateExpression(expression) {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ expr: expression })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
}
