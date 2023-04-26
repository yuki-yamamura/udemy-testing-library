type Props = {
  message?: string;
};

export default function AlertBanner({ message }: Props) {
  const alertMessage =
    message || 'An unexpected error occurred. Please try again later.';

  return (
    <div role="alert" className="bg-red-400 text-white">
      {alertMessage}
    </div>
  );
}
