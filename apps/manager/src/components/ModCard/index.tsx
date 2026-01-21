import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import type { FlexProps } from "antd";
import { Button, Flex, Image, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSnapshot } from "valtio";

import type { Mod } from "@/domains/mod";
import type { ModFile } from "@/domains/mod-file";
import { store } from "@/stores/search";

import "./index.less";
import type { Loader } from "@/domains/loader";

export type Props = FlexProps & Mod;

const ModCard: React.FC<Props> = ({
  source,
  id,
  name,
  author,
  logo,
  description,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const snap = useSnapshot(store);
  const [version, setVersion] = useState<string>();
  const [loader, setLoader] = useState<Loader>();

  const [files, setFiles] = useState<ModFile[]>([]);

  useEffect(() => {
    const { versions, loaders } = snap.conditions;
    if (versions.length === 1 && loaders.length === 1) {
      const version = snap.conditions.versions[0];
      const loader = snap.conditions.loaders[0];
      setVersion(version);
      setLoader(loader);
    }
  }, []);

  useEffect(() => {
    async function updateDownloadURL() {
      //
    }

    updateDownloadURL();
  }, [version, loader]);

  function add() {
    console.info("点击添加按钮");
  }

  function download() {
    console.info("点击下载按钮");
  }

  const downloadDisabled = useMemo(() => files.length === 0, [files]);

  return (
    <>
      <Flex
        className="mod-card"
        onClick={(event) => {
          setModalVisible(true);
        }}
        {...props}
      >
        <Flex>
          <Image src={logo} width={96} height={96} />
        </Flex>
        <Flex flex={1} vertical>
          <Flex align="center" className="names" gap={4}>
            <a href={author.url}>{author.name}</a>
            <span>/</span>
            <a href="/">{name}</a>
            <Flex justify="end" flex={1} gap={8}>
              <Button
                variant="solid"
                color="gold"
                disabled={true}
                onClick={(event) => {
                  event.stopPropagation();
                  add();
                }}
                icon={<PlusOutlined />}
              />
              <Button
                variant="solid"
                color="primary"
                disabled={downloadDisabled}
                onClick={(event) => {
                  event.stopPropagation();
                  download();
                }}
                icon={<DownloadOutlined />}
              />
            </Flex>
          </Flex>
          <Flex>{description}</Flex>
        </Flex>
      </Flex>
      <Modal
        open={modalVisible}
        centered
        title={"模组详情"}
        footer={(_, { OkBtn, CancelBtn }) => (
          <Flex justify="end">
            <OkBtn />
          </Flex>
        )}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
      >
        <Flex></Flex>
      </Modal>
    </>
  );
};

export default ModCard;
