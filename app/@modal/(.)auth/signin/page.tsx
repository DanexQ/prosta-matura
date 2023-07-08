import FormLogin from "@components/FormLogin";
import Modal from "@components/Modal";
import ButtonCloseModal from "@components/ButtonCloseModal";

export default function page() {
  return (
    <Modal>
      <ButtonCloseModal />
      <FormLogin />
    </Modal>
  );
}
