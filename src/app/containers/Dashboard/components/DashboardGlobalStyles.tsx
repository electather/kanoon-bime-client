import { createGlobalStyle } from 'styled-components';

export const DashboardGlobalStyles = createGlobalStyle`
  body {
    -webkit-overflow-scrolling: touch;
  }

  html h1,
  html h2,
  html h3,
  html h4,
  html h5,
  html h6,
  html a,
  html p,
  html li,
  input,
  textarea,
  span,
  div,
  html,
  body,
  html a {
    margin-bottom: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  }

  html ul {
    -webkit-padding-start: 0px;
    list-style: none;
    margin-bottom: 0;
  }

  .scrollbar-track-y,
  .scrollbar-thumb-y {
    width: 5px !important;
  }

  .scrollbar-track-x,
  .scrollbar-thumb-x {
    height: 5px !important;
  }

  .scrollbar-thumb {
    border-radius: 0 !important;
  }

  .scrollbar-track {
    background: rgba(222, 222, 222, 0.15) !important;
  }

  .scrollbar-thumb {
    border-radius: 0 !important;
    background: rgba(0, 0, 0, 0.5) !important;
  }

  .ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow:after,
  .ant-popover-placement-bottomLeft
    > .ant-popover-content
    > .ant-popover-arrow:after,
  .ant-popover-placement-bottomRight
    > .ant-popover-content
    > .ant-popover-arrow:after,
  .ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow:after,
  .ant-popover-placement-topLeft
    > .ant-popover-content
    > .ant-popover-arrow:after,
  .ant-popover-placement-topRight
    > .ant-popover-content
    > .ant-popover-arrow:after {
    left: 0;
    margin-left: -4px;
  }

  /* Instagram Modal */

  .ant-modal-wrap.instagram-modal .ant-modal {
    max-width: 935px;
    width: 100% !important;
  }

  @media only screen and (max-width: 991px) {
    .ant-modal-wrap.instagram-modal .ant-modal {
      padding: 0 60px;
    }
  }

  @media only screen and (max-width: 767px) {
    .ant-modal-wrap.instagram-modal .ant-modal {
      max-width: 580px;
    }
  }

  .ant-modal-wrap.instagram-modal .ant-modal-content {
    border-radius: 0;
  }

  .ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close {
    position: fixed;
    color: #fff;
  }

  .ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close i {
    font-size: 24px;
  }

  .ant-modal-wrap.instagram-modal .ant-modal-content .ant-modal-body {
    padding: 0;
  }

  /********** Add Your Global RTL CSS Here **********/

  /* Popover */

  html[dir='rtl'] .ant-popover {
    text-align: right;
  }

  /* Ecommerce Card */

  html[dir='rtl'] .isoCardInfoForm .ant-input {
    text-align: right;
  }

  /* Modal */

  html[dir='rtl'] .has-success.has-feedback:after,
  html[dir='rtl'] .has-warning.has-feedback:after,
  html[dir='rtl'] .has-error.has-feedback:after,
  html[dir='rtl'] .is-validating.has-feedback:after {
    left: 0;
    right: auto;
  }

  html[dir='rtl'] .ant-modal-close {
    right: inherit;
    left: 0;
  }

  html[dir='rtl'] .ant-modal-footer {
    text-align: left;
  }

  html[dir='rtl'] .ant-modal-footer button + button {
    margin-left: 0;
    margin-right: 8px;
  }

  html[dir='rtl'] .ant-confirm-body .ant-confirm-content {
    margin-right: 42px;
  }

  html[dir='rtl'] .ant-btn > .anticon + span,
  html[dir='rtl'] .ant-btn > span + .anticon {
    margin-right: 0.5em;
  }

  html[dir='rtl'] .ant-btn-loading span {
    margin-left: 0;
    margin-right: 0.5em;
  }

  html[dir='rtl']
    .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline) {
    padding-left: 25px;
    padding-right: 29px;
  }

  html[dir='rtl']
    .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline)
    .anticon {
    margin-right: -14px;
    margin-left: 0;
  }

  /* Confirm */

  html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-body > .anticon {
    margin-left: 16px;
    margin-right: 0;
    float: right;
  }

  html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns {
    float: left;
  }

  html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns button + button {
    margin-right: 10px;
    margin-left: 0;
  }

  /* Message */

  html[dir='rtl'] .ant-message .anticon {
    margin-left: 8px;
    margin-right: 0;
  }

  /* Pop Confirm */

  html[dir='rtl'] .ant-popover-message-title {
    padding-right: 20px;
    padding-left: 0;
  }

  html[dir='rtl'] .ant-popover-buttons {
    text-align: left;
  }

  /* Notification */

  html[dir='rtl']
    .ant-notification-notice-closable
    .ant-notification-notice-message {
    padding-left: 24px;
    padding-right: 0;
  }

  html[dir='rtl']
    .ant-notification-notice-with-icon
    .ant-notification-notice-message,
  html[dir='rtl']
    .ant-notification-notice-with-icon
    .ant-notification-notice-description {
    margin-right: 48px;
  }

  html[dir='rtl'] .ant-notification-notice-close {
    right: auto;
    left: 16px;
  }

  html[dir='rtl'] .ant-notification-notice-with-icon {
    left: 0;
  }

  /* Dropzone */

  html[dir='rtl'] .dz-hidden-input {
    display: none;
  }
`;
