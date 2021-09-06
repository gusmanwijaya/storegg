/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input";
import Cookies from "js-cookie";

import SideBar from "../../components/organisms/SideBar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import { updateProfile } from "../../services/member";

interface EditProfileProps {
  user: UserTypes;
  token: string;
}

export default function EditProfile(props: EditProfileProps) {
  const { user, token } = props;
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUserState(user);
  }, [user]);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("avatar", userState.avatar);
    data.append("name", userState.name);
    data.append("phoneNumber", userState.phoneNumber);
    const response = await updateProfile(data, user._id, token);
    if (response.error) {
      toast.error(response.message);
    } else {
      console.log("Update Profile : ", response);
      Cookies.remove("token");
      toast.success("Update Profile Berhasil");
      router.push("/sign-in");
    }
  };

  return (
    <>
      <section className="edit-profile overflow-auto">
        <SideBar activeMenu="settings" dataUser={user} />

        <main className="main-wrapper">
          <div className="ps-lg-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
            <div className="bg-card pt-30 ps-30 pe-30 pb-30">
              <form action="">
                <div className="photo d-flex">
                  <div className="image-upload">
                    <label htmlFor="avatar">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          className="img-upload"
                          width={120}
                          height={120}
                          alt="Icon Upload"
                        />
                      ) : (
                        <Image
                          src="/icon/upload.svg"
                          width={120}
                          height={120}
                          alt="Icon Upload"
                        />
                      )}
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      onChange={(event) => {
                        const img = event.target.files[0];
                        setAvatarPreview(URL.createObjectURL(img));
                        return setUserState({
                          ...user,
                          avatar: img,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="pt-30">
                  <Input
                    label="Full Name"
                    value={userState.name}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    aria-describedby="name"
                    onChange={(event) =>
                      setUserState({
                        ...userState,
                        name: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="pt-30">
                  <Input
                    disabled
                    label="Email Address"
                    value={userState.email}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    aria-describedby="email"
                  />
                </div>
                <div className="pt-30">
                  <Input
                    label="Phone Number"
                    value={userState.phoneNumber}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    aria-describedby="phoneNumber"
                    onChange={(event) =>
                      setUserState({
                        ...userState,
                        phoneNumber: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="button-group d-flex flex-column pt-50">
                  <button
                    onClick={onSubmit}
                    type="button"
                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  >
                    Save My Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
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
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  return {
    props: {
      user: userFromPayload,
      token: jwtToken,
    },
  };
}
