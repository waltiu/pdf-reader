import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { HOME_PATH, TEST_PATH } from '../routes/constant';

export type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
};


export const getMenus = () => {
    return [
        getItem('菜单1', HOME_PATH, <PieChartOutlined />),
        getItem('菜单2', TEST_PATH, <DesktopOutlined />),
    ];
};
