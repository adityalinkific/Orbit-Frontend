export default function Toast({ msg, onClose }) {
  setTimeout(onClose, 3000);

  return (
    <div className="toast">
      {msg}
    </div>
  );
}
