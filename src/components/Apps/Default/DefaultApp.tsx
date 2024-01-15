import UbuntuButton from "../../BaseComponents/Button/Button.tsx";

export default function DefaultApp() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2>Default App</h2>
      <UbuntuButton>Klick mich nicht</UbuntuButton>
      <input type="text" />

    </div>
  );
}