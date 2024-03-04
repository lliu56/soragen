import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// TODO: finish
interface DeletionConfirmationProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmDeletion: () => void;
}

const DeletionConfirmation: React.FC<DeletionConfirmationProps> = ({
  showModal,
  setShowModal,
  handleConfirmDeletion,
}) => {
  return (
    <>
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20  text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400 ">
              Are you sure you want to permanemtly delete this video?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleConfirmDeletion();
                  setShowModal(false);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeletionConfirmation;
