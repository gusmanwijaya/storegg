import Link from "next/link";

interface FooterItemProps {
  title: string;
  link1: string;
  link2: string;
  link3: string;
  link4?: string;
}

export default function FooterItem(props: Partial<FooterItemProps>) {
  const { title, link1, link2, link3, link4 } = props;
  return (
    <>
      <div className="col-md-4 col-6 mb-lg-0 mb-25">
        <p className="text-lg fw-semibold color-palette-1 mb-12">{title}</p>
        <ul className="list-unstyled">
          <li className="mb-6">
            <Link href="/">
              <a className="text-lg color-palette-1 text-decoration-none">
                {link1}
              </a>
            </Link>
          </li>
          <li className="mb-6">
            <Link href="/">
              <a className="text-lg color-palette-1 text-decoration-none">
                {link2}
              </a>
            </Link>
          </li>
          <li className="mb-6">
            <Link href="/">
              <a className="text-lg color-palette-1 text-decoration-none">
                {link3}
              </a>
            </Link>
          </li>
          <li className="mb-6">
            <Link href="/">
              <a className="text-lg color-palette-1 text-decoration-none">
                {link4}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
