// file: root/components/modals/deletion-confirmation.tsx

// Step 1: import bellow packages
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// TODO: finish
// Step 2: setup the props
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
      {/* Step 3: setup modal */}
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        {/* a. modal header */}
        <Modal.Header />
        {/* b. modal body */}
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20  text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400 ">
              Are you sure you want to permanemtly delete this video?
            </h3>
            {/* c. buttons */}
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                //  d. if yes, confirm deletion and close modal
                onClick={() => {
                  handleConfirmDeletion();
                  setShowModal(false);
                }}
              >
                Yes, I'm sure
              </Button>

              <Button color="gray" onClick={() => setShowModal(false)}>
                {" "}
                // e. if not close modal No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeletionConfirmation;
