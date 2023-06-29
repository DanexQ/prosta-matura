import FormLogin from "@components/FormLogin";
import Modal from "@components/Modal";
import ButtonCloseModal from "@components/ButtonCloseModal";

export default async function page() {
  return (
    <Modal>
      <ButtonCloseModal />
      <FormLogin redirectTo="/tasks" />
    </Modal>
  );
}
