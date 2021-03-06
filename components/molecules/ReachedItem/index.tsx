interface ReachedItemProps {
  title: string;
  description: string;
  additionalClass?: "ms-lg-35";
}

export default function ReachedItem(props: Partial<ReachedItemProps>) {
  const { title, description, additionalClass } = props;
  return (
    <>
      <div className={`me-lg-35 ${additionalClass}`}>
        <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
          {title}
        </p>
        <p className="text-lg text-lg-start text-center color-palette-2 m-0">
          {description}
        </p>
      </div>
    </>
  );
}
