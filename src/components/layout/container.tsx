type ContainerProps = React.PropsWithChildren<{ className?: string }>;

export function Container({ children, className = "" }: ContainerProps) {
  return <section className={`mx-auto max-w-4xl p-8 ${className}`}>{children}</section>;
}
