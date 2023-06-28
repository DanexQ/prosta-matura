import LoginForm from "@components/FormLogin";
import Modal from "@components/Modal";
import ButtonCloseModal from "@components/ButtonCloseModal";
import { redirect } from "next/navigation";
import { auth } from "@firebase";

export default function page() {
  if (auth.currentUser !== null) redirect("/tasks");
  return (
    <Modal>
      <ButtonCloseModal />
      <LoginForm />
    </Modal>
  );
}
