import Image from "next/image";
import UserPage from "./user/page";

export default function Home() {
  return (
    <div style={{minHeight:'90vh'}}>
      <UserPage />
    </div>
  );
}
  