class DogFoodApi {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
        this.token = '';
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getAuthorizationHeader() {
        return `Bearer ${this.token}`;
    }

    setToken(token) {
        this.token = token;
    }

    checkToken() {
        if (!this.token) throw new Error('Отсутствует токен');
    }

    async signIn(values) {
        const res = await fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (res.status === 401) {
            throw new Error('Неверные логин или пароль');
        }
        if (res.status === 404) {
            throw new Error('Пользователь с указанным email не найден');
        }
        if (res.status >= 300) {
            throw new Error(`Ошибка, код ${res.status}`);
        }

        return res.json();
    }

    async signUp(values) {
        const res = await fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (res.status === 400) {
            throw new Error('Некорректно заполнено одно из полей');
        }
        if (res.status === 409) {
            throw new Error('Пользователь с указанным email уже существует');
        }
        if (res.status >= 300) {
            throw new Error(`Ошибка, код ${res.status}`);
        }

        return res.json();
    }


    async getAllProducts() {
        this.checkToken();

        const res = await fetch(`${this.baseUrl}/products`, {
            headers: {
                // authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NmYjRmMDU5Yjk4YjAzOGY3N2FhOWEiLCJncm91cCI6InNtOSIsImlhdCI6MTY3NDU1NjcyNCwiZXhwIjoxNzA2MDkyNzI0fQ.wddeTXXHn6Q_YqChsYAmJJ9Jzk5pKgkZ62O_WiM9A1U',
                authorization: this.getAuthorizationHeader(),
            },
        });

        if (res.status >= 400 && res.status < 500) {
            throw new Error(`Произошла ошибка при входе в Личный кабинет. 
          Проверьте отправляемые данные. Status: ${res.status}`)
        }

        if (res.status >= 500) {
            throw new Error(`Произошла ошибка при получении ответа от сервера. 
          Попробуйте сделать запрос позже. Status: ${res.status}`)
        }

        await this._sleep(1_000);

        return res.json()
    }
}

export const dogFoodApi = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' });