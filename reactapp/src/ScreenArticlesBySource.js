import React from "react";
import "./App.css";
import { Card, Icon, Row, Col, Modal } from "antd";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion/dist/framer-motion";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  var { id } = useParams();

  const [articleArray, setArticleArray] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (i) => {
    setModalTitle(articleArray[i].title);
    setModalContent(articleArray[i].content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function addArticle(title, description, content, img) {
    props.addArticle({
      title: title,
      content: content,
      description: description,
      img: img,
    });
    await fetch("/addArticle", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "token=" +
        props.token +
        "&title=" +
        title +
        "&content=" +
        content +
        "&description=" +
        description +
        "&img=" +
        img,
    });
  }

  useEffect(() => {
    var req = `/api/articlesBySource?language=${props.language}&sources=${id}`;
    fetch(req)
      .then((response) => response.json())
      .then((data) => {
        setArticleArray(data.articles);
        console.log(data.articles[0]);
      });
  }, []);

  useEffect(() => {
    var req = `/api/articlesBySource?language=${props.language}&sources=${id}`;
    fetch(req)
      .then((response) => response.json())
      .then((data) => {
        setArticleArray(data.articles);
      });
  }, [props.language]);

  return (
    <div>
      <Nav />
      <div className="Banner"></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row gutter={16} type="flex" justifyContent="space-between">
          {articleArray.map((element, i) => (
            <Col key={i} xs={24} lg={6}>
              <motion.div
                style={{ display: "flex", justifyContent: "center" }}
                initial={{ opacity: 0.5, rotate: 10 }}
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
                    justifyContent: "center",
                  }}
                  cover={<img alt="example" src={element.urlToImage} />}
                  actions={[
                    <Icon
                      type="read"
                      key="ellipsis2"
                      onClick={() => showModal(i)}
                    />,
                    <Icon
                      type="like"
                      key="ellipsis"
                      style={{ color: element.isLiked ? "blue" : "black" }}
                      onClick={() => {
                        const articleArrayUpdated = articleArray.map(
                          (c, index) => {
                            if (i === index) {
                              c.isLiked = !c.isLiked;
                              return c;
                            } else return c;
                          }
                        );
                        setArticleArray(articleArrayUpdated);
                        addArticle(
                          element.title,
                          element.description,
                          element.content,
                          element.urlToImage
                        );
                      }}
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
  return { language: state.language, token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    addArticle: function (article) {
      dispatch({ type: "addArticle", article });
    },
    changeLanguage: function (langue) {
      dispatch({ type: "changeLanguage", langue });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
