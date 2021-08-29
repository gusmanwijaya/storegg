import classNames from "classnames";

interface ButtonTabProps {
  title: string;
  active: boolean;
}

export default function ButtonTab(props: ButtonTabProps) {
  const { title, active } = props;
  const buttonClass = classNames({
    "btn btn-status rounded-pill text-sm me-3": true,
    "btn-active": active,
  });

  return (
    <>
      <a data-filter="*" href="#" className={buttonClass}>
        {title}
      </a>
    </>
  );
}
