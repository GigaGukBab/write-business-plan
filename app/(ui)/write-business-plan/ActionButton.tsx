import styles from "./ActionButton.module.scss";

const buttonTexts: { [key: string]: string } = {
  back: "이전",
  next: "다음",
  submit: "생성하기",
};

export default function ActionButton({
  type,
  onClick,
  disabled,
}: {
  type: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={styles[`${type}Button`]}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonTexts[type]}
    </button>
  );
}
