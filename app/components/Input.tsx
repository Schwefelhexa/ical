export type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  name: string;
};
export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={props.id ?? props.name} className="sr-only">
        {label}
      </label>
      <input
        {...props}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}
