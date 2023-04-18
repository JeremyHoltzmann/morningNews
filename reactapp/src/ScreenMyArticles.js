import React from "react";
import "./App.css";
import { Card, Col, Icon, Row, Modal } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";
import { useState } from "react";

import { motion } from "framer-motion/dist/framer-motion";

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (i) => {
    setModalTitle(props.articleList[i].title);
    setModalContent(props.articleList[i].content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function removeArticle(title, id) {
    await fetch("/removeArticle", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "token=" + props.token + "&id=" + id,
    });

    props.removeArticle(title);
  }

  var noArticles;
  if (props.articleList.length === 0) {
    noArticles = "No articles";
  }
  return (
    <div>
      <Nav />
      <div className="Banner" />
      {noArticles}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row gutter={200} type="flex">
          {props.articleList.map((element, i) => (
            <Col key={i} xs={24} lg={8}>
              <motion.div
                initial={{ opacity: 0.5, rotate: 20 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  style={{
                    width: 300,
                    height: 500,
                    margin: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  cover={<img alt="example" src={element.img} />}
                  actions={[
                    <Icon
                      type="read"
                      key="ellipsis2"
                      onClick={() => showModal(i)}
                    />,
                    <Icon
                      type="delete"
                      key="ellipsis"
                      onClick={() => removeArticle(element.title, element._id)}
                    />,
                  ]}
                >
                  <Meta
                    title={element.title}
                    description={element.description}
                  />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return { articleList: state.articleList, token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    removeArticle: function (articleTitle, id) {
      dispatch({ type: "removeArticle", articleTitle, id });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
