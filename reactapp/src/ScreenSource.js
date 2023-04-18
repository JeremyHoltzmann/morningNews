import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Avatar, Button, Row } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion/dist/framer-motion";

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);

  function changeLangue(langue) {
    props.changeLanguage(langue);
  }

  useEffect(() => {
    fetch(`/api/top_headlines?language=${props.language}`, {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((data) =>
        setSourceList(
          data.sources.map((element) => ({
            id: element.id,
            name: element.name,
            url: element.url,
            description: element.description,
            category: element.category,
          }))
        )
      );
  }, []);

  useEffect(() => {
    fetch(`/api/top_headlines?language=${props.language}`, {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((data) =>
        setSourceList(
          data.sources.map((element) => ({
            id: element.id,
            name: element.name,
            url: element.url,
            description: element.description,
            category: element.category,
          }))
        )
      );
  }, [props.language]);

  return (
    <div>
      <Nav />

      <Row className="Banner" value="large" type="flex" justify="center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Flag_of_France_%28lighter_variant%29.svg/500px-Flag_of_France_%28lighter_variant%29.svg.png"
          className="languageButton"
          onClick={() => changeLangue("fr")}
        ></img>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/510px-Flag_of_the_United_Kingdom.svg.png"
          className="languageButton"
          onClick={() => changeLangue("en")}
        ></img>
      </Row>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item, i) => (
            <List.Item>
              <motion.div
                initial={{ x: 200 }}
                whileInView={{ x: 0 }}
                transition={{ delay: (i + 0.5) * 0.1 }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={
                    <Link to={"/screenMyArticlesBySource/" + item.id}>
                      {item.name}
                    </Link>
                  }
                  description={item.description}
                />
              </motion.div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { articleList: state.articleList, language: state.language };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLanguage: function (language) {
      dispatch({ type: "changeLanguage", language });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
