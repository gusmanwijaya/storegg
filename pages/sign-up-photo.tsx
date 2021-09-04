/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { setSignUp } from "../services/auth";
import { getGameCategory } from "../services/player";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  const getGameCategoryAPI = useCallback(async () => {
    const response = await getGameCategory();

    setCategories(response);
    setFavorite(response[0]._id);
  }, []);

  useEffect(() => {
    getGameCategoryAPI();
  }, [getGameCategoryAPI]);

  useEffect(() => {
    const getLocalForm = localStorage.getItem("user-form");
    setLocalForm(JSON.parse(getLocalForm));
  }, []);

  const onSubmit = async () => {
    const getLocalForm = localStorage.getItem("user-form");
    const form = JSON.parse(getLocalForm);
    const data = new FormData();

    data.append("avatar", avatar);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("name", form.name);
    data.append("favorite", favorite);

    const result = await setSignUp(data);

    if (result.error === 1) {
      toast.error(result.message);
    } else {
      toast.success("Register Berhasil");
      localStorage.removeItem("user-form");
      router.push("/sign-up-success");
    }
  };

  return (
    <>
      <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
        <div className="container mx-auto">
          <form action="">
            <div className="form-input d-md-block d-flex flex-column">
              <div>
                <div className="mb-20">
                  <div className="image-upload text-center">
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
                        return setAvatar(img);
                      }}
                    />
                  </div>
                </div>
                <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                  {localForm.name}
                </h2>
                <p className="text-lg text-center color-palette-1 m-0">
                  {localForm.email}
                </p>
                <div className="pt-50 pb-50">
                  <label
                    htmlFor="category"
                    className="form-label text-lg fw-medium color-palette-1 mb-10"
                  >
                    Favorite Game
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select d-block w-100 rounded-pill text-lg"
                    aria-label="Favorite Game"
                    value={favorite}
                    onChange={(event) => setFavorite(event.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    {categories.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="button-group d-flex flex-column mx-auto">
                <button
                  className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                  type="button"
                  onClick={onSubmit}
                >
                  Create My Account
                </button>
                <Link href="#">
                  <a
                    className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                    role="button"
                  >
                    Terms & Conditions
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>

        <ToastContainer theme="colored" />
      </section>
    </>
  );
}
