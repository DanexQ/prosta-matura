import RegisterForm from "@components/FormRegister";
import Modal from "@components/Modal";

export default async function page() {
  return (
    <Modal>
      <RegisterForm />
    </Modal>
  );
}
