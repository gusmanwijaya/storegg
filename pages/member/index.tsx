import jwtDecode from "jwt-decode";
import OverviewContent from "../../components/organisms/OverviewContent";
import SideBar from "../../components/organisms/SideBar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";

interface MemberProps {
  user: UserTypes;
}

export default function Member(props: MemberProps) {
  const { user } = props;

  console.log("Data User Login : ", user);

  return (
    <>
      <section className="overview overflow-auto">
        <SideBar activeMenu="overview" dataUser={user} />

        <OverviewContent />
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
