import { FC, useState } from 'react';
import { useAllMailsQuery } from '../../features/mail/mailAPI';
import { setMail } from '../../features/mail/mailSlice';
import { useAppDispatch } from '../../hooks';
import { Dropdown } from 'antd';
import Search from 'antd/es/input/Search';
import MailItem from './MailItem';

/**
 * `MailFilterList` is a functional component that renders a dropdown menu with a search input to filter emails by subject.
 * 
 *  It utilizes Ant Design's `Dropdown` and `Search` components to construct the UI, and integrates with Redux for state management and event handling.
 * @returns A dropdown menu with a search input to filter emails by subject.
 */
const MailFilterList: FC = () => {
    const [subject, setSubject] = useState<string>('$');
    const { data, refetch, isLoading } = useAllMailsQuery(subject, { refetchOnMountOrArgChange: true });
    const dispatch = useAppDispatch();

    const items: any = data?.data?.map((mail) => ({
      key: mail.id,
      label: <MailItem showButtonDelete={false} mail={mail} refetch={refetch} />,
      onClick: () => {
        dispatch(setMail({value: mail}));
      },
    }));
    let timeout: ReturnType<typeof setTimeout>;
    const handlerSearch = (v: string) => {
        clearTimeout(timeout);
        setTimeout(() => {
            setSubject(v);
        }, 1000);
    };

    return (
        
        <Dropdown 
            menu={{ items, style:{ overflowY: 'scroll', maxHeight: '80vh' } }}>
            <Search 
                style={{ position: 'fixed', top: '15px', left: 50, zIndex: 1000, maxWidth: 250 }}
                placeholder="Search email by subject"  
                onChange={(e) => handlerSearch(e.target.value)} 
                loading={isLoading}
            />
    </Dropdown>
    );
};

export default MailFilterList;
