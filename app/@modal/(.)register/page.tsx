import ButtonCloseModal from "@components/ButtonCloseModal";
import RegisterForm from "@components/FormRegister";
import Modal from "@components/Modal";
import router from "next/router";

export default async function page() {
  return (
    <Modal>
      <ButtonCloseModal />
      <RegisterForm />
    </Modal>
  );
}
