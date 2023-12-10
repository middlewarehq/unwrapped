import css from './MouseScrollAnim.module.css';

export const MouseScrollAnim = ({
  fontSize = '30px'
}: {
  fontSize?: string | number;
}) => <div className={css.mouse} style={{ fontSize }}></div>;
