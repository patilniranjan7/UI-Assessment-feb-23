import { createServer, Model } from "miragejs";

interface customer {
  customerName: string;
  dateOfBirth: string;
  email: string;
  address: string;
  contact: string;
  altContact: string;
}

// sample customer
const customer: customer = {
  customerName: "Mr. Fraser Lomas",
  dateOfBirth: "14/05/1985",
  email: "fraser.lomas@esgglobal.com",
  address: "123 Fake Street preston Lancashire PR2 5YB",
  contact: "0177211145",
  altContact: "",
};

export function makeServer() {
  return createServer({
    models: {
      customers: Model,
    },

    routes() {
      this.namespace = "api";

      //   get api -> fetching customer details
      this.get("/customer", (schema: any, request: any) => {
        return schema.customers.all();
      });
    },

    seeds(server: any) {
      // create customer
      server.create("customer", customer);
    },
  });
}
