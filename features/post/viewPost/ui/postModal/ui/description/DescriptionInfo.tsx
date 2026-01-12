import s from './Description.module.scss';

export function DescriptionInfo({ userName, text }: { userName: string; text: string }) {
  return (
    <>
      <span className={s.userName}>{userName}</span>
      <span className={s.text}>{text}</span>
    </>
  );
}
