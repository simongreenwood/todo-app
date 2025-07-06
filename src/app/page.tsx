
import Image from "next/image";
import { fetchData } from "./actions";
import { PrismaClient } from "@prisma/client";

export default function Home() {
  return (
    <div>
      {fetchData().then((data) => (
        <div>
          <h1>Users</h1>
          <ul>
            {data.map((user: { id: number; name: string }) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

