import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  function handleMenuClick(e: ClickParam) {
    i18n.changeLanguage(e.key);
  }

  const content = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="en">
        {t(translations.topBar.languages.english())}
      </Menu.Item>
      <Menu.Item key="fa">
        {t(translations.topBar.languages.persian())}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={content}>
      <Button>
        {t(translations.topBar.languages.changeLanguage())} <DownOutlined />
      </Button>
    </Dropdown>
  );
}
