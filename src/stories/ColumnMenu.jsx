import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Modal, Input } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CustomSearchField } from "./CustomSearchField";
import { CustomCheckbox } from "./CustomCheckbox";
import { Button as CustomButton } from "./Button";
import { Accordion } from "./Accordion";

import './columnMenu.css';

const Actions = ({ onClose, onReset, onSaveStatus }) => {
  const handleClose = (e) => {
    onClose && onClose(e);
  }
  return (
    <div className="column-menu__actions">
      <CustomButton label="Save Status" size="large" primary onClick={onSaveStatus} />
      <div className="column-menu__bottom-buttons">
        <CustomButton onClick={handleClose} size="large" label="Close" style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
        <CustomButton onClick={onReset} size="large" label="Reset" style={{ color: '#1890FF' }} />
      </div>
    </div>
  );
};

const CloseIcon = ({ className = '' }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d={`M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6
        7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z`}
      fill="#6B778C"
    />
  </svg>
);

const DragIcon = ({ className = '' }) => (
  <svg className={className} width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d={`M4 14.5C4 15.6 3.1 16.5 2 16.5C0.9 16.5 0 15.6 0 14.5C0 13.4 0.9 12.5 2 12.5C3.1 12.5 4 13.4 4 14.5ZM2
       6.5C0.9 6.5 0 7.4 0 8.5C0 9.6 0.9 10.5 2 10.5C3.1 10.5 4 9.6 4 8.5C4 7.4 3.1 6.5 2 6.5ZM2 0.5C0.9 0.5 0 1.4 0
        2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5ZM8 4.5C9.1 4.5 10 3.6 10 2.5C10 1.4 9.1 0.5 8
         0.5C6.9 0.5 6 1.4 6 2.5C6 3.6 6.9 4.5 8 4.5ZM8 6.5C6.9 6.5 6 7.4 6 8.5C6 9.6 6.9 10.5 8 10.5C9.1 10.5 10 9.6
          10 8.5C10 7.4 9.1 6.5 8 6.5ZM8 12.5C6.9 12.5 6 13.4 6 14.5C6 15.6 6.9 16.5 8 16.5C9.1 16.5 10 15.6 10 14.5C10
           13.4 9.1 12.5 8 12.5Z`}
      fill="#DFE1E6"
    />
  </svg>

)

const SavedItems = ({ items = [], savedItemsIDs = [], removeItem }) => {
  const handleClick = (id) => () => {
    removeItem(id);
  };

  const savedItemsWithDefaultSorting = items
    .filter((item) => (savedItemsIDs.includes(item.id)));
  const savedItems = savedItemsIDs.map((id) => (savedItemsWithDefaultSorting.find((item) => item.id === id))) || [];

  return savedItems
    .map((item, i) => (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={i}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="column-menu__list-item"
            style={{
              ...provided.draggableProps.style
            }}
          >
            <div className="column-menu__saved-item" key={item.id}>
              <Button onClick={handleClick(item.id)} icon={<CloseIcon />} />
              <p>{item.value}</p>
              <DragIcon className="column-menu__drag-icon" />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    ));
}

const Items = ({ filter = '', items = [], savedItemsIDs = [], saveItem, removeItem }) => {
  const handleChange = (id) => () => {
    if (savedItemsIDs.includes(id)) {
      removeItem(id);
    } else {
      saveItem(id);
    }
  }

  return items
    .filter((item) => item.value.toLowerCase().includes(filter.toLowerCase()))
    .map((item, i) => (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={i}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="column-menu__list-item"
            style={{
              ...provided.draggableProps.style
            }}
          >
            <div className="column-menu__item">
              <CustomCheckbox
                label={item.value}
                checked={savedItemsIDs.includes(item.id)}
                onChange={handleChange(item.id)}
              />
              <DragIcon className="column-menu__drag-icon" />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    ));
}

const StatusModal = ({ isModalOpen, handleOk, handleCancel, savedItemsIDs }) => {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  }

  const onCancel = () => {
    setStatus('');
    handleCancel();
  }

  const onOk = () => {
    handleOk(status, savedItemsIDs);
    onCancel();
  }

  return (
    <Modal
      className="column-menu__modal"
      title="Save Status"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={280}
      footer={[
        <CustomButton key="save-button" onClick={onOk} label="Save" size="medium" primary />
      ]}
    >
      <Input value={status} onChange={handleChange} placeholder="Enter Status" />
    </Modal>
  )
}

/**
 * Primary UI component for user interaction
 */
export const ColumnMenu = ({ defaultItems, onSave, onClose }) => {
  const [filter, setFilter] = React.useState('');
  const [showingStatusModal, setShowingStatusModal] = React.useState(false);
  const [items, setItems] = React.useState(defaultItems);
  const [savedItemsIDs, setSavedItemsIDs] = React.useState([]);

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleRemoveItemID = (id) => {
    setSavedItemsIDs(savedItemsIDs.filter((item) => item !== id));
  }

  const handleSaveItemID = (id) => {
    setSavedItemsIDs([...savedItemsIDs, items.find((item) => item.id === id)?.id]);
  }

  const handleReset = () => {
    setSavedItemsIDs([]);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEndForItems = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  }

  const onDragEndForSavedItems = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newSavedItemsIDs = reorder(
      savedItemsIDs,
      result.source.index,
      result.destination.index
    );

    setSavedItemsIDs(newSavedItemsIDs);
  }

  const handleSave = (status, selectedSavedIDs) => {
    if (onSave) {
      onSave(status, selectedSavedIDs);
    }
    setSavedItemsIDs([]);
  };

  const handleCloseStatusModal = () => {
    setShowingStatusModal(false);
  }

  const handleShowStatusModal = () => {
    setShowingStatusModal(true);
  }

  return (
    <>
      <Card
        className="column-menu"
        cover={<CustomSearchField value={filter} placeholder="Search" onChange={handleChangeFilter} />}
      >
        <div className="column-menu__body">
          <div className="column-menu__items">
            <DragDropContext onDragEnd={onDragEndForItems}>
              <Droppable droppableId="column1">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Items
                      saveItem={handleSaveItemID}
                      removeItem={handleRemoveItemID}
                      savedItemsIDs={savedItemsIDs}
                      items={items}
                      filter={filter}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <Accordion title="Saved">
            <div className="column-menu__saved-items">
              <DragDropContext onDragEnd={onDragEndForSavedItems}>
                <Droppable droppableId="column2">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <SavedItems items={items} removeItem={handleRemoveItemID} savedItemsIDs={savedItemsIDs} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </Accordion>
        </div>
        <Actions onClose={onClose} onReset={handleReset} onSaveStatus={handleShowStatusModal} />
      </Card>
      <StatusModal
        savedItemsIDs={savedItemsIDs}
        handleCancel={handleCloseStatusModal}
        handleOk={handleSave}
        isModalOpen={showingStatusModal}
      />
    </>
  );
};

ColumnMenu.propTypes = {
  /**
   * Column Menu items
   */
  defaultItems: PropTypes.array,
  /**
   * Optional save handler
   */
  onSave: PropTypes.func,
};

ColumnMenu.defaultProps = {
  defaultItems: [],
  onSave: () => {},
  onClose: undefined,
};
