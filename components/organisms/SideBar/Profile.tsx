import Image from "next/image";
import { UserTypes } from "../../../services/data-types";

interface ProfileProps {
  dataUser: UserTypes;
}

export default function Profile({ dataUser }: ProfileProps) {
  return (
    <>
      <div className="user text-center pb-50 pe-30">
        <Image
          src={dataUser.avatar}
          className="img-fluid rounded-circle mb-20"
          width={90}
          height={90}
          alt="Avatar"
        />
        <h2 className="fw-bold text-xl color-palette-1 m-0">{dataUser.name}</h2>
        <p className="color-palette-2 m-0">{dataUser.email}</p>
      </div>
    </>
  );
}
