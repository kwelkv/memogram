import { useState } from "react";
import { toast } from "react-toastify";

const useDeleteWithModal = (onDelete) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const openModal = (id) => {
    setTargetId(id);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    onDelete(targetId);
    setIsOpen(false);
    toast.success("작업이 완료되었습니다.");
  };

  const cancelDelete = () => {
    setIsOpen(false);
    toast.info("작업이 취소되었습니다.");
  };

  return {
    isOpen,
    openModal,
    confirmDelete,
    cancelDelete,
  };
};

export default useDeleteWithModal;
