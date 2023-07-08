import ButtonCloseModal from "@components/ButtonCloseModal";
import RegisterForm from "@components/FormRegister";
import Modal from "@components/Modal";

export default function page() {
  return (
    <Modal>
      <ButtonCloseModal />
      <RegisterForm />
    </Modal>
  );
}
