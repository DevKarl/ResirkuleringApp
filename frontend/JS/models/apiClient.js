

export function sendLoginRequest(data) {
  return fetch("/testdata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) throw new Error("Invalid login credentials");
    return response.json();
  });
}