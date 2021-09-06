import jwtDecode from "jwt-decode";
import SideBar from "../../../components/organisms/SideBar";
import TransactionContent from "../../../components/organisms/TransactionContent";
import { JWTPayloadTypes, UserTypes } from "../../../services/data-types";

interface TransactionProps {
  user: UserTypes;
}

export default function Transactions(props: TransactionProps) {
  const { user } = props;

  console.log("Data user login : ", user);

  return (
    <>
      <section className="transactions overflow-auto">
        <SideBar activeMenu="transactions" dataUser={user} />

        <TransactionContent />
      </section>
    </>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  console.log("jwtToken : ", jwtToken);
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  console.log("payload : ", payload);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  return {
    props: {
      user: userFromPayload,
    },
  };
}
