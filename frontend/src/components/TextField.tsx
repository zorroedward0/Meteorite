import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  tag: string;
}

export default function TextField({ tag, id, ...props }: Props) {

    return (
    <label className="field" htmlFor={id}>
      <span className="tag-field">{tag}</span>
      <input id={id} {...props} />
    </label>
  );

}
