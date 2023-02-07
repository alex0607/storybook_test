import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import './accordion.css';

const { Panel } = Collapse;

/**
 * Primary UI component for user interaction
 */
export const Accordion = ({ title, children }) => {
  return (
    <Collapse className="accordion" bordered={false}>
      <Panel header={title} key="1">
        {children}
      </Panel>
    </Collapse>
  );
};

Accordion.propTypes = {
  /**
   * Is this the principal call to action on the page?
   * Accordion children
   */
  children: PropTypes.node,
  /**
   * Accordion title
   */
  title: PropTypes.string.isRequired,
};

Accordion.defaultProps = {
  title: '',
  children: undefined,
};
