import ButtonCloseModal from "@components/ButtonCloseModal";
import RegisterForm from "@components/FormRegister";
import Modal from "@components/Modal";
import { auth } from "@firebase";
import { redirect } from "next/navigation";

export default async function page() {
  if (auth.currentUser !== null) redirect("/tasks");
  return (
    <Modal>
      <ButtonCloseModal />
      <RegisterForm />
    </Modal>
  );
}
