import { Button, Empty, List, Row, Space } from "antd";
import { FC } from "react";
import { Mail } from "../../types/mail";
import { DeleteFilled, FolderOutlined, ReloadOutlined } from "@ant-design/icons";
import MailItem from "./MailItem";
import { useAppSelector } from "../../hooks";
import { useMailsByFolderQuery } from "../../features/mail/mailAPI";
import { useDeleteFolderByIdMutation } from "../../features/folder/folderAPI";
import { useAppDispatch } from "../../hooks";
import { setFolder } from "../../features/folder/folderSlice";

type MailGenericListProps = {
  refetch: () => void;
};
const MailGenericList: FC<MailGenericListProps> = ({
  refetch: refetchFolders,
}) => {
  const dispatch = useAppDispatch();
  const folder = useAppSelector((state) => state.folder); 

  const { data, isLoading, refetch } = useMailsByFolderQuery(folder.value);
  const [deleteFolder] = useDeleteFolderByIdMutation();

  const onClickDelete = () => {
    deleteFolder(folder.value)
      .unwrap()
      .then(() => {
        refetch();
        refetchFolders();
        dispatch(setFolder({ value: 'inbox', folder: undefined }));
      });
  }

  return (
    <List<Mail>
      header={
        <Row justify="space-between">
          <Space size={10}>
            <h3>{folder.folder?.name}</h3>
            <FolderOutlined />
          </Space>
          <Space>
            <Button
              size="small"
              onClick={refetch}
              icon={<ReloadOutlined size={12} />}
              children="Refresh"
            />
            <Button
              size="small"
              onClick={onClickDelete}
              icon={<DeleteFilled />}
              danger
              children="Delete folder"
            />
          </Space>
        </Row>
      }
      style={{ overflow: 'auto', height: '100%' }}
      dataSource={data?.data}
      loading={isLoading}
      locale={{ emptyText: <Empty description="No mails" /> }}
      renderItem={(mail) => (
        <MailItem
          mail={mail}
          refetch={refetch}
        />
      )}
    />
  );
};

export default MailGenericList;