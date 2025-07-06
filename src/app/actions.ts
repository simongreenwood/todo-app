"use server";

export async function fetchData() {
  const response = await fetch("https://localhost:3000/api/users");
  const data = await response.json();
  return data;
}
