class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
    this.token = ""
  }

  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  getAuthorizationHeader() {
    if (!this.token) throw new Error("Отсутствует токен")

    return `Bearer ${this.token}`
  }

  setToken(token) {
    this.token = token
  }

  async signIn(values) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status === 401) {
      throw new Error("Неверные логин или пароль")
    }
    if (res.status === 404) {
      throw new Error("Пользователь с указанным email не найден")
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }

    return res.json()
  }

  async signUp(values) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status === 400) {
      throw new Error("Некорректно заполнено одно из полей")
    }
    if (res.status === 409) {
      throw new Error("Пользователь с указанным email уже существует")
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }

    return res.json()
  }

  async getUserInfo() {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.getAuthorizationHeader(),
      },
    })

    if (res.status >= 400) {
      throw new Error(
        `Произошла ошибка при добавлении комментария. Status: ${res.status}`
      )
    }

    return res.json()
  }

  async getAllProducts(search = "") {
    const res = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationHeader(),
      },
    })

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при входе в Личный кабинет. 
          Проверьте отправляемые данные. Status: ${res.status}`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении ответа от сервера. 
          Попробуйте сделать запрос позже. Status: ${res.status}`)
    }

    // await this._sleep(1_000);

    return res.json()
  }

  async getProductsByIds(ids) {
    return Promise.all(
      ids.map((id) =>
        fetch(`${this.baseUrl}/products/${id}`, {
          headers: {
            authorization: this.getAuthorizationHeader(),
          },
        }).then((res) => res.json())
      )
    )
  }

  async addProduct(product) {
    const res = await fetch(`${this.baseUrl}/products`, {
      method: "POST",
      headers: {
        authorization: this.getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (res.status >= 400) {
      throw new Error(
        `Произошла ошибка при добавлении продукта. Status: ${res.status}`
      )
    }

    return res.json()
  }

  async editProduct(product) {
    const res = await fetch(`${this.baseUrl}/products/${product._id}`, {
      method: "PATCH",
      headers: {
        authorization: this.getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (res.status >= 400) {
      throw new Error(
        `Произошла ошибка при добавлении продукта. Status: ${res.status}`
      )
    }

    return res.json()
  }

  async deleteProduct(id) {
    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this.getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
    })

    if (res.status >= 400) {
      throw new Error(
        `Произошла ошибка при добавлении комментария. Status: ${res.status}`
      )
    }

    return res.json()
  }

  async addComment({ productId, comment }) {
    const res = await fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: "POST",
      headers: {
        authorization: this.getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: comment,
      }),
    })

    if (res.status >= 400) {
      throw new Error(
        `Произошла ошибка при добавлении комментария. Status: ${res.status}`
      )
    }

    return res.json()
  }
}

export const dogFoodApi = new DogFoodApi({
  baseUrl: "https://api.react-learning.ru",
})
