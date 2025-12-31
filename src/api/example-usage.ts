// Example usage of the API client
import { api } from "./index";

async function testApiClient() {
  // Example 1: GET (with path param)
  // Endpoint: /api/v1/category/{id}
  const category = await api.get("/api/v1/category/{id}", {
    pathParams: { id: 123 },
  });
  console.log("GET /api/v1/category/{id}", category);

  // Example 2: GET (with query param)
  // Endpoint: /api/v1/account/email/confirm?email=foo@bar.com
  const confirm = await api.get("/api/v1/account/email/confirm", {
    queryParams: { email: "foo@bar.com" },
  });
  console.log("GET /api/v1/account/email/confirm", confirm);

  // Example 3: POST (with body)
  // Endpoint: /api/v1/account/login
  const loginResult = await api.post("/api/v1/account/login", {
    body: { email: "", password: "" },
  });
  console.log("POST /api/v1/account/login", loginResult);

  // Example 4: PUT (with path param and body)
  // Endpoint: /api/v1/category/{id}
  const updated = await api.put("/api/v1/category/{id}", {
    pathParams: { id: 123 },
    body: {
      nameEn: "Updated Category",
      descriptionAr: "وصف محدث للفئة",
      descriptionEn: "Updated description for category",
      nameAr: "وصف محدث للفئة",
    },
  });
  console.log("PUT /api/v1/category/{id}", updated);

  // Example 5: PATCH (with path param and body)
  // Endpoint: /api/v1/category/{id}
  const patched = await api.patch("/api/v1/indicator/disable/{id}", {
    pathParams: { id: "456" },
  });
  console.log("PATCH /api/v1/category/{id}", patched);

  // Example 6: DELETE (with path param)
  // Endpoint: /api/v1/category/{id}
  const deleted = await api.delete("/api/v1/category/{id}", {
    pathParams: { id: 123 },
  });
  console.log("DELETE /api/v1/category/{id}", deleted);
}

testApiClient().catch(console.error);
