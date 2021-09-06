import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { UserTypes } from "../../../services/data-types";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import Profile from "./Profile";

interface SideBarProps {
  activeMenu: "overview" | "transactions" | "settings";
  dataUser: UserTypes;
}

export default function SideBar(props: SideBarProps) {
  const { activeMenu, dataUser } = props;
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <>
      <section className="sidebar">
        <div className="content pt-50 pb-30 ps-30">
          <Profile dataUser={dataUser} />
          <div className="menus">
            <MenuItem
              title="Overview"
              icon="ic-menu-overview"
              active={activeMenu === "overview"}
              href="/member"
            />
            <MenuItem
              title="Transactions"
              icon="ic-menu-transaction"
              href="/member/transactions"
              active={activeMenu === "transactions"}
            />
            <MenuItem title="Message" icon="ic-menu-messages" href="/member" />
            <MenuItem title="Card" icon="ic-menu-card" href="/member" />
            <MenuItem title="Rewards" icon="ic-menu-reward" href="/member" />
            <MenuItem
              title="Settings"
              icon="ic-menu-setting"
              href="/member/edit-profile"
              active={activeMenu === "settings"}
            />
            <MenuItem
              title="Log Out"
              icon="ic-menu-logout"
              onClick={onLogout}
            />
          </div>
          <Footer />
        </div>
      </section>
    </>
  );
}
