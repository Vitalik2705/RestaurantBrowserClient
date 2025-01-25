import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import TableReservation from "./TableReservationModal";
import {useLanguage} from "../../../../contexts/LanguageContext";

const TableModal = ({ restaurantId, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { text } = useLanguage();

  return (
    <div className="table-modal">
      <Button
        type="primary"
        size="large"
        onClick={() => setIsModalOpen(true)}
      >
        {text.tableModal.reserveTableButton}
      </Button>

      <Modal
        title={text.tableModal.modalTitle}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={800}
        footer={null}
      >
        <TableReservation
          restaurantId={restaurantId}
          userId={userId}
        />
      </Modal>
    </div>
  );
};

export default TableModal;