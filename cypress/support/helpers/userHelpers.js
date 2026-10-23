import { faker } from "@faker-js/faker";

/**
 * Gera um usuário completo com dados aleatórios.
 * O e-mail inclui timestamp para garantir unicidade entre execuções.
 */
export function buildUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: "age" });

  return {
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: faker.internet
      .email({
        firstName,
        lastName: `${lastName}${Date.now()}`,
        provider: "teste.com",
      })
      .toLowerCase(),
    password: faker.internet.password({ length: 10 }),
    birthDay: String(birthDate.getDate()),
    birthMonth: birthDate.toLocaleString("en-US", { month: "long" }),
    birthYear: String(birthDate.getFullYear()),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    country: "Canada", 
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number(),
  };
}

/**
 * Cria o usuário via API (pré-condição rápida, sem passar pela UI).
 */
export function createUserViaApi(user) {
  const monthNumber = new Date(`${user.birthMonth} 1, 2000`).getMonth() + 1;

  return cy
    .request({
      method: "POST",
      url: "https://automationexercise.com/api/createAccount",
      form: true,
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: "Mr",
        birth_date: user.birthDay,
        birth_month: String(monthNumber),
        birth_year: user.birthYear,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address,
        address2: "",
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobile,
      },
    })
    .then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.contain("User created!");
    });
}

/**
 * Remove o usuário via API (limpeza para não poluir o ambiente).
 */
export function deleteUserViaApi(user) {
  return cy.request({
    method: "DELETE",
    url: "https://automationexercise.com/api/deleteAccount",
    form: true,
    body: { email: user.email, password: user.password },
    failOnStatusCode: false,
  });
}