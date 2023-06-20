import RegisterForm from "@components/RegisterForm/RegisterForm";
import Modal from "@components/Modal/Modal";

export default async function page() {
  return (
    <Modal>
      <RegisterForm />
    </Modal>
  );
}
